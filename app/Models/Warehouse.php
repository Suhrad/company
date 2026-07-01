<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Warehouse extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'business_company_id', 'name', 'mobile', 'country', 'city', 'email', 'zip', 'is_archive_only', 'shortcut',
    ];

    protected $casts = [
        'business_company_id' => 'integer',
        'is_archive_only' => 'boolean',
    ];

    public function assignedUsers()
    {
        return $this->belongsToMany('App\Models\User');
    }

    public function company()
    {
        return $this->belongsTo(BusinessCompany::class, 'business_company_id');
    }
}
