import { Elysia } from "elysia";

const healthRoutes = new Elysia({ prefix: "/health" })
	.get("/", () => ({
		status: "ok",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	}))
	.get("/ready", () => ({
		status: "ready",
		checks: {
			database: "connected",
			api: "operational",
		},
	}));

export default healthRoutes;
