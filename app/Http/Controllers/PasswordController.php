<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UpdatePasswordRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class PasswordController extends Controller
{
    public function forgot(ForgotPasswordRequest $request): JsonResponse
    {
        $status = Password::sendResetLink($request->validated());

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'status'    => 'success',
                'message'   => 'Reset link sent',
                'data'      => null
            ]);
        }

        return response()->json([
            'status'    => 'error',
            'message'   => 'Failed to send reset link',
        ], 400);
    }

    public function reset(ResetPasswordRequest $request): JsonResponse
    {
        $status = Password::reset(
            $request->validated(),
            function ($user, $password) {
                $user->update(['password' => Hash::make($password)]);
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'status'    => 'success',
                'message'   => 'Password reset successfully',
                'data'      => null
            ]);
        }

        return response()->json([
            'status'    => 'error',
            'message'   => 'Failed to reset password',
            'data'      => null
        ], 400);
    }

    public function update(UpdatePasswordRequest $request): JsonResponse
    {
        $request->user()->update(
            ['password' => Hash::make($request->password)]
        );

        return response()->json([
            'status'    => 'success',
            'message'   => 'Password updated successfully',
            'data'      => null
        ]);
    }
}
