<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Client;
use Illuminate\Support\Facades\DB;

function normalize($name) {
    $name = strtoupper($name);
    $name = str_replace(['-', '.', ',', '  '], ' ', $name);
    return trim(preg_replace('/\s+/', ' ', $name));
}

$clients = Client::all();
$normalizedMap = [];
$toMerge = [];

foreach ($clients as $client) {
    $norm = normalize($client->name);
    $normalizedMap[$norm][] = $client;
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

echo "STARTING CUSTOMER MERGE...\n";

DB::beginTransaction();

try {
    foreach ($normalizedMap as $norm => $group) {
        if (count($group) > 1) {
            usort($group, function($a, $b) {
                $scoreA = ($a->gstin ? 100 : 0) + ($a->phone ? 10 : 0) + ($a->address_line_1 ? 5 : 0);
                $scoreB = ($b->gstin ? 100 : 0) + ($b->phone ? 10 : 0) + ($b->address_line_1 ? 5 : 0);
                return $scoreB <=> $scoreA;
            });
            
            $master = $group[0];
            echo "Master: '{$master->name}' (ID: {$master->id})\n";
            
            for ($i = 1; $i < count($group); $i++) {
                $dup = $group[$i];
                echo "  Merging Duplicate: '{$dup->name}' (ID: {$dup->id})...\n";
                
                foreach ($tables as $table => $column) {
                    $updated = DB::table($table)->where($column, $dup->id)->update([$column => $master->id]);
                    if ($updated) {
                        echo "    Moved $updated records from table $table\n";
                    }
                }
                
                // Delete the duplicate
                $dup->delete();
                echo "    Deleted Duplicate record.\n";
            }
            echo "------------------\n";
        }
    }
    DB::commit();
    echo "SUCCESS: Merging complete.\n";
} catch (\Exception $e) {
    DB::rollBack();
    echo "ERROR during merge: " . $e->getMessage() . "\n";
}
