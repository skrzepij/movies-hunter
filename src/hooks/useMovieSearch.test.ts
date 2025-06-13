import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useMovieSearch } from './useMovieSearch'
import { useSearchMoviesQuery } from '../services/tmdbApi'

// Mock the TMDb API service
vi.mock('../services/tmdbApi', () => ({
  useSearchMoviesQuery: vi.fn()
}))

const mockUseSearchMoviesQuery = useSearchMoviesQuery as any

describe('useMovieSearch Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default mock - no search results
    mockUseSearchMoviesQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: undefined,
      isFetching: false,
      refetch: vi.fn(),
    } as any)
  })

  it('should initialize with empty search', () => {
    const { result } = renderHook(() => useMovieSearch())
    
    expect(result.current.searchQuery).toBe('')
    expect(result.current.currentPage).toBe(1)
    expect(result.current.isSearching).toBe(false)
  })

  it('should update search query', () => {
    const { result } = renderHook(() => useMovieSearch())
    
    act(() => {
      result.current.setSearchQuery('batman')
    })
    
    expect(result.current.searchQuery).toBe('batman')
  })

  it('should handle page changes', () => {
    const { result } = renderHook(() => useMovieSearch())
    
    act(() => {
      result.current.handlePageChange(3)
    })
    
    expect(result.current.currentPage).toBe(3)
  })

  it('should show loading state when searching', () => {
    mockUseSearchMoviesQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
      isFetching: false,
      refetch: vi.fn(),
    } as any)
    
    const { result } = renderHook(() => useMovieSearch('batman'))
    
    expect(result.current.isSearching).toBe(true)
  })
})
