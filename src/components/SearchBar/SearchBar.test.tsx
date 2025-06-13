import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { SearchBar } from './SearchBar'

describe('SearchBar Component', () => {
  it('should render with default placeholder', () => {
    const mockOnChange = vi.fn()
    
    render(<SearchBar value="" onChange={mockOnChange} />)
    
    expect(screen.getByPlaceholderText('Wyszukaj filmy...')).toBeInTheDocument()
  })

  it('should call onChange when typing', () => {
    const mockOnChange = vi.fn()
    
    render(<SearchBar value="" onChange={mockOnChange} />)
    
    const input = screen.getByPlaceholderText('Wyszukaj filmy...')
    fireEvent.change(input, { target: { value: 'batman' } })
    
    expect(mockOnChange).toHaveBeenCalledWith('batman')
  })

  it('should display current value', () => {
    const mockOnChange = vi.fn()
    
    render(<SearchBar value="superman" onChange={mockOnChange} />)
    
    const input = screen.getByDisplayValue('superman')
    expect(input).toBeInTheDocument()
  })
})
