import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { usePagination } from './usePagination'

describe('usePagination Hook', () => {
  describe('API Pagination', () => {
    it('should initialize with page 1 by default', () => {
      const { result } = renderHook(() => usePagination())
      
      expect(result.current.currentPage).toBe(1)
      expect(result.current.hasNextPage).toBe(true)
      expect(result.current.hasPreviousPage).toBe(false)
    })

    it('should initialize with custom initial page', () => {
      const { result } = renderHook(() => usePagination({ initialPage: 5 }))
      
      expect(result.current.currentPage).toBe(5)
    })

    it('should change page correctly', () => {
      const { result } = renderHook(() => usePagination())
      
      act(() => {
        result.current.handlePageChange(3)
      })
      
      expect(result.current.currentPage).toBe(3)
      expect(result.current.hasNextPage).toBe(true)
      expect(result.current.hasPreviousPage).toBe(true)
    })

    it('should limit page to maximum (TMDb API limit)', () => {
      const { result } = renderHook(() => usePagination({ maxPages: 500 }))
      
      act(() => {
        result.current.handlePageChange(600)
      })
      
      expect(result.current.currentPage).toBe(500)
    })

    it('should not allow page less than 1', () => {
      const { result } = renderHook(() => usePagination())
      
      act(() => {
        result.current.handlePageChange(-5)
      })
      
      expect(result.current.currentPage).toBe(1)
    })

    it('should reset to first page', () => {
      const { result } = renderHook(() => usePagination({ initialPage: 10 }))
      
      act(() => {
        result.current.resetToFirstPage()
      })
      
      expect(result.current.currentPage).toBe(1)
    })
  })

  describe('Client Pagination', () => {
    const mockItems = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`)

    it('should paginate items correctly', () => {
      const { result } = renderHook(() => usePagination(mockItems, { itemsPerPage: 10 }))
      
      expect(result.current.totalItems).toBe(25)
      expect(result.current.totalPages).toBe(3)
      expect(result.current.paginatedItems).toHaveLength(10)
      expect(result.current.paginatedItems?.[0]).toBe('Item 1')
    })

    it('should handle page changes for client pagination', () => {
      const { result } = renderHook(() => usePagination(mockItems, { itemsPerPage: 10 }))
      
      act(() => {
        result.current.handlePageChange(2)
      })
      
      expect(result.current.currentPage).toBe(2)
      expect(result.current.paginatedItems?.[0]).toBe('Item 11')
    })

    it('should handle last page correctly', () => {
      const { result } = renderHook(() => usePagination(mockItems, { itemsPerPage: 10 }))
      
      act(() => {
        result.current.handlePageChange(3)
      })
      
      expect(result.current.currentPage).toBe(3)
      expect(result.current.paginatedItems).toHaveLength(5)
      expect(result.current.hasNextPage).toBe(false)
    })
  })
})
