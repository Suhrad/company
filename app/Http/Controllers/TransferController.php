<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\product_warehouse;
use App\Models\Role;
use App\Models\Unit;
use App\Models\Setting;
use App\Models\Transfer;
use App\Models\TransferDetail;
use App\Models\Warehouse;
use App\Models\User;
use App\Models\UserWarehouse;
use App\utils\helpers;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PDF;
use ArPHP\I18N\Arabic;

class TransferController extends BaseController
{

    //------------ Show All Transfers  -----------\\

    public function index(request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Transfer::class);
        $role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($role->id)->inRole('record_view');

        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();
        // Filter fields With Params to retrieve
        $columns = array(0 => 'Ref', 1 => 'from_warehouse_id', 2 => 'to_warehouse_id', 3 => 'statut');
        $param = array(0 => 'like', 1 => '=', 2 => '=', 3 => 'like');
        $data = array();

        // Check If User Has Permission View  All Records
        $transfers = Transfer::with('from_warehouse', 'to_warehouse')
            ->where('deleted_at', '=', null)
            ->where(function ($query) use ($view_records) {
                if (!$view_records) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            });

        //Multiple Filter
        $Filtred = $helpers->filter($transfers, $columns, $param, $request)
        // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('from_warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('to_warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $Filtred->count();
        if($perPage == "-1"){
            $perPage = $totalRows;
        }
        $order = $request->SortField ?: 'id';
        $dir = ($request->SortType == 'none' || !$request->SortType) ? 'desc' : $request->SortType;
        $transfers = $Filtred->with('from_warehouse', 'to_warehouse', 'details.product')
            ->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($transfers as $transfer) {
            $item['id'] = $transfer->id;
            $item['date'] = $transfer['date'] . ' ' . $transfer['time'];
            $item['Ref'] = $transfer->Ref;
            $item['from_warehouse'] = $transfer['from_warehouse']->name;
            $item['to_warehouse'] = $transfer['to_warehouse']->name;
            $item['GrandTotal'] = $transfer->GrandTotal;
            $item['items'] = $transfer->items;
            $item['statut'] = $transfer->statut;
            $item['is_production'] = $transfer->is_production;
            $item['notes'] = $transfer->notes;
            
            $inputs = [];
            $input_qtys = [];
            $outputs = [];
            $output_qtys = [];
            $all_products = [];
            $all_qtys = [];

            foreach ($transfer->details as $detail) {
                $name = optional($detail->product)->name;
                $all_products[] = $name;
                $all_qtys[] = $detail->quantity;

                if ($detail->flow_type == 'input') {
                    $inputs[] = $name;
                    $input_qtys[] = $detail->quantity;
                } elseif ($detail->flow_type == 'output') {
                    $outputs[] = $name;
                    $output_qtys[] = $detail->quantity;
                }
            }

            $item['total_input'] = array_sum($input_qtys);
            $item['total_output'] = array_sum($output_qtys);
            $item['wastage_total'] = $transfer->wastage_total;
            if ($transfer->is_production) {
                $item['products_name'] = "INPUTS:\n" . implode("\n", $inputs) . "\n\nOUTPUTS:\n" . implode("\n", $outputs);
                $item['products_quantity'] = "IN:\n" . implode("\n", $input_qtys) . "\n\nOUT:\n" . implode("\n", $output_qtys);
            } else {
                $item['products_name'] = implode("\n", $all_products);
                $item['products_quantity'] = implode("\n", $all_qtys);
            }
            $item['all_qtys_sum'] = array_sum($all_qtys);
            
            $data[] = $item;
        }

        //get warehouses assigned to user
        $user_auth = auth()->user();
        if($user_auth->is_all_warehouses){
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        }else{
            $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        }

        return response()->json([
            'totalRows' => $totalRows,
            'warehouses' => $warehouses,
            'transfers' => $data,
        ]);
    }

    //------------ Store New Transfer -----------\\

    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Transfer::class);

        request()->validate([
            'transfer.from_warehouse' => 'required',
            'transfer.to_warehouse' => 'required',
        ]);

        \DB::transaction(function () use ($request) {
            $order = new Transfer;

            $order->date = $request->transfer['date'];
            $order->Ref = $this->getNumberOrder();
            $order->from_warehouse_id = $request->transfer['from_warehouse'];
            $order->to_warehouse_id = $request->transfer['to_warehouse'];
            $order->items = sizeof($request['details']);
            $order->tax_rate = $request->transfer['tax_rate']?$request->transfer['tax_rate']:0;
            $order->TaxNet = $request->transfer['TaxNet']?$request->transfer['TaxNet']:0;
            $order->discount = $request->transfer['discount']?$request->transfer['discount']:0;
            $order->shipping = $request->transfer['shipping']?$request->transfer['shipping']:0;
            $order->statut = 'completed';
            $order->is_production = false;
            $order->notes = $request->transfer['notes'];
            $order->GrandTotal = $request['GrandTotal'];
            $order->user_id = Auth::user()->id;
            $order->save();

            $data = $request['details'];

            foreach ($data as $key => $value) {
               
                $unit = Unit::where('id', $value['purchase_unit_id'])->first();

                if ($request->transfer['statut'] == "completed") {
                    if ($value['product_variant_id'] !== null) {

                        //--------- eliminate the quantity ''from_warehouse''--------------\\
                        $product_warehouse_from = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $request->transfer['from_warehouse'])
                            ->where('product_id', $value['product_id'])
                            ->where('product_variant_id', $value['product_variant_id'])
                            ->first();

                        if ($unit && $product_warehouse_from) {
                            if ($unit->operator == '/') {
                                $product_warehouse_from->qte -= $value['quantity'] / $unit->operator_value;
                            } else {
                                $product_warehouse_from->qte -= $value['quantity'] * $unit->operator_value;
                            }
                            $product_warehouse_from->save();
                        }

                        //--------- ADD the quantity ''TO_warehouse'' ------------------\\
                        $product_warehouse_to = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $request->transfer['to_warehouse'])
                            ->where('product_id', $value['product_id'])
                            ->where('product_variant_id', $value['product_variant_id'])
                            ->first();

                        if ($unit && $product_warehouse_to) {
                            if ($unit->operator == '/') {
                                $product_warehouse_to->qte += $value['quantity'] / $unit->operator_value;
                            } else {
                                $product_warehouse_to->qte += $value['quantity'] * $unit->operator_value;
                            }
                            $product_warehouse_to->save();
                        }

                    } else {

                        //--------- eliminate the quantity ''from_warehouse''--------------\\
                        $product_warehouse_from = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $request->transfer['from_warehouse'])
                            ->where('product_id', $value['product_id'])->first();

                        if ($unit && $product_warehouse_from) {
                            if ($unit->operator == '/') {
                                $product_warehouse_from->qte -= $value['quantity'] / $unit->operator_value;
                            } else {
                                $product_warehouse_from->qte -= $value['quantity'] * $unit->operator_value;
                            }
                            $product_warehouse_from->save();
                        }

                        //--------- ADD the quantity ''TO_warehouse'' ------------------\\
                        $product_warehouse_to = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $request->transfer['to_warehouse'])
                            ->where('product_id', $value['product_id'])->first();

                        if ($unit && $product_warehouse_to) {
                            if ($unit->operator == '/') {
                                $product_warehouse_to->qte += $value['quantity'] / $unit->operator_value;
                            } else {
                                $product_warehouse_to->qte += $value['quantity'] * $unit->operator_value;
                            }
                            $product_warehouse_to->save();
                        }
                    }

                } elseif ($request->transfer['statut'] == "sent") {

                    if ($value['product_variant_id'] !== null) {

                        $product_warehouse_from = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $request->transfer['from_warehouse'])
                            ->where('product_id', $value['product_id'])
                            ->where('product_variant_id', $value['product_variant_id'])
                            ->first();

                        if ($unit && $product_warehouse_from) {
                            if ($unit->operator == '/') {
                                $product_warehouse_from->qte -= $value['quantity'] / $unit->operator_value;
                            } else {
                                $product_warehouse_from->qte -= $value['quantity'] * $unit->operator_value;
                            }
                            $product_warehouse_from->save();
                        }

                    } else {

                        $product_warehouse_from = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $request->transfer['from_warehouse'])
                            ->where('product_id', $value['product_id'])->first();

                        if ($unit && $product_warehouse_from) {
                            if ($unit->operator == '/') {
                                $product_warehouse_from->qte -= $value['quantity'] / $unit->operator_value;
                            } else {
                                $product_warehouse_from->qte -= $value['quantity'] * $unit->operator_value;
                            }
                            $product_warehouse_from->save();
                        }
                    }
                }

                $orderDetails['transfer_id'] = $order->id;
                $orderDetails['quantity'] = $value['quantity'];
                $orderDetails['purchase_unit_id'] = $value['purchase_unit_id'];
                $orderDetails['product_id'] = $value['product_id'];
                $orderDetails['product_variant_id'] = $value['product_variant_id'];
                $orderDetails['cost'] = $value['Unit_cost'];
                $orderDetails['TaxNet'] = $value['tax_percent'];
                $orderDetails['tax_method'] = $value['tax_method'];
                $orderDetails['discount'] = $value['discount'];
                $orderDetails['discount_method'] = $value['discount_Method'];
                $orderDetails['total'] = $value['subtotal'];

                if ($order->is_production) {
                    $orderDetails['flow_type'] = $value['flow_type'] ?? 'input';
                    $orderDetails['production_status'] = 'in-process';
                } else {
                    $orderDetails['flow_type'] = $value['flow_type'] ?? 'standard';
                    $orderDetails['production_status'] = 'completed';
                }

                TransferDetail::insert($orderDetails);
            }

        }, 10);

        return response()->json(['success' => true]);
    }

    //------------- Update Transfer -----------\\

    public function update(Request $request, $id)
    {

        $this->authorizeForUser($request->user('api'), 'update', Transfer::class);

        request()->validate([
            'transfer.to_warehouse' => 'required',
            'transfer.from_warehouse' => 'required',
        ]);

        \DB::transaction(function () use ($request, $id) {
            $role = Auth::user()->roles()->first();
            $view_records = Role::findOrFail($role->id)->inRole('record_view');
            $current_Transfer = Transfer::findOrFail($id);

            // Check If User Has Permission view All Records
            if (!$view_records) {
                // Check If User->id === Transfer->id
                $this->authorizeForUser($request->user('api'), 'check_record', $current_Transfer);
            }

            $Old_Details = TransferDetail::where('transfer_id', $id)->get();
            $data = $request['details'];
            $Trans = $request->transfer;
            $length = sizeof($data);

            // Get Ids details
            $new_products_id = [];
            foreach ($data as $new_detail) {
                $new_products_id[] = $new_detail['id'];
            }

            // Init Data with old Parametre
            $old_products_id = [];
            foreach ($Old_Details as $key => $value) {
                //check if detail has purchase_unit_id Or Null
                if($value['purchase_unit_id'] !== null){
                    $unit = Unit::where('id', $value['purchase_unit_id'])->first();
                }else{
                    $product_unit_purchase_id = Product::with('unitPurchase')
                    ->where('id', $value['product_id'])
                    ->first();
                    $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
                }

                $old_products_id[] = $value->id;

                if ($current_Transfer->statut == "completed") {
                    if ($value['product_variant_id'] !== null) {
                        $warehouse_from_variant = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                            ->where('product_id', $value['product_id'])
                            ->where('product_variant_id', $value['product_variant_id'])
                            ->first();

                        if ($unit && $warehouse_from_variant) {
                            $warehouse_from_variant->qte += ($unit->operator == '/') ? ($value['quantity'] / $unit->operator_value) : ($value['quantity'] * $unit->operator_value);
                            $warehouse_from_variant->save();
                        }

                        $warehouse_To_variant = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->to_warehouse_id)
                            ->where('product_id', $value['product_id'])
                            ->where('product_variant_id', $value['product_variant_id'])
                            ->first();

                        if ($unit && $warehouse_To_variant) {
                            $warehouse_To_variant->qte -= ($unit->operator == '/') ? ($value['quantity'] / $unit->operator_value) : ($value['quantity'] * $unit->operator_value);
                            $warehouse_To_variant->save();
                        }

                    } else {
                        $warehouse_from = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                            ->where('product_id', $value['product_id'])->first();

                        if ($unit && $warehouse_from) {
                            $warehouse_from->qte += ($unit->operator == '/') ? ($value['quantity'] / $unit->operator_value) : ($value['quantity'] * $unit->operator_value);
                            $warehouse_from->save();
                        }

                        $warehouse_To = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->to_warehouse_id)
                            ->where('product_id', $value['product_id'])->first();

                        if ($unit && $warehouse_To) {
                            $warehouse_To->qte -= ($unit->operator == '/') ? ($value['quantity'] / $unit->operator_value) : ($value['quantity'] * $unit->operator_value);
                            $warehouse_To->save();
                        }
                    }

                } elseif ($current_Transfer->statut == "sent") {
                    if ($value['product_variant_id'] !== null) {
                        $Sent_variant_To = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                            ->where('product_id', $value['product_id'])
                            ->where('product_variant_id', $value['product_variant_id'])
                            ->first();

                        if ($unit && $Sent_variant_To) {
                            $Sent_variant_To->qte += ($unit->operator == '/') ? ($value['quantity'] / $unit->operator_value) : ($value['quantity'] * $unit->operator_value);
                            $Sent_variant_To->save();
                        }
                    } else {
                        $Sent_variant_From = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                            ->where('product_id', $value['product_id'])->first();

                        if ($unit && $Sent_variant_From) {
                            $Sent_variant_From->qte += ($unit->operator == '/') ? ($value['quantity'] / $unit->operator_value) : ($value['quantity'] * $unit->operator_value);
                            $Sent_variant_From->save();
                        }
                    }
                }

                // Delete Detail
                if (!in_array($value->id, $new_products_id)) {
                    $value->delete();
                }
            }

            // Update Data with New request
            foreach ($data as $key => $product_detail) {
                if($product_detail['purchase_unit_id'] !== null){
                    $unit = Unit::where('id', $product_detail['purchase_unit_id'])->first();

                    if ($Trans['statut'] == "completed") {
                        if ($product_detail['product_variant_id'] !== null) {
                            // Deduct from source
                            $product_warehouse_from = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $Trans['from_warehouse'])
                                ->where('product_id', $product_detail['product_id'])
                                ->where('product_variant_id', $product_detail['product_variant_id'])
                                ->first();

                            if ($unit && $product_warehouse_from) {
                                $product_warehouse_from->qte -= ($unit->operator == '/') ? ($product_detail['quantity'] / $unit->operator_value) : ($product_detail['quantity'] * $unit->operator_value);
                                $product_warehouse_from->save();
                            }

                            // Add to destination
                            $product_warehouse_to = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $Trans['to_warehouse'])
                                ->where('product_id', $product_detail['product_id'])
                                ->where('product_variant_id', $product_detail['product_variant_id'])
                                ->first();

                            if ($unit && $product_warehouse_to) {
                                $product_warehouse_to->qte += ($unit->operator == '/') ? ($product_detail['quantity'] / $unit->operator_value) : ($product_detail['quantity'] * $unit->operator_value);
                                $product_warehouse_to->save();
                            }
                        } else {
                            $product_warehouse_from = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $Trans['from_warehouse'])
                                ->where('product_id', $product_detail['product_id'])->first();

                            if ($unit && $product_warehouse_from) {
                                $product_warehouse_from->qte -= ($unit->operator == '/') ? ($product_detail['quantity'] / $unit->operator_value) : ($product_detail['quantity'] * $unit->operator_value);
                                $product_warehouse_from->save();
                            }

                            $product_warehouse_to = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $Trans['to_warehouse'])
                                ->where('product_id', $product_detail['product_id'])->first();

                            if ($unit && $product_warehouse_to) {
                                $product_warehouse_to->qte += ($unit->operator == '/') ? ($product_detail['quantity'] / $unit->operator_value) : ($product_detail['quantity'] * $unit->operator_value);
                                $product_warehouse_to->save();
                            }
                        }
                    } elseif ($Trans['statut'] == "sent") {
                        if ($product_detail['product_variant_id'] !== null) {
                            $product_warehouse_from = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $Trans['from_warehouse'])
                                ->where('product_id', $product_detail['product_id'])
                                ->where('product_variant_id', $product_detail['product_variant_id'])
                                ->first();

                            if ($unit && $product_warehouse_from) {
                                $product_warehouse_from->qte -= ($unit->operator == '/') ? ($product_detail['quantity'] / $unit->operator_value) : ($product_detail['quantity'] * $unit->operator_value);
                                $product_warehouse_from->save();
                            }
                        } else {
                            $product_warehouse_from = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $Trans['from_warehouse'])
                                ->where('product_id', $product_detail['product_id'])->first();

                            if ($unit && $product_warehouse_from) {
                                $product_warehouse_from->qte -= ($unit->operator == '/') ? ($product_detail['quantity'] / $unit->operator_value) : ($product_detail['quantity'] * $unit->operator_value);
                                $product_warehouse_from->save();
                            }
                        }
                    }

                    $TransDetail = [
                        'transfer_id' => $id,
                        'quantity' => $product_detail['quantity'],
                        'purchase_unit_id' => $product_detail['purchase_unit_id'],
                        'product_id' => $product_detail['product_id'],
                        'product_variant_id' => $product_detail['product_variant_id'],
                        'cost' => $product_detail['Unit_cost'],
                        'TaxNet' => $product_detail['tax_percent'],
                        'tax_method' => $product_detail['tax_method'],
                        'discount' => $product_detail['discount'],
                        'discount_method' => $product_detail['discount_Method'],
                        'total' => $product_detail['subtotal'],
                    ];

                    if (!in_array($product_detail['id'], $old_products_id)) {
                        TransferDetail::create($TransDetail);
                    } else {
                        TransferDetail::where('id', $product_detail['id'])->update($TransDetail);
                    }
                }
            }

            $current_Transfer->update([
                'to_warehouse_id' => $Trans['to_warehouse'],
                'from_warehouse_id' => $Trans['from_warehouse'],
                'date' => $Trans['date'],
                'notes' => $Trans['notes'],
                'statut' => 'completed',
                'items' => sizeof($request['details']),
                'tax_rate' => $Trans['tax_rate']?$Trans['tax_rate']:0,
                'TaxNet' => $Trans['TaxNet']?$Trans['TaxNet']:0,
                'discount' => $Trans['discount']?$Trans['discount']:0,
                'shipping' => $Trans['shipping']?$Trans['shipping']:0,
                'GrandTotal' => $request['GrandTotal'],
                'is_production' => false,
            ]);

        }, 10);

        return response()->json(['success' => true]);
    }

    //------------ Delete Transfer -----------\\

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Transfer::class);

        \DB::transaction(function () use ($id, $request) {
            $role = Auth::user()->roles()->first();
            $view_records = Role::findOrFail($role->id)->inRole('record_view');
            $current_Transfer = Transfer::findOrFail($id);
            $Old_Details = TransferDetail::where('transfer_id', $id)->get();

            // Check If User Has Permission view All Records
            if (!$view_records) {
                // Check If User->id === current_Transfer->id
                $this->authorizeForUser($request->user('api'), 'check_record', $current_Transfer);
            }

            // Init Data with old Parametre
             foreach ($Old_Details as $key => $value) {
                 //check if detail has purchase_unit_id Or Null
                 if($value['purchase_unit_id'] !== null){
                     $unit = Unit::where('id', $value['purchase_unit_id'])->first();
                 }else{
                     $product_unit_purchase_id = Product::with('unitPurchase')
                     ->where('id', $value['product_id'])
                     ->first();
                     $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
                 } 
 
                if ($current_Transfer->statut == "completed") {
                    if ($value['product_variant_id'] !== null) {

                        $warehouse_from_variant = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                            ->where('product_id', $value['product_id'])
                            ->where('product_variant_id', $value['product_variant_id'])
                            ->first();

                        if ($unit && $warehouse_from_variant) {
                            if ($unit->operator == '/') {
                                $warehouse_from_variant->qte += $value['quantity'] / $unit->operator_value;
                            } else {
                                $warehouse_from_variant->qte += $value['quantity'] * $unit->operator_value;
                            }
                            $warehouse_from_variant->save();
                        }

                        $warehouse_To_variant = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->to_warehouse_id)
                            ->where('product_id', $value['product_id'])
                            ->where('product_variant_id', $value['product_variant_id'])
                            ->first();

                        if ($unit && $warehouse_To_variant) {
                            if ($unit->operator == '/') {
                                $warehouse_To_variant->qte -= $value['quantity'] / $unit->operator_value;
                            } else {
                                $warehouse_To_variant->qte -= $value['quantity'] * $unit->operator_value;
                            }
                            $warehouse_To_variant->save();
                        }

                    } else {
                        $warehouse_from = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                            ->where('product_id', $value['product_id'])->first();

                        if ($unit && $warehouse_from) {
                            if ($unit->operator == '/') {
                                $warehouse_from->qte += $value['quantity'] / $unit->operator_value;
                            } else {
                                $warehouse_from->qte += $value['quantity'] * $unit->operator_value;
                            }
                            $warehouse_from->save();
                        }

                        $warehouse_To = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->to_warehouse_id)
                            ->where('product_id', $value['product_id'])->first();

                        if ($unit && $warehouse_To) {
                            if ($unit->operator == '/') {
                                $warehouse_To->qte -= $value['quantity'] / $unit->operator_value;
                            } else {
                                $warehouse_To->qte -= $value['quantity'] * $unit->operator_value;
                            }
                            $warehouse_To->save();
                        }
                    }

                } elseif ($current_Transfer->statut == "sent") {
                    if ($value['product_variant_id'] !== null) {

                        $Sent_variant_To = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                            ->where('product_id', $value['product_id'])
                            ->where('product_variant_id', $value['product_variant_id'])
                            ->first();

                        if ($unit && $Sent_variant_To) {
                            if ($unit->operator == '/') {
                                $Sent_variant_To->qte += $value['quantity'] / $unit->operator_value;
                            } else {
                                $Sent_variant_To->qte += $value['quantity'] * $unit->operator_value;
                            }
                            $Sent_variant_To->save();
                        }
                    } else {
                        $Sent_variant_From = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                            ->where('product_id', $value['product_id'])->first();

                        if ($unit && $Sent_variant_From) {
                            if ($unit->operator == '/') {
                                $Sent_variant_From->qte += $value['quantity'] / $unit->operator_value;
                            } else {
                                $Sent_variant_From->qte += $value['quantity'] * $unit->operator_value;
                            }
                            $Sent_variant_From->save();
                        }
                    }
                }
                   
            }

            $current_Transfer->details()->delete();
            $current_Transfer->update([
                'deleted_at' => Carbon::now(),
            ]);

        }, 10);

        return response()->json(['success' => true]);
    }

    //-------------- Delete by selection  ---------------\\

    public function delete_by_selection(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'delete', Transfer::class);

        \DB::transaction(function () use ($request) {
            $role = Auth::user()->roles()->first();
            $view_records = Role::findOrFail($role->id)->inRole('record_view');
            $selectedIds = $request->selectedIds;
            foreach ($selectedIds as $Transfer_id) {
                $current_Transfer = Transfer::findOrFail($Transfer_id);
                $Old_Details = TransferDetail::where('transfer_id', $Transfer_id)->get();

                // Check If User Has Permission view All Records
                if (!$view_records) {
                    // Check If User->id === Transfer->id
                    $this->authorizeForUser($request->user('api'), 'check_record', $current_Transfer);
                }

                 // Init Data with old Parametre
             foreach ($Old_Details as $key => $value) {
                //check if detail has purchase_unit_id Or Null
                if($value['purchase_unit_id'] !== null){
                    $unit = Unit::where('id', $value['purchase_unit_id'])->first();
                }else{
                    $product_unit_purchase_id = Product::with('unitPurchase')
                    ->where('id', $value['product_id'])
                    ->first();
                    $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
                } 

               if ($current_Transfer->statut == "completed") {
                   if ($value['product_variant_id'] !== null) {

                       $warehouse_from_variant = product_warehouse::where('deleted_at', '=', null)
                           ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                           ->where('product_id', $value['product_id'])
                           ->where('product_variant_id', $value['product_variant_id'])
                           ->first();

                       if ($unit && $warehouse_from_variant) {
                           if ($unit->operator == '/') {
                               $warehouse_from_variant->qte += $value['quantity'] / $unit->operator_value;
                           } else {
                               $warehouse_from_variant->qte += $value['quantity'] * $unit->operator_value;
                           }
                           $warehouse_from_variant->save();
                       }

                       $warehouse_To_variant = product_warehouse::where('deleted_at', '=', null)
                           ->where('warehouse_id', $current_Transfer->to_warehouse_id)
                           ->where('product_id', $value['product_id'])
                           ->where('product_variant_id', $value['product_variant_id'])
                           ->first();

                       if ($unit && $warehouse_To_variant) {
                           if ($unit->operator == '/') {
                               $warehouse_To_variant->qte -= $value['quantity'] / $unit->operator_value;
                           } else {
                               $warehouse_To_variant->qte -= $value['quantity'] * $unit->operator_value;
                           }
                           $warehouse_To_variant->save();
                       }

                   } else {
                       $warehouse_from = product_warehouse::where('deleted_at', '=', null)
                           ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                           ->where('product_id', $value['product_id'])->first();

                       if ($unit && $warehouse_from) {
                           if ($unit->operator == '/') {
                               $warehouse_from->qte += $value['quantity'] / $unit->operator_value;
                           } else {
                               $warehouse_from->qte += $value['quantity'] * $unit->operator_value;
                           }
                           $warehouse_from->save();
                       }

                       $warehouse_To = product_warehouse::where('deleted_at', '=', null)
                           ->where('warehouse_id', $current_Transfer->to_warehouse_id)
                           ->where('product_id', $value['product_id'])->first();

                       if ($unit && $warehouse_To) {
                           if ($unit->operator == '/') {
                               $warehouse_To->qte -= $value['quantity'] / $unit->operator_value;
                           } else {
                               $warehouse_To->qte -= $value['quantity'] * $unit->operator_value;
                           }
                           $warehouse_To->save();
                       }
                   }

               } elseif ($current_Transfer->statut == "sent") {
                   if ($value['product_variant_id'] !== null) {

                       $Sent_variant_To = product_warehouse::where('deleted_at', '=', null)
                           ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                           ->where('product_id', $value['product_id'])
                           ->where('product_variant_id', $value['product_variant_id'])
                           ->first();

                       if ($unit && $Sent_variant_To) {
                           if ($unit->operator == '/') {
                               $Sent_variant_To->qte += $value['quantity'] / $unit->operator_value;
                           } else {
                               $Sent_variant_To->qte += $value['quantity'] * $unit->operator_value;
                           }
                           $Sent_variant_To->save();
                       }
                   } else {
                       $Sent_variant_From = product_warehouse::where('deleted_at', '=', null)
                           ->where('warehouse_id', $current_Transfer->from_warehouse_id)
                           ->where('product_id', $value['product_id'])->first();

                       if ($unit && $Sent_variant_From) {
                           if ($unit->operator == '/') {
                               $Sent_variant_From->qte += $value['quantity'] / $unit->operator_value;
                           } else {
                               $Sent_variant_From->qte += $value['quantity'] * $unit->operator_value;
                           }
                           $Sent_variant_From->save();
                       }
                   }
               }
                  
           }

            $current_Transfer->details()->delete();
            $current_Transfer->update([
                'deleted_at' => Carbon::now(),
            ]);
        }

        }, 10);

        return response()->json(['success' => true]);
    }

    //------------ Reference Number of transfers  -----------\\

    public function getNumberOrder()
    {
        $lastId = DB::table('transfers')->max('id') ?? 0;
        return 'T' . ($lastId + 1);
    }

    //------------- Show Form Edit Transfer-----------\\

    public function edit(Request $request, $id)
    {

        $this->authorizeForUser($request->user('api'), 'update', Transfer::class);
        $role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($role->id)->inRole('record_view');
        $Transfer_data = Transfer::with('details.product.unit')
            ->where('deleted_at', '=', null)
            ->findOrFail($id);

        $details = array();
        // Check If User Has Permission view All Records
        if (!$view_records) {
            // Check If User->id === Transfer->id
            $this->authorizeForUser($request->user('api'), 'check_record', $Transfer_data);
        }

        if ($Transfer_data->from_warehouse_id) {
            if (Warehouse::where('id', $Transfer_data->from_warehouse_id)
                ->where('deleted_at', '=', null)
                ->first()) {
                $transfer['from_warehouse'] = $Transfer_data->from_warehouse_id;
            } else {
                $transfer['from_warehouse'] = '';
            }
        } else {
            $transfer['from_warehouse'] = '';
        }

        if ($Transfer_data->to_warehouse_id) {
            if (Warehouse::where('id', $Transfer_data->to_warehouse_id)->where('deleted_at', '=', null)->first()) {
                $transfer['to_warehouse'] = $Transfer_data->to_warehouse_id;
            } else {
                $transfer['to_warehouse'] = '';
            }
        } else {
            $transfer['to_warehouse'] = '';
        }

        $transfer['statut'] = $Transfer_data->statut;
        $transfer['notes'] = $Transfer_data->notes;
        $transfer['date'] = $Transfer_data->date;
        $transfer['tax_rate'] = $Transfer_data->tax_rate;
        $transfer['TaxNet'] = $Transfer_data->TaxNet;
        $transfer['discount'] = $Transfer_data->discount;
        $transfer['shipping'] = $Transfer_data->shipping;

        $detail_id = 0;
        foreach ($Transfer_data['details'] as $detail) {
             //-------check if detail has purchase_unit_id Or Null
             if($detail->purchase_unit_id !== null){
                $unit = Unit::where('id', $detail->purchase_unit_id)->first();
                $data['no_unit'] = 1;
            }else{
                $product_unit_purchase_id = Product::with('unitPurchase')
                ->where('id', $detail->product_id)
                ->first();
                $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
                $data['no_unit'] = 0;
            }

            if ($detail->product_variant_id) {
                $item_product = product_warehouse::where('product_id', $detail->product_id)
                    ->where('deleted_at', '=', null)
                    ->where('product_variant_id', $detail->product_variant_id)
                    ->where('warehouse_id', $Transfer_data->from_warehouse_id)
                    ->first();

                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $item_product ? $data['del'] = 0 : $data['del'] = 1;
                $data['name'] = '['.$productsVariants->name . ']' . $detail['product']['name'];
                $data['code'] = $productsVariants->code;

                $data['product_variant_id'] = $detail->product_variant_id;

                if ($unit && $unit->operator == '/') {
                    $data['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                } else if ($unit && $unit->operator == '*') {
                    $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                } else {
                    $data['stock'] = 0;
                }
                $data['unitPurchase'] = $detail['product']['unitPurchase']->ShortName;

            } else {
                $item_product = product_warehouse::where('product_id', $detail->product_id)
                    ->where('deleted_at', '=', null)->where('warehouse_id', $Transfer_data->from_warehouse_id)
                    ->where('product_variant_id', '=', null)->first();

                $item_product ? $data['del'] = 0 : $data['del'] = 1;
                $data['product_variant_id'] = null;
                $data['code'] = $detail['product']['code'];
                $data['name'] = $detail['product']['name'];
               
                if ($unit && $unit->operator == '/') {
                    $data['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                } else if ($unit && $unit->operator == '*') {
                    $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                } else {
                    $data['stock'] = 0;
                }
            }


            $data['id'] = $detail->id;
            $data['detail_id'] = $detail_id += 1;
            $data['quantity'] = $detail->quantity;
            $data['product_id'] = $detail->product_id;
            $data['etat'] = 'current';
            $data['qte_copy'] = $detail->quantity;
            $data['unitPurchase'] = $unit->ShortName;
            $data['purchase_unit_id'] = $unit->id;
            $data['flow_type'] = $detail->flow_type;

            if ($detail->discount_method == '2') {
                $data['DiscountNet'] = $detail->discount;
            } else {
                $data['DiscountNet'] = $detail->cost * $detail->discount / 100;
            }
            $tax_cost = $detail->TaxNet * (($detail->cost - $data['DiscountNet']) / 100);
            $data['Unit_cost'] = $detail->cost;
            $data['tax_percent'] = $detail->TaxNet;
            $data['tax_method'] = $detail->tax_method;
            $data['discount'] = $detail->discount;
            $data['discount_Method'] = $detail->discount_method;

            if ($detail->tax_method == '1') {
                $data['Net_cost'] = $detail->cost - $data['DiscountNet'];
                $data['taxe'] = $tax_cost;
                $data['subtotal'] = ($data['Net_cost'] * $data['quantity']) + ($tax_cost * $data['quantity']);
            } else {
                $data['Net_cost'] = ($detail->cost - $data['DiscountNet'] - $tax_cost);
                $data['taxe'] = $detail->cost - $data['Net_cost'] - $data['DiscountNet'];
                $data['subtotal'] = ($data['Net_cost'] * $data['quantity']) + ($tax_cost * $data['quantity']);
            }
            $details[] = $data;
        }

       //get warehouses assigned to user
       $user_auth = auth()->user();
       if($user_auth->is_all_warehouses){
           $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
       }else{
           $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
           $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
       }

       $to_warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);

        return response()->json([
            'details' => $details,
            'transfer' => $transfer,
            'warehouses' => $warehouses,
            'to_warehouses' => $to_warehouses,
        ]);
    }

    //---------------- Get Details Transfer -----------------\\

    public function show(Request $request, $id)
    {

        $this->authorizeForUser($request->user('api'), 'view', Transfer::class);
        $role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($role->id)->inRole('record_view');
        $Transfer_data = Transfer::with('details.product.unit')
            ->where('deleted_at', '=', null)
            ->findOrFail($id);

        $details = array();
        // Check If User Has Permission view All Records
        if (!$view_records) {
            // Check If User->id === Transfer->id
            $this->authorizeForUser($request->user('api'), 'check_record', $Transfer_data);
        }

        $transfer['date'] = $Transfer_data->date . ' ' . $Transfer_data->time;
        $transfer['note'] = $Transfer_data->notes;
        $transfer['Ref'] = $Transfer_data->Ref;
        $transfer['from_warehouse'] = $Transfer_data['from_warehouse']->name;
        $transfer['to_warehouse'] = $Transfer_data['to_warehouse']->name;
        $transfer['items'] = $Transfer_data->items;
        $transfer['statut'] = $Transfer_data->statut;
        $transfer['is_production'] = $Transfer_data->is_production;
        $transfer['wastage_total'] = $Transfer_data->wastage_total;
        $transfer['GrandTotal'] = $Transfer_data->GrandTotal;

        foreach ($Transfer_data['details'] as $detail) {

            //-------check if detail has purchase_unit_id Or Null
            if($detail->purchase_unit_id !== null){
                $unit = Unit::where('id', $detail->purchase_unit_id)->first();
            }else{
                $product_unit_purchase_id = Product::with('unitPurchase')
                ->where('id', $detail->product_id)
                ->first();
                $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
            }

            if ($detail->product_variant_id) {

                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $data['code'] = $productsVariants->code;
                $data['name'] = '['.$productsVariants->name . ']' . $detail['product']['name'];

            } else {
                $data['code'] = $detail['product']['code'];
                $data['name'] = $detail['product']['name'];
            }

            $data['quantity'] = $detail->quantity;
            $data['unit'] = $unit->ShortName;
            $data['total'] = $detail->total;
            $data['flow_type'] = $detail->flow_type;

            $details[] = $data;
        }
        return response()->json([
            'details' => $details,
            'transfer' => $transfer,
        ]);
    }

    //---------------- Show Form Create Transfer ---------------\\

    public function create(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Transfer::class);

       //get warehouses assigned to user
       $user_auth = auth()->user();
       if($user_auth->is_all_warehouses){
           $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
       }else{
           $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
           $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
       }

        $to_warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
       
        return response()->json(['warehouses' => $warehouses, 'to_warehouses' => $to_warehouses]);
    }


    //-------------- transfer_pdf -----------\\

    public function transfer_pdf(Request $request, $id)
    {
        $details = array();
        $helpers = new helpers();
        $transfer_data = Transfer::with('details.product.unitPurchase')
            ->where('deleted_at', '=', null)
            ->findOrFail($id);

        $transfer['from_warehouse'] = $transfer_data['from_warehouse']->name;
        $transfer['to_warehouse']   = $transfer_data['to_warehouse']->phone;
        
        $transfer['statut'] = $transfer_data->statut;
        $transfer['Ref']    = $transfer_data->Ref;
        $transfer['date']   = $transfer_data->date;
        $transfer['is_production'] = $transfer_data->is_production;
        $transfer['wastage_total'] = $transfer_data->wastage_total;
        $transfer['notes'] = $transfer_data->notes;
        
        $detail_id = 0;
        foreach ($transfer_data['details'] as $detail) {

            //-------check if detail has purchase_unit_id Or Null
            if($detail->purchase_unit_id !== null){
                $unit = Unit::where('id', $detail->purchase_unit_id)->first();
            }else{
                $product_unit_purchase_id = Product::with('unitPurchase')
                ->where('id', $detail->product_id)
                ->first();
                $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
            }

            if ($detail->product_variant_id) {

                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $data['code'] = $productsVariants->code;
                $data['name'] = '['.$productsVariants->name . ']' . $detail['product']['name'];
            } else {
                $data['code'] = $detail['product']['code'];
                $data['name'] = $detail['product']['name'];
            }

                $data['detail_id'] = $detail_id += 1;
                $data['quantity'] = number_format($detail->quantity, 2, '.', '');
                $data['unit_purchase'] = $unit->ShortName;
                $data['flow_type'] = $detail->flow_type;

            
            $details[] = $data;
        }


        $settings = Setting::where('deleted_at', '=', null)->first();
        $Html = view('pdf.transfer_pdf', [
            'setting' => $settings,
            'transfer' => $transfer,
            'details' => $details,
        ])->render();

        $arabic = new Arabic();
        $p = $arabic->arIdentify($Html);

        for ($i = count($p)-1; $i >= 0; $i-=2) {
            $utf8ar = $arabic->utf8Glyphs(substr($Html, $p[$i-1], $p[$i] - $p[$i-1]));
            $Html = substr_replace($Html, $utf8ar, $p[$i-1], $p[$i] - $p[$i-1]);
        }

        $pdf = PDF::loadHTML($Html);
        return $pdf->download('transfer.pdf');

    }

  

    //------------- Complete Production -----------\\

    public function complete_production(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'update', Transfer::class);

        \DB::transaction(function () use ($request) {
            $transfer = Transfer::findOrFail($request->transfer_id);
            if ($transfer->statut == 'completed') {
                throw new \Exception("This production is already completed.");
            }
            $outputs = $request->outputs;

            // Total input weight
            $total_input = TransferDetail::where('transfer_id', $transfer->id)
                ->where('flow_type', 'input')
                ->sum('quantity');

            $total_output = 0;

            foreach ($outputs as $value) {
                $total_output += $value['quantity'];
                
                // Add output items
                $detail = new TransferDetail;
                $detail->transfer_id = $transfer->id;
                $detail->quantity = $value['quantity'];
                $detail->product_id = $value['product_id'];
                $detail->product_variant_id = $value['product_variant_id'] ?? null;
                $detail->flow_type = 'output';
                $detail->production_status = 'completed';
                
                // Set default unit (purchase unit of product)
                $product = Product::find($value['product_id']);
                $detail->purchase_unit_id = $product->unit_purchase_id;
                $detail->cost = $product->cost;
                $detail->TaxNet = 0;
                $detail->tax_method = $product->tax_method;
                $detail->discount = 0;
                $detail->discount_method = 1;
                $detail->total = $product->cost * $value['quantity'];
                
                $detail->save();

                // Increase stock at destination
                $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                    ->where('warehouse_id', $transfer->to_warehouse_id)
                    ->where('product_id', $value['product_id'])
                    ->where('product_variant_id', $value['product_variant_id'] ?? null)
                    ->first();

                if ($product_warehouse) {
                    $product_warehouse->qte += $value['quantity'];
                    $product_warehouse->save();
                } else {
                    product_warehouse::create([
                        'warehouse_id' => $transfer->to_warehouse_id,
                        'product_id' => $value['product_id'],
                        'product_variant_id' => $value['product_variant_id'] ?? null,
                        'qte' => $value['quantity'],
                    ]);
                }
            }
            
            // Mark input items as completed
            TransferDetail::where('transfer_id', $transfer->id)
                ->where('flow_type', 'input')
                ->update(['production_status' => 'completed']);

            $transfer->wastage_total = $total_input - $total_output;
            $transfer->statut = 'completed';
            $transfer->save();

        }, 10);

        return response()->json(['success' => true]);
    }
}
