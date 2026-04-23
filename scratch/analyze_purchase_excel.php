<?php
require 'vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

$file = '/Users/suhrad/Downloads/PURCHASE 2025-26.xlsx';
if (!file_exists($file)) {
    die("File not found!\n");
}
$spreadsheet = IOFactory::load($file);
$sheet = $spreadsheet->getActiveSheet();
$rows = $sheet->toArray(null, true, true, true);

echo "Headers (Row 5?):\n";
print_r(array_filter($rows[5] ?? []));

echo "\nData (Row 6):\n";
print_r(array_filter($rows[6] ?? []));

echo "\nData (Row 7):\n";
print_r(array_filter($rows[7] ?? []));
