import { useState, useMemo } from 'react'

import { PAGINATION } from '../utils/config'

// Return type interface for better type safety
interface UseClientPaginationReturn<T> {
  currentPage: number
  totalPages: number
  totalItems: number
  paginatedItems: T[]
  handlePageChange: (page: number) => void
  resetToFirstPage: () => void
  hasItems: boolean
  hasNextPage: boolean
  hasPreviousPage: boolean
  hasPagination: boolean
}

/**
 * Hook for client-side pagination of local data arrays
 * Splits array into pages and manages pagination state
 * Useful for paginating static data like favorites
 * @param items - Array of items to paginate
 * @param itemsPerPage - Number of items per page (must be positive)
 * @returns Typed object with pagination functionality
 */
export const useClientPagination = <T>(
  items: T[],
  itemsPerPage: number = PAGINATION.ITEMS_PER_PAGE
): UseClientPaginationReturn<T> => {
  if (itemsPerPage <= 0) {
    throw new Error('itemsPerPage must be a positive number')
  }
  
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Calculate pagination values
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // Get items for current page
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  // Handle page changes
  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      console.warn(`Invalid page number: ${page}. Valid range: 1-${totalPages}`)
    }
  }

  // Reset to first page when items change significantly
  const resetToFirstPage = (): void => {
    setCurrentPage(1)
  }

  // Auto-reset to first page if current page exceeds available pages
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1)
  }

  return {
    currentPage,
    totalPages,
    totalItems,
    paginatedItems,
    handlePageChange,
    resetToFirstPage,
    hasItems: totalItems > 0,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    hasPagination: totalPages > 1,
  }
}
