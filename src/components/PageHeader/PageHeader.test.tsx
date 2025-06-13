import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { PageHeader } from './PageHeader'

describe('PageHeader Component', () => {
  it('renders with title only', () => {
    render(<PageHeader title="Test Page Title" />)
    
    expect(screen.getByText('Test Page Title')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Page Title')
  })

  it('renders with title and subtitle', () => {
    render(
      <PageHeader 
        title="Test Page Title"
        subtitle="Test subtitle description"
      />
    )
    
    expect(screen.getByText('Test Page Title')).toBeInTheDocument()
    expect(screen.getByText('Test subtitle description')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    render(<PageHeader title="Test Page Title" />)
    
    expect(screen.queryByTestId('page-subtitle')).not.toBeInTheDocument()
  })

  it('renders actions when provided', () => {
    const actions = (
      <button data-testid="action-button">Action Button</button>
    )
    
    render(
      <PageHeader 
        title="Test Page Title"
        actions={actions}
      />
    )
    
    expect(screen.getByTestId('action-button')).toBeInTheDocument()
    expect(screen.getByText('Action Button')).toBeInTheDocument()
  })

  it('does not render actions when not provided', () => {
    render(<PageHeader title="Test Page Title" />)
    
    expect(screen.queryByTestId('header-actions')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <PageHeader 
        title="Test Page Title"
        className="custom-header-class"
      />
    )
    
    const header = screen.getByTestId('page-header')
    expect(header).toHaveClass('custom-header-class')
  })

  it('has proper semantic structure', () => {
    render(<PageHeader title="Test Page Title" />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
