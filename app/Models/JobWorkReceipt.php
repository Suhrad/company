<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobWorkReceipt extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'job_work_order_id', 'Ref', 'date', 'user_id', 'to_warehouse_id', 'notes'
    ];

    protected $casts = [
        'job_work_order_id' => 'integer',
        'user_id' => 'integer',
        'to_warehouse_id' => 'integer',
    ];

    public function job_work_order()
    {
        return $this->belongsTo(JobWorkOrder::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function to_warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'to_warehouse_id');
    }

    public function details()
    {
        return $this->hasMany(JobWorkReceiptDetail::class);
    }
}
