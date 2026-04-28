<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Permission;

$user = User::find(2);
$permission = Permission::where('name', 'Sales_add')->first();

echo "User: {$user->username}\n";
echo "Permission: {$permission->name}\n";

$permissionRoles = $permission->roles;
echo "Roles for Permission:\n";
foreach ($permissionRoles as $r) {
    echo "- {$r->name} (ID: {$r->id})\n";
}

$userRoles = $user->roles;
echo "Roles for User:\n";
foreach ($userRoles as $r) {
    echo "- {$r->name} (ID: {$r->id})\n";
}

$intersect = $permissionRoles->intersect($userRoles);
echo "Intersection Count: " . $intersect->count() . "\n";

foreach ($intersect as $r) {
    echo "Matched Role: {$r->name} (ID: {$r->id})\n";
}

if ($intersect->count() > 0) {
    echo "Result: TRUE\n";
} else {
    echo "Result: FALSE\n";
}
