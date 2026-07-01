<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

echo "Starting product database reset and import...\n";

// 1. Delete transactional records to avoid broken relations
echo "Clearing transactions and details...\n";
DB::table('sale_details')->delete();
DB::table('sales')->delete();

DB::table('purchase_details')->delete();
DB::table('purchases')->delete();

DB::table('adjustment_details')->delete();
DB::table('adjustments')->delete();

DB::table('transfer_details')->delete();
DB::table('transfers')->delete();

DB::table('quotation_details')->delete();
DB::table('quotations')->delete();

DB::table('count_stock')->delete();

// 2. Delete product-related master tables
echo "Clearing products and variants...\n";
DB::table('product_variants')->delete();
DB::table('product_warehouse')->delete();
DB::table('products')->delete();

// 3. Define new products
$new_products = [
    "COCA BROWN TIGER PP ROPES",
    "A - ONE MONOFILAMENT ROPES",
    "RP NET",
    "SEMI NETS",
    "VIRGIN NETS",
    "ATMIYA PP ROPES",
    "A-ONE PP ROPES",
    "POWER VIRGIN PP ROPE",
    "TIRANGA CHATAI - RP NIWAR",
    "SHANTI MATTY - RP NIWAR",
    "VIP MASTER - RP NIWAR",
    "TIRANGA 8-LINE (BLACK) - RP NIWAR",
    "1 INCH NIWAR",
    "3/4 INCH NIWAR",
    "1/2 INCH NIWAR",
    "SEMI NIWAR",
    "SARVESHWAR YELLOW II PP ROPE",
    "BALLER TWINE",
    "GOPDORI",
    "ZAKTA DORI",
    "TWINES",
    "YARN"
];

$warehouses = App\Models\Warehouse::whereNull('deleted_at')->get();
$code = 1001;

echo "Inserting new finished goods products...\n";
foreach ($new_products as $prod_name) {
    // Create product
    $p = App\Models\Product::create([
        'code' => (string)$code++,
        'Type_barcode' => 'CODE128',
        'name' => $prod_name,
        'cost' => 0.00,
        'price' => 0.00,
        'unit_id' => 1,
        'unit_sale_id' => 1,
        'unit_purchase_id' => 1,
        'stock_alert' => 0,
        'category_id' => 3, // Finished Goods
        'is_variant' => 0,
        'is_imei' => 0,
        'tax_method' => 1,
        'is_active' => 1,
        'type' => 'is_single',
        'TaxNet' => 0,
        'discount' => 0,
        'discount_method' => 1,
        'is_featured' => 0
    ]);

    echo "  - Added: {$prod_name} (Code: {$p->code}, ID: {$p->id})\n";

    // Setup product_warehouse inventory for all warehouses
    foreach ($warehouses as $w) {
        DB::table('product_warehouse')->insert([
            'product_id' => $p->id,
            'warehouse_id' => $w->id,
            'product_variant_id' => null,
            'qte' => 0,
            'manage_stock' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

echo "\nDatabase setup completed successfully!\n";
