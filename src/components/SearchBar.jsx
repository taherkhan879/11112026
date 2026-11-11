import { useEffect, useState } from 'react'

export default function SearchBar({ initialQuery = 'Jurassic Park', onSearch, loading }) {
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  function handleSubmit(event) {
    event.preventDefault()
    const cleanedQuery = query.trim()
    if (cleanedQuery) onSearch(cleanedQuery)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label htmlFor="movie-query">MOVIE NAME</label>
      <input
        id="movie-query"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a movie..."
        aria-label="Movie name"
      />
      <button type="submit" disabled={loading || !query.trim()}>
        {loading ? 'Searching…' : 'Search!'}
      </button>
    </form>
  )
}
