import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import App from './App'

// Mock tylko problematyczne części API
vi.mock('./services/tmdbApi', () => ({
  tmdbApi: {
    reducer: (state = {}) => state,
    middleware: () => () => (next: any) => (action: any) => next(action),
    reducerPath: 'tmdbApi',
  },
  useSearchMoviesQuery: vi.fn(() => ({
    data: undefined,
    isLoading: false,
    error: null,
  })),
  useLazySearchMoviesQuery: vi.fn(() => [vi.fn(), { data: undefined, isLoading: false }]),
  useGetMovieDetailsQuery: vi.fn(() => ({
    data: undefined,
    isLoading: false,
    error: null,
  })),
  useLazyGetMovieDetailsQuery: vi.fn(() => [vi.fn(), { data: undefined, isLoading: false }]),
  useGetPopularMoviesQuery: vi.fn(() => ({
    data: undefined,
    isLoading: false,
    error: null,
  })),
  useGetTopRatedMoviesQuery: vi.fn(() => ({
    data: undefined,
    isLoading: false,
    error: null,
  })),
  useGetNowPlayingMoviesQuery: vi.fn(() => ({
    data: undefined,
    isLoading: false,
    error: null,
  })),
}))

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />)
    
    // Sprawdźmy czy aplikacja się renderuje - szukajmy po klasie
    const appContainer = document.querySelector('[class*="appContainer"]')
    expect(appContainer).toBeInTheDocument()
  })

  it('should render header', () => {
    render(<App />)
    
    // Header powinien być zawsze widoczny
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('should render main content area', () => {
    render(<App />)
    
    // Main content area
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})