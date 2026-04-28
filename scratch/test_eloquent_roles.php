<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$user = User::find(2);
echo "User: {$user->username}\n";

$roles = $user->roles;
echo "Roles count: " . $roles->count() . "\n";
foreach ($roles as $r) {
    echo "- Role: {$r->name} (ID: {$r->id})\n";
}

$firstRole = $user->roles()->first();
if ($firstRole) {
    echo "First Role from relationship method: {$firstRole->name} (ID: {$firstRole->id})\n";
} else {
    echo "First Role from relationship method: NULL\n";
}
