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
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreignId('industry_id')->constrained('industries')->restrictOnDelete()->cascadeOnUpdate();
            $table->foreignId('sub_industry_id')->nullable()->constrained('sub_industries')->nullOnDelete()->cascadeOnUpdate();
            $table->string('business_name', 200);
            $table->string('slug', 191)->unique();
            $table->string('tagline', 255)->nullable();
            $table->longText('about_us')->nullable();
            $table->string('company_registration_no', 100)->nullable();
            $table->string('gst_number', 30)->nullable();
            $table->string('pan_number', 20)->nullable();
            $table->string('logo_url', 500)->nullable();
            $table->string('cover_url', 500)->nullable();
            $table->string('contact_person', 150)->nullable();
            $table->string('phone', 20);
            $table->string('whatsapp_number', 20)->nullable();
            $table->string('email', 191)->nullable();
            $table->string('website_url', 500)->nullable();
            $table->string('address_line1', 255);
            $table->string('address_line2', 255)->nullable();
            $table->string('city', 100)->default('Dindigul');
            $table->string('pincode', 10);
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->text('map_location_url')->nullable();
            $table->longText('terms_and_conditions')->nullable();
            $table->longText('privacy_policy')->nullable();
            $table->enum('verification_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('rejection_reason')->nullable();
            $table->enum('plan_type', ['free', 'premium'])->default('free');
            $table->enum('plan_status', ['active', 'expired', 'locked'])->default('active');
            $table->timestamp('plan_expires_at')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->decimal('avg_rating', 3, 2)->default(0.00);
            $table->unsignedInteger('review_count')->default(0);
            $table->unsignedBigInteger('view_count')->default(0);
            $table->json('social_links')->nullable();
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['industry_id', 'sub_industry_id'], 'idx_vendors_industry_sub');
            $table->index(['verification_status', 'status'], 'idx_vendors_verif_status');
            $table->index(['plan_type', 'plan_status'], 'idx_vendors_plan');
            $table->index(['latitude', 'longitude'], 'idx_vendors_geo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
