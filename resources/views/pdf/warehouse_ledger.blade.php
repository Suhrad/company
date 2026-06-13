<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Warehouse Ledger - {{ $warehouse_name }}</title>
    <style>
        @page { size: A4; margin: 20px; }
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 11px; color: #333; line-height: 1.4; }
        .container { width: 100%; }
        
        /* Header section */
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #444; padding-bottom: 10px; }
        .company-name { font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 0; }
        .company-info { font-size: 10px; margin: 2px 0; }
        
        .report-title { font-size: 16px; font-weight: bold; margin: 15px 0 5px; text-decoration: underline; }
        .period { font-size: 11px; font-weight: bold; margin-bottom: 15px; }

        /* Table styles */
        .ledger-table { width: 100%; border-collapse: collapse; margin-top: 10px; page-break-inside: auto; }
        .ledger-table tr { page-break-inside: avoid; page-break-after: auto; }
        .ledger-table th { background-color: #f2f2f2; border: 1px solid #000; padding: 4px 2px; font-weight: bold; text-align: center; font-size: 10px; }
        .ledger-table td { border: 1px solid #000; padding: 4px 2px; vertical-align: top; page-break-inside: avoid; page-break-after: auto; }
        
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        
        .particulars-cell { font-size: 10px; white-space: pre-line; }
        
        /* Footer section */
        .footer-table { width: 100%; margin-top: 0; }
        .footer-table td { border: 1px solid #000; padding: 6px; font-weight: bold; }
        .bg-grey { background-color: #f2f2f2; }

        .balance-col { width: 100px; }
    </style>
</head>
<body>
    <div class="container">
        <!-- COMPANY HEADER -->
        <div class="header">
            <h1 class="company-name">|| Swami Shreeji ||</h1>
            <p class="company-info">
                {{ $setting->address ?? '' }}
                @if(isset($setting->city)) , {{ $setting->city }} @endif
                @if(isset($setting->phone)) <br>Phone: {{ $setting->phone }} @endif
            </p>
            <div class="report-title">Warehouse Ledger - {{ $warehouse_name }}</div>
        </div>

        <!-- LEDGER TABLE -->
        <table class="ledger-table">
            <thead>
                <tr>
                    <th width="70">Date</th>
                    <th width="70">Reference</th>
                    <th width="50">Type</th>
                    <th>Description</th>
                    <th width="75">Debit</th>
                    <th width="75">Credit</th>
                    <th width="85">Balance</th>
                </tr>
            </thead>
            <tbody>
                @foreach($ledger as $row)
                    <tr>
                        <td class="text-center">{{ Carbon\Carbon::parse($row['date'])->format('d-m-Y') }}</td>
                        <td class="text-center">{{ $row['Ref'] }}</td>
                        <td class="text-center">{{ $row['type'] }}</td>
                        <td class="particulars-cell">{{ $row['description'] }}</td>
                        <td class="text-right">{{ $row['debit'] > 0 ? number_format($row['debit'], 2) : '' }}</td>
                        <td class="text-right">{{ $row['credit'] > 0 ? number_format($row['credit'], 2) : '' }}</td>
                        <td class="text-right font-bold">
                            {{ number_format($row['balance'], 2) }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr class="bg-grey">
                    <td colspan="4" class="text-right font-bold">Total .....</td>
                    <td class="text-right font-bold">{{ number_format($total_debit, 2) }}</td>
                    <td class="text-right font-bold">{{ number_format($total_credit, 2) }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="6" class="text-right font-bold">Final Balance...</td>
                    <td class="text-right font-bold bg-grey">
                        {{ number_format($balance, 2) }}
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</body>
</html>
