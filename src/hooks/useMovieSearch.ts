import { useState, useEffect } from 'react'

import { useSearchMoviesQuery } from '../services/tmdbApi'

import type { SearchMoviesResponse } from '../types/movie'

// Return type interface for better type safety
interface UseMovieSearchReturn {
  searchQuery: string
  debouncedQuery: string
  setSearchQuery: (query: string) => void
  currentPage: number
  handlePageChange: (page: number) => void
  clearSearch: () => void
  searchResults: {
    data?: SearchMoviesResponse
    isLoading: boolean
    isError: boolean
    error?: unknown
    isFetching: boolean
    refetch?: () => void
  }
  isSearching: boolean
}

/**
 * Custom hook for movie search with debouncing and pagination
 * @param initialQuery - Initial search query
 * @param debounceMs - Debounce delay in milliseconds (must be positive)
 * @returns Typed object with search functionality and results
 */
export const useMovieSearch = (
  initialQuery = '', 
  debounceMs = 500
): UseMovieSearchReturn => {
  if (debounceMs <= 0) {
    throw new Error('debounceMs must be a positive number')
  }
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const [currentPage, setCurrentPage] = useState(1)
  
  // TMDb API has a maximum of 500 pages
  const MAX_PAGES = 500

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      // Reset to page 1 when search query changes
      if (searchQuery !== debouncedQuery) {
        setCurrentPage(1)
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchQuery, debounceMs, debouncedQuery])

  // Only make API call if we have a search query
  const searchResults = useSearchMoviesQuery(
    { query: debouncedQuery, page: currentPage },
    { skip: !debouncedQuery.trim() }
  )

  const handlePageChange = (page: number) => {
    // Validate page number - TMDb API has a maximum of 500 pages
    const validPage = Math.max(1, Math.min(page, MAX_PAGES))
    setCurrentPage(validPage)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
  }

  return {
    searchQuery,
    debouncedQuery,
    setSearchQuery,
    searchResults: {
      ...searchResults,
      refetch: searchResults.refetch,
    },
    isSearching: debouncedQuery.trim() ? searchResults.isLoading : false,
    currentPage,
    handlePageChange,
    clearSearch,
  }
}