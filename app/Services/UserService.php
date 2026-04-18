<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserService
{
    public function __construct(
        private UserRepositoryInterface $userRepository
    ) {}

    public function createUser(array $data): User
    {
        return $this->userRepository->create(
            $data['name'],
            $data['email'],
            $data['password']
        );
    }

    public function updateProfile(User $user, array $data): User
    {
        return $this->userRepository->update(
            $user,
            $data['name'],
            $data['email']
        );
    }

    public function deleteUser(User $user): void
    {
        $this->userRepository->delete($user);
    }
}
