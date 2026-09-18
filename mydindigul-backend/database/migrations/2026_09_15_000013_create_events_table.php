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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->nullable()->constrained('vendors')->nullOnDelete()->cascadeOnUpdate();
            $table->string('title', 255);
            $table->string('slug', 191)->unique();
            $table->string('category', 100);
            $table->string('short_description', 500)->nullable();
            $table->longText('description');
            $table->string('venue_name', 200);
            $table->text('venue_address');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');
            $table->enum('ticket_type', ['free', 'paid'])->default('free');
            $table->decimal('ticket_price', 10, 2)->default(0.00);
            $table->unsignedInteger('total_seats')->nullable();
            $table->unsignedInteger('available_seats')->nullable();
            $table->string('banner_url', 500)->nullable();
            $table->json('gallery_urls')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['draft', 'published', 'cancelled', 'completed'])->default('published');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['vendor_id', 'status'], 'idx_events_vendor_status');
            $table->index(['start_datetime', 'end_datetime'], 'idx_events_dates');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
