<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Provider extends Model
{
    use SoftDeletes;

    public static $isSyncing = false;

    protected static function booted()
    {
        static::saved(function ($provider) {
            if (static::$isSyncing || Client::$isSyncing) {
                return;
            }

            static::$isSyncing = true;
            try {
                $originalName = $provider->getOriginal('name') ?: $provider->name;
                $originalCode = $provider->getOriginal('code') ?: $provider->code;

                $client = Client::where(function ($q) use ($originalName, $originalCode) {
                    $q->where('name', $originalName)
                      ->orWhere('code', $originalCode);
                })->first();

                if (!$client) {
                    $client = new Client();
                }

                $client->fill([
                    'name' => $provider->name,
                    'code' => $provider->code,
                    'email' => $provider->email,
                    'phone' => $provider->phone,
                    'country' => $provider->country,
                    'city' => $provider->city,
                    'adresse' => $provider->adresse,
                    'tax_number' => $provider->tax_number,
                    'gstin' => $provider->gstin,
                    'pan' => $provider->pan,
                    'address_line_1' => $provider->address_line_1,
                    'address_line_2' => $provider->address_line_2,
                    'address_line_3' => $provider->address_line_3,
                    'state' => $provider->state,
                    'source_system' => $provider->source_system,
                ]);
                $client->save();
            } finally {
                static::$isSyncing = false;
            }
        });

        static::deleted(function ($provider) {
            if (static::$isSyncing || Client::$isSyncing) {
                return;
            }

            static::$isSyncing = true;
            try {
                $originalName = $provider->getOriginal('name') ?: $provider->name;
                $client = Client::where('name', $originalName)->first();
                if ($client) {
                    $client->delete();
                }
            } finally {
                static::$isSyncing = false;
            }
        });

        static::restored(function ($provider) {
            if (static::$isSyncing || Client::$isSyncing) {
                return;
            }

            static::$isSyncing = true;
            try {
                $originalName = $provider->getOriginal('name') ?: $provider->name;
                DB::table('clients')->where('name', $originalName)->update(['deleted_at' => null]);
            } finally {
                static::$isSyncing = false;
            }
        });
    }

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name', 'code', 'adresse', 'phone', 'country', 'email', 'city', 'tax_number',
        'gstin', 'pan', 'address_line_1', 'address_line_2', 'address_line_3', 'state', 'source_system'
    ];

    protected $casts = [
        'code' => 'integer',
    ];

}
