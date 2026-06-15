<?php
 
 namespace App\Http\Controllers;
 
 use App\Models\JobWorkOrder;
 use App\Models\JobWorkOrderDetail;
 use App\Models\JobWorkReceipt;
 use App\Models\JobWorkReceiptDetail;
 use App\Models\Product;
 use App\Models\product_warehouse;
 use App\Models\Unit;
 use App\Models\Warehouse;
 use App\utils\helpers;
 use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use PDF;
use ArPHP\I18N\Arabic;

class JobWorkController extends BaseController
{
     public function index(Request $request)
     {
         $perPage = $request->limit ?: 10;
         $pageStart = $request->get('page', 1);
         $offSet = ($pageStart * $perPage) - $perPage;
 
         $query = JobWorkOrder::with(['from_warehouse', 'worker_warehouse', 'user', 'details'])
             ->where('deleted_at', '=', null);
 
         // Advanced Filters
         if ($request->filled('search')) {
             $query->where('Ref', 'LIKE', "%{$request->search}%");
         }
         if ($request->filled('Ref')) {
            $query->where('Ref', 'LIKE', "%{$request->Ref}%");
         }
         if ($request->filled('date')) {
            $query->where('date', $request->date);
         }
         if ($request->filled('from_warehouse_id')) {
            $query->where('from_warehouse_id', $request->from_warehouse_id);
         }
         if ($request->filled('worker_warehouse_id')) {
            $query->where('worker_warehouse_id', $request->worker_warehouse_id);
         }
         if ($request->filled('statut')) {
            $query->where('statut', $request->statut);
         }
 
         $totalRows = $query->count();
         $limit = ($perPage && $perPage > 0) ? $perPage : 1000000;
 
         $orders = $query->offset($offSet)
             ->limit($limit)
             ->orderBy($request->get('sort_field', 'id'), $request->get('sort_type', 'desc'))
             ->get();
 
         return response()->json([
             'totalRows' => $totalRows,
             'orders' => $orders,
         ]);
     }
 
     public function storeIssue(Request $request)
     {
         $request->validate([
             'date' => 'required',
             'from_warehouse_id' => 'required',
             'worker_warehouse_id' => 'required',
             'details' => 'required|array|min:1',
         ]);
 
         return DB::transaction(function () use ($request) {
             $order = JobWorkOrder::create([
                 'Ref' => $this->getNumberOrder('JWO'),
                 'date' => $request->date,
                 'user_id' => Auth::user()->id,
                 'from_warehouse_id' => $request->from_warehouse_id,
                 'worker_warehouse_id' => $request->worker_warehouse_id,
                 'statut' => 'ordered',
                 'notes' => $request->notes,
             ]);
 
             foreach ($request->details as $item) {
                 $order->details()->create([
                     'product_id' => $item['product_id'],
                     'product_variant_id' => $item['product_variant_id'] ?? null,
                     'quantity' => $item['quantity'],
                 ]);
 
                 // Update Stock: Deduct from Source, Add to Worker (Virtual)
                 $this->updateStock($request->from_warehouse_id, $item['product_id'], $item['product_variant_id'] ?? null, $item['quantity'], 'sub');
                 $this->updateStock($request->worker_warehouse_id, $item['product_id'], $item['product_variant_id'] ?? null, $item['quantity'], 'add');
             }
 
             return response()->json(['success' => true, 'order' => $order]);
         });
     }
 
     public function getPendingRM(Request $request)
     {
         $order_id = $request->job_work_order_id;
         $details = JobWorkOrderDetail::with('product', 'variant')
             ->where('job_work_order_id', $order_id)
             ->get();
         
         return response()->json($details);
     }
 
     public function storeReceipt(Request $request)
     {
         $request->validate([
             'date' => 'required',
             'job_work_order_id' => 'required',
             'to_warehouse_id' => 'required',
             'details' => 'required|array|min:1', // Finished Goods
         ]);
 
         return DB::transaction(function () use ($request) {
             $order = JobWorkOrder::findOrFail($request->job_work_order_id);
 
             $receipt = JobWorkReceipt::create([
                 'Ref' => $this->getNumberOrder('JWR'),
                 'date' => $request->date,
                 'user_id' => Auth::user()->id,
                 'job_work_order_id' => $request->job_work_order_id,
                 'to_warehouse_id' => $request->to_warehouse_id,
                 'notes' => $request->notes,
             ]);
 
             // 1. Process Finished Goods (Stock Add)
             foreach ($request->details as $item) {
                 $receipt->details()->create([
                     'product_id' => $item['product_id'],
                     'product_variant_id' => $item['product_variant_id'] ?? null,
                     'quantity' => $item['quantity'],
                     'wastage' => $item['wastage'] ?? 0,
                 ]);
 
                 $this->updateStock($request->to_warehouse_id, $item['product_id'], $item['product_variant_id'] ?? null, $item['quantity'], 'add');
             }
 
             // 2. Process Raw Material Consumptions (Deduct from Worker Warehouse)
             foreach ($request->consumptions as $con) {
                 $detail = JobWorkOrderDetail::findOrFail($con['id']);
                 $detail->quantity_consumed += $con['quantity_consumed'];
                 $detail->save();
 
                 $this->updateStock($order->worker_warehouse_id, $con['product_id'], $con['product_variant_id'] ?? null, $con['quantity_consumed'], 'sub');
             }
 
             // 3. Update Order Status
             $totalIssued = $order->details()->sum('quantity');
             $totalConsumed = $order->details()->sum('quantity_consumed');
             
             if ($totalConsumed >= $totalIssued) {
                 $order->statut = 'completed';
             } else {
                 $order->statut = 'partial';
             }
             $order->save();
 
             return response()->json(['success' => true]);
         });
     }
 
     private function updateStock($warehouse_id, $product_id, $variant_id, $qty, $type)
     {
         $product_warehouse = product_warehouse::where('warehouse_id', $warehouse_id)
             ->where('product_id', $product_id)
             ->where('product_variant_id', $variant_id)
             ->first();
 
         if ($product_warehouse) {
             if ($type == 'add') {
                 $product_warehouse->qte += $qty;
             } else {
                 $product_warehouse->qte -= $qty;
             }
             $product_warehouse->save();
         } else {
             if ($type == 'add') {
                 product_warehouse::create([
                     'warehouse_id' => $warehouse_id,
                     'product_id' => $product_id,
                     'product_variant_id' => $variant_id,
                     'qte' => $qty,
                 ]);
             }
         }
     }
 
     private function getNumberOrder($prefix)
     {
         if ($prefix == 'JWO') {
             $existing = DB::table('job_work_orders')->whereNull('deleted_at')->pluck('Ref')->toArray();
             $used = [];
             foreach ($existing as $ref) {
                 if (preg_match('/^JB(\d+)$/i', $ref, $matches)) {
                     $used[] = intval($matches[1]);
                 }
             }
             $n = 1;
             while (in_array($n, $used)) {
                 $n++;
             }
             return 'JB' . $n;
         } else {
             $existing = DB::table('job_work_receipts')->whereNull('deleted_at')->pluck('Ref')->toArray();
             $used = [];
             foreach ($existing as $ref) {
                 if (preg_match('/^JBR(\d+)$/i', $ref, $matches)) {
                     $used[] = intval($matches[1]);
                 }
             }
             $n = 1;
             while (in_array($n, $used)) {
                 $n++;
             }
             return 'JBR' . $n;
         }
     }
     
     public function show($id)
     {
         $order = JobWorkOrder::with(['details.product', 'details.variant', 'receipts.details.product', 'receipts.to_warehouse', 'from_warehouse', 'worker_warehouse'])->findOrFail($id);
         return response()->json($order);
     }
 
     public function update(Request $request, $id)
     {
         $order = JobWorkOrder::with('details')->findOrFail($id);
         
         $request->validate([
             'date' => 'required',
             'from_warehouse_id' => 'required',
             'worker_warehouse_id' => 'required',
             'details' => 'required|array|min:1',
         ]);
 
         return DB::transaction(function () use ($request, $order) {
             // 1. Revert Old Stock (including raw materials consumed)
             foreach ($order->details as $item) {
                 $this->updateStock($order->from_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'add');
                 $this->updateStock($order->worker_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'sub');
                 if ($item->quantity_consumed > 0) {
                     $this->updateStock($order->worker_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity_consumed, 'add');
                 }
             }
 
             // 2. Update Order
             $order->update([
                 'date' => $request->date,
                 'from_warehouse_id' => $request->from_warehouse_id,
                 'worker_warehouse_id' => $request->worker_warehouse_id,
                 'notes' => $request->notes,
             ]);
 
             // 3. Update Details & Apply New Stock (including raw materials consumed)
             $order->details()->delete();
             foreach ($request->details as $item) {
                 $order->details()->create([
                     'product_id' => $item['product_id'],
                     'product_variant_id' => $item['product_variant_id'] ?? null,
                     'quantity' => $item['quantity'],
                     'quantity_consumed' => $item['quantity_consumed'] ?? 0,
                 ]);
 
                 $this->updateStock($request->from_warehouse_id, $item['product_id'], $item['product_variant_id'] ?? null, $item['quantity'], 'sub');
                 $this->updateStock($request->worker_warehouse_id, $item['product_id'], $item['product_variant_id'] ?? null, $item['quantity'], 'add');
                 if (($item['quantity_consumed'] ?? 0) > 0) {
                     $this->updateStock($request->worker_warehouse_id, $item['product_id'], $item['product_variant_id'] ?? null, $item['quantity_consumed'] ?? 0, 'sub');
                 }
             }
 
             return response()->json(['success' => true]);
         });
     }
 
     public function unifiedUpdate(Request $request, $id)
     {
         $order = JobWorkOrder::with(['details', 'receipts.details'])->findOrFail($id);
         
         $request->validate([
             'date' => 'required',
             'from_warehouse_id' => 'required',
             'worker_warehouse_id' => 'required',
             'details' => 'required|array', // Issued items
             'receipts' => 'array', // Receipts
         ]);
 
         return DB::transaction(function () use ($request, $order) {
             // 1. Revert EVERYTHING (Order details stock & Receipts stock)
             
             // Revert Issue Stock & Consumed Stock
             foreach ($order->details as $item) {
                 $this->updateStock($order->from_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'add');
                 $this->updateStock($order->worker_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'sub');
                 if ($item->quantity_consumed > 0) {
                     $this->updateStock($order->worker_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity_consumed, 'add');
                 }
             }
 
             // Revert Receipts Stock
             foreach ($order->receipts as $receipt) {
                 foreach ($receipt->details as $item) {
                     $this->updateStock($receipt->to_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'sub');
                 }
             }
 
             // 2. Update Order Info
             $order->update([
                 'date' => $request->date,
                 'from_warehouse_id' => $request->from_warehouse_id,
                 'worker_warehouse_id' => $request->worker_warehouse_id,
                 'notes' => $request->notes,
             ]);
 
             // 3. Update Issue Details & Stock & Consumed Stock
             $order->details()->delete();
             foreach ($request->details as $item) {
                 $order->details()->create([
                     'product_id' => $item['product_id'],
                     'product_variant_id' => $item['product_variant_id'] ?? null,
                     'quantity' => $item['quantity'],
                     'quantity_consumed' => $item['quantity_consumed'] ?? 0,
                 ]);
                 $this->updateStock($request->from_warehouse_id, $item['product_id'], $item['product_variant_id'] ?? null, $item['quantity'], 'sub');
                 $this->updateStock($request->worker_warehouse_id, $item['product_id'], $item['product_variant_id'] ?? null, $item['quantity'], 'add');
                 if (($item['quantity_consumed'] ?? 0) > 0) {
                     $this->updateStock($request->worker_warehouse_id, $item['product_id'], $item['product_variant_id'] ?? null, $item['quantity_consumed'] ?? 0, 'sub');
                 }
             }
 
             // 4. Update Receipts
             $order->receipts()->delete();
             if ($request->has('receipts')) {
                 foreach ($request->receipts as $rData) {
                     $receipt = $order->receipts()->create([
                         'Ref' => $rData['Ref'] ?? $this->getNumberOrder('JWR'),
                         'date' => $rData['date'],
                         'user_id' => Auth::user()->id,
                         'to_warehouse_id' => $rData['to_warehouse_id'],
                         'notes' => $rData['notes'] ?? '',
                     ]);
 
                     foreach ($rData['details'] as $item) {
                         $receipt->details()->create([
                             'product_id' => $item['product_id'],
                             'product_variant_id' => $item['product_variant_id'] ?? null,
                             'quantity' => $item['quantity'],
                             'wastage' => $item['wastage'] ?? 0,
                         ]);
                         $this->updateStock($rData['to_warehouse_id'], $item['product_id'], $item['product_variant_id'] ?? null, $item['quantity'], 'add');
                     }
                 }
             }
 
             return response()->json(['success' => true]);
         });
     }
 
     public function showReceipt($id)
     {
         $receipt = JobWorkReceipt::with(['details.product', 'details.variant', 'order.details.product'])->findOrFail($id);
         return response()->json($receipt);
     }
 
     public function updateReceipt(Request $request, $id)
     {
         $receipt = JobWorkReceipt::with(['details', 'order.details'])->findOrFail($id);
         
         $request->validate([
             'date' => 'required',
             'to_warehouse_id' => 'required',
             'details' => 'required|array|min:1',
         ]);
 
         return DB::transaction(function () use ($request, $receipt) {
             $order = $receipt->order;
 
             // 1. Revert Old FG Stock
             foreach ($receipt->details as $item) {
                 $this->updateStock($receipt->to_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'sub');
             }
 
             $receipt->update([
                 'date' => $request->date,
                 'to_warehouse_id' => $request->to_warehouse_id,
                 'notes' => $request->notes,
             ]);
 
             // 3. Update Details & FG Stock
             $receipt->details()->delete();
             foreach ($request->details as $item) {
                 $receipt->details()->create([
                     'product_id' => $item['product_id'],
                     'product_variant_id' => $item['product_variant_id'] ?? null,
                     'quantity' => $item['quantity'],
                     'wastage' => $item['wastage'] ?? 0,
                 ]);
                 $this->updateStock($request->to_warehouse_id, $item['product_id'], $item['product_variant_id'] ?? null, $item['quantity'], 'add');
             }
 
             return response()->json(['success' => true]);
         });
     }
 
     public function destroyReceipt($id)
     {
         return DB::transaction(function () use ($id) {
             $receipt = JobWorkReceipt::with('details')->findOrFail($id);
             
             // Revert Stock
             foreach ($receipt->details as $item) {
                 $this->updateStock($receipt->to_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'sub');
             }
             
             $receipt->delete();
             return response()->json(['success' => true]);
         });
     }
 
     public function destroy($id)
     {
         return DB::transaction(function () use ($id) {
             $order = JobWorkOrder::with(['details', 'receipts.details'])->findOrFail($id);
             
             // Revert Issue Stock & Consumed Stock
             foreach ($order->details as $item) {
                 $this->updateStock($order->from_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'add');
                 $this->updateStock($order->worker_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'sub');
                 if ($item->quantity_consumed > 0) {
                     $this->updateStock($order->worker_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity_consumed, 'add');
                 }
             }
 
             // Revert Received Stock
             foreach ($order->receipts as $receipt) {
                 foreach ($receipt->details as $item) {
                     $this->updateStock($receipt->to_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'sub');
                 }
                 $receipt->delete();
             }
 
             $order->delete();
             return response()->json(['success' => true]);
         });
     }
 
     public function delete_by_selection(Request $request)
     {
         return DB::transaction(function () use ($request) {
             foreach ($request->selectedIds as $id) {
                 $order = JobWorkOrder::with(['details', 'receipts.details'])->findOrFail($id);
                 
                 // Revert Issue Stock & Consumed Stock
                 foreach ($order->details as $item) {
                     $this->updateStock($order->from_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'add');
                     $this->updateStock($order->worker_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'sub');
                     if ($item->quantity_consumed > 0) {
                         $this->updateStock($order->worker_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity_consumed, 'add');
                     }
                 }
 
                 // Revert Received Stock
                 foreach ($order->receipts as $receipt) {
                     foreach ($receipt->details as $item) {
                         $this->updateStock($receipt->to_warehouse_id, $item->product_id, $item->product_variant_id, $item->quantity, 'sub');
                     }
                     $receipt->delete();
                 }
 
                 $order->delete();
             }
             return response()->json(['success' => true]);
         });
     }
 
     public function jobWorkPdf(Request $request, $id)
     {
         $order_data = JobWorkOrder::with(['details.product', 'from_warehouse', 'worker_warehouse', 'receipts.details.product'])
             ->where('deleted_at', '=', null)
             ->findOrFail($id);
 
         $order = [
             'Ref' => $order_data->Ref,
             'date' => $order_data->date,
             'worker_warehouse' => $order_data->worker_warehouse->name,
             'statut' => $order_data->statut,
             'notes' => $order_data->notes,
         ];
 
         $details = [];
         foreach ($order_data->details as $detail) {
             $details[] = [
                 'product_name' => $detail->product->name,
                 'quantity' => $detail->quantity,
                 'quantity_consumed' => $detail->quantity_consumed,
             ];
         }
 
         $receipts = [];
         $total_yield = 0;
         $total_wastage = 0;
         foreach ($order_data->receipts as $receipt) {
             $r_details = [];
             foreach ($receipt->details as $rd) {
                 $r_details[] = [
                     'product_name' => $rd->product->name,
                     'quantity' => $rd->quantity,
                     'wastage' => $rd->wastage,
                 ];
                 $total_yield += $rd->quantity;
                 $total_wastage += $rd->wastage;
             }
             $receipts[] = [
                 'Ref' => $receipt->Ref,
                 'date' => $receipt->date,
                 'details' => $r_details,
             ];
         }
 
         $setting = \App\Models\Setting::where('deleted_at', '=', null)->first();

        $Html = view('pdf.job_work_pdf', [
            'order' => $order,
            'details' => $details,
            'receipts' => $receipts,
            'total_yield' => $total_yield,
            'total_wastage' => $total_wastage,
            'setting' => $setting,
        ])->render();

        $arabic = new Arabic();
        $p = $arabic->arIdentify($Html);

        for ($i = count($p)-1; $i >= 0; $i-=2) {
            $utf8ar = $arabic->utf8Glyphs(substr($Html, $p[$i-1], $p[$i] - $p[$i-1]));
            $Html = substr_replace($Html, $utf8ar, $p[$i-1], $p[$i] - $p[$i-1]);
        }

        $pdf = PDF::loadHTML($Html);
        return $pdf->download('JobWork_'.$order['Ref'].'.pdf');
    }
 }
