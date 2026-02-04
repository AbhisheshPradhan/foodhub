# FoodHub

A restaurant menu management platform that lets restaurant owners create, organize, and publish their menus with QR code access for customers.

## Tech Stack

- **Frontend** — Next.js 16, React 19, Tailwind CSS 4, TypeScript
- **Backend** — Express 5, TypeScript, Prisma ORM
- **Database** — PostgreSQL 16
- **Auth** — AWS Cognito + JWT
- **Infrastructure** — Docker Compose

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

## Getting Started

1. **Clone the repo**

```sh
git clone <repo-url>
cd foodhub
```

2. **Configure environment variables**

```sh
cp backend/.env.example backend/.env
```

Edit `backend/.env` and set your `JWT_SECRET`.

3. **Start all services**

```sh
docker compose up -d
```

This starts the PostgreSQL database, backend (port 4000), and frontend (port 3000). Prisma migrations run automatically on backend startup.

4. **Open the app** at [http://localhost:3000](http://localhost:3000)

## Running Without Docker

If you prefer running services directly:

```sh
# Backend
cd backend
npm install
npx prisma migrate dev
npx prisma generate
npm run dev

# Frontend (in a separate terminal)
cd frontend
npm install
npm run dev
```

Requires Node 20+ and a running PostgreSQL instance. Update `DATABASE_URL` in `backend/.env` to point to your local database.

## Useful Commands

```sh
# View logs
docker compose logs -f

# Run a new Prisma migration
docker compose exec backend npx prisma migrate dev --name <migration_name>

# Regenerate Prisma client
docker compose exec backend npx prisma generate

# Restart a single service
docker compose restart backend

# Stop everything
docker compose down

# Stop and remove volumes (wipes database)
docker compose down -v

# Reset migrations
docker compose exec backend npx prisma migrate reset
```

## Project Structure

```
foodhub/
├── backend/          # Express API server
│   ├── prisma/       # Schema and migrations
│   └── src/
├── frontend/         # Next.js app
│   ├── app/          # App router pages
│   ├── components/   # React components
│   ├── contexts/     # React contexts
│   └── hooks/        # Custom hooks
├── shared/           # Shared TypeScript types
└── docker-compose.yml
```
