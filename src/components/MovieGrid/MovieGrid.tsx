import React from 'react'

import styles from './MovieGrid.module.scss'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'
import { MovieCard } from '../MovieCard/MovieCard'

import type { Movie } from '../../types/movie'

interface MovieGridProps {
  movies?: Movie[]
  isLoading?: boolean
  error?: string | null
  isFavorite?: (movieId: number) => boolean
  onToggleFavorite?: (movie: Movie) => void
  onMovieClick?: (movie: Movie) => void
  onRetry?: () => void
  emptyMessage?: string
  className?: string
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies = [],
  isLoading = false,
  error = null,
  isFavorite,
  onToggleFavorite,
  onMovieClick,
  onRetry,
  emptyMessage = 'No movies found',
  className,
}) => {
  if (isLoading) {
    return <LoadingSpinner message="ładowanie filmów..." />
  }

  if (error) {
    return (
      <ErrorMessage
        title="Nie udało się załadować filmów"
        message={error}
        onRetry={onRetry}
      />
    )
  }

  if (movies.length === 0) {
    return (
      <div className={`${styles.emptyState} ${className || ''}`}>
        <div className={styles.emptyIcon}>🎭</div>
        <p className="text text--lg text--secondary">
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className={`${styles.gridContainer} ${className || ''}`}>
      <div className={styles.movieGrid} data-testid="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite?.(movie.id)}
            onToggleFavorite={onToggleFavorite}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  )
}
