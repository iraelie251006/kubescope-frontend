<div align="center">

# KubeScope

**A calm, modern dashboard for Kubernetes cost, usage, and alerts.**

See every node, namespace, and deployment in your cluster. Track spend, catch anomalies, and act on alerts — without the FinOps spreadsheet.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[Live tour](https://kubescopef.vercel.app) · [Backend repo](https://github.com/iraelie251006/kubescope) · [Report a bug](https://github.com/iraelie251006/kubescope-frontend/issues)

</div>

---

## Overview

KubeScope is the Kubernetes dashboard for teams who care **what each pod costs** and **which deployment just broke the budget**. This repository contains the **frontend** — a Next.js 14 App Router application that consumes the [KubeScope API](https://github.com/iraelie251006/kubescope) (Spring Boot).

It pairs honest, per-namespace cost numbers with a calm UI and motion that earns its place — no spinning gradients for their own sake.

## Features

- **Real cost, not estimates** — per-namespace, per-deployment cost broken down by node price, requests, and actual usage.
- **Live cluster pulse** — CPU, memory, pods, and nodes as sparklines that update with the cluster.
- **Alerts that mean something** — rules over usage, cost burn-rate, and rogue deployments. Quiet by default, loud when it matters.
- **Every workload, indexed** — nodes, namespaces, deployments are searchable, sortable, and linkable.
- **Read-only by design** — KubeScope never writes to your cluster. Your RBAC stays exactly as restrictive as you set it.
- **Modern marketing site + auth UX** — public landing page at `/`, polished login, animated dashboard chrome.

## Tech Stack

| Layer        | Choice                                                              |
| ------------ | ------------------------------------------------------------------- |
| Framework    | [Next.js 14](https://nextjs.org/) (App Router, RSC, Edge middleware) |
| Language     | TypeScript 5                                                        |
| Styling      | Tailwind CSS 3.4 with a custom `ink` / `brand` / `accent` palette   |
| Charts       | [Recharts](https://recharts.org/)                                    |
| Fonts        | Inter, Space Grotesk, JetBrains Mono (via `next/font`)              |
| Auth         | HTTP-only `access_token` + `refresh_token` cookies, silent refresh in middleware |
| Container    | Multi-stage Docker build, standalone Next.js output                 |

Motion is built on Tailwind keyframes and a small `<Reveal>` IntersectionObserver primitive — no Framer Motion, no heavy runtime deps. Everything respects `prefers-reduced-motion`.

## Architecture

```
┌──────────────────────────────────────────┐        ┌─────────────────────────────┐
│        Browser (kubescope-frontend)      │        │  Backend (iraelie251006/    │
│  Next.js 14 · React 18 · Tailwind        │        │           kubescope)         │
│                                          │        │  Spring Boot 4 · Postgres   │
│  ┌────────────┐    ┌──────────────────┐  │        │  Redis · K8s client · AWS   │
│  │  /  hero   │    │  /dashboard       │  │  REST  │  pricing                    │
│  │  /login    │ ─► │  /nodes /alerts   │ ─┼────────► /api/v1/cluster/*           │
│  └────────────┘    │  /namespaces ...  │  │   +    │  /api/v1/metrics/*          │
│         ▲          └──────────────────┘  │ cookies│  /api/v1/alerts/*            │
│         │                                │        │  /api/v1/auth/*              │
│  ┌──────┴────────────────────────────┐   │        └─────────────────────────────┘
│  │ middleware.ts                     │   │
│  │  • gates /(authenticated)/*       │   │        ┌─────────────────────────────┐
│  │  • silent refresh on expiry       │   │        │  Your Kubernetes cluster    │
│  │  • allows / and /login publicly   │   │        │  (kubeconfig or in-cluster) │
│  └───────────────────────────────────┘   │        └─────────────────────────────┘
└──────────────────────────────────────────┘
```

- The browser **never** talks to the backend directly with `Authorization` headers — it uses cookies.
- Server Components call the backend via `serverGet()` in `lib/api.ts`, forwarding the `access_token` cookie.
- Client Components hit `/api/proxy/*` routes in this app, which forward cookies to the backend.
- `middleware.ts` performs a single-flight silent refresh when only the `refresh_token` is present, then continues the request.

## Getting Started

### Prerequisites

- **Node.js 20+** and **npm 10+**
- A running [KubeScope backend](https://github.com/iraelie251006/kubescope) (locally or remote)
- A Kubernetes cluster the backend can reach (kubeconfig or in-cluster service account)

### 1. Clone and install

```bash
git clone https://github.com/iraelie251006/kubescope-frontend
cd kubescope-frontend
npm install
```

### 2. Configure the backend URL

```bash
cp .env.example .env.local
# edit .env.local
```

```env
# .env.local
BACKEND_URL=http://localhost:8080
```

> [!IMPORTANT]
> The backend Docker image defaults to **port `3000`** — the same port Next.js dev uses. Either run the backend on a different port (e.g. `-p 8080:3000`) or run the frontend on a different one (`PORT=4000 npm run dev`) and set `BACKEND_URL` to match.

### 3. Run the dev server

```bash
npm run dev
```

The app is at <http://localhost:3000>. The landing page (`/`) is public; everything under `/dashboard`, `/nodes`, `/namespaces`, `/deployments`, `/alerts` is gated by the middleware.

### 4. Create an account

The backend seeds an admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD` on first boot. Sign in at `/login`, or hit `POST /api/v1/auth/register` directly against the backend.

## Available Scripts

| Script              | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the Next.js dev server (hot reload)          |
| `npm run build`     | Production build (standalone output)               |
| `npm run start`     | Run the production build                           |
| `npm run typecheck` | `tsc --noEmit` — strict type check, no emit        |
| `npm run lint`      | `next lint`                                        |

## Environment Variables

| Variable      | Default                 | Purpose                                                         |
| ------------- | ----------------------- | --------------------------------------------------------------- |
| `BACKEND_URL` | `http://localhost:8080` | Origin of the KubeScope API (no trailing slash)                 |
| `PORT`        | `3000`                  | Port the Next.js server binds to (production / standalone)      |
| `NODE_ENV`    | `development`           | Standard Next.js env                                            |

Anything else lives on the [backend](https://github.com/iraelie251006/kubescope#environment-variables) — JWT secret, SMTP, AWS pricing toggles, alert evaluator interval, etc.

## Project Structure

```
frontend/
├── app/
│   ├── (authenticated)/        # gated routes — dashboard, nodes, namespaces, deployments, alerts
│   ├── api/
│   │   ├── auth/               # login / logout / refresh — sets HTTP-only cookies
│   │   └── proxy/              # client-side fetches go through here so cookies travel
│   ├── login/                  # split-layout sign-in
│   ├── globals.css             # motion vocabulary, gradient text, aurora, reveal, grid
│   ├── layout.tsx              # root: fonts (Inter / Space Grotesk / JetBrains Mono)
│   └── page.tsx                # public marketing landing page
├── components/
│   ├── landing/                # Reveal, DashboardMock, Marquee, Icon
│   ├── Sidebar.tsx             # authenticated nav with icon + active pulse
│   ├── StatCard.tsx            # hover lift + radial glow
│   ├── *Chart.tsx              # Recharts wrappers (cost, usage)
│   └── AlertsClient.tsx        # alert rules CRUD UI
├── lib/
│   ├── api.ts                  # serverGet() + cookie helpers
│   ├── format.ts               # money / percent formatters
│   └── types.ts                # shared DTOs (ClusterOverview, NodeRow, ...)
├── middleware.ts               # auth gate + silent refresh + public route allowlist
├── tailwind.config.ts          # palette, keyframes (float, drift, shimmer, aurora, ...)
├── next.config.js              # standalone output
└── Dockerfile                  # multi-stage build
```

## API Surface (consumed)

The frontend consumes these backend endpoints. Full reference lives in the [backend README](https://github.com/iraelie251006/kubescope#rest-api-endpoints).

| Frontend route                  | Backend call                                |
| ------------------------------- | ------------------------------------------- |
| `POST /api/auth/login`          | `POST /api/v1/auth/login`                   |
| `POST /api/auth/refresh`        | `POST /api/v1/auth/refresh`                 |
| `POST /api/auth/logout`         | `POST /api/v1/auth/logout`                  |
| `/dashboard` (RSC)              | `GET /api/v1/cluster/overview` + history    |
| `/nodes` (RSC)                  | `GET /api/v1/cluster/nodes`                 |
| `/namespaces` (RSC)             | `GET /api/v1/cluster/namespaces`            |
| `/deployments` (RSC)            | `GET /api/v1/cluster/deployments`           |
| `GET /api/proxy/metrics/history`| `GET /api/v1/metrics/history?range=…`       |
| `/alerts` (RSC + CRUD client)   | `GET/POST/DELETE /api/v1/alerts`            |

## Docker

A production image is built from the included `Dockerfile`:

```bash
docker build -t kubescope-frontend .
docker run --rm -p 3000:3000 \
  -e BACKEND_URL=http://host.docker.internal:8080 \
  kubescope-frontend
```

The image runs as a non-root user (`kubescope`, UID 1001) and uses Next.js standalone output for a small footprint.

### Docker Compose (frontend + backend)

The [backend repo](https://github.com/iraelie251006/kubescope) ships a `docker-compose.yml` with Postgres + Redis. The simplest end-to-end setup is:

1. Start the backend stack: `docker compose up --build` (from the backend repo).
2. Run this frontend with `BACKEND_URL` pointing at the backend container.

## Design Notes

KubeScope's UI follows a few rules:

- **Dark hero, light app.** Marketing surfaces are dark with aurora gradients; the authenticated dashboard is light, calm, and high-contrast for long reading sessions.
- **Motion that earns its place.** Every animation is either communicating state (live, loading, focus) or revealing content. No spinning logos.
- **Display vs. body type.** Space Grotesk for headlines and stat numerals (tabular figures), Inter for body, JetBrains Mono for code / IDs.
- **No motion library.** Pure CSS keyframes + Tailwind utilities + a small `<Reveal>` IntersectionObserver primitive. `prefers-reduced-motion` short-circuits everything.

## Roadmap

- [ ] Per-deployment drill-down with owner & SLO panel
- [ ] Dark mode for the authenticated app
- [ ] Saved views and shareable links
- [ ] OpenAPI client generation from the backend spec
- [ ] Storybook for the design system

## Contributing

Issues and PRs welcome. Before opening a PR:

```bash
npm run typecheck
npm run lint
npm run build
```

For backend changes, please open the PR against [iraelie251006/kubescope](https://github.com/iraelie251006/kubescope) instead.

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">
<sub>Built with care for the cloud-native stack — Kubernetes · Prometheus · OpenCost · EKS · GKE · AKS</sub>
</div>
