<?php

namespace Database\Seeders;

use App\Models\Vendor;
use App\Models\VendorSubscription;
use Illuminate\Database\Seeder;

class VendorSubscriptionSeeder extends Seeder
{
    public function run(): void
    {
        $vendors = Vendor::all();

        foreach ($vendors as $vendor) {
            if ($vendor->slug === 'thalappakatti-biryani') {
                VendorSubscription::updateOrCreate(
                    [
                        'vendor_id' => $vendor->id,
                        'razorpay_order_id' => 'order_thala_sub_2026',
                    ],
                    [
                        'plan_type' => 'premium',
                        'billing_cycle' => 'annual',
                        'amount_paid' => 11999.00,
                        'payment_gateway' => 'razorpay',
                        'razorpay_payment_id' => 'pay_thala_p202601',
                        'starts_at' => now()->subMonths(2),
                        'ends_at' => now()->addMonths(10),
                        'status' => 'active',
                    ]
                );
            } elseif ($vendor->slug === 'dindigul-premier-lock-works') {
                VendorSubscription::updateOrCreate(
                    [
                        'vendor_id' => $vendor->id,
                        'razorpay_order_id' => 'order_lock_sub_2026',
                    ],
                    [
                        'plan_type' => 'premium',
                        'billing_cycle' => 'monthly',
                        'amount_paid' => 1299.00,
                        'payment_gateway' => 'razorpay',
                        'razorpay_payment_id' => 'pay_lock_p202602',
                        'starts_at' => now()->subDays(10),
                        'ends_at' => now()->addDays(20),
                        'status' => 'active',
                    ]
                );
            } elseif ($vendor->slug === 'sri-meenakshi-textiles') {
                VendorSubscription::updateOrCreate(
                    [
                        'vendor_id' => $vendor->id,
                        'razorpay_order_id' => 'order_tex_sub_2026',
                    ],
                    [
                        'plan_type' => 'premium',
                        'billing_cycle' => 'annual',
                        'amount_paid' => 11999.00,
                        'payment_gateway' => 'razorpay',
                        'razorpay_payment_id' => 'pay_tex_p202603',
                        'starts_at' => now()->subMonths(3),
                        'ends_at' => now()->addMonths(9),
                        'status' => 'active',
                    ]
                );
            } elseif ($vendor->slug === 'kodai-gateway-tours') {
                VendorSubscription::updateOrCreate(
                    [
                        'vendor_id' => $vendor->id,
                        'razorpay_order_id' => 'order_kodai_sub_2025',
                    ],
                    [
                        'plan_type' => 'premium',
                        'billing_cycle' => 'monthly',
                        'amount_paid' => 1299.00,
                        'payment_gateway' => 'razorpay',
                        'razorpay_payment_id' => 'pay_kodai_p202509',
                        'starts_at' => now()->subMonths(2),
                        'ends_at' => now()->subDays(15), // Expired
                        'status' => 'expired',
                    ]
                );
            } else {
                // Free vendors
                VendorSubscription::updateOrCreate(
                    [
                        'vendor_id' => $vendor->id,
                        'plan_type' => 'free',
                    ],
                    [
                        'billing_cycle' => 'monthly',
                        'amount_paid' => 0.00,
                        'payment_gateway' => 'none',
                        'razorpay_order_id' => null,
                        'razorpay_payment_id' => null,
                        'starts_at' => now()->subMonths(1),
                        'ends_at' => null,
                        'status' => 'active',
                    ]
                );
            }
        }
    }
}
