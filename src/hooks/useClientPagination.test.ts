import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { useClientPagination } from './useClientPagination'

describe('useClientPagination Hook', () => {
  const mockItems = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useClientPagination(mockItems))
    
    expect(result.current.currentPage).toBe(1)
    expect(result.current.totalItems).toBe(25)
    expect(result.current.totalPages).toBe(2) // 25 items / 20 per page = 2 pages
  })

  it('should paginate items correctly', () => {
    const { result } = renderHook(() => useClientPagination(mockItems, 10))
    
    // First page
    expect(result.current.paginatedItems).toHaveLength(10)
    expect(result.current.paginatedItems[0]).toEqual({ id: 1, name: 'Item 1' })
    
    // Go to second page
    act(() => {
      result.current.handlePageChange(2)
    })
    
    expect(result.current.currentPage).toBe(2)
    expect(result.current.paginatedItems[0]).toEqual({ id: 11, name: 'Item 11' })
  })

  it('should handle empty array', () => {
    const { result } = renderHook(() => useClientPagination([]))
    
    expect(result.current.totalItems).toBe(0)
    expect(result.current.hasItems).toBe(false)
    expect(result.current.paginatedItems).toHaveLength(0)
  })
})
