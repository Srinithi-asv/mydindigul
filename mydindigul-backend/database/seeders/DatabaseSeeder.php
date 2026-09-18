<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database in proper dependency order.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            IndustrySeeder::class,
            VendorSeeder::class,
            VendorSubscriptionSeeder::class,
            ServiceSeeder::class,
            ProductSeeder::class,
            VendorCatalogueSeeder::class,
            JobSeeder::class,
            EventSeeder::class,
            EnquiryAndLeadSeeder::class,
            OfferAndOrderSeeder::class,
            WishlistAndReviewSeeder::class,
            TourismSeeder::class,
            VisitorAndAnalyticsSeeder::class,
        ]);
    }
}
