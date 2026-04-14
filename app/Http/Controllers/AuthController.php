<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(
        private UserService $userService
    ) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->userService->createUser($request->validated());
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status'    => 'success',
            'message'   => 'Registration successful',
            'data'      => ['token' => $token]
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

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
        $token = $request->user()->currentAccessToken();
        if ($token) {
            $token->delete();
        }

        return response()->json([
            'status'    => 'success',
            'message'   => 'Logout successful',
            'data'      => null
        ]);
    }
}
