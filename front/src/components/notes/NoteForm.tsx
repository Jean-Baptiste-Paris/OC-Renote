import { useState, useEffect, type FormEvent } from 'react';
import { useNoteStore } from '../../stores/useNoteStore';
import { useTagStore } from '../../stores/useTagStore';

export function NoteForm() {
    const [text, setText] = useState('');
    const [tagId, setTagId] = useState('');

    const createNote = useNoteStore((s) => s.createNote);
    const noteError = useNoteStore((s) => s.error);

    const tags = useTagStore((s) => s.tags);
    const fetchTags = useTagStore((s) => s.fetchTags);

    useEffect(() => {
        if (tags.length === 0) fetchTags();
    }, [tags.length, fetchTags]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createNote(text, Number(tagId));
            setText('');
            setTagId('');
        } catch {
            // erreur dans le store
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            {noteError && <div className="text-red-500 text-xs">{noteError}</div>}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your note..."
                className="w-full border p-2"
                required
            />
            <select
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
                className="w-full border p-2"
                required
            >
                <option value="">-- Select Tag --</option>
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                Add Note
            </button>
        </form>
    );
}
