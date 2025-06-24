import { useCallback, useEffect } from 'react'

import { useAppDispatch, useFavorites } from './redux'
import { loadFavorites, toggleFavorite, clearFavorites } from '../store/favoritesSlice'

import type { Movie, FavoriteMovie } from '../types/movie'

export const useFavoritesManager = () => {
  const dispatch = useAppDispatch()
  const favorites = useFavorites()

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

  return {
    favorites,
    isFavorite,
    toggleMovieFavorite,
    clearAllFavorites,
  }
}
