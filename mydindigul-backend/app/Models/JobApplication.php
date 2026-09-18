<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    use HasFactory;

    protected $table = 'job_applications';

    protected $fillable = [
        'job_posting_id',
        'vendor_id',
        'user_id',
        'applicant_name',
        'applicant_email',
        'applicant_phone',
        'current_company',
        'years_experience',
        'expected_salary',
        'resume_file_url',
        'cover_letter',
        'application_status',
        'vendor_notes',
    ];

    protected function casts(): array
    {
        return [
            'years_experience' => 'decimal:1',
            'expected_salary' => 'decimal:2',
        ];
    }

    public function jobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class);
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}