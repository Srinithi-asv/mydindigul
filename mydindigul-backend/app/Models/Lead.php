<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    use HasFactory;

    protected $table = 'leads';

    protected $fillable = [
        'vendor_id',
        'enquiry_id',
        'customer_id',
        'lead_source',
        'customer_name',
        'customer_phone',
        'masked_phone',
        'is_phone_masked',
        'customer_email',
        'requirement_details',
        'estimated_value',
        'lead_status',
        'lost_reason',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'is_phone_masked' => 'boolean',
            'estimated_value' => 'decimal:2',
        ];
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function enquiry(): BelongsTo
    {
        return $this->belongsTo(Enquiry::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(VendorCustomer::class, 'customer_id');
    }
}
