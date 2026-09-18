<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SubIndustry;
use App\Models\Industry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SubIndustryController extends Controller
{
    // Get all active sub-industries
    public function index()
    {
        $subIndustries = SubIndustry::where('status', 'active')
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'sub_industries' => $subIndustries,
        ]);
    }

    // Get sub-industries under a specific industry
    public function byIndustry($industryId)
    {
        Industry::findOrFail($industryId);

        $subIndustries = SubIndustry::where('industry_id', $industryId)
            ->where('status', 'active')
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'sub_industries' => $subIndustries,
        ]);
    }

    // Get one sub-industry
    public function show($id)
    {
        $subIndustry = SubIndustry::where('status', 'active')
            ->findOrFail($id);

        return response()->json([
            'sub_industry' => $subIndustry,
        ]);
    }

    // Create sub-industry
    public function store(Request $request)
    {
        $validated = $request->validate([
            'industry_id' => 'required|exists:industries,id',
            'name' => 'required|string|max:150',
            'slug' => 'nullable|string|max:191|unique:sub_industries,slug',
            'description' => 'nullable|string',
            'icon_url' => 'nullable|string|max:500',
            'display_order' => 'nullable|integer|min:0',
            'status' => 'nullable|in:active,inactive',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);
        $validated['status'] = $validated['status'] ?? 'active';

        $subIndustry = SubIndustry::create($validated);

        return response()->json([
            'message' => 'Sub-industry created successfully',
            'sub_industry' => $subIndustry,
        ], 201);
    }

    // Update sub-industry
    public function update(Request $request, $id)
    {
        $subIndustry = SubIndustry::findOrFail($id);

        $validated = $request->validate([
            'industry_id' => 'sometimes|exists:industries,id',
            'name' => 'sometimes|string|max:150',
            'slug' => 'sometimes|string|max:191|unique:sub_industries,slug,' . $id,
            'description' => 'nullable|string',
            'icon_url' => 'nullable|string|max:500',
            'display_order' => 'sometimes|integer|min:0',
            'status' => 'sometimes|in:active,inactive',
        ]);

        $subIndustry->update($validated);

        return response()->json([
            'message' => 'Sub-industry updated successfully',
            'sub_industry' => $subIndustry,
        ]);
    }

    // Delete sub-industry
    public function destroy($id)
    {
        $subIndustry = SubIndustry::findOrFail($id);

        $subIndustry->delete();

        return response()->json([
            'message' => 'Sub-industry deleted successfully',
        ]);
    }
}
