<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTransferMoneyTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('transfer_money', function(Blueprint $table)
		{
			$table->foreign('from_account_id', 'from_account_id')->references('id')->on('accounts')->onUpdate('RESTRICT')->onDelete('RESTRICT');
			$table->foreign('to_account_id', 'to_account_id')->references('id')->on('accounts')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('transfer_money', function(Blueprint $table)
		{
			$table->dropForeign('transfer_money_from_account_id_idx');
			$table->dropForeign('transfer_money_to_account_id_idx');
		});
	}

}
