<?php

use App\Models\Note;
use Illuminate\Support\Collection;

interface NoteRepositoryInterface
{
    public function getAllByUser(int $userId): Collection;

    public function findByIdAndUser(int $id, int $userId): ?Note;

    public function create(int $userId, int $tagId, string $text): Note;

    public function update(int $id, int $userId, int $tagId, string $text): Note;

    public function delete(int $id, int $userId): void;
}
