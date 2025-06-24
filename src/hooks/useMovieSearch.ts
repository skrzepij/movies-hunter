import { useState, useEffect } from 'react'

import { useDebounce } from './useDebounce'
import { usePagination } from './usePagination'
import { useSearchMoviesQuery } from '../services/tmdbApi'

export const useMovieSearch = (initialQuery = '', debounceMs = 500) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const { currentPage, handlePageChange, resetToFirstPage } = usePagination()
  
  const debouncedQuery = useDebounce(searchQuery, debounceMs)

  useEffect(() => {
    if (searchQuery !== debouncedQuery && debouncedQuery.trim()) {
      resetToFirstPage()
    }
  }, [searchQuery, debouncedQuery, resetToFirstPage])

  const searchResults = useSearchMoviesQuery(
    { query: debouncedQuery, page: currentPage },
    { skip: !debouncedQuery.trim() }
  )

  const clearSearch = () => {
    setSearchQuery('')
    resetToFirstPage()
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