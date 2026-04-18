import { create } from "zustand";
import { AxiosError } from "axios";
import { api } from "../services/api.ts";
import type { Note, ApiResponse } from "../types/api.ts";

interface NoteState {
    notes: Note[];
    loading: boolean;
    error: string | null;

    fetchNotes: () => Promise<void>;
    createNote: (text: string, tagId: number) => Promise<Note>;
    updateNote: (id: number, text: string, tagId: number) => Promise<Note>;
    deleteNote: (id: number) => Promise<void>;
}

export const useNoteStore = create<NoteState>((set) => ({
    notes: [],
    loading: false,
    error: null,

    fetchNotes: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.get<ApiResponse<Note[]>>('/notes');
            set({ notes: data.data, loading: false });
        } catch (err) {
            const message =
                (err as AxiosError<ApiResponse<null>>).response?.data?.message
                ?? 'Failed to fetch notes';
            set({ error: message, loading: false });
            throw err;
        }
    },

    createNote: async (text, tagId) => {
        set({ loading: true, error: null});
        try {
            const { data } = await api.post<ApiResponse<Note>>('/notes', {
                tag_id: tagId,
                text
            });
            set((state) => ({ notes: [...state.notes, data.data], loading: false }))
            return data.data;
        } catch (err) {
            const message =
                (err as AxiosError<ApiResponse<null>>).response?.data?.message
                ?? 'Failed to create note';
            set({ error: message, loading: false });
            throw err;
        }
    },

    updateNote: async (id, text, tagId) => {
        set({ loading: true, error: null});
        try {
            const { data } = await api.put<ApiResponse<Note>>(`/notes/${id}`, {
                tag_id: tagId,
                text,
            })
            set((state) => ({
                notes: state.notes.map((note: Note) => note.id === id ? data.data : note),
                loading: false
            }));
            return data.data;
        } catch (err) {
            const message =
                (err as AxiosError<ApiResponse<null>>).response?.data?.message
                ?? 'Failed to update note';
            set({ error: message, loading: false });
            throw err;
        }
    },

    deleteNote: async (id) => {
        set({loading: true, error: null});
        try {
            await api.delete<ApiResponse<void>>(`/notes/${id}`);
            set((state) => ({
                notes: state.notes.filter((note: Note) => note.id !== id),
                loading: false
            }));
        } catch (err) {
            const message =
                (err as AxiosError<ApiResponse<null>>).response?.data?.message
                ?? 'Failed to delete note';
            set({error: message, loading: false});
            throw err;
        }
    }

}))