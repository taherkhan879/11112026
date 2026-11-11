# Movie Search App

A React + Vite single-page movie search application powered by The Movie Database (TMDB).

## Features

- Search movies by title
- Movie poster, title, release date, rating, and overview
- API pagination
- Sort current-page results by release date or rating
- Filter current-page results by minimum rating
- Loading, empty, and error states
- Responsive layout

## Run locally

1. Install Node.js if needed.
2. Copy `.env.example` to `.env`.
3. Add your TMDB API key to `.env`:
   `VITE_TMDB_API_KEY=your_tmdb_api_key_here`
4. Install dependencies:
   `npm install`
5. Start the development server:
   `npm run dev`

## Important API-key note

Vite exposes variables beginning with `VITE_` in browser code. This setup is suitable for a learning/demo project, but it does **not** keep the API key secret. Follow TMDB's terms and use a backend/proxy if you need to protect credentials in a public production application. Never commit your `.env` file.

## Build

```bash
npm run build
npm run preview
```

## Deploy

You can deploy the project to Netlify or Vercel. Set the build command to `npm run build` and the publish directory to `dist`. Add `VITE_TMDB_API_KEY` in the hosting provider's environment-variable settings. Remember that a Vite client-side variable is still visible to visitors.
