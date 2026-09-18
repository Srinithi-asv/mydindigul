<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventBooking extends Model
{
    use HasFactory;

    protected $table = 'event_bookings';

    protected $fillable = [
        'booking_reference',
        'event_id',
        'vendor_id',
        'user_id',
        'attendee_name',
        'attendee_email',
        'attendee_phone',
        'tickets_count',
        'unit_price',
        'total_amount',
        'payment_gateway',
        'razorpay_order_id',
        'razorpay_payment_id',
        'payment_status',
        'booking_status',
        'ticket_token',
        'checked_in_at',
    ];

    protected function casts(): array
    {
        return [
            'tickets_count' => 'integer',
            'unit_price' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'checked_in_at' => 'datetime',
        ];
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
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