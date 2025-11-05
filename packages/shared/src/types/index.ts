// Shared TypeScript types
export interface User {
	id: string;
	email: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface ApiResponse<T> {
	data: T;
	message?: string;
	error?: string;
}

export interface PaginationParams {
	page: number;
	limit: number;
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}
