import React from 'react'

import styles from './Pagination.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
  maxVisiblePages?: number
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  maxVisiblePages = 7,
}) => {
  // TMDb API has a maximum of 500 pages
  const MAX_PAGES = 500
  const effectiveTotalPages = Math.min(totalPages, MAX_PAGES)
  
  // Don't show pagination if there's only one page or no pages
  if (effectiveTotalPages <= 1) return null

  // Calculate which page numbers to show
  const getVisiblePages = (): (number | 'ellipsis')[] => {
    if (effectiveTotalPages <= maxVisiblePages) {
      return Array.from({ length: effectiveTotalPages }, (_, i) => i + 1)
    }

    const pages: (number | 'ellipsis')[] = []
    const sidePages = Math.floor((maxVisiblePages - 3) / 2) // Reserve space for first, last, and current

    if (currentPage <= sidePages + 2) {
      // Show pages from start
      for (let i = 1; i <= Math.min(maxVisiblePages - 1, effectiveTotalPages - 1); i++) {
        pages.push(i)
      }
      if (effectiveTotalPages > maxVisiblePages - 1) {
        pages.push('ellipsis')
      }
      pages.push(effectiveTotalPages)
    } else if (currentPage >= effectiveTotalPages - sidePages - 1) {
      // Show pages at end
      pages.push(1)
      if (effectiveTotalPages > maxVisiblePages - 1) {
        pages.push('ellipsis')
      }
      for (let i = Math.max(2, effectiveTotalPages - maxVisiblePages + 2); i <= effectiveTotalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages around current
      pages.push(1)
      pages.push('ellipsis')
      for (let i = currentPage - sidePages; i <= currentPage + sidePages; i++) {
        pages.push(i)
      }
      pages.push('ellipsis')
      pages.push(effectiveTotalPages)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <div className={styles.pagination} data-testid="pagination">
      <button
        type="button"
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || isLoading}
        aria-label="Poprzednia strona"
      >
        ‹
      </button>

      {visiblePages.map((page, index) => (
        page === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>…</span>
        ) : (
          <button
            key={page}
            type="button"
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            aria-label={`Strona ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      ))}

      <button
        type="button"
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= effectiveTotalPages || isLoading}
        aria-label="Następna strona"
      >
        ›
      </button>
    </div>
  )
}
