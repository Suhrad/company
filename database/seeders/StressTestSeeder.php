<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Warehouse;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\product_warehouse;
use App\Models\Sale;
use App\Models\SaleDetail;
use App\Models\Purchase;
use App\Models\PurchaseDetail;
use App\Models\Transfer;
use App\Models\TransferDetail;
use App\Models\Adjustment;
use App\Models\AdjustmentDetail;
use App\Models\JobWorkOrder;
use App\Models\JobWorkOrderDetail;
use App\Models\JobWorkReceipt;
use App\Models\JobWorkReceiptDetail;
use App\Models\Client;
use App\Models\Provider;
use App\Models\Unit;
use App\Models\User;
use Carbon\Carbon;

class StressTestSeeder extends Seeder
{
    public function run()
    {
        $user = User::first() ?: User::factory()->create();
        $warehouses = Warehouse::limit(5)->get();
        $products = Product::limit(10)->get();
        $client = Client::first();
        $provider = Provider::first();
        $unit = Unit::first();

        if ($warehouses->count() < 3 || $products->count() < 5 || !$client || !$provider || !$unit) {
            echo "Error: Not enough base data (warehouses, products, clients, providers, units) to run stress test.\n";
            return;
        }

        $whA = $warehouses[0];
        $whB = $warehouses[1];
        $whC = $warehouses[2];

        echo "Starting Stress Test Seeding...\n";

        DB::transaction(function () use ($whA, $whB, $whC, $warehouses, $products, $client, $provider, $unit, $user) {
            
            // --- Phase 1: Heavy Purchases (Fill Stock) ---
            echo "Generating 50 Purchases...\n";
            for ($i = 0; $i < 50; $i++) {
                $targetWH = ($i % 2 == 0) ? $whA : $whB;
                $purchase = Purchase::create([
                    'date' => Carbon::now()->subDays(rand(1, 30))->toDateString(),
                    'time' => '10:00:00',
                    'Ref' => 'PRSH-' . rand(1000, 9999) . '-' . $i,
                    'provider_id' => $provider->id,
                    'warehouse_id' => $targetWH->id,
                    'user_id' => $user->id,
                    'statut' => 'received',
                    'GrandTotal' => 1000,
                    'paid_amount' => 0,
                    'payment_statut' => 'unpaid',
                ]);

                foreach ($products->random(rand(2, 5)) as $product) {
                    $qty = rand(100, 500);
                    PurchaseDetail::create([
                        'purchase_id' => $purchase->id,
                        'product_id' => $product->id,
                        'quantity' => $qty,
                        'cost' => $product->cost,
                        'total' => $qty * $product->cost,
                        'purchase_unit_id' => $unit->id,
                    ]);

                    // Update Stock
                    $pw = product_warehouse::firstOrCreate(
                        ['warehouse_id' => $targetWH->id, 'product_id' => $product->id],
                        ['qte' => 0, 'manage_stock' => 1]
                    );
                    $pw->increment('qte', $qty);
                }
            }

            // --- Phase 2: Heavy Sales (Deplete Stock) ---
            echo "Generating 100 Sales...\n";
            for ($i = 0; $i < 100; $i++) {
                $targetWH = ($i % 2 == 0) ? $whA : $whB;
                $sale = Sale::create([
                    'date' => Carbon::now()->subDays(rand(1, 15))->toDateString(),
                    'time' => '14:00:00',
                    'Ref' => 'SALE-' . rand(1000, 9999) . '-' . $i,
                    'client_id' => $client->id,
                    'warehouse_id' => $targetWH->id,
                    'user_id' => $user->id,
                    'statut' => 'completed',
                    'GrandTotal' => 500,
                    'paid_amount' => 500,
                    'payment_statut' => 'paid',
                ]);

                foreach ($products->random(rand(1, 3)) as $product) {
                    $qty = rand(5, 20);
                    SaleDetail::create([
                        'sale_id' => $sale->id,
                        'product_id' => $product->id,
                        'quantity' => $qty,
                        'price' => $product->price,
                        'total' => $qty * $product->price,
                        'sale_unit_id' => $unit->id,
                        'date' => $sale->date,
                    ]);

                    // Update Stock
                    $pw = product_warehouse::where('warehouse_id', $targetWH->id)
                        ->where('product_id', $product->id)
                        ->first();
                    if ($pw) {
                        $pw->decrement('qte', $qty);
                    }
                }
            }

            // --- Phase 3: Heavy Transfers (Move Stock) ---
            echo "Generating 50 Transfers...\n";
            for ($i = 0; $i < 50; $i++) {
                $fromWH = ($i % 2 == 0) ? $whA : $whB;
                $toWH = ($i % 3 == 0) ? $whC : (($i % 2 == 0) ? $whB : $whA);
                if ($fromWH->id == $toWH->id) $toWH = $whC;

                $transfer = Transfer::create([
                    'date' => Carbon::now()->subDays(rand(1, 10))->toDateString(),
                    'Ref' => 'TRSF-' . rand(1000, 9999) . '-' . $i,
                    'from_warehouse_id' => $fromWH->id,
                    'to_warehouse_id' => $toWH->id,
                    'user_id' => $user->id,
                    'statut' => 'completed',
                    'items' => 1,
                    'GrandTotal' => 0,
                ]);

                $product = $products->random();
                $qty = rand(10, 50);

                TransferDetail::create([
                    'transfer_id' => $transfer->id,
                    'product_id' => $product->id,
                    'quantity' => $qty,
                    'purchase_unit_id' => $unit->id,
                    'cost' => $product->cost,
                    'total' => $qty * $product->cost,
                ]);

                // Update Stock: From
                $pwFrom = product_warehouse::where('warehouse_id', $fromWH->id)->where('product_id', $product->id)->first();
                if ($pwFrom) $pwFrom->decrement('qte', $qty);

                // Update Stock: To
                $pwTo = product_warehouse::firstOrCreate(
                    ['warehouse_id' => $toWH->id, 'product_id' => $product->id],
                    ['qte' => 0, 'manage_stock' => 1]
                );
                $pwTo->increment('qte', $qty);
            }

            // --- Phase 4: Adjustments (Corrections) ---
            echo "Generating 30 Adjustments...\n";
            for ($i = 0; $i < 30; $i++) {
                $targetWH = $warehouses->random();
                $adj = Adjustment::create([
                    'date' => Carbon::now()->toDateString(),
                    'Ref' => 'ADJ-' . rand(1000, 9999) . '-' . $i,
                    'warehouse_id' => $targetWH->id,
                    'user_id' => $user->id,
                    'items' => 1,
                ]);

                $product = $products->random();
                $type = (rand(0, 1) == 0) ? 'add' : 'sub';
                $qty = rand(1, 10);

                AdjustmentDetail::create([
                    'adjustment_id' => $adj->id,
                    'product_id' => $product->id,
                    'quantity' => $qty,
                    'type' => $type,
                ]);

                $pw = product_warehouse::firstOrCreate(
                    ['warehouse_id' => $targetWH->id, 'product_id' => $product->id],
                    ['qte' => 0, 'manage_stock' => 1]
                );
                if ($type == 'add') {
                    $pw->increment('qte', $qty);
                } else {
                    $pw->decrement('qte', $qty);
                }
            }

            // --- Phase 5: Job Work (Production) ---
            echo "Generating 20 Job Work flows...\n";
            for ($i = 0; $i < 20; $i++) {
                $sourceWH = $whA;
                $workerWH = $whB; // Using WH B as "Worker"
                $destWH = $whC;

                $jwo = JobWorkOrder::create([
                    'Ref' => 'JB-' . rand(1000, 9999) . '-' . $i,
                    'date' => Carbon::now()->subDays(5)->toDateString(),
                    'user_id' => $user->id,
                    'from_warehouse_id' => $sourceWH->id,
                    'worker_warehouse_id' => $workerWH->id,
                    'statut' => 'completed',
                ]);

                $rm = $products->random();
                $fg = $products->random(); // In reality these would be different types
                if ($rm->id == $fg->id) $fg = $products->where('id', '!=', $rm->id)->first();

                JobWorkOrderDetail::create([
                    'job_work_order_id' => $jwo->id,
                    'product_id' => $rm->id,
                    'quantity' => 100,
                    'quantity_consumed' => 100,
                ]);

                // Stock RM: Deduct from Source, Add to Worker
                $pwSource = product_warehouse::where('warehouse_id', $sourceWH->id)->where('product_id', $rm->id)->first();
                if ($pwSource) $pwSource->decrement('qte', 100);
                
                $pwWorker = product_warehouse::firstOrCreate(
                    ['warehouse_id' => $workerWH->id, 'product_id' => $rm->id],
                    ['qte' => 0]
                );
                $pwWorker->increment('qte', 100);

                // Receipt
                $jwr = JobWorkReceipt::create([
                    'Ref' => 'JBR-' . rand(1000, 9999) . '-' . $i,
                    'date' => Carbon::now()->toDateString(),
                    'user_id' => $user->id,
                    'job_work_order_id' => $jwo->id,
                    'to_warehouse_id' => $destWH->id,
                ]);

                JobWorkReceiptDetail::create([
                    'job_work_receipt_id' => $jwr->id,
                    'product_id' => $fg->id,
                    'quantity' => 90,
                    'wastage' => 10,
                ]);

                // Stock FG: Add to Dest
                $pwDest = product_warehouse::firstOrCreate(
                    ['warehouse_id' => $destWH->id, 'product_id' => $fg->id],
                    ['qte' => 0]
                );
                $pwDest->increment('qte', 90);

                // Consume RM from Worker
                $pwWorker->decrement('qte', 100);
            }
        });

        echo "Stress Test Seeding Completed!\n";
    }
}
