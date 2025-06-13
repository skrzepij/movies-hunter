import { useCallback, useEffect } from 'react'

import { useAppDispatch, useFavorites } from './redux'
import { loadFavorites, toggleFavorite, clearFavorites } from '../store/favoritesSlice'

import type { Movie, FavoriteMovie } from '../types/movie'

interface UseFavoritesResult {
  favorites: FavoriteMovie[]
  isFavorite: (movieId: number) => boolean
  toggleMovieFavorite: (movie: Movie) => void
  clearAllFavorites: () => void
  loadFavoritesFromStorage: () => void
}

/**
 * Custom hook for managing favorite movies
 */
export const useFavoritesManager = (): UseFavoritesResult => {
  const dispatch = useAppDispatch()
  const favorites = useFavorites()

  // Load favorites from localStorage on hook initialization
  useEffect(() => {
    dispatch(loadFavorites())
  }, [dispatch])

  const isFavorite = useCallback((movieId: number): boolean => {
    return favorites.some(fav => fav.id === movieId)
  }, [favorites])

  const toggleMovieFavorite = useCallback((movie: Movie) => {
    const favoriteMovie: Omit<FavoriteMovie, 'addedAt'> = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    }
    dispatch(toggleFavorite(favoriteMovie))
  }, [dispatch])

  const clearAllFavorites = useCallback(() => {
    dispatch(clearFavorites())
  }, [dispatch])

  const loadFavoritesFromStorage = useCallback(() => {
    dispatch(loadFavorites())
  }, [dispatch])

  return {
    favorites,
    isFavorite,
    toggleMovieFavorite,
    clearAllFavorites,
    loadFavoritesFromStorage,
  }
}
