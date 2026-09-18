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
        Schema::create('vendor_customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('vendors')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete()->cascadeOnUpdate();
            $table->string('full_name', 150);
            $table->string('phone', 20);
            $table->string('email', 191)->nullable();
            $table->string('city', 100)->default('Dindigul');
            $table->unsignedInteger('total_orders_count')->default(0);
            $table->decimal('total_spend_amount', 12, 2)->default(0.00);
            $table->json('tags')->nullable();
            $table->enum('status', ['active', 'blocked'])->default('active');
            $table->timestamps();

            $table->index(['vendor_id', 'phone'], 'idx_vendor_customers_phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendor_customers');
    }
};
