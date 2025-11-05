# HanaCare API

Elysia.js backend API for HanaCare Super App, running on Bun runtime.

## Development

```bash
# Install dependencies (from root)
bun install

# Start development server
bun run dev:api
# or
cd services/api && bun run dev
```

API will be available at [http://localhost:3000](http://localhost:3000)

OpenAPI documentation: [http://localhost:3000/swagger](http://localhost:3000/swagger)

## Environment Variables

Create `.env` in this directory:

```env
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Build

```bash
bun run build
```

## Production

```bash
bun run start
```

## Tech Stack

- Elysia.js
- Bun runtime
- Supabase
- OpenAPI/Swagger

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /health/ready` - Readiness check

