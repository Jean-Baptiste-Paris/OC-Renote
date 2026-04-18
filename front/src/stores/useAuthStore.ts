import { create } from 'zustand';
import { AxiosError } from 'axios';
import { api, TOKEN_STORAGE_KEY } from '../services/api';
import type { ApiResponse, AuthTokenData, User } from '../types/api';

interface AuthState {
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;

    login: (email: string, password: string) => Promise<void>;
    register: (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ) => Promise<void>;
    logout: () => Promise<void>;
    fetchProfile: () => Promise<void>;
    updateProfile: (name: string, email: string) => Promise<void>;
    updatePassword: (
        currentPassword: string,
        newPassword: string,
        newPasswordConfirmation: string
    ) => Promise<void>;
    deleteAccount: (password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token: localStorage.getItem(TOKEN_STORAGE_KEY),
    user: null,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post<ApiResponse<AuthTokenData>>('/login', {
                email,
                password,
            });
            const token = data.data.token;
            localStorage.setItem(TOKEN_STORAGE_KEY, token);
            set({ token, loading: false });
            await get().fetchProfile();
        } catch (err) {
            const message =
                (err as AxiosError<ApiResponse<null>>).response?.data?.message
                ?? 'Login failed';
            set({ error: message, loading: false });
            throw err;
        }
    },

    register: async (name, email, password, passwordConfirmation) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post<ApiResponse<AuthTokenData>>('/register', {
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
            const message =
                (err as AxiosError<ApiResponse<null>>).response?.data?.message
                ?? 'Registration failed';
            set({ error: message, loading: false });
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
        const { data } = await api.get<ApiResponse<User>>('/profile');
        set({ user: data.data });
    },

    updateProfile: async (name, email) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.put<ApiResponse<User>>('/profile', {
                name,
                email,
            });
            set({ user: data.data, loading: false });
        } catch (err) {
            const message =
                (err as AxiosError<ApiResponse<null>>).response?.data?.message
                ?? 'Failed to update profile';
            set({ error: message, loading: false });
            throw err;
        }
    },

    updatePassword: async (currentPassword, newPassword, newPasswordConfirmation) => {
        set({ loading: true, error: null });
        try {
            await api.put('/password', {
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: newPasswordConfirmation,
            });
            set({ loading: false });
        } catch (err) {
            const message =
                (err as AxiosError<ApiResponse<null>>).response?.data?.message
                ?? 'Failed to update password';
            set({ error: message, loading: false });
            throw err;
        }
    },

    deleteAccount: async (password) => {
        set({ loading: true, error: null });
        try {
            await api.delete('/profile', { data: { password } });
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            set({ token: null, user: null, loading: false });
        } catch (err) {
            const message =
                (err as AxiosError<ApiResponse<null>>).response?.data?.message
                ?? 'Failed to delete account';
            set({ error: message, loading: false });
            throw err;
        }
    },
}));
