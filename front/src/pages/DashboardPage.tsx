import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';

export function DashboardPage() {
    const user = useAuthStore((s) => s.user);
    const fetchProfile = useAuthStore((s) => s.fetchProfile);
    const logout = useAuthStore((s) => s.logout);

    useEffect(() => {
        if (!user) fetchProfile();
    }, [user, fetchProfile]);

    return (
        <div>
            <h1>Dashboard</h1>
            {user
                ? <p>Hello {user.name} ({user.email})</p>
                : <p>Loading profile...</p>}
            <button onClick={logout}>Logout</button>
        </div>
    );
}
