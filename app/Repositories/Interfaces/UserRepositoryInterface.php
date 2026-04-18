<?php

namespace App\Repositories\Interfaces;

use App\Models\User;

interface UserRepositoryInterface
{
    public function create(string $name, string $email, string $password): User;

    public function update(User $user, string $name, string $email): User;

    public function delete(User $user): void;
}
