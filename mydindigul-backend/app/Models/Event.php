<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'events';

    protected $fillable = [
        'vendor_id',
        'title',
        'slug',
        'category',
        'short_description',
        'description',
        'venue_name',
        'venue_address',
        'latitude',
        'longitude',
        'start_datetime',
        'end_datetime',
        'ticket_type',
        'ticket_price',
        'total_seats',
        'available_seats',
        'banner_url',
        'gallery_urls',
        'is_featured',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'start_datetime' => 'datetime',
            'end_datetime' => 'datetime',
            'ticket_price' => 'decimal:2',
            'total_seats' => 'integer',
            'available_seats' => 'integer',
            'gallery_urls' => 'array',
            'is_featured' => 'boolean',
        ];
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(EventBooking::class);
    }
}