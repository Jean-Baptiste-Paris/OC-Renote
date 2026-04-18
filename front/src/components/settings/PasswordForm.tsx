import {useState, type FormEvent} from "react";
import {useAuthStore} from "../../stores/useAuthStore.ts";

export default function PasswordForm() {
    const updatePassword = useAuthStore((s) => s.updatePassword);
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        setSuccess(false);

        if (newPassword !== confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }
        if (newPassword.length < 8) {
            setLocalError('Password must be at least 8 characters long');
            return;
        }

        try {
            await updatePassword(currentPassword, newPassword, confirmPassword);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setSuccess(true);
        } catch {
            // erreur dans le store
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-bold">Passwword</h2>
                <p className="text-sm text-gray-600">Update your password</p>
            </div>

            {success && (
                <div className="text-green-600 text-sm">Password updated.</div>
            )}
            {(localError || error) && (
                <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
                    {localError || error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label htmlFor="current-password" className="text-sm font-medium">
                        Current password
                    </label>
                    <input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete="current-password"
                        className="w-full border rounded px-3 py-2 text-sm"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="new-password" className="text-sm font-medium">
                        New password
                    </label>
                    <input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                        className="w-full border rounded px-3 py-2 text-sm"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="password-confirmation" className="text-sm font-medium">
                        Confirm new password
                    </label>
                    <input
                        id="password-confirmation"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
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