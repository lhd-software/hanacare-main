// Shared constants

export const API_ENDPOINTS = {
	HEALTH: "/health",
	HEALTH_READY: "/health/ready",
} as const;

export const APP_CONFIG = {
	NAME: "HanaCare",
	VERSION: "1.0.0",
	DESCRIPTION: "HanaCare Super App - Healthcare Platform",
} as const;

export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
} as const;
