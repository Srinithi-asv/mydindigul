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
        Schema::create('visitor_analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('visitor_id')->constrained('visitors')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('vendor_id')->nullable()->constrained('vendors')->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum('entity_type', ['vendor', 'service', 'product', 'job', 'event', 'tourism'])->nullable();
            $table->unsignedBigInteger('entity_id')->nullable();
            $table->enum('event_type', [
                'vendor_profile_view',
                'service_view',
                'product_view',
                'click_to_call',
                'whatsapp_click',
                'catalogue_download',
                'directions_click',
                'search'
            ]);
            $table->string('page_url', 500);
            $table->string('search_query', 255)->nullable();
            $table->json('metadata')->nullable();
            $table->timestamp('created_at')->nullable();

            $table->index(['vendor_id', 'event_type', 'created_at'], 'idx_analytics_vendor_event');
            $table->index(['entity_type', 'entity_id'], 'idx_analytics_entity');
            $table->index('visitor_id', 'idx_analytics_visitor');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitor_analytics');
    }
};
