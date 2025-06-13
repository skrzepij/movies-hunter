import React from 'react'

import { configureStore } from '@reduxjs/toolkit'
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, it, expect, vi } from 'vitest'

import { useMovieCategories } from './useMovieCategories'
import { favoritesSlice } from '../store/favoritesSlice'

// Mock the API to prevent network calls
vi.mock('../services/tmdbApi', () => ({
  useGetPopularMoviesQuery: vi.fn(() => ({
    data: { results: [], total_pages: 1 },
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  })),
  useGetTopRatedMoviesQuery: vi.fn(() => ({
    data: { results: [], total_pages: 1 },
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  })),
  useGetNowPlayingMoviesQuery: vi.fn(() => ({
    data: { results: [], total_pages: 1 },
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  })),
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

describe('useMovieCategories Hook', () => {
  it('should initialize with Popular category', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useMovieCategories(), { wrapper })
    
    expect(result.current.selectedCategory).toBe('popular')
  })

  it('should change category when setSelectedCategory is called', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useMovieCategories(), { wrapper })
    
    act(() => {
      result.current.setSelectedCategory('top_rated')
    })
    
    expect(result.current.selectedCategory).toBe('top_rated')
  })

  it('should return category data', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useMovieCategories(), { wrapper })
    
    expect(result.current.categoryData).toHaveProperty('movies')
    expect(result.current.categoryData).toHaveProperty('isLoading')
    expect(result.current.categoryData).toHaveProperty('error')
    expect(result.current.categoryData).toHaveProperty('totalPages')
    expect(result.current.categoryData).toHaveProperty('refetch')
  })

  it('should provide refetch functionality', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useMovieCategories(), { wrapper })
    
    expect(typeof result.current.categoryData.refetch).toBe('function')
  })
})