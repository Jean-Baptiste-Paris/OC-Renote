import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { NoteForm } from '../components/notes/NoteForm';
import { NoteList } from '../components/notes/NoteList';
import { TagForm } from '../components/tags/TagForm';

export function DashboardPage() {
    const user = useAuthStore((s) => s.user);
    const fetchProfile = useAuthStore((s) => s.fetchProfile);
    const logout = useAuthStore((s) => s.logout);

    useEffect(() => {
        if (!user) fetchProfile();
    }, [user, fetchProfile]);

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-4">
                    {user && <span>Hello {user.name}</span>}
                    <Link
                        to="/settings"
                        className="text-sm text-gray-600 underline"
                    >
                        Settings
                    </Link>
                    <button
                        onClick={logout}
                        className="text-sm text-gray-600 underline"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <section className="mt-6 p-4 border border-neutral-200 rounded-xl bg-white space-y-4">
                <NoteForm />
                <hr />
                <NoteList />
            </section>

            <section className="mt-6 p-4 border border-neutral-200 rounded-xl bg-white">
                <TagForm />
            </section>
        </div>
    );
}
