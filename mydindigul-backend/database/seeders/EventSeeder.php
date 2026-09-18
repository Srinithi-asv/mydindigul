<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventBooking;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $thalappakatti = Vendor::where('slug', 'thalappakatti-biryani')->first();
        $careClinic = Vendor::where('slug', 'dindigul-care-clinic')->first(); // Free vendor: EXACTLY 1 event!
        $kodaiGateway = Vendor::where('slug', 'kodai-gateway-tours')->first();

        $kavitha = User::where('email', 'kavitha.customer@mydindigul.test')->first();
        $manikandan = User::where('email', 'manikandan.customer@mydindigul.test')->first();

        $events = [
            // Event 1: Thalappakatti (Premium Vendor)
            [
                'vendor_id' => $thalappakatti?->id,
                'title' => 'Grand Dindigul Food & Cultural Biryani Festival 2026',
                'slug' => 'dindigul-food-cultural-biryani-festival-2026',
                'category' => 'Food & Culture',
                'short_description' => 'A 3-day gastronomic carnival celebrating traditional South Tamil Nadu culinary arts, folk music, and 12 varieties of dum biryani.',
                'description' => 'Experience live traditional wood-fire biryani masterclasses, taste rare Dindigul spices, enjoy Karakattam and Oyilattam folk dance performances, and family entertainment zones.',
                'venue_name' => 'Dindigul Corporation Trade Exhibition Grounds',
                'venue_address' => 'Near Spencer Compound, Bypass Road, Dindigul',
                'latitude' => 10.36500000,
                'longitude' => 77.96500000,
                'start_datetime' => now()->addDays(20)->setTime(10, 0, 0),
                'end_datetime' => now()->addDays(22)->setTime(22, 0, 0),
                'ticket_type' => 'paid',
                'ticket_price' => 150.00,
                'total_seats' => 500,
                'available_seats' => 420,
                'banner_url' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200',
                'gallery_urls' => [
                    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
                ],
                'is_featured' => true,
                'status' => 'published',
            ],

            // Event 2: Dindigul Care Clinic (Free Vendor: EXACTLY 1 event to respect business rule)
            [
                'vendor_id' => $careClinic?->id,
                'title' => 'Free Community Diabetes & Hypertension Health Camp',
                'slug' => 'free-community-diabetes-health-camp',
                'category' => 'Health & Wellness',
                'short_description' => 'Complimentary Random Blood Sugar, BP, BMI checkup, and personal consult with specialist doctors.',
                'description' => 'Annual community outreach initiative organized by Dindigul Care Clinic. Free diagnostic testing for senior citizens and diabetic patients. Free sample medications for eligible patients.',
                'venue_name' => 'Dindigul Care Clinic Campus',
                'venue_address' => '15, Palani Main Road, Near GH Roundana, Dindigul',
                'latitude' => 10.36620000,
                'longitude' => 77.96210000,
                'start_datetime' => now()->addDays(10)->setTime(8, 0, 0),
                'end_datetime' => now()->addDays(10)->setTime(14, 0, 0),
                'ticket_type' => 'free',
                'ticket_price' => 0.00,
                'total_seats' => 200,
                'available_seats' => 170,
                'banner_url' => 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200',
                'gallery_urls' => [],
                'is_featured' => true,
                'status' => 'published',
            ],

            // Event 3: Kodai Gateway (Travel & Adventure)
            [
                'vendor_id' => $kodaiGateway?->id,
                'title' => 'Weekend Sirumalai Mountain Trek & Eco Plantation Trail',
                'slug' => 'weekend-sirumalai-mountain-trek',
                'category' => 'Travel & Adventure',
                'short_description' => 'Guided hill trek across Sirumalai Sanjeevani hills, visiting hill banana plantations and Silver Shoals.',
                'description' => '2-day guided nature walking expedition covering 18 hairpin bends of Sirumalai. Includes mountain guide, camping tents, breakfast, and forest permission permits.',
                'venue_name' => 'Sirumalai Eco Campsite Base',
                'venue_address' => 'Sirumalai Hill Village, Dindigul District',
                'latitude' => 10.19800000,
                'longitude' => 77.99800000,
                'start_datetime' => now()->addDays(35)->setTime(6, 30, 0),
                'end_datetime' => now()->addDays(36)->setTime(18, 0, 0),
                'ticket_type' => 'paid',
                'ticket_price' => 1200.00,
                'total_seats' => 40,
                'available_seats' => 28,
                'banner_url' => 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
                'gallery_urls' => [],
                'is_featured' => false,
                'status' => 'published',
            ],
        ];

        foreach ($events as $eData) {
            if (! $eData['vendor_id']) {
                continue;
            }

            $event = Event::updateOrCreate(
                ['slug' => $eData['slug']],
                $eData
            );

            // Create bookings
            if ($event->slug === 'dindigul-food-cultural-biryani-festival-2026' && $kavitha) {
                EventBooking::updateOrCreate(
                    ['booking_reference' => 'BK-THALA-EVT-001'],
                    [
                        'event_id' => $event->id,
                        'vendor_id' => $event->vendor_id,
                        'user_id' => $kavitha->id,
                        'attendee_name' => $kavitha->name,
                        'attendee_email' => $kavitha->email,
                        'attendee_phone' => $kavitha->phone,
                        'tickets_count' => 2,
                        'unit_price' => 150.00,
                        'total_amount' => 300.00,
                        'payment_gateway' => 'razorpay',
                        'razorpay_order_id' => 'order_evt_razor_001',
                        'razorpay_payment_id' => 'pay_evt_razor_001',
                        'payment_status' => 'paid',
                        'booking_status' => 'confirmed',
                        'ticket_token' => 'TKN-FOODFEST-001-' . substr(md5('BK-THALA-EVT-001'), 0, 10),
                        'checked_in_at' => null,
                    ]
                );
            }

            if ($event->slug === 'free-community-diabetes-health-camp' && $manikandan) {
                EventBooking::updateOrCreate(
                    ['booking_reference' => 'BK-CLINIC-EVT-002'],
                    [
                        'event_id' => $event->id,
                        'vendor_id' => $event->vendor_id,
                        'user_id' => $manikandan->id,
                        'attendee_name' => $manikandan->name,
                        'attendee_email' => $manikandan->email,
                        'attendee_phone' => $manikandan->phone,
                        'tickets_count' => 1,
                        'unit_price' => 0.00,
                        'total_amount' => 0.00,
                        'payment_gateway' => 'free',
                        'razorpay_order_id' => null,
                        'razorpay_payment_id' => null,
                        'payment_status' => 'free',
                        'booking_status' => 'confirmed',
                        'ticket_token' => 'TKN-HEALTHCAMP-002-' . substr(md5('BK-CLINIC-EVT-002'), 0, 10),
                        'checked_in_at' => null,
                    ]
                );
            }
        }
    }
}
