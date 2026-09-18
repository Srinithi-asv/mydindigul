<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class JobPostingController extends Controller
{
    // Get all active job postings
    public function index()
    {
        $jobs = JobPosting::where('status', 'active')
            ->with('vendor')
            ->latest()
            ->get();

        return response()->json([
            'job_postings' => $jobs,
        ]);
    }

    // Get one job posting
    public function show($id)
    {
        $job = JobPosting::where('status', 'active')
            ->with('vendor')
            ->findOrFail($id);

        return response()->json([
            'job_posting' => $job,
        ]);
    }

    // Get jobs posted by a vendor
    public function byVendor($vendorId)
    {
        Vendor::findOrFail($vendorId);

        $jobs = JobPosting::where('vendor_id', $vendorId)
            ->where('status', 'active')
            ->with('vendor')
            ->latest()
            ->get();

        return response()->json([
            'job_postings' => $jobs,
        ]);
    }

    // Create a job posting
    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'title' => 'required|string|max:200',
            'slug' => 'nullable|string|max:191',
            'job_type' => 'required|in:full_time,part_time,contract,internship,freelance',
            'workplace_type' => 'required|in:onsite,remote,hybrid',
            'location' => 'nullable|string|max:255',
            'experience_min' => 'nullable|integer|min:0',
            'experience_max' => 'nullable|integer|min:0',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0',
            'salary_type' => 'required|in:per_month,per_annum,negotiable,confidential',
            'vacancies_count' => 'nullable|integer|min:1',
            'qualification' => 'nullable|string',
            'skills_required' => 'nullable|array',
            'description' => 'required|string',
            'benefits' => 'nullable|string',
            'application_deadline' => 'nullable|date',
            'contact_email' => 'nullable|email|max:191',
            'contact_phone' => 'nullable|string|max:20',
            'status' => 'nullable|in:active,inactive,draft',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']);

        $existingSlug = JobPosting::where('vendor_id', $validated['vendor_id'])
            ->where('slug', $validated['slug'])
            ->exists();

        if ($existingSlug) {
            return response()->json([
                'message' => 'A job posting with this slug already exists for this vendor.',
            ], 422);
        }

        $validated['status'] = $validated['status'] ?? 'draft';

        $job = JobPosting::create($validated);

        return response()->json([
            'message' => 'Job posting created successfully',
            'job_posting' => $job->load('vendor'),
        ], 201);
    }

    // Update a job posting
    public function update(Request $request, $id)
    {
        $job = JobPosting::findOrFail($id);

        $validated = $request->validate([
            'vendor_id' => 'sometimes|exists:vendors,id',
            'title' => 'sometimes|string|max:200',
            'slug' => 'sometimes|string|max:191',
            'job_type' => 'sometimes|in:full_time,part_time,contract,internship,freelance',
            'workplace_type' => 'sometimes|in:onsite,remote,hybrid',
            'location' => 'nullable|string|max:255',
            'experience_min' => 'nullable|integer|min:0',
            'experience_max' => 'nullable|integer|min:0',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0',
            'salary_type' => 'sometimes|in:per_month,per_annum,negotiable,confidential',
            'vacancies_count' => 'nullable|integer|min:1',
            'qualification' => 'nullable|string',
            'skills_required' => 'nullable|array',
            'description' => 'sometimes|string',
            'benefits' => 'nullable|string',
            'application_deadline' => 'nullable|date',
            'contact_email' => 'nullable|email|max:191',
            'contact_phone' => 'nullable|string|max:20',
            'status' => 'sometimes|in:active,inactive,draft',
        ]);

        $vendorId = $validated['vendor_id'] ?? $job->vendor_id;

        if (isset($validated['slug'])) {
            $slugExists = JobPosting::where('vendor_id', $vendorId)
                ->where('slug', $validated['slug'])
                ->where('id', '!=', $job->id)
                ->exists();

            if ($slugExists) {
                return response()->json([
                    'message' => 'A job posting with this slug already exists for this vendor.',
                ], 422);
            }
        }

        $job->update($validated);
        $job->refresh();

        return response()->json([
            'message' => 'Job posting updated successfully',
            'job_posting' => $job->load('vendor'),
        ]);
    }

    // Delete a job posting
    public function destroy($id)
    {
        $job = JobPosting::findOrFail($id);

        $job->delete();

        return response()->json([
            'message' => 'Job posting deleted successfully',
        ]);
    }
}
