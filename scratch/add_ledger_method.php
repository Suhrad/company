<?php
$file = 'app/Http/Controllers/ReportController.php';
$content = file_get_contents($file);

$method = '
    public function Customer_Ledger(Request $request, $id)
    {
        $this->authorizeForUser($request->user(\'api\'), \'Reports_customers\', Client::class);

        $client = Client::with(\'company\')->findOrFail($id);
        $start_date = $request->input(\'start_date\', Carbon::now()->startOfYear()->toDateString());
        $end_date = $request->input(\'end_date\', Carbon::now()->toDateString());

        // 1. Calculate Opening Balance before $start_date
        $opening_balance = (double)$client->opening_balance;
        if ($client->opening_balance_type == \'Cr\') {
            $opening_balance = -$opening_balance;
        }

        $sales_before = Sale::where(\'client_id\', $id)->where(\'date\', \'<\', $start_date)->where(\'deleted_at\', \'=\', null)->sum(\'GrandTotal\');
        $payments_before = PaymentSale::whereHas(\'sale\', function ($q) use ($id) {
            $q->where(\'client_id\', $id);
        })->where(\'date\', \'<\', $start_date)->where(\'deleted_at\', \'=\', null)->sum(\'montant\');
        $returns_before = SaleReturn::where(\'client_id\', $id)->where(\'date\', \'<\', $start_date)->where(\'deleted_at\', \'=\', null)->sum(\'GrandTotal\');

        $effective_opening_balance = $opening_balance + $sales_before - ($payments_before + $returns_before);

        // 2. Fetch Transactions in range
        $sales = Sale::with(\'details.product.category\')
            ->where(\'client_id\', $id)
            ->whereBetween(\'date\', [$start_date, $end_date])
            ->where(\'deleted_at\', \'=\', null)
            ->get();

        $payments = PaymentSale::with(\'sale\')
            ->whereHas(\'sale\', function ($q) use ($id) {
                $q->where(\'client_id\', $id);
            })
            ->whereBetween(\'date\', [$start_date, $end_date])
            ->where(\'deleted_at\', \'=\', null)
            ->get();

        $returns = SaleReturn::where(\'client_id\', $id)
            ->whereBetween(\'date\', [$start_date, $end_date])
            ->where(\'deleted_at\', \'=\', null)
            ->get();

        $transactions = collect();

        foreach ($sales as $sale) {
            $category = $sale->details->first() && $sale->details->first()->product && $sale->details->first()->product->category 
                        ? strtoupper($sale->details->first()->product->category->name) . " SALES" 
                        : "GENERAL SALES";
            
            $transactions->push([
                \'date\' => $sale->date,
                \'book\' => \'Sale\',
                \'ref\' => $sale->Ref,
                \'particulars\' => $category . "\nSale Bill No. " . $sale->Ref,
                \'debit\' => (double)$sale->GrandTotal,
                \'credit\' => 0,
                \'timestamp\' => Carbon::parse($sale->date)->timestamp + ($sale->id / 1000000)
            ]);
        }

        foreach ($payments as $payment) {
            $transactions->push([
                \'date\' => $payment->date,
                \'book\' => \'Rcpt\',
                \'ref\' => $payment->Ref,
                \'particulars\' => "CASH\n" . ($payment->notes ? "Note: " . $payment->notes : ""),
                \'debit\' => 0,
                \'credit\' => (double)$payment->montant,
                \'timestamp\' => Carbon::parse($payment->date)->timestamp + ($payment->id / 1000000)
            ]);
        }

        foreach ($returns as $return) {
            $transactions->push([
                \'date\' => $return->date,
                \'book\' => \'SRtn\',
                \'ref\' => $return->Ref,
                \'particulars\' => "SALES RETURN\nRef: " . $return->Ref,
                \'debit\' => 0,
                \'credit\' => (double)$return->GrandTotal,
                \'timestamp\' => Carbon::parse($return->date)->timestamp + ($return->id / 1000000)
            ]);
        }

        $sorted_transactions = $transactions->sortBy(\'timestamp\')->values();

        $ledger = [];
        $balance = $effective_opening_balance;

        foreach ($sorted_transactions as $tx) {
            $balance += ($tx[\'debit\'] - $tx[\'credit\']);
            $tx[\'balance\'] = abs($balance);
            $tx[\'balance_type\'] = $balance >= 0 ? \'Dr\' : \'Cr\';
            $ledger[] = $tx;
        }

        return response()->json([
            \'client\' => $client,
            \'company\' => $client->company,
            \'opening_balance\' => abs($effective_opening_balance),
            \'opening_balance_type\' => $effective_opening_balance >= 0 ? \'Dr\' : \'Cr\',
            \'ledger\' => $ledger,
            \'closing_balance\' => abs($balance),
            \'closing_balance_type\' => $balance >= 0 ? \'Dr\' : \'Cr\',
            \'period\' => [
                \'start\' => $start_date,
                \'end\' => $end_date
            ]
        ]);
    }
';

$newContent = substr($content, 0, strrpos($content, '}')) . $method . "\n}";
file_put_contents($file, $newContent);
echo "Method added.\n";
