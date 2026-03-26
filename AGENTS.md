# Next.js Foundations Starter

This is the starter repository for the Next.js Foundations certification course.

## Project Overview

A Turborepo monorepo with two Next.js applications and shared packages:

```
nextjs-foundations-starter/
├── apps/
│   ├── web/          # Marketing site (port 3000)
│   └── blog/         # Content hub (port 3001)
├── packages/
│   ├── ui/           # Shared React components (@repo/ui)
│   └── api/          # Mock data layer with Faker (@repo/api)
├── turbo.json        # Turborepo task configuration
├── biome.jsonc       # Linting and formatting (Biome + ultracite)
└── package.json      # Root workspace configuration
```

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Strict mode enabled
- **Tailwind CSS 4** - Utility-first styling
- **Turborepo** - Monorepo build orchestration
- **Biome** - Fast linting and formatting (replaces ESLint/Prettier)
- **pnpm** - Fast, disk-efficient package manager
- **Vercel CLI** - Deploy, link projects, manage env vars

## Workflows

### Initial Setup

```bash
# Install Vercel CLI globally
pnpm add -g vercel

# Authenticate with Vercel
vercel login

# Clone and install
git clone https://github.com/YOUR_USERNAME/nextjs-foundations
cd nextjs-foundations
pnpm install

# Link to your Vercel project
vercel link

# Pull environment variables
vercel env pull
```

### Development

```bash
# Start both apps in dev mode
pnpm dev
# web: http://localhost:3000
# blog: http://localhost:3001

# Start a specific app
pnpm dev --filter @repo/web
pnpm dev --filter @repo/blog
```

### Vercel CLI

```bash
# Check deployment status
vercel list

# View deployment logs
vercel logs <deployment-url>

# Pull latest env vars
vercel env pull

# Open project in dashboard
vercel open
```

### Quality Checks

```bash
# Type check all packages
pnpm check-types

# Lint with Biome
pnpm lint

# Format with Biome
pnpm format

# Run all checks
pnpm check
```

### Building

```bash
# Build all packages
pnpm build

# Build specific app
pnpm build --filter @repo/web
```

## Package Dependencies

### Using Shared Packages

Import from `@repo/ui` for components:

```tsx
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
```

Import from `@repo/api` for mock data:

```tsx
import { getPosts } from "@repo/api/posts";
import { getGalleryItems } from "@repo/api/gallery";
```

### Adding Dependencies

```bash
# Add to specific app
pnpm add <package> --filter @repo/web

# Add to shared package
pnpm add <package> --filter @repo/ui

# Add dev dependency to root
pnpm add -D <package> -w
```

## TypeScript Configuration

This project uses strict TypeScript with Matt Pocock's recommended settings:

- `strict: true` - Full strict mode
- `noUncheckedIndexedAccess: true` - Safer array/object access
- `noImplicitOverride: true` - Explicit override keyword required
- `noPropertyAccessFromIndexSignature: true` - Bracket notation for index signatures

Path aliases are configured:

- `@/*` - Local app imports
- `@repo/ui/*` - Shared UI components
- `@repo/api/*` - Mock data functions

## Biome (Linting & Formatting)

This project uses Biome instead of ESLint/Prettier. Configuration extends `ultracite` preset.

```bash
# Check for issues
pnpm lint

# Auto-fix issues
pnpm format

# Check everything (lint + format)
pnpm check
```

## Turborepo Tasks

Defined in `turbo.json`:

| Task          | Cached | Description               |
| ------------- | ------ | ------------------------- |
| `dev`         | No     | Start development servers |
| `build`       | Yes    | Production build          |
| `check-types` | Yes    | TypeScript type checking  |
| `start`       | No     | Start production servers  |

## Common Patterns

### Server Components (Default)

All components in the App Router are Server Components by default:

```tsx
// app/page.tsx - This is a Server Component
import { getPosts } from "@repo/api/posts";

export default async function Page() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}
```

### Client Components

Add `"use client"` directive for interactivity:

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### Shared Components

Components in `@repo/ui` can be used in both apps:

```tsx
// packages/ui/src/button.tsx
export function Button({ children, ...props }) {
  return (
    <button className="..." {...props}>
      {children}
    </button>
  );
}

// apps/web/app/page.tsx
import { Button } from "@repo/ui/button";
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different ports
PORT=3002 pnpm dev --filter @repo/web
```

### Type Errors After Package Changes

```bash
# Clear Turborepo cache and rebuild
pnpm clean
pnpm install
pnpm build
```

### Biome Conflicts with Editor

Disable ESLint/Prettier extensions and enable Biome extension in your editor.

## Course Integration

This starter is designed for the Next.js Foundations certification. As you progress through lessons:

1. **Don't modify shared packages** unless instructed
2. **Focus on `apps/web` and `apps/blog`** for exercises
3. **Use `@repo/api` functions** for mock data
4. **Follow the lesson structure** - each builds on previous work

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Biome Documentation](https://biomejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->
