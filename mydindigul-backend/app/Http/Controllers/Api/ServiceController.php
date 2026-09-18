<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Vendor;
use App\Models\SubIndustry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    // Get all active services
    public function index()
    {
        $services = Service::where('status', 'active')
            ->with(['vendor', 'subIndustry'])
            ->latest()
            ->get();

        return response()->json([
            'services' => $services,
        ]);
    }

    // Get one active service
    public function show($id)
    {
        $service = Service::where('status', 'active')
            ->with(['vendor', 'subIndustry'])
            ->findOrFail($id);

        return response()->json([
            'service' => $service,
        ]);
    }

    // Get services belonging to a vendor
    public function byVendor($vendorId)
    {
        Vendor::findOrFail($vendorId);

        $services = Service::where('vendor_id', $vendorId)
            ->where('status', 'active')
            ->with(['vendor', 'subIndustry'])
            ->latest()
            ->get();

        return response()->json([
            'services' => $services,
        ]);
    }

    // Get services belonging to a sub-industry
    public function bySubIndustry($subIndustryId)
    {
        SubIndustry::findOrFail($subIndustryId);

        $services = Service::where('sub_industry_id', $subIndustryId)
            ->where('status', 'active')
            ->with(['vendor', 'subIndustry'])
            ->latest()
            ->get();

        return response()->json([
            'services' => $services,
        ]);
    }

    // Create service
    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'sub_industry_id' => 'nullable|exists:sub_industries,id',

            'title' => 'required|string|max:200',
            'slug' => 'nullable|string|max:191',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',

            'pricing_type' => 'required|in:fixed,starting_at,hourly,custom_quote',
            'price' => 'nullable|numeric|min:0',
            'discounted_price' => 'nullable|numeric|min:0',
            'duration' => 'nullable|string|max:50',
            'service_area' => 'nullable|string|max:255',

            'banner_image_url' => 'nullable|string|max:500',
            'images' => 'nullable|array',

            'is_featured' => 'nullable|boolean',
            'status' => 'nullable|in:active,inactive,draft',
        ]);

        // Make sure sub-industry belongs to the selected vendor's industry
        if (!empty($validated['sub_industry_id'])) {
            $vendor = Vendor::findOrFail($validated['vendor_id']);

            $validSubIndustry = SubIndustry::where('id', $validated['sub_industry_id'])
                ->where('industry_id', $vendor->industry_id)
                ->exists();

            if (!$validSubIndustry) {
                return response()->json([
                    'message' => 'The selected sub-industry does not belong to the vendor\'s industry.',
                ], 422);
            }
        }

        // Generate slug if not provided
        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']);

        // Make sure slug is unique for this vendor
        $existingSlug = Service::where('vendor_id', $validated['vendor_id'])
            ->where('slug', $validated['slug'])
            ->exists();

        if ($existingSlug) {
            return response()->json([
                'message' => 'A service with this slug already exists for this vendor.',
            ], 422);
        }

        $validated['status'] = $validated['status'] ?? 'draft';
        $validated['is_featured'] = $validated['is_featured'] ?? false;

        $service = Service::create($validated);

        return response()->json([
            'message' => 'Service created successfully',
            'service' => $service->load(['vendor', 'subIndustry']),
        ], 201);
    }

    // Update service
    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'vendor_id' => 'sometimes|exists:vendors,id',
            'sub_industry_id' => 'nullable|exists:sub_industries,id',

            'title' => 'sometimes|string|max:200',
            'slug' => 'sometimes|string|max:191',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',

            'pricing_type' => 'sometimes|in:fixed,starting_at,hourly,custom_quote',
            'price' => 'nullable|numeric|min:0',
            'discounted_price' => 'nullable|numeric|min:0',
            'duration' => 'nullable|string|max:50',
            'service_area' => 'nullable|string|max:255',

            'banner_image_url' => 'nullable|string|max:500',
            'images' => 'nullable|array',

            'is_featured' => 'sometimes|boolean',
            'status' => 'sometimes|in:active,inactive,draft',
        ]);

        $vendorId = $validated['vendor_id'] ?? $service->vendor_id;
        $subIndustryId = array_key_exists('sub_industry_id', $validated)
            ? $validated['sub_industry_id']
            : $service->sub_industry_id;

        // Validate sub-industry belongs to vendor's industry
        if ($subIndustryId) {
            $vendor = Vendor::findOrFail($vendorId);

            $validSubIndustry = SubIndustry::where('id', $subIndustryId)
                ->where('industry_id', $vendor->industry_id)
                ->exists();

            if (!$validSubIndustry) {
                return response()->json([
                    'message' => 'The selected sub-industry does not belong to the vendor\'s industry.',
                ], 422);
            }
        }

        // Check vendor + slug uniqueness
        if (isset($validated['slug'])) {
            $slugExists = Service::where('vendor_id', $vendorId)
                ->where('slug', $validated['slug'])
                ->where('id', '!=', $service->id)
                ->exists();

            if ($slugExists) {
                return response()->json([
                    'message' => 'A service with this slug already exists for this vendor.',
                ], 422);
            }
        }

        $service->update($validated);

        // Refresh database values
        $service->refresh();

        return response()->json([
            'message' => 'Service updated successfully',
            'service' => $service->load(['vendor', 'subIndustry']),
        ]);
    }

    // Delete service
    public function destroy($id)
    {
        $service = Service::findOrFail($id);

        $service->delete();

        return response()->json([
            'message' => 'Service deleted successfully',
        ]);
    }
}
