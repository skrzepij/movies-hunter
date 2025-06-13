import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock React DOM
const mockRender = vi.fn()
const mockCreateRoot = vi.fn(() => ({
  render: mockRender,
}))

vi.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}))

vi.mock('./App.tsx', () => ({
  default: () => <div data-testid="app">App</div>,
}))

vi.mock('./scss/main.scss', () => ({}))

describe('main.tsx', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Setup DOM
    document.body.innerHTML = '<div id="root"></div>'
    
    // Clear module cache to ensure fresh import
    vi.resetModules()
  })

  afterEach(() => {
    // Clean up
    document.body.innerHTML = ''
  })

  it('should execute main.tsx and render app', async () => {
    // Import main.tsx to execute it
    await import('./main.tsx')
    
    // Verify that createRoot was called with root element
    expect(mockCreateRoot).toHaveBeenCalledWith(document.getElementById('root'))
    // Verify that render was called
    expect(mockRender).toHaveBeenCalled()
  })

  it('should throw error when root element is not found', async () => {
    // Remove root element
    document.body.innerHTML = ''
    
    // Should throw when importing main.tsx
    await expect(import('./main.tsx')).rejects.toThrow('Root element not found')
  })
})
