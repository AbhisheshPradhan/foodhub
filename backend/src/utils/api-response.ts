export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
	meta?: {
		total?: number; // total items
		page?: number; // current page
		pageSize?: number; // items per page
	};
}

export const responseWrapper = {
	success: <T>(data: T): ApiResponse<T> => ({
		success: true,
		data,
	}),

	successNoData: <T>(message: string): ApiResponse<T> => ({
		success: true,
		message: message,
	}),

	error(message?: string): ApiResponse<Object> {
		return {
			success: false,
			error: message || ErrorMessages.DEFAULT,
		};
	},
};

export enum ErrorMessages {
	USER_EXISTS = "User already exists",
	USER_NOT_FOUND = "User does not exist",
	INVALID_LOGIN = "Invalid username or password",
	UNAUTHORIZED = "User not authorized",
	NOT_AUTHENTICATED = "User not authenticated",
	INVALID_TOKEN = "Invalid token",
	INVALID_PAYLOAD = "Invalid payload",
	INVALID_REQUEST = "Invalid request",
	FORBIDDEN = "No access",
	DEFAULT = "Internal server error",
}
