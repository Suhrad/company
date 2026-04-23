<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Product;

$productData = [
    'PP ROPE' => ['code' => '1', 'price' => 120],
    'BALER TWINE' => ['code' => '2', 'price' => 120],
    'NIWAR' => ['code' => '3', 'price' => 50],
    'MONOFILAMENT TWINES' => ['code' => '4'],
    'MONOFILAMEN YARN' => ['code' => '5'],
    'MONOFILAMENT ROPES' => ['code' => '6'],
    'PLASTIC GRANUALS' => ['code' => '7'],
    'PLASTIC WASTE' => ['code' => '8'],
    'HDPE FISHING NET' => ['code' => '9'],
    'RENT INCOME ON COMMERCIAL PROPERTY' => ['code' => '10'],
];

echo "Updating product codes and prices...\n";

foreach ($productData as $name => $data) {
    $product = Product::where('name', $name)->first();
    if ($product) {
        $update = ['code' => $data['code']];
        if (isset($data['price'])) {
            $update['price'] = $data['price'];
        }
        $product->update($update);
        echo "Updated $name: Code -> {$data['code']}" . (isset($data['price']) ? ", Price -> {$data['price']}" : "") . "\n";
    } else {
        echo "Warning: Product '$name' not found.\n";
    }
}

echo "Done!\n";
