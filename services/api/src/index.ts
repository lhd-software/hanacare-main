import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import healthRoutes from "./routes/health";

const app = new Elysia()
	.use(cors())
	.use(openapi())
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
