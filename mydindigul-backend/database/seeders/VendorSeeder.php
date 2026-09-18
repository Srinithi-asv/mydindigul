<?php

namespace Database\Seeders;

use App\Models\Industry;
use App\Models\SubIndustry;
use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorBusinessHour;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    public function run(): void
    {
        $foodIndustry = Industry::where('slug', 'food-restaurants')->first();
        $biryaniSub = SubIndustry::where('slug', 'dindigul-biryani-non-veg')->first();

        $mfgIndustry = Industry::where('slug', 'manufacturing-industrial')->first();
        $lockSub = SubIndustry::where('slug', 'brass-iron-lock-manufacturers')->first();

        $healthIndustry = Industry::where('slug', 'healthcare-medical')->first();
        $clinicSub = SubIndustry::where('slug', 'hospitals-clinics')->first();

        $homeIndustry = Industry::where('slug', 'home-services')->first();
        $electricianSub = SubIndustry::where('slug', 'electricians-plumbers')->first();

        $travelIndustry = Industry::where('slug', 'travel-tourism')->first();
        $cabSub = SubIndustry::where('slug', 'taxi-cab-rentals')->first();

        $itIndustry = Industry::where('slug', 'it-software')->first();
        $webSub = SubIndustry::where('slug', 'web-mobile-development')->first();

        $retailIndustry = Industry::where('slug', 'retail-shopping')->first();
        $textileSub = SubIndustry::where('slug', 'textiles-sarees-readymades')->first();

        $vendors = [
            // 1. Premium Active Vendor: Thalappakatti Dindigul Biryani
            [
                'owner_email' => 'owner.thalappakatti@mydindigul.test',
                'industry_id' => $foodIndustry?->id,
                'sub_industry_id' => $biryaniSub?->id,
                'business_name' => 'Dindigul Thalappakatti Biryani',
                'slug' => 'thalappakatti-biryani',
                'tagline' => 'Original Traditional Seeraga Samba Biryani Since 1957',
                'about_us' => 'World renowned Dindigul Thalappakatti Restaurant serving legendary Seeraga Samba mutton biryani cooked with secret home spices and tender meat sourced from Kannivadi & Dindigul hills.',
                'company_registration_no' => 'TN-DIN-2021-00987',
                'gst_number' => '33AABCT9876K1Z9',
                'pan_number' => 'AABCT9876K',
                'logo_url' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300',
                'cover_url' => 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200',
                'contact_person' => 'Nagasamy Naidu',
                'phone' => '9842100001',
                'whatsapp_number' => '9842100001',
                'email' => 'contact@thalappakatti-dindigul.test',
                'website_url' => 'https://thalappakatti-dindigul.test',
                'address_line1' => 'No. 1, Grand Trunk Road',
                'address_line2' => 'Opposite Head Post Office',
                'city' => 'Dindigul',
                'pincode' => '624001',
                'latitude' => 10.36240000,
                'longitude' => 77.96950000,
                'map_location_url' => 'https://maps.google.com/?q=10.3624,77.9695',
                'verification_status' => 'approved',
                'plan_type' => 'premium',
                'plan_status' => 'active',
                'plan_expires_at' => now()->addMonths(12),
                'is_verified' => true,
                'is_featured' => true,
                'avg_rating' => 4.80,
                'review_count' => 128,
                'view_count' => 4500,
                'social_links' => [
                    'instagram' => 'https://instagram.com/thalappakatti_dgl',
                    'facebook' => 'https://facebook.com/thalappakattidgl',
                ],
                'status' => 'active',
            ],

            // 2. Premium Active Vendor: Dindigul Premier Lock Works
            [
                'owner_email' => 'owner.lockworks@mydindigul.test',
                'industry_id' => $mfgIndustry?->id,
                'sub_industry_id' => $lockSub?->id,
                'business_name' => 'Dindigul Premier Lock Works',
                'slug' => 'dindigul-premier-lock-works',
                'tagline' => 'GI Tagged Handcrafted Master Security Locks & Safes',
                'about_us' => 'Makers of authentic Dindigul GI-tagged brass and bell-metal padlocks, mortise locks, prison locks, and heavy security vault locks engineered by master blacksmiths since 1935.',
                'company_registration_no' => 'TN-DIN-1985-00123',
                'gst_number' => '33AADCL1234F1Z2',
                'pan_number' => 'AADCL1234F',
                'logo_url' => 'https://images.unsplash.com/photo-1558002038-1055907df827?w=300',
                'cover_url' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200',
                'contact_person' => 'Sankaralingam Asari',
                'phone' => '9842100002',
                'whatsapp_number' => '9842100002',
                'email' => 'sales@dindigullocks.test',
                'website_url' => 'https://dindigullocks.test',
                'address_line1' => '42, Lock Workers Industrial Colony',
                'address_line2' => 'Nagal Nagar Road',
                'city' => 'Dindigul',
                'pincode' => '624003',
                'latitude' => 10.35510000,
                'longitude' => 77.98020000,
                'map_location_url' => 'https://maps.google.com/?q=10.3551,77.9802',
                'verification_status' => 'approved',
                'plan_type' => 'premium',
                'plan_status' => 'active',
                'plan_expires_at' => now()->addMonths(6),
                'is_verified' => true,
                'is_featured' => true,
                'avg_rating' => 4.90,
                'review_count' => 95,
                'view_count' => 3800,
                'social_links' => [
                    'facebook' => 'https://facebook.com/dindigullockworks',
                ],
                'status' => 'active',
            ],

            // 3. Free Active Vendor: Dindigul Care Multi-Specialty Clinic
            [
                'owner_email' => 'owner.careclinic@mydindigul.test',
                'industry_id' => $healthIndustry?->id,
                'sub_industry_id' => $clinicSub?->id,
                'business_name' => 'Dindigul Care Clinic & Diabetes Center',
                'slug' => 'dindigul-care-clinic',
                'tagline' => 'Compassionate Medical Care for Every Family',
                'about_us' => 'Modern outpatient clinic offering general medicine, diabetes management, preventive wellness checks, and minor procedure care.',
                'company_registration_no' => 'TN-DIN-2023-CLINIC',
                'gst_number' => null,
                'pan_number' => 'AABPC5544R',
                'logo_url' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300',
                'cover_url' => 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200',
                'contact_person' => 'Dr. R. Saravanan MD',
                'phone' => '9842100003',
                'whatsapp_number' => '9842100003',
                'email' => 'care@dindigulcareclinic.test',
                'website_url' => null,
                'address_line1' => '15, Palani Main Road',
                'address_line2' => 'Near GH Roundana',
                'city' => 'Dindigul',
                'pincode' => '624001',
                'latitude' => 10.36620000,
                'longitude' => 77.96210000,
                'map_location_url' => 'https://maps.google.com/?q=10.3662,77.9621',
                'verification_status' => 'approved',
                'plan_type' => 'free',
                'plan_status' => 'active',
                'plan_expires_at' => null,
                'is_verified' => true,
                'is_featured' => false,
                'avg_rating' => 4.60,
                'review_count' => 34,
                'view_count' => 1200,
                'social_links' => null,
                'status' => 'active',
            ],

            // 4. Free Active Vendor: City Spark Electricians & Home Care
            [
                'owner_email' => 'owner.cityspark@mydindigul.test',
                'industry_id' => $homeIndustry?->id,
                'sub_industry_id' => $electricianSub?->id,
                'business_name' => 'City Spark Electricians & Plumbing',
                'slug' => 'city-spark-electricians',
                'tagline' => 'Fast, Reliable Residential & Commercial Electrical Solutions',
                'about_us' => 'Government certified wiremen and plumbers providing home wiring, short-circuit troubleshooting, motor repair, and sanitary fittings across Dindigul district.',
                'company_registration_no' => null,
                'gst_number' => null,
                'pan_number' => null,
                'logo_url' => 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300',
                'cover_url' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200',
                'contact_person' => 'K. Murugan',
                'phone' => '9842100004',
                'whatsapp_number' => '9842100004',
                'email' => 'citysparkdgl@mydindigul.test',
                'website_url' => null,
                'address_line1' => '22, Mengles Road',
                'address_line2' => 'Near St. Marys School',
                'city' => 'Dindigul',
                'pincode' => '624001',
                'latitude' => 10.36010000,
                'longitude' => 77.97150000,
                'map_location_url' => 'https://maps.google.com/?q=10.3601,77.9715',
                'verification_status' => 'approved',
                'plan_type' => 'free',
                'plan_status' => 'active',
                'plan_expires_at' => null,
                'is_verified' => true,
                'is_featured' => false,
                'avg_rating' => 4.50,
                'review_count' => 19,
                'view_count' => 840,
                'social_links' => null,
                'status' => 'active',
            ],

            // 5. Expired Premium Vendor: Kodai Gateway Tours & Travels
            [
                'owner_email' => 'owner.kodaigateway@mydindigul.test',
                'industry_id' => $travelIndustry?->id,
                'sub_industry_id' => $cabSub?->id,
                'business_name' => 'Kodai Gateway Tours & Travels',
                'slug' => 'kodai-gateway-tours',
                'tagline' => 'Your Trusted Travel Partner to Kodaikanal and Palani Hills',
                'about_us' => 'Premium tourist taxis, hill station packages, and airport pickup/drops from Dindigul to Kodaikanal, Madurai, and Munnar.',
                'company_registration_no' => 'TN-DIN-2019-TRV-54',
                'gst_number' => '33AABCK8877L1Z5',
                'pan_number' => 'AABCK8877L',
                'logo_url' => 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300',
                'cover_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
                'contact_person' => 'Anthony Raj',
                'phone' => '9842100005',
                'whatsapp_number' => '9842100005',
                'email' => 'travel@kodaigateway.test',
                'website_url' => 'https://kodaigateway.test',
                'address_line1' => 'Near Dindigul Railway Junction Bus Bay',
                'address_line2' => 'Station Road',
                'city' => 'Dindigul',
                'pincode' => '624003',
                'latitude' => 10.35400000,
                'longitude' => 77.97800000,
                'map_location_url' => 'https://maps.google.com/?q=10.3540,77.9780',
                'verification_status' => 'approved',
                'plan_type' => 'premium',
                'plan_status' => 'expired',
                'plan_expires_at' => now()->subDays(15), // Expired 15 days ago
                'is_verified' => true,
                'is_featured' => false,
                'avg_rating' => 4.30,
                'review_count' => 42,
                'view_count' => 1650,
                'social_links' => null,
                'status' => 'active',
            ],

            // 6. Free Active Vendor: Dindigul Tech Solutions
            [
                'owner_email' => 'owner.dindigultech@mydindigul.test',
                'industry_id' => $itIndustry?->id,
                'sub_industry_id' => $webSub?->id,
                'business_name' => 'Dindigul Tech Solutions',
                'slug' => 'dindigul-tech-solutions',
                'tagline' => 'Web Design, Mobile Apps & Digital Growth for Local Businesses',
                'about_us' => 'Modern software development agency helping MSMEs and merchants build custom websites, e-commerce stores, and Google presence.',
                'company_registration_no' => 'TN-DIN-2024-TECH',
                'gst_number' => null,
                'pan_number' => 'BLZPB9988D',
                'logo_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300',
                'cover_url' => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
                'contact_person' => 'Vignesh Balaji',
                'phone' => '9842100006',
                'whatsapp_number' => '9842100006',
                'email' => 'contact@dindigultech.test',
                'website_url' => 'https://dindigultech.test',
                'address_line1' => '102, Anna Salai Commercial Complex',
                'address_line2' => 'GTN Road Junction',
                'city' => 'Dindigul',
                'pincode' => '624005',
                'latitude' => 10.37050000,
                'longitude' => 77.97500000,
                'map_location_url' => 'https://maps.google.com/?q=10.3705,77.9750',
                'verification_status' => 'approved',
                'plan_type' => 'free',
                'plan_status' => 'active',
                'plan_expires_at' => null,
                'is_verified' => true,
                'is_featured' => false,
                'avg_rating' => 4.70,
                'review_count' => 15,
                'view_count' => 920,
                'social_links' => [
                    'linkedin' => 'https://linkedin.com/company/dindigul-tech',
                ],
                'status' => 'active',
            ],

            // 7. Premium Active Vendor: Sri Meenakshi Textiles
            [
                'owner_email' => 'owner.meenakshitextiles@mydindigul.test',
                'industry_id' => $retailIndustry?->id,
                'sub_industry_id' => $textileSub?->id,
                'business_name' => 'Sri Meenakshi Textiles & Silks',
                'slug' => 'sri-meenakshi-textiles',
                'tagline' => 'Prestigious Silk Sarees, Wedding Silks & Family Fashion',
                'about_us' => 'Dindigul\'s favorite family wedding textile showroom spanning 4 floors of pure Kanchipuram silk, cotton sarees, dhotis, and readymades.',
                'company_registration_no' => 'TN-DIN-1998-TEX-789',
                'gst_number' => '33AABCM3344P1Z3',
                'pan_number' => 'AABCM3344P',
                'logo_url' => 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300',
                'cover_url' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
                'contact_person' => 'G. Meenakshisundaram',
                'phone' => '9842100007',
                'whatsapp_number' => '9842100007',
                'email' => 'care@meenakshitextiles.test',
                'website_url' => 'https://meenakshitextiles.test',
                'address_line1' => '78-82, Main Bazaar Street',
                'address_line2' => 'Opposite Clock Tower',
                'city' => 'Dindigul',
                'pincode' => '624001',
                'latitude' => 10.36400000,
                'longitude' => 77.97300000,
                'map_location_url' => 'https://maps.google.com/?q=10.3640,77.9730',
                'verification_status' => 'approved',
                'plan_type' => 'premium',
                'plan_status' => 'active',
                'plan_expires_at' => now()->addMonths(9),
                'is_verified' => true,
                'is_featured' => true,
                'avg_rating' => 4.85,
                'review_count' => 110,
                'view_count' => 5200,
                'social_links' => [
                    'instagram' => 'https://instagram.com/meenakshi_silks',
                ],
                'status' => 'active',
            ],
        ];

        foreach ($vendors as $vData) {
            $user = User::where('email', $vData['owner_email'])->first();
            if (! $user) {
                continue;
            }

            unset($vData['owner_email']);
            $vData['user_id'] = $user->id;

            $vendor = Vendor::updateOrCreate(
                ['slug' => $vData['slug']],
                $vData
            );

            // Populate 7 days business hours
            for ($day = 0; $day <= 6; $day++) {
                VendorBusinessHour::updateOrCreate(
                    [
                        'vendor_id' => $vendor->id,
                        'day_of_week' => $day,
                    ],
                    [
                        'open_time' => '09:00:00',
                        'close_time' => '21:00:00',
                        'is_closed' => ($day === 0 && in_array($vendor->slug, ['city-spark-electricians', 'dindigul-premier-lock-works'])), // closed Sundays for some
                    ]
                );
            }
        }
    }
}
