import React, { useState } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import styles from './FavoritesPage.module.scss'
import { Button } from '../../components/Button/Button'
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal'
import { MovieGrid } from '../../components/MovieGrid/MovieGrid'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { PageLayout } from '../../components/PageLayout/PageLayout'
import { Pagination } from '../../components/Pagination/Pagination'
import { useClientPagination } from '../../hooks/useClientPagination'
import { useFavoritesManager } from '../../hooks/useFavorites'

import type { Movie, FavoriteMovie } from '../../types/movie'

interface FavoritesPageProps {
  onMovieClick?: (movie: Movie) => void
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onMovieClick }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { favorites, toggleMovieFavorite, clearAllFavorites } = useFavoritesManager()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  
  const convertToMovie = (favorite: FavoriteMovie): Movie => ({
    id: favorite.id,
    title: favorite.title,
    poster_path: favorite.poster_path,
    release_date: favorite.release_date,
    vote_average: favorite.vote_average,
    overview: '',
    backdrop_path: null,
    genre_ids: [],
    adult: false,
    original_language: '',
    original_title: favorite.title,
    popularity: 0,
    video: false,
    vote_count: 0,
  })

  const convertedFavorites = favorites.map(convertToMovie)
  
  const {
    currentPage,
    totalPages,
    totalItems,
    paginatedItems: currentPageFavorites,
    handlePageChange,
    hasPagination,
  } = useClientPagination(convertedFavorites, 20)

  const handleMovieClick = (movie: Movie) => {
    if (onMovieClick) {
      onMovieClick(movie)
    } else {
      navigate(`/movie/${movie.id}`, {
        state: { backgroundLocation: location }
      })
    }
  }

  const handleToggleFavorite = (movie: Movie) => {
    toggleMovieFavorite(movie)
  }

  const isFavorite = (movieId: number): boolean => {
    return favorites.some(fav => fav.id === movieId)
  }

  const handleClearAll = () => {
    setIsConfirmModalOpen(true)
  }

  const handleConfirmClearAll = () => {
    clearAllFavorites()
  }

  const hasFavorites = favorites.length > 0

  return (
    <PageLayout>
      <PageHeader
        title="Moje Filmy"
        subtitle={hasFavorites 
          ? `Ilość: ${totalItems}`
          : undefined
        }
        actions={hasFavorites ? (
          <Button
            variant="secondary"
            onClick={handleClearAll}
          >
            Wyczyść Wszystkie Ulubione
          </Button>
        ) : undefined}
      />

      {hasFavorites ? (
        <>
          <MovieGrid
            movies={currentPageFavorites}
            onMovieClick={handleMovieClick}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
          
          {hasPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎬</div>
          <h2 className={styles.emptyTitle}>Nie masz jeszcze ulubionych filmów</h2>
          <p className={styles.emptyDescription}>
            Zacznij eksplorować filmy i dodaj je do ulubionych, klikając ikonę serca.
          </p>
        </div>
      )}
      
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmClearAll}
        title="Usuń wszystkie ulubione filmy"
        message="Czy na pewno chcesz usunąć wszystkie ulubione filmy? Tej operacji nie można cofnąć."
        confirmText="Usuń wszystkie"
        cancelText="Anuluj"
        variant="danger"
      />
    </PageLayout>
  )
}
