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
        Schema::create('wishlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('wishlistable_type', 150);
            $table->unsignedBigInteger('wishlistable_id');
            $table->timestamps();

            $table->unique(['user_id', 'wishlistable_type', 'wishlistable_id'], 'uniq_user_wishlistable');
            $table->index(['wishlistable_type', 'wishlistable_id'], 'idx_wishlistable');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wishlists');
    }
};
