<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchases List</title>
    <style>
        @page { size: A4; margin: 20px; }
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 11px; color: #333; line-height: 1.4; }
        .container { width: 100%; }
        
        /* Header section */
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #444; padding-bottom: 10px; }
        .company-name { font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 0; }
        .company-info { font-size: 10px; margin: 2px 0; }
        
        .report-title { font-size: 16px; font-weight: bold; margin: 15px 0 5px; text-decoration: underline; }
        .period-info { font-size: 11px; font-weight: bold; margin-bottom: 15px; width: 100%; overflow: hidden; }
        .period-left { float: left; }
        .period-right { float: right; }
        
        /* Table styles */
        .summary-table { width: 100%; border-collapse: collapse; margin-top: 10px; page-break-inside: auto; }
        .summary-table tr { page-break-inside: avoid; page-break-after: auto; }
        .summary-table th { background-color: #f2f2f2; border: 1px solid #000; padding: 6px 4px; font-weight: bold; text-align: center; font-size: 11px; }
        .summary-table td { border: 1px solid #000; padding: 6px 4px; vertical-align: top; font-size: 10px; }
        
        .grandtotal-row { font-weight: bold; }
        .grandtotal-row td { border-top: 1.5px solid #000; border-bottom: 2px double #000; background-color: #f2f2f2; }
        
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <!-- COMPANY HEADER -->
        <div class="header">
            <h1 class="company-name">{{ $warehouse_name }}</h1>
            <p class="company-info">
                {{ $setting['CompanyAdress'] ?? '' }}
            </p>
            <div class="report-title">Purchases List</div>
        </div>

        <table class="summary-table">
            <thead>
                <tr>
                    <th width="40">Sr.No</th>
                    <th width="80">Date</th>
                    <th width="90">Bill No.</th>
                    <th width="120">Supplier Name</th>
                    <th>Items</th>
                    <th width="90" class="text-right">Bill Amount</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $grand_total = 0;
                @endphp
                @foreach ($purchases as $index => $row)
                    @php
                        $grand_total += $row['GrandTotal'];
                    @endphp
                    <tr>
                        <td class="text-center">{{ $index + 1 }}</td>
                        <td class="text-center">{{ Carbon\Carbon::parse($row['date'])->format('d-m-Y') }}</td>
                        <td class="text-center">{{ $row['Ref'] }}</td>
                        <td>{{ $row['provider_name'] }}</td>
                        <td>{{ $row['items'] }}</td>
                        <td class="text-right font-bold">{{ number_format($row['GrandTotal'], 2) }}</td>
                    </tr>
                @endforeach
                <tr class="grandtotal-row">
                    <td colspan="5" class="text-right font-bold">Total ...</td>
                    <td class="text-right font-bold">{{ number_format($grand_total, 2) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>
