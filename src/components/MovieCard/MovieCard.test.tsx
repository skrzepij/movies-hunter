import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { MovieCard } from './MovieCard'

import type { Movie } from '../../types/movie'

const mockMovie: Movie = {
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

describe('MovieCard Component', () => {
  it('should render movie title and rating', () => {
    render(<MovieCard movie={mockMovie} />)
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('⭐ 8.5')).toBeInTheDocument()
  })

  it('should call onClick when card is clicked', () => {
    const mockOnClick = vi.fn()
    
    render(<MovieCard movie={mockMovie} onClick={mockOnClick} />)
    
    fireEvent.click(screen.getByText('Test Movie'))
    expect(mockOnClick).toHaveBeenCalledWith(mockMovie)
  })

  it('should call onToggleFavorite when favorite button is clicked', () => {
    const mockOnToggleFavorite = vi.fn()
    
    render(<MovieCard movie={mockMovie} onToggleFavorite={mockOnToggleFavorite} />)
    
    const favoriteButton = screen.getByLabelText(/dodaj do ulubionych|usuń z ulubionych/i)
    fireEvent.click(favoriteButton)
    
    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockMovie)
  })
})
