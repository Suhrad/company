<?php
$file = 'routes/api.php';
$content = file_get_contents($file);

$insertion = "
    //-------------------------- Reports ---------------------------

    Route::get(\"report/client\", \"ReportController@Client_Report\");
    Route::get(\"report/client/{id}\", \"ReportController@Client_Report_detail\");
    Route::get(\"report/client_sales\", \"ReportController@Sales_Client\");
    Route::get(\"report/client_payments\", \"ReportController@Payments_Client\");
    Route::get(\"report/client_quotations\", \"ReportController@Quotations_Client\");
    Route::get(\"report/client_returns\", \"ReportController@Returns_Client\");
    Route::get(\"report/customer_ledger/{id}\", \"ReportController@Customer_Ledger\");
    Route::get(\"report/provider\", \"ReportController@Providers_Report\");
    Route::get(\"report/provider/{id}\", \"ReportController@Provider_Report_detail\");
    Route::get(\"report/provider_purchases\", \"ReportController@Purchases_Provider\");
    Route::get(\"report/provider_payments\", \"ReportController@Payments_Provider\");
    Route::get(\"report/provider_returns\", \"ReportController@Returns_Provider\");
    Route::get(\"report/sales\", \"ReportController@Report_Sales\");
    Route::get(\"report/purchases\", \"ReportController@Report_Purchases\");
    Route::get(\"report/get_last_sales\", \"ReportController@Get_last_Sales\");
    Route::get(\"report/stock_alert\", \"ReportController@Products_Alert\");
    Route::get(\"report/payment_chart\", \"ReportController@Payment_chart\");
    Route::get(\"report/warehouse_report\", \"ReportController@Warehouse_Report\");
    Route::get(\"report/sales_warehouse\", \"ReportController@Sales_Warehouse\");
    Route::get(\"report/quotations_warehouse\", \"ReportController@Quotations_Warehouse\");
    Route::get(\"report/returns_sale_warehouse\", \"ReportController@Returns_Sale_Warehouse\");
    Route::get(\"report/returns_purchase_warehouse\", \"ReportController@Returns_Purchase_Warehouse\");
";

$target = "Route::get('saral-import/history', 'SaralImportController@history');";
$newContent = str_replace($target, $target . $insertion, $content);

file_put_contents($file, $newContent);
echo "Routes fixed.\n";
