<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$clients = App\Models\Client::all();
foreach ($clients as $client) {
    echo "ID: " . $client->id . " | Name: " . $client->name . " | GSTIN: " . $client->gstin . "\n";
}
