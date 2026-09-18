<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with(['user', 'reviewable'])
            ->where('status', 'approved')
            ->latest()
            ->get();

        return response()->json([
            'reviews' => $reviews,
        ]);
    }

    public function show($id)
    {
        $review = Review::with(['user', 'reviewable'])
            ->where('status', 'approved')
            ->findOrFail($id);

        return response()->json([
            'review' => $review,
        ]);
    }

    public function byUser($userId)
    {
        User::findOrFail($userId);

        $reviews = Review::where('user_id', $userId)
            ->with('reviewable')
            ->latest()
            ->get();

        return response()->json([
            'reviews' => $reviews,
        ]);
    }

    public function byReviewable($type, $id)
    {
        $modelType = match ($type) {
            'product' => 'App\\Models\\Product',
            'service' => 'App\\Models\\Service',
            default => null,
        };

        if (!$modelType) {
            return response()->json([
                'message' => 'Invalid reviewable type. Use product or service.',
            ], 422);
        }

        $reviews = Review::where('reviewable_type', $modelType)
            ->where('reviewable_id', $id)
            ->where('status', 'approved')
            ->with('user')
            ->latest()
            ->get();

        return response()->json([
            'reviews' => $reviews,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',

            'reviewable_type' => 'required|string|max:150',
            'reviewable_id' => 'required|integer|min:1',

            'rating' => 'required|integer|min:1|max:5',
            'review_title' => 'nullable|string|max:200',
            'comment' => 'nullable|string',

            'status' => 'nullable|in:pending,approved,rejected',

            'vendor_reply' => 'nullable|string',
            'vendor_replied_at' => 'nullable|date',
        ]);

        $validated['status'] =
            $validated['status'] ?? 'pending';

        $review = Review::create($validated);

        return response()->json([
            'message' => 'Review created successfully',
            'review' => $review->load([
                'user',
                'reviewable'
            ]),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        $validated = $request->validate([
            'rating' => 'sometimes|integer|min:1|max:5',
            'review_title' => 'nullable|string|max:200',
            'comment' => 'nullable|string',

            'status' => 'sometimes|in:pending,approved,rejected',

            'vendor_reply' => 'nullable|string',
            'vendor_replied_at' => 'nullable|date',
        ]);

        $review->update($validated);
        $review->refresh();

        return response()->json([
            'message' => 'Review updated successfully',
            'review' => $review->load([
                'user',
                'reviewable'
            ]),
        ]);
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);

        $review->delete();

        return response()->json([
            'message' => 'Review deleted successfully',
        ]);
    }
}