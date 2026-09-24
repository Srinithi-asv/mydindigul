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