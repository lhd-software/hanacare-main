# HanaCare Web App

Next.js web application for HanaCare Super App.

## Development

```bash
# Install dependencies (from root)
bun install

# Start development server
bun run dev:web
# or
cd apps/web && bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Environment Variables

Create `.env.local` in this directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Build

```bash
bun run build
```

## Tech Stack

- Next.js 15+
- React 19
- TypeScript
- Tailwind CSS
- Supabase Client
