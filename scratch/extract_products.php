<?php
$jsonPath = '/Users/suhrad/Downloads/Sales_Tax_Invoice_01-04-2025_To_31-01-2026.Json';
$data = json_decode(file_get_contents($jsonPath), true);

$products = [];
foreach ($data['saleinv'] as $inv) {
    foreach ($inv['itemdetails'] as $item) {
        $name = trim($item['itemname']);
        if (!isset($products[$name])) {
            $products[$name] = [
                'name' => $name,
                'hsn' => $item['hsncode'],
                'unit' => $item['gstunit'],
                'rate' => $item['gstper'],
                'flag' => $item['goodserflag'],
                'cost' => $item['rate'],
                'price' => $item['rate'],
            ];
        }
    }
}

echo "Found " . count($products) . " unique products.\n";
foreach ($products as $p) {
    echo "Product: {$p['name']} | HSN: {$p['hsn']} | Unit: {$p['unit']} | Rate: {$p['rate']} | Flag: {$p['flag']}\n";
}
