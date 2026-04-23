<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name', 'code', 'adresse', 'phone', 'country', 'email', 'city', 'tax_number',
        'gstin', 'pan', 'address_line_1', 'address_line_2', 'address_line_3', 'state', 'source_system'
    ];

    protected $casts = [
        'code' => 'integer',
    ];

}
