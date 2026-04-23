<?php
require 'vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

$file = '/Users/suhrad/Downloads/SALES 2025-26.xlsx';
$spreadsheet = IOFactory::load($file);
$sheet = $spreadsheet->getActiveSheet();
$rows = $sheet->toArray(null, true, true, true);

for ($i = 1; $i <= 10; $i++) {
    if (!isset($rows[$i])) continue;
    echo "Row $i: \n";
    foreach ($rows[$i] as $col => $val) {
        if ($val) echo "$col: $val | ";
    }
    echo "\n------------------\n";
}
