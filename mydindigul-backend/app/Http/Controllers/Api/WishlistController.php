<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Models\User;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlists = Wishlist::with(['user', 'wishlistable'])
            ->latest()
            ->get();

        return response()->json([
            'wishlists' => $wishlists,
        ]);
    }

    public function show($id)
    {
        $wishlist = Wishlist::with(['user', 'wishlistable'])
            ->findOrFail($id);

        return response()->json([
            'wishlist' => $wishlist,
        ]);
    }

    public function byUser($userId)
    {
        User::findOrFail($userId);

        $wishlists = Wishlist::where('user_id', $userId)
            ->with('wishlistable')
            ->latest()
            ->get();

        return response()->json([
            'wishlists' => $wishlists,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'wishlistable_type' => 'required|string|max:150',
            'wishlistable_id' => 'required|integer|min:1',
        ]);

        $exists = Wishlist::where('user_id', $validated['user_id'])
            ->where('wishlistable_type', $validated['wishlistable_type'])
            ->where('wishlistable_id', $validated['wishlistable_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Item already exists in wishlist',
            ], 422);
        }

        $wishlist = Wishlist::create($validated);

        return response()->json([
            'message' => 'Item added to wishlist successfully',
            'wishlist' => $wishlist->load([
                'user',
                'wishlistable'
            ]),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $wishlist = Wishlist::findOrFail($id);

        $validated = $request->validate([
            'wishlistable_type' => 'sometimes|string|max:150',
            'wishlistable_id' => 'sometimes|integer|min:1',
        ]);

        $wishlist->update($validated);
        $wishlist->refresh();

        return response()->json([
            'message' => 'Wishlist updated successfully',
            'wishlist' => $wishlist->load([
                'user',
                'wishlistable'
            ]),
        ]);
    }

    public function destroy($id)
    {
        $wishlist = Wishlist::findOrFail($id);

        $wishlist->delete();

        return response()->json([
            'message' => 'Item removed from wishlist successfully',
        ]);
    }
}
