import { useEffect } from 'react';
import { useNoteStore } from '../../stores/useNoteStore';
import { NoteItem } from './NoteItem';

export function NoteList() {
    const notes = useNoteStore((s) => s.notes);
    const fetchNotes = useNoteStore((s) => s.fetchNotes);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-bold">Your Notes</h2>
            {notes.length === 0
                ? <p className="text-gray-500">No notes yet.</p>
                : notes.map((note) => <NoteItem key={note.id} note={note} />)}
        </div>
    );
}
