<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Item Summary</title>
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
        .summary-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; page-break-inside: auto; }
        .summary-table tr { page-break-inside: avoid; page-break-after: auto; }
        .summary-table th { background-color: #f2f2f2; border: 1px solid #000; padding: 6px 4px; font-weight: bold; text-align: center; font-size: 11px; }
        .summary-table td { border: 1px solid #000; padding: 6px 4px; vertical-align: middle; font-size: 10px; }
        
        .group-header { font-weight: bold; background-color: #f9f9f9; }
        .subtotal-row { font-weight: bold; }
        .subtotal-row td { border-top: 1px solid #000; border-bottom: 2px double #000; background-color: #fafafa; }
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
            <div class="report-title">Sales Item Summary</div>
        </div>
        
        <div class="period-info">
            <div class="period-left">Period From : {{ Carbon\Carbon::parse($from)->format('d/m/Y') }} To {{ Carbon\Carbon::parse($to)->format('d/m/Y') }}</div>
            <div class="period-right">Page.1</div>
        </div>

        <table class="summary-table">
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th width="100" class="text-right">Qty</th>
                    <th width="150" class="text-right">Amount</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $sales_grand_qty = 0;
                    $sales_grand_amount = 0;
                @endphp
                
                @if(count($sales_report) === 0)
                    <tr>
                        <td colspan="3" class="text-center">No sales transactions found in this period.</td>
                    </tr>
                @else
                    @foreach ($sales_report as $category_name => $items)
                        <!-- Item Group Header -->
                        <tr class="group-header">
                            <td colspan="3">Item Group Name : {{ $category_name }}</td>
                        </tr>
                        
                        @php
                            $cat_qty = 0;
                            $cat_amount = 0;
                        @endphp
                        
                        @foreach ($items as $item)
                            @php
                                $cat_qty += $item['qty'];
                                $cat_amount += $item['amount'];
                            @endphp
                            <tr>
                                <td>{{ $item['name'] }}</td>
                                <td class="text-right">{{ number_format($item['qty'], 3) }}</td>
                                <td class="text-right font-bold">{{ number_format($item['amount'], 2) }}</td>
                            </tr>
                        @endforeach
                        
                        <!-- Sub Total for Category -->
                        <tr class="subtotal-row">
                            <td class="text-right">Sub Total...</td>
                            <td class="text-right">{{ number_format($cat_qty, 3) }}</td>
                            <td class="text-right">{{ number_format($cat_amount, 2) }}</td>
                        </tr>
                        
                        @php
                            $sales_grand_qty += $cat_qty;
                            $sales_grand_amount += $cat_amount;
                        @endphp
                    @endforeach
                    
                    <!-- Grand Total for Sales -->
                    <tr class="grandtotal-row">
                        <td class="text-right">Grand Total...</td>
                        <td class="text-right">{{ number_format($sales_grand_qty, 3) }}</td>
                        <td class="text-right">{{ number_format($sales_grand_amount, 2) }}</td>
                    </tr>
                @endif
            </tbody>
        </table>
    </div>
</body>
</html>
