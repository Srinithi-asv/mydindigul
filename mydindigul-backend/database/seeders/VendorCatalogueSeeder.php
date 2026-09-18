<?php

namespace Database\Seeders;

use App\Models\Vendor;
use App\Models\VendorCatalogue;
use Illuminate\Database\Seeder;

class VendorCatalogueSeeder extends Seeder
{
    public function run(): void
    {
        $lockWorks = Vendor::where('slug', 'dindigul-premier-lock-works')->first();
        $thalappakatti = Vendor::where('slug', 'thalappakatti-biryani')->first();
        $textiles = Vendor::where('slug', 'sri-meenakshi-textiles')->first();

        $catalogues = [
            [
                'vendor_id' => $lockWorks?->id,
                'title' => 'Dindigul Heritage Security Locks Product Catalogue 2026',
                'description' => 'Official illustrated PDF catalogue of GI-tagged brass, iron, and bell metal security padlocks with technical dimensions and key specs.',
                'pdf_file_url' => 'https://mydindigul.test/catalogues/dindigul-lock-works-2026.pdf',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400',
                'file_size_kb' => 3450,
                'download_count' => 142,
                'display_order' => 1,
                'status' => 'active',
            ],
            [
                'vendor_id' => $thalappakatti?->id,
                'title' => 'Thalappakatti Grand Wedding & Party Catering Menu Guide',
                'description' => 'Complete outdoor banquet catering packages, starters, biryani varieties, and traditional South Indian dessert menus.',
                'pdf_file_url' => 'https://mydindigul.test/catalogues/thalappakatti-catering-menu.pdf',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
                'file_size_kb' => 2800,
                'download_count' => 310,
                'display_order' => 1,
                'status' => 'active',
            ],
            [
                'vendor_id' => $textiles?->id,
                'title' => 'Sri Meenakshi Wedding Silk & Festive Saree Lookbook',
                'description' => 'High-resolution bridal silk sarees, pattu veshti, and wedding trousseau designs for the upcoming festival season.',
                'pdf_file_url' => 'https://mydindigul.test/catalogues/meenakshi-wedding-silk-lookbook.pdf',
                'thumbnail_url' => 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
                'file_size_kb' => 5200,
                'download_count' => 88,
                'display_order' => 1,
                'status' => 'active',
            ],
        ];

        foreach ($catalogues as $cat) {
            if (! $cat['vendor_id']) {
                continue;
            }

            VendorCatalogue::updateOrCreate(
                [
                    'vendor_id' => $cat['vendor_id'],
                    'title' => $cat['title'],
                ],
                $cat
            );
        }
    }
}
