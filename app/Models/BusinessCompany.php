<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BusinessCompany extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'legal_name',
        'gstin',
        'pan',
        'address',
        'city',
        'state',
        'pin_code',
        'country',
        'contact_person',
        'phone',
        'email',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
