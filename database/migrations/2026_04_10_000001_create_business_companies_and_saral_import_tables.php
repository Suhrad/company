<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_companies', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer('id', true);
            $table->string('name');
            $table->string('code')->nullable()->unique();
            $table->string('legal_name')->nullable();
            $table->string('gstin')->nullable();
            $table->string('pan')->nullable();
            $table->string('address_line_1')->nullable();
            $table->string('address_line_2')->nullable();
            $table->string('address_line_3')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('pin_code')->nullable();
            $table->string('country')->nullable()->default('India');
            $table->string('contact_person')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->boolean('is_active')->default(1);
            $table->timestamps(6);
            $table->softDeletes();
        });

        DB::table('business_companies')->insert([
            'name' => 'Default Company',
            'code' => 'DEFAULT',
            'legal_name' => 'Default Company',
            'country' => 'India',
            'is_active' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $defaultCompanyId = DB::table('business_companies')->where('code', 'DEFAULT')->value('id');

        Schema::table('clients', function (Blueprint $table) {
            $table->integer('business_company_id')->nullable()->after('id')->index('clients_business_company_id_idx');
            $table->string('legal_name')->nullable()->after('name');
            $table->string('trade_name')->nullable()->after('legal_name');
            $table->string('address_line_1')->nullable()->after('adresse');
            $table->string('address_line_2')->nullable()->after('address_line_1');
            $table->string('address_line_3')->nullable()->after('address_line_2');
            $table->string('state')->nullable()->after('city');
            $table->string('pin_code')->nullable()->after('state');
            $table->string('gstin')->nullable()->after('pin_code');
            $table->string('pan')->nullable()->after('gstin');
            $table->string('place_of_supply')->nullable()->after('pan');
            $table->string('gst_type')->nullable()->after('place_of_supply');
            $table->string('contact_person')->nullable()->after('gst_type');
            $table->string('state_code')->nullable()->after('contact_person');
            $table->boolean('is_saral_imported')->default(0)->after('state_code');
            $table->string('source_system')->nullable()->after('is_saral_imported');
            $table->string('source_identifier')->nullable()->after('source_system');
            $table->string('matching_signature')->nullable()->after('source_identifier');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->integer('business_company_id')->nullable()->after('id')->index('products_business_company_id_idx');
            $table->string('hsn_sac_code')->nullable()->after('name');
            $table->string('gst_unit')->nullable()->after('hsn_sac_code');
            $table->string('goods_or_service_flag')->nullable()->after('gst_unit');
            $table->float('default_gst_rate', 10, 2)->nullable()->after('TaxNet');
            $table->boolean('is_saral_imported')->default(0)->after('default_gst_rate');
            $table->string('source_system')->nullable()->after('is_saral_imported');
            $table->string('source_identifier')->nullable()->after('source_system');
            $table->string('matching_signature')->nullable()->after('source_identifier');
        });

        Schema::table('warehouses', function (Blueprint $table) {
            $table->integer('business_company_id')->nullable()->after('id')->index('warehouses_business_company_id_idx');
            $table->boolean('is_archive_only')->default(0)->after('country');
        });

        Schema::table('sales', function (Blueprint $table) {
            $table->integer('business_company_id')->nullable()->after('id')->index('sales_business_company_id_idx');
            $table->boolean('is_archive_import')->default(0)->after('notes');
            $table->string('source_system')->nullable()->after('is_archive_import');
            $table->string('source_invoice_key')->nullable()->after('source_system');
            $table->string('source_document_hash', 64)->nullable()->after('source_invoice_key');
            $table->integer('saral_import_job_id')->nullable()->after('source_document_hash')->index('sales_saral_import_job_id_idx');
            $table->date('original_invoice_date')->nullable()->after('saral_import_job_id');
            $table->string('original_invoice_number')->nullable()->after('original_invoice_date');
            $table->string('original_invoice_series')->nullable()->after('original_invoice_number');
            $table->string('drcr_flag')->nullable()->after('original_invoice_series');
            $table->string('po_number')->nullable()->after('drcr_flag');
            $table->date('po_date')->nullable()->after('po_number');
            $table->string('broker_name')->nullable()->after('po_date');
            $table->string('vehicle_number')->nullable()->after('broker_name');
            $table->string('lr_number')->nullable()->after('vehicle_number');
            $table->string('transporter_name')->nullable()->after('lr_number');
            $table->string('transporter_gstin')->nullable()->after('transporter_name');
            $table->string('eway_bill_number')->nullable()->after('transporter_gstin');
            $table->string('irn')->nullable()->after('eway_bill_number');
            $table->string('ack_number')->nullable()->after('irn');
            $table->date('ack_date')->nullable()->after('ack_number');
            $table->boolean('reverse_charge')->default(0)->after('ack_date');
            $table->string('freight_type')->nullable()->after('reverse_charge');
            $table->string('gst_type')->nullable()->after('freight_type');
            $table->string('party_gstin')->nullable()->after('gst_type');
            $table->string('party_pan')->nullable()->after('party_gstin');
            $table->string('place_of_supply')->nullable()->after('party_pan');
            $table->string('debit_account_name')->nullable()->after('place_of_supply');
            $table->string('original_bill_series')->nullable()->after('debit_account_name');
            $table->string('original_bill_number')->nullable()->after('original_bill_series');
            $table->date('original_bill_date')->nullable()->after('original_bill_number');
            $table->float('gross_amount', 12, 2)->nullable()->after('original_bill_date');
            $table->float('cgst_amount', 12, 2)->nullable()->default(0)->after('gross_amount');
            $table->float('sgst_amount', 12, 2)->nullable()->default(0)->after('cgst_amount');
            $table->float('igst_amount', 12, 2)->nullable()->default(0)->after('sgst_amount');
            $table->float('cess_amount', 12, 2)->nullable()->default(0)->after('igst_amount');
            $table->float('qty_cess_amount', 12, 2)->nullable()->default(0)->after('cess_amount');
            $table->float('post_tax_percent', 12, 2)->nullable()->default(0)->after('qty_cess_amount');
            $table->float('post_tax_amount', 12, 2)->nullable()->default(0)->after('post_tax_percent');
            $table->string('post_tax_account_name')->nullable()->after('post_tax_amount');
            $table->float('post_tax_amount_2', 12, 2)->nullable()->default(0)->after('post_tax_account_name');
            $table->string('post_tax_account_name_2')->nullable()->after('post_tax_amount_2');
            $table->float('round_amount', 12, 2)->nullable()->default(0)->after('post_tax_account_name_2');
            $table->text('import_remarks')->nullable()->after('round_amount');
            $table->unique(['business_company_id', 'source_system', 'source_document_hash'], 'sales_company_source_hash_unique');
        });

        Schema::table('sale_details', function (Blueprint $table) {
            $table->integer('business_company_id')->nullable()->after('id')->index('sale_details_business_company_id_idx');
            $table->string('item_name')->nullable()->after('product_variant_id');
            $table->text('item_description')->nullable()->after('item_name');
            $table->string('sale_account')->nullable()->after('item_description');
            $table->string('hsn_sac_code')->nullable()->after('sale_account');
            $table->string('gst_unit')->nullable()->after('hsn_sac_code');
            $table->float('alt_quantity', 12, 2)->nullable()->default(0)->after('quantity');
            $table->float('gst_rate', 12, 2)->nullable()->default(0)->after('alt_quantity');
            $table->float('gst_cess_rate', 12, 2)->nullable()->default(0)->after('gst_rate');
            $table->float('cgst_rate', 12, 2)->nullable()->default(0)->after('gst_cess_rate');
            $table->float('cgst_amount', 12, 2)->nullable()->default(0)->after('cgst_rate');
            $table->float('sgst_rate', 12, 2)->nullable()->default(0)->after('cgst_amount');
            $table->float('sgst_amount', 12, 2)->nullable()->default(0)->after('sgst_rate');
            $table->float('igst_rate', 12, 2)->nullable()->default(0)->after('sgst_amount');
            $table->float('igst_amount', 12, 2)->nullable()->default(0)->after('igst_rate');
            $table->float('cess_rate', 12, 2)->nullable()->default(0)->after('igst_amount');
            $table->float('cess_amount', 12, 2)->nullable()->default(0)->after('cess_rate');
            $table->float('qty_cess_rate', 12, 2)->nullable()->default(0)->after('cess_amount');
            $table->float('qty_cess_amount', 12, 2)->nullable()->default(0)->after('qty_cess_rate');
            $table->float('deduction_percent_1', 12, 2)->nullable()->default(0)->after('qty_cess_amount');
            $table->float('deduction_amount_1', 12, 2)->nullable()->default(0)->after('deduction_percent_1');
            $table->float('deduction_percent_2', 12, 2)->nullable()->default(0)->after('deduction_amount_1');
            $table->float('deduction_amount_2', 12, 2)->nullable()->default(0)->after('deduction_percent_2');
            $table->float('deduction_percent_3', 12, 2)->nullable()->default(0)->after('deduction_amount_2');
            $table->float('deduction_amount_3', 12, 2)->nullable()->default(0)->after('deduction_percent_3');
            $table->float('addition_percent_1', 12, 2)->nullable()->default(0)->after('deduction_amount_3');
            $table->float('addition_amount_1', 12, 2)->nullable()->default(0)->after('addition_percent_1');
            $table->float('addition_percent_2', 12, 2)->nullable()->default(0)->after('addition_amount_1');
            $table->float('addition_amount_2', 12, 2)->nullable()->default(0)->after('addition_percent_2');
            $table->float('net_amount', 12, 2)->nullable()->default(0)->after('addition_amount_2');
            $table->float('total_amount', 12, 2)->nullable()->default(0)->after('net_amount');
            $table->string('goods_or_service_flag')->nullable()->after('total_amount');
            $table->string('stock_flag')->nullable()->after('goods_or_service_flag');
            $table->string('source_line_hash', 64)->nullable()->after('stock_flag');
        });

        Schema::create('saral_import_jobs', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer('id', true);
            $table->integer('business_company_id')->index('saral_jobs_company_id_idx');
            $table->integer('user_id')->index('saral_jobs_user_id_idx');
            $table->string('file_name');
            $table->string('payload_hash', 64)->nullable()->index('saral_jobs_payload_hash_idx');
            $table->string('status')->default('completed');
            $table->integer('invoice_count')->default(0);
            $table->integer('imported_count')->default(0);
            $table->integer('skipped_count')->default(0);
            $table->integer('error_count')->default(0);
            $table->longText('summary_json')->nullable();
            $table->longText('result_json')->nullable();
            $table->longText('original_payload')->nullable();
            $table->timestamps(6);
        });

        Schema::create('saral_import_rows', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer('id', true);
            $table->integer('saral_import_job_id')->index('saral_rows_job_id_idx');
            $table->integer('row_number');
            $table->string('status')->default('imported');
            $table->string('source_document_hash', 64)->nullable();
            $table->string('customer_action')->nullable();
            $table->string('product_action')->nullable();
            $table->text('message')->nullable();
            $table->longText('preview_json')->nullable();
            $table->timestamps(6);
            $table->unique(['saral_import_job_id', 'row_number'], 'saral_rows_job_row_unique');
        });

        DB::table('clients')->update([
            'business_company_id' => $defaultCompanyId,
            'legal_name' => DB::raw('name'),
            'trade_name' => DB::raw('name'),
            'address_line_1' => DB::raw('adresse'),
            'gstin' => DB::raw('tax_number'),
            'source_system' => 'stocky',
        ]);

        DB::table('products')->update([
            'business_company_id' => $defaultCompanyId,
            'default_gst_rate' => DB::raw('COALESCE(TaxNet, 0)'),
            'source_system' => 'stocky',
        ]);

        DB::table('warehouses')->update([
            'business_company_id' => $defaultCompanyId,
        ]);

        DB::table('sales')->update([
            'business_company_id' => $defaultCompanyId,
            'source_system' => 'stocky',
        ]);

        DB::table('sale_details')->update([
            'business_company_id' => $defaultCompanyId,
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('saral_import_rows');
        Schema::dropIfExists('saral_import_jobs');

        Schema::table('sale_details', function (Blueprint $table) {
            $table->dropIndex('sale_details_business_company_id_idx');
            $table->dropColumn([
                'business_company_id',
                'item_name',
                'item_description',
                'sale_account',
                'hsn_sac_code',
                'gst_unit',
                'alt_quantity',
                'gst_rate',
                'gst_cess_rate',
                'cgst_rate',
                'cgst_amount',
                'sgst_rate',
                'sgst_amount',
                'igst_rate',
                'igst_amount',
                'cess_rate',
                'cess_amount',
                'qty_cess_rate',
                'qty_cess_amount',
                'deduction_percent_1',
                'deduction_amount_1',
                'deduction_percent_2',
                'deduction_amount_2',
                'deduction_percent_3',
                'deduction_amount_3',
                'addition_percent_1',
                'addition_amount_1',
                'addition_percent_2',
                'addition_amount_2',
                'net_amount',
                'total_amount',
                'goods_or_service_flag',
                'stock_flag',
                'source_line_hash',
            ]);
        });

        Schema::table('sales', function (Blueprint $table) {
            $table->dropUnique('sales_company_source_hash_unique');
            $table->dropIndex('sales_business_company_id_idx');
            $table->dropIndex('sales_saral_import_job_id_idx');
            $table->dropColumn([
                'business_company_id',
                'is_archive_import',
                'source_system',
                'source_invoice_key',
                'source_document_hash',
                'saral_import_job_id',
                'original_invoice_date',
                'original_invoice_number',
                'original_invoice_series',
                'drcr_flag',
                'po_number',
                'po_date',
                'broker_name',
                'vehicle_number',
                'lr_number',
                'transporter_name',
                'transporter_gstin',
                'eway_bill_number',
                'irn',
                'ack_number',
                'ack_date',
                'reverse_charge',
                'freight_type',
                'gst_type',
                'party_gstin',
                'party_pan',
                'place_of_supply',
                'debit_account_name',
                'original_bill_series',
                'original_bill_number',
                'original_bill_date',
                'gross_amount',
                'cgst_amount',
                'sgst_amount',
                'igst_amount',
                'cess_amount',
                'qty_cess_amount',
                'post_tax_percent',
                'post_tax_amount',
                'post_tax_account_name',
                'post_tax_amount_2',
                'post_tax_account_name_2',
                'round_amount',
                'import_remarks',
            ]);
        });

        Schema::table('warehouses', function (Blueprint $table) {
            $table->dropIndex('warehouses_business_company_id_idx');
            $table->dropColumn(['business_company_id', 'is_archive_only']);
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_business_company_id_idx');
            $table->dropColumn([
                'business_company_id',
                'hsn_sac_code',
                'gst_unit',
                'goods_or_service_flag',
                'default_gst_rate',
                'is_saral_imported',
                'source_system',
                'source_identifier',
                'matching_signature',
            ]);
        });

        Schema::table('clients', function (Blueprint $table) {
            $table->dropIndex('clients_business_company_id_idx');
            $table->dropColumn([
                'business_company_id',
                'legal_name',
                'trade_name',
                'address_line_1',
                'address_line_2',
                'address_line_3',
                'state',
                'pin_code',
                'gstin',
                'pan',
                'place_of_supply',
                'gst_type',
                'contact_person',
                'state_code',
                'is_saral_imported',
                'source_system',
                'source_identifier',
                'matching_signature',
            ]);
        });

        Schema::dropIfExists('business_companies');
    }
};
