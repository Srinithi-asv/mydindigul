<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use App\Models\Visitor;
use App\Models\VisitorAnalytic;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VisitorAnalyticsController extends Controller
{
    public function trackVendorView(Request $request, Vendor $vendor)
    {
        $validated = $request->validate([
            'visitor_uuid' => ['nullable', 'uuid'],
            'page_url' => ['nullable', 'string', 'max:2048'],
        ]);

        $uuid = $validated['visitor_uuid'] ?? (string) Str::uuid();

       $visitor = Visitor::firstOrCreate(
    ['visitor_uuid' => $uuid],
    [
        'ip_address' => $request->ip(),
        'user_agent' => $request->userAgent(),
        'first_visit_at' => now(),
        'last_visit_at' => now(),
        'device_type' => 'unknown',
    ]
);

        $visitor->update(['last_visit_at' => now()]);

        VisitorAnalytic::create([
            'visitor_id' => $visitor->id,
            'vendor_id' => $vendor->id,
            'entity_type' => 'vendor',
            'entity_id' => $vendor->id,
            'event_type' => 'vendor_profile_view',
            'page_url' => $validated['page_url'] ?? null,
            'created_at' => now(),
        ]);

        $vendor->increment('view_count');

        return response()->json([
            'message' => 'Visitor tracked successfully.',
        ], 201);
    }
}