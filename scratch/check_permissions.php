<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;

$permissions = Permission::all(['id', 'name']);
echo "Available Permissions:\n";
foreach ($permissions as $p) {
    echo "- {$p->name}\n";
}

$roles = Role::with('permissions')->get();
echo "\nRoles and their Permissions:\n";
foreach ($roles as $r) {
    echo "Role: {$r->name} (ID: {$r->id})\n";
    foreach ($r->permissions as $p) {
        echo "  - {$p->name}\n";
    }
}

$users = User::with('roles')->get();
echo "\nUsers and their Roles:\n";
foreach ($users as $u) {
    $roleNames = $u->roles->pluck('name')->toArray();
    echo "User: {$u->username} (ID: {$u->id}) Roles: " . implode(', ', $roleNames) . "\n";
}
