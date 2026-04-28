<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$user_warehouse = DB::table('user_warehouse')->where('user_id', 2)->get();
echo "Warehouses for User 2:\n";
foreach ($user_warehouse as $uw) {
    echo "- Warehouse ID: {$uw->warehouse_id}\n";
}

$user = DB::table('users')->where('id', 2)->first();
echo "User 2 is_all_warehouses: {$user->is_all_warehouses}\n";
