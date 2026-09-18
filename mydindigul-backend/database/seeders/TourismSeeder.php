<?php

namespace Database\Seeders;

use App\Models\TourismCategory;
use App\Models\TourismMedia;
use App\Models\TourismPlace;
use Illuminate\Database\Seeder;

class TourismSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Tourism Categories
        $categories = [
            [
                'name' => 'Historical & Heritage Forts',
                'slug' => 'historical-heritage-forts',
                'description' => 'Ancient Nayak forts, monolithic rock citadels, and centuries-old defensive architecture.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/2830/2830289.png',
                'display_order' => 1,
                'status' => 'active',
            ],
            [
                'name' => 'Hill Stations & Scenic Escapes',
                'slug' => 'hill-stations-scenic-escapes',
                'description' => 'Serene Western Ghats heights, Sirumalai biodiversity forests, and misty pine valleys.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
                'display_order' => 2,
                'status' => 'active',
            ],
            [
                'name' => 'Ancient Temples & Pilgrimage',
                'slug' => 'ancient-temples-pilgrimage',
                'description' => 'Historic Dravidian shrines, sacred rock-cut sanctums, and spiritual retreats.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/3233/3233827.png',
                'display_order' => 3,
                'status' => 'active',
            ],
            [
                'name' => 'Waterfalls, Lakes & Eco-Dams',
                'slug' => 'waterfalls-lakes-dams',
                'description' => 'Dramatic mountain cascades, picturesque irrigation reservoirs, and boating spots.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/3138/3138531.png',
                'display_order' => 4,
                'status' => 'active',
            ],
        ];

        $catMap = [];
        foreach ($categories as $cat) {
            $model = TourismCategory::updateOrCreate(['slug' => $cat['slug']], $cat);
            $catMap[$cat['slug']] = $model->id;
        }

        // 2. Tourism Places
        $places = [
            [
                'tourism_category_id' => $catMap['historical-heritage-forts'],
                'related_to_place_id' => null,
                'name' => 'Dindigul Rock Fort (Malai Kottai)',
                'slug' => 'dindigul-rock-fort-malai-kottai',
                'tagline' => '17th-Century Monolithic Citadel of Muthu Krishna Nayak & Tipu Sultan',
                'history_overview' => 'Rising dramatically 900 feet above the plains, the Dindigul Rock Fort is a 17th-century strategic fortress constructed by the Madurai Nayak dynasty in 1605 and later fortified by Hyder Ali and Tipu Sultan during the Polygar Wars. Built on a monolithic rock shaped like a pillow ("Dindu" meaning pillow and "Kal" meaning rock, giving Dindigul its name), the fort features cannons, granaries, and the ancient Padmagiriswarar temple at its summit.',
                'best_time_to_visit' => 'October to March (Early mornings or late afternoons)',
                'visiting_hours' => '6:00 AM - 6:00 PM Daily',
                'entry_fee' => '₹25 per person (Indians), ₹300 (Foreigners)',
                'location_address' => 'Rock Fort Road, Near Kottai Mariamman Temple, Dindigul 624001',
                'latitude' => 10.36080000,
                'longitude' => 77.97010000,
                'cover_image_url' => 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=1200',
                'is_featured' => true,
                'views_count' => 6400,
                'status' => 'published',
                'media' => [
                    ['media_type' => 'image', 'media_url' => 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800', 'caption' => 'Sunset panoramic view of Dindigul Rock Fort ramparts'],
                    ['media_type' => 'image', 'media_url' => 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800', 'caption' => 'Padmagiriswarar temple carved rock steps leading to citadel'],
                ],
            ],
            [
                'tourism_category_id' => $catMap['hill-stations-scenic-escapes'],
                'related_to_place_id' => null,
                'name' => 'Sirumalai Hills & Sanjeevani Forest',
                'slug' => 'sirumalai-hills-eco-forest',
                'tagline' => 'Untouched Western Ghats Biodiversity Reserve & Hill Banana Country',
                'history_overview' => 'Located just 25 km from Dindigul city, Sirumalai is a tranquil, dense reserve forest plateau at 1,600 meters elevation. According to Ramayana folklore, Sirumalai is believed to have formed from a fallen piece of the sacred Sanjeevani hill carried by Lord Hanuman. The hill is famous for its GI-tagged "Sirumalai Hill Banana" (Malai Vazhaipazham), medicinal herbal flora, Silver Shoals view point, and pristine trekking trails.',
                'best_time_to_visit' => 'Throughout the year, especially post-monsoon (September - February)',
                'visiting_hours' => 'Open 24/7 (Forest checkpoints close at 7:00 PM)',
                'entry_fee' => 'Free entry (Eco-park ₹20)',
                'location_address' => 'Sirumalai Ghat Road (18 Hairpin Bends), Dindigul District',
                'latitude' => 10.19800000,
                'longitude' => 77.99800000,
                'cover_image_url' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
                'is_featured' => true,
                'views_count' => 4800,
                'status' => 'published',
                'media' => [
                    ['media_type' => 'image', 'media_url' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', 'caption' => 'Misty Sirumalai Ghat hairpin bend viewpoint'],
                    ['media_type' => 'image', 'media_url' => 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800', 'caption' => 'Organic hill banana plantations of Sirumalai'],
                ],
            ],
            [
                'tourism_category_id' => $catMap['waterfalls-lakes-dams'],
                'related_to_place_id' => null,
                'name' => 'Kamarajar Sagar Dam (Athoor Reservoir)',
                'slug' => 'kamarajar-sagar-dam-athoor',
                'tagline' => 'Peaceful Water Reservoir Surrounded by Verdant Western Ghats',
                'history_overview' => 'Built across the Kamarajar river in Athoor village, 25 km west of Dindigul, this picturesque water body supplies drinking water to Dindigul town. Flanked by coconut groves, cardamon estates, and the misty ridges of the Western Ghats, Athoor is a favorite haven for birdwatchers, anglers, and nature photographers.',
                'best_time_to_visit' => 'November to January (High water levels)',
                'visiting_hours' => '8:00 AM - 5:30 PM',
                'entry_fee' => '₹10 per vehicle parking',
                'location_address' => 'Athoor Village, Dindigul District 624701',
                'latitude' => 10.28300000,
                'longitude' => 77.85000000,
                'cover_image_url' => 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
                'is_featured' => false,
                'views_count' => 2900,
                'status' => 'published',
                'media' => [
                    ['media_type' => 'image', 'media_url' => 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800', 'caption' => 'Still waters of Kamarajar Sagar Dam during sunset'],
                ],
            ],
            [
                'tourism_category_id' => $catMap['waterfalls-lakes-dams'],
                'related_to_place_id' => null,
                'name' => 'Thalaiyar Falls (Rat Tail Falls)',
                'slug' => 'thalaiyar-falls-rat-tail',
                'tagline' => 'Highest Waterfall in Tamil Nadu with a 975-Foot Plunge',
                'history_overview' => 'Plunging 297 meters (975 ft), Thalaiyar Falls is the 6th highest waterfall in India and the highest in Tamil Nadu. Nestled in the Palani Hills of Dindigul district, its slender white silhouette resembles a rat\'s tail visible from the Ghat road between Dindigul and Kodaikanal. The trek to its base passes through lush mango orchards and potato terraces.',
                'best_time_to_visit' => 'July to October (Monsoon flow)',
                'visiting_hours' => 'Daylight hours only (Trekking requires forest permission)',
                'entry_fee' => 'Free viewpoint, trek permits via Forest Dept',
                'location_address' => 'Palani Hills Range, Dindigul District',
                'latitude' => 10.23700000,
                'longitude' => 77.58700000,
                'cover_image_url' => 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200',
                'is_featured' => true,
                'views_count' => 5100,
                'status' => 'published',
                'media' => [
                    ['media_type' => 'image', 'media_url' => 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800', 'caption' => 'Dramatic 975-foot drop of Thalaiyar Falls seen from Dum Dum Rock'],
                ],
            ],
            [
                'tourism_category_id' => $catMap['ancient-temples-pilgrimage'],
                'related_to_place_id' => null,
                'name' => 'Sri Abirami Amman Temple (Kottai Kovil)',
                'slug' => 'sri-abirami-amman-temple-dindigul',
                'tagline' => 'Century-Old Chola & Nayak Sacred Mother Goddess Shrine',
                'history_overview' => 'Situated at the southern base of Dindigul Rock Fort, the Sri Abirami Amman Temple features imposing Rajagopurams, detailed stone pillars, and golden vimanams. Dedicated to Goddess Abirami and Lord Sundareswarar, it serves as the spiritual epicenter for Dindigul city festivities during Navaratri and Chithirai.',
                'best_time_to_visit' => 'All year round (Special pujas on Fridays & Navaratri)',
                'visiting_hours' => '6:00 AM - 12:00 PM, 4:30 PM - 8:30 PM',
                'entry_fee' => 'Free Darshan',
                'location_address' => 'Kottai Temple Street, South of Rock Fort, Dindigul 624001',
                'latitude' => 10.35800000,
                'longitude' => 77.96900000,
                'cover_image_url' => 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200',
                'is_featured' => false,
                'views_count' => 3400,
                'status' => 'published',
                'media' => [
                    ['media_type' => 'image', 'media_url' => 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800', 'caption' => 'Illuminated gopuram of Sri Abirami Amman Temple during festival'],
                ],
            ],
        ];

        foreach ($places as $pData) {
            $mediaList = $pData['media'];
            unset($pData['media']);

            $place = TourismPlace::updateOrCreate(['slug' => $pData['slug']], $pData);

            $order = 1;
            foreach ($mediaList as $m) {
                TourismMedia::updateOrCreate(
                    [
                        'tourism_place_id' => $place->id,
                        'media_url' => $m['media_url'],
                    ],
                    [
                        'media_type' => $m['media_type'],
                        'caption' => $m['caption'],
                        'display_order' => $order++,
                    ]
                );
            }
        }
    }
}
