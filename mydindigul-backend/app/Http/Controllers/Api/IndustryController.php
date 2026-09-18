<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Industry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class IndustryController extends Controller
{
    // Get all active industries
    public function index()
    {
        $industries = Industry::where('status', 'active')
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'industries' => $industries,
        ]);
    }

    // Get one industry
    public function show($id)
    {
        $industry = Industry::where('status', 'active')
            ->findOrFail($id);

        return response()->json([
            'industry' => $industry,
        ]);
    }

    // Create industry
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150|unique:industries,name',
            'slug' => 'nullable|string|max:191|unique:industries,slug',
            'description' => 'nullable|string',
            'icon_url' => 'nullable|string|max:500',
            'banner_url' => 'nullable|string|max:500',
            'display_order' => 'nullable|integer|min:0',
            'status' => 'nullable|in:active,inactive',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);
        $validated['status'] = $validated['status'] ?? 'active';

        $industry = Industry::create($validated);

        return response()->json([
            'message' => 'Industry created successfully',
            'industry' => $industry,
        ], 201);
    }

    // Update industry
    public function update(Request $request, $id)
    {
        $industry = Industry::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:150|unique:industries,name,' . $id,
            'slug' => 'sometimes|string|max:191|unique:industries,slug,' . $id,
            'description' => 'nullable|string',
            'icon_url' => 'nullable|string|max:500',
            'banner_url' => 'nullable|string|max:500',
            'display_order' => 'sometimes|integer|min:0',
            'status' => 'sometimes|in:active,inactive',
        ]);

        $industry->update($validated);

        return response()->json([
            'message' => 'Industry updated successfully',
            'industry' => $industry,
        ]);
    }

    // Delete industry
    public function destroy($id)
    {
        $industry = Industry::findOrFail($id);

        $industry->delete();

        return response()->json([
            'message' => 'Industry deleted successfully',
        ]);
    }
}
