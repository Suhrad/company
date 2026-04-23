<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$sales = App\Models\Sale::where('client_id', 2)->get();
foreach ($sales as $sale) {
    echo "Sale $sale->id (Ref $sale->Ref) - GrandTotal: $sale->GrandTotal, paid_amount: $sale->paid_amount, statut: $sale->statut, payment_statut: $sale->payment_statut\n";
    $payments = App\Models\PaymentSale::where('sale_id', $sale->id)->get();
    foreach ($payments as $p) {
        echo "  -> Payment $p->id: montant=$p->montant, deleted_at=$p->deleted_at\n";
    }
}
