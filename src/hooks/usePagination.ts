import { useState, useMemo } from 'react'

import { PAGINATION } from '../utils/config'

interface PaginationOptions {
  initialPage?: number
  maxPages?: number
  itemsPerPage?: number
}

interface PaginationReturn<T = never> {
  currentPage: number
  totalPages: number
  totalItems: number
  handlePageChange: (page: number) => void
  resetToFirstPage: () => void
  hasNextPage: boolean
  hasPreviousPage: boolean
  paginatedItems?: T[]
}

export function usePagination(options?: PaginationOptions): PaginationReturn
export function usePagination<T>(items: T[], options?: PaginationOptions): PaginationReturn<T>
export function usePagination<T>(
  itemsOrOptions?: T[] | PaginationOptions,
  optionsParam?: PaginationOptions
): PaginationReturn<T> {
  const isClientPagination = Array.isArray(itemsOrOptions)
  
  const items = useMemo(
    () => (isClientPagination ? itemsOrOptions : []),
    [isClientPagination, itemsOrOptions]
  )
  
  const options = isClientPagination ? optionsParam : itemsOrOptions

  const {
    initialPage = PAGINATION.DEFAULT_PAGE,
    maxPages = PAGINATION.MAX_PAGES,
    itemsPerPage = PAGINATION.ITEMS_PER_PAGE
  } = options ?? {}

  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalItems = items.length
  const totalPages = isClientPagination ? Math.ceil(totalItems / itemsPerPage) : maxPages

  const paginatedItems = useMemo(() => {
    if (!isClientPagination) return undefined
    const startIndex = (currentPage - 1) * itemsPerPage
    return items.slice(startIndex, startIndex + itemsPerPage)
  }, [items, currentPage, itemsPerPage, isClientPagination])

  const handlePageChange = (page: number): void => {
    const validPage = Math.max(1, Math.min(page, totalPages))
    if (validPage !== currentPage) {
      setCurrentPage(validPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const resetToFirstPage = (): void => {
    setCurrentPage(1)
  }

  return {
    currentPage,
    totalPages,
    totalItems,
    handlePageChange,
    resetToFirstPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    paginatedItems
  }
}
