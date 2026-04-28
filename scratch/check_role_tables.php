<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$role_user = DB::table('role_user')->get();
echo "role_user table:\n";
foreach ($role_user as $ru) {
    echo "User ID: {$ru->user_id}, Role ID: {$ru->role_id}\n";
}

$users = DB::table('users')->get(['id', 'username', 'role_id']);
echo "\nusers table (role_id column):\n";
foreach ($users as $u) {
    echo "User ID: {$u->id}, Username: {$u->username}, role_id: {$u->role_id}\n";
}
