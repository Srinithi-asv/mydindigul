<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Vendor;
use App\Models\Enquiry;
use App\Models\VendorCustomer;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function index()
    {
        $leads = Lead::with(['vendor', 'enquiry', 'customer'])
            ->latest()
            ->get();

        return response()->json([
            'leads' => $leads,
        ]);
    }

    public function show($id)
    {
        $lead = Lead::with(['vendor', 'enquiry', 'customer'])
            ->findOrFail($id);

        return response()->json([
            'lead' => $lead,
        ]);
    }

    public function byVendor($vendorId)
    {
        Vendor::findOrFail($vendorId);

        $leads = Lead::where('vendor_id', $vendorId)
            ->with(['vendor', 'enquiry', 'customer'])
            ->latest()
            ->get();

        return response()->json([
            'leads' => $leads,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'enquiry_id' => 'nullable|exists:enquiries,id',
            'customer_id' => 'nullable|exists:vendor_customers,id',

            'lead_source' =>
                'required|in:enquiry,click_to_call,whatsapp_click,catalogue_download,direct',

            'customer_name' => 'required|string|max:150',
            'customer_phone' => 'required|string|max:20',
            'masked_phone' => 'nullable|string|max:20',
            'is_phone_masked' => 'nullable|boolean',

            'customer_email' => 'nullable|email|max:191',
            'requirement_details' => 'nullable|string',
            'estimated_value' => 'nullable|numeric|min:0',

            'lead_status' =>
                'nullable|in:new,contacted,in_progress,converted,lost',

            'lost_reason' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $validated['is_phone_masked'] =
            $validated['is_phone_masked'] ?? false;

        $validated['lead_status'] =
            $validated['lead_status'] ?? 'new';

        $lead = Lead::create($validated);

        return response()->json([
            'message' => 'Lead created successfully',
            'lead' => $lead->load(['vendor', 'enquiry', 'customer']),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        $validated = $request->validate([
            'customer_name' => 'sometimes|string|max:150',
            'customer_phone' => 'sometimes|string|max:20',
            'masked_phone' => 'nullable|string|max:20',
            'is_phone_masked' => 'sometimes|boolean',

            'customer_email' => 'nullable|email|max:191',
            'requirement_details' => 'nullable|string',
            'estimated_value' => 'nullable|numeric|min:0',

            'lead_status' =>
                'sometimes|in:new,contacted,in_progress,converted,lost',

            'lost_reason' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $lead->update($validated);
        $lead->refresh();

        return response()->json([
            'message' => 'Lead updated successfully',
            'lead' => $lead->load(['vendor', 'enquiry', 'customer']),
        ]);
    }

    public function destroy($id)
    {
        $lead = Lead::findOrFail($id);

        $lead->delete();

        return response()->json([
            'message' => 'Lead deleted successfully',
        ]);
    }
}
