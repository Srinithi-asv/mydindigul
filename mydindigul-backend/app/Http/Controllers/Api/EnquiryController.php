<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\Vendor;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    public function index()
    {
        $enquiries = Enquiry::with(['vendor', 'user', 'service', 'product'])
            ->latest()
            ->get();

        return response()->json([
            'enquiries' => $enquiries,
        ]);
    }

    public function show($id)
    {
        $enquiry = Enquiry::with(['vendor', 'user', 'service', 'product'])
            ->findOrFail($id);

        return response()->json([
            'enquiry' => $enquiry,
        ]);
    }

    public function byVendor($vendorId)
    {
        Vendor::findOrFail($vendorId);

        $enquiries = Enquiry::where('vendor_id', $vendorId)
            ->with(['vendor', 'user', 'service', 'product'])
            ->latest()
            ->get();

        return response()->json([
            'enquiries' => $enquiries,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'user_id' => 'nullable|exists:users,id',
            'service_id' => 'nullable|exists:services,id',
            'product_id' => 'nullable|exists:products,id',

            'name' => 'required|string|max:150',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:191',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',

            'preferred_contact_method' =>
                'required|in:call,whatsapp,email',

            'status' =>
                'nullable|in:pending,viewed,converted_to_lead,closed',
        ]);

        $validated['status'] = $validated['status'] ?? 'pending';

        $validated['ip_address'] = $request->ip();

        $enquiry = Enquiry::create($validated);

        return response()->json([
            'message' => 'Enquiry created successfully',
            'enquiry' => $enquiry->load([
                'vendor',
                'user',
                'service',
                'product'
            ]),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $enquiry = Enquiry::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:150',
            'phone' => 'sometimes|string|max:20',
            'email' => 'nullable|email|max:191',
            'subject' => 'nullable|string|max:255',
            'message' => 'sometimes|string',

            'preferred_contact_method' =>
                'sometimes|in:call,whatsapp,email',

            'status' =>
                'sometimes|in:pending,viewed,converted_to_lead,closed',
        ]);

        $enquiry->update($validated);
        $enquiry->refresh();

        return response()->json([
            'message' => 'Enquiry updated successfully',
            'enquiry' => $enquiry->load([
                'vendor',
                'user',
                'service',
                'product'
            ]),
        ]);
    }

    public function destroy($id)
    {
        $enquiry = Enquiry::findOrFail($id);

        $enquiry->delete();

        return response()->json([
            'message' => 'Enquiry deleted successfully',
        ]);
    }
}
