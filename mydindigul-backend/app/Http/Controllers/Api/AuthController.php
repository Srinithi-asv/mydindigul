<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email',
            'phone' => 'required|string|max:20|unique:users,phone',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'nullable|in:customer,vendor',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'],
            'password' => $validated['password'],
            'role' => $validated['role'] ?? 'customer',
            'status' => 'active',
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user,
            'token' => $token,
        ], 201);
    }
     
    public function vendorRegister(Request $request)
{
    $validated = $request->validate([
        'business_name' => 'required|string|max:255',
        'owner_name' => 'required|string|max:255',
        'phone' => 'required|string|max:20|unique:users,phone',
        'email' => 'required|email|max:255|unique:users,email',
        'password' => 'required|string|min:8',
        'industry_id' => 'required|exists:industries,id',
        'sub_industry_id' => 'nullable|exists:sub_industries,id',
        'address' => 'required|string|max:500',
        'city' => 'required|string|max:100',
        'pincode' => 'required|string|max:20',
        'description' => 'nullable|string',
    ]);

    $user = \DB::transaction(function () use ($validated) {

        $user = \App\Models\User::create([
            'name' => $validated['owner_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => $validated['password'],
            'role' => 'vendor',
            'status' => 'active',
        ]);

        \App\Models\Vendor::create([
            'user_id' => $user->id,
            'industry_id' => $validated['industry_id'],
            'sub_industry_id' => $validated['sub_industry_id'] ?? null,
            'business_name' => $validated['business_name'],
            'slug' => \Illuminate\Support\Str::slug($validated['business_name']) . '-' . $user->id,
            'about_us' => $validated['description'] ?? null,
            'contact_person' => $validated['owner_name'],
            'phone' => $validated['phone'],
            'whatsapp_number' => $validated['phone'],
            'email' => $validated['email'],
            'address_line1' => $validated['address'],
            'city' => 'Dindigul',
            'pincode' => '624001',
            'verification_status' => 'pending',
            'plan_type' => 'free',
            'plan_status' => 'active',
            'is_verified' => false,
            'is_featured' => false,
            'status' => 'active',
        ]);

        return $user;
    });

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'message' => 'Business registration successful',
        'user' => $user,
        'token' => $token,
    ], 201);
}
    /**
     * Login an existing user.
     */
    public function login(Request $request)
{
    $validated = $request->validate([
        'identifier' => 'required|string',
        'password' => 'required|string',
    ]);

    $user = User::where('phone', $validated['identifier'])
        ->orWhere('email', $validated['identifier'])
        ->first();

    if (!$user || !Hash::check($validated['password'], $user->password)) {
        throw ValidationException::withMessages([
            'identifier' => ['The provided credentials are incorrect.'],
        ]);
    }

    if ($user->status !== 'active') {
        return response()->json([
            'message' => 'Your account is not active.',
        ], 403);
    }

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'user' => $user,
        'token' => $token,
    ]);
}

    /**
     * Get the currently authenticated user.
     */
    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * Logout the current user.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }
}