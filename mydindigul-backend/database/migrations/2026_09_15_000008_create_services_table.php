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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('vendors')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('sub_industry_id')->nullable()->constrained('sub_industries')->nullOnDelete()->cascadeOnUpdate();
            $table->string('title', 200);
            $table->string('slug', 191);
            $table->string('short_description', 500)->nullable();
            $table->longText('description')->nullable();
            $table->enum('pricing_type', ['fixed', 'starting_at', 'hourly', 'custom_quote'])->default('fixed');
            $table->decimal('price', 12, 2)->nullable();
            $table->decimal('discounted_price', 12, 2)->nullable();
            $table->string('duration', 50)->nullable();
            $table->string('service_area', 255)->nullable();
            $table->string('banner_image_url', 500)->nullable();
            $table->json('images')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['active', 'inactive', 'draft'])->default('active');
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['vendor_id', 'slug'], 'uniq_vendor_service_slug');
            $table->index(['vendor_id', 'status'], 'idx_services_vendor_status');
            $table->index(['sub_industry_id', 'status'], 'idx_services_sub_ind_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
