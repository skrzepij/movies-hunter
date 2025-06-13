import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import ErrorBoundary from './ErrorBoundary'

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary Component', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('should render error fallback when there is an error', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Coś poszło nie tak')).toBeInTheDocument()
    expect(screen.getByText('Spróbuj ponownie')).toBeInTheDocument()
    expect(screen.getByText('Wróć do strony głównej')).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  it('should render custom fallback when provided', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const CustomFallback = () => <div>Custom error message</div>
    
    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })
})
