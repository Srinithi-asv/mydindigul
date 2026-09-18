<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class TourismPlace extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tourism_places';

    protected $fillable = [
        'tourism_category_id',
        'related_to_place_id',
        'name',
        'slug',
        'tagline',
        'history_overview',
        'best_time_to_visit',
        'visiting_hours',
        'entry_fee',
        'location_address',
        'latitude',
        'longitude',
        'cover_image_url',
        'is_featured',
        'views_count',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'is_featured' => 'boolean',
            'views_count' => 'integer',
        ];
    }

    public function tourismCategory(): BelongsTo
    {
        return $this->belongsTo(TourismCategory::class, 'tourism_category_id');
    }

    public function category(): BelongsTo
    {
        return $this->tourismCategory();
    }

    public function tourismMedia(): HasMany
    {
        return $this->hasMany(TourismMedia::class, 'tourism_place_id');
    }

    public function media(): HasMany
    {
        return $this->tourismMedia();
    }

    public function parentPlace(): BelongsTo
    {
        return $this->belongsTo(self::class, 'related_to_place_id');
    }

    public function relatedPlaces(): HasMany
    {
        return $this->hasMany(self::class, 'related_to_place_id');
    }
}
