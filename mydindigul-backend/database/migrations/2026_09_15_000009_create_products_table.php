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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('vendors')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('sub_industry_id')->nullable()->constrained('sub_industries')->nullOnDelete()->cascadeOnUpdate();
            $table->string('name', 255);
            $table->string('slug', 191);
            $table->string('sku', 100)->nullable();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->decimal('regular_price', 12, 2);
            $table->decimal('sale_price', 12, 2)->nullable();
            $table->string('unit', 50)->default('piece');
            $table->enum('stock_status', ['in_stock', 'out_of_stock'])->default('in_stock');
            $table->integer('stock_quantity')->default(0);
            $table->string('thumbnail_url', 500)->nullable();
            $table->json('gallery_urls')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['active', 'inactive', 'draft'])->default('active');
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['vendor_id', 'slug'], 'uniq_vendor_product_slug');
            $table->index(['vendor_id', 'status'], 'idx_products_vendor_status');
            $table->index(['sub_industry_id', 'status'], 'idx_products_sub_ind_status');
            $table->index(['sale_price', 'regular_price'], 'idx_products_prices');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
