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
        Schema::create('tourism_places', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tourism_category_id')->constrained('tourism_categories')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreignId('related_to_place_id')->nullable()->constrained('tourism_places')->nullOnDelete()->cascadeOnUpdate();
            $table->string('name', 255);
            $table->string('slug', 191)->unique();
            $table->string('tagline', 255)->nullable();
            $table->longText('history_overview');
            $table->string('best_time_to_visit', 255)->nullable();
            $table->string('visiting_hours', 255)->nullable();
            $table->string('entry_fee', 255)->nullable();
            $table->text('location_address');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('cover_image_url', 500)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->unsignedBigInteger('views_count')->default(0);
            $table->enum('status', ['draft', 'published'])->default('published');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['tourism_category_id', 'status'], 'idx_tourism_places_cat_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tourism_places');
    }
};
