import MovieCard from './MovieCard.jsx'

export default function MovieList({ movies }) {
  if (!movies.length) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🎞️</span>
        <h2>No movies found</h2>
        <p>Try another title or change your rating filter.</p>
      </div>
    )
  }

  return (
    <section className="movie-list" aria-label="Movie search results">
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </section>
  )
}
