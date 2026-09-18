<?php

namespace Database\Seeders;

use App\Models\Offer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class OfferAndOrderSeeder extends Seeder
{
    public function run(): void
    {
        $thalappakatti = Vendor::where('slug', 'thalappakatti-biryani')->first(); // Premium Active
        $lockWorks = Vendor::where('slug', 'dindigul-premier-lock-works')->first(); // Premium Active
        $textiles = Vendor::where('slug', 'sri-meenakshi-textiles')->first(); // Premium Active

        $suresh = User::where('email', 'suresh.customer@mydindigul.test')->first();
        $priya = User::where('email', 'priya.customer@mydindigul.test')->first();
        $arun = User::where('email', 'arun.customer@mydindigul.test')->first();

        // 1. Create Offers
        $thalaOffer = Offer::updateOrCreate(
            ['slug' => 'thalappakatti-biryani-fest-15'],
            [
                'vendor_id' => $thalappakatti?->id,
                'title' => 'Flat 15% Off on Biryani Party Buckets',
                'coupon_code' => 'BIRYANI15',
                'discount_type' => 'percentage',
                'discount_value' => 15.00,
                'min_order_amount' => 1000.00,
                'max_discount_cap' => 300.00,
                'banner_url' => 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
                'start_date' => now()->subDays(5),
                'end_date' => now()->addDays(25),
                'is_featured' => true,
                'status' => 'active',
            ]
        );

        $lockOffer = Offer::updateOrCreate(
            ['slug' => 'dindigul-lock-heritage-discount'],
            [
                'vendor_id' => $lockWorks?->id,
                'title' => 'Heritage Week: Flat Rs 200 Off on Brass 7-Lever Locks',
                'coupon_code' => 'LOCK200',
                'discount_type' => 'flat_amount',
                'discount_value' => 200.00,
                'min_order_amount' => 1500.00,
                'max_discount_cap' => 200.00,
                'banner_url' => 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
                'start_date' => now()->subDays(2),
                'end_date' => now()->addDays(20),
                'is_featured' => true,
                'status' => 'active',
            ]
        );

        $textileOffer = Offer::updateOrCreate(
            ['slug' => 'meenakshi-festive-silk-saree-offer'],
            [
                'vendor_id' => $textiles?->id,
                'title' => 'Wedding Season Special: 10% Off on Pure Kanchipuram Silks',
                'coupon_code' => 'SILK10',
                'discount_type' => 'percentage',
                'discount_value' => 10.00,
                'min_order_amount' => 10000.00,
                'max_discount_cap' => 2000.00,
                'banner_url' => 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
                'start_date' => now()->subDays(10),
                'end_date' => now()->addDays(40),
                'is_featured' => true,
                'status' => 'active',
            ]
        );

        // Expired Offer (for testing)
        Offer::updateOrCreate(
            ['slug' => 'summer-vacation-discount-expired'],
            [
                'vendor_id' => $thalappakatti?->id,
                'title' => 'Summer Special Deal (Expired)',
                'coupon_code' => 'SUMMER20',
                'discount_type' => 'percentage',
                'discount_value' => 20.00,
                'min_order_amount' => 500.00,
                'max_discount_cap' => 150.00,
                'banner_url' => null,
                'start_date' => now()->subMonths(3),
                'end_date' => now()->subMonths(2),
                'is_featured' => false,
                'status' => 'expired',
            ]
        );

        // 2. Create Orders & Order Items ONLY FOR PREMIUM VENDORS (per business rule)
        $muttonBiryani = Product::where('slug', 'dindigul-special-mutton-biryani')->first();
        $chickenBiryani = Product::where('slug', 'dindigul-nattu-kozhi-biryani')->first();
        $brassLock = Product::where('slug', 'dindigul-7-lever-brass-padlock')->first();
        $silkSaree = Product::where('slug', 'kanchipuram-silk-bridal-saree-red')->first();
        $partyPackService = Service::where('slug', 'family-party-box-takeaway')->first();

        // Order 1: Thalappakatti (Biryani delivery with Razorpay)
        if ($thalappakatti && $thalappakatti->canAcceptOrders() && $suresh) {
            $order1 = Order::updateOrCreate(
                ['order_number' => 'ORD-THALA-2026-001'],
                [
                    'vendor_id' => $thalappakatti->id,
                    'user_id' => $suresh->id,
                    'offer_id' => $thalaOffer->id,
                    'subtotal' => 1949.00,
                    'discount_amount' => 292.35,
                    'tax_amount' => 82.83,
                    'delivery_charge' => 50.00,
                    'total_amount' => 1789.48,
                    'payment_method' => 'razorpay',
                    'payment_status' => 'paid',
                    'razorpay_order_id' => 'order_thala_rzp_001',
                    'razorpay_payment_id' => 'pay_thala_rzp_001',
                    'order_status' => 'delivered',
                    'shipping_address' => [
                        'recipient_name' => 'Suresh Kumar',
                        'recipient_phone' => '9842200001',
                        'address_line1' => 'No. 45, Spencer Compound',
                        'city' => 'Dindigul',
                        'state' => 'Tamil Nadu',
                        'pincode' => '624001',
                    ],
                    'billing_address' => [
                        'recipient_name' => 'Suresh Kumar',
                        'recipient_phone' => '9842200001',
                        'address_line1' => 'No. 45, Spencer Compound',
                        'city' => 'Dindigul',
                        'state' => 'Tamil Nadu',
                        'pincode' => '624001',
                    ],
                    'customer_notes' => 'Please include extra brinjal dalcha and onion raitha.',
                    'placed_at' => now()->subDays(2),
                ]
            );

            if ($partyPackService) {
                OrderItem::updateOrCreate(
                    [
                        'order_id' => $order1->id,
                        'service_id' => $partyPackService->id,
                    ],
                    [
                        'product_id' => null,
                        'item_name' => $partyPackService->title,
                        'unit_price' => 1599.00,
                        'quantity' => 1,
                        'total_price' => 1599.00,
                    ]
                );
            }

            if ($chickenBiryani) {
                OrderItem::updateOrCreate(
                    [
                        'order_id' => $order1->id,
                        'product_id' => $chickenBiryani->id,
                    ],
                    [
                        'service_id' => null,
                        'item_name' => $chickenBiryani->name,
                        'unit_price' => 350.00,
                        'quantity' => 1,
                        'total_price' => 350.00,
                    ]
                );
            }
        }

        // Order 2: Lock Works (Brass padlocks COD order)
        if ($lockWorks && $lockWorks->canAcceptOrders() && $arun) {
            $order2 = Order::updateOrCreate(
                ['order_number' => 'ORD-LOCK-2026-002'],
                [
                    'vendor_id' => $lockWorks->id,
                    'user_id' => $arun->id,
                    'offer_id' => $lockOffer->id,
                    'subtotal' => 3300.00,
                    'discount_amount' => 200.00,
                    'tax_amount' => 155.00,
                    'delivery_charge' => 0.00,
                    'total_amount' => 3255.00,
                    'payment_method' => 'cash_on_delivery',
                    'payment_status' => 'paid',
                    'razorpay_order_id' => null,
                    'razorpay_payment_id' => null,
                    'order_status' => 'delivered',
                    'shipping_address' => [
                        'recipient_name' => 'Arun Karthick',
                        'recipient_phone' => '9842200004',
                        'address_line1' => 'Shop 8, Big Bazaar Street',
                        'city' => 'Dindigul',
                        'state' => 'Tamil Nadu',
                        'pincode' => '624001',
                    ],
                    'customer_notes' => 'Please provide tax invoice with GST number for retail store.',
                    'placed_at' => now()->subDays(4),
                ]
            );

            if ($brassLock) {
                OrderItem::updateOrCreate(
                    [
                        'order_id' => $order2->id,
                        'product_id' => $brassLock->id,
                    ],
                    [
                        'service_id' => null,
                        'item_name' => $brassLock->name,
                        'unit_price' => 1650.00,
                        'quantity' => 2,
                        'total_price' => 3300.00,
                    ]
                );
            }
        }

        // Order 3: Sri Meenakshi Textiles (Silk Saree Razorpay Order)
        if ($textiles && $textiles->canAcceptOrders() && $priya) {
            $order3 = Order::updateOrCreate(
                ['order_number' => 'ORD-TEX-2026-003'],
                [
                    'vendor_id' => $textiles->id,
                    'user_id' => $priya->id,
                    'offer_id' => $textileOffer->id,
                    'subtotal' => 16499.00,
                    'discount_amount' => 1649.90,
                    'tax_amount' => 742.45,
                    'delivery_charge' => 0.00,
                    'total_amount' => 15591.55,
                    'payment_method' => 'razorpay',
                    'payment_status' => 'paid',
                    'razorpay_order_id' => 'order_tex_rzp_003',
                    'razorpay_payment_id' => 'pay_tex_rzp_003',
                    'order_status' => 'shipped',
                    'shipping_address' => [
                        'recipient_name' => 'Priya Dharshini',
                        'recipient_phone' => '9842200002',
                        'address_line1' => '12/A, RM Colony 5th Cross',
                        'city' => 'Dindigul',
                        'state' => 'Tamil Nadu',
                        'pincode' => '624001',
                    ],
                    'customer_notes' => 'Gift wrap requested with festive ribbon.',
                    'placed_at' => now()->subDay(),
                ]
            );

            if ($silkSaree) {
                OrderItem::updateOrCreate(
                    [
                        'order_id' => $order3->id,
                        'product_id' => $silkSaree->id,
                    ],
                    [
                        'service_id' => null,
                        'item_name' => $silkSaree->name,
                        'unit_price' => 16499.00,
                        'quantity' => 1,
                        'total_price' => 16499.00,
                    ]
                );
            }
        }
    }
}
