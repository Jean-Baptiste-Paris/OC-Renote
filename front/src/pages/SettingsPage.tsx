import { Link } from 'react-router-dom';
import { ProfileForm } from '../components/settings/ProfileForm';
import { PasswordForm } from '../components/settings/PasswordForm';
import { DeleteAccountForm } from '../components/settings/DeleteAccountForm';

export function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Settings</h1>
                <Link to="/dashboard" className="text-sm text-blue-500 hover:underline">
                    ← Back to dashboard
                </Link>
            </header>

            <section className="mt-6 p-4 border border-neutral-200 rounded-xl bg-white">
                <ProfileForm />
            </section>

            <section className="mt-6 p-4 border border-neutral-200 rounded-xl bg-white">
                <PasswordForm />
            </section>

            <section className="mt-6 p-4 border border-red-200 rounded-xl bg-white">
                <DeleteAccountForm />
            </section>
        </div>
    );
}
