<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

$clients = App\Models\Client::all();
$groups = [];

foreach ($clients as $client) {
    $normalized = preg_replace('/[^a-z0-9]/', '', strtolower($client->name));
    $groups[$normalized][] = $client;
}

echo "STARTING CLIENT MERGE\n";
echo "=====================\n";

foreach ($groups as $normalized => $clients_in_group) {
    if (count($clients_in_group) <= 1) continue;

    // Determine Master
    usort($clients_in_group, function($a, $b) {
        // Priority 1: Has GSTIN
        if ($a->gstin && !$b->gstin) return -1;
        if (!$a->gstin && $b->gstin) return 1;
        
        // Priority 2: Has Address
        if ($a->adresse && !$b->adresse) return -1;
        if (!$a->adresse && $b->adresse) return 1;
        
        // Priority 3: Older record
        return $a->id - $b->id;
    });

    $master = $clients_in_group[0];
    $duplicates = array_slice($clients_in_group, 1);

    echo "Merging into Master ID: {$master->id} (Name: \"{$master->name}\" | GSTIN: \"{$master->gstin}\")\n";

    foreach ($duplicates as $dup) {
        echo "  - Moving data from Duplicate ID: {$dup->id} (Name: \"{$dup->name}\")...\n";
        
        $tables = [
            'sales', 'sale_returns', 'quotations', 'deposits', 
            'draft_sales', 'projects', 'subscriptions', 'online_orders',
            'ecommerce_clients', 'purchase_clients'
        ];

        foreach ($tables as $table) {
            if (Schema::hasTable($table)) {
                try {
                    $affected = DB::table($table)->where('client_id', $dup->id)->update(['client_id' => $master->id]);
                    if ($affected > 0) echo "    * Updated $affected rows in $table\n";
                } catch (\Exception $e) {
                    // Column might not exist despite table existing
                }
            }
        }
        
        // Update settings
        if (Schema::hasTable('settings')) {
             DB::table('settings')->where('client_id', $dup->id)->update(['client_id' => $master->id]);
        }

        // Delete the duplicate
        $dup->delete();
        echo "    * Deleted duplicate ID: {$dup->id}\n";
    }
    echo "---------------------------------\n";
}
echo "MERGE COMPLETED\n";
