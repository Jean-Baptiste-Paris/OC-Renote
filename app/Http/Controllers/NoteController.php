<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNoteRequest;
use App\Http\Resources\NoteResource;
use App\Services\NoteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    public function __construct(
        private NoteService $noteService
    ) {}

    public function index(): JsonResponse
    {
        $notes = $this->noteService->getNotesForUser(Auth::id());

        return response()->json([
            'status'    => 'success',
            'message'   => 'Notes retrieved successfully',
            'data'      => NoteResource::collection($notes),
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $note = $this->noteService->getNote($id, Auth::id());

        if (!$note) {
            return response()->json([
                'status'    => 'error',
                'message'   => 'Note not found',
                'data'      => null
            ], 404);
        }

        return response()->json([
            'status'    => 'success',
            'message'   => 'Note retrieved successfully',
            'data'      => new NoteResource($note),
        ]);
    }

    public function store(StoreNoteRequest $request): JsonResponse
    {
        $note = $this->noteService->createNote(
            Auth::id(),
            $request->tag_id,
            $request->text
        );

        return response()->json([
            'status'    => 'success',
            'message'   => 'Note created successfully',
            'data'      => new NoteResource($note),
        ], 201);
    }

    public function update(StoreNoteRequest $request, int $id): JsonResponse
    {
        $note = $this->noteService->getNote($id, Auth::id());

        if (!$note) {
            return response()->json([
                'status'    => 'error',
                'message'   => 'Note not found',
                'data'      => null
            ], 404);
        }

        $updated = $this->noteService->updateNote(
            $id,
            Auth::id(),
            $request->tag_id,
            $request->text
        );

        return response()->json([
            'status'    => 'success',
            'message'   => 'Note updated successfully',
            'data'      => new NoteResource($updated),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $note = $this->noteService->getNote($id, Auth::id());

        if (!$note) {
            return response()->json([
                'status'    => 'error',
                'message'   => 'Note not found',
                'data'      => null
            ], 404);
        }

        $this->noteService->deleteNote($id, Auth::id());

        return response()->json([
            'status'    => 'success',
            'message'   => 'Note deleted successfully',
            'data'      => null
        ]);
    }
}
