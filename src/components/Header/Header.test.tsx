import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import { Header } from './Header'
import { store } from '../../store'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}

describe('Header Component', () => {
  it('renders header with navigation links', () => {
    renderWithProviders(<Header />)
    
    expect(screen.getByText(/Movies Hunter/i)).toBeInTheDocument()
    
    expect(screen.getByText('Strona Główna')).toBeInTheDocument()
    expect(screen.getByText('Ulubione')).toBeInTheDocument()
  })
  
  it('has correct navigation links', () => {
    renderWithProviders(<Header />)
    
    const homeLink = screen.getByText('Strona Główna').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
    
    const favoritesLink = screen.getByText('Ulubione').closest('a')
    expect(favoritesLink).toHaveAttribute('href', '/favorites')
  })
})
