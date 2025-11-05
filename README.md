# HanaCare Super App Monorepo

Monorepo for HanaCare Super App with Scrum-based team collaboration structure, built with Bun 1.3.1+, Next.js, React Native CLI, Elysia.js, Supabase, and Railway.

## Tech Stack

- **Runtime**: Bun 1.3.1+
- **Web App**: Next.js 15.1.5+ (TypeScript, Tailwind CSS, React 19)
- **Mobile App**: React Native CLI 0.76.5 (TypeScript, React 18.3.1)
- **Backend API**: Elysia.js 1.1.23 (Bun runtime)
- **Database & Auth**: Supabase (v2.47.10)
- **Deployment**: Vercel (Web), Railway (Backend)
- **Code Quality**: Biome.js 1.9.4 (replaces ESLint/Prettier)
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
- Supabase account and project
- Vercel account (for web deployment)
- Railway account (for backend deployment)
- **For Mobile Development:**
  - Xcode 15+ (macOS only, for iOS development)
  - Android Studio (for Android development)
  - CocoaPods: `sudo gem install cocoapods` (for iOS)
  - Java Development Kit (JDK) for Android

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
   # Create .env files in each app/service directory as needed
   # apps/web/.env.local - Next.js environment variables
   # services/api/.env - API environment variables
   # apps/mobile/.env - Mobile app environment variables
   # Add your Supabase credentials and other required variables
   ```

4. **Start development servers**
   ```bash
   # Start all apps
   bun run dev

   # Or start individually
   bun run dev:web      # Next.js web app (http://localhost:3000)
   bun run dev:api      # Elysia.js API (http://localhost:3001)
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
- Shared package structure:
  - `packages/shared/src/types/` - TypeScript types
  - `packages/shared/src/utils/` - Utility functions
  - `packages/shared/src/constants/` - Constants

### Backend Development
- Elysia.js routes in `services/api/src/routes/`
- Use OpenAPI decorators (`@elysiajs/openapi`) for API documentation
- Supabase client in `services/api/src/lib/supabase.ts`
- CORS enabled via `@elysiajs/cors`

### Mobile Development
- React Native CLI 0.76.5 setup (not Expo)
- Native modules configured in `apps/mobile/ios/` and `apps/mobile/android/`
- Run `bun run dev:mobile` to start Metro bundler
- Use `bun run start:clean` to clear Metro cache and restart
- See `docs/MOBILE_SETUP.md` for detailed setup instructions

## Cursor AI Integration

This repo uses Cursor AI with Scrum collaboration rules. Reference `@rules scrum-collaboration` in Cursor for:
- Creating user stories and acceptance criteria
- Generating Gherkin feature files
- Sprint planning and tracking
- Team role-specific prompts

## Deployment

### Web App (Vercel)
1. Connect repository to Vercel
2. Build settings are configured in `infra/vercel.json`:
   - Build command: `cd apps/web && bun run build`
   - Output directory: `apps/web/.next`
   - Install command: `bun install`
3. Deploy automatically on push to main branch

### Backend API (Railway)
1. Connect repository to Railway
2. Build settings are configured in `infra/railway.json`:
   - Build command: `cd services/api && bun install && bun run build`
   - Start command: `cd services/api && bun run start`
3. Configure environment variables in Railway dashboard
4. Deploy automatically on push to main branch

### Mobile App
- Build iOS: `cd apps/mobile && bun run ios`
- Build Android: `cd apps/mobile && bun run android`
- Clear Metro cache: `cd apps/mobile && bun run start:clean`
- Use Fastlane for CI/CD (optional)
- See `docs/MOBILE_SETUP.md` for initial setup
- See `docs/ANDROID_SETUP.md` for Android-specific setup

## Scripts Reference

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all apps in development mode |
| `bun run dev:web` | Start Next.js web app (http://localhost:3000) |
| `bun run dev:api` | Start Elysia.js API (http://localhost:3001) |
| `bun run dev:mobile` | Start React Native Metro bundler |
| `bun run build` | Build all apps |
| `bun run lint` | Run Biome linting |
| `bun run lint:fix` | Auto-fix linting issues |
| `bun run format` | Format code with Biome |
| `bun run typecheck` | TypeScript type checking (all packages) |
| `bun run test` | Run tests (all packages) |
| `bun run clean` | Clean build artifacts and node_modules |

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

