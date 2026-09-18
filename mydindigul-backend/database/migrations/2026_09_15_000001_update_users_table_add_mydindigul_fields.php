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
        Schema::table('users', function (Blueprint $table) {
            $table->string('email')->nullable()->change();
            $table->string('phone', 20)->nullable()->unique()->after('email');
            $table->enum('role', ['admin', 'vendor', 'customer'])->default('customer')->after('password');
            $table->string('google_id', 100)->nullable()->unique()->after('role');
            $table->timestamp('phone_verified_at')->nullable()->after('email_verified_at');
            $table->string('avatar_url', 500)->nullable()->after('google_id');
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active')->after('avatar_url');
            $table->softDeletes()->after('updated_at');

            $table->index(['role', 'status'], 'idx_users_role_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex('idx_users_role_status');
            $table->dropColumn([
                'phone',
                'role',
                'google_id',
                'phone_verified_at',
                'avatar_url',
                'status',
                'deleted_at',
            ]);
            $table->string('email')->nullable(false)->change();
        });
    }
};
