<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobWorkOrderDetail extends Model
{
    protected $fillable = [
        'job_work_order_id', 'product_id', 'product_variant_id', 'quantity', 'quantity_consumed', 'quantity_returned'
    ];

    protected $casts = [
        'job_work_order_id' => 'integer',
        'product_id' => 'integer',
        'product_variant_id' => 'integer',
        'quantity' => 'double',
        'quantity_consumed' => 'double',
        'quantity_returned' => 'double',
    ];

    public function job_work_order()
    {
        return $this->belongsTo(JobWorkOrder::class);
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
