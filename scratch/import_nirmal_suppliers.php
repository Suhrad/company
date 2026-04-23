<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Provider;
use PhpOffice\PhpSpreadsheet\IOFactory;

$files = [
    '/Users/suhrad/Downloads/PURCHASE 2024-25.xlsx',
    '/Users/suhrad/Downloads/PURCHASE 2025-26.xlsx',
    '/Users/suhrad/Downloads/Purshace - 24.xlsx',
    '/Users/suhrad/Downloads/Purshace - 25.xlsx'
];

echo "Starting Provider (Supplier) Data Import...\n";

$allProviders = [];

foreach ($files as $file) {
    if (!file_exists($file)) {
        echo "File not found: $file\n";
        continue;
    }
    echo "Processing $file...\n";
    $spreadsheet = IOFactory::load($file);
    $sheet = $spreadsheet->getActiveSheet();
    $rows = $sheet->toArray(null, true, true, true);
    
    // Data starts at row 6
    for ($i = 6; $i <= count($rows); $i++) {
        $row = $rows[$i];
        $partyName = trim($row['F'] ?? '');
        if (!$partyName || $partyName == 'Total') continue;
        
        $gstin = trim($row['G'] ?? '');
        $addr1 = trim($row['Y'] ?? '');
        $addr2 = trim($row['Z'] ?? '');
        $addr3 = trim($row['AA'] ?? '');
        $state = trim($row['AH'] ?? '');
        
        // Extract city from addr3
        $city = $addr3;
        if (preg_match('/^(.*?)\s*\((.*?)\)$/', $addr3, $matches)) {
            $city = trim($matches[1]);
        }
        
        // Extract PAN from GSTIN
        $pan = '';
        if (strlen($gstin) >= 12) {
            $pan = substr($gstin, 2, 10);
        }
        
        $key = $partyName . '|' . $gstin;
        
        $allProviders[$key] = [
            'name' => $partyName,
            'gstin' => $gstin,
            'pan' => $pan,
            'address_line_1' => $addr1,
            'address_line_2' => $addr2,
            'address_line_3' => $addr3,
            'adresse' => trim("$addr1 $addr2 $addr3"),
            'city' => $city,
            'state' => $state,
            'country' => 'India',
            'tax_number' => $gstin, // Fallback for tax_number
            'source_system' => 'Excel_Import_Nirmal_Purchase',
        ];
    }
}

echo "Extracted " . count($allProviders) . " unique Suppliers.\n";

$newCount = 0;
$lastCode = Provider::max('code') ?? 0;

foreach ($allProviders as $pData) {
    $existing = null;
    if ($pData['gstin']) {
        $existing = Provider::where('gstin', $pData['gstin'])->first();
    }
    
    if (!$existing) {
        $existing = Provider::where('name', $pData['name'])->first();
    }
    
    if (!$existing) {
        $pData['code'] = ++$lastCode;
        Provider::create($pData);
        $newCount++;
    }
}

echo "Import Summary:\n";
echo "- New Suppliers Added: $newCount\n";
echo "Done!\n";
