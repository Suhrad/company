<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Product;
use App\Models\Warehouse;
use App\Models\product_warehouse;
use Illuminate\Support\Facades\DB;

$newProducts = [
    'HDPE FISHING NET',
    'NIWAR',
    'BALER TWINE',
    'PP ROPE'
];

echo "Adding new products...\n";

$lastProduct = Product::orderBy('id', 'desc')->first();
$nextCode = $lastProduct ? (int)$lastProduct->code + 1 : 1000;

foreach ($newProducts as $name) {
    $product = Product::firstOrCreate(
        ['name' => $name],
        [
            'code' => (string)($nextCode++),
            'Type_barcode' => 'CODE128',
            'cost' => 0,
            'price' => 0,
            'unit_id' => 1, // kg
            'unit_sale_id' => 1,
            'unit_purchase_id' => 1,
            'category_id' => 3, // Finished Goods
            'tax_method' => '1',
            'is_active' => 1,
            'type' => 'is_single',
            'is_variant' => 0,
            'is_imei' => 0,
            'stock_alert' => 0,
        ]
    );
    echo "Product '$name' ready (Code: {$product->code})\n";
}

echo "\nSyncing all products with all warehouses...\n";

$allProducts = Product::all();
$allWarehouses = Warehouse::all();
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

echo "Done! Synced and set manage_stock to 1 for all $syncCount product-warehouse combinations.\n";
