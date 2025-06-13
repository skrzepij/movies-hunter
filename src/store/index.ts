import { configureStore } from '@reduxjs/toolkit'

import { favoritesSlice } from './favoritesSlice'
import { tmdbApi } from '../services/tmdbApi'

/**
 * Redux store configuration
 */
export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
