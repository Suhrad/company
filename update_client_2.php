<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$client = App\Models\Client::find(2);
if ($client) {
    $client->update([
        'adresse' => "183  JANJIKAR STREET\nMUMBAI",
        'address_line_1' => "183  JANJIKAR STREET",
        'address_line_3' => "MUMBAI",
        'pin_code' => "400003",
        'gstin' => "27BSFPM4734D1ZT",
        'pan' => "BSFPM4734D",
        'city' => "MUMBAI"
    ]);
    echo "Client 2 updated successfully\n";
}
