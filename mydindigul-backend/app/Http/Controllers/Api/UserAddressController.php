<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserAddress;
use Illuminate\Http\Request;

class UserAddressController extends Controller
{
    /**
     * Get all addresses of the logged-in user.
     */
    public function index(Request $request)
    {
        $addresses = UserAddress::where('user_id', $request->user()->id)
            ->orderByDesc('is_default')
            ->latest()
            ->get();

        return response()->json([
            'addresses' => $addresses,
        ]);
    }

    /**
     * Create a new address.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'address_type' => 'required|in:home,work,billing,shipping',
            'is_default' => 'nullable|boolean',
            'recipient_name' => 'required|string|max:150',
            'recipient_phone' => 'required|string|max:20',
            'address_line1' => 'required|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'landmark' => 'nullable|string|max:150',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'pincode' => 'required|string|max:10',
        ]);

        $userId = $request->user()->id;

        // If this address is marked as default,
        // remove default status from the user's other addresses.
        if ($validated['is_default'] ?? false) {
            UserAddress::where('user_id', $userId)
                ->update(['is_default' => false]);
        }

        $address = UserAddress::create([
            'user_id' => $userId,
            ...$validated,
        ]);

        return response()->json([
            'message' => 'Address added successfully',
            'address' => $address,
        ], 201);
    }

    /**
     * Get one address belonging to the logged-in user.
     */
    public function show(Request $request, $id)
    {
        $address = UserAddress::where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json([
            'address' => $address,
        ]);
    }

    /**
     * Update an address.
     */
    public function update(Request $request, $id)
    {
        $address = UserAddress::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'address_type' => 'sometimes|in:home,work,billing,shipping',
            'is_default' => 'sometimes|boolean',
            'recipient_name' => 'sometimes|string|max:150',
            'recipient_phone' => 'sometimes|string|max:20',
            'address_line1' => 'sometimes|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'landmark' => 'nullable|string|max:150',
            'city' => 'sometimes|string|max:100',
            'state' => 'sometimes|string|max:100',
            'pincode' => 'sometimes|string|max:10',
        ]);

        if (($validated['is_default'] ?? false) === true) {
            UserAddress::where('user_id', $request->user()->id)
                ->where('id', '!=', $address->id)
                ->update(['is_default' => false]);
        }

        $address->update($validated);

        return response()->json([
            'message' => 'Address updated successfully',
            'address' => $address,
        ]);
    }

    /**
     * Delete an address.
     */
    public function destroy(Request $request, $id)
    {
        $address = UserAddress::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $address->delete();

        return response()->json([
            'message' => 'Address deleted successfully',
        ]);
    }
}