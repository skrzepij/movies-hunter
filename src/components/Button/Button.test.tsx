import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="secondary">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass(/button--secondary/);

    rerender(<Button variant="danger">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass(/button--danger/);
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('forwards additional props', () => {
    render(<Button data-testid="custom-button" title="Custom title">Test</Button>);
    
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('title', 'Custom title');
  });
});
