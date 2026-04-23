<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Client;

echo "GENERATING FUZZY MATCH LIST (Similarity > 85%)\n";
echo "==============================================\n";

$clients = Client::all()->toArray();
$count = count($clients);
$similar = [];

for ($i = 0; $i < $count; $i++) {
    for ($j = $i + 1; $j < $count; $j++) {
        $name1 = strtoupper(trim($clients[$i]['name']));
        $name2 = strtoupper(trim($clients[$j]['name']));
        
        if (strlen($name1) < 5 || strlen($name2) < 5) continue;

        // Levenshtein distance
        $lev = levenshtein($name1, $name2);
        $maxLen = max(strlen($name1), strlen($name2));
        $similarity = 1 - ($lev / $maxLen);
        
        if ($similarity > 0.85 && $similarity < 1.0) {
            $similar[] = [
                'name1' => $clients[$i]['name'],
                'name2' => $clients[$j]['name'],
                'score' => round($similarity * 100) . '%',
                'gstin1' => $clients[$i]['gstin'] ?? 'N/A',
                'gstin2' => $clients[$j]['gstin'] ?? 'N/A'
            ];
        }
    }
}

// Sort by similarity score descending
usort($similar, function($a, $b) {
    return (int)$b['score'] <=> (int)$a['score'];
});

if (empty($similar)) {
    echo "No similar names found.\n";
} else {
    echo "Count: " . count($similar) . "\n\n";
    printf("%-40s | %-40s | %s\n", "Name 1", "Name 2", "Similarity");
    echo str_repeat("-", 95) . "\n";
    foreach ($similar as $item) {
        printf("%-40s | %-40s | %s\n", $item['name1'], $item['name2'], $item['score']);
    }
}
