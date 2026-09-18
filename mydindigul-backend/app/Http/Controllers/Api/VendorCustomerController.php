<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VendorCustomer;
use App\Models\Vendor;
use Illuminate\Http\Request;

class VendorCustomerController extends Controller
{
    public function index()
    {
        $customers = VendorCustomer::with(['vendor', 'user'])
            ->latest()
            ->get();

        return response()->json([
            'vendor_customers' => $customers,
        ]);
    }

    public function show($id)
    {
        $customer = VendorCustomer::with(['vendor', 'user'])
            ->findOrFail($id);

        return response()->json([
            'vendor_customer' => $customer,
        ]);
    }

    public function byVendor($vendorId)
    {
        Vendor::findOrFail($vendorId);

        $customers = VendorCustomer::where('vendor_id', $vendorId)
            ->with(['vendor', 'user'])
            ->latest()
            ->get();

        return response()->json([
            'vendor_customers' => $customers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'user_id' => 'nullable|exists:users,id',

            'full_name' => 'required|string|max:150',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:191',
            'city' => 'required|string|max:100',

            'total_orders_count' => 'nullable|integer|min:0',
            'total_spend_amount' => 'nullable|numeric|min:0',

            'tags' => 'nullable|array',

            'status' => 'nullable|in:active,blocked',
        ]);

        $validated['total_orders_count'] =
            $validated['total_orders_count'] ?? 0;

        $validated['total_spend_amount'] =
            $validated['total_spend_amount'] ?? 0;

        $validated['status'] =
            $validated['status'] ?? 'active';

        $customer = VendorCustomer::create($validated);

        return response()->json([
            'message' => 'Vendor customer created successfully',
            'vendor_customer' =>
                $customer->load(['vendor', 'user']),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $customer = VendorCustomer::findOrFail($id);

        $validated = $request->validate([
            'full_name' => 'sometimes|string|max:150',
            'phone' => 'sometimes|string|max:20',
            'email' => 'nullable|email|max:191',
            'city' => 'sometimes|string|max:100',

            'total_orders_count' => 'sometimes|integer|min:0',
            'total_spend_amount' => 'sometimes|numeric|min:0',

            'tags' => 'nullable|array',

            'status' => 'sometimes|in:active,blocked',
        ]);

        $customer->update($validated);
        $customer->refresh();

        return response()->json([
            'message' => 'Vendor customer updated successfully',
            'vendor_customer' =>
                $customer->load(['vendor', 'user']),
        ]);
    }

    public function destroy($id)
    {
        $customer = VendorCustomer::findOrFail($id);

        $customer->delete();

        return response()->json([
            'message' => 'Vendor customer deleted successfully',
        ]);
    }
}
