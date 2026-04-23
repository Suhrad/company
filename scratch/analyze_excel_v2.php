<?php
require 'vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

$files = [
    '/Users/suhrad/Downloads/SALES 2025-26.xlsx'
];

foreach ($files as $file) {
    echo "\nAnalyzing File: $file\n";
    if (!file_exists($file)) {
        echo "File NOT found!\n";
        continue;
    }
    
    $spreadsheet = IOFactory::load($file);
    $sheet = $spreadsheet->getActiveSheet();
    $rows = $sheet->toArray(null, true, true, true);
    
    for ($i = 1; $i <= 20; $i++) {
        if (!isset($rows[$i])) continue;
        echo "Row $i: " . implode(" | ", array_filter($rows[$i])) . "\n";
    }
}
