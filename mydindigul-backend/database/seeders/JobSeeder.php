<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use App\Models\JobPosting;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $thalappakatti = Vendor::where('slug', 'thalappakatti-biryani')->first();
        $lockWorks = Vendor::where('slug', 'dindigul-premier-lock-works')->first();
        $careClinic = Vendor::where('slug', 'dindigul-care-clinic')->first(); // Free vendor: max 1 active job
        $citySpark = Vendor::where('slug', 'city-spark-electricians')->first(); // Free vendor: closed job
        $kodaiGateway = Vendor::where('slug', 'kodai-gateway-tours')->first(); // Expired job

        $suresh = User::where('email', 'suresh.customer@mydindigul.test')->first();
        $priya = User::where('email', 'priya.customer@mydindigul.test')->first();
        $arun = User::where('email', 'arun.customer@mydindigul.test')->first();

        $jobs = [
            // 1. Thalappakatti (Premium): Active Job
            [
                'vendor_id' => $thalappakatti?->id,
                'title' => 'Head Chef - Traditional Seeraga Samba Dum Biryani',
                'slug' => 'head-chef-seeraga-samba-biryani',
                'job_type' => 'full_time',
                'workplace_type' => 'on_site',
                'location' => 'Grand Trunk Road, Dindigul',
                'experience_min' => 5,
                'experience_max' => 12,
                'salary_min' => 35000.00,
                'salary_max' => 55000.00,
                'salary_type' => 'per_month',
                'vacancies_count' => 2,
                'qualification' => 'Culinary Certificate / Experienced Master Chef in Dum Biryani',
                'skills_required' => ['Firewood Dum Cooking', 'Meat Marination', 'Kitchen Staff Leadership', 'Food Hygiene'],
                'description' => 'Seeking an experienced South Indian Master Biryani Chef to oversee cooking operations, maintain traditional recipe consistency, and train junior chefs.',
                'benefits' => 'Free accommodation, duty meals, annual performance bonus, and health cover.',
                'application_deadline' => now()->addDays(30)->toDateString(),
                'contact_email' => 'careers@thalappakatti-dindigul.test',
                'contact_phone' => '9842100001',
                'status' => 'active',
            ],
            // 2. Thalappakatti (Premium): Closed Job (testing status)
            [
                'vendor_id' => $thalappakatti?->id,
                'title' => 'Restaurant Cashier & Billing Operator',
                'slug' => 'restaurant-cashier-billing',
                'job_type' => 'full_time',
                'workplace_type' => 'on_site',
                'location' => 'Grand Trunk Road, Dindigul',
                'experience_min' => 1,
                'experience_max' => 3,
                'salary_min' => 16000.00,
                'salary_max' => 20000.00,
                'salary_type' => 'per_month',
                'vacancies_count' => 1,
                'qualification' => 'Any Degree / B.Com preferred with POS software knowledge',
                'skills_required' => ['POS Billing', 'Cash Handling', 'Customer Service', 'Excel'],
                'description' => 'Operate POS counter, process cash and UPI payments, reconcile daily sales registers.',
                'benefits' => 'Duty meals and ESI/PF.',
                'application_deadline' => now()->subDays(10)->toDateString(),
                'contact_email' => 'careers@thalappakatti-dindigul.test',
                'contact_phone' => '9842100001',
                'status' => 'closed',
            ],

            // 3. Lock Works (Premium): Active Job
            [
                'vendor_id' => $lockWorks?->id,
                'title' => 'Master Brass Locksmith & Lever Assembler',
                'slug' => 'master-brass-locksmith-assembler',
                'job_type' => 'full_time',
                'workplace_type' => 'on_site',
                'location' => 'Nagal Nagar, Dindigul',
                'experience_min' => 3,
                'experience_max' => 15,
                'salary_min' => 22000.00,
                'salary_max' => 32000.00,
                'salary_type' => 'per_month',
                'vacancies_count' => 3,
                'qualification' => 'ITI Fitter / Traditional Blacksmith Craft Apprenticeship',
                'skills_required' => ['Brass Filing', 'Lever Tuning', 'Key Cutting', 'Die Fitting'],
                'description' => 'Hand filing and precise assembly of 7-lever and 9-lever high security brass locks according to historical Dindigul GI craftsmanship standards.',
                'benefits' => 'Incentives per completed batch, tool allowance, festival bonus.',
                'application_deadline' => now()->addDays(45)->toDateString(),
                'contact_email' => 'crafts@dindigullocks.test',
                'contact_phone' => '9842100002',
                'status' => 'active',
            ],

            // 4. Dindigul Care Clinic (Free Vendor: EXACTLY 1 active job to honor Free limit rule)
            [
                'vendor_id' => $careClinic?->id,
                'title' => 'Staff Nurse (Day Shift OPD & Blood Collection)',
                'slug' => 'staff-nurse-opd-dindigul',
                'job_type' => 'full_time',
                'workplace_type' => 'on_site',
                'location' => 'Palani Main Road, Dindigul',
                'experience_min' => 1,
                'experience_max' => 5,
                'salary_min' => 18000.00,
                'salary_max' => 24000.00,
                'salary_type' => 'per_month',
                'vacancies_count' => 2,
                'qualification' => 'GNM or B.Sc Nursing with Tamil Nadu Nursing Council registration',
                'skills_required' => ['Phlebotomy', 'Patient Vitals', 'ECG Recording', 'IV Infusion'],
                'description' => 'Assist doctor in general consultation OPD, administer vaccinations, record vitals, and collect blood samples for pathology.',
                'benefits' => 'Regular day shifts only (no night shifts), subsidized clinic treatments.',
                'application_deadline' => now()->addDays(20)->toDateString(),
                'contact_email' => 'nursing@dindigulcareclinic.test',
                'contact_phone' => '9842100003',
                'status' => 'active',
            ],

            // 5. Kodai Gateway (Expired Job testing)
            [
                'vendor_id' => $kodaiGateway?->id,
                'title' => 'Hill Driving Taxi Chauffeur (Innova & Etios)',
                'slug' => 'hill-driving-taxi-chauffeur',
                'job_type' => 'full_time',
                'workplace_type' => 'on_site',
                'location' => 'Railway Station Road, Dindigul',
                'experience_min' => 3,
                'experience_max' => 10,
                'salary_min' => 20000.00,
                'salary_max' => 26000.00,
                'salary_type' => 'per_month',
                'vacancies_count' => 4,
                'qualification' => 'Commercial Driving License with Hill Station Driving Badge',
                'skills_required' => ['Ghat Road Driving', 'Vehicle Maintenance', 'Polite Mannerisms', 'Basic English/Hindi'],
                'description' => 'Driving tourist groups safely along Dindigul to Kodaikanal hairpin bends, vehicle daily upkeep, and punctual station pickups.',
                'benefits' => 'Daily trip bata, uniform, performance tips retention.',
                'application_deadline' => now()->subDays(20)->toDateString(),
                'contact_email' => 'drivers@kodaigateway.test',
                'contact_phone' => '9842100005',
                'status' => 'expired',
            ],
        ];

        foreach ($jobs as $jData) {
            if (! $jData['vendor_id']) {
                continue;
            }

            $job = JobPosting::updateOrCreate(
                ['slug' => $jData['slug']],
                $jData
            );

            // Create sample applications for active jobs
            if ($job->slug === 'head-chef-seeraga-samba-biryani' && $suresh) {
                JobApplication::updateOrCreate(
                    [
                        'job_posting_id' => $job->id,
                        'applicant_email' => $suresh->email,
                    ],
                    [
                        'vendor_id' => $job->vendor_id,
                        'user_id' => $suresh->id,
                        'applicant_name' => $suresh->name,
                        'applicant_phone' => $suresh->phone,
                        'current_company' => 'Hotel Venu Biryani Dindigul',
                        'years_experience' => 6.5,
                        'expected_salary' => 45000.00,
                        'resume_file_url' => 'https://mydindigul.test/resumes/suresh-chef-resume.pdf',
                        'cover_letter' => 'I have 6.5 years experience as a specialist in Dindigul Seeraga Samba mutton dum biryani cooking with genuine wood-fire technique.',
                        'application_status' => 'shortlisted',
                        'vendor_notes' => 'Candidate invited for live trial cooking session this Saturday.',
                    ]
                );
            }

            if ($job->slug === 'staff-nurse-opd-dindigul' && $priya) {
                JobApplication::updateOrCreate(
                    [
                        'job_posting_id' => $job->id,
                        'applicant_email' => $priya->email,
                    ],
                    [
                        'vendor_id' => $job->vendor_id,
                        'user_id' => $priya->id,
                        'applicant_name' => $priya->name,
                        'applicant_phone' => $priya->phone,
                        'current_company' => 'St. Joseph Hospital Dindigul',
                        'years_experience' => 3.0,
                        'expected_salary' => 22000.00,
                        'resume_file_url' => 'https://mydindigul.test/resumes/priya-nurse-resume.pdf',
                        'cover_letter' => 'B.Sc Nursing graduate registered with Tamil Nadu Nursing Council, experienced in blood draw and patient counseling.',
                        'application_status' => 'applied',
                        'vendor_notes' => 'Certificates verified. Schedule interview with Dr. Saravanan.',
                    ]
                );
            }

            if ($job->slug === 'master-brass-locksmith-assembler' && $arun) {
                JobApplication::updateOrCreate(
                    [
                        'job_posting_id' => $job->id,
                        'applicant_email' => $arun->email,
                    ],
                    [
                        'vendor_id' => $job->vendor_id,
                        'user_id' => $arun->id,
                        'applicant_name' => $arun->name,
                        'applicant_phone' => $arun->phone,
                        'current_company' => 'Sri Krishna Lock Foundry',
                        'years_experience' => 4.0,
                        'expected_salary' => 28000.00,
                        'resume_file_url' => 'https://mydindigul.test/resumes/arun-locksmith-resume.pdf',
                        'cover_letter' => 'Trained in Dindigul traditional 7-lever brass lock crafting and key-matching.',
                        'application_status' => 'interview_scheduled',
                        'vendor_notes' => 'Workshop trial scheduled for Monday morning.',
                    ]
                );
            }
        }
    }
}
