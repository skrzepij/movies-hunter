import React from 'react'

import styles from './MovieDetails.module.scss'
import { formatDate, formatRuntime, getFullImageUrl, formatCurrency } from '../../utils/helpers'
import { Button } from '../Button/Button'

import type { MovieDetails as MovieDetailsType } from '../../types/movie'

interface MovieDetailsProps {
  movie: MovieDetailsType
  isFavorite: boolean
  onToggleFavorite: () => void
  onClose: () => void
  variant?: 'modal' | 'page'
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onClose,
  variant = 'modal',
}) => {
  const posterUrl = getFullImageUrl(movie.poster_path, 'w500')
  const backdropUrl = getFullImageUrl(movie.backdrop_path, 'w1280')

  return (
    <div className={`${styles.detailsContainer} ${variant === 'page' ? styles.pageVariant : ''}`}>
      <div className={styles.flexContainer}>
        <img
          className={styles.moviePoster}
          src={posterUrl}
          alt={`${movie.title} plakat`}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            const target = e.target as HTMLImageElement
            target.src = '/placeholder-movie.svg'
          }}
        />
        
        <div className={styles.movieInfo}>
          <div className={styles.movieHeader}>
            <h1 className="heading heading--h1">{movie.title}</h1>
            {movie.tagline && (
              <p className={`text text--lg text--secondary ${styles.tagline}`}>
                "{movie.tagline}"
              </p>
            )}
          </div>

          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <span className="text text--sm text--medium">Ocena:</span>
              <span className="text text--sm">⭐ {movie.vote_average?.toFixed(1)}/10</span>
            </div>
            
            {movie.release_date && (
              <div className={styles.metaItem}>
                <span className="text text--sm text--medium">Data premiery:</span>
                <span className="text text--sm">{formatDate(movie.release_date)}</span>
              </div>
            )}
            
            {movie.runtime && (
              <div className={styles.metaItem}>
                <span className="text text--sm text--medium">Czas trwania:</span>
                <span className="text text--sm">{formatRuntime(movie.runtime)}</span>
              </div>
            )}
            
            {movie.vote_count && (
              <div className={styles.metaItem}>
                <span className="text text--sm text--medium">Głosy:</span>
                <span className="text text--sm">{movie.vote_count.toLocaleString()}</span>
              </div>
            )}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className={styles.genresSection}>
              <span className={`text text--sm text--medium ${styles.genresLabel}`}>
                Gatunki:
              </span>
              <div className={styles.genresList}>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className={styles.genreTag}>{genre.name}</span>
                ))}
              </div>
            </div>
          )}

          {!!movie.budget && (
            <div className={styles.metaInfo}>
              <div className={styles.metaItemFullWidth}>
                <span className="text text--sm text--medium">Budżet:</span>
                <span className="text text--sm">{formatCurrency(movie.budget)}</span>
              </div>
              
              {!!movie.revenue && (
                <div className={styles.metaItemFullWidth}>
                  <span className="text text--sm text--medium">Przychody:</span>
                  <span className="text text--sm">{formatCurrency(movie.revenue)}</span>
                </div>
              )}
            </div>
          )}

          {movie.overview && (
            <div className={styles.overviewSection}>
              <h3 className={`heading heading--h3 ${styles.overviewTitle}`}>
                Opis filmu
              </h3>
              <p className={`text ${styles.overview}`}>{movie.overview}</p>
            </div>
          )}

          <div className={styles.actionButtons}>
            <Button
              variant={isFavorite ? 'danger' : 'primary'}
              onClick={onToggleFavorite}
            >
              {isFavorite ? '❤️ Usuń z Ulubionych' : '🤍 Dodaj do Ulubionych'}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Zamknij
            </Button>
          </div>
        </div>
      </div>
      
      {backdropUrl && (
        <div className={styles.backdropSection}>
          <img
            className={styles.backdropImage}
            src={backdropUrl}
            alt={`${movie.title} tło`}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>
      )}
    </div>
  )
}
