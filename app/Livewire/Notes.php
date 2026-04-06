<?php

namespace App\Livewire;

use App\Services\NoteService;
use App\Services\TagService;
use Livewire\Component;
use Illuminate\Support\Facades\Auth;

class Notes extends Component
{
    protected NoteService $noteService;
    protected TagService $tagService;

    public function boot(NoteService $noteService, TagService $tagService): void
    {
        $this->noteService = $noteService;
        $this->tagService = $tagService;
    }

    public $notes;
    public $text = '';
    public $tag_id = '';
    public $tags;

    protected $rules = [
        'text' => 'required|string',
        'tag_id' => 'required|exists:tags,id',
    ];
    protected $listeners = ['tagCreated' => 'refreshTags'];

    public function mount()
    {
        $this->tags = $this->tagService->getAllTags();
        $this->loadNotes();
    }

    public function loadNotes()
    {
        $this->notes = $this->noteService->getNotesForUser(Auth::id());
    }

    public function refreshTags()
    {
        $this->tags = $this->tagService->getAllTags();
    }

    public function save()
    {
        $this->validate();

        $this->noteService->createNote(Auth::id(), $this->tag_id, $this->text);

        $this->text = '';
        $this->tag_id = '';

        $this->loadNotes();

        session()->flash('message', 'Note added.');
    }

    public function delete($noteId)
    {
        $this->noteService->deleteNote($noteId, Auth::id());
        $this->loadNotes();
    }

    public function render()
    {
        return view('livewire.notes');
    }
}
