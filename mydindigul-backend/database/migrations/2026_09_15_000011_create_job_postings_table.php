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
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('vendors')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('title', 200);
            $table->string('slug', 191)->unique();
            $table->enum('job_type', ['full_time', 'part_time', 'contract', 'internship'])->default('full_time');
            $table->enum('workplace_type', ['on_site', 'hybrid', 'remote'])->default('on_site');
            $table->string('location', 255)->default('Dindigul');
            $table->unsignedTinyInteger('experience_min')->default(0);
            $table->unsignedTinyInteger('experience_max')->nullable();
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();
            $table->enum('salary_type', ['per_month', 'per_annum', 'negotiable', 'confidential'])->default('per_month');
            $table->unsignedInteger('vacancies_count')->default(1);
            $table->string('qualification', 255)->nullable();
            $table->json('skills_required')->nullable();
            $table->longText('description');
            $table->text('benefits')->nullable();
            $table->date('application_deadline')->nullable();
            $table->string('contact_email', 191)->nullable();
            $table->string('contact_phone', 20)->nullable();
            $table->enum('status', ['active', 'expired', 'closed', 'draft'])->default('active');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['vendor_id', 'status'], 'idx_job_postings_vendor_status');
            $table->index(['job_type', 'location'], 'idx_job_postings_type_loc');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};
