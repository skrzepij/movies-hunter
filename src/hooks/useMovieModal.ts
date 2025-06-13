import { useState, useCallback } from 'react'

import { useGetMovieDetailsQuery } from '../services/tmdbApi'

import type { MovieDetails } from '../types/movie'

interface UseMovieModalReturn {
  selectedMovieId: number | null
  movieDetails: MovieDetails | undefined
  isLoading: boolean
  error: string | null
  isModalOpen: boolean
  openMovieDetails: (movieId: number) => void
  closeMovieDetails: () => void
}

/**
 * Custom hook for managing movie details modal
 */
export const useMovieModal = (): UseMovieModalReturn => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch movie details when a movie is selected
  const {
    data: movieDetails,
    isLoading,
    error,
  } = useGetMovieDetailsQuery(selectedMovieId || 0, {
    skip: !selectedMovieId,
  })

  const openMovieDetails = useCallback((movieId: number) => {
    setSelectedMovieId(movieId)
    setIsModalOpen(true)
  }, [])

  const closeMovieDetails = useCallback(() => {
    setSelectedMovieId(null)
    setIsModalOpen(false)
  }, [])

  // Format error message
  const getErrorMessage = (error: unknown): string | null => {
    if (!error) return null
    if (typeof error === 'object' && error !== null && 'data' in error) {
      const errorData = error.data as { status_message?: string } | undefined
      return errorData?.status_message ?? 'Failed to load movie details'
    }
    return 'Failed to load movie details'
  }

  return {
    selectedMovieId,
    movieDetails,
    isLoading,
    error: getErrorMessage(error),
    isModalOpen,
    openMovieDetails,
    closeMovieDetails,
  }
}
