<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFlowTypeToTransferDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('transfer_details', function (Blueprint $table) {
            $table->string('flow_type')->default('standard')->after('quantity'); // standard, input, output
            $table->string('production_status')->default('completed')->after('flow_type'); // in-process, completed, scrapped
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transfer_details', function (Blueprint $table) {
            $table->dropColumn('flow_type');
            $table->dropColumn('production_status');
        });
    }
}
