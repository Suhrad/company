<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Client;
use App\Models\Provider;
use Illuminate\Support\Facades\DB;

echo "Syncing Customers to Suppliers list...\n";

$clients = Client::all();
$syncCount = 0;
$lastCode = Provider::max('code') ?? 0;

foreach ($clients as $client) {
    // Check if supplier already exists by GSTIN or Name
    $existing = null;
    if ($client->gstin) {
        $existing = Provider::where('gstin', $client->gstin)->first();
    }
    
    if (!$existing) {
        $existing = Provider::where('name', $client->name)->first();
    }
    
    if (!$existing) {
        // Create new Supplier from Customer data
        Provider::create([
            'name' => $client->name,
            'code' => ++$lastCode,
            'email' => $client->email,
            'phone' => $client->phone,
            'country' => $client->country ?? 'India',
            'city' => $client->city,
            'adresse' => $client->adresse,
            'address_line_1' => $client->address_line_1,
            'address_line_2' => $client->address_line_2,
            'address_line_3' => $client->address_line_3,
            'gstin' => $client->gstin,
            'pan' => $client->pan,
            'state' => $client->state,
            'tax_number' => $client->gstin ?? $client->tax_number,
            'source_system' => 'Synced_From_Clients',
        ]);
        $syncCount++;
    }
}

echo "Done! Synced $syncCount customers into the Suppliers list.\n";
