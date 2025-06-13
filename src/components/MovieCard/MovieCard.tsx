import React from 'react'

import styles from './MovieCard.module.scss'
import { buildImageUrl, formatVoteAverage } from '../../utils/helpers'

import type { Movie } from '../../types/movie'

interface MovieCardProps {
  movie: Movie
  isFavorite?: boolean
  onToggleFavorite?: (movie: Movie) => void
  onClick?: (movie: Movie) => void
  className?: string
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite = false,
  onToggleFavorite,
  onClick,
  className,
}) => {
  const handleCardClick = () => {
    onClick?.(movie)
  }

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    onToggleFavorite?.(movie)
  }

  const posterUrl = buildImageUrl(movie.poster_path)
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null

  return (
    <div 
      onClick={handleCardClick} 
      className={`${styles.movieCard} ${className || ''}`}
    >
      <div className={styles.posterContainer}>
        {movie.poster_path ? (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            loading="lazy"
            className={styles.posterImage}
          />
        ) : (
          <div className={styles.posterPlaceholder}>
            🎬
          </div>
        )}
        
        {movie.vote_average > 0 && (
          <div className={styles.ratingBadge}>
            ⭐ {formatVoteAverage(movie.vote_average)}
          </div>
        )}
        
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''}`}
            aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
            type="button"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        )}
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.movieTitle} title={movie.title}>
          {movie.title}
        </h3>
        
        <div className={styles.movieInfo}>
          {releaseYear && (
            <span className={styles.releaseYear}>
              {releaseYear}
            </span>
          )}
          {movie.vote_count > 0 && (
            <span className="text text--xs text--muted">
              {movie.vote_count} głosów
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
