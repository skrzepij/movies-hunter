import { useState } from 'react'

import { PAGINATION } from '../utils/config'

// Return type interface for better type safety
interface UseApiPaginationReturn {
  currentPage: number
  handlePageChange: (page: number) => void
  resetToFirstPage: () => void
}

/**
 * Hook for managing pagination state when data comes from API
 * Manages current page state while total pages come from server response
 * @param initialPage - Initial page number (default: 1, must be positive)
 * @returns Typed object with pagination state and handlers
 */
export const useApiPagination = (initialPage: number = PAGINATION.DEFAULT_PAGE): UseApiPaginationReturn => {
  if (initialPage <= 0) {
    throw new Error('initialPage must be a positive number')
  }
  
  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  
  // TMDb API has a maximum of 500 pages
  const MAX_PAGES = PAGINATION.MAX_PAGES

  const handlePageChange = (page: number): void => {
    if (page <= 0) {
      console.warn(`Invalid page number: ${page}. Using page 1 instead.`)
      setCurrentPage(1)
      return
    }
    // Validate page number
    const validPage = Math.max(1, Math.min(page, MAX_PAGES))
    setCurrentPage(validPage)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetToFirstPage = (): void => {
    setCurrentPage(1)
  }

  return {
    currentPage,
    handlePageChange,
    resetToFirstPage,
  }
}
