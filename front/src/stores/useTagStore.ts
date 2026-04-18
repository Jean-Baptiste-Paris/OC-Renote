import { create } from "zustand";
import { AxiosError } from "axios";
import { api } from "../services/api.ts";
import type { Tag, ApiResponse } from "../types/api.ts";

interface TagState {
    tags: Tag[];
    loading: boolean;
    error: string | null;

    fetchTags: () => Promise<void>;
    createTag: (name: string) => Promise<Tag>;
}

export const useTagStore = create<TagState>((set) => ({
    tags: [],
    loading: false,
    error: null,

    fetchTags: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.get<ApiResponse<Tag[]>>('/tags');
            set({ tags: data.data, loading: false });
        } catch (err) {
            const message =
                (err as AxiosError<ApiResponse<null>>).response?.data?.message
                ?? 'Failed to fetch tags';
            set({ error: message, loading: false });
            throw err;
        }
    },

    createTag: async (name: string) => {
        set({ loading:true, error: null });
        try {
            const { data } = await api.post<ApiResponse<Tag>>('/tags', { name });
            set((state) => ({ tags: [...state.tags, data.data], loading: false }))
            return data.data;
        } catch (err) {
            const message =
                (err as AxiosError<ApiResponse<null>>).response?.data?.message
                ?? 'Failed to create tag';
            set({ error: message, loading: false });
            throw err;
        }
    }
}))