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
        Schema::create('tourism_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tourism_place_id')->constrained('tourism_places')->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum('media_type', ['image', 'video_embed'])->default('image');
            $table->string('media_url', 500);
            $table->string('caption', 255)->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestamps();

            $table->index(['tourism_place_id', 'display_order'], 'idx_tourism_media_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tourism_media');
    }
};
