<?php

namespace App\Services;

use App\Models\Tag;
use App\Repositories\Interfaces\TagRepositoryInterface;
use Illuminate\Support\Collection;

class TagService
{
    public function __construct(
        private TagRepositoryInterface $tagRepository
    ) {}

    public function getAllTags(): Collection
    {
        return $this->tagRepository->getAll();
    }

    public function getTag(int $id): ?Tag
    {
        return $this->tagRepository->findById($id);
    }

    public function createTag(string $name): Tag
    {
        return $this->tagRepository->create($name);
    }

    public function updateTag(int $id, string $name): Tag
    {
        return $this->tagRepository->update($id, $name);
    }

    public function deleteTag(int $id): void
    {
        $this->tagRepository->delete($id);
    }
}
