<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $thalappakatti = Vendor::where('slug', 'thalappakatti-biryani')->first();
        $lockWorks = Vendor::where('slug', 'dindigul-premier-lock-works')->first();
        $textiles = Vendor::where('slug', 'sri-meenakshi-textiles')->first();

        $products = [
            // Thalappakatti Products
            [
                'vendor_id' => $thalappakatti?->id,
                'sub_industry_id' => $thalappakatti?->sub_industry_id,
                'name' => 'Dindigul Special Mutton Biryani (Seeraga Samba)',
                'slug' => 'dindigul-special-mutton-biryani',
                'sku' => 'THALA-MB-001',
                'short_description' => 'Original aromatic Seeraga Samba short-grain rice mutton dum biryani with succulent meat pieces.',
                'description' => 'Prepared strictly with grass-fed tender goat meat from Kannivadi, stone-ground ginger-garlic paste, curd, pure country ghee, and secret 17-spice masala. Served with brinjal dalcha and onion pachadi.',
                'regular_price' => 360.00,
                'sale_price' => 330.00,
                'unit' => 'pack',
                'stock_status' => 'in_stock',
                'stock_quantity' => 250,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500',
                'gallery_urls' => [
                    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500',
                ],
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'vendor_id' => $thalappakatti?->id,
                'sub_industry_id' => $thalappakatti?->sub_industry_id,
                'name' => 'Dindigul Country Chicken (Nattu Kozhi) Biryani',
                'slug' => 'dindigul-nattu-kozhi-biryani',
                'sku' => 'THALA-CB-002',
                'short_description' => 'Free-range country chicken cooked to perfection in aromatic Seeraga Samba rice dum.',
                'description' => 'Naturally flavorful country chicken simmered slowly with spices and seeraga samba rice. Low cholesterol and rich in natural nutrients.',
                'regular_price' => 310.00,
                'sale_price' => 285.00,
                'unit' => 'pack',
                'stock_status' => 'in_stock',
                'stock_quantity' => 180,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500',
                'gallery_urls' => [],
                'is_featured' => false,
                'status' => 'active',
            ],

            // Dindigul Premier Lock Works Products
            [
                'vendor_id' => $lockWorks?->id,
                'sub_industry_id' => $lockWorks?->sub_industry_id,
                'name' => 'Authentic Dindigul 7-Lever Handcrafted Brass Padlock',
                'slug' => 'dindigul-7-lever-brass-padlock',
                'sku' => 'DGL-LOCK-BR7',
                'short_description' => 'Heavy brass body 7-lever security lock with unpickable hand-filed keys (GI Tag Certified).',
                'description' => 'The world-famous Dindigul security padlock forged from solid brass ingot with 7 hand-tuned steel levers. Rust-proof, tamper-proof, and designed to withstand over 50 years of heavy outdoor use. Includes 3 unique keys.',
                'regular_price' => 1850.00,
                'sale_price' => 1650.00,
                'unit' => 'piece',
                'stock_status' => 'in_stock',
                'stock_quantity' => 75,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500',
                'gallery_urls' => [
                    'https://images.unsplash.com/photo-1510519138171-c70d7634f02c?w=500',
                ],
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'vendor_id' => $lockWorks?->id,
                'sub_industry_id' => $lockWorks?->sub_industry_id,
                'name' => 'Heavy Duty Bell-Metal Mango Lock (Maanga Poottu)',
                'slug' => 'bell-metal-mango-lock',
                'sku' => 'DGL-LOCK-MNG',
                'short_description' => 'Traditional mango-shaped temple & granary lock forged from copper-tin bell metal alloy.',
                'description' => 'A heritage design featuring a concealed keyhole and double-locking shackle. Historically used for temple jewelry vaults and storehouse granaries in Tamil Nadu.',
                'regular_price' => 3200.00,
                'sale_price' => 2950.00,
                'unit' => 'piece',
                'stock_status' => 'in_stock',
                'stock_quantity' => 30,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1510519138171-c70d7634f02c?w=500',
                'gallery_urls' => [],
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'vendor_id' => $lockWorks?->id,
                'sub_industry_id' => $lockWorks?->sub_industry_id,
                'name' => 'Dindigul Antique Finish Main Door Mortise Handle Lock',
                'slug' => 'antique-door-mortise-lock',
                'sku' => 'DGL-LOCK-MOR9',
                'short_description' => 'Carved brass ornamental handle lock set with European Euro-cylinder mechanism.',
                'description' => 'Luxurious main door entrance lock suitable for teakwood double doors. Combines heritage Dindigul brass artistry with modern computerized key security.',
                'regular_price' => 4500.00,
                'sale_price' => 3999.00,
                'unit' => 'set',
                'stock_status' => 'in_stock',
                'stock_quantity' => 40,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500',
                'gallery_urls' => [],
                'is_featured' => false,
                'status' => 'active',
            ],

            // Sri Meenakshi Textiles Products
            [
                'vendor_id' => $textiles?->id,
                'sub_industry_id' => $textiles?->sub_industry_id,
                'name' => 'Pure Kanchipuram Silk Bridal Saree (Crimson Red & Gold Zari)',
                'slug' => 'kanchipuram-silk-bridal-saree-red',
                'sku' => 'SMT-SAREE-KPM01',
                'short_description' => 'Handwoven bridal silk saree with authentic pure gold zari peacock and temple border motifs.',
                'description' => 'Exquisite handloom creation certified with Silk Mark. Handcrafted by master weavers taking over 18 days. Comes with contrast heavy brocade blouse piece in rich festive packaging.',
                'regular_price' => 18999.00,
                'sale_price' => 16499.00,
                'unit' => 'piece',
                'stock_status' => 'in_stock',
                'stock_quantity' => 15,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
                'gallery_urls' => [
                    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500',
                ],
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'vendor_id' => $textiles?->id,
                'sub_industry_id' => $textiles?->sub_industry_id,
                'name' => 'Dindigul Handloom Pure Cotton Saree (Madurai Sungudi Style)',
                'slug' => 'dindigul-handloom-cotton-saree',
                'sku' => 'SMT-SAREE-COT08',
                'short_description' => 'Breathable 80s count fine combed cotton saree with zari border for daily elegant wear.',
                'description' => 'Ideal for Tamil Nadu summers. Made from 100% natural cotton yarn spun in local Dindigul mills. Color fast and shrink resistant.',
                'regular_price' => 1450.00,
                'sale_price' => 1199.00,
                'unit' => 'piece',
                'stock_status' => 'in_stock',
                'stock_quantity' => 60,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500',
                'gallery_urls' => [],
                'is_featured' => false,
                'status' => 'active',
            ],
            [
                'vendor_id' => $textiles?->id,
                'sub_industry_id' => $textiles?->sub_industry_id,
                'name' => 'Men\'s Pure Cotton Wedding Pattu Veshti & Shirt Combo Set',
                'slug' => 'mens-cotton-pattu-veshti-shirt-combo',
                'sku' => 'SMT-MEN-VESH04',
                'short_description' => '8-mulam cotton dhoti with 2-inch rich gold zari border paired with matching full sleeve shirt.',
                'description' => 'Traditional wedding and pooja attire for men. Includes Angavastram (shawl), double dhoti, and tailored formal cotton shirt.',
                'regular_price' => 2200.00,
                'sale_price' => 1899.00,
                'unit' => 'set',
                'stock_status' => 'in_stock',
                'stock_quantity' => 45,
                'thumbnail_url' => 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
                'gallery_urls' => [],
                'is_featured' => false,
                'status' => 'active',
            ],
        ];

        foreach ($products as $pData) {
            if (! $pData['vendor_id']) {
                continue;
            }

            Product::updateOrCreate(
                [
                    'vendor_id' => $pData['vendor_id'],
                    'slug' => $pData['slug'],
                ],
                $pData
            );
        }
    }
}
