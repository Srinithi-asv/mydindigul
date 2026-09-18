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
        Schema::create('sub_industries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('industry_id')->constrained('industries')->restrictOnDelete()->cascadeOnUpdate();
            $table->string('name', 150);
            $table->string('slug', 191)->unique();
            $table->text('description')->nullable();
            $table->string('icon_url', 500)->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['industry_id', 'status'], 'idx_sub_industries_ind_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_industries');
    }
};
