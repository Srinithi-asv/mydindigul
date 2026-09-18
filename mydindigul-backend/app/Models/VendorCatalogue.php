<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VendorCatalogue extends Model
{
    use HasFactory;

    protected $table = 'vendor_catalogues';

    protected $fillable = [
        'vendor_id',
        'title',
        'description',
        'pdf_file_url',
        'thumbnail_url',
        'file_size_kb',
        'download_count',
        'display_order',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'file_size_kb' => 'integer',
            'download_count' => 'integer',
            'display_order' => 'integer',
        ];
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }
}
