<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteAccountRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct(
        private UserService $userService
    ){}

    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'status'    => 'success',
            'message'   => 'Profile retrieved successfully',
            'data'      => $request->user(),
        ]);
    }

    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $user = $this->userService->updateProfile(
            $request->user(),
            $request->validated()
        );

        return response()->json([
            'status'    => 'success',
            'message'   => 'Profile updated successfully',
            'data'      => $user,
        ]);
    }

    public function destroy(DeleteAccountRequest $request): JsonResponse
    {
        $user = $request->user();
        $user->tokens()->delete();
        $this->userService->deleteUser($user);

        return response()->json([
            'status'    => 'success',
            'message'   => 'Account deleted successfully',
            'data'      => null,
        ]);
    }
}
