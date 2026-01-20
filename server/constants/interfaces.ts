export type Role = 'ADMIN' | 'SELLER' | 'BUYER';

export enum VehicleStatus {
    AVAILABLE = "AVAILABLE",
    SOLD = "SOLD",
    PENDING = "PENDING",
}

export enum VehicleCondition {
    NEW = "NEW",
    USED = "USED",
    REFURBISHED = "REFURBISHED",
}

export interface User {
    name?: string;
    email: string;
    password: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface Vehicle {
    categoryId: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuel_type: string;
    transmission: string;
    condition: VehicleCondition;
    description?: string | null;
    status: VehicleStatus;
}

export interface JwtPayload {
    id: number;
    role: Role;
}

export interface CreateVehicleCategory {
    category_name: string;
}