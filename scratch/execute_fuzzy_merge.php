<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Client;
use Illuminate\Support\Facades\DB;

$mergePairs = [
    ['ARUN KUMAR JAISAWAL - KUSHINAGAR', 'ARUN KUMAR JAISWAL - KUSHINAGAR'],
    ['AMARBABU PRASADBETTIAN', 'AMARBABU PRASAD - BETTIAH'],
    ['RAJESHRI UDHYOG GWALIOR', 'RAJ SHRI UDHYOG - GWALIOR'],
    ['AMEY ENTERPRISE - MUMBAI', 'AMI ENTERPRISE - MUMBAI'],
    ['SHEETAL NARAYAN WAREHOUSE', 'SHITAL NARAYAN WAREHOUSE'],
    ['NEW VEERAMANIKANTHA TRADERS', 'NEW VEERAMANIKANTA TRADERS'],
    ['OM SIVA SAI TRADERS - VIJAYWADA', 'OM SIVA SAI TRADERS - VIJAYAWADA'],
    ['SHRI SAMBHAV CORPORATION', 'SHREE SAMBHAV CORPORATION'],
    ['SRI LAKSHMI SRINIVASA ENTERPRISE', 'SRI LAKSHMI SRINIVASA ENTERPRISES'],
    ['HARIYANA ROPE STORE', 'HARYANA ROPE STORE'],
    ['KASTURILAL AND SONS', 'KASTURI LAL & SONS'],
];

// Helper to find client by name (partial match if needed)
function findBestMatch($name) {
    return Client::where('name', 'like', "%$name%")->first();
}

$tables = [
    'sales' => 'client_id',
    'quotations' => 'client_id',
    'sale_returns' => 'client_id',
    'deposits' => 'client_id',
    'draft_sales' => 'client_id',
    'online_orders' => 'client_id',
    'projects' => 'client_id',
];

echo "STARTING FUZZY MERGE...\n";

DB::beginTransaction();

try {
    foreach ($mergePairs as $pair) {
        $client1 = Client::where('name', $pair[0])->first();
        $client2 = Client::where('name', $pair[1])->first();
        
        if (!$client1 || !$client2) {
            // Try fuzzy if exact name not found in DB (maybe punctuation was already cleaned)
            echo "Warning: Could not find exact match for '{$pair[0]}' or '{$pair[1]}'. Skipping.\n";
            continue;
        }

        // Decide Master
        $score1 = ($client1->gstin ? 100 : 0) + ($client1->phone ? 10 : 0) + (strlen($client1->adresse) > 5 ? 5 : 0);
        $score2 = ($client2->gstin ? 100 : 0) + ($client2->phone ? 10 : 0) + (strlen($client2->adresse) > 5 ? 5 : 0);
        
        $master = ($score1 >= $score2) ? $client1 : $client2;
        $dup = ($master->id === $client1->id) ? $client2 : $client1;
        
        echo "Merging '{$dup->name}' -> '{$master->name}'\n";
        
        foreach ($tables as $table => $column) {
            $updated = DB::table($table)->where($column, $dup->id)->update([$column => $master->id]);
            if ($updated) echo "  Moved $updated records from $table\n";
        }
        
        $dup->delete();
    }
    DB::commit();
    echo "Fuzzy merge complete.\n";
} catch (\Exception $e) {
    DB::rollBack();
    echo "Error: " . $e->getMessage() . "\n";
}
