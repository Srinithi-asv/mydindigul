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
        Schema::create('event_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_reference', 50)->unique();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('vendor_id')->nullable()->constrained('vendors')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete()->cascadeOnUpdate();
            $table->string('attendee_name', 150);
            $table->string('attendee_email', 191);
            $table->string('attendee_phone', 20);
            $table->unsignedInteger('tickets_count')->default(1);
            $table->decimal('unit_price', 10, 2)->default(0.00);
            $table->decimal('total_amount', 10, 2)->default(0.00);
            $table->enum('payment_gateway', ['free', 'razorpay'])->default('free');
            $table->string('razorpay_order_id', 100)->nullable();
            $table->string('razorpay_payment_id', 100)->nullable();
            $table->enum('payment_status', ['free', 'pending', 'paid', 'failed', 'refunded'])->default('free');
            $table->enum('booking_status', ['confirmed', 'checked_in', 'cancelled'])->default('confirmed');
            $table->string('ticket_token', 100)->unique();
            $table->timestamp('checked_in_at')->nullable();
            $table->timestamps();

            $table->index('user_id', 'idx_event_bookings_user');
            $table->index('vendor_id', 'idx_event_bookings_vendor');
            $table->index(['event_id', 'booking_status'], 'idx_event_bookings_event_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_bookings');
    }
};
