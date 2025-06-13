import { useDispatch, useSelector } from 'react-redux'

import type { RootState, AppDispatch } from '../store/index'
import type { TypedUseSelectorHook } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Selector hooks for common state access patterns
export const useFavorites = () => useAppSelector((state) => state.favorites.favorites)
export const useFavoritesLoading = () => useAppSelector((state) => state.favorites.isLoading)
export const useFavoritesError = () => useAppSelector((state) => state.favorites.error)
export const useIsFavorite = (movieId: number) => 
  useAppSelector((state) => state.favorites.favorites.some(fav => fav.id === movieId))
