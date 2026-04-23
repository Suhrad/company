<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransporterTranslationsSeeder extends Seeder
{
    public function run()
    {
        $translations = [
            ['key' => 'Transporters', 'value' => 'Transporters', 'locale' => 'en'],
            ['key' => 'Transport', 'value' => 'Transport', 'locale' => 'en'],
            ['key' => 'LR_Number', 'value' => 'LR Number', 'locale' => 'en'],
            ['key' => 'Choose_Transport', 'value' => 'Choose Transport', 'locale' => 'en'],
            ['key' => 'Enter_LR_Number', 'value' => 'Enter LR Number', 'locale' => 'en'],
            ['key' => 'Enter_Phone', 'value' => 'Enter Phone', 'locale' => 'en'],
            ['key' => 'Enter_Address', 'value' => 'Enter Address', 'locale' => 'en'],
        ];

        foreach ($translations as $trans) {
            DB::table('translations')->updateOrInsert(
                ['key' => $trans['key'], 'locale' => $trans['locale']],
                ['value' => $trans['value']]
            );
        }
    }
}
