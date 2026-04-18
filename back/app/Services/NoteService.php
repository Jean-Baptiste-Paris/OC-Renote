<?php

namespace App\Services;

use App\Models\Note;
use App\Repositories\Interfaces\NoteRepositoryInterface;
use Illuminate\Support\Collection;

class NoteService
{
    public function __construct(
        private NoteRepositoryInterface $noteRepository
    ) {}

    public function getNotesForUser(int $userId): Collection
    {
        return $this->noteRepository->getAllByUser($userId);
    }

    public function getNote(int $id, int $userId): ?Note
    {
        return $this->noteRepository->findByIdAndUser($id, $userId);
    }

    public function createNote(int $userId, int $tagId, string $text): Note
    {
        return $this->noteRepository->create($userId, $tagId, $text);
    }

    public function updateNote(int $id, int $userId, int $tagId, string $text): Note
    {
        return $this->noteRepository->update($id, $userId, $tagId, $text);
    }

    public function deleteNote(int $id, int $userId): void
    {
        $this->noteRepository->delete($id, $userId);
    }
}
