<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\Vendor;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function index()
    {
        $offers = Offer::with('vendor')
            ->where('status', 'active')
            ->latest('start_date')
            ->get();

        return response()->json([
            'offers' => $offers,
        ]);
    }

    public function show($id)
    {
        $offer = Offer::with('vendor')
            ->where('status', 'active')
            ->findOrFail($id);

        return response()->json([
            'offer' => $offer,
        ]);
    }

    public function byVendor($vendorId)
    {
        Vendor::findOrFail($vendorId);

        $offers = Offer::where('vendor_id', $vendorId)
            ->where('status', 'active')
            ->with('vendor')
            ->latest('start_date')
            ->get();

        return response()->json([
            'offers' => $offers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'nullable|exists:vendors,id',

            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:191|unique:offers,slug',

            'coupon_code' => 'nullable|string|max:50',

            'discount_type' => 'required|in:percentage,flat_amount',
            'discount_value' => 'required|numeric|min:0',

            'min_order_amount' => 'nullable|numeric|min:0',
            'max_discount_cap' => 'nullable|numeric|min:0',

            'banner_url' => 'nullable|string|max:500',

            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',

            'is_featured' => 'nullable|boolean',

            'status' => 'nullable|in:active,inactive,expired',
        ]);

        $validated['min_order_amount'] =
            $validated['min_order_amount'] ?? 0;

        $validated['is_featured'] =
            $validated['is_featured'] ?? false;

        $validated['status'] =
            $validated['status'] ?? 'active';

        $offer = Offer::create($validated);

        return response()->json([
            'message' => 'Offer created successfully',
            'offer' => $offer->load('vendor'),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $offer = Offer::findOrFail($id);

        $validated = $request->validate([
            'vendor_id' => 'nullable|exists:vendors,id',

            'title' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:191|unique:offers,slug,' . $id,

            'coupon_code' => 'nullable|string|max:50',

            'discount_type' => 'sometimes|in:percentage,flat_amount',
            'discount_value' => 'sometimes|numeric|min:0',

            'min_order_amount' => 'sometimes|numeric|min:0',
            'max_discount_cap' => 'nullable|numeric|min:0',

            'banner_url' => 'nullable|string|max:500',

            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date',

            'is_featured' => 'sometimes|boolean',

            'status' => 'sometimes|in:active,inactive,expired',
        ]);

        $offer->update($validated);
        $offer->refresh();

        return response()->json([
            'message' => 'Offer updated successfully',
            'offer' => $offer->load('vendor'),
        ]);
    }

    public function destroy($id)
    {
        $offer = Offer::findOrFail($id);

        $offer->delete();

        return response()->json([
            'message' => 'Offer deleted successfully',
        ]);
    }
}
