export interface ApiResponse<T> {
    status: 'success' | 'error';
    message: string;
    data: T;
}

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Note {
    id: number;
    text: string;
    tag: Tag;
    created_at: string;
    updated_at: string;
}

export interface AuthTokenData {
    token: string;
}
