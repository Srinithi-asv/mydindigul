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
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('vendors')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('service_id')->nullable()->constrained('services')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete()->cascadeOnUpdate();
            $table->string('name', 150);
            $table->string('phone', 20);
            $table->string('email', 191)->nullable();
            $table->string('subject', 255)->nullable();
            $table->text('message');
            $table->enum('preferred_contact_method', ['call', 'whatsapp', 'email'])->default('call');
            $table->enum('status', ['pending', 'viewed', 'converted_to_lead', 'closed'])->default('pending');
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();

            $table->index(['vendor_id', 'status'], 'idx_enquiries_vendor_status');
            $table->index('user_id', 'idx_enquiries_user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }
};
