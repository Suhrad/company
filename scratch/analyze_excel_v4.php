<?php
require 'vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

$file = '/Users/suhrad/Downloads/SALES 2025-26.xlsx';
$spreadsheet = IOFactory::load($file);
$sheet = $spreadsheet->getActiveSheet();
$rows = $sheet->toArray(null, true, true, true);

$dataRows = [9, 10, 18, 19];
foreach ($dataRows as $i) {
    if (!isset($rows[$i])) continue;
    echo "\nROW $i:\n";
    foreach ($rows[$i] as $col => $val) {
        if ($val !== null && $val !== '') {
            echo "[$col] => $val\n";
        }
    }
}
