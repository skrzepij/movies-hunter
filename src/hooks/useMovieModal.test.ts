import React from 'react'

import { configureStore } from '@reduxjs/toolkit'
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, it, expect, vi } from 'vitest'


import { useMovieModal } from './useMovieModal'
import { favoritesSlice } from '../store/favoritesSlice'

import type { MovieDetails } from '../types/movie'

// Mock movie details data
const mockMovieDetails: MovieDetails = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100,
  adult: false,
  genre_ids: [1, 2, 3],
  original_language: 'en',
  original_title: 'Test Movie',
  video: false,
  belongs_to_collection: null,
  budget: 1000000,
  genres: [{ id: 1, name: 'Action' }],
  homepage: 'https://test.com',
  imdb_id: 'tt123456',
  production_companies: [],
  production_countries: [],
  revenue: 2000000,
  runtime: 120,
  spoken_languages: [],
  status: 'Released',
  tagline: 'Test tagline'
}

// Mock the API
vi.mock('../services/tmdbApi', () => ({
  useGetMovieDetailsQuery: vi.fn((movieId, options) => {
    if (options?.skip || !movieId) {
      return {
        data: undefined,
        isLoading: false,
        error: null,
      }
    }
    return {
      data: mockMovieDetails,
      isLoading: false,
      error: null,
    }
  }),
}))

// Create test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesSlice.reducer,
      tmdbApi: (state = {}) => state,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

// Wrapper component with Redux Provider
const createWrapper = () => {
  const store = createTestStore()
  return ({ children }: { children: React.ReactNode }) => 
    React.createElement(Provider, { store, children })
}

describe('useMovieModal Hook', () => {
  it('should initialize with modal closed', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useMovieModal(), { wrapper })
    
    expect(result.current.isModalOpen).toBe(false)
    expect(result.current.selectedMovieId).toBeNull()
    expect(result.current.movieDetails).toBeUndefined()
  })

  it('should open modal with movie ID', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useMovieModal(), { wrapper })
    
    act(() => {
      result.current.openMovieDetails(1)
    })
    
    expect(result.current.isModalOpen).toBe(true)
    expect(result.current.selectedMovieId).toBe(1)
  })

  it('should close modal and clear movie data', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useMovieModal(), { wrapper })
    
    // First open the modal
    act(() => {
      result.current.openMovieDetails(1)
    })
    
    expect(result.current.isModalOpen).toBe(true)
    expect(result.current.selectedMovieId).toBe(1)
    
    // Then close it
    act(() => {
      result.current.closeMovieDetails()
    })
    
    expect(result.current.isModalOpen).toBe(false)
    expect(result.current.selectedMovieId).toBeNull()
  })

  it('should provide loading and error states', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useMovieModal(), { wrapper })
    
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })
})