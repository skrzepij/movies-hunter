import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { LoadingSpinner } from './LoadingSpinner'

describe('LoadingSpinner Component', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />)
    
    expect(screen.getByLabelText('Ładowanie')).toBeInTheDocument()
  })

  it('renders with default medium size', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toHaveAttribute('data-size', 'md')
  })

  it('renders with small size', () => {
    render(<LoadingSpinner size="sm" />)
    
    const spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toHaveAttribute('data-size', 'sm')
  })

  it('renders with large size', () => {
    render(<LoadingSpinner size="lg" />)
    
    const spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toHaveAttribute('data-size', 'lg')
  })

  it('renders message when provided', () => {
    render(<LoadingSpinner message="Loading data..." />)
    
    expect(screen.getByText('Loading data...')).toBeInTheDocument()
  })

  it('does not render message when not provided', () => {
    render(<LoadingSpinner />)
    
    expect(screen.queryByTestId('loading-message')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />)
    
    const spinnerContainer = screen.getByTestId('loading-spinner-container')
    expect(spinnerContainer).toHaveClass('custom-class')
  })

  it('has proper accessibility attributes', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByLabelText('Ładowanie')
    expect(spinner).toBeInTheDocument()
  })
})
