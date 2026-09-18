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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('vendors')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('enquiry_id')->nullable()->constrained('enquiries')->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('customer_id')->nullable()->constrained('vendor_customers')->nullOnDelete()->cascadeOnUpdate();
            $table->enum('lead_source', ['enquiry', 'click_to_call', 'whatsapp_click', 'catalogue_download', 'direct'])->default('enquiry');
            $table->string('customer_name', 150);
            $table->string('customer_phone', 20);
            $table->string('masked_phone', 20);
            $table->boolean('is_phone_masked')->default(true);
            $table->string('customer_email', 191)->nullable();
            $table->text('requirement_details')->nullable();
            $table->decimal('estimated_value', 12, 2)->nullable();
            $table->enum('lead_status', ['new', 'contacted', 'in_progress', 'converted', 'lost'])->default('new');
            $table->string('lost_reason', 255)->nullable();
            $table->longText('notes')->nullable();
            $table->timestamps();

            $table->index(['vendor_id', 'lead_status'], 'idx_leads_vendor_status');
            $table->index(['vendor_id', 'is_phone_masked'], 'idx_leads_vendor_masked');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
