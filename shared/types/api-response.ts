export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	errors?: string[] | object;
	meta?: {
		total?: number; // total items
		page?: number; // current page
		pageSize?: number; // items per page
	};
}
