<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobWorkOrder extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'Ref', 'date', 'user_id', 'from_warehouse_id', 'worker_warehouse_id', 'statut', 'notes'
    ];

    protected $casts = [
        'user_id' => 'integer',
        'from_warehouse_id' => 'integer',
        'worker_warehouse_id' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function from_warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'from_warehouse_id');
    }

    public function worker_warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'worker_warehouse_id');
    }

    public function details()
    {
        return $this->hasMany(JobWorkOrderDetail::class);
    }

    public function receipts()
    {
        return $this->hasMany(JobWorkReceipt::class);
    }
}
