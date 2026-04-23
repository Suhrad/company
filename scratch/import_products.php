<?php
use App\Models\Product;
use Illuminate\Support\Str;

$jsonPath = '/Users/suhrad/Downloads/Sales_Tax_Invoice_01-04-2025_To_31-01-2026.Json';
$data = json_decode(file_get_contents($jsonPath), true);

$productsToImport = [];
foreach ($data['saleinv'] as $inv) {
    foreach ($inv['itemdetails'] as $item) {
        $name = trim($item['itemname']);
        if (!isset($productsToImport[$name])) {
            $productsToImport[$name] = [
                'name' => $name,
                'hsn_sac_code' => $item['hsncode'],
                'gst_unit' => $item['gstunit'],
                'default_gst_rate' => $item['gstper'],
                'goods_or_service_flag' => $item['goodserflag'],
                'cost' => $item['rate'] ?: 0,
                'price' => $item['rate'] ?: 0,
            ];
        }
    }
}

echo "Found " . count($productsToImport) . " unique products in JSON.\n";

foreach ($productsToImport as $p) {
    $exists = Product::where('name', $p['name'])->first();
    if ($exists) {
        echo "Skipping existing product: {$p['name']}\n";
        continue;
    }

    echo "Importing: {$p['name']}\n";
    
    $code = 'SARAL-' . strtoupper(substr(md5($p['name']), 0, 10));
    
    Product::create([
        'name' => $p['name'],
        'code' => $code,
        'Type_barcode' => 'CODE128',
        'type' => 'is_single',
        'cost' => $p['cost'],
        'price' => $p['price'],
        'category_id' => 2,
        'unit_id' => ($p['gst_unit'] == 'KGS' ? 1 : null),
        'unit_sale_id' => ($p['gst_unit'] == 'KGS' ? 1 : null),
        'unit_purchase_id' => ($p['gst_unit'] == 'KGS' ? 1 : null),
        'tax_method' => 1,
        'is_active' => 1,
        'is_variant' => 0,
        'stock_alert' => 0,
        'business_company_id' => 1,
        'hsn_sac_code' => $p['hsn_sac_code'],
        'gst_unit' => $p['gst_unit'],
        'goods_or_service_flag' => $p['goods_or_service_flag'],
        'default_gst_rate' => $p['default_gst_rate'],
        'is_saral_imported' => 1,
        'source_system' => 'saral',
        'source_identifier' => $p['name'],
        'matching_signature' => "{$p['name']}|{$p['hsn_sac_code']}|{$p['gst_unit']}",
    ]);
}

echo "Import complete.\n";
