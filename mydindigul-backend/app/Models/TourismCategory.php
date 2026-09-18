<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TourismCategory extends Model
{
    use HasFactory;

    protected $table = 'tourism_categories';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon_url',
        'display_order',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'display_order' => 'integer',
        ];
    }

    public function tourismPlaces(): HasMany
    {
        return $this->hasMany(TourismPlace::class, 'tourism_category_id');
    }

    public function places(): HasMany
    {
        return $this->tourismPlaces();
    }
}
