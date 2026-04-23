<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\Setting;
use App\Models\StoreSetting;
use App\Models\Warehouse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StoreSettingsController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        if ($request->user()) {
            $this->authorize('view', StoreSetting::class);
        }

        $setting = Setting::first();
        $storeSetting = StoreSetting::first() ?: StoreSetting::create([
            'enabled' => 1,
            'store_name' => 'StoreX',
            'primary_color' => '#6c5ce7',
            'secondary_color' => '#00c2ff',
            'font_family' => 'Arial, sans-serif',
            'language' => 'en',
            'default_warehouse_id' => $setting?->warehouse_id ?: Warehouse::query()->value('id'),
            'currency_code' => optional($setting?->Currency)->symbol,
        ]);

        return response()->json([
            'settings' => $storeSetting,
            'warehouses' => Warehouse::whereNull('deleted_at')->get(['id', 'name']),
            'currencies' => Currency::whereNull('deleted_at')->get(['id', 'name', 'symbol']),
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        if ($request->user()) {
            $this->authorize('update', StoreSetting::class);
        }

        $data = $request->validate([
            'enabled' => ['nullable', 'boolean'],
            'store_name' => ['nullable', 'string', 'max:190'],
            'primary_color' => ['nullable', 'string', 'max:20'],
            'secondary_color' => ['nullable', 'string', 'max:20'],
            'font_family' => ['nullable', 'string', 'max:100'],
            'language' => ['nullable', 'string', 'max:10'],
            'default_warehouse_id' => ['nullable', 'integer'],
            'currency_code' => ['nullable', 'string', 'max:10'],
            'contact_email' => ['nullable', 'email', 'max:190'],
            'contact_phone' => ['nullable', 'string', 'max:50'],
            'contact_address' => ['nullable', 'string', 'max:255'],
            'hero_title' => ['nullable', 'string', 'max:255'],
            'hero_subtitle' => ['nullable', 'string', 'max:1000'],
            'seo_meta_title' => ['nullable', 'string', 'max:255'],
            'seo_meta_description' => ['nullable', 'string', 'max:1000'],
            'topbar_text_left' => ['nullable', 'string', 'max:190'],
            'topbar_text_right' => ['nullable', 'string', 'max:190'],
            'footer_text' => ['nullable', 'string', 'max:255'],
        ]);

        $storeSetting = StoreSetting::first() ?: new StoreSetting();
        $storeSetting->fill($data)->save();

        return response()->json($storeSetting->fresh());
    }
}
