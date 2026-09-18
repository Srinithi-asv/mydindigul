<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Vendor;
use Illuminate\Http\Request;

class EventController extends Controller
{
    // Get all published events
    public function index()
    {
        $events = Event::with('vendor')
            ->where('status', 'published')
            ->latest('start_datetime')
            ->get();

        return response()->json([
            'events' => $events,
        ]);
    }

    // Get one event
    public function show($id)
    {
        $event = Event::with('vendor')
            ->where('status', 'published')
            ->findOrFail($id);

        return response()->json([
            'event' => $event,
        ]);
    }

    // Get events for a vendor
    public function byVendor($vendorId)
    {
        Vendor::findOrFail($vendorId);

        $events = Event::with('vendor')
            ->where('vendor_id', $vendorId)
            ->where('status', 'published')
            ->latest('start_datetime')
            ->get();

        return response()->json([
            'events' => $events,
        ]);
    }

    // Create an event
    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'nullable|exists:vendors,id',

            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:191|unique:events,slug',
            'category' => 'required|string|max:100',
            'short_description' => 'nullable|string|max:500',
            'description' => 'required|string',

            'venue_name' => 'required|string|max:200',
            'venue_address' => 'required|string',

            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',

            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',

            'ticket_type' => 'required|in:free,paid',
            'ticket_price' => 'nullable|numeric|min:0',

            'total_seats' => 'nullable|integer|min:0',
            'available_seats' => 'nullable|integer|min:0',

            'banner_url' => 'nullable|string|max:500',
            'gallery_urls' => 'nullable|array',

            'is_featured' => 'nullable|boolean',
            'status' => 'nullable|in:draft,published,cancelled,completed',
        ]);

        $validated['ticket_price'] = $validated['ticket_price'] ?? 0;
        $validated['available_seats'] =
            $validated['available_seats'] ?? $validated['total_seats'] ?? null;
        $validated['is_featured'] =
            $validated['is_featured'] ?? false;
        $validated['status'] =
            $validated['status'] ?? 'draft';

        $event = Event::create($validated);

        return response()->json([
            'message' => 'Event created successfully',
            'event' => $event->load('vendor'),
        ], 201);
    }

    // Update an event
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validate([
            'vendor_id' => 'nullable|exists:vendors,id',

            'title' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:191|unique:events,slug,' . $id,
            'category' => 'sometimes|string|max:100',
            'short_description' => 'nullable|string|max:500',
            'description' => 'sometimes|string',

            'venue_name' => 'sometimes|string|max:200',
            'venue_address' => 'sometimes|string',

            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',

            'start_datetime' => 'sometimes|date',
            'end_datetime' => 'sometimes|date',

            'ticket_type' => 'sometimes|in:free,paid',
            'ticket_price' => 'nullable|numeric|min:0',

            'total_seats' => 'nullable|integer|min:0',
            'available_seats' => 'nullable|integer|min:0',

            'banner_url' => 'nullable|string|max:500',
            'gallery_urls' => 'nullable|array',

            'is_featured' => 'nullable|boolean',
            'status' => 'sometimes|in:draft,published,cancelled,completed',
        ]);

        $event->update($validated);
        $event->refresh();

        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $event->load('vendor'),
        ]);
    }

    // Delete an event
    public function destroy($id)
    {
        $event = Event::findOrFail($id);

        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully',
        ]);
    }
}
