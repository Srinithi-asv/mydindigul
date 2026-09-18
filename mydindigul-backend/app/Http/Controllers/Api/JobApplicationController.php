<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobPosting;
use App\Models\User;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    // Get all job applications
    public function index()
    {
        $applications = JobApplication::with([
            'jobPosting',
            'vendor',
            'user'
        ])->latest()->get();

        return response()->json([
            'job_applications' => $applications,
        ]);
    }

    // Get one job application
    public function show($id)
    {
        $application = JobApplication::with([
            'jobPosting',
            'vendor',
            'user'
        ])->findOrFail($id);

        return response()->json([
            'job_application' => $application,
        ]);
    }

    // Get applications for a particular job
    public function byJob($jobPostingId)
    {
        JobPosting::findOrFail($jobPostingId);

        $applications = JobApplication::where(
            'job_posting_id',
            $jobPostingId
        )
        ->with(['jobPosting', 'vendor', 'user'])
        ->latest()
        ->get();

        return response()->json([
            'job_applications' => $applications,
        ]);
    }

    // Get applications submitted by a user
    public function byUser($userId)
    {
        User::findOrFail($userId);

        $applications = JobApplication::where('user_id', $userId)
            ->with(['jobPosting', 'vendor'])
            ->latest()
            ->get();

        return response()->json([
            'job_applications' => $applications,
        ]);
    }

    // Create a job application
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_posting_id' => 'required|exists:job_postings,id',
            'vendor_id' => 'required|exists:vendors,id',
            'user_id' => 'nullable|exists:users,id',

            'applicant_name' => 'required|string|max:150',
            'applicant_email' => 'required|email|max:191',
            'applicant_phone' => 'required|string|max:20',

            'current_company' => 'nullable|string|max:200',
            'years_experience' => 'required|numeric|min:0|max:99.9',
            'expected_salary' => 'nullable|numeric|min:0',

            'resume_file_url' => 'required|string|max:500',
            'cover_letter' => 'nullable|string',

            'application_status' =>
                'nullable|in:applied,reviewed,shortlisted,interview_scheduled,rejected,hired',

            'vendor_notes' => 'nullable|string',
        ]);

        $validated['application_status'] =
            $validated['application_status'] ?? 'applied';

        $application = JobApplication::create($validated);

        return response()->json([
            'message' => 'Job application submitted successfully',
            'job_application' =>
                $application->load(['jobPosting', 'vendor', 'user']),
        ], 201);
    }

    // Update a job application
    public function update(Request $request, $id)
    {
        $application = JobApplication::findOrFail($id);

        $validated = $request->validate([
            'job_posting_id' => 'sometimes|exists:job_postings,id',
            'vendor_id' => 'sometimes|exists:vendors,id',
            'user_id' => 'nullable|exists:users,id',

            'applicant_name' => 'sometimes|string|max:150',
            'applicant_email' => 'sometimes|email|max:191',
            'applicant_phone' => 'sometimes|string|max:20',

            'current_company' => 'nullable|string|max:200',
            'years_experience' => 'sometimes|numeric|min:0|max:99.9',
            'expected_salary' => 'nullable|numeric|min:0',

            'resume_file_url' => 'sometimes|string|max:500',
            'cover_letter' => 'nullable|string',

            'application_status' =>
                'sometimes|in:applied,reviewed,shortlisted,interview_scheduled,rejected,hired',

            'vendor_notes' => 'nullable|string',
        ]);

        $application->update($validated);
        $application->refresh();

        return response()->json([
            'message' => 'Job application updated successfully',
            'job_application' =>
                $application->load(['jobPosting', 'vendor', 'user']),
        ]);
    }

    // Delete a job application
    public function destroy($id)
    {
        $application = JobApplication::findOrFail($id);

        $application->delete();

        return response()->json([
            'message' => 'Job application deleted successfully',
        ]);
    }
}
