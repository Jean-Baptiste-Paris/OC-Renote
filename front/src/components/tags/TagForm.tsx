import { useState, type FormEvent } from 'react';
import { useTagStore } from '../../stores/useTagStore';

export function TagForm() {
    const [name, setName] = useState('');
    const createTag = useTagStore((s) => s.createTag);
    const error = useTagStore((s) => s.error);
    const loading = useTagStore((s) => s.loading);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createTag(name);
            setName('');
        } catch {
            // erreur dans le store
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Add a tag</h2>
            {error && <div className="text-red-500 text-xs">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="New tag name"
                    className="border rounded px-3 py-1 text-sm w-full"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2"
                >
                    Add Tag
                </button>
            </form>
        </div>
    );
}
