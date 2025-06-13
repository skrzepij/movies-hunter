import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { MovieDetails } from './MovieDetails'

import type { MovieDetails as MovieDetailsType } from '../../types/movie'


vi.mock('../utils/helpers', () => ({
  formatDate: vi.fn((date: string) => `Formatted: ${date}`),
  formatRuntime: vi.fn((runtime: number) => `${runtime} minutes`),
  getFullImageUrl: vi.fn((path: string) => `https://image.tmdb.org/t/p/w500${path}`),
  formatCurrency: vi.fn((amount: number) => `$${amount.toLocaleString()}`),
}))

const mockMovie: MovieDetailsType = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 50.0,
  adult: false,
  genre_ids: [1, 2],
  original_language: 'en',
  original_title: 'Test Movie',
  video: false,
  belongs_to_collection: null,
  budget: 50000000,
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' }
  ],
  homepage: 'https://test-movie.com',
  imdb_id: 'tt1234567',
  production_companies: [],
  production_countries: [],
  revenue: 100000000,
  runtime: 120,
  spoken_languages: [],
  status: 'Released',
  tagline: 'An epic test movie',
}

describe('MovieDetails Component', () => {
  const mockOnToggleFavorite = vi.fn()
  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnToggleFavorite.mockClear()
    mockOnClose.mockClear()
  })

  it('should render movie details correctly', () => {
    render(
      <MovieDetails
        movie={mockMovie}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('This is a test movie overview')).toBeInTheDocument()
  })

  it('should show add to favorites button when not favorited', () => {
    render(
      <MovieDetails
        movie={mockMovie}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('🤍 Dodaj do Ulubionych')).toBeInTheDocument()
  })
})
