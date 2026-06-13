<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Work - {{ $order['Ref'] }}</title>
    <style>
        @page { size: A4; margin: 20px; }
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 13px; color: #333; line-height: 1.4; }
        .container { width: 100%; }
        
        /* Header section */
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #444; padding-bottom: 10px; }
        .company-name { font-size: 26px; font-weight: bold; text-transform: uppercase; margin: 0; }
        
        .report-title { font-size: 20px; font-weight: bold; margin: 15px 0 5px; text-decoration: underline; }
        
        /* Info section */
        .info-table { width: 100%; margin-bottom: 20px; border: 1px solid #000; border-collapse: collapse; }
        .info-table td { padding: 8px; vertical-align: top; border: 1px solid #000; }
        .label-bold { font-weight: bold; text-transform: uppercase; margin-bottom: 5px; display: block; }
        
        /* Table styles */
        .data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .data-table th { background-color: #f2f2f2; border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center; font-size: 11px; }
        .data-table td { border: 1px solid #000; padding: 8px; vertical-align: middle; font-size: 11px; }
        
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        
        .section-header { background-color: #444; color: #fff; padding: 5px 10px; font-weight: bold; margin-top: 20px; }
        
        /* Footer section */
        .footer-table { width: 45%; margin-left: 55%; margin-top: 20px; border-collapse: collapse; }
        .footer-table td { border: 1px solid #000; padding: 8px; font-weight: bold; }
        .bg-grey { background-color: #f2f2f2; }

        .note-section { margin-top: 20px; border: 1px solid #000; padding: 10px; min-height: 50px; }
        
        .badge { padding: 2px 6px; border-radius: 4px; font-size: 10px; text-transform: uppercase; color: #fff; font-weight: bold; }
        .bg-ordered { background-color: #007bff; }
        .bg-partial { background-color: #ffc107; color: #000; }
        .bg-completed { background-color: #28a745; }
    </style>
</head>
<body>
    <div class="container">
        <!-- COMPANY HEADER -->
        <div class="header">
            <h1 class="company-name">|| Swami Shreeji ||</h1>
            <div class="report-title">JOB WORK BATCH REPORT</div>
        </div>

        <!-- INFO SECTION -->
        <table class="info-table">
            <tr>
                <td width="60%">
                    <span class="label-bold">Production Details:</span>
                    <div><strong>Worker Godown:</strong> {{ $order['worker_warehouse'] }}</div>
                    <div><strong>Status:</strong> 
                        <span class="badge bg-{{ $order['statut'] }}">{{ $order['statut'] }}</span>
                    </div>
                </td>
                <td width="40%">
                    <div><strong>Job Work Ref :</strong> {{ $order['Ref'] }}</div>
                    <div><strong>Date :</strong> {{ \Carbon\Carbon::parse($order['date'])->format('d-m-Y') }}</div>
                    <div><strong>Generated On :</strong> {{ date('d-m-Y H:i') }}</div>
                </td>
            </tr>
        </table>

        <!-- SECTION 1: MATERIALS ISSUED -->
        <div class="section-header">1. RAW MATERIALS ISSUED (INPUTS)</div>
        <table class="data-table">
            <thead>
                <tr>
                    <th width="40">SR#</th>
                    <th>PRODUCT DESCRIPTION</th>
                    <th width="100">ISSUED QTY</th>
                    <th width="100">CONSUMED</th>
                    <th width="120">REMAINING BALANCE</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($details as $index => $detail)
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td class="font-bold">{{ $detail['product_name'] }}</td>
                    <td class="text-center">{{ number_format($detail['quantity'], 2) }}</td>
                    <td class="text-center">{{ number_format($detail['quantity_consumed'], 2) }}</td>
                    <td class="text-center font-bold">{{ number_format($detail['quantity'] - $detail['quantity_consumed'], 2) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <!-- SECTION 2: GOODS RECEIVED -->
        @if(count($receipts) > 0)
            <div class="section-header">2. FINISHED GOODS RECEIVED (OUTPUTS)</div>
            @foreach ($receipts as $receipt)
                <div style="margin: 10px 0 5px; font-weight: bold; color: #444;">
                    Receipt: {{ $receipt['Ref'] }} | Date: {{ \Carbon\Carbon::parse($receipt['date'])->format('d-m-Y') }}
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th width="40">SR#</th>
                            <th>FINISHED PRODUCT DESCRIPTION</th>
                            <th width="120">YIELD QTY</th>
                            <th width="120">WASTAGE</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($receipt['details'] as $idx => $rd)
                        <tr>
                            <td class="text-center">{{ $idx + 1 }}</td>
                            <td class="font-bold">{{ $rd['product_name'] }}</td>
                            <td class="text-center" style="color: #28a745;">{{ number_format($rd['quantity'], 2) }}</td>
                            <td class="text-center" style="color: #dc3545;">{{ number_format($rd['wastage'], 2) }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            @endforeach
        @endif

        <!-- TOTALS SECTION -->
        <table class="footer-table">
            <tr>
                <td>Total Yield Received</td>
                <td class="text-right" style="color: #28a745;">{{ number_format($total_yield, 2) }} kg</td>
            </tr>
            <tr>
                <td>Total Process Wastage</td>
                <td class="text-right" style="color: #dc3545;">{{ number_format($total_wastage, 2) }} kg</td>
            </tr>
            <tr class="bg-grey">
                <td>Mass Balance (Yield + Waste)</td>
                <td class="text-right" style="font-size: 14px;">{{ number_format($total_yield + $total_wastage, 2) }} kg</td>
            </tr>
        </table>

        <!-- NOTE SECTION -->
        @if(isset($order['notes']) && $order['notes'] !== null && $order['notes'] !== '')
        <div class="note-section">
            <strong>Note:</strong><br>
            {!! nl2br(e($order['notes'])) !!}
        </div>
        @endif

        <!-- FOOTER -->
        @if($setting['is_invoice_footer'] && $setting['invoice_footer'] !== null)
            <div style="margin-top: 20px; font-size: 11px; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
                {{ $setting['invoice_footer'] }}
            </div>
        @endif
    </div>
</body>
</html>
