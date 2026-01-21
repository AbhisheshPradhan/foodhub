import type { Restaurant } from "./restaurants";

export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    restaurantId: number;
    role: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type Role = "owner";

export type CreateUserDto = Omit<User, "id" | "createdAt" | "updatedAt">;

export type LoginResponseDto = Pick<
    User,
    "id" | "email" | "name" | "restaurantId"
>;

export type SignUpResponseDto = {
    user: Pick<User, "id" | "email" | "name" | "role">;
    restaurant: Restaurant;
};
