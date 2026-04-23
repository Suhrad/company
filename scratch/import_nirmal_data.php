<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Client;
use App\Models\Transporter;
use App\Models\BusinessCompany;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\DB;

$files = [
    '/Users/suhrad/Downloads/SALES 2024-25.xlsx',
    '/Users/suhrad/Downloads/SALES 2025-26.xlsx'
];

echo "Starting Nirmal Plast Data Import...\n";

// 1. Ensure Business Company exists
$company = BusinessCompany::firstOrCreate(['name' => 'Nirmal Plast']);
echo "Using Business Company ID: {$company->id}\n";

$allClients = [];
$allTransporters = [];

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
        $transportName = trim($row['V'] ?? '');
        $addr1 = trim($row['Y'] ?? '');
        $addr2 = trim($row['Z'] ?? '');
        $addr3 = trim($row['AA'] ?? '');
        $state = trim($row['AH'] ?? '');
        
        // Transporters
        if ($transportName && $transportName != 'Regular' && $transportName != 'DIRECT' && $transportName != 'HAND DELIEVERY') {
            $allTransporters[$transportName] = [
                'name' => $transportName,
            ];
        }
        
        // Clients
        // Deduplicate by Name + GSTIN (if present)
        $key = $partyName . '|' . $gstin;
        
        // Extract city from addr3 (e.g. "MIRAJGAON (MS)")
        $city = $addr3;
        if (preg_match('/^(.*?)\s*\((.*?)\)$/', $addr3, $matches)) {
            $city = trim($matches[1]);
        }
        
        // Extract PAN from GSTIN
        $pan = '';
        if (strlen($gstin) >= 12) {
            $pan = substr($gstin, 2, 10);
        }
        
        $allClients[$key] = [
            'business_company_id' => $company->id,
            'name' => $partyName,
            'legal_name' => $partyName,
            'trade_name' => $partyName,
            'gstin' => $gstin,
            'pan' => $pan,
            'address_line_1' => $addr1,
            'address_line_2' => $addr2,
            'address_line_3' => $addr3,
            'adresse' => trim("$addr1 $addr2 $addr3"),
            'city' => $city,
            'state' => $state,
            'country' => 'India',
            'preferred_transport' => $transportName,
            'is_saral_imported' => true,
            'source_system' => 'Excel_Import_Nirmal',
        ];
    }
}

echo "Extracted " . count($allTransporters) . " Transporters and " . count($allClients) . " Clients.\n";

// 2. Import Transporters
echo "Importing Transporters...\n";
foreach ($allTransporters as $tData) {
    Transporter::updateOrCreate(
        ['name' => $tData['name']],
        $tData
    );
}

// 3. Import Clients
echo "Importing Clients...\n";
$newCount = 0;
$updatedCount = 0;

$lastCode = Client::max('code') ?? 0;

foreach ($allClients as $cData) {
    // Try to find existing client by GSTIN (if not empty) or Name
    $existing = null;
    if ($cData['gstin']) {
        $existing = Client::where('gstin', $cData['gstin'])->first();
    }
    
    if (!$existing) {
        $existing = Client::where('name', $cData['name'])->first();
    }
    
    if ($existing) {
        // Update existing if it's not already complete
        if (!$existing->gstin && $cData['gstin']) {
            $existing->update($cData);
            $updatedCount++;
        }
    } else {
        // Create new
        $cData['code'] = ++$lastCode;
        Client::create($cData);
        $newCount++;
    }
}

echo "Import Summary:\n";
echo "- New Clients: $newCount\n";
echo "- Updated Clients: $updatedCount\n";
echo "Done!\n";
