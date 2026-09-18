<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VendorCustomer extends Model
{
    use HasFactory;

    protected $table = 'vendor_customers';

    protected $fillable = [
        'vendor_id',
        'user_id',
        'full_name',
        'phone',
        'email',
        'city',
        'total_orders_count',
        'total_spend_amount',
        'tags',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'total_orders_count' => 'integer',
            'total_spend_amount' => 'decimal:2',
            'tags' => 'array',
        ];
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