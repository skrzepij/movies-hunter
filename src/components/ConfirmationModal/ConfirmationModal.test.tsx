import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { ConfirmationModal } from './ConfirmationModal'

describe('ConfirmationModal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: 'Test Title',
    message: 'Test message',
  }

  it('renders when open', () => {
    render(<ConfirmationModal {...defaultProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test message')).toBeInTheDocument()
    expect(screen.getByText('Potwierdź')).toBeInTheDocument()
    expect(screen.getByText('Anuluj')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />)
    
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
  })

  it('calls onConfirm and onClose when confirm button is clicked', () => {
    const onConfirm = vi.fn()
    const onClose = vi.fn()
    
    render(
      <ConfirmationModal 
        {...defaultProps} 
        onConfirm={onConfirm}
        onClose={onClose}
      />
    )
    
    fireEvent.click(screen.getByText('Potwierdź'))
    
    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when cancel button is clicked', () => {
    const onClose = vi.fn()
    
    render(<ConfirmationModal {...defaultProps} onClose={onClose} />)
    
    fireEvent.click(screen.getByText('Anuluj'))
    
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders custom button text', () => {
    render(
      <ConfirmationModal 
        {...defaultProps}
        confirmText="Custom Confirm"
        cancelText="Custom Cancel"
      />
    )
    
    expect(screen.getByText('Custom Confirm')).toBeInTheDocument()
    expect(screen.getByText('Custom Cancel')).toBeInTheDocument()
  })
})
