<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Vendor;
use App\Models\SubIndustry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('status', 'active')
            ->with(['vendor', 'subIndustry'])
            ->latest()
            ->get();

        return response()->json([
            'products' => $products,
        ]);
    }

    public function show($id)
    {
        $product = Product::where('status', 'active')
            ->with(['vendor', 'subIndustry'])
            ->findOrFail($id);

        return response()->json([
            'product' => $product,
        ]);
    }

    public function byVendor($vendorId)
    {
        Vendor::findOrFail($vendorId);

        $products = Product::where('vendor_id', $vendorId)
            ->where('status', 'active')
            ->with(['vendor', 'subIndustry'])
            ->latest()
            ->get();

        return response()->json([
            'products' => $products,
        ]);
    }

    public function bySubIndustry($subIndustryId)
    {
        SubIndustry::findOrFail($subIndustryId);

        $products = Product::where('sub_industry_id', $subIndustryId)
            ->where('status', 'active')
            ->with(['vendor', 'subIndustry'])
            ->latest()
            ->get();

        return response()->json([
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'sub_industry_id' => 'nullable|exists:sub_industries,id',
            'name' => 'required|string|max:200',
            'slug' => 'nullable|string|max:191',
            'sku' => 'nullable|string|max:100',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'regular_price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'unit' => 'nullable|string|max:50',
            'stock_status' => 'required|in:in_stock,out_of_stock,on_backorder',
            'stock_quantity' => 'nullable|integer|min:0',
            'thumbnail_url' => 'nullable|string|max:500',
            'gallery_urls' => 'nullable|array',
            'is_featured' => 'nullable|boolean',
            'status' => 'nullable|in:active,inactive,draft',
        ]);

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

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);

        $existingSlug = Product::where('vendor_id', $validated['vendor_id'])
            ->where('slug', $validated['slug'])
            ->exists();

        if ($existingSlug) {
            return response()->json([
                'message' => 'A product with this slug already exists for this vendor.',
            ], 422);
        }

        $validated['status'] = $validated['status'] ?? 'draft';
        $validated['is_featured'] = $validated['is_featured'] ?? false;

        $product = Product::create($validated);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product->load(['vendor', 'subIndustry']),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'vendor_id' => 'sometimes|exists:vendors,id',
            'sub_industry_id' => 'nullable|exists:sub_industries,id',
            'name' => 'sometimes|string|max:200',
            'slug' => 'sometimes|string|max:191',
            'sku' => 'nullable|string|max:100',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'regular_price' => 'sometimes|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'unit' => 'nullable|string|max:50',
            'stock_status' => 'sometimes|in:in_stock,out_of_stock,on_backorder',
            'stock_quantity' => 'nullable|integer|min:0',
            'thumbnail_url' => 'nullable|string|max:500',
            'gallery_urls' => 'nullable|array',
            'is_featured' => 'sometimes|boolean',
            'status' => 'sometimes|in:active,inactive,draft',
        ]);

        $vendorId = $validated['vendor_id'] ?? $product->vendor_id;

        $subIndustryId = array_key_exists('sub_industry_id', $validated)
            ? $validated['sub_industry_id']
            : $product->sub_industry_id;

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

        if (isset($validated['slug'])) {
            $slugExists = Product::where('vendor_id', $vendorId)
                ->where('slug', $validated['slug'])
                ->where('id', '!=', $product->id)
                ->exists();

            if ($slugExists) {
                return response()->json([
                    'message' => 'A product with this slug already exists for this vendor.',
                ], 422);
            }
        }

        $product->update($validated);
        $product->refresh();

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product->load(['vendor', 'subIndustry']),
        ]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }
}
