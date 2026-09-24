<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VendorDashboardController extends Controller
{
    /**
     * Get dashboard data for the currently logged-in vendor.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Make sure the logged-in user is a vendor.
        if (!$user || $user->role !== 'vendor') {
            return response()->json([
                'message' => 'Only vendor accounts can access the vendor dashboard.',
            ], 403);
        }

        // Get the vendor owned by this user.
        $vendor = $user->vendor;

        if (!$vendor) {
            return response()->json([
                'message' => 'Vendor profile not found.',
            ], 404);
        }

        // Basic dashboard statistics.
        $stats = [
            'services' => $vendor->services()->count(),
            'products' => $vendor->products()->count(),
            'customers' => $vendor->customers()->count(),
            'leads' => $vendor->leads()->count(),
            'orders' => $vendor->orders()->count(),
            'jobs' => $vendor->jobPostings()->count(),
            'events' => $vendor->events()->count(),
            'offers' => $vendor->offers()->count(),
            'visitors' => $vendor->view_count ?? 0,
        ];

        // Recent leads.
        $recentLeads = $vendor->leads()
            ->latest()
            ->take(5)
            ->get();

        // Recent orders.
        $recentOrders = $vendor->orders()
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'vendor' => $vendor->load([
                'industry',
                'subIndustry',
            ]),

            'plan' => [
                'type' => $vendor->plan_type,
                'status' => $vendor->plan_status,
                'expires_at' => $vendor->plan_expires_at,
                'is_premium' => $vendor->isPremium(),
            ],

            'stats' => $stats,

            'limits' => [
                'customers' => [
                    'used' => $stats['customers'],
                    'max' => $vendor->isPremium()
                        ? null
                        : $vendor::FREE_CUSTOMER_LIMIT,
                ],
                'leads' => [
                    'used' => $stats['leads'],
                    'max' => $vendor->isPremium()
                        ? null
                        : $vendor::FREE_LEAD_LIMIT,
                ],
                'active_jobs' => [
                    'used' => $vendor->jobPostings()
                        ->where('status', 'active')
                        ->count(),
                    'max' => $vendor->isPremium()
                        ? null
                        : $vendor::FREE_ACTIVE_JOB_LIMIT,
                ],
                'events' => [
                    'used' => $stats['events'],
                    'max' => $vendor->isPremium()
                        ? null
                        : $vendor::FREE_EVENT_LIMIT,
                ],
            ],

            'recent_leads' => $recentLeads,
            'recent_orders' => $recentOrders,
        ]);
    }
}