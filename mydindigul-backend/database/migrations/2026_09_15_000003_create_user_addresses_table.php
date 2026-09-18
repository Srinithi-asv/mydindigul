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
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum('address_type', ['home', 'work', 'billing', 'shipping'])->default('home');
            $table->boolean('is_default')->default(false);
            $table->string('recipient_name', 150);
            $table->string('recipient_phone', 20);
            $table->string('address_line1', 255);
            $table->string('address_line2', 255)->nullable();
            $table->string('landmark', 150)->nullable();
            $table->string('city', 100)->default('Dindigul');
            $table->string('state', 100)->default('Tamil Nadu');
            $table->string('pincode', 10);
            $table->timestamps();

            $table->index(['user_id', 'is_default'], 'idx_user_addresses_default');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_addresses');
    }
};
