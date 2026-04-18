<?php

namespace App\Repositories;

use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function create(string $name, string $email, string $password): User
    {
        return User::create([
            'name'      => $name,
            'email'     => $email,
            'password'  => bcrypt($password),
        ]);
    }

    public function update(User $user, string $name, string $email): User
    {
        $user->update([
            'name'  => $name,
            'email' => $email,
        ]);

        return $user;
    }

    public function delete(User $user): void
    {
        $user->delete();
    }
}
