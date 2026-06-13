<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Supplier Ledger - {{ $provider->name }}</title>
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

        /* Provider info section */
        .client-info-table { width: 100%; margin-bottom: 20px; border: 1px solid #000; }
        .client-info-table td { padding: 5px; vertical-align: top; }
        .client-name { font-size: 13px; font-weight: bold; text-transform: uppercase; }
        
        /* Table styles */
        .ledger-table { width: 100%; border-collapse: collapse; margin-top: 10px; page-break-inside: auto; }
        .ledger-table tr { page-break-inside: avoid; page-break-after: auto; }
        .ledger-table th { background-color: #f2f2f2; border: 1px solid #000; padding: 6px; font-weight: bold; text-align: center; }
        .ledger-table td { border: 1px solid #000; padding: 6px; vertical-align: top; page-break-inside: avoid; page-break-after: auto; }
        
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
                {{ $company->address ?? '' }}
                @if(isset($company->city)) , {{ $company->city }} @endif
                @if(isset($company->phone)) <br>Phone: {{ $company->phone }} @endif
            </p>
            <div class="report-title">Supplier Ledger</div>
            <div class="period">Period : {{ Carbon\Carbon::parse($period['start'])->format('d-m-Y') }} To {{ Carbon\Carbon::parse($period['end'])->format('d-m-Y') }}</div>
        </div>

        <!-- PROVIDER INFO -->
        <table class="client-info-table">
            <tr>
                <td width="60%">
                    <div class="client-name">{{ $provider->name }}</div>
                    @if($provider->adresse) <div>{{ $provider->adresse }}</div> @endif
                    @if($provider->city) <div>{{ $provider->city }}</div> @endif
                </td>
                <td width="40%" class="text-right">
                    <div><strong>GSTIN :</strong> {{ $provider->gstin ?? '---' }}</div>
                    <div><strong>Pan :</strong> {{ $provider->pan ?? '---' }}</div>
                    <div style="margin-top: 5px;">Page : 1</div>
                </td>
            </tr>
        </table>

        <!-- LEDGER TABLE -->
        <table class="ledger-table">
            <thead>
                <tr>
                    <th width="80">Date</th>
                    <th width="50">Book</th>
                    <th>Particulars</th>
                    <th width="80">Debit</th>
                    <th width="80">Credit</th>
                    <th width="100">Balance</th>
                </tr>
            </thead>
            <tbody>
                <!-- OPENING BALANCE ROW -->
                <tr>
                    <td class="text-center">{{ Carbon\Carbon::parse($period['start'])->format('d-m-y') }}</td>
                    <td class="text-center">-</td>
                    <td class="font-bold">Opening Balance</td>
                    <td class="text-right"></td>
                    <td class="text-right"></td>
                    <td class="text-right font-bold">
                        {{ number_format($opening_balance, 2) }} ({{ $opening_balance_type }})
                    </td>
                </tr>

                @php
                    $total_debit = 0;
                    $total_credit = 0;
                @endphp

                @foreach($ledger as $row)
                    @php
                        $total_debit += $row['debit'];
                        $total_credit += $row['credit'];
                    @endphp
                    <tr>
                        <td class="text-center">{{ Carbon\Carbon::parse($row['date'])->format('d-m-y') }}</td>
                        <td class="text-center">{{ $row['book'] }}</td>
                        <td class="particulars-cell">{{ $row['particulars'] }}</td>
                        <td class="text-right">{{ $row['debit'] > 0 ? number_format($row['debit'], 2) : '' }}</td>
                        <td class="text-right">{{ $row['credit'] > 0 ? number_format($row['credit'], 2) : '' }}</td>
                        <td class="text-right font-bold">
                            {{ number_format($row['balance'], 2) }} ({{ $row['balance_type'] }})
                        </td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr class="bg-grey">
                    <td colspan="3" class="text-right font-bold">Total .....</td>
                    <td class="text-right font-bold">{{ number_format($total_debit, 2) }}</td>
                    <td class="text-right font-bold">{{ number_format($total_credit, 2) }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="5" class="text-right font-bold">Closing Balance...</td>
                    <td class="text-right font-bold bg-grey">
                        {{ number_format($closing_balance, 2) }} ({{ $closing_balance_type }})
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</body>
</html>
