<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$clients = App\Models\Client::all();
$normalized_clients = [];

foreach ($clients as $client) {
    // Normalize name: lowercase, remove non-alphanumeric, collapse spaces
    $normalized = preg_replace('/[^a-z0-9]/', '', strtolower($client->name));
    $normalized_clients[$normalized][] = [
        'id' => $client->id,
        'name' => $client->name,
        'gstin' => $client->gstin,
        'adresse' => $client->adresse
    ];
}

echo "SUSPICIOUS DUPLICATE GROUPS:\n";
echo "============================\n";

foreach ($normalized_clients as $normalized => $group) {
    if (count($group) > 1) {
        echo "Group (Normalized: $normalized):\n";
        foreach ($group as $c) {
            $has_data = ($c['gstin'] || $c['adresse']) ? " [HAS DATA]" : " [EMPTY]";
            echo "  - ID: {$c['id']} | Name: \"{$c['name']}\" | GSTIN: \"{$c['gstin']}\" $has_data\n";
        }
        echo "----------------------------\n";
    }
}
