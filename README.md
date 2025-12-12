
# LingoBox — Next.js (App Router) + Supabase + OpenAI (Scaffold)

This is a scaffold for the project you asked for. It includes:
- Next.js (App Router) project structure
- Tailwind CSS for styling
- Supabase client usage for simple backend (auth + database)
- An API route that proxies to OpenAI for AI chat (server-side, requires OPENAI_API_KEY)
- Mocked subscription gating logic (demo)

## What you must configure in Vercel (Environment Variables)
Set these in your Vercel project settings -> Environment Variables:

- NEXT_PUBLIC_SUPABASE_URL = <your supabase url>
- NEXT_PUBLIC_SUPABASE_ANON_KEY = <your supabase anon key>
- SUPABASE_SERVICE_ROLE_KEY = <optional, only for server operations if used>
- OPENAI_API_KEY = <your OpenAI API Key>

## How to run locally (dev)
1. `npm install`
2. create a `.env.local` file with the same env names as above
3. `npm run dev` and open http://localhost:3000

## Deploy to Vercel
1. Push this repo to GitHub or upload ZIP in Vercel "Import Project" → "Upload"
2. Set environment variables in Vercel dashboard
3. Deploy — Vercel will run `npm install` and `npm run build`

Notes:
- This scaffold is ready for basic demo usage. The OpenAI route expects `POST /api/ai` with JSON `{ "prompt": "text" }`.
- Supabase integration uses the client in the browser for auth and a server helper for secure calls.
