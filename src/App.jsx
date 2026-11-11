import { useEffect, useMemo, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import MovieList from './components/MovieList.jsx'
import Pagination from './components/Pagination.jsx'
import RatingFilter from './components/RatingFilter.jsx'
import SortControls from './components/SortControls.jsx'
import { searchMovies } from './services/movieApi.js'
import './App.css'

const DEFAULT_QUERY = 'Jurassic Park'

export default function App() {
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [inputSearchKey, setInputSearchKey] = useState(0)
  const [searchTrigger, setSearchTrigger] = useState(0)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [sortBy, setSortBy] = useState('relevance')
  const [minimumRating, setMinimumRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadMovies() {
      const trimmedQuery = query.trim()

      if (!trimmedQuery) {
        setMovies([])
        setTotalPages(0)
        setTotalResults(0)
        setLoading(false)
        setError('')
        return
      }

      setLoading(true)
      setError('')

      try {
        const data = await searchMovies(trimmedQuery, page)
        if (cancelled) return
        setMovies(data.results || [])
        setTotalPages(Math.min(data.total_pages || 0, 500))
        setTotalResults(data.total_results || 0)
      } catch (requestError) {
        if (cancelled) return
        setMovies([])
        setTotalPages(0)
        setTotalResults(0)
        setError(requestError.message || 'Something went wrong.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadMovies()
    return () => { cancelled = true }
  }, [query, page, searchTrigger])

  const visibleMovies = useMemo(() => {
    let result = movies.filter((movie) => Number(movie.vote_average || 0) >= minimumRating)

    if (sortBy === 'release_desc') {
      result = [...result].sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''))
    } else if (sortBy === 'release_asc') {
      result = [...result].sort((a, b) => (a.release_date || '9999').localeCompare(b.release_date || '9999'))
    } else if (sortBy === 'rating_desc') {
      result = [...result].sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
    } else if (sortBy === 'rating_asc') {
      result = [...result].sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0))
    }

    return result
  }, [movies, sortBy, minimumRating])

  function handleSearch(nextQuery) {
    const cleanedQuery = nextQuery.trim()
    if (!cleanedQuery) return

    setQuery(cleanedQuery)
    setPage(1)
    setInputSearchKey((current) => current + 1)
    setSearchTrigger((current) => current + 1)
  }

  function handleRetry() {
    setError('')
    setSearchTrigger((current) => current + 1)
  }

  function handlePageChange(nextPage) {
    if (nextPage >= 1 && nextPage <= totalPages) {
      setPage(nextPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="/" aria-label="Movie Search home">
          <span className="brand-mark">M</span>
          <span>Movie<span className="brand-light">Search</span></span>
        </a>
        <p>Find your next favourite movie.</p>
      </header>

      <SearchBar
        key={inputSearchKey}
        initialQuery={query}
        onSearch={handleSearch}
        loading={loading}
      />

      <section className="results-section">
        <div className="results-heading">
          <div>
            <p className="eyebrow">YOUR MOVIE DISCOVERY</p>
            <h1>{query ? `Results for “${query}”` : 'Search movies'}</h1>
            {!error && !loading && totalResults > 0 && (
              <p className="result-count">{totalResults.toLocaleString()} movies found · page {page}</p>
            )}
          </div>

          <div className="filters">
            <SortControls value={sortBy} onChange={setSortBy} />
            <RatingFilter value={minimumRating} onChange={setMinimumRating} />
          </div>
        </div>

        {loading && (
          <div className="status-message" role="status">
            <span className="spinner" />
            Searching movies…
          </div>
        )}

        {error && !loading && (
          <div className="error-message" role="alert">
            <strong>We couldn't load the movies.</strong>
            <p>{error}</p>
            <button type="button" onClick={handleRetry}>Try again</button>
          </div>
        )}

        {!loading && !error && <MovieList movies={visibleMovies} />}

        {!loading && !error && visibleMovies.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        )}
        {!loading && !error && movies.length > 0 && visibleMovies.length === 0 && (
          <p className="filter-note">No movies on this page meet that rating. Try a lower minimum rating.</p>
        )}
      </section>

      <footer className="app-footer">
        Movie information provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a>.
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </main>
  )
}
