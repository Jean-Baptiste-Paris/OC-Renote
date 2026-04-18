import type { Note } from '../../types/api';
import { useNoteStore } from '../../stores/useNoteStore';

interface Props {
    note: Note;
}

export function NoteItem({ note }: Props) {
    const deleteNote = useNoteStore((s) => s.deleteNote);

    return (
        <div className="border p-3 flex justify-between items-start">
            <div>
                <p>{note.text}</p>
                <small className="text-gray-500">
                    Tag: {note.tag?.name ?? '—'}
                </small>
            </div>
            <button
                onClick={() => deleteNote(note.id)}
                className="text-red-500 text-sm"
            >
                Delete
            </button>
        </div>
    );
}
