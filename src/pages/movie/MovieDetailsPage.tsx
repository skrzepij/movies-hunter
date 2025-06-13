import React from 'react'

import { useParams, useLocation, useNavigate } from 'react-router-dom'

import styles from './MovieDetailsPage.module.scss'
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { Modal } from '../../components/Modal/Modal'
import { MovieDetails } from '../../components/MovieDetails/MovieDetails'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { PageLayout } from '../../components/PageLayout/PageLayout'
import { useFavoritesManager } from '../../hooks/useFavorites'
import { useGetMovieDetailsQuery } from '../../services/tmdbApi'

import type { Movie } from '../../types/movie'

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  
  const { isFavorite, toggleMovieFavorite } = useFavoritesManager()

  const backgroundLocation = location.state?.backgroundLocation
  const isModal = !!backgroundLocation
  
  const movieId = id ? parseInt(id, 10) : 0
  
  const {
    data: movieDetails,
    isLoading,
    error,
    refetch,
  } = useGetMovieDetailsQuery(movieId, {
    skip: !movieId || movieId <= 0,
  })

  const handleClose = () => {
    if (isModal) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  const handleToggleFavorite = () => {
    if (movieDetails) {
      const movie: Movie = {
        id: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path,
        release_date: movieDetails.release_date,
        vote_average: movieDetails.vote_average,
        overview: movieDetails.overview,
        backdrop_path: movieDetails.backdrop_path,
        genre_ids: movieDetails.genres?.map(g => g.id) || [],
        adult: movieDetails.adult,
        original_language: movieDetails.original_language,
        original_title: movieDetails.original_title,
        popularity: movieDetails.popularity,
        video: movieDetails.video,
        vote_count: movieDetails.vote_count,
      }
      toggleMovieFavorite(movie)
    }
  }

  const getErrorMessage = (): string => {
    if (!error) return ''
    if (typeof error === 'object' && 'data' in error) {
      const errorData = error.data as { status_message?: string } | undefined
      return errorData?.status_message ?? 'Nie udało się załadować szczegółów filmu'
    }
    return 'Nie udało się załadować szczegółów filmu'
  }

  if (isLoading) {
    const loadingContent = <LoadingSpinner message="Ładowanie szczegółów filmu..." />
    
    return isModal ? (
      <Modal isOpen onClose={handleClose}>
        <div className={styles.modalContent}>
          {loadingContent}
        </div>
      </Modal>
    ) : (
      <PageLayout>
        {loadingContent}
      </PageLayout>
    )
  }

  if (error) {
    const errorContent = (
      <ErrorMessage
        title="Nie udało się załadować filmu"
        message={getErrorMessage()}
        onRetry={() => refetch()}
      />
    )
    
    return isModal ? (
      <Modal isOpen onClose={handleClose}>
        <div className={styles.modalContent}>
          {errorContent}
        </div>
      </Modal>
    ) : (
      <PageLayout>
        {errorContent}
      </PageLayout>
    )
  }

  if (!movieDetails) {
    const notFoundContent = (
      <ErrorMessage
        title="Film nie został znaleziony"
        message="Sprawdź czy ID filmu jest poprawne i spróbuj ponownie."
      />
    )
    
    return isModal ? (
      <Modal isOpen onClose={handleClose}>
        <div className={styles.modalContent}>
          {notFoundContent}
        </div>
      </Modal>
    ) : (
      <PageLayout>
        {notFoundContent}
      </PageLayout>
    )
  }

  const movieDetailsContent = (
    <MovieDetails
      movie={movieDetails}
      isFavorite={isFavorite(movieDetails.id)}
      onToggleFavorite={handleToggleFavorite}
      onClose={handleClose}
      variant={isModal ? 'modal' : 'page'}
    />
  )

  if (isModal) {
    return (
      <Modal isOpen onClose={handleClose}>
        <div className={styles.modalContent}>
          {movieDetailsContent}
        </div>
      </Modal>
    )
  }

  return (
    <PageLayout>
      <PageHeader
        title="Szczegóły Filmu"
        subtitle="Sprawdź obsadę, fabułę, ocenę. Dodaj film do ulubionych!"
      />
      {movieDetailsContent}
    </PageLayout>
  )
}
