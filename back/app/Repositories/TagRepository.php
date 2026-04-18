<?php

namespace App\Repositories;

use App\Models\Tag;
use App\Repositories\Interfaces\TagRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;

class TagRepository implements TagRepositoryInterface
{
    public function getAll(): Collection
    {
        return Tag::all();
    }

    public function findById(int $id): ?Tag
    {
        return Tag::find($id);
    }

    public function create(string $name): Tag
    {
        return Tag::create(['name' => $name]);
    }

    public function update(int $id, string $name): Tag
    {
        $tag = $this->findById($id);
        if (!$tag) {
            throw new ModelNotFoundException();
        }
        $tag->update(['name' => $name]);
        return $tag;
    }

    public function delete(int $id): void
    {
        Tag::where('id', $id)->delete();
    }
}
