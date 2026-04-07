<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTagRequest;
use App\Services\TagService;
use Illuminate\Http\JsonResponse;

class TagController extends Controller
{
    public function __construct(
        private TagService $tagService
    ) {}

    // TODO: Masquer les champs sensibles (user_id, tag_id) des réponses JSON

    public function index(): JsonResponse
    {
        $tags = $this->tagService->getAllTags();

        return response()->json([
            'status'    => 'success',
            'message'   => 'Tags retrieved successfully',
            'data'      => $tags
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $tag = $this->tagService->getTag($id);

        if (!$tag) {
            return response()->json([
                'status'    => 'error',
                'message'   => 'Tag not found',
                'data'      => null
            ], 404);
        }

        return response()->json([
            'status'    => 'success',
            'message'   => 'Tag retrieved successfully',
            'data'      => $tag
        ]);
    }

    public function store(StoreTagRequest $request): JsonResponse
    {
        $tag = $this->tagService->createTag($request->name);

        return response()->json([
            'status'    => 'success',
            'message'   => 'Tag created successfully',
            'data'      => $tag
        ], 201);
    }

    public function update(StoreTagRequest $request, int $id): JsonResponse
    {
        $tag = $this->tagService->getTag($id);

        if (!$tag) {
            return response()->json([
                'status'    => 'error',
                'message'   => 'Tag not found',
                'data'      => null
            ], 404);
        }

        $updated = $this->tagService->updateTag($id, $request->name);

        return response()->json([
            'status'    => 'success',
            'message'   => 'Tag updated successfully',
            'data'      => $updated
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $tag = $this->tagService->getTag($id);

        if (!$tag) {
            return response()->json([
                'status'    => 'error',
                'message'   => 'Tag not found',
                'data'      => null
            ], 404);
        }

        $this->tagService->deleteTag($id);

        return response()->json([
            'status'    => 'success',
            'message'   => 'Tag deleted successfully',
            'data'      => null
        ]);
    }

}
