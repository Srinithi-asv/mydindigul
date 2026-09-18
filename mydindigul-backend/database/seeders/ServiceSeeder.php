<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $thalappakatti = Vendor::where('slug', 'thalappakatti-biryani')->first();
        $careClinic = Vendor::where('slug', 'dindigul-care-clinic')->first();
        $citySpark = Vendor::where('slug', 'city-spark-electricians')->first();
        $kodaiGateway = Vendor::where('slug', 'kodai-gateway-tours')->first();
        $dindigulTech = Vendor::where('slug', 'dindigul-tech-solutions')->first();

        $services = [
            // Thalappakatti (Food)
            [
                'vendor_id' => $thalappakatti?->id,
                'sub_industry_id' => $thalappakatti?->sub_industry_id,
                'title' => 'Outdoor Catering & Wedding Biryani Feasts',
                'slug' => 'outdoor-catering-wedding-biryani',
                'short_description' => 'Live dum cooking of authentic Dindigul Seeraga Samba biryani for marriages, receptions, and corporate banquets.',
                'description' => 'Traditional firewood wood-fire dum biryani cooked on-site for guest sizes ranging from 100 to 5,000 persons. Includes Dalcha, Ennai Kathirikai (brinjal curry), Onion Raitha, Bread Halwa, and fresh banana leaf service.',
                'pricing_type' => 'starting_at',
                'price' => 320.00, // per plate
                'discounted_price' => 290.00,
                'duration' => '4-6 hours',
                'service_area' => 'Dindigul, Madurai, Theni, Karur',
                'banner_image_url' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
                'images' => [
                    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
                ],
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'vendor_id' => $thalappakatti?->id,
                'sub_industry_id' => $thalappakatti?->sub_industry_id,
                'title' => 'Family Party Box & Bulk Takeaway Delivery',
                'slug' => 'family-party-box-takeaway',
                'short_description' => 'Party pack biryani bucket serving 5 to 8 persons with chicken 65 and boiled eggs.',
                'description' => 'Hot thermal-sealed party packs ready for pickup or direct home doorstep delivery within Dindigul municipal corporation limits.',
                'pricing_type' => 'fixed',
                'price' => 1750.00,
                'discounted_price' => 1599.00,
                'duration' => '45 mins',
                'service_area' => 'Dindigul City',
                'banner_image_url' => 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800',
                'images' => [],
                'is_featured' => false,
                'status' => 'active',
            ],

            // Dindigul Care Clinic (Healthcare)
            [
                'vendor_id' => $careClinic?->id,
                'sub_industry_id' => $careClinic?->sub_industry_id,
                'title' => 'Comprehensive Diabetic Foot & Neuropathy Evaluation',
                'slug' => 'diabetic-foot-evaluation',
                'short_description' => 'Specialized biothesiometer vibration perception and vascular Doppler screening for diabetic patients.',
                'description' => 'Full diagnostic screening to prevent diabetic ulcers, peripheral neuropathy assessments, personalized glycemic diet counseling, and prescription management by Dr. Saravanan.',
                'pricing_type' => 'fixed',
                'price' => 750.00,
                'discounted_price' => 500.00,
                'duration' => '30 mins',
                'service_area' => 'Dindigul Care Clinic Center',
                'banner_image_url' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
                'images' => [],
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'vendor_id' => $careClinic?->id,
                'sub_industry_id' => $careClinic?->sub_industry_id,
                'title' => 'Master Health Checkup & Executive Lab Profile',
                'slug' => 'master-health-checkup-profile',
                'short_description' => '72 comprehensive health parameters including CBC, Lipid Profile, LFT, KFT, HbA1c, ECG and doctor consult.',
                'description' => 'Early disease detection checkup package recommended annually for adults over 35 years. Same-day digital lab reporting via WhatsApp and email.',
                'pricing_type' => 'fixed',
                'price' => 2499.00,
                'discounted_price' => 1899.00,
                'duration' => '2 hours',
                'service_area' => 'Dindigul Care Clinic Center',
                'banner_image_url' => 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
                'images' => [],
                'is_featured' => false,
                'status' => 'active',
            ],

            // City Spark Electricians (Home Services)
            [
                'vendor_id' => $citySpark?->id,
                'sub_industry_id' => $citySpark?->sub_industry_id,
                'title' => 'Complete Home Inverter & UPS Wiring Setup',
                'slug' => 'home-inverter-ups-wiring',
                'short_description' => 'Separate line wiring, changeover switch installation, and battery terminal safety protection.',
                'description' => 'Certified wiremen conduct load calculations, dedicated inverter phase wiring, earth-leakage circuit breaker (ELCB) checks, and battery backup setup for homes and shops.',
                'pricing_type' => 'hourly',
                'price' => 350.00,
                'discounted_price' => null,
                'duration' => '2-4 hours',
                'service_area' => 'Dindigul Town & 15km Radius',
                'banner_image_url' => 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
                'images' => [],
                'is_featured' => true,
                'status' => 'active',
            ],
            [
                'vendor_id' => $citySpark?->id,
                'sub_industry_id' => $citySpark?->sub_industry_id,
                'title' => 'Emergency Submersible Motor & Starter Box Repair',
                'slug' => 'submersible-motor-starter-repair',
                'short_description' => '24-hour response for borewell pump starter coil burnout, capacitor replacement, and wiring faults.',
                'description' => 'On-site diagnostics for agricultural pump sets and residential overhead tank motor issues. Replacement with genuine L&T and Havells spares.',
                'pricing_type' => 'starting_at',
                'price' => 450.00,
                'discounted_price' => null,
                'duration' => '1-2 hours',
                'service_area' => 'All Dindigul Taluks',
                'banner_image_url' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
                'images' => [],
                'is_featured' => false,
                'status' => 'active',
            ],

            // Kodai Gateway Travels (Travel & Tourism)
            [
                'vendor_id' => $kodaiGateway?->id,
                'sub_industry_id' => $kodaiGateway?->sub_industry_id,
                'title' => 'Dindigul to Kodaikanal 1-Day Hill Station Sightseeing Cab',
                'slug' => 'dindigul-kodaikanal-day-cab',
                'short_description' => 'Sedan/SUV round-trip cab including Silver Cascade, Kodai Lake, Coaker\'s Walk, and Pillar Rocks.',
                'description' => 'Experienced hill-driving chauffeurs, clean air-conditioned vehicles, toll and parking included. Pick up from Dindigul Junction at 7:00 AM and return drop by 8:30 PM.',
                'pricing_type' => 'fixed',
                'price' => 3800.00,
                'discounted_price' => 3499.00,
                'duration' => 'Full Day (12 hours)',
                'service_area' => 'Dindigul to Kodaikanal Route',
                'banner_image_url' => 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
                'images' => [],
                'is_featured' => true,
                'status' => 'active',
            ],

            // Dindigul Tech Solutions (IT & Software)
            [
                'vendor_id' => $dindigulTech?->id,
                'sub_industry_id' => $dindigulTech?->sub_industry_id,
                'title' => 'Custom Mobile-Friendly Business Website & Google Profile',
                'slug' => 'custom-business-website-package',
                'short_description' => '5-page responsive website, domain, fast SSD hosting, SSL certificate, and Google Maps local SEO.',
                'description' => 'Tailored specifically for Dindigul retail shops, manufacturers, schools, and clinics. Includes WhatsApp chat button, photo gallery, contact forms, and bilingual English/Tamil content support.',
                'pricing_type' => 'fixed',
                'price' => 14999.00,
                'discounted_price' => 11999.00,
                'duration' => '7 working days',
                'service_area' => 'Tamil Nadu Wide',
                'banner_image_url' => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
                'images' => [],
                'is_featured' => true,
                'status' => 'active',
            ],
        ];

        foreach ($services as $sData) {
            if (! $sData['vendor_id']) {
                continue;
            }

            Service::updateOrCreate(
                [
                    'vendor_id' => $sData['vendor_id'],
                    'slug' => $sData['slug'],
                ],
                $sData
            );
        }
    }
}
