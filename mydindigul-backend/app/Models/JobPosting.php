<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobPosting extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'job_postings';

    protected $fillable = [
        'vendor_id',
        'title',
        'slug',
        'job_type',
        'workplace_type',
        'location',
        'experience_min',
        'experience_max',
        'salary_min',
        'salary_max',
        'salary_type',
        'vacancies_count',
        'qualification',
        'skills_required',
        'description',
        'benefits',
        'application_deadline',
        'contact_email',
        'contact_phone',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'experience_min' => 'integer',
            'experience_max' => 'integer',
            'salary_min' => 'decimal:2',
            'salary_max' => 'decimal:2',
            'vacancies_count' => 'integer',
            'skills_required' => 'array',
            'application_deadline' => 'date',
        ];
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class, 'job_posting_id');
    }

    public function jobApplications(): HasMany
    {
        return $this->applications();
    }
}
