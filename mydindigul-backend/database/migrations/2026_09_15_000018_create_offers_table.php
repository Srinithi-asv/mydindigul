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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->nullable()->constrained('vendors')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('title', 255);
            $table->string('slug', 191)->unique();
            $table->string('coupon_code', 50)->nullable();
            $table->enum('discount_type', ['percentage', 'flat_amount']);
            $table->decimal('discount_value', 10, 2);
            $table->decimal('min_order_amount', 10, 2)->default(0.00);
            $table->decimal('max_discount_cap', 10, 2)->nullable();
            $table->string('banner_url', 500)->nullable();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['active', 'inactive', 'expired'])->default('active');
            $table->timestamps();
            $table->softDeletes();

            $table->index('coupon_code', 'idx_offers_coupon_code');
            $table->index(['start_date', 'end_date', 'status'], 'idx_offers_validity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
