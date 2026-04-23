<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaleDetail extends Model
{
    protected $fillable = [
        'id', 'business_company_id', 'date', 'sale_id', 'sale_unit_id', 'quantity', 'product_id', 'total', 'product_variant_id',
        'item_name', 'item_description', 'sale_account', 'hsn_sac_code', 'gst_unit', 'alt_quantity',
        'gst_rate', 'gst_cess_rate', 'cgst_rate', 'cgst_amount', 'sgst_rate', 'sgst_amount', 'igst_rate',
        'igst_amount', 'cess_rate', 'cess_amount', 'qty_cess_rate', 'qty_cess_amount', 'deduction_percent_1',
        'deduction_amount_1', 'deduction_percent_2', 'deduction_amount_2', 'deduction_percent_3',
        'deduction_amount_3', 'addition_percent_1', 'addition_amount_1', 'addition_percent_2',
        'addition_amount_2', 'net_amount', 'total_amount', 'goods_or_service_flag', 'stock_flag', 'source_line_hash',
        'price', 'TaxNet', 'discount', 'discount_method', 'tax_method',
    ];

    protected $casts = [
        'id' => 'integer',
        'business_company_id' => 'integer',
        'total' => 'double',
        'quantity' => 'double',
        'sale_id' => 'integer',
        'sale_unit_id' => 'integer',
        'product_id' => 'integer',
        'product_variant_id' => 'integer',
        'price' => 'double',
        'TaxNet' => 'double',
        'discount' => 'double',
        'alt_quantity' => 'double',
        'gst_rate' => 'double',
        'gst_cess_rate' => 'double',
        'cgst_rate' => 'double',
        'cgst_amount' => 'double',
        'sgst_rate' => 'double',
        'sgst_amount' => 'double',
        'igst_rate' => 'double',
        'igst_amount' => 'double',
        'cess_rate' => 'double',
        'cess_amount' => 'double',
        'qty_cess_rate' => 'double',
        'qty_cess_amount' => 'double',
        'deduction_percent_1' => 'double',
        'deduction_amount_1' => 'double',
        'deduction_percent_2' => 'double',
        'deduction_amount_2' => 'double',
        'deduction_percent_3' => 'double',
        'deduction_amount_3' => 'double',
        'addition_percent_1' => 'double',
        'addition_amount_1' => 'double',
        'addition_percent_2' => 'double',
        'addition_amount_2' => 'double',
        'net_amount' => 'double',
        'total_amount' => 'double',
    ];

    public function sale()
    {
        return $this->belongsTo('App\Models\Sale');
    }

    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

    public function company()
    {
        return $this->belongsTo(BusinessCompany::class, 'business_company_id');
    }
}
