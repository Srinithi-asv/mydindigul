<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VendorSubscription extends Model
{
    use HasFactory;

    protected $table = 'vendor_subscriptions';

    protected $fillable = [
        'vendor_id',
        'plan_type',
        'billing_cycle',
        'amount_paid',
        'payment_gateway',
        'razorpay_order_id',
        'razorpay_payment_id',
        'starts_at',
        'ends_at',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'amount_paid' => 'decimal:2',
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
        ];
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active' &&
               (is_null($this->ends_at) || $this->ends_at->isFuture());
    }

    public function isPremium(): bool
    {
        return $this->plan_type === 'premium';
    }
}
