import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage Component', () => {
  it('renders with default props', () => {
    render(<ErrorMessage message="Test error message" />)
    
    expect(screen.getByText('Coś poszło nie tak')).toBeInTheDocument()
    expect(screen.getByText('Test error message')).toBeInTheDocument()
    expect(screen.getByText('⚠️')).toBeInTheDocument()
  })

  it('renders with custom title', () => {
    render(
      <ErrorMessage 
        title="Custom Error Title"
        message="Test error message" 
      />
    )
    
    expect(screen.getByText('Custom Error Title')).toBeInTheDocument()
    expect(screen.queryByText('Coś poszło nie tak')).not.toBeInTheDocument()
  })

  it('renders retry button when onRetry is provided', () => {
    const onRetry = vi.fn()
    
    render(
      <ErrorMessage 
        message="Test error message"
        onRetry={onRetry}
      />
    )
    
    expect(screen.getByText('Spróbuj ponownie')).toBeInTheDocument()
  })

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Test error message" />)
    
    expect(screen.queryByText('Spróbuj ponownie')).not.toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = vi.fn()
    
    render(
      <ErrorMessage 
        message="Test error message"
        onRetry={onRetry}
      />
    )
    
    fireEvent.click(screen.getByText('Spróbuj ponownie'))
    
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('renders with custom retry text', () => {
    const onRetry = vi.fn()
    
    render(
      <ErrorMessage 
        message="Test error message"
        onRetry={onRetry}
        retryText="Custom Retry"
      />
    )
    
    expect(screen.getByText('Custom Retry')).toBeInTheDocument()
    expect(screen.queryByText('Spróbuj ponownie')).not.toBeInTheDocument()
  })
})
