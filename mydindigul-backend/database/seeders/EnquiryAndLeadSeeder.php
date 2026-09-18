<?php

namespace Database\Seeders;

use App\Models\Enquiry;
use App\Models\Lead;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorCustomer;
use Illuminate\Database\Seeder;

class EnquiryAndLeadSeeder extends Seeder
{
    public function run(): void
    {
        $careClinic = Vendor::where('slug', 'dindigul-care-clinic')->first(); // Free vendor
        $thalappakatti = Vendor::where('slug', 'thalappakatti-biryani')->first(); // Premium vendor
        $lockWorks = Vendor::where('slug', 'dindigul-premier-lock-works')->first(); // Premium vendor

        $suresh = User::where('email', 'suresh.customer@mydindigul.test')->first();
        $priya = User::where('email', 'priya.customer@mydindigul.test')->first();
        $kavitha = User::where('email', 'kavitha.customer@mydindigul.test')->first();
        $arun = User::where('email', 'arun.customer@mydindigul.test')->first();
        $manikandan = User::where('email', 'manikandan.customer@mydindigul.test')->first();
        $anitha = User::where('email', 'anitha.customer@mydindigul.test')->first();

        $cateringService = Service::where('slug', 'outdoor-catering-wedding-biryani')->first();
        $diabeticService = Service::where('slug', 'diabetic-foot-evaluation')->first();
        $brassLockProduct = Product::where('slug', 'dindigul-7-lever-brass-padlock')->first();
        $biryaniProduct = Product::where('slug', 'dindigul-special-mutton-biryani')->first();

        // -------------------------------------------------------------
        // 1. FREE VENDOR: Dindigul Care Clinic (Limit: 5 Customers, 5 Leads)
        // -------------------------------------------------------------
        if ($careClinic) {
            $freeClinicCustomers = [
                ['name' => 'Ramesh Selvam', 'phone' => '9842300001', 'email' => 'ramesh.s@example.test', 'user_id' => $suresh?->id],
                ['name' => 'Sundaram Karuppiah', 'phone' => '9842300002', 'email' => 'sundaram.k@example.test', 'user_id' => null],
                ['name' => 'Meena Ramachandran', 'phone' => '9842300003', 'email' => 'meena.r@example.test', 'user_id' => $priya?->id],
                ['name' => 'Vijay Muthusamy', 'phone' => '9842300004', 'email' => 'vijay.m@example.test', 'user_id' => null],
                ['name' => 'Lakshmi Pitchai', 'phone' => '9842300005', 'email' => 'lakshmi.p@example.test', 'user_id' => $kavitha?->id],
            ];

            $clinicCustomerModels = [];
            foreach ($freeClinicCustomers as $cData) {
                $clinicCustomerModels[] = VendorCustomer::updateOrCreate(
                    [
                        'vendor_id' => $careClinic->id,
                        'phone' => $cData['phone'],
                    ],
                    [
                        'user_id' => $cData['user_id'],
                        'full_name' => $cData['name'],
                        'email' => $cData['email'],
                        'city' => 'Dindigul',
                        'total_orders_count' => 0,
                        'total_spend_amount' => 0.00,
                        'tags' => ['opd_patient', 'free_tier_customer'],
                        'status' => 'active',
                    ]
                );
            }

            // Create 5 Enquiries and 5 Leads for Care Clinic (Testing Free Masking & 5 Lead Limit)
            $clinicLeadData = [
                [
                    'customer' => $clinicCustomerModels[0],
                    'subject' => 'Diabetic Foot Checkup Appointment Enquiry',
                    'message' => 'Need consultation for numbness in feet for senior citizen father.',
                    'service_id' => $diabeticService?->id,
                    'source' => 'enquiry',
                    'est_value' => 500.00,
                    'status' => 'contacted',
                ],
                [
                    'customer' => $clinicCustomerModels[1],
                    'subject' => 'Master Health Package Inquiry',
                    'message' => 'Looking for complete blood profile package for two adults.',
                    'service_id' => null,
                    'source' => 'click_to_call',
                    'est_value' => 3798.00,
                    'status' => 'new',
                ],
                [
                    'customer' => $clinicCustomerModels[2],
                    'subject' => 'HbA1c Blood Test Home Collection',
                    'message' => 'Do you have early morning blood sample home collection in RM Colony?',
                    'service_id' => null,
                    'source' => 'whatsapp_click',
                    'est_value' => 600.00,
                    'status' => 'in_progress',
                ],
                [
                    'customer' => $clinicCustomerModels[3],
                    'subject' => 'Doctor Availability on Sunday',
                    'message' => 'Will Dr. Saravanan be available this Sunday morning for second opinion?',
                    'service_id' => null,
                    'source' => 'enquiry',
                    'est_value' => 500.00,
                    'status' => 'converted',
                ],
                [
                    'customer' => $clinicCustomerModels[4],
                    'subject' => 'Diabetes Medication Review',
                    'message' => 'Need to show current blood sugar reports and adjust dosage.',
                    'service_id' => $diabeticService?->id,
                    'source' => 'direct',
                    'est_value' => 500.00,
                    'status' => 'new',
                ],
            ];

            foreach ($clinicLeadData as $i => $item) {
                $cust = $item['customer'];
                $enquiry = Enquiry::updateOrCreate(
                    [
                        'vendor_id' => $careClinic->id,
                        'phone' => $cust->phone,
                    ],
                    [
                        'user_id' => $cust->user_id,
                        'service_id' => $item['service_id'],
                        'product_id' => null,
                        'name' => $cust->full_name,
                        'email' => $cust->email,
                        'subject' => $item['subject'],
                        'message' => $item['message'],
                        'preferred_contact_method' => 'call',
                        'status' => 'converted_to_lead',
                        'ip_address' => '127.0.0.1',
                    ]
                );

                // Free vendor rule: Lead phone MUST be masked!
                Lead::updateOrCreate(
                    [
                        'vendor_id' => $careClinic->id,
                        'enquiry_id' => $enquiry->id,
                    ],
                    [
                        'customer_id' => $cust->id,
                        'lead_source' => $item['source'],
                        'customer_name' => $cust->full_name,
                        'customer_phone' => $cust->phone,
                        'masked_phone' => Lead::maskPhoneNumber($cust->phone),
                        'is_phone_masked' => true, // Enforces Free vendor phone masking!
                        'customer_email' => $cust->email,
                        'requirement_details' => $item['message'],
                        'estimated_value' => $item['est_value'],
                        'lead_status' => $item['status'],
                        'notes' => 'Free vendor lead. Phone masked until upgraded to Premium.',
                    ]
                );
            }
        }

        // -------------------------------------------------------------
        // 2. PREMIUM VENDOR: Thalappakatti Biryani (Uncapped, Unmasked)
        // -------------------------------------------------------------
        if ($thalappakatti) {
            $thalaCustomers = [
                ['name' => 'Suresh Kumar', 'phone' => '9842200001', 'email' => 'suresh.customer@mydindigul.test', 'user_id' => $suresh?->id, 'orders' => 4, 'spend' => 4850.00],
                ['name' => 'Priya Dharshini', 'phone' => '9842200002', 'email' => 'priya.customer@mydindigul.test', 'user_id' => $priya?->id, 'orders' => 2, 'spend' => 2200.00],
                ['name' => 'Arun Karthick', 'phone' => '9842200004', 'email' => 'arun.customer@mydindigul.test', 'user_id' => $arun?->id, 'orders' => 5, 'spend' => 7400.00],
                ['name' => 'Manikandan Velu', 'phone' => '9842200005', 'email' => 'manikandan.customer@mydindigul.test', 'user_id' => $manikandan?->id, 'orders' => 3, 'spend' => 3100.00],
                ['name' => 'Anitha Soundararajan', 'phone' => '9842200006', 'email' => 'anitha.customer@mydindigul.test', 'user_id' => $anitha?->id, 'orders' => 1, 'spend' => 1599.00],
                ['name' => 'Vasanth Rajan', 'phone' => '9842400001', 'email' => 'vasanth.rajan@example.test', 'user_id' => null, 'orders' => 6, 'spend' => 9800.00],
                ['name' => 'Deepa Natarajan', 'phone' => '9842400002', 'email' => 'deepa.n@example.test', 'user_id' => null, 'orders' => 2, 'spend' => 2800.00],
            ];

            $thalaCustomerModels = [];
            foreach ($thalaCustomers as $cData) {
                $thalaCustomerModels[] = VendorCustomer::updateOrCreate(
                    [
                        'vendor_id' => $thalappakatti->id,
                        'phone' => $cData['phone'],
                    ],
                    [
                        'user_id' => $cData['user_id'],
                        'full_name' => $cData['name'],
                        'email' => $cData['email'],
                        'city' => 'Dindigul',
                        'total_orders_count' => $cData['orders'],
                        'total_spend_amount' => $cData['spend'],
                        'tags' => ['vip_dining', 'biryani_regular'],
                        'status' => 'active',
                    ]
                );
            }

            // Leads for Thalappakatti (Premium: Phone is NOT masked!)
            $thalaLeads = [
                [
                    'customer' => $thalaCustomerModels[0],
                    'source' => 'enquiry',
                    'subject' => 'Wedding Reception Biryani Catering for 500 Persons',
                    'message' => 'Requesting quote for live wood-fire mutton biryani catering for daughter\'s wedding reception at Spencer Hall.',
                    'service_id' => $cateringService?->id,
                    'product_id' => null,
                    'est_value' => 145000.00,
                    'status' => 'in_progress',
                ],
                [
                    'customer' => $thalaCustomerModels[2],
                    'source' => 'whatsapp_click',
                    'subject' => 'Corporate Bulk Lunch Boxes for 80 Employees',
                    'message' => 'Weekly Friday corporate lunch order with chicken 65 and gulab jamun dessert.',
                    'service_id' => null,
                    'product_id' => $biryaniProduct?->id,
                    'est_value' => 26400.00,
                    'status' => 'converted',
                ],
                [
                    'customer' => $thalaCustomerModels[5],
                    'source' => 'catalogue_download',
                    'subject' => 'Family Birthday Party Bucket Order',
                    'message' => 'Need 3 family party packs delivered to Nagal Nagar on Sunday afternoon.',
                    'service_id' => null,
                    'product_id' => $biryaniProduct?->id,
                    'est_value' => 4797.00,
                    'status' => 'contacted',
                ],
            ];

            foreach ($thalaLeads as $tLead) {
                $cust = $tLead['customer'];
                $enquiry = Enquiry::updateOrCreate(
                    [
                        'vendor_id' => $thalappakatti->id,
                        'phone' => $cust->phone,
                    ],
                    [
                        'user_id' => $cust->user_id,
                        'service_id' => $tLead['service_id'],
                        'product_id' => $tLead['product_id'],
                        'name' => $cust->full_name,
                        'email' => $cust->email,
                        'subject' => $tLead['subject'],
                        'message' => $tLead['message'],
                        'preferred_contact_method' => 'whatsapp',
                        'status' => 'converted_to_lead',
                        'ip_address' => '127.0.0.1',
                    ]
                );

                // Premium Vendor rule: phone masking is FALSE, full phone visible
                Lead::updateOrCreate(
                    [
                        'vendor_id' => $thalappakatti->id,
                        'enquiry_id' => $enquiry->id,
                    ],
                    [
                        'customer_id' => $cust->id,
                        'lead_source' => $tLead['source'],
                        'customer_name' => $cust->full_name,
                        'customer_phone' => $cust->phone,
                        'masked_phone' => Lead::maskPhoneNumber($cust->phone),
                        'is_phone_masked' => false, // Premium vendor gets full phone access!
                        'customer_email' => $cust->email,
                        'requirement_details' => $tLead['message'],
                        'estimated_value' => $tLead['est_value'],
                        'lead_status' => $tLead['status'],
                        'notes' => 'Premium vendor lead with full direct phone contact enabled.',
                    ]
                );
            }
        }

        // -------------------------------------------------------------
        // 3. PREMIUM VENDOR: Lock Works (GI Tagged Locks)
        // -------------------------------------------------------------
        if ($lockWorks) {
            $lockCustomer = VendorCustomer::updateOrCreate(
                [
                    'vendor_id' => $lockWorks->id,
                    'phone' => '9842500001',
                ],
                [
                    'user_id' => $arun?->id,
                    'full_name' => 'Arun Karthick Hardware',
                    'email' => 'arun.hardware@example.test',
                    'city' => 'Dindigul',
                    'total_orders_count' => 3,
                    'total_spend_amount' => 24500.00,
                    'tags' => ['wholesale_lock_dealer'],
                    'status' => 'active',
                ]
            );

            $enquiry = Enquiry::updateOrCreate(
                [
                    'vendor_id' => $lockWorks->id,
                    'phone' => $lockCustomer->phone,
                ],
                [
                    'user_id' => $arun?->id,
                    'service_id' => null,
                    'product_id' => $brassLockProduct?->id,
                    'name' => $lockCustomer->full_name,
                    'email' => $lockCustomer->email,
                    'subject' => 'Wholesale Order for 50 Brass 7-Lever Padlocks',
                    'message' => 'Supplying hardware stores across Coimbatore and Pollachi. Need wholesale pricing for authentic GI tag certified locks.',
                    'preferred_contact_method' => 'call',
                    'status' => 'converted_to_lead',
                    'ip_address' => '127.0.0.1',
                ]
            );

            Lead::updateOrCreate(
                [
                    'vendor_id' => $lockWorks->id,
                    'enquiry_id' => $enquiry->id,
                ],
                [
                    'customer_id' => $lockCustomer->id,
                    'lead_source' => 'enquiry',
                    'customer_name' => $lockCustomer->full_name,
                    'customer_phone' => $lockCustomer->phone,
                    'masked_phone' => Lead::maskPhoneNumber($lockCustomer->phone),
                    'is_phone_masked' => false, // Premium vendor
                    'customer_email' => $lockCustomer->email,
                    'requirement_details' => 'Wholesale dealership bulk supply order.',
                    'estimated_value' => 75000.00,
                    'lead_status' => 'in_progress',
                    'notes' => 'Quoted special wholesale rate with free transport to Coimbatore.',
                ]
            );
        }
    }
}
