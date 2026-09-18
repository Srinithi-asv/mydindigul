<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TourismMedia extends Model
{
    use HasFactory;

    protected $table = 'tourism_media';

    protected $fillable = [
        'tourism_place_id',
        'media_type',
        'media_url',
        'caption',
        'display_order',
    ];

    protected function casts(): array
    {
        return [
            'display_order' => 'integer',
        ];
    }

    public function tourismPlace(): BelongsTo
    {
        return $this->belongsTo(TourismPlace::class, 'tourism_place_id');
    }

    public function place(): BelongsTo
    {
        return $this->tourismPlace();
    }

    public function tourism(): BelongsTo
    {
        return $this->tourismPlace();
    }
}
