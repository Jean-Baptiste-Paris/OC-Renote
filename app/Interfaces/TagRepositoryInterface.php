<?php

use App\Models\Tag;
use Illuminate\Support\Collection;

interface TagRepositoryInterface
{
    public function getAll(): Collection;

    public function findById(int $id): ?Tag;

    public function create(string $name): Tag;

    public function update(int $id, string $name): Tag;

    public function delete(int $id): bool;
}
