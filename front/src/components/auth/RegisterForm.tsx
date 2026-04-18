import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

export function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    const register = useAuthStore((s) => s.register);
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (password !== passwordConfirmation) {
            setLocalError('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            setLocalError('Password must be at least 8 characters long');
            return;
        }

        try {
            await register(name, email, password, passwordConfirmation);
            navigate('/dashboard');
        } catch {
            // erreur dans le store
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50">
            <div className="w-full max-w-md p-6 bg-white border border-neutral-200 rounded-xl space-y-6">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    <p className="text-sm text-gray-600">
                        Enter your details below to get started
                    </p>
                </div>

                {(localError || error) && (
                    <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
                        {localError || error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="name" className="text-sm font-medium">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            autoComplete="name"
                            className="w-full border rounded px-3 py-2 text-sm"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                            autoComplete="email"
                            className="w-full border rounded px-3 py-2 text-sm"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            className="w-full border rounded px-3 py-2 text-sm"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password_confirmation" className="text-sm font-medium">
                            Confirm password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            autoComplete="new-password"
                            className="w-full border rounded px-3 py-2 text-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded font-medium"
                    >
                        {loading ? 'Loading...' : 'Create account'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
