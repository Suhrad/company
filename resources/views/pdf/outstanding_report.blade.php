<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title }}</title>
    <style>
        @page { size: A4; margin: 20px; }
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 12px; color: #333; line-height: 1.4; }
        .container { width: 100%; }
        
        /* Header section */
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #444; padding-bottom: 10px; }
        .company-name { font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 0; }
        .company-info { font-size: 10px; margin: 2px 0; }
        
        .report-title { font-size: 16px; font-weight: bold; margin: 15px 0 5px; text-decoration: underline; }
        
        /* Table styles */
        .ledger-table { width: 100%; border-collapse: collapse; margin-top: 10px; page-break-inside: auto; }
        .ledger-table tr { page-break-inside: avoid; page-break-after: auto; }
        .ledger-table th { background-color: #f2f2f2; border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left; }
        .ledger-table td { border: 1px solid #000; padding: 8px; vertical-align: middle; page-break-inside: avoid; page-break-after: auto; }
        
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        .bg-grey { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="container">
        <!-- COMPANY HEADER -->
        <div class="header">
            <h1 class="company-name">|| Swami Shreeji ||</h1>
            <p class="company-info">
                {{ $setting['CompanyAdress'] ?? '' }}
                @if(isset($setting['CompanyPhone'])) <br>Phone: {{ $setting['CompanyPhone'] }} @endif
            </p>
            <div class="report-title">{{ $title }}</div>
        </div>

        <!-- OUTSTANDING TABLE -->
        <table class="ledger-table">
            <thead>
                <tr>
                    <th>Company Name</th>
                    <th width="150" class="text-right">{{ $amount_column }}</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($reports as $row)
                <tr>
                    <td>{{ $row['name'] }}</td>
                    <td class="text-right font-bold">{{ $symbol }} {{ number_format($row['amount'], 2) }}</td>
                </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr class="bg-grey">
                    <td class="text-right font-bold">Total</td>
                    <td class="text-right font-bold">{{ $symbol }} {{ number_format($total_amount, 2) }}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</body>
</html>
