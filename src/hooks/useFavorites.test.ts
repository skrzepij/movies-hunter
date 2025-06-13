import React from 'react'

import { configureStore } from '@reduxjs/toolkit'
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useFavoritesManager } from './useFavorites'
import favoritesReducer from '../store/favoritesSlice'

import type { Movie } from '../types/movie'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Simple Redux wrapper for tests
const createWrapper = () => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
  })

  return function WrapperComponent({ children }: { children: React.ReactNode }) {
    return React.createElement(Provider, { store, children })
  }
}

describe('useFavoritesManager Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue('[]')
  })

  it('should start with empty favorites', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useFavoritesManager(), { wrapper })
    
    expect(result.current.favorites).toEqual([])
    expect(result.current.isFavorite(123)).toBe(false)
  })

  it('should add and remove movies from favorites', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useFavoritesManager(), { wrapper })
    
    const testMovie: Movie = {
      id: 123,
      title: 'Test Movie',
      poster_path: '/test.jpg',
      release_date: '2023-01-01',
      vote_average: 8.5,
      overview: 'Test overview',
      adult: false,
      backdrop_path: '/backdrop.jpg',
      genre_ids: [1, 2],
      original_language: 'en',
      original_title: 'Test Movie',
      popularity: 100,
      video: false,
      vote_count: 1000
    }
    
    // Add to favorites
    act(() => {
      result.current.toggleMovieFavorite(testMovie)
    })
    
    expect(result.current.favorites).toHaveLength(1)
    expect(result.current.isFavorite(123)).toBe(true)
    
    // Remove from favorites
    act(() => {
      result.current.toggleMovieFavorite(testMovie)
    })
    
    expect(result.current.favorites).toHaveLength(0)
    expect(result.current.isFavorite(123)).toBe(false)
  })
})