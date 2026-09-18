<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Vendor;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['vendor', 'user', 'offer'])
            ->latest('placed_at')
            ->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['vendor', 'user', 'offer'])
            ->findOrFail($id);

        return response()->json([
            'order' => $order,
        ]);
    }

    public function byVendor($vendorId)
    {
        Vendor::findOrFail($vendorId);

        $orders = Order::where('vendor_id', $vendorId)
            ->with(['vendor', 'user', 'offer'])
            ->latest('placed_at')
            ->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function byUser($userId)
    {
        $orders = Order::where('user_id', $userId)
            ->with(['vendor', 'offer'])
            ->latest('placed_at')
            ->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'user_id' => 'nullable|exists:users,id',
            'offer_id' => 'nullable|exists:offers,id',

            'subtotal' => 'required|numeric|min:0',
            'discount_amount' => 'nullable|numeric|min:0',
            'tax_amount' => 'nullable|numeric|min:0',
            'delivery_charge' => 'nullable|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',

            'payment_method' =>
                'required|in:cash_on_delivery,razorpay,store_pickup',

            'payment_status' =>
                'nullable|in:pending,paid,failed,refunded',

            'razorpay_order_id' => 'nullable|string|max:100',
            'razorpay_payment_id' => 'nullable|string|max:100',

            'order_status' =>
                'nullable|in:pending,confirmed,processing,shipped,delivered,cancelled',

            'shipping_address' => 'required|array',
            'billing_address' => 'nullable|array',
            'customer_notes' => 'nullable|string',

            'placed_at' => 'nullable|date',
        ]);

        $validated['order_number'] =
            'ORD-' . strtoupper(Str::random(10));

        $validated['discount_amount'] =
            $validated['discount_amount'] ?? 0;

        $validated['tax_amount'] =
            $validated['tax_amount'] ?? 0;

        $validated['delivery_charge'] =
            $validated['delivery_charge'] ?? 0;

        $validated['payment_status'] =
            $validated['payment_status'] ?? 'pending';

        $validated['order_status'] =
            $validated['order_status'] ?? 'pending';

        $validated['placed_at'] =
            $validated['placed_at'] ?? now();

        $order = Order::create($validated);

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order->load(['vendor', 'user', 'offer']),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'offer_id' => 'nullable|exists:offers,id',

            'subtotal' => 'sometimes|numeric|min:0',
            'discount_amount' => 'sometimes|numeric|min:0',
            'tax_amount' => 'sometimes|numeric|min:0',
            'delivery_charge' => 'sometimes|numeric|min:0',
            'total_amount' => 'sometimes|numeric|min:0',

            'payment_method' =>
                'sometimes|in:cash_on_delivery,razorpay,store_pickup',

            'payment_status' =>
                'sometimes|in:pending,paid,failed,refunded',

            'razorpay_order_id' => 'nullable|string|max:100',
            'razorpay_payment_id' => 'nullable|string|max:100',

            'order_status' =>
                'sometimes|in:pending,confirmed,processing,shipped,delivered,cancelled',

            'shipping_address' => 'sometimes|array',
            'billing_address' => 'nullable|array',
            'customer_notes' => 'nullable|string',

            'placed_at' => 'sometimes|date',
        ]);

        $order->update($validated);
        $order->refresh();

        return response()->json([
            'message' => 'Order updated successfully',
            'order' => $order->load(['vendor', 'user', 'offer']),
        ]);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);

        $order->delete();

        return response()->json([
            'message' => 'Order deleted successfully',
        ]);
    }
}
