<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $defaultPassword = Hash::make('Password@123');

        // 1. Admin User
        User::updateOrCreate(
            ['email' => 'admin@mydindigul.test'],
            [
                'name' => 'MyDindigul Admin',
                'phone' => '9842000001',
                'password' => $defaultPassword,
                'role' => 'admin',
                'phone_verified_at' => now(),
                'email_verified_at' => now(),
                'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
                'status' => 'active',
            ]
        );

        // 2. Vendor Owners
        $vendorUsers = [
            [
                'name' => 'Nagasamy Naidu (Thalappakatti)',
                'email' => 'owner.thalappakatti@mydindigul.test',
                'phone' => '9842100001',
            ],
            [
                'name' => 'Sankaralingam Asari (Lock Works)',
                'email' => 'owner.lockworks@mydindigul.test',
                'phone' => '9842100002',
            ],
            [
                'name' => 'Dr. R. Saravanan (Dindigul Care Clinic)',
                'email' => 'owner.careclinic@mydindigul.test',
                'phone' => '9842100003',
            ],
            [
                'name' => 'K. Murugan (City Spark Electricians)',
                'email' => 'owner.cityspark@mydindigul.test',
                'phone' => '9842100004',
            ],
            [
                'name' => 'Anthony Raj (Kodai Gateway Travels)',
                'email' => 'owner.kodaigateway@mydindigul.test',
                'phone' => '9842100005',
            ],
            [
                'name' => 'Vignesh Balaji (Dindigul Tech Solutions)',
                'email' => 'owner.dindigultech@mydindigul.test',
                'phone' => '9842100006',
            ],
            [
                'name' => 'G. Meenakshisundaram (Sri Meenakshi Textiles)',
                'email' => 'owner.meenakshitextiles@mydindigul.test',
                'phone' => '9842100007',
            ],
        ];

        foreach ($vendorUsers as $vendor) {
            User::updateOrCreate(
                ['email' => $vendor['email']],
                [
                    'name' => $vendor['name'],
                    'phone' => $vendor['phone'],
                    'password' => $defaultPassword,
                    'role' => 'vendor',
                    'phone_verified_at' => now(),
                    'email_verified_at' => now(),
                    'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
                    'status' => 'active',
                ]
            );
        }

        // 3. Customer Users
        $customers = [
            [
                'name' => 'Suresh Kumar',
                'email' => 'suresh.customer@mydindigul.test',
                'phone' => '9842200001',
                'address' => [
                    'recipient_name' => 'Suresh Kumar',
                    'recipient_phone' => '9842200001',
                    'address_line1' => 'No. 45, Spencer Compound',
                    'address_line2' => 'Near Bus Stand Road',
                    'landmark' => 'Opposite Head Post Office',
                    'city' => 'Dindigul',
                    'state' => 'Tamil Nadu',
                    'pincode' => '624001',
                    'address_type' => 'home',
                    'is_default' => true,
                ],
            ],
            [
                'name' => 'Priya Dharshini',
                'email' => 'priya.customer@mydindigul.test',
                'phone' => '9842200002',
                'address' => [
                    'recipient_name' => 'Priya Dharshini',
                    'recipient_phone' => '9842200002',
                    'address_line1' => '12/A, RM Colony 5th Cross',
                    'address_line2' => 'West Govindapuram',
                    'landmark' => 'Near CSI Church',
                    'city' => 'Dindigul',
                    'state' => 'Tamil Nadu',
                    'pincode' => '624001',
                    'address_type' => 'home',
                    'is_default' => true,
                ],
            ],
            [
                'name' => 'Kavitha Ramasamy',
                'email' => 'kavitha.customer@mydindigul.test',
                'phone' => '9842200003',
                'address' => [
                    'recipient_name' => 'Kavitha Ramasamy',
                    'recipient_phone' => '9842200003',
                    'address_line1' => 'Flat 203, Meenakshi Towers',
                    'address_line2' => 'Palani Road Bypass',
                    'landmark' => 'Near Collectorate',
                    'city' => 'Dindigul',
                    'state' => 'Tamil Nadu',
                    'pincode' => '624004',
                    'address_type' => 'home',
                    'is_default' => true,
                ],
            ],
            [
                'name' => 'Arun Karthick',
                'email' => 'arun.customer@mydindigul.test',
                'phone' => '9842200004',
                'address' => [
                    'recipient_name' => 'Arun Karthick',
                    'recipient_phone' => '9842200004',
                    'address_line1' => 'Shop 8, Big Bazaar Street',
                    'address_line2' => 'Main Market Area',
                    'landmark' => 'Near Clock Tower',
                    'city' => 'Dindigul',
                    'state' => 'Tamil Nadu',
                    'pincode' => '624001',
                    'address_type' => 'work',
                    'is_default' => true,
                ],
            ],
            [
                'name' => 'Manikandan Velu',
                'email' => 'manikandan.customer@mydindigul.test',
                'phone' => '9842200005',
                'address' => [
                    'recipient_name' => 'Manikandan Velu',
                    'recipient_phone' => '9842200005',
                    'address_line1' => '78, Begambur Mosque Street',
                    'address_line2' => 'Begambur',
                    'landmark' => 'Opposite Big Mosque',
                    'city' => 'Dindigul',
                    'state' => 'Tamil Nadu',
                    'pincode' => '624002',
                    'address_type' => 'home',
                    'is_default' => true,
                ],
            ],
            [
                'name' => 'Anitha Soundararajan',
                'email' => 'anitha.customer@mydindigul.test',
                'phone' => '9842200006',
                'address' => [
                    'recipient_name' => 'Anitha Soundararajan',
                    'recipient_phone' => '9842200006',
                    'address_line1' => '34, Nagal Nagar Main Road',
                    'address_line2' => 'Near Railway Junction',
                    'landmark' => 'Nagal Nagar Bus Stop',
                    'city' => 'Dindigul',
                    'state' => 'Tamil Nadu',
                    'pincode' => '624003',
                    'address_type' => 'home',
                    'is_default' => true,
                ],
            ],
        ];

        foreach ($customers as $cust) {
            $user = User::updateOrCreate(
                ['email' => $cust['email']],
                [
                    'name' => $cust['name'],
                    'phone' => $cust['phone'],
                    'password' => $defaultPassword,
                    'role' => 'customer',
                    'phone_verified_at' => now(),
                    'email_verified_at' => now(),
                    'avatar_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
                    'status' => 'active',
                ]
            );

            if (isset($cust['address'])) {
                UserAddress::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'address_type' => $cust['address']['address_type'],
                    ],
                    $cust['address']
                );
            }
        }
    }
}
