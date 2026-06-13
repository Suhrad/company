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
        // 1. Job Work Orders (Issues of Raw Material)
        Schema::create('job_work_orders', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('Ref');
            $table->date('date');
            $table->integer('user_id')->index('user_id_job_work');
            $table->integer('from_warehouse_id')->index('from_warehouse_id_job_work');
            $table->integer('worker_warehouse_id')->index('worker_warehouse_id_job_work');
            $table->string('statut'); // ordered, completed, partial
            $table->text('notes')->nullable();
            $table->timestamps(6);
            $table->softDeletes();
        });

        // 2. Job Work Order Details (Raw Materials Issued)
        Schema::create('job_work_order_details', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->integer('job_work_order_id')->index('job_work_order_id_detail');
            $table->integer('product_id')->index('product_id_job_work_detail');
            $table->integer('product_variant_id')->nullable()->index('variant_id_job_work_detail');
            $table->double('quantity');
            $table->double('quantity_consumed')->default(0);
            $table->double('quantity_returned')->default(0);
            $table->timestamps(6);
        });

        // 3. Job Work Receipts (Goods Received from Worker)
        Schema::create('job_work_receipts', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->integer('job_work_order_id')->index('job_work_order_id_receipt');
            $table->string('Ref');
            $table->date('date');
            $table->integer('user_id')->index('user_id_job_receipt');
            $table->integer('to_warehouse_id')->index('to_warehouse_id_receipt');
            $table->text('notes')->nullable();
            $table->timestamps(6);
            $table->softDeletes();
        });

        // 4. Job Work Receipt Details (Finished Goods Received)
        Schema::create('job_work_receipt_details', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->integer('job_work_receipt_id')->index('receipt_id_detail');
            $table->integer('product_id')->index('product_id_receipt_detail');
            $table->integer('product_variant_id')->nullable()->index('variant_id_receipt_detail');
            $table->double('quantity'); // Yield
            $table->double('wastage')->default(0); // Wastage
            $table->timestamps(6);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_work_receipt_details');
        Schema::dropIfExists('job_work_receipts');
        Schema::dropIfExists('job_work_order_details');
        Schema::dropIfExists('job_work_orders');
    }
};
