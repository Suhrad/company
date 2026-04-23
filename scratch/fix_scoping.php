<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Product;
use App\Models\Warehouse;
use App\Models\product_warehouse;
use App\Models\Category;
use App\Models\Unit;

$companyId = 2; // Nirmal Plast

echo "Scoping all Products to Company ID $companyId...\n";
Product::query()->update(['business_company_id' => $companyId]);

echo "Scoping all Warehouses to Company ID $companyId...\n";
Warehouse::query()->update(['business_company_id' => $companyId]);

echo "Scoping all Categories to Company ID $companyId...\n";
Category::query()->update(['business_company_id' => $companyId]);

// Also ensure all products are synced to all warehouses
$allProducts = Product::all();
$allWarehouses = Warehouse::all();

echo "Syncing all products with all warehouses for Company $companyId...\n";
$syncCount = 0;
foreach ($allProducts as $product) {
    foreach ($allWarehouses as $warehouse) {
        product_warehouse::updateOrCreate(
            ['product_id' => $product->id, 'warehouse_id' => $warehouse->id],
            ['manage_stock' => 1]
        );
        $syncCount++;
    }
}

echo "Done! Updated products, warehouses, and synced $syncCount combinations.\n";
