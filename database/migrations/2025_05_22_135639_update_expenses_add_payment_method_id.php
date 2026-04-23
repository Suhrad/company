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
        Schema::table('expenses', function (Blueprint $table) {
            $table->integer('payment_method_id')->nullable()->after('amount');

            $table->foreign('payment_method_id')
                  ->references('id')
                  ->on('payment_methods');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->dropForeign(['expenses_payment_method_id_idx']);
            $table->dropColumn('payment_method_id');
        });
    }
};
