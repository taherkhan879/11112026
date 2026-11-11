const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function formatReleaseDate(date) {
  if (!date) return 'Unknown'
  return date
}

export default function MovieCard({ movie }) {
  const poster = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null

  return (
    <article className="movie-card">
      <div className="poster-wrap">
        {poster ? (
          <img className="movie-poster" src={poster} alt={`${movie.title} poster`} loading="lazy" />
        ) : (
          <div className="poster-placeholder" role="img" aria-label="Poster unavailable">
            <span>🎬</span>
            <small>No poster available</small>
          </div>
        )}
      </div>

      <div className="movie-info">
        <h2>{movie.title || 'Untitled movie'}</h2>
        <p className="movie-meta"><span>RELEASE DATE:</span> {formatReleaseDate(movie.release_date)}</p>
        <p className="movie-meta"><span>RATING:</span> {Number(movie.vote_average || 0).toFixed(1)}</p>
        <p className="movie-overview">
          {movie.overview || 'No overview is available for this movie.'}
        </p>
      </div>
    </article>
  )
}
