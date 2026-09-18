<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Review;
use App\Models\Service;
use App\Models\User;
use App\Models\Vendor;
use App\Models\Wishlist;
use Illuminate\Database\Seeder;

class WishlistAndReviewSeeder extends Seeder
{
    public function run(): void
    {
        $suresh = User::where('email', 'suresh.customer@mydindigul.test')->first();
        $priya = User::where('email', 'priya.customer@mydindigul.test')->first();
        $kavitha = User::where('email', 'kavitha.customer@mydindigul.test')->first();
        $arun = User::where('email', 'arun.customer@mydindigul.test')->first();

        $thalappakatti = Vendor::where('slug', 'thalappakatti-biryani')->first();
        $lockWorks = Vendor::where('slug', 'dindigul-premier-lock-works')->first();
        $careClinic = Vendor::where('slug', 'dindigul-care-clinic')->first();

        $cateringService = Service::where('slug', 'outdoor-catering-wedding-biryani')->first();
        $inverterService = Service::where('slug', 'home-inverter-ups-wiring')->first();

        $muttonBiryani = Product::where('slug', 'dindigul-special-mutton-biryani')->first();
        $brassLock = Product::where('slug', 'dindigul-7-lever-brass-padlock')->first();
        $silkSaree = Product::where('slug', 'kanchipuram-silk-bridal-saree-red')->first();

        // 1. Wishlists (Polymorphic: Vendor, Service, Product)
        if ($suresh && $thalappakatti) {
            Wishlist::firstOrCreate([
                'user_id' => $suresh->id,
                'wishlistable_type' => Vendor::class,
                'wishlistable_id' => $thalappakatti->id,
            ]);
        }

        if ($suresh && $muttonBiryani) {
            Wishlist::firstOrCreate([
                'user_id' => $suresh->id,
                'wishlistable_type' => Product::class,
                'wishlistable_id' => $muttonBiryani->id,
            ]);
        }

        if ($priya && $silkSaree) {
            Wishlist::firstOrCreate([
                'user_id' => $priya->id,
                'wishlistable_type' => Product::class,
                'wishlistable_id' => $silkSaree->id,
            ]);
        }

        if ($priya && $cateringService) {
            Wishlist::firstOrCreate([
                'user_id' => $priya->id,
                'wishlistable_type' => Service::class,
                'wishlistable_id' => $cateringService->id,
            ]);
        }

        if ($kavitha && $lockWorks) {
            Wishlist::firstOrCreate([
                'user_id' => $kavitha->id,
                'wishlistable_type' => Vendor::class,
                'wishlistable_id' => $lockWorks->id,
            ]);
        }

        if ($kavitha && $brassLock) {
            Wishlist::firstOrCreate([
                'user_id' => $kavitha->id,
                'wishlistable_type' => Product::class,
                'wishlistable_id' => $brassLock->id,
            ]);
        }

        if ($arun && $inverterService) {
            Wishlist::firstOrCreate([
                'user_id' => $arun->id,
                'wishlistable_type' => Service::class,
                'wishlistable_id' => $inverterService->id,
            ]);
        }

        // 2. Reviews (Polymorphic: Vendor, Service, Product with vendor replies)
        // Review on Vendor (Thalappakatti)
        if ($suresh && $thalappakatti) {
            Review::updateOrCreate(
                [
                    'user_id' => $suresh->id,
                    'reviewable_type' => Vendor::class,
                    'reviewable_id' => $thalappakatti->id,
                ],
                [
                    'rating' => 5,
                    'review_title' => 'The absolute authentic king of Seeraga Samba biryani!',
                    'comment' => 'Visited the Grand Trunk Road outlet. The mutton dum biryani was melt-in-mouth tender with distinct pepper and cardamom aroma. Service was courteous.',
                    'status' => 'approved',
                    'vendor_reply' => 'Thank you Mr. Suresh! Delighted to know you enjoyed our heritage dum biryani. Look forward to welcoming you again.',
                    'vendor_replied_at' => now()->subDays(1),
                ]
            );
        }

        // Review on Product (Mutton Biryani)
        if ($kavitha && $muttonBiryani) {
            Review::updateOrCreate(
                [
                    'user_id' => $kavitha->id,
                    'reviewable_type' => Product::class,
                    'reviewable_id' => $muttonBiryani->id,
                ],
                [
                    'rating' => 5,
                    'review_title' => 'Top notch packaging and piping hot delivery',
                    'comment' => 'Ordered 2 packs for family dinner. The meat-to-rice ratio was generous and brinjal curry was outstanding.',
                    'status' => 'approved',
                    'vendor_reply' => 'Thanks for the wonderful feedback! Happy dining!',
                    'vendor_replied_at' => now()->subDays(2),
                ]
            );
        }

        // Review on Product (Dindigul Brass Lock)
        if ($arun && $brassLock) {
            Review::updateOrCreate(
                [
                    'user_id' => $arun->id,
                    'reviewable_type' => Product::class,
                    'reviewable_id' => $brassLock->id,
                ],
                [
                    'rating' => 5,
                    'review_title' => 'Unbeatable heavy brass security lock',
                    'comment' => 'Weight is nearly 1.5 kg of solid brass. Keys operate with satisfying smooth clicks. Proud to own an authentic GI tagged Dindigul craft product.',
                    'status' => 'approved',
                    'vendor_reply' => 'We take great pride in our blacksmith tradition. Thank you for supporting Dindigul craft!',
                    'vendor_replied_at' => now()->subDays(3),
                ]
            );
        }

        // Review on Service (Diabetic Checkup)
        if ($suresh && $careClinic) {
            Review::updateOrCreate(
                [
                    'user_id' => $suresh->id,
                    'reviewable_type' => Vendor::class,
                    'reviewable_id' => $careClinic->id,
                ],
                [
                    'rating' => 5,
                    'review_title' => 'Very attentive doctor and clean clinic environment',
                    'comment' => 'Dr. Saravanan spent 20 minutes explaining my mother\'s sugar levels and gave practical dietary advice without prescribing unnecessary expensive tests.',
                    'status' => 'approved',
                    'vendor_reply' => 'Thank you for your trust in Dindigul Care Clinic. Wishing your mother good health!',
                    'vendor_replied_at' => now()->subDays(2),
                ]
            );
        }

        // Review on Product (Silk Saree)
        if ($priya && $silkSaree) {
            Review::updateOrCreate(
                [
                    'user_id' => $priya->id,
                    'reviewable_type' => Product::class,
                    'reviewable_id' => $silkSaree->id,
                ],
                [
                    'rating' => 5,
                    'review_title' => 'Breathtaking bridal silk saree with rich gold zari',
                    'comment' => 'Purchased for my sister\'s wedding. The color is majestic crimson red and the silk softness is pure handloom grade. Well worth the price.',
                    'status' => 'approved',
                    'vendor_reply' => 'Hearty congratulations to the bride! Thank you for choosing Sri Meenakshi Silks.',
                    'vendor_replied_at' => now()->subDays(1),
                ]
            );
        }
    }
}
