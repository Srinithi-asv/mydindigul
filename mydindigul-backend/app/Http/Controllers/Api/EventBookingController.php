<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EventBookingController extends Controller
{
    public function index()
    {
        $bookings = EventBooking::with(['event', 'vendor', 'user'])
            ->latest()
            ->get();

        return response()->json([
            'event_bookings' => $bookings,
        ]);
    }

    public function show($id)
    {
        $booking = EventBooking::with(['event', 'vendor', 'user'])
            ->findOrFail($id);

        return response()->json([
            'event_booking' => $booking,
        ]);
    }

    public function byEvent($eventId)
    {
        Event::findOrFail($eventId);

        $bookings = EventBooking::where('event_id', $eventId)
            ->with(['event', 'vendor', 'user'])
            ->latest()
            ->get();

        return response()->json([
            'event_bookings' => $bookings,
        ]);
    }

    public function byUser($userId)
    {
        $bookings = EventBooking::where('user_id', $userId)
            ->with(['event', 'vendor'])
            ->latest()
            ->get();

        return response()->json([
            'event_bookings' => $bookings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'vendor_id' => 'nullable|exists:vendors,id',
            'user_id' => 'nullable|exists:users,id',

            'attendee_name' => 'required|string|max:150',
            'attendee_email' => 'required|email|max:191',
            'attendee_phone' => 'required|string|max:20',

            'tickets_count' => 'required|integer|min:1',
            'unit_price' => 'nullable|numeric|min:0',

            'payment_gateway' => 'nullable|in:free,razorpay',
            'razorpay_order_id' => 'nullable|string|max:100',
            'razorpay_payment_id' => 'nullable|string|max:100',

            'payment_status' =>
                'nullable|in:free,pending,paid,failed,refunded',

            'booking_status' =>
                'nullable|in:confirmed,checked_in,cancelled',
        ]);

        $event = Event::findOrFail($validated['event_id']);

        $ticketsCount = $validated['tickets_count'];

        if (
            $event->available_seats !== null &&
            $ticketsCount > $event->available_seats
        ) {
            return response()->json([
                'message' => 'Not enough seats available',
            ], 422);
        }

        $unitPrice = $validated['unit_price']
            ?? $event->ticket_price
            ?? 0;

        $validated['unit_price'] = $unitPrice;
        $validated['total_amount'] = $unitPrice * $ticketsCount;

        $validated['booking_reference'] =
            'EVT-' . strtoupper(Str::random(10));

        $validated['ticket_token'] =
            Str::uuid()->toString();

        $validated['payment_gateway'] =
            $validated['payment_gateway'] ?? $event->ticket_type;

        $validated['payment_status'] =
            $validated['payment_status']
            ?? ($validated['payment_gateway'] === 'free'
                ? 'free'
                : 'pending');

        $validated['booking_status'] =
            $validated['booking_status'] ?? 'confirmed';

        $booking = EventBooking::create($validated);

        if ($event->available_seats !== null) {
            $event->decrement('available_seats', $ticketsCount);
        }

        return response()->json([
            'message' => 'Event booking created successfully',
            'event_booking' =>
                $booking->load(['event', 'vendor', 'user']),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $booking = EventBooking::findOrFail($id);

        $validated = $request->validate([
            'attendee_name' => 'sometimes|string|max:150',
            'attendee_email' => 'sometimes|email|max:191',
            'attendee_phone' => 'sometimes|string|max:20',

            'payment_status' =>
                'sometimes|in:free,pending,paid,failed,refunded',

            'booking_status' =>
                'sometimes|in:confirmed,checked_in,cancelled',

            'razorpay_order_id' => 'nullable|string|max:100',
            'razorpay_payment_id' => 'nullable|string|max:100',
        ]);

        $booking->update($validated);
        $booking->refresh();

        return response()->json([
            'message' => 'Event booking updated successfully',
            'event_booking' =>
                $booking->load(['event', 'vendor', 'user']),
        ]);
    }

    public function destroy($id)
    {
        $booking = EventBooking::findOrFail($id);

        $booking->delete();

        return response()->json([
            'message' => 'Event booking deleted successfully',
        ]);
    }
}
