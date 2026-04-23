<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'business_company_id', 'date', 'Ref', 'is_pos', 'client_id', 'GrandTotal', 'qte_retturn', 'TaxNet', 'tax_rate', 'notes',
        'total_retturn', 'warehouse_id', 'user_id', 'statut', 'discount', 'shipping', 'time', 'used_points', 'earned_points', 'discount_from_points',
        'paid_amount', 'payment_statut', 'created_at', 'updated_at', 'deleted_at', 'shipping_status',
        'is_archive_import', 'source_system', 'source_invoice_key', 'source_document_hash', 'saral_import_job_id',
        'original_invoice_date', 'original_invoice_number', 'original_invoice_series', 'drcr_flag', 'po_number', 'po_date',
        'broker_name', 'vehicle_number', 'lr_number', 'transporter_name', 'transporter_gstin', 'eway_bill_number',
        'irn', 'ack_number', 'ack_date', 'reverse_charge', 'freight_type', 'gst_type', 'party_gstin', 'party_pan',
        'place_of_supply', 'debit_account_name', 'original_bill_series', 'original_bill_number', 'original_bill_date',
        'gross_amount', 'cgst_amount', 'sgst_amount', 'igst_amount', 'cess_amount', 'qty_cess_amount', 'post_tax_percent',
        'post_tax_amount', 'post_tax_account_name', 'post_tax_amount_2', 'post_tax_account_name_2', 'round_amount', 'import_remarks'
    ];

    protected $casts = [
        'is_pos' => 'integer',
        'business_company_id' => 'integer',
        'GrandTotal' => 'double',
        'qte_retturn' => 'double',
        'total_retturn' => 'double',
        'user_id' => 'integer',
        'client_id' => 'integer',
        'warehouse_id' => 'integer',
        'discount' => 'double',
        'shipping' => 'double',
        'TaxNet' => 'double',
        'tax_rate' => 'double',
        'paid_amount' => 'double',
        'used_points' => 'double',
        'earned_points' => 'double',
        'discount_from_points' => 'double',
        'is_archive_import' => 'boolean',
        'reverse_charge' => 'boolean',
        'gross_amount' => 'double',
        'cgst_amount' => 'double',
        'sgst_amount' => 'double',
        'igst_amount' => 'double',
        'cess_amount' => 'double',
        'qty_cess_amount' => 'double',
        'post_tax_percent' => 'double',
        'post_tax_amount' => 'double',
        'post_tax_amount_2' => 'double',
        'round_amount' => 'double',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function details()
    {
        return $this->hasMany('App\Models\SaleDetail');
    }

    public function client()
    {
        return $this->belongsTo('App\Models\Client');
    }

    public function facture()
    {
        return $this->hasMany('App\Models\PaymentSale');
    }

    public function warehouse()
    {
        return $this->belongsTo('App\Models\Warehouse');
    }

    public function company()
    {
        return $this->belongsTo(BusinessCompany::class, 'business_company_id');
    }
}
