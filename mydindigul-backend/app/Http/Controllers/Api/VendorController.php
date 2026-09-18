<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use App\Models\Industry;
use App\Models\SubIndustry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VendorController extends Controller
{
    // Get all active vendors
    public function index()
    {
        $vendors = Vendor::where('status', 'active')
            ->with(['industry', 'subIndustry'])
            ->latest()
            ->get();

        return response()->json([
            'vendors' => $vendors,
        ]);
    }

    // Get one vendor
    public function show($id)
    {
        $vendor = Vendor::where('status', 'active')
            ->with(['industry', 'subIndustry'])
            ->findOrFail($id);

        return response()->json([
            'vendor' => $vendor,
        ]);
    }

    // Create vendor
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:vendors,user_id',
            'industry_id' => 'required|exists:industries,id',
            'sub_industry_id' => 'nullable|exists:sub_industries,id',

            'business_name' => 'required|string|max:200',
            'slug' => 'nullable|string|max:191|unique:vendors,slug',
            'tagline' => 'nullable|string|max:255',
            'about_us' => 'nullable|string',

            'company_registration_no' => 'nullable|string|max:100',
            'gst_number' => 'nullable|string|max:30',
            'pan_number' => 'nullable|string|max:20',

            'logo_url' => 'nullable|string|max:500',
            'cover_url' => 'nullable|string|max:500',

            'contact_person' => 'nullable|string|max:150',
            'phone' => 'required|string|max:20',
            'whatsapp_number' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:191',
            'website_url' => 'nullable|string|max:500',

            'address_line1' => 'required|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'pincode' => 'required|string|max:10',

            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'map_location_url' => 'nullable|string',

            'terms_and_conditions' => 'nullable|string',
            'privacy_policy' => 'nullable|string',

            'verification_status' => 'nullable|in:pending,approved,rejected',
            'rejection_reason' => 'nullable|string',

            'plan_type' => 'nullable|in:free,premium',
            'plan_status' => 'nullable|in:active,expired,locked',
            'plan_expires_at' => 'nullable|date',

            'is_verified' => 'nullable|boolean',
            'is_featured' => 'nullable|boolean',

            'social_links' => 'nullable|array',
            'status' => 'nullable|in:active,inactive,suspended',
        ]);

        // Make sure the selected sub-industry belongs to the selected industry
        if (!empty($validated['sub_industry_id'])) {
            $validSubIndustry = SubIndustry::where('id', $validated['sub_industry_id'])
                ->where('industry_id', $validated['industry_id'])
                ->exists();

            if (!$validSubIndustry) {
                return response()->json([
                    'message' => 'The selected sub-industry does not belong to the selected industry.',
                ], 422);
            }
        }

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['business_name']);
        $validated['city'] = $validated['city'] ?? 'Dindigul';
        $validated['verification_status'] = $validated['verification_status'] ?? 'pending';
        $validated['plan_type'] = $validated['plan_type'] ?? 'free';
        $validated['plan_status'] = $validated['plan_status'] ?? 'active';
        $validated['status'] = $validated['status'] ?? 'active';

        $vendor = Vendor::create($validated);

        return response()->json([
            'message' => 'Vendor created successfully',
            'vendor' => $vendor->load(['industry', 'subIndustry']),
        ], 201);
    }

    // Update vendor
    public function update(Request $request, $id)
    {
        $vendor = Vendor::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id|unique:vendors,user_id,' . $id,
            'industry_id' => 'sometimes|exists:industries,id',
            'sub_industry_id' => 'nullable|exists:sub_industries,id',

            'business_name' => 'sometimes|string|max:200',
            'slug' => 'sometimes|string|max:191|unique:vendors,slug,' . $id,
            'tagline' => 'nullable|string|max:255',
            'about_us' => 'nullable|string',

            'company_registration_no' => 'nullable|string|max:100',
            'gst_number' => 'nullable|string|max:30',
            'pan_number' => 'nullable|string|max:20',

            'logo_url' => 'nullable|string|max:500',
            'cover_url' => 'nullable|string|max:500',

            'contact_person' => 'nullable|string|max:150',
            'phone' => 'sometimes|string|max:20',
            'whatsapp_number' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:191',
            'website_url' => 'nullable|string|max:500',

            'address_line1' => 'sometimes|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'city' => 'sometimes|string|max:100',
            'pincode' => 'sometimes|string|max:10',

            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'map_location_url' => 'nullable|string',

            'terms_and_conditions' => 'nullable|string',
            'privacy_policy' => 'nullable|string',

            'verification_status' => 'sometimes|in:pending,approved,rejected',
            'rejection_reason' => 'nullable|string',

            'plan_type' => 'sometimes|in:free,premium',
            'plan_status' => 'sometimes|in:active,expired,locked',
            'plan_expires_at' => 'nullable|date',

            'is_verified' => 'sometimes|boolean',
            'is_featured' => 'sometimes|boolean',

            'social_links' => 'nullable|array',
            'status' => 'sometimes|in:active,inactive,suspended',
        ]);

        $industryId = $validated['industry_id'] ?? $vendor->industry_id;
        $subIndustryId = $validated['sub_industry_id'] ?? $vendor->sub_industry_id;

        if ($subIndustryId) {
            $validSubIndustry = SubIndustry::where('id', $subIndustryId)
                ->where('industry_id', $industryId)
                ->exists();

            if (!$validSubIndustry) {
                return response()->json([
                    'message' => 'The selected sub-industry does not belong to the selected industry.',
                ], 422);
            }
        }

        $vendor->update($validated);
        $vendor->refresh();

        return response()->json([
            'message' => 'Vendor updated successfully',
            'vendor' => $vendor->load(['industry', 'subIndustry']),
        ]);
    }

    // Delete vendor
    public function destroy($id)
    {
        $vendor = Vendor::findOrFail($id);

        $vendor->delete();

        return response()->json([
            'message' => 'Vendor deleted successfully',
        ]);
    }
}
