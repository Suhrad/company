<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('providers', function (Blueprint $table) {
            $table->string('gstin')->nullable()->after('tax_number');
            $table->string('pan')->nullable()->after('gstin');
            $table->string('address_line_1')->nullable()->after('adresse');
            $table->string('address_line_2')->nullable()->after('address_line_1');
            $table->string('address_line_3')->nullable()->after('address_line_2');
            $table->string('state')->nullable()->after('city');
            $table->string('source_system')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('providers', function (Blueprint $table) {
            $table->dropColumn(['gstin', 'pan', 'address_line_1', 'address_line_2', 'address_line_3', 'state', 'source_system']);
        });
    }
};
