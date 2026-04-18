import { create } from 'zustand';
import { api, TOKEN_STORAGE_KEY } from '../services/api';

export const useAuthStore = create((set, get) => ({
    token: localStorage.getItem(TOKEN_STORAGE_KEY),
    user: null,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post('/login', { email, password });
            const token = data.data.token;
            localStorage.setItem(TOKEN_STORAGE_KEY, token);
            set({ token, loading: false });
            await get().fetchProfile();
        } catch (err) {
            set({
                error: err.response?.data?.message ?? 'Login failed',
                loading: false,
            });
            throw err;
        }
    },

    register: async (name, email, password, passwordConfirmation) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post('/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            const token = data.data.token;
            localStorage.setItem(TOKEN_STORAGE_KEY, token);
            set({ token, loading: false });
            await get().fetchProfile();
        } catch (err) {
            set({
                error: err.response?.data?.message ?? 'Registration failed',
                loading: false,
            });
            throw err;
        }
    },

    logout: async () => {
        try {
            await api.post('/logout');
        } catch {
            // swallow — on vide l'état local quoi qu'il arrive
        }
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        set({ token: null, user: null, error: null });
    },

    fetchProfile: async () => {
        const { data } = await api.get('/profile');
        set({ user: data.data });
    },
}));
