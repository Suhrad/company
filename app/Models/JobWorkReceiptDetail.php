<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobWorkReceiptDetail extends Model
{
    protected $fillable = [
        'job_work_receipt_id', 'product_id', 'product_variant_id', 'quantity', 'wastage'
    ];

    protected $casts = [
        'job_work_receipt_id' => 'integer',
        'product_id' => 'integer',
        'product_variant_id' => 'integer',
        'quantity' => 'double',
        'wastage' => 'double',
    ];

    public function receipt()
    {
        return $this->belongsTo(JobWorkReceipt::class, 'job_work_receipt_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class, 'product_variant_id');
    }
}
