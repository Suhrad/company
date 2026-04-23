<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Product;
use App\Models\Warehouse;
use App\Models\product_warehouse;

$companyId = 2; // Nirmal Plast

echo "Finalizing scoping and sync...\n";

// Force all products and warehouses to Company 2
Product::withTrashed()->update(['business_company_id' => $companyId]);
Warehouse::withTrashed()->update(['business_company_id' => $companyId]);

// Ensure all products are active (not selling = 0, is_active = 1)
Product::query()->update(['not_selling' => 0, 'is_active' => 1]);

$allProducts = Product::all();
$allWarehouses = Warehouse::all();

echo "Syncing " . $allProducts->count() . " products with " . $allWarehouses->count() . " warehouses...\n";

foreach ($allProducts as $product) {
    foreach ($allWarehouses as $warehouse) {
        // Use DB table directly to avoid model issues with deleted_at
        $exists = DB::table('product_warehouse')
            ->where('product_id', $product->id)
            ->where('warehouse_id', $warehouse->id)
            ->first();

        if ($exists) {
            DB::table('product_warehouse')
                ->where('id', $exists->id)
                ->update([
                    'manage_stock' => 1,
                    'deleted_at' => null
                ]);
        } else {
            DB::table('product_warehouse')->insert([
                'product_id' => $product->id,
                'warehouse_id' => $warehouse->id,
                'manage_stock' => 1,
                'qte' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}

echo "Done! All products should now be visible in all warehouses for Company $companyId.\n";
