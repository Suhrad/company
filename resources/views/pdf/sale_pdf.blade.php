<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sale - {{ $sale['Ref'] }}</title>
    <style>
        @page { size: A4; margin: 20px 20px 40px 20px; }
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 13px; color: #333; line-height: 1.4; }
        .container { width: 100%; }
        
        /* Header section */
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #444; padding-bottom: 10px; }
        .company-name { font-size: 26px; font-weight: bold; text-transform: uppercase; margin: 0; }
        
        .report-title { font-size: 20px; font-weight: bold; margin: 15px 0 5px; text-decoration: underline; }
        
        /* Info section */
        .info-table { width: 100%; margin-bottom: 20px; border: 1px solid #000; border-collapse: collapse; }
        .info-table td { padding: 8px; vertical-align: top; border: 1px solid #000; }
        .client-name { font-size: 16px; font-weight: bold; text-transform: uppercase; }
        
        /* Table styles */
        .data-table { width: 100%; border-collapse: collapse; margin-top: 10px; page-break-inside: auto; }
        .data-table thead { display: table-header-group; }
        .data-table tr { page-break-inside: avoid; }
        .data-table th { background-color: #f2f2f2; border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center; }
        .data-table td { border: 1px solid #000; padding: 8px; vertical-align: middle; }
        .product-name { word-break: break-all; }
        
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        
        /* Footer section */
        .footer-table { width: 40%; margin-left: 60%; margin-top: 20px; border-collapse: collapse; page-break-inside: avoid; }
        .footer-table td { border: 1px solid #000; padding: 8px; font-weight: bold; }
        .bg-grey { background-color: #f2f2f2; }

        .note-section { margin-top: 20px; border: 1px solid #000; padding: 10px; min-height: 50px; page-break-inside: avoid; }
        
        /* Page number footer styles */
        .page-footer {
            position: fixed;
            bottom: -25px;
            left: 0;
            right: 0;
            height: 20px;
            text-align: center;
            font-size: 10px;
            color: #777;
        }
        .page-footer .page-number:after {
            content: "Page " counter(page);
        }
    </style>
</head>
<body>
    <div class="page-footer">
        <span class="page-number"></span>
    </div>
    <div class="container">
        <!-- COMPANY HEADER -->
        <div class="header">
            <h1 class="company-name">|| Swami Shreeji ||</h1>
            <div class="report-title">SALE INVOICE</div>
        </div>

        <!-- INFO SECTION -->
        <table class="info-table">
            <tr>
                <td width="60%">
                    <div class="font-bold" style="margin-bottom: 5px;">CUSTOMER INFO:</div>
                    <div class="client-name">{{ $sale['client_name'] }}</div>
                    @if($sale['client_adr']) <div>{{ $sale['client_adr'] }}</div> @endif
                    @if($sale['client_phone']) <div>Phone: {{ $sale['client_phone'] }}</div> @endif
                </td>
                <td width="40%">
                    <div><strong>Invoice No :</strong> {{ $sale['Ref'] }}</div>
                    <div><strong>Date :</strong> {{ \Carbon\Carbon::parse($sale['date'])->format('d-m-Y') }}</div>
                    <div><strong>Warehouse :</strong> 
                        @php
                            echo $sale['warehouse'];
                        @endphp
                    </div>
                    <div><strong>Status :</strong> {{ $sale['statut'] }}</div>
                </td>
            </tr>
        </table>

        <!-- PRODUCTS TABLE -->
        <table class="data-table">
            <thead>
                <tr>
                    <th width="40">SR#</th>
                    <th>PRODUCT DESCRIPTION</th>
                    <th width="100">QTY</th>
                    <th width="120">AMOUNT</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($details as $index => $detail)
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td class="product-name">
                        <div class="font-bold">{{ $detail['name'] }}</div>
                        <div style="font-size: 11px; color: #555;">Code: {{ $detail['code'] }}</div>
                        @if($detail['is_imei'] && $detail['imei_number'] !== null)
                            <div style="font-size: 11px;">IMEI/SN: {{ $detail['imei_number'] }}</div>
                        @endif
                    </td>
                    <td class="text-center">{{ $detail['quantity'] }} {{ $detail['unitSale'] }}</td>
                    <td class="text-right font-bold">{{ number_format($detail['total'], 2) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <!-- TOTALS SECTION -->
        <table class="footer-table">
            <tr class="bg-grey">
                <td>Grand Total</td>
                <td class="text-right" style="font-size: 15px;">{{ $symbol }} {{ number_format($sale['GrandTotal'], 2) }}</td>
            </tr>
            @if($sale['paid_amount'] > 0)
            <tr>
                <td>Paid Amount</td>
                <td class="text-right">{{ $symbol }} {{ number_format($sale['paid_amount'], 2) }}</td>
            </tr>
            <tr>
                <td>Due Balance</td>
                <td class="text-right">{{ $symbol }} {{ number_format($sale['due'], 2) }}</td>
            </tr>
            @endif
        </table>

        <!-- SALE NOTE SECTION -->
        @if(isset($sale['notes']) && $sale['notes'] !== null && $sale['notes'] !== '')
        <div class="note-section">
            <strong>Note:</strong><br>
            {!! nl2br(e($sale['notes'])) !!}
        </div>
        @endif

        <!-- GLOBAL FOOTER NOTE -->
        @if($setting['is_invoice_footer'] && $setting['invoice_footer'] !== null)
            <div style="margin-top: 10px; font-size: 11px; color: #666;">
                {{ $setting['invoice_footer'] }}
            </div>
        @endif
    </div>
</body>
</html>
