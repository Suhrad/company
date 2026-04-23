<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Client;
use Illuminate\Support\Facades\DB;

$tables = [
    'sales' => 'client_id',
    'quotations' => 'client_id',
    'sale_returns' => 'client_id',
    'deposits' => 'client_id',
    'draft_sales' => 'client_id',
    'online_orders' => 'client_id',
    'projects' => 'client_id',
];

echo "AUTO-MERGING ALL FUZZY MATCHES (> 87% similarity)...\n";

$clients = Client::all();
$count = $clients->count();
$mergedIds = [];

DB::beginTransaction();

try {
    for ($i = 0; $i < $count; $i++) {
        $c1 = $clients[$i];
        if (in_array($c1->id, $mergedIds)) continue;

        for ($j = $i + 1; $j < $count; $j++) {
            $c2 = $clients[$j];
            if (in_array($c2->id, $mergedIds)) continue;

            $name1 = strtoupper(trim($c1->name));
            $name2 = strtoupper(trim($c2->name));

            if (strlen($name1) < 5 || strlen($name2) < 5) continue;

            $lev = levenshtein($name1, $name2);
            $maxLen = max(strlen($name1), strlen($name2));
            $similarity = 1 - ($lev / $maxLen);

            // 87% is a safe threshold for typos/hyphen differences
            if ($similarity > 0.87) {
                // Exclude known distinct companies (manual overrides if any)
                if (str_contains($name1, 'ANANT') && str_contains($name2, 'SHAKTI')) continue;
                if (str_contains($name1, 'RAJA') && str_contains($name2, 'RAJPUT')) continue;

                // Determine Master
                $score1 = ($c1->gstin ? 100 : 0) + ($c1->phone ? 10 : 0) + (strlen($c1->adresse) > 5 ? 5 : 0);
                $score2 = ($c2->gstin ? 100 : 0) + ($c2->phone ? 10 : 0) + (strlen($c2->adresse) > 5 ? 5 : 0);
                
                $master = ($score1 >= $score2) ? $c1 : $c2;
                $dup = ($master->id === $c1->id) ? $c2 : $c1;

                echo "Merging '{$dup->name}' into '{$master->name}' (" . round($similarity * 100) . "% match)\n";

                foreach ($tables as $table => $column) {
                    DB::table($table)->where($column, $dup->id)->update([$column => $master->id]);
                }

                $dup->delete();
                $mergedIds[] = $dup->id;
                
                // If we merged c1, break inner loop
                if ($dup->id === $c1->id) break;
            }
        }
    }
    DB::commit();
    echo "Fuzzy merge complete.\n";
} catch (\Exception $e) {
    DB::rollBack();
    echo "Error: " . $e->getMessage() . "\n";
}
