<?php

namespace Database\Seeders;

use App\Models\Industry;
use App\Models\SubIndustry;
use Illuminate\Database\Seeder;

class IndustrySeeder extends Seeder
{
    public function run(): void
    {
        $industries = [
            [
                'name' => 'Food & Restaurants',
                'slug' => 'food-restaurants',
                'description' => 'World-famous Dindigul biryani, traditional South Indian dining, modern cafes, and bakeries.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
                'banner_url' => 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200',
                'display_order' => 1,
                'sub_industries' => [
                    ['name' => 'Dindigul Biryani & Non-Veg Restaurants', 'slug' => 'dindigul-biryani-non-veg', 'description' => 'Authentic Seeraga Samba mutton & chicken biryani restaurants.'],
                    ['name' => 'Traditional South Indian Vegetarian', 'slug' => 'south-indian-vegetarian', 'description' => 'Pure vegetarian meals, tiffin, filter coffee, and thalis.'],
                    ['name' => 'Cafes, Bakeries & Tea Stalls', 'slug' => 'cafes-bakeries-tea', 'description' => 'Cakes, pastries, hot snacks, and traditional tea stalls.'],
                    ['name' => 'Sweets & Savouries', 'slug' => 'sweets-savouries', 'description' => 'Halwa, laddu, mixture, murukku, and traditional Dindigul sweets.'],
                ],
            ],
            [
                'name' => 'Manufacturing & Industrial',
                'slug' => 'manufacturing-industrial',
                'description' => 'Renowned handcrafted brass/iron locks, leather tanneries, iron safes, and textile mills.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
                'banner_url' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200',
                'display_order' => 2,
                'sub_industries' => [
                    ['name' => 'Brass & Iron Lock Manufacturers', 'slug' => 'brass-iron-lock-manufacturers', 'description' => 'Famous GI-tagged handcrafted security locks of Dindigul.'],
                    ['name' => 'Leather Tanneries & Products', 'slug' => 'leather-tanneries-goods', 'description' => 'Finished leather, shoes, belts, wallets, and industrial leather.'],
                    ['name' => 'Textile Spinning & Ginning Mills', 'slug' => 'textile-spinning-ginning', 'description' => 'Cotton yarn processing, power looms, and textile processing.'],
                    ['name' => 'Agro Processing & Food Products', 'slug' => 'agro-processing-food', 'description' => 'Sirumalai banana processing, grain mills, and cold storage.'],
                ],
            ],
            [
                'name' => 'Healthcare & Medical',
                'slug' => 'healthcare-medical',
                'description' => 'Specialty hospitals, 24/7 pharmacies, diagnostic labs, and healthcare clinics.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
                'banner_url' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200',
                'display_order' => 3,
                'sub_industries' => [
                    ['name' => 'Hospitals & Multi-Specialty Clinics', 'slug' => 'hospitals-clinics', 'description' => 'In-patient, surgical, cardiology, and general medicine.'],
                    ['name' => 'Pharmacies & Medical Stores', 'slug' => 'pharmacies-medical-stores', 'description' => 'Allopathic, Ayurvedic, and Siddha medicines with delivery.'],
                    ['name' => 'Diagnostic Centers & Pathology Labs', 'slug' => 'diagnostic-labs', 'description' => 'Blood tests, digital X-Ray, CT Scan, and ultrasound.'],
                    ['name' => 'Dental & Eye Clinics', 'slug' => 'dental-eye-clinics', 'description' => 'Root canal, braces, cataract, opticals, and eye care.'],
                ],
            ],
            [
                'name' => 'Retail & Shopping',
                'slug' => 'retail-shopping',
                'description' => 'Textile showrooms, hardware shops, electronics stores, and local supermarkets.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
                'banner_url' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
                'display_order' => 4,
                'sub_industries' => [
                    ['name' => 'Textiles, Sarees & Readymades', 'slug' => 'textiles-sarees-readymades', 'description' => 'Silk sarees, wedding collections, and family garments.'],
                    ['name' => 'Dindigul Lock Dealers & Hardware', 'slug' => 'lock-dealers-hardware', 'description' => 'Wholesale & retail distribution of Dindigul security locks.'],
                    ['name' => 'Electronics, Mobiles & Appliances', 'slug' => 'electronics-mobiles-appliances', 'description' => 'Smartphones, LED TVs, refrigerators, and accessories.'],
                    ['name' => 'Supermarkets & Departmental Stores', 'slug' => 'supermarkets-departmental', 'description' => 'Provisions, groceries, fresh fruits, and vegetables.'],
                ],
            ],
            [
                'name' => 'Home & Maintenance Services',
                'slug' => 'home-services',
                'description' => 'Professional electricians, plumbers, interior designers, and appliance repair.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/995/995053.png',
                'banner_url' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200',
                'display_order' => 5,
                'sub_industries' => [
                    ['name' => 'Electricians & Plumbers', 'slug' => 'electricians-plumbers', 'description' => 'Residential & commercial wiring, water pipe fitting, and repairs.'],
                    ['name' => 'Carpentry & Interior Designing', 'slug' => 'carpentry-interiors', 'description' => 'Modular kitchen, wardrobes, false ceiling, and wood work.'],
                    ['name' => 'Painting & Waterproofing', 'slug' => 'painting-waterproofing', 'description' => 'Interior/exterior painting, putty, and damp wall waterproofing.'],
                    ['name' => 'AC & Appliance Repair', 'slug' => 'ac-appliance-repair', 'description' => 'Air conditioner gas filling, washing machine, and fridge repair.'],
                ],
            ],
            [
                'name' => 'Travel & Tourism',
                'slug' => 'travel-tourism',
                'description' => 'Taxi rentals, Kodai tour packages, resorts, hotel booking, and pilgrim travels.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
                'banner_url' => 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
                'display_order' => 6,
                'sub_industries' => [
                    ['name' => 'Travel Agencies & Taxi/Cab Rentals', 'slug' => 'taxi-cab-rentals', 'description' => 'Local drops, outstation cabs, and Kodaikanal hill station tours.'],
                    ['name' => 'Hotels, Lodges & Homestays', 'slug' => 'hotels-lodges-homestays', 'description' => 'AC rooms, family suites, budget lodges near bus stand & station.'],
                    ['name' => 'Palani Pilgrim Tour Services', 'slug' => 'palani-pilgrim-tours', 'description' => 'Devotional travel packages to Palani Murugan temple & Sirumalai.'],
                ],
            ],
            [
                'name' => 'Automotive & Vehicles',
                'slug' => 'automotive-vehicles',
                'description' => 'Two-wheeler & four-wheeler showrooms, bike service, car spa, and spare parts.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png',
                'banner_url' => 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1200',
                'display_order' => 7,
                'sub_industries' => [
                    ['name' => 'Two-Wheeler Showrooms & Service', 'slug' => 'two-wheeler-showrooms-service', 'description' => 'Scooters, motorbikes sales, genuine spares, and water wash.'],
                    ['name' => 'Car Repair Workshops & Auto Detailing', 'slug' => 'car-repair-detailing', 'description' => 'Engine tune-up, denting, painting, and Teflon coating.'],
                    ['name' => 'Auto Spare Parts & Batteries', 'slug' => 'auto-spares-batteries', 'description' => 'Car/bike batteries, inverters, engine oils, and tyres.'],
                ],
            ],
            [
                'name' => 'Education & Training',
                'slug' => 'education-training',
                'description' => 'Schools, arts/science/engineering colleges, competitive exam coaching, and computer centers.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/2997/2997322.png',
                'banner_url' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200',
                'display_order' => 8,
                'sub_industries' => [
                    ['name' => 'Schools & Junior Colleges', 'slug' => 'schools-colleges', 'description' => 'CBSE, Matriculation, State Board schools, and higher secondary.'],
                    ['name' => 'Competitive Coaching & Tuitions', 'slug' => 'coaching-tuitions', 'description' => 'TNPSC, NEET, JEE, banking exams, and school tuition centers.'],
                    ['name' => 'Computer & Software Training Institutes', 'slug' => 'computer-software-training', 'description' => 'Python, Full Stack, Tally, Graphic Design, and Spoken English.'],
                ],
            ],
            [
                'name' => 'IT & Software',
                'slug' => 'it-software',
                'description' => 'Website designing, mobile apps, software development, and digital marketing agencies.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/2082/2082806.png',
                'banner_url' => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
                'display_order' => 9,
                'sub_industries' => [
                    ['name' => 'Web Development & Mobile Apps', 'slug' => 'web-mobile-development', 'description' => 'Custom websites, e-commerce stores, Android and iOS apps.'],
                    ['name' => 'Digital Marketing & Local SEO', 'slug' => 'digital-marketing-seo', 'description' => 'Google ads, social media promotion, and local search ranking.'],
                    ['name' => 'Computer Sales, Service & CCTV', 'slug' => 'computer-sales-cctv', 'description' => 'Desktop/laptop repair, printer servicing, and CCTV installation.'],
                ],
            ],
            [
                'name' => 'Beauty & Wellness',
                'slug' => 'beauty-wellness',
                'description' => 'Men\'s hair salons, women\'s bridal makeup parlours, Ayurvedic spas, and fitness gyms.',
                'icon_url' => 'https://cdn-icons-png.flaticon.com/512/2763/2763321.png',
                'banner_url' => 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200',
                'display_order' => 10,
                'sub_industries' => [
                    ['name' => 'Hair Salons & Men\'s Grooming', 'slug' => 'hair-salons-mens-grooming', 'description' => 'Haircut, beard styling, head massage, and facial.'],
                    ['name' => 'Bridal Makeup & Beauty Parlours', 'slug' => 'bridal-makeup-beauty-parlours', 'description' => 'Bridal makeover, mehndi, skin treatments, and hair spa.'],
                    ['name' => 'Gyms & Fitness Centers', 'slug' => 'gyms-fitness-centers', 'description' => 'Strength training, cardio, weight loss, and personal coaching.'],
                ],
            ],
        ];

        foreach ($industries as $indData) {
            $subIndustries = $indData['sub_industries'];
            unset($indData['sub_industries']);

            $industry = Industry::updateOrCreate(
                ['slug' => $indData['slug']],
                $indData
            );

            $order = 1;
            foreach ($subIndustries as $sub) {
                SubIndustry::updateOrCreate(
                    [
                        'industry_id' => $industry->id,
                        'slug' => $sub['slug'],
                    ],
                    [
                        'name' => $sub['name'],
                        'description' => $sub['description'],
                        'icon_url' => $industry->icon_url,
                        'display_order' => $order++,
                        'status' => 'active',
                    ]
                );
            }
        }
    }
}
