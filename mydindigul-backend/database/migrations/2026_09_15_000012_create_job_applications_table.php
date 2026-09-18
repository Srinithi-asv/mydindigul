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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_posting_id')->constrained('job_postings')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('vendor_id')->constrained('vendors')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete()->cascadeOnUpdate();
            $table->string('applicant_name', 150);
            $table->string('applicant_email', 191);
            $table->string('applicant_phone', 20);
            $table->string('current_company', 200)->nullable();
            $table->decimal('years_experience', 4, 1)->default(0.0);
            $table->decimal('expected_salary', 10, 2)->nullable();
            $table->string('resume_file_url', 500);
            $table->text('cover_letter')->nullable();
            $table->enum('application_status', ['applied', 'reviewed', 'shortlisted', 'interview_scheduled', 'rejected', 'hired'])->default('applied');
            $table->text('vendor_notes')->nullable();
            $table->timestamps();

            $table->index(['job_posting_id', 'application_status'], 'idx_job_apps_job_status');
            $table->index(['vendor_id', 'application_status'], 'idx_job_apps_vendor_status');
            $table->index('user_id', 'idx_job_apps_user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
