import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { favoritesStorage } from '../utils/localStorage'

import type { FavoriteMovie } from '../types/movie'

interface FavoritesState {
  favorites: FavoriteMovie[]
  isLoading: boolean
  error: string | null
}

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
  error: null,
}

/**
 * Redux slice for managing favorite movies
 */
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    loadFavorites: (state) => {
      state.isLoading = true
      state.error = null
      try {
        state.favorites = favoritesStorage.getFavorites()
      } catch (error) {
        state.error = error instanceof Error ? error.message : 'Failed to load favorites'
      } finally {
        state.isLoading = false
      }
    },

    addFavorite: (state, action: PayloadAction<Omit<FavoriteMovie, 'addedAt'>>) => {
      const movie = action.payload
      const exists = state.favorites.some(fav => fav.id === movie.id)
      
      if (!exists) {
        const favoriteMovie: FavoriteMovie = {
          ...movie,
          addedAt: new Date().toISOString()
        }
        state.favorites.push(favoriteMovie)
        favoritesStorage.addFavorite(movie)
      }
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      const movieId = action.payload
      state.favorites = state.favorites.filter(fav => fav.id !== movieId)
      favoritesStorage.removeFavorite(movieId)
    },

    toggleFavorite: (state, action: PayloadAction<Omit<FavoriteMovie, 'addedAt'>>) => {
      const movie = action.payload
      const existingIndex = state.favorites.findIndex(fav => fav.id === movie.id)
      
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1)
        favoritesStorage.removeFavorite(movie.id)
      } else {
        const favoriteMovie: FavoriteMovie = {
          ...movie,
          addedAt: new Date().toISOString()
        }
        state.favorites.push(favoriteMovie)
        favoritesStorage.addFavorite(movie)
      }
    },

    clearFavorites: (state) => {
      state.favorites = []
      favoritesStorage.clearAllFavorites()
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },

    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  loadFavorites,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
  setError,
  clearError,
} = favoritesSlice.actions

export default favoritesSlice.reducer
