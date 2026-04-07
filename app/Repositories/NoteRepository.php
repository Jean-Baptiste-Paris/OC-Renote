<?php

namespace App\Repositories;

use App\Models\Note;
use App\Repositories\Interfaces\NoteRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;

class NoteRepository implements NoteRepositoryInterface
{
    public function getAllByUser(int $userId): Collection
    {
        return Note::with('tag')->where('user_id', $userId)->latest()->get();
    }

    public function findByIdAndUser(int $id, int $userId): ?Note
    {
        return Note::with('tag')->where('id', $id)->where('user_id', $userId)->first();
    }

    public function create(int $userId, int $tagId, string $text): Note
    {
        return Note::create([
            'user_id' => $userId,
            'tag_id' => $tagId,
            'text' => $text,
        ]);
    }

    public function update(int $id, int $userId, int $tagId, string $text): Note
    {
        $note = $this->findByIdAndUser($id, $userId);
        if (!$note) {
            throw new ModelNotFoundException();
        }
        $note->update([
            'tag_id' => $tagId,
            'text' => $text,
        ]);
        return $note->fresh();
    }

    public function delete(int $id, int $userId): void
    {
        Note::where('id', $id)->where('user_id', $userId)->delete();
    }
}
