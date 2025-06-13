import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { MovieGrid } from './MovieGrid'

import type { Movie } from '../../types/movie'

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Movie 1',
    poster_path: '/movie1.jpg',
    release_date: '2023-01-01',
    vote_average: 8.5,
    overview: 'Overview 1',
    adult: false,
    backdrop_path: '/backdrop1.jpg',
    genre_ids: [1, 2],
    original_language: 'en',
    original_title: 'Movie 1',
    popularity: 100,
    video: false,
    vote_count: 1000
  },
  {
    id: 2,
    title: 'Movie 2',
    poster_path: '/movie2.jpg',
    release_date: '2023-02-01',
    vote_average: 7.5,
    overview: 'Overview 2',
    adult: false,
    backdrop_path: '/backdrop2.jpg',
    genre_ids: [2, 3],
    original_language: 'en',
    original_title: 'Movie 2',
    popularity: 90,
    video: false,
    vote_count: 800
  }
]

describe('MovieGrid Component', () => {
  it('should render loading spinner when loading', () => {
    render(<MovieGrid isLoading={true} />)
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('should render error message when there is an error', () => {
    render(<MovieGrid error="Something went wrong" />)
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should render movies when provided', () => {
    render(<MovieGrid movies={mockMovies} />)
    
    expect(screen.getByText('Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Movie 2')).toBeInTheDocument()
  })

  it('should render empty message when no movies', () => {
    render(<MovieGrid movies={[]} emptyMessage="No movies found" />)
    
    expect(screen.getByText('No movies found')).toBeInTheDocument()
  })
})
