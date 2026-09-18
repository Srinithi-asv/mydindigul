<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Visitor extends Model
{
    use HasFactory;

    protected $table = 'visitors';

    protected $fillable = [
        'visitor_uuid',
        'user_id',
        'ip_address',
        'user_agent',
        'device_type',
        'first_visit_at',
        'last_visit_at',
    ];

    protected function casts(): array
    {
        return [
            'first_visit_at' => 'datetime',
            'last_visit_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function analytics(): HasMany
    {
        return $this->hasMany(VisitorAnalytic::class);
    }

    public function visitorAnalytics(): HasMany
    {
        return $this->analytics();
    }

    public function vendors(): HasManyThrough
    {
        return $this->hasManyThrough(
            Vendor::class,
            VisitorAnalytic::class,
            'visitor_id', // Foreign key on visitor_analytics table
            'id',         // Foreign key on vendors table
            'id',         // Local key on visitors table
            'vendor_id'   // Local key on visitor_analytics table
        )->distinct();
    }
}
