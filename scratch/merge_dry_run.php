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

foreach ($normalizedMap as $norm => $group) {
    if (count($group) > 1) {
        // Decide which one is the master
        // Strategy: prefer one with GSTIN, then one with more filled fields
        usort($group, function($a, $b) {
            $scoreA = ($a->gstin ? 100 : 0) + ($a->phone ? 10 : 0) + ($a->address_line_1 ? 5 : 0);
            $scoreB = ($b->gstin ? 100 : 0) + ($b->phone ? 10 : 0) + ($b->address_line_1 ? 5 : 0);
            return $scoreB <=> $scoreA; // Highest score first
        });
        
        $master = $group[0];
        for ($i = 1; $i < count($group); $i++) {
            $toMerge[] = [
                'master' => $master,
                'duplicate' => $group[$i]
            ];
        }
    }
}

echo "SAFE MERGE DRY RUN\n";
echo "==================\n";
if (empty($toMerge)) {
    echo "No obvious duplicates found for auto-merge.\n";
} else {
    foreach ($toMerge as $pair) {
        echo "MERGE: '{$pair['duplicate']->name}' (ID: {$pair['duplicate']->id}) \n";
        echo " INTO: '{$pair['master']->name}' (ID: {$pair['master']->id})\n";
        if ($pair['duplicate']->gstin != $pair['master']->gstin && $pair['duplicate']->gstin) {
            echo "   Warning: Duplicate has GSTIN {$pair['duplicate']->gstin} while Master has {$pair['master']->gstin}\n";
        }
        echo "------------------\n";
    }
    echo "\nTotal Merges planned: " . count($toMerge) . "\n";
}
