<?php

if (! function_exists('store_setting')) {
    /**
     * Get the store settings.
     *
     * @param string|null $key
     * @param mixed $default
     * @return mixed
     */
    function store_setting($key = null, $default = null) {
        static $settings = null;

        if ($settings === null) {
            try {
                $settings = \Illuminate\Support\Facades\DB::table('store_settings')->first();
            } catch (\Exception $e) {
                return $default;
            }
        }

        if ($key === null) {
            return $settings;
        }

        return $settings->$key ?? $default;
    }
}
