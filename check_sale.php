<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$sale = App\Models\Sale::find(445);
if ($sale) {
    echo "Sale 445 Client ID: " . $sale->client_id . "\n";
}
