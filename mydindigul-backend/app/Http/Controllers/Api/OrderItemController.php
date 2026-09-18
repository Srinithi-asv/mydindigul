<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index()
    {
        $items = OrderItem::with(['order', 'product', 'service'])
            ->latest()
            ->get();

        return response()->json([
            'order_items' => $items,
        ]);
    }

    public function show($id)
    {
        $item = OrderItem::with(['order', 'product', 'service'])
            ->findOrFail($id);

        return response()->json([
            'order_item' => $item,
        ]);
    }

    public function byOrder($orderId)
    {
        Order::findOrFail($orderId);

        $items = OrderItem::where('order_id', $orderId)
            ->with(['order', 'product', 'service'])
            ->latest()
            ->get();

        return response()->json([
            'order_items' => $items,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'product_id' => 'nullable|exists:products,id',
            'service_id' => 'nullable|exists:services,id',

            'item_name' => 'required|string|max:255',
            'unit_price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
        ]);

        $item = OrderItem::create($validated);

        return response()->json([
            'message' => 'Order item created successfully',
            'order_item' => $item->load([
                'order',
                'product',
                'service'
            ]),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $item = OrderItem::findOrFail($id);

        $validated = $request->validate([
            'product_id' => 'nullable|exists:products,id',
            'service_id' => 'nullable|exists:services,id',

            'item_name' => 'sometimes|string|max:255',
            'unit_price' => 'sometimes|numeric|min:0',
            'quantity' => 'sometimes|integer|min:1',
            'total_price' => 'sometimes|numeric|min:0',
        ]);

        $item->update($validated);
        $item->refresh();

        return response()->json([
            'message' => 'Order item updated successfully',
            'order_item' => $item->load([
                'order',
                'product',
                'service'
            ]),
        ]);
    }

    public function destroy($id)
    {
        $item = OrderItem::findOrFail($id);

        $item->delete();

        return response()->json([
            'message' => 'Order item deleted successfully',
        ]);
    }
}
