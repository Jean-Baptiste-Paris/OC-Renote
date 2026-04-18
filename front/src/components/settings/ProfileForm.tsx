import {useState, useEffect, type FormEvent} from 'react';
import {useAuthStore} from '../../stores/useAuthStore';

export function ProfileForm() {
    const user = useAuthStore((s) => s.user);
    const updateProfile = useAuthStore((s) => s.updateProfile);
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSuccess(false);
        try {
            await updateProfile(name, email);
            setSuccess(true);
        } catch {
            // erreur dans le store
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-bold">Profile</h2>
                <p className="text-sm text-gray-600">Update your name and email</p>
            </div>

            {success && (
                <div className="text-green-600 text-sm">Profile updated.</div>
            )}
            {error && (
                <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label htmlFor="profile-name" className="text-sm font-medium">Name</label>
                    <input
                        id="profile-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="profile-email" className="text-sm font-medium">Email</label>
                    <input
                        id="profile-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded font-medium">
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </form>
        </div>
    );
}
