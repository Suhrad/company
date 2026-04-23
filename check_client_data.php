<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$client = App\Models\Client::find(2);
if ($client) {
    echo "ID: " . $client->id . "\n";
    echo "Name: " . $client->name . "\n";
    echo "Address: " . $client->adresse . "\n";
    echo "Line 1: " . $client->address_line_1 . "\n";
    echo "GSTIN: " . $client->gstin . "\n";
    echo "PAN: " . $client->pan . "\n";
    echo "Tax Number: " . $client->tax_number . "\n";
} else {
    echo "Client not found\n";
}
