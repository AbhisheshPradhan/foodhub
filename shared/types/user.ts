export interface User {
	id: number;
	email: string;
	cognitoSub: string;
	name: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export type Role = "owner";

export type CreateUserDto = Omit<User, "id" | "createdAt" | "updatedAt">;

export type LoginResponseDto = Pick<User, "id" | "email" | "name">;

export type SignUpResponseDto = {
	user: Pick<User, "id" | "email" | "name">;
};
