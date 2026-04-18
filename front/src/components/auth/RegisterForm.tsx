import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { Link} from "react-router-dom";

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
            // l'erreur est déjà dans le store
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {(localError || error) && (
                <p style={{ color: 'red' }}>{localError || error}</p>
            )}
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Confirm password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Register'}
            </button>
            <p>Déjà inscrit ? <Link to="/login">Login</Link></p>
        </form>
    );
}
