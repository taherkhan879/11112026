const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export async function searchMovies(query, page = 1) {
  if (!API_KEY || API_KEY === 'your_tmdb_api_key_here') {
    throw new Error('Add your TMDB API key to the .env file, then restart the dev server.')
  }

  const url = new URL(`${BASE_URL}/search/movie`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('query', query)
  url.searchParams.set('page', String(page))
  url.searchParams.set('include_adult', 'false')

  const response = await fetch(url)

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('TMDB rejected the API key. Check the key in your .env file.')
    }
    throw new Error(`Movie search failed (${response.status}). Please try again.`)
  }

  return response.json()
}
