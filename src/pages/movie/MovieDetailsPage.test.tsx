import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

import { MovieDetailsPage } from './MovieDetailsPage'
import { store } from '../../store/index'

import type { MovieDetails } from '../../types/movie'

const mockMovieDetails: MovieDetails = {
  id: 123,
  title: 'Test Movie',
  overview: 'This is a test movie overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100,
  adult: false,
  genre_ids: [1, 2],
  original_language: 'en',
  original_title: 'Test Movie',
  video: false,
  belongs_to_collection: null,
  budget: 1000000,
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' }
  ],
  homepage: 'https://test-movie.com',
  imdb_id: 'tt1234567',
  production_companies: [],
  production_countries: [],
  revenue: 2000000,
  runtime: 120,
  spoken_languages: [],
  status: 'Released',
  tagline: 'An epic test movie',
}

vi.mock('../../services/tmdbApi', () => ({
  tmdbApi: {
    reducer: (state = {}) => state,
    middleware: () => () => (next: any) => (action: any) => next(action),
    reducerPath: 'tmdbApi',
  },
  useGetMovieDetailsQuery: vi.fn(() => ({
    data: mockMovieDetails,
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  })),
}))

vi.mock('../../hooks/useFavorites', () => ({
  useFavoritesManager: vi.fn(() => ({
    isFavorite: vi.fn(() => false),
    toggleMovieFavorite: vi.fn(),
    favorites: [],
    clearAllFavorites: vi.fn(),
    loadFavoritesFromStorage: vi.fn(),
  })),
}))

const renderWithProviders = (ui: React.ReactElement, { route = '/movie/123' } = {}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </Provider>
  )
}

describe('MovieDetailsPage Component', () => {
  it('renders movie details page', () => {
    renderWithProviders(<MovieDetailsPage />)
    
    expect(screen.getByTestId('page-title')).toBeInTheDocument()
    expect(screen.getByTestId('page-title')).toHaveTextContent('Szczegóły Filmu')
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('This is a test movie overview')).toBeInTheDocument()
  })

  it('renders close button', () => {
    renderWithProviders(<MovieDetailsPage />)
    
    expect(screen.getByText('Zamknij')).toBeInTheDocument()
  })

  it('renders favorite button', () => {
    renderWithProviders(<MovieDetailsPage />)
    
    expect(screen.getByText('🤍 Dodaj do Ulubionych')).toBeInTheDocument()
  })
})
