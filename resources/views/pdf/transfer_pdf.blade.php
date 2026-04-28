<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <title>Transfer _{{$transfer['Ref']}}</title>
      <style>
         body { font-family: 'DejaVu Sans', sans-serif; color: #333; font-size: 12px; line-height: 1.4; }
         header { border-bottom: 2px solid #f2f2f2; padding-bottom: 10px; margin-bottom: 20px; }
         #logo { float: left; }
         #logo img { height: 50px; }
         #company { float: right; text-align: right; }
         .clearfix::after { content: ""; clear: both; display: table; }
         #Title-heading { font-size: 18px; font-weight: bold; color: #444; margin: 10px 0; text-align: center; clear: both; }
         
         .section-title { background: #f2f2f2; padding: 5px 10px; font-weight: bold; margin-top: 15px; border-left: 4px solid #7367f0; }
         
         table { width: 100%; border-collapse: collapse; margin: 10px 0; }
         th { background: #f8f8f8; color: #555; text-align: left; padding: 8px; border-bottom: 1px solid #eee; }
         td { padding: 8px; border-bottom: 1px solid #f9f9f9; }
         
         .text-right { text-align: right; }
         .font-weight-bold { font-weight: bold; }
         .summary-box { margin-top: 20px; float: right; width: 250px; border: 1px solid #eee; }
         .summary-row { padding: 8px; border-bottom: 1px solid #eee; }
         .summary-row:last-child { border-bottom: none; background: #f2f2f2; }
         .text-primary { color: #7367f0; }
         .text-danger { color: #ea5455; }
         .text-success { color: #28c76f; }
      </style>
   </head>

   <body>
      <header class="clearfix">
         <div id="logo">
            <img src="{{public_path('/images/'.$setting['logo'])}}">
         </div>
         <div id="company">
            <div><strong>Date:</strong> {{$transfer['date']}}</div>
            <div><strong>Number:</strong> {{$transfer['Ref']}}</div>
            <div><strong>From:</strong> {{$transfer['from_warehouse']}}</div>
            <div><strong>To:</strong> {{$transfer['to_warehouse']}}</div>
         </div>
         <div id="Title-heading">
            STOCK TRANSFER REPORT
         </div>
      </header>

      <main>
         @if($transfer['is_production'])
            <div class="section-title">INPUTS (RAW MATERIALS)</div>
            <table>
               <thead>
                  <tr>
                     <th>PRODUCT</th>
                     <th class="text-right">QUANTITY</th>
                  </tr>
               </thead>
               <tbody>
                  @php $total_input = 0; @endphp
                  @foreach (collect($details)->where('flow_type', 'input') as $detail)
                  <tr>
                     <td>{{$detail['code']}} ({{$detail['name']}})</td>
                     <td class="text-right">{{$detail['quantity']}} {{$detail['unit_purchase']}}</td>
                  </tr>
                  @php $total_input += $detail['quantity']; @endphp
                  @endforeach
               </tbody>
            </table>

            <div class="section-title">OUTPUTS (FINISHED GOODS)</div>
            <table>
               <thead>
                  <tr>
                     <th>PRODUCT</th>
                     <th class="text-right">QUANTITY</th>
                  </tr>
               </thead>
               <tbody>
                  @php $total_output = 0; @endphp
                  @foreach (collect($details)->where('flow_type', 'output') as $detail)
                  <tr>
                     <td>{{$detail['code']}} ({{$detail['name']}})</td>
                     <td class="text-right">{{$detail['quantity']}} {{$detail['unit_purchase']}}</td>
                  </tr>
                  @php $total_output += $detail['quantity']; @endphp
                  @endforeach
               </tbody>
            </table>

            <div class="clearfix">
               <div class="summary-box">
                  <div class="summary-row clearfix">
                     <span style="float:left">Total Input:</span>
                     <span style="float:right">{{number_format($total_input, 2)}} kg</span>
                  </div>
                  <div class="summary-row clearfix">
                     <span style="float:left" class="text-success font-weight-bold">Total Output:</span>
                     <span style="float:right" class="text-success font-weight-bold">{{number_format($total_output, 2)}} kg</span>
                  </div>
                  <div class="summary-row clearfix">
                     <span style="float:left" class="text-danger">Total Wastage:</span>
                     <span style="float:right" class="text-danger">{{number_format($transfer['wastage_total'], 2)}} kg</span>
                  </div>
               </div>
            </div>
         @else
            <table>
               <thead>
                  <tr>
                     <th>PRODUCT</th>
                     <th class="text-right">QUANTITY</th>
                  </tr>
               </thead>
               <tbody>
                  @php $total_qty = 0; @endphp
                  @foreach ($details as $detail)
                  <tr>
                     <td>{{$detail['code']}} ({{$detail['name']}})</td>
                     <td class="text-right">{{$detail['quantity']}} {{$detail['unit_purchase']}}</td>
                  </tr>
                  @php $total_qty += $detail['quantity']; @endphp
                  @endforeach
               </tbody>
               <tfoot>
                  <tr style="background: #f2f2f2; font-weight:bold;">
                     <td>TOTAL QUANTITY</td>
                     <td class="text-right">{{number_format($total_qty, 2)}}</td>
                  </tr>
               </tfoot>
            </table>
         @endif

         @if($transfer['notes'])
            <div style="margin-top: 20px;">
               <strong>Notes:</strong><br>
               {{$transfer['notes']}}
            </div>
         @endif
        
         <div id="signature" style="margin-top: 50px;">
            @if($setting['is_invoice_footer'] && $setting['invoice_footer'] !==null)
               <p>{{$setting['invoice_footer']}}</p>
            @endif
         </div>
      </main>
   </body>
</html>
