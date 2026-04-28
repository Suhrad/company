<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Sale;
use Illuminate\Support\Facades\Gate;

$user = User::find(2);
echo "User: {$user->username} (ID: 2)\n";

$canCreate = Gate::forUser($user)->allows('create', Sale::class);
echo "Can Create Sale? " . ($canCreate ? "YES" : "NO") . "\n";

$canView = Gate::forUser($user)->allows('view', Sale::class);
echo "Can View Sale? " . ($canView ? "YES" : "NO") . "\n";

$canPos = Gate::forUser($user)->allows('Sales_pos', Sale::class);
echo "Can POS? " . ($canPos ? "YES" : "NO") . "\n";
