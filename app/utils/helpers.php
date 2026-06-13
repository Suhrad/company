<?php
namespace App\utils;

use App\Models\Currency;
use App\Models\Role;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;

class helpers
{

    //  Helper Multiple Filter
    public function filter($model, $columns, $param, $request)
    {
        // Loop through the fields checking if they've been input, if they have add
        //  them to the query.
        $fields = [];
        for ($key = 0; $key < count($columns); $key++) {
            $fields[$key]['param'] = $param[$key];
            $fields[$key]['value'] = $columns[$key];
        }

        foreach ($fields as $field) {
            $model->where(function ($query) use ($request, $field, $model) {
                return $model->when($request->filled($field['value']),
                    function ($query) use ($request, $model, $field) {
                        $field['param'] = 'like' ?
                        $model->where($field['value'], 'like', "{$request[$field['value']]}")
                        : $model->where($field['value'], $request[$field['value']]);
                    });
            });
        }

        // Finally return the model
        return $model;
    }

    //  Check If Hass Permission Show All records
    public function Show_Records($model)
    {
        $Role = Auth::user()->roles()->first();
        $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');

        if (!$ShowRecord) {
            return $model->where('user_id', '=', Auth::user()->id);
        }
        return $model;
    }

    // Get Currency
    public function Get_Currency()
    {
        $settings = Setting::with('Currency')->where('deleted_at', '=', null)->first();

        if ($settings && $settings->currency_id) {
            if (Currency::where('id', $settings->currency_id)
                ->where('deleted_at', '=', null)
                ->first()) {
                $symbol = $settings['Currency']->symbol;
            } else {
                $symbol = '';
            }
        } else {
            $symbol = '';
        }
        return $symbol;
    }

    // Get Currency COde
    public function Get_Currency_Code()
    {
        $settings = Setting::with('Currency')->where('deleted_at', '=', null)->first();

        if ($settings && $settings->currency_id) {
            if (Currency::where('id', $settings->currency_id)
                ->where('deleted_at', '=', null)
                ->first()) {
                $code = $settings['Currency']->code;
            } else {
                $code = 'usd';
            }
        } else {
            $code = 'usd';
        }
        return $code;
    }

    public function getUnifiedSuppliers()
    {
        $clients = \App\Models\Client::whereNull('deleted_at')->orderBy('name', 'asc')->get(['id', 'name', 'code', 'email', 'phone', 'country', 'city', 'adresse', 'tax_number', 'gstin', 'pan', 'address_line_1', 'address_line_2', 'address_line_3', 'state', 'source_system']);
        $suppliers = [];
        foreach ($clients as $client) {
            $provider = \App\Models\Provider::whereNull('deleted_at')->where('name', $client->name)->first();
            if (!$provider) {
                // Self-healing: create provider counterpart
                $provider = \App\Models\Provider::create([
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
            }
            $suppliers[] = [
                'id' => $provider->id,
                'name' => $client->name,
            ];
        }
        return $suppliers;
    }

}

