<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Client;
use Illuminate\Support\Facades\DB;

echo "Searching for duplicate or similar customers...\n";

$clients = Client::all();
$count = $clients->count();
echo "Total Clients in DB: $count\n\n";

$duplicates = [];
$similar = [];
$sameGST = [];

// 1. Check same GSTIN but different names
$gstGroups = $clients->whereNotNull('gstin')->where('gstin', '!=', '')->groupBy('gstin');
foreach ($gstGroups as $gst => $group) {
    if ($group->count() > 1) {
        $names = $group->pluck('name')->unique()->toArray();
        if (count($names) > 1) {
            $sameGST[] = [
                'gstin' => $gst,
                'names' => $names,
                'ids' => $group->pluck('id')->toArray()
            ];
        }
    }
}

// 2. Check similar names
$clientArr = $clients->toArray();
for ($i = 0; $i < $count; $i++) {
    for ($j = $i + 1; $j < $count; $j++) {
        $name1 = strtoupper(trim($clientArr[$i]['name']));
        $name2 = strtoupper(trim($clientArr[$j]['name']));
        
        // Exact match (case insensitive)
        if ($name1 === $name2) {
            $duplicates[] = [
                'name' => $name1,
                'ids' => [$clientArr[$i]['id'], $clientArr[$j]['id']]
            ];
            continue;
        }
        
        // Check if one contains the other (e.g. "COMPANY LTD" vs "COMPANY")
        if (strlen($name1) > 5 && strlen($name2) > 5) {
            if (str_contains($name1, $name2) || str_contains($name2, $name1)) {
                $similar[] = [
                    'name1' => $clientArr[$i]['name'],
                    'name2' => $clientArr[$j]['name'],
                    'reason' => 'One name contains the other'
                ];
                continue;
            }
            
            // Levenshtein distance for fuzzy matching
            $lev = levenshtein($name1, $name2);
            $maxLen = max(strlen($name1), strlen($name2));
            $similarity = 1 - ($lev / $maxLen);
            
            if ($similarity > 0.85) {
                $similar[] = [
                    'name1' => $clientArr[$i]['name'],
                    'name2' => $clientArr[$j]['name'],
                    'reason' => 'Fuzzy match (' . round($similarity * 100) . '%)'
                ];
            }
        }
    }
}

echo "--- RESULTS ---\n\n";

if (!empty($sameGST)) {
    echo "1. Different names with SAME GSTIN:\n";
    foreach ($sameGST as $item) {
        echo "   GST: {$item['gstin']} | Names: " . implode(", ", $item['names']) . "\n";
    }
    echo "\n";
}

if (!empty($duplicates)) {
    echo "2. EXACT Name Matches (Duplicates):\n";
    foreach ($duplicates as $item) {
        echo "   Name: {$item['name']} | IDs: " . implode(", ", $item['ids']) . "\n";
    }
    echo "\n";
}

if (!empty($similar)) {
    echo "3. SIMILAR Names found:\n";
    foreach (array_slice($similar, 0, 50) as $item) {
        echo "   [{$item['reason']}] | '{$item['name1']}' <---> '{$item['name2']}'\n";
    }
    if (count($similar) > 50) echo "   ... and " . (count($similar) - 50) . " more.\n";
}

if (empty($sameGST) && empty($duplicates) && empty($similar)) {
    echo "No obvious duplicates found!\n";
}
