<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;

$user = User::find(2);
Auth::login($user); // Login to web guard for the simulation

$controller = new UserController();
$request = Request::create('/api/get_user_auth', 'GET');
$request->setUserResolver(function () use ($user) {
    return $user;
});

$response = $controller->GetUserAuth($request);
echo "Response: " . $response->getContent() . "\n";
