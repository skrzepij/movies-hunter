import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { useApiPagination } from './useApiPagination'

describe('useApiPagination Hook', () => {
  it('should initialize with page 1 by default', () => {
    const { result } = renderHook(() => useApiPagination())
    
    expect(result.current.currentPage).toBe(1)
  })

  it('should initialize with custom initial page', () => {
    const { result } = renderHook(() => useApiPagination(5))
    
    expect(result.current.currentPage).toBe(5)
  })

  it('should change page when handlePageChange is called', () => {
    const { result } = renderHook(() => useApiPagination())
    
    act(() => {
      result.current.handlePageChange(3)
    })
    
    expect(result.current.currentPage).toBe(3)
  })

  it('should limit page to maximum 500 (TMDb API limit)', () => {
    const { result } = renderHook(() => useApiPagination())
    
    act(() => {
      result.current.handlePageChange(600)
    })
    
    expect(result.current.currentPage).toBe(500)
  })

  it('should not allow page less than 1', () => {
    const { result } = renderHook(() => useApiPagination())
    
    act(() => {
      result.current.handlePageChange(-5)
    })
    
    expect(result.current.currentPage).toBe(1)
  })

  it('should reset to first page', () => {
    const { result } = renderHook(() => useApiPagination(10))
    
    act(() => {
      result.current.resetToFirstPage()
    })
    
    expect(result.current.currentPage).toBe(1)
  })
})
