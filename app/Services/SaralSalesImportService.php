<?php

namespace App\Services;

use App\Models\BusinessCompany;
use App\Models\Category;
use App\Models\Client;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleDetail;
use App\Models\SaralImportJob;
use App\Models\SaralImportRow;
use App\Models\Unit;
use App\Models\Warehouse;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class SaralSalesImportService
{
    public function parseFile(UploadedFile $file): array
    {
        $payload = json_decode(file_get_contents($file->getRealPath()), true);

        if (!is_array($payload) || !isset($payload['saleinv']) || !is_array($payload['saleinv'])) {
            throw ValidationException::withMessages([
                'file' => 'Invalid SARAL JSON. Expected a top-level saleinv array.',
            ]);
        }

        return $payload;
    }

    public function preview(array $payload, int $companyId): array
    {
        $company = BusinessCompany::findOrFail($companyId);
        $invoices = $payload['saleinv'];

        $previewInvoices = [];
        $customerStats = ['matched' => 0, 'new' => 0];
        $productStats = ['matched' => 0, 'new' => 0];
        $duplicates = 0;
        $invoiceCount = count($invoices);
        $lineCount = 0;
        $totalValue = 0;

        foreach ($invoices as $index => $invoice) {
            $lineCount += count($invoice['itemdetails'] ?? []);
            $totalValue += (float) ($invoice['invamt'] ?? 0);

            $customerMatch = $this->findClientMatch($companyId, $invoice);
            $customerStats[$customerMatch ? 'matched' : 'new']++;

            $productPreview = [];
            $invoiceProductMatched = 0;
            $invoiceProductNew = 0;
            foreach (($invoice['itemdetails'] ?? []) as $line) {
                $product = $this->findProductMatch($companyId, $line);
                $product ? $invoiceProductMatched++ : $invoiceProductNew++;
                $productStats[$product ? 'matched' : 'new']++;
                $productPreview[] = [
                    'item_name' => $line['itemname'] ?? null,
                    'hsn_sac_code' => $line['hsncode'] ?? null,
                    'gst_unit' => $line['gstunit'] ?? null,
                    'match' => $product ? [
                        'id' => $product->id,
                        'name' => $product->name,
                        'code' => $product->code,
                    ] : null,
                ];
            }

            $hash = $this->documentHash($invoice);
            $duplicate = Sale::where('business_company_id', $companyId)
                ->where('source_system', 'saral')
                ->where('source_document_hash', $hash)
                ->exists();

            if ($duplicate) {
                $duplicates++;
            }

            if ($index < 15) {
                $previewInvoices[] = [
                    'row_number' => $index + 1,
                    'party_name' => $invoice['partyname'] ?? null,
                    'invoice_date' => $invoice['invdt'] ?? null,
                    'invoice_value' => (float) ($invoice['invamt'] ?? 0),
                    'duplicate' => $duplicate,
                    'customer_match' => $customerMatch ? [
                        'id' => $customerMatch->id,
                        'name' => $customerMatch->name,
                        'gstin' => $customerMatch->gstin,
                    ] : null,
                    'product_match_summary' => [
                        'matched' => $invoiceProductMatched,
                        'new' => $invoiceProductNew,
                    ],
                    'line_preview' => $productPreview,
                ];
            }
        }

        return [
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
            ],
            'summary' => [
                'invoice_count' => $invoiceCount,
                'line_count' => $lineCount,
                'duplicate_count' => $duplicates,
                'invoice_value_total' => round($totalValue, 2),
                'customer_matches' => $customerStats,
                'product_matches' => $productStats,
            ],
            'preview_invoices' => $previewInvoices,
        ];
    }

    public function import(array $payload, int $companyId, int $userId, string $fileName): array
    {
        $preview = $this->preview($payload, $companyId);
        $payloadHash = hash('sha256', json_encode($payload));
        $company = BusinessCompany::findOrFail($companyId);

        return DB::transaction(function () use ($payload, $preview, $payloadHash, $companyId, $userId, $fileName, $company) {
            $job = SaralImportJob::create([
                'business_company_id' => $companyId,
                'user_id' => $userId,
                'file_name' => $fileName,
                'payload_hash' => $payloadHash,
                'status' => 'processing',
                'invoice_count' => count($payload['saleinv']),
                'summary_json' => json_encode($preview),
                'original_payload' => json_encode($payload),
            ]);

            $warehouse = $this->resolveArchiveWarehouse($company);
            $imported = 0;
            $skipped = 0;
            $errors = 0;
            $rows = [];

            foreach ($payload['saleinv'] as $index => $invoice) {
                $hash = $this->documentHash($invoice);

                try {
                    [$client, $productActions, $sale, $skippedInvoice] = DB::transaction(function () use ($companyId, $invoice, $userId, $warehouse, $job, $hash, $index) {
                        $existing = Sale::where('business_company_id', $companyId)
                            ->where('source_system', 'saral')
                            ->where('source_document_hash', $hash)
                            ->first();

                        if ($existing && $existing->details()->count() > 0) {
                            return [null, [], null, true];
                        }

                        if ($existing) {
                            $existing->details()->delete();
                            $existing->delete();
                        }

                        $client = $this->resolveClient($companyId, $invoice);
                        $productActions = [];
                        $sale = $this->createSale($invoice, $companyId, $userId, $warehouse->id, $client->id, $job->id, $hash, $index + 1);

                        foreach (($invoice['itemdetails'] ?? []) as $line) {
                            [$product, $action] = $this->resolveProduct($companyId, $line);
                            $productActions[] = $action;
                            $this->createSaleDetail($sale, $product, $line, $companyId);
                        }

                        return [$client, $productActions, $sale, false];
                    });

                    if ($skippedInvoice) {
                        $skipped++;
                        $rows[] = [
                            'row_number' => $index + 1,
                            'status' => 'skipped',
                            'source_document_hash' => $hash,
                            'customer_action' => 'matched',
                            'product_action' => 'matched',
                            'message' => 'Already imported',
                            'preview_json' => json_encode([
                                'party_name' => $invoice['partyname'] ?? null,
                                'invoice_date' => $invoice['invdt'] ?? null,
                                'invoice_value' => $invoice['invamt'] ?? 0,
                            ]),
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                        continue;
                    }

                    $imported++;
                    $rows[] = [
                        'row_number' => $index + 1,
                        'status' => 'imported',
                        'source_document_hash' => $hash,
                        'customer_action' => $client->wasRecentlyCreated ? 'created' : 'matched',
                        'product_action' => in_array('created', $productActions, true) ? 'created' : 'matched',
                        'message' => 'Imported successfully',
                        'preview_json' => json_encode([
                            'sale_id' => $sale->id,
                            'ref' => $sale->Ref,
                            'party_name' => $invoice['partyname'] ?? null,
                            'invoice_value' => $invoice['invamt'] ?? 0,
                        ]),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                } catch (\Throwable $e) {
                    $errors++;
                    $rows[] = [
                        'row_number' => $index + 1,
                        'status' => 'error',
                        'source_document_hash' => $hash,
                        'customer_action' => null,
                        'product_action' => null,
                        'message' => $e->getMessage(),
                        'preview_json' => json_encode([
                            'party_name' => $invoice['partyname'] ?? null,
                            'invoice_date' => $invoice['invdt'] ?? null,
                        ]),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            if (!empty($rows)) {
                $job->rows()->createMany($rows);
            }

            $job->update([
                'status' => $errors > 0 ? 'completed_with_errors' : 'completed',
                'imported_count' => $imported,
                'skipped_count' => $skipped,
                'error_count' => $errors,
                'result_json' => json_encode([
                    'company' => $company->name,
                    'imported_count' => $imported,
                    'skipped_count' => $skipped,
                    'error_count' => $errors,
                ]),
            ]);

            return [
                'job_id' => $job->id,
                'status' => $job->status,
                'imported_count' => $imported,
                'skipped_count' => $skipped,
                'error_count' => $errors,
            ];
        });
    }

    protected function resolveClient(int $companyId, array $invoice): Client
    {
        $client = $this->findClientMatch($companyId, $invoice);

        if ($client) {
            $client->fill($this->clientPayload($companyId, $invoice))->save();
            return $client;
        }

        return Client::create($this->clientPayload($companyId, $invoice) + [
            'code' => ((int) Client::max('code')) + 1,
            'is_royalty_eligible' => 0,
            'points' => 0,
        ]);
    }

    protected function resolveProduct(int $companyId, array $line): array
    {
        $product = $this->findProductMatch($companyId, $line);

        if ($product) {
            $product->fill($this->productPayload($companyId, $line))->save();
            return [$product, 'matched'];
        }

        $product = Product::create($this->productPayload($companyId, $line) + [
            'code' => $this->generateProductCode($companyId, $line),
            'Type_barcode' => 'CODE128',
            'category_id' => $this->defaultCategoryId(),
            'type' => ($line['goodserflag'] ?? 'G') === 'S' ? 'is_service' : 'is_single',
            'tax_method' => '1',
            'cost' => (float) ($line['rate'] ?? 0),
            'price' => (float) ($line['rate'] ?? 0),
            'stock_alert' => 0,
            'is_variant' => 0,
            'is_active' => 1,
        ]);

        $unitId = $this->resolveUnitId($line['gstunit'] ?? null);
        if ($unitId) {
            $product->update([
                'unit_id' => $unitId,
                'unit_sale_id' => $unitId,
                'unit_purchase_id' => $unitId,
            ]);
        }

        return [$product, 'created'];
    }

    protected function createSale(array $invoice, int $companyId, int $userId, int $warehouseId, int $clientId, int $jobId, string $hash, int $rowNumber): Sale
    {
        $invoiceDate = $this->parseDate($invoice['invdt'] ?? null);
        $ackDate = $this->parseDate($invoice['ackdt'] ?? null);
        $poDate = $this->parseDate($invoice['podt'] ?? null);
        $originalBillDate = $this->parseDate($invoice['orgbilldt'] ?? null);
        $credit = (float) ($invoice['credit'] ?? 0);
        $grandTotal = (float) ($invoice['invamt'] ?? 0);
        $paidAmount = max(0, $grandTotal - $credit);

        if ($paidAmount <= 0) {
            $paymentStatus = 'unpaid';
        } elseif ($paidAmount >= $grandTotal) {
            $paymentStatus = 'paid';
        } else {
            $paymentStatus = 'partial';
        }

        return Sale::create([
            'business_company_id' => $companyId,
            'date' => $invoiceDate ?? now()->toDateString(),
            'time' => '00:00:00',
            'Ref' => $this->sourceInvoiceKey($invoice, $rowNumber),
            'is_pos' => 0,
            'client_id' => $clientId,
            'warehouse_id' => $warehouseId,
            'tax_rate' => 0,
            'TaxNet' => (float) (($invoice['cgstamt'] ?? 0) + ($invoice['sgstamt'] ?? 0) + ($invoice['igstamt'] ?? 0)),
            'discount' => 0,
            'shipping' => (float) ($invoice['posttaxamt'] ?? 0) + (float) ($invoice['posttaxamt2'] ?? 0),
            'GrandTotal' => $grandTotal,
            'paid_amount' => $paidAmount,
            'payment_statut' => $paymentStatus,
            'statut' => 'completed',
            'notes' => $invoice['remarks'] ?? null,
            'user_id' => $userId,
            'is_archive_import' => 1,
            'source_system' => 'saral',
            'source_invoice_key' => $this->sourceInvoiceKey($invoice, $rowNumber),
            'source_document_hash' => $hash,
            'saral_import_job_id' => $jobId,
            'original_invoice_date' => $invoiceDate,
            'original_invoice_number' => $invoice['orgbillno'] ?? null,
            'original_invoice_series' => $invoice['orgbillseries'] ?? null,
            'drcr_flag' => $invoice['drcrflag'] ?? null,
            'po_number' => $invoice['pono'] ?? null,
            'po_date' => $poDate,
            'broker_name' => $invoice['brokername'] ?? null,
            'vehicle_number' => $invoice['vehicleno'] ?? null,
            'lr_number' => $invoice['lrno'] ?? null,
            'transporter_name' => $invoice['transname'] ?? null,
            'transporter_gstin' => $invoice['transgstin'] ?? null,
            'eway_bill_number' => $invoice['ewbno'] ?? null,
            'irn' => $invoice['irn'] ?? null,
            'ack_number' => $invoice['ackno'] ?? null,
            'ack_date' => $ackDate,
            'reverse_charge' => (string) ($invoice['rchrg'] ?? 'N') === 'Y',
            'freight_type' => $invoice['freightype'] ?? null,
            'gst_type' => $invoice['gsttype'] ?? null,
            'party_gstin' => $invoice['togstin'] ?? null,
            'party_pan' => $invoice['pan'] ?? null,
            'place_of_supply' => $invoice['pos'] ?? null,
            'debit_account_name' => $invoice['debitacname'] ?? null,
            'original_bill_series' => $invoice['orgbillseries'] ?? null,
            'original_bill_number' => $invoice['orgbillno'] ?? null,
            'original_bill_date' => $originalBillDate,
            'gross_amount' => (float) ($invoice['amount'] ?? 0),
            'cgst_amount' => (float) ($invoice['cgstamt'] ?? 0),
            'sgst_amount' => (float) ($invoice['sgstamt'] ?? 0),
            'igst_amount' => (float) ($invoice['igstamt'] ?? 0),
            'cess_amount' => (float) ($invoice['cessamt'] ?? 0),
            'qty_cess_amount' => (float) ($invoice['qtycessamt'] ?? 0),
            'post_tax_percent' => (float) ($invoice['posttaxper'] ?? 0),
            'post_tax_amount' => (float) ($invoice['posttaxamt'] ?? 0),
            'post_tax_account_name' => $invoice['posttaxacname'] ?? null,
            'post_tax_amount_2' => (float) ($invoice['posttaxamt2'] ?? 0),
            'post_tax_account_name_2' => $invoice['posttaxacname2'] ?? null,
            'round_amount' => (float) ($invoice['roundamt'] ?? 0),
            'import_remarks' => $invoice['remarks'] ?? null,
        ]);
    }

    protected function createSaleDetail(Sale $sale, Product $product, array $line, int $companyId): void
    {
        SaleDetail::create([
            'business_company_id' => $companyId,
            'date' => $sale->date,
            'sale_id' => $sale->id,
            'sale_unit_id' => $product->unit_sale_id,
            'quantity' => (float) ($line['qty'] ?? 0),
            'product_id' => $product->id,
            'total' => (float) ($line['totamt'] ?? $line['netamount'] ?? 0),
            'product_variant_id' => null,
            'item_name' => $line['itemname'] ?? $product->name,
            'item_description' => $line['itemdesc'] ?? null,
            'sale_account' => $line['saleac'] ?? null,
            'hsn_sac_code' => $line['hsncode'] ?? null,
            'gst_unit' => $line['gstunit'] ?? null,
            'price' => (float) ($line['rate'] ?? 0),
            'TaxNet' => (float) ($line['gstper'] ?? 0),
            'discount' => (float) (($line['dedamt1'] ?? 0) + ($line['dedamt2'] ?? 0) + ($line['dedamt3'] ?? 0)),
            'discount_method' => '2',
            'tax_method' => '1',
            'alt_quantity' => (float) ($line['altunitqty'] ?? 0),
            'gst_rate' => (float) ($line['gstper'] ?? 0),
            'gst_cess_rate' => (float) ($line['gstcessper'] ?? 0),
            'cgst_rate' => (float) ($line['cgstper'] ?? 0),
            'cgst_amount' => (float) ($line['cgstamt'] ?? 0),
            'sgst_rate' => (float) ($line['sgstper'] ?? 0),
            'sgst_amount' => (float) ($line['sgstamt'] ?? 0),
            'igst_rate' => (float) ($line['igstper'] ?? 0),
            'igst_amount' => (float) ($line['igstamt'] ?? 0),
            'cess_rate' => (float) ($line['cessper'] ?? 0),
            'cess_amount' => (float) ($line['cessamt'] ?? 0),
            'qty_cess_rate' => (float) ($line['qtycessrate'] ?? 0),
            'qty_cess_amount' => (float) ($line['qtycessamt'] ?? 0),
            'deduction_percent_1' => (float) ($line['dedper1'] ?? 0),
            'deduction_amount_1' => (float) ($line['dedamt1'] ?? 0),
            'deduction_percent_2' => (float) ($line['dedper2'] ?? 0),
            'deduction_amount_2' => (float) ($line['dedamt2'] ?? 0),
            'deduction_percent_3' => (float) ($line['dedper3'] ?? 0),
            'deduction_amount_3' => (float) ($line['dedamt3'] ?? 0),
            'addition_percent_1' => (float) ($line['addper1'] ?? 0),
            'addition_amount_1' => (float) ($line['addamt1'] ?? 0),
            'addition_percent_2' => (float) ($line['addper2'] ?? 0),
            'addition_amount_2' => (float) ($line['addamt2'] ?? 0),
            'net_amount' => (float) ($line['netamount'] ?? 0),
            'total_amount' => (float) ($line['totamt'] ?? 0),
            'goods_or_service_flag' => $line['goodserflag'] ?? null,
            'stock_flag' => $line['stockflag'] ?? null,
            'source_line_hash' => hash('sha256', json_encode($line)),
        ]);
    }

    protected function findClientMatch(int $companyId, array $invoice): ?Client
    {
        $gstin = trim((string) ($invoice['togstin'] ?? ''));
        $pan = trim((string) ($invoice['pan'] ?? ''));
        $normalizedName = $this->normalizeText($invoice['partyname'] ?? '');
        $normalizedAddress = $this->normalizeText(implode(' ', array_filter([
            $invoice['addrs1'] ?? null,
            $invoice['addrs2'] ?? null,
            $invoice['addrs3'] ?? null,
            $invoice['pin'] ?? null,
        ])));

        $query = Client::where('business_company_id', $companyId)->whereNull('deleted_at');

        if ($gstin !== '') {
            $match = (clone $query)->where('gstin', $gstin)->first();
            if ($match) {
                return $match;
            }
        }

        if ($pan !== '') {
            $match = (clone $query)->where('pan', $pan)->first();
            if ($match) {
                return $match;
            }
        }

        return (clone $query)
            ->where('matching_signature', $normalizedName . '|' . $normalizedAddress)
            ->first();
    }

    protected function findProductMatch(int $companyId, array $line): ?Product
    {
        $signature = $this->productSignature($line);

        return Product::where('business_company_id', $companyId)
            ->whereNull('deleted_at')
            ->where('matching_signature', $signature)
            ->first();
    }

    protected function clientPayload(int $companyId, array $invoice): array
    {
        $addressLines = array_values(array_filter([
            $invoice['addrs1'] ?? null,
            $invoice['addrs2'] ?? null,
            $invoice['addrs3'] ?? null,
        ]));

        $address = implode("\n", $addressLines);

        return [
            'business_company_id' => $companyId,
            'name' => $invoice['partyname'] ?? $invoice['cashpartyname'] ?? 'Unknown Customer',
            'legal_name' => $invoice['partyname'] ?? $invoice['cashpartyname'] ?? 'Unknown Customer',
            'trade_name' => $invoice['cashpartyname'] ?? $invoice['partyname'] ?? 'Unknown Customer',
            'adresse' => $address,
            'address_line_1' => $invoice['addrs1'] ?? null,
            'address_line_2' => $invoice['addrs2'] ?? null,
            'address_line_3' => $invoice['addrs3'] ?? null,
            'country' => 'India',
            'city' => null,
            'state' => $invoice['pos'] ?? null,
            'pin_code' => $invoice['pin'] ?? null,
            'tax_number' => $invoice['togstin'] ?? $invoice['pan'] ?? null,
            'gstin' => $invoice['togstin'] ?? null,
            'pan' => $invoice['pan'] ?? null,
            'place_of_supply' => $invoice['pos'] ?? null,
            'gst_type' => $invoice['gsttype'] ?? null,
            'contact_person' => null,
            'state_code' => $invoice['pos'] ?? null,
            'is_saral_imported' => 1,
            'source_system' => 'saral',
            'source_identifier' => $invoice['partyname'] ?? null,
            'matching_signature' => $this->normalizeText($invoice['partyname'] ?? '') . '|' . $this->normalizeText(implode(' ', $addressLines) . ' ' . ($invoice['pin'] ?? '')),
        ];
    }

    protected function productPayload(int $companyId, array $line): array
    {
        return [
            'business_company_id' => $companyId,
            'name' => $line['itemname'] ?? 'Unknown Item',
            'hsn_sac_code' => $line['hsncode'] ?? null,
            'gst_unit' => $line['gstunit'] ?? null,
            'goods_or_service_flag' => $line['goodserflag'] ?? null,
            'TaxNet' => (float) ($line['gstper'] ?? 0),
            'default_gst_rate' => (float) ($line['gstper'] ?? 0),
            'is_saral_imported' => 1,
            'source_system' => 'saral',
            'source_identifier' => $line['itemname'] ?? null,
            'matching_signature' => $this->productSignature($line),
        ];
    }

    protected function sourceInvoiceKey(array $invoice, int $rowNumber): string
    {
        $base = implode('-', array_filter([
            'SARAL',
            preg_replace('/[^0-9]/', '', (string) ($invoice['invdt'] ?? '')),
            Str::upper(Str::slug((string) ($invoice['partyname'] ?? 'customer'), '')),
            $rowNumber,
        ]));

        return Str::limit($base, 190, '');
    }

    protected function documentHash(array $invoice): string
    {
        return hash('sha256', json_encode($invoice));
    }

    protected function productSignature(array $line): string
    {
        return implode('|', [
            $this->normalizeText($line['itemname'] ?? ''),
            strtoupper(trim((string) ($line['hsncode'] ?? ''))),
            strtoupper(trim((string) ($line['gstunit'] ?? ''))),
        ]);
    }

    protected function normalizeText(?string $value): string
    {
        $value = Str::upper(trim((string) $value));
        $value = preg_replace('/[^A-Z0-9]+/', ' ', $value);
        return trim((string) $value);
    }

    protected function parseDate(?string $value): ?string
    {
        if (!$value) {
            return null;
        }

        foreach (['d/m/Y', 'd-m-Y', 'Y-m-d'] as $format) {
            try {
                return Carbon::createFromFormat($format, $value)->toDateString();
            } catch (\Throwable $e) {
            }
        }

        return null;
    }

    protected function defaultCategoryId(): int
    {
        $category = Category::firstOrCreate(
            ['name' => 'SARAL Imported'],
            ['code' => 'SARAL-IMPORTED']
        );

        return $category->id;
    }

    protected function resolveUnitId(?string $unitName): ?int
    {
        $unitName = trim((string) $unitName);

        if ($unitName === '') {
            return null;
        }

        $unit = Unit::firstOrCreate(
            ['ShortName' => $unitName],
            [
                'name' => $unitName,
                'operator' => '*',
                'operator_value' => 1,
            ]
        );

        return $unit->id;
    }

    protected function generateProductCode(int $companyId, array $line): string
    {
        $base = 'SARAL-' . strtoupper(substr(hash('sha1', $companyId . '|' . $this->productSignature($line)), 0, 10));
        $code = $base;
        $suffix = 1;

        while (Product::where('code', $code)->exists()) {
            $suffix++;
            $code = $base . '-' . $suffix;
        }

        return $code;
    }

    protected function resolveArchiveWarehouse(BusinessCompany $company): Warehouse
    {
        return Warehouse::firstOrCreate(
            [
                'business_company_id' => $company->id,
                'name' => 'SARAL Archive - ' . $company->name,
            ],
            [
                'city' => $company->city,
                'country' => $company->country ?? 'India',
                'email' => $company->email,
                'mobile' => $company->phone,
                'zip' => $company->pin_code,
                'is_archive_only' => 1,
            ]
        );
    }
}
