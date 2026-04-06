<?php

namespace App\Livewire;

use App\Services\TagService;
use Livewire\Component;

class TagForm extends Component
{
    protected TagService $tagService;

    public function boot(TagService $tagService): void
    {
        $this->tagService = $tagService;
    }

    public $name = '';

    protected $rules = [
        'name' => 'required|string|max:50|unique:tags,name',
    ];

    public function save()
    {
        $this->validate();

        $this->tagService->createTag($this->name);

        $this->reset('name');

        $this->dispatch('tagCreated');

        session()->flash('message', 'Tag added!');
    }

    public function render()
    {
        return view('livewire.tag-form');
    }
}
