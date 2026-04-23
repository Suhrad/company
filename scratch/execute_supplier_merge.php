<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Provider;
use Illuminate\Support\Facades\DB;

function normalize($name) {
    $name = strtoupper($name);
    $name = str_replace(['-', '.', ',', '  '], ' ', $name);
    return trim(preg_replace('/\s+/', ' ', $name));
}

$providers = Provider::all();
$count = $providers->count();
$mergedIds = [];

$tables = [
    'purchases' => 'provider_id',
    'purchase_returns' => 'provider_id',
];

echo "STARTING SUPPLIER MERGE (Identical and Fuzzy > 90%)...\n";

DB::beginTransaction();

try {
    for ($i = 0; $i < $count; $i++) {
        $p1 = $providers[$i];
        if (in_array($p1->id, $mergedIds)) continue;

        for ($j = $i + 1; $j < $count; $j++) {
            $p2 = $providers[$j];
            if (in_array($p2->id, $mergedIds)) continue;

            $name1 = normalize($p1->name);
            $name2 = normalize($p2->name);

            if (strlen($name1) < 5 || strlen($name2) < 5) continue;

            $similarity = 0;
            if ($name1 === $name2) {
                $similarity = 1.0;
            } else {
                $lev = levenshtein($name1, $name2);
                $maxLen = max(strlen($name1), strlen($name2));
                $similarity = 1 - ($lev / $maxLen);
            }

            if ($similarity > 0.90) {
                // Determine Master
                $score1 = ($p1->gstin ? 100 : 0) + ($p1->phone ? 10 : 0);
                $score2 = ($p2->gstin ? 100 : 0) + ($p2->phone ? 10 : 0);
                
                $master = ($score1 >= $score2) ? $p1 : $p2;
                $dup = ($master->id === $p1->id) ? $p2 : $p1;

                echo "Merging Supplier '{$dup->name}' into '{$master->name}' (" . round($similarity * 100) . "% match)\n";

                foreach ($tables as $table => $column) {
                    DB::table($table)->where($column, $dup->id)->update([$column => $master->id]);
                }

                $dup->delete();
                $mergedIds[] = $dup->id;
                
                if ($dup->id === $p1->id) break;
            }
        }
    }
    DB::commit();
    echo "Supplier merge complete.\n";
} catch (\Exception $e) {
    DB::rollBack();
    echo "Error: " . $e->getMessage() . "\n";
}
