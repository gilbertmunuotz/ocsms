export type Role = 'ADMIN' | 'SELLER' | 'BUYER';

export interface User {
    name?: string;
    email: string;
    password: string;
    role: Role;
}

export interface LoginBody {
    email: string;
    password: string;
}