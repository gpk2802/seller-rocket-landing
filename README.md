# Seller Rocket - Task 1

Responsive lead capture landing page with a Node.js/Express API and Supabase Postgres storage.

## Tech Stack

- Frontend: Vite, React, TypeScript, Tailwind CSS, shadcn-style components
- Backend: Node.js, Express, TypeScript
- Database: Supabase Postgres

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a Supabase project and run the SQL in `server/supabase-schema.sql`.

3. Create `server/.env` from `server/.env.example`:

```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

Keep `SUPABASE_SERVICE_ROLE_KEY` only in `server/.env`. Never place it in frontend code.

4. Start both apps:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## API

- `POST /api/leads`
- `GET /api/leads`
- `GET /api/leads?platform=Shopify`
- `PATCH /api/leads/:id/status`
- `DELETE /api/leads/:id`

## Vercel Notes

When deploying the `client` app to Vercel, keep `VITE_API_BASE_URL` blank so the frontend uses same-origin `/api` serverless routes. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel project settings for those routes.

## Completed For Task 1

- Seller Rocket branded responsive landing page
- Animated hero and responsive navbar
- Services section with Amazon, Shopify, and WordPress cards
- Lead form with inline validation
- Backend validation for phone, email, platform, and status
- Supabase-backed lead storage
- Admin leads view with platform filter, status update, delete, loading, empty, and error states
