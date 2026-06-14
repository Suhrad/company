<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales & Credit Note Item Summary</title>
    <style>
        @page { size: A4 landscape; margin: 20px; }
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 10px; color: #333; line-height: 1.4; }
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
        .summary-table th { background-color: #f2f2f2; border: 1px solid #000; padding: 4px 2px; font-weight: bold; text-align: center; font-size: 10px; }
        .summary-table td { border: 1px solid #000; padding: 4px 2px; vertical-align: middle; font-size: 9px; }
        
        .group-header { font-weight: bold; background-color: #f9f9f9; }
        .subtotal-row { font-weight: bold; }
        .subtotal-row td { border-top: 1px solid #000; border-bottom: 2px double #000; background-color: #fafafa; }
        .grandtotal-row { font-weight: bold; }
        .grandtotal-row td { border-top: 1.5px solid #000; border-bottom: 2px double #000; background-color: #f2f2f2; }
        
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        
        .page-break { page-break-after: always; }
        .section-divider { margin: 30px 0; border-top: 1px dashed #666; }
    </style>
</head>
<body>
    <div class="container">
        <!-- ================= SALES ITEM SUMMARY ================= -->
        <div class="header">
            <h1 class="company-name">{{ $warehouse_name }}</h1>
            <p class="company-info">
                {{ $setting['CompanyAdress'] ?? '' }}
                @if(isset($setting['CompanyPhone'])) <br>Phone: {{ $setting['CompanyPhone'] }} @endif
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
                    <th width="70">HSN Code</th>
                    <th width="40" class="text-right">GST %</th>
                    <th width="70" class="text-right">Qty</th>
                    <th width="90" class="text-right">Amount</th>
                    <th width="60" class="text-right">TCS Amount</th>
                    <th width="70" class="text-right">CGST Amount</th>
                    <th width="70" class="text-right">SGST Amount</th>
                    <th width="70" class="text-right">IGST Amount</th>
                    <th width="90" class="text-right">Total Amt</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $sales_grand_qty = 0;
                    $sales_grand_amount = 0;
                    $sales_grand_tcs = 0;
                    $sales_grand_cgst = 0;
                    $sales_grand_sgst = 0;
                    $sales_grand_igst = 0;
                    $sales_grand_total = 0;
                @endphp
                
                @if(count($sales_report) === 0)
                    <tr>
                        <td colspan="10" class="text-center">No sales transactions found in this period.</td>
                    </tr>
                @else
                    @foreach ($sales_report as $category_name => $items)
                        <!-- Item Group Header -->
                        <tr class="group-header">
                            <td colspan="10">Item Group Name : {{ $category_name }}</td>
                        </tr>
                        
                        @php
                            $cat_qty = 0;
                            $cat_amount = 0;
                            $cat_tcs = 0;
                            $cat_cgst = 0;
                            $cat_sgst = 0;
                            $cat_igst = 0;
                            $cat_total = 0;
                        @endphp
                        
                        @foreach ($items as $item)
                            @php
                                $cat_qty += $item['qty'];
                                $cat_amount += $item['amount'];
                                $cat_tcs += $item['tcs'];
                                $cat_cgst += $item['cgst'];
                                $cat_sgst += $item['sgst'];
                                $cat_igst += $item['igst'];
                                $cat_total += $item['total'];
                            @endphp
                            <tr>
                                <td>{{ $item['name'] }}</td>
                                <td class="text-center">{{ $item['hsn'] ?? '---' }}</td>
                                <td class="text-right">{{ number_format($item['gst_rate'], 2) }}</td>
                                <td class="text-right">{{ number_format($item['qty'], 3) }}</td>
                                <td class="text-right">{{ number_format($item['amount'], 2) }}</td>
                                <td class="text-right">{{ $item['tcs'] > 0 ? number_format($item['tcs'], 2) : '' }}</td>
                                <td class="text-right">{{ $item['cgst'] > 0 ? number_format($item['cgst'], 2) : '' }}</td>
                                <td class="text-right">{{ $item['sgst'] > 0 ? number_format($item['sgst'], 2) : '' }}</td>
                                <td class="text-right">{{ $item['igst'] > 0 ? number_format($item['igst'], 2) : '' }}</td>
                                <td class="text-right font-bold">{{ number_format($item['total'], 2) }}</td>
                            </tr>
                        @endforeach
                        
                        <!-- Sub Total for Category -->
                        <tr class="subtotal-row">
                            <td colspan="3" class="text-right">Sub Total...</td>
                            <td class="text-right">{{ number_format($cat_qty, 3) }}</td>
                            <td class="text-right">{{ number_format($cat_amount, 2) }}</td>
                            <td class="text-right">{{ $cat_tcs > 0 ? number_format($cat_tcs, 2) : '' }}</td>
                            <td class="text-right">{{ $cat_cgst > 0 ? number_format($cat_cgst, 2) : '' }}</td>
                            <td class="text-right">{{ $cat_sgst > 0 ? number_format($cat_sgst, 2) : '' }}</td>
                            <td class="text-right">{{ $cat_igst > 0 ? number_format($cat_igst, 2) : '' }}</td>
                            <td class="text-right">{{ number_format($cat_total, 2) }}</td>
                        </tr>
                        
                        @php
                            $sales_grand_qty += $cat_qty;
                            $sales_grand_amount += $cat_amount;
                            $sales_grand_tcs += $cat_tcs;
                            $sales_grand_cgst += $cat_cgst;
                            $sales_grand_sgst += $cat_sgst;
                            $sales_grand_igst += $cat_igst;
                            $sales_grand_total += $cat_total;
                        @endphp
                    @endforeach
                    
                    <!-- Grand Total for Sales -->
                    <tr class="grandtotal-row">
                        <td colspan="3" class="text-right">Grand Total...</td>
                        <td class="text-right">{{ number_format($sales_grand_qty, 3) }}</td>
                        <td class="text-right">{{ number_format($sales_grand_amount, 2) }}</td>
                        <td class="text-right">{{ $sales_grand_tcs > 0 ? number_format($sales_grand_tcs, 2) : '' }}</td>
                        <td class="text-right">{{ $sales_grand_cgst > 0 ? number_format($sales_grand_cgst, 2) : '' }}</td>
                        <td class="text-right">{{ $sales_grand_sgst > 0 ? number_format($sales_grand_sgst, 2) : '' }}</td>
                        <td class="text-right">{{ $sales_grand_igst > 0 ? number_format($sales_grand_igst, 2) : '' }}</td>
                        <td class="text-right">{{ number_format($sales_grand_total, 2) }}</td>
                    </tr>
                @endif
            </tbody>
        </table>

        <!-- section divider or page break if needed -->
        <div class="section-divider"></div>

        <!-- ================= CREDIT NOTE ITEM SUMMARY ================= -->
        <div class="header">
            <h1 class="company-name">{{ $warehouse_name }}</h1>
            <p class="company-info">
                {{ $setting['CompanyAdress'] ?? '' }}
                @if(isset($setting['CompanyPhone'])) <br>Phone: {{ $setting['CompanyPhone'] }} @endif
            </p>
            <div class="report-title">Credit Note Item Summary</div>
        </div>
        
        <div class="period-info">
            <div class="period-left">Period From : {{ Carbon\Carbon::parse($from)->format('d/m/Y') }} To {{ Carbon\Carbon::parse($to)->format('d/m/Y') }}</div>
        </div>

        <table class="summary-table">
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th width="70">HSN Code</th>
                    <th width="40" class="text-right">GST %</th>
                    <th width="70" class="text-right">Qty</th>
                    <th width="90" class="text-right">Amount</th>
                    <th width="70" class="text-right">CGST Amount</th>
                    <th width="70" class="text-right">SGST Amount</th>
                    <th width="70" class="text-right">IGST Amount</th>
                    <th width="90" class="text-right">Total Amt</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $returns_grand_qty = 0;
                    $returns_grand_amount = 0;
                    $returns_grand_cgst = 0;
                    $returns_grand_sgst = 0;
                    $returns_grand_igst = 0;
                    $returns_grand_total = 0;
                @endphp
                
                @if(count($returns_report) === 0)
                    <tr>
                        <td colspan="9" class="text-center">No credit notes (returns) found in this period.</td>
                    </tr>
                @else
                    @foreach ($returns_report as $category_name => $items)
                        <!-- Item Group Header -->
                        <tr class="group-header">
                            <td colspan="9">Item Group Name : {{ $category_name }}</td>
                        </tr>
                        
                        @php
                            $cat_qty = 0;
                            $cat_amount = 0;
                            $cat_cgst = 0;
                            $cat_sgst = 0;
                            $cat_igst = 0;
                            $cat_total = 0;
                        @endphp
                        
                        @foreach ($items as $item)
                            @php
                                $cat_qty += $item['qty'];
                                $cat_amount += $item['amount'];
                                $cat_cgst += $item['cgst'];
                                $cat_sgst += $item['sgst'];
                                $cat_igst += $item['igst'];
                                $cat_total += $item['total'];
                            @endphp
                            <tr>
                                <td>{{ $item['name'] }}</td>
                                <td class="text-center">{{ $item['hsn'] ?? '---' }}</td>
                                <td class="text-right">{{ number_format($item['gst_rate'], 2) }}</td>
                                <td class="text-right">{{ number_format($item['qty'], 3) }}</td>
                                <td class="text-right">{{ number_format($item['amount'], 2) }}</td>
                                <td class="text-right">{{ $item['cgst'] > 0 ? number_format($item['cgst'], 2) : '' }}</td>
                                <td class="text-right">{{ $item['sgst'] > 0 ? number_format($item['sgst'], 2) : '' }}</td>
                                <td class="text-right">{{ $item['igst'] > 0 ? number_format($item['igst'], 2) : '' }}</td>
                                <td class="text-right font-bold">{{ number_format($item['total'], 2) }}</td>
                            </tr>
                        @endforeach
                        
                        <!-- Sub Total for Category -->
                        <tr class="subtotal-row">
                            <td colspan="3" class="text-right">Sub Total...</td>
                            <td class="text-right">{{ number_format($cat_qty, 3) }}</td>
                            <td class="text-right">{{ number_format($cat_amount, 2) }}</td>
                            <td class="text-right">{{ $cat_cgst > 0 ? number_format($cat_cgst, 2) : '' }}</td>
                            <td class="text-right">{{ $cat_sgst > 0 ? number_format($cat_sgst, 2) : '' }}</td>
                            <td class="text-right">{{ $cat_igst > 0 ? number_format($cat_igst, 2) : '' }}</td>
                            <td class="text-right">{{ number_format($cat_total, 2) }}</td>
                        </tr>
                        
                        @php
                            $returns_grand_qty += $cat_qty;
                            $returns_grand_amount += $cat_amount;
                            $returns_grand_cgst += $cat_cgst;
                            $returns_grand_sgst += $cat_sgst;
                            $returns_grand_igst += $cat_igst;
                            $returns_grand_total += $cat_total;
                        @endphp
                    @endforeach
                    
                    <!-- Grand Total for Returns -->
                    <tr class="grandtotal-row">
                        <td colspan="3" class="text-right">Grand Total...</td>
                        <td class="text-right">{{ number_format($returns_grand_qty, 3) }}</td>
                        <td class="text-right">{{ number_format($returns_grand_amount, 2) }}</td>
                        <td class="text-right">{{ $returns_grand_cgst > 0 ? number_format($returns_grand_cgst, 2) : '' }}</td>
                        <td class="text-right">{{ $returns_grand_sgst > 0 ? number_format($returns_grand_sgst, 2) : '' }}</td>
                        <td class="text-right">{{ $returns_grand_igst > 0 ? number_format($returns_grand_igst, 2) : '' }}</td>
                        <td class="text-right">{{ number_format($returns_grand_total, 2) }}</td>
                    </tr>
                @endif
            </tbody>
        </table>
    </div>
</body>
</html>
