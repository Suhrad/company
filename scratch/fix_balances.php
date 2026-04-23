<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$sales = App\Models\Sale::with('facture')->get();
foreach ($sales as $sale) {
    $real_paid = App\Models\PaymentSale::where('sale_id', $sale->id)->where('deleted_at', null)->sum('montant');
    if (round($real_paid, 2) != round($sale->paid_amount, 2)) {
        echo "Sale $sale->id (Ref $sale->Ref): real_paid=$real_paid, stored=$sale->paid_amount\n";
    }
}
