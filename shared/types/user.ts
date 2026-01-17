export interface User {
	id: number;
	email: string;
	password: string;
	name: string;
	restaurantId: string;
	role: Role;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export type Role = "owner";

export type CreateUserDto = Omit<
	User,
	"id" | "restaurantId" | "role" | "isActive" | "createdAt" | "updatedAt"
>;
