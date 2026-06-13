<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Client extends Model
{
    use SoftDeletes;

    public static $isSyncing = false;

    protected static function booted()
    {
        static::saved(function ($client) {
            if (static::$isSyncing || Provider::$isSyncing) {
                return;
            }

            static::$isSyncing = true;
            try {
                $originalName = $client->getOriginal('name') ?: $client->name;
                $originalCode = $client->getOriginal('code') ?: $client->code;

                $provider = Provider::where(function ($q) use ($originalName, $originalCode) {
                    $q->where('name', $originalName)
                      ->orWhere('code', $originalCode);
                })->first();

                if (!$provider) {
                    $provider = new Provider();
                }

                $provider->fill([
                    'name' => $client->name,
                    'code' => $client->code,
                    'email' => $client->email,
                    'phone' => $client->phone,
                    'country' => $client->country,
                    'city' => $client->city,
                    'adresse' => $client->adresse,
                    'tax_number' => $client->tax_number,
                    'gstin' => $client->gstin,
                    'pan' => $client->pan,
                    'address_line_1' => $client->address_line_1,
                    'address_line_2' => $client->address_line_2,
                    'address_line_3' => $client->address_line_3,
                    'state' => $client->state,
                    'source_system' => $client->source_system,
                ]);
                $provider->save();
            } finally {
                static::$isSyncing = false;
            }
        });

        static::deleted(function ($client) {
            if (static::$isSyncing || Provider::$isSyncing) {
                return;
            }

            static::$isSyncing = true;
            try {
                $originalName = $client->getOriginal('name') ?: $client->name;
                $provider = Provider::where('name', $originalName)->first();
                if ($provider) {
                    $provider->delete();
                }
            } finally {
                static::$isSyncing = false;
            }
        });

        static::restored(function ($client) {
            if (static::$isSyncing || Provider::$isSyncing) {
                return;
            }

            static::$isSyncing = true;
            try {
                $originalName = $client->getOriginal('name') ?: $client->name;
                // In SQLite, if we soft-deleted the provider directly using DB::table, 
                // we restore it by setting deleted_at = null
                DB::table('providers')->where('name', $originalName)->update(['deleted_at' => null]);
            } finally {
                static::$isSyncing = false;
            }
        });
    }

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
