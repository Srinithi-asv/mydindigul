<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VisitorAnalytic extends Model
{
    use HasFactory;

    protected $table = 'visitor_analytics';

    public const UPDATED_AT = null;

    protected $fillable = [
        'visitor_id',
        'vendor_id',
        'entity_type',
        'entity_id',
        'event_type',
        'page_url',
        'search_query',
        'metadata',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'created_at' => 'datetime',
        ];
    }

    public function visitor(): BelongsTo
    {
        return $this->belongsTo(Visitor::class);
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    /**
     * Polymorphic target entity accessor for the activity.
     */
    public function getTargetAttribute(): ?Model
    {
        if (! $this->entity_type || ! $this->entity_id) {
            return null;
        }

        return match ($this->entity_type) {
            'vendor' => Vendor::find($this->entity_id),
            'service' => Service::find($this->entity_id),
            'product' => Product::find($this->entity_id),
            'job' => JobPosting::find($this->entity_id),
            'event' => Event::find($this->entity_id),
            'tourism' => TourismPlace::find($this->entity_id),
            default => null,
        };
    }
}
