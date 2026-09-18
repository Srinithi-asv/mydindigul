<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Service;
use App\Models\TourismPlace;
use App\Models\User;
use App\Models\Vendor;
use App\Models\Visitor;
use App\Models\VisitorAnalytic;
use Illuminate\Database\Seeder;

class VisitorAndAnalyticsSeeder extends Seeder
{
    public function run(): void
    {
        $suresh = User::where('email', 'suresh.customer@mydindigul.test')->first();
        $priya = User::where('email', 'priya.customer@mydindigul.test')->first();

        $thalappakatti = Vendor::where('slug', 'thalappakatti-biryani')->first();
        $lockWorks = Vendor::where('slug', 'dindigul-premier-lock-works')->first();
        $careClinic = Vendor::where('slug', 'dindigul-care-clinic')->first();

        $cateringService = Service::where('slug', 'outdoor-catering-wedding-biryani')->first();
        $muttonBiryani = Product::where('slug', 'dindigul-special-mutton-biryani')->first();
        $brassLock = Product::where('slug', 'dindigul-7-lever-brass-padlock')->first();
        $rockFort = TourismPlace::where('slug', 'dindigul-rock-fort-malai-kottai')->first();

        $visitorsData = [
            // Logged-in Visitor 1: Suresh (Mobile)
            [
                'visitor_uuid' => '550e8400-e29b-41d4-a716-446655440001',
                'user_id' => $suresh?->id,
                'ip_address' => '49.37.150.21',
                'user_agent' => 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',
                'device_type' => 'mobile',
                'first_visit_at' => now()->subDays(10),
                'last_visit_at' => now()->subHours(2),
            ],
            // Logged-in Visitor 2: Priya (Desktop)
            [
                'visitor_uuid' => '550e8400-e29b-41d4-a716-446655440002',
                'user_id' => $priya?->id,
                'ip_address' => '106.195.40.85',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
                'device_type' => 'desktop',
                'first_visit_at' => now()->subDays(7),
                'last_visit_at' => now()->subMinutes(45),
            ],
            // Anonymous Visitor 3 (Mobile from Chennai searching for Dindigul Biryani)
            [
                'visitor_uuid' => '550e8400-e29b-41d4-a716-446655440003',
                'user_id' => null,
                'ip_address' => '157.48.210.60',
                'user_agent' => 'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 Mobile Safari/537.36',
                'device_type' => 'mobile',
                'first_visit_at' => now()->subDays(3),
                'last_visit_at' => now()->subHours(5),
            ],
            // Anonymous Visitor 4 (Desktop from Bangalore looking for GI tagged brass locks)
            [
                'visitor_uuid' => '550e8400-e29b-41d4-a716-446655440004',
                'user_id' => null,
                'ip_address' => '182.74.19.102',
                'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                'device_type' => 'desktop',
                'first_visit_at' => now()->subDays(5),
                'last_visit_at' => now()->subHours(1),
            ],
            // Anonymous Visitor 5 (Tablet browsing Dindigul Tourism)
            [
                'visitor_uuid' => '550e8400-e29b-41d4-a716-446655440005',
                'user_id' => null,
                'ip_address' => '223.185.120.33',
                'user_agent' => 'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',
                'device_type' => 'tablet',
                'first_visit_at' => now()->subDays(2),
                'last_visit_at' => now()->subMinutes(20),
            ],
        ];

        $vMap = [];
        foreach ($visitorsData as $v) {
            $visitor = Visitor::updateOrCreate(
                ['visitor_uuid' => $v['visitor_uuid']],
                $v
            );
            $vMap[$v['visitor_uuid']] = $visitor;
        }

        // Create representative analytics activities
        $analytics = [
            // Suresh: Searched & viewed Thalappakatti
            [
                'visitor_id' => $vMap['550e8400-e29b-41d4-a716-446655440001']->id,
                'vendor_id' => $thalappakatti?->id,
                'entity_type' => 'vendor',
                'entity_id' => $thalappakatti?->id,
                'event_type' => 'search',
                'page_url' => 'https://mydindigul.test/search?q=dindigul+biryani',
                'search_query' => 'dindigul biryani',
                'metadata' => ['location' => 'Dindigul', 'results_count' => 12],
                'created_at' => now()->subDays(2),
            ],
            [
                'visitor_id' => $vMap['550e8400-e29b-41d4-a716-446655440001']->id,
                'vendor_id' => $thalappakatti?->id,
                'entity_type' => 'vendor',
                'entity_id' => $thalappakatti?->id,
                'event_type' => 'vendor_profile_view',
                'page_url' => 'https://mydindigul.test/vendors/thalappakatti-biryani',
                'search_query' => null,
                'metadata' => ['referrer' => 'search_results'],
                'created_at' => now()->subDays(2)->addMinutes(1),
            ],
            [
                'visitor_id' => $vMap['550e8400-e29b-41d4-a716-446655440001']->id,
                'vendor_id' => $thalappakatti?->id,
                'entity_type' => 'product',
                'entity_id' => $muttonBiryani?->id,
                'event_type' => 'product_view',
                'page_url' => 'https://mydindigul.test/products/dindigul-special-mutton-biryani',
                'search_query' => null,
                'metadata' => ['price' => 330.00],
                'created_at' => now()->subDays(2)->addMinutes(3),
            ],
            [
                'visitor_id' => $vMap['550e8400-e29b-41d4-a716-446655440001']->id,
                'vendor_id' => $thalappakatti?->id,
                'entity_type' => 'service',
                'entity_id' => $cateringService?->id,
                'event_type' => 'service_view',
                'page_url' => 'https://mydindigul.test/services/outdoor-catering-wedding-biryani',
                'search_query' => null,
                'metadata' => ['pricing_type' => 'starting_at'],
                'created_at' => now()->subDays(1),
            ],
            [
                'visitor_id' => $vMap['550e8400-e29b-41d4-a716-446655440001']->id,
                'vendor_id' => $thalappakatti?->id,
                'entity_type' => 'vendor',
                'entity_id' => $thalappakatti?->id,
                'event_type' => 'click_to_call',
                'page_url' => 'https://mydindigul.test/vendors/thalappakatti-biryani',
                'search_query' => null,
                'metadata' => ['phone_dialed' => '9842100001'],
                'created_at' => now()->subHours(2),
            ],

            // Visitor 4 (Bangalore): Lock Works interactions
            [
                'visitor_id' => $vMap['550e8400-e29b-41d4-a716-446655440004']->id,
                'vendor_id' => $lockWorks?->id,
                'entity_type' => 'product',
                'entity_id' => $brassLock?->id,
                'event_type' => 'product_view',
                'page_url' => 'https://mydindigul.test/products/dindigul-7-lever-brass-padlock',
                'search_query' => null,
                'metadata' => ['city' => 'Bengaluru'],
                'created_at' => now()->subHours(5),
            ],
            [
                'visitor_id' => $vMap['550e8400-e29b-41d4-a716-446655440004']->id,
                'vendor_id' => $lockWorks?->id,
                'entity_type' => 'vendor',
                'entity_id' => $lockWorks?->id,
                'event_type' => 'catalogue_download',
                'page_url' => 'https://mydindigul.test/catalogues/dindigul-lock-works-2026.pdf',
                'search_query' => null,
                'metadata' => ['format' => 'pdf', 'file_size' => '3.4MB'],
                'created_at' => now()->subHours(4),
            ],
            [
                'visitor_id' => $vMap['550e8400-e29b-41d4-a716-446655440004']->id,
                'vendor_id' => $lockWorks?->id,
                'entity_type' => 'vendor',
                'entity_id' => $lockWorks?->id,
                'event_type' => 'whatsapp_click',
                'page_url' => 'https://mydindigul.test/vendors/dindigul-premier-lock-works',
                'search_query' => null,
                'metadata' => ['whatsapp_target' => '9842100002'],
                'created_at' => now()->subHours(1),
            ],

            // Visitor 5: Tourism view
            [
                'visitor_id' => $vMap['550e8400-e29b-41d4-a716-446655440005']->id,
                'vendor_id' => null,
                'entity_type' => 'tourism',
                'entity_id' => $rockFort?->id,
                'event_type' => 'directions_click',
                'page_url' => 'https://mydindigul.test/tourism/dindigul-rock-fort-malai-kottai',
                'search_query' => null,
                'metadata' => ['target' => 'google_maps_directions'],
                'created_at' => now()->subMinutes(20),
            ],

            // Care Clinic view
            [
                'visitor_id' => $vMap['550e8400-e29b-41d4-a716-446655440002']->id,
                'vendor_id' => $careClinic?->id,
                'entity_type' => 'vendor',
                'entity_id' => $careClinic?->id,
                'event_type' => 'vendor_profile_view',
                'page_url' => 'https://mydindigul.test/vendors/dindigul-care-clinic',
                'search_query' => null,
                'metadata' => ['source' => 'direct'],
                'created_at' => now()->subDays(3),
            ],
        ];

        foreach ($analytics as $a) {
            VisitorAnalytic::create($a);
        }
    }
}
