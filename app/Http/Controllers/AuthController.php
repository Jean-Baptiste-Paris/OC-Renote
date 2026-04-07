<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
           'email'      => 'required|email',
           'password'   => 'required|string'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status'    => 'error',
                'message'   => 'Invalid credentials',
                'data'      => null
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status'    => 'success',
            'message'   => 'Login successful',
            'data'      => ['token' => $token]
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status'    => 'success',
            'message'   => 'Logout successful',
            'data'      => null
        ]);
    }
}
