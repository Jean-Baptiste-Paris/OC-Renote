import {useState, type FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthStore} from '../../stores/useAuthStore';

export function DeleteAccountForm() {
    const deleteAccount = useAuthStore((s) => s.deleteAccount);
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);
    const navigate = useNavigate();

    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const confirmed = window.confirm(
            'Are you sure? This action cannot be undone.'
        );
        if (!confirmed) return;

        try {
            await deleteAccount(password);
            navigate('/register');
        } catch {
            // erreur dans le store
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-bold text-red-600">Delete account</h2>
                <p className="text-sm text-gray-600">
                    Permanently delete your account and all associated data.
                    Confirm with your password.
                </p>
            </div>

            {error && (
                <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label htmlFor="delete-password" className="text-sm font-medium">
                        Password
                    </label>
                    <input
                        id="delete-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        className="w-full border rounded px-3 py-2 text-sm"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-4 py-2 rounded font-medium">
                    {loading ? 'Deleting...' : 'Delete my account'}
                </button>
            </form>
        </div>
    );
}