<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'business_company_id',
        'name',
        'legal_name',
        'trade_name',
        'code',
        'adresse',
        'address_line_1',
        'address_line_2',
        'address_line_3',
        'email',
        'phone',
        'country',
        'city',
        'state',
        'pin_code',
        'tax_number',
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
        'is_royalty_eligible',
        'points',
        'preferred_transport',
        'opening_balance',
        'opening_balance_type',
    ];

    protected $casts = [
        'code' => 'integer',
        'business_company_id' => 'integer',
        'is_royalty_eligible' => 'integer',
        'is_saral_imported' => 'boolean',
        'points' => 'double',
    ];

    public function company()
    {
        return $this->belongsTo(BusinessCompany::class, 'business_company_id');
    }
}
