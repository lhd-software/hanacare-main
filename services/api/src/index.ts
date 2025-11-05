import { cors } from "@elysiajs/cors";
import { openAPI } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import healthRoutes from "./routes/health";

const app = new Elysia()
	.use(cors())
	.use(
		openAPI({
			info: {
				title: "HanaCare API",
				version: "1.0.0",
				description: "HanaCare Super App Backend API",
			},
			tags: [{ name: "health", description: "Health check endpoints" }],
		}),
	)
	.use(healthRoutes)
	.get("/", () => ({
		message: "Hello HanaCare!",
		version: "1.0.0",
	}))
	.listen(process.env.PORT || 3000);

console.log(
	`🦊 HanaCare API is running at http://${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
