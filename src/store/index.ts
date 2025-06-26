import { configureStore } from '@reduxjs/toolkit'

import { favoritesSlice } from './favoritesSlice'
import { tmdbApi } from '../services/tmdbApi'

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
