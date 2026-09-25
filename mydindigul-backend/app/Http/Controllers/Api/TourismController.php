<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tourism;

class TourismController extends Controller
{
    public function index()
    {
        $tourismPlaces = Tourism::with('tourismCategory')
            ->where('status', 'published')
            ->latest()
            ->get();

        return response()->json([
            'tourism_places' => $tourismPlaces,
        ]);
    }

    public function show($id)
    {
        $tourismPlace = Tourism::with([
            'tourismCategory',
            'media',
            'relatedPlaces',
        ])->findOrFail($id);

        return response()->json([
            'tourism_place' => $tourismPlace,
        ]);
    }
}
