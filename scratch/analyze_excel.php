<?php
require 'vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

$files = [
    '/Users/suhrad/Downloads/SALES 2025-26.xlsx',
    '/Users/suhrad/Downloads/SALES 2024-25.xlsx'
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
    
    echo "Header (Row 1):\n";
    print_r($rows[1]);
    
    echo "First Data Row (Row 2):\n";
    print_r($rows[2]);
}
