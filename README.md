# HanaCare Super App Monorepo

Monorepo for HanaCare Super App with Scrum-based team collaboration structure, built with Bun 1.3.1+, Next.js, React Native CLI, Elysia.js, Supabase, and Railway.

## Tech Stack

- **Runtime**: Bun 1.3.1+
- **Web App**: Next.js 15+ (TypeScript, Tailwind CSS)
- **Mobile App**: React Native CLI (TypeScript)
- **Backend API**: Elysia.js (Bun runtime)
- **Database & Auth**: Supabase
- **Deployment**: Vercel (Web), Railway (Backend)
- **Code Quality**: Biome.js (replaces ESLint/Prettier)
- **Monorepo**: Bun Workspaces

## Project Structure

```
hanacare-monorepo/
├── apps/
│   ├── web/           # Next.js web application
│   └── mobile/        # React Native CLI mobile app
├── services/
│   └── api/           # Elysia.js backend API
├── packages/
│   └── shared/        # Shared types, utils, constants
├── docs/              # Documentation
│   ├── requirements/  # Requirements (BA team)
│   ├── user-stories/  # User stories (BA team)
│   ├── specs/         # Technical specs (BA + DEV)
│   └── sprint-notes/  # Sprint notes (All teams)
├── features/          # Gherkin test scenarios (QA team)
├── infra/             # Infrastructure configs (Vercel, Railway)
├── tools/             # Development tools and scripts
└── .github/           # GitHub workflows and templates
```

## Team Roles

- **Product Owner (PO)**: Backlog management, sprint goals, feature prioritization
- **Business Analyst (BA)**: Requirements, user stories, acceptance criteria
- **Developer (DEV)**: Code implementation, technical design
- **Tester (QA)**: Test scenarios (Gherkin), automated tests, quality assurance

## Scrum Workflow

### Sprint Cycle
1. **Sprint Planning**: PO presents backlog, BA refines stories, DEV/QA estimate
2. **Sprint Execution**: Teams work in parallel, daily scrums, feature branches
3. **Sprint Review**: Demo, QA verification, BA validation, PO acceptance
4. **Sprint Retrospective**: Process improvement notes in `/docs/sprint-notes/`

### Branching Strategy
- Feature branches for each story/task: `feature/sprint-X-story-XXX`
- Isolation by story/sprint to minimize merge conflicts
- CODEOWNERS enforce review requirements per folder

### Documentation
- **User Stories**: `/docs/user-stories/` - BA owned
- **Requirements**: `/docs/requirements/` - BA owned
- **Test Scenarios**: `/features/` - QA owned (Gherkin format)
- **Sprint Notes**: `/docs/sprint-notes/` - All teams

## Getting Started

### Prerequisites

- Bun 1.3.1+ installed ([Install Bun](https://bun.sh/))
- Node.js 18+ (for React Native CLI)
- Supabase account
- Vercel account (for web deployment)
- Railway account (for backend deployment)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hanacare-monorepo
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development servers**
   ```bash
   # Start all apps
   bun run dev

   # Or start individually
   bun run dev:web      # Next.js web app (http://localhost:3000)
   bun run dev:api      # Elysia.js API (http://localhost:3000)
   bun run dev:mobile   # React Native app
   ```

5. **Code quality checks**
   ```bash
   bun run lint         # Check code with Biome
   bun run lint:fix     # Auto-fix linting issues
   bun run format       # Format code with Biome
   bun run typecheck    # TypeScript type checking
   ```

6. **Create feature branch**
   ```bash
   git checkout -b feature/sprint-X-story-XXX
   ```

## Development Guidelines

### Code Style
- Use Biome.js for linting and formatting (no ESLint/Prettier)
- Run `bun run format` before committing
- TypeScript strict mode enabled
- Follow existing code patterns

### Commits & PRs
- Reference user stories and Gherkin features in commits: `[Sprint-X][Story-XXX] Description`
- Ensure all acceptance criteria are met before PR
- QA tests must pass before merge
- Follow CODEOWNERS review requirements

### Shared Code
- Use `@hanacare/shared` package for shared types, utils, and constants
- Import: `import { User, formatDate } from '@hanacare/shared'`
- Keep shared code framework-agnostic when possible

### Backend Development
- Elysia.js routes in `services/api/src/routes/`
- Use OpenAPI decorators for API documentation
- Supabase client in `services/api/src/lib/supabase.ts`

### Mobile Development
- React Native CLI setup (not Expo)
- Native modules configured in `apps/mobile/ios/` and `apps/mobile/android/`
- Run `bun run dev:mobile` to start Metro bundler

## Cursor AI Integration

This repo uses Cursor AI with Scrum collaboration rules. Reference `@rules scrum-collaboration` in Cursor for:
- Creating user stories and acceptance criteria
- Generating Gherkin feature files
- Sprint planning and tracking
- Team role-specific prompts

## Deployment

### Web App (Vercel)
1. Connect repository to Vercel
2. Configure build settings in `infra/vercel.json`
3. Deploy automatically on push to main branch

### Backend API (Railway)
1. Connect repository to Railway
2. Configure environment variables
3. Set start command: `bun run start`
4. Deploy automatically on push to main branch

### Mobile App
- Build iOS: `cd apps/mobile && bun run ios`
- Build Android: `cd apps/mobile && bun run android`
- Use Fastlane for CI/CD (optional)

## Scripts Reference

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all apps in development mode |
| `bun run dev:web` | Start Next.js web app |
| `bun run dev:api` | Start Elysia.js API |
| `bun run dev:mobile` | Start React Native Metro bundler |
| `bun run build` | Build all apps |
| `bun run lint` | Run Biome linting |
| `bun run lint:fix` | Auto-fix linting issues |
| `bun run format` | Format code with Biome |
| `bun run typecheck` | TypeScript type checking |
| `bun run test` | Run tests |

## Resources

- [Bun Documentation](https://bun.sh/docs)
- [Elysia.js Documentation](https://elysiajs.com/)
- [Biome.js Documentation](https://biomejs.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Documentation](https://reactnative.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)

## Contact

For questions about the Scrum workflow or repository structure, contact the Scrum Master or Product Owner.

