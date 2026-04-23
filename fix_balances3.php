<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$deposits = App\Models\Deposit::where('client_id', 2)->get();
foreach ($deposits as $d) {
    echo "Deposit $d->id: amount=$d->amount, date=$d->date\n";
}
