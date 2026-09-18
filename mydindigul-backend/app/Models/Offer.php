<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offer extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'offers';

    protected $fillable = [
        'vendor_id',
        'title',
        'slug',
        'coupon_code',
        'discount_type',
        'discount_value',
        'min_order_amount',
        'max_discount_cap',
        'banner_url',
        'start_date',
        'end_date',
        'is_featured',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'discount_value' => 'decimal:2',
            'min_order_amount' => 'decimal:2',
            'max_discount_cap' => 'decimal:2',
            'start_date' => 'datetime',
            'end_date' => 'datetime',
            'is_featured' => 'boolean',
        ];
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }
}