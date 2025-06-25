import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import styles from './Header.module.scss'

interface HeaderProps {
  onOpenSearch?: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          <h3>🎬 Movies Hunter</h3>
        </Link>
        
        <nav className={styles.nav}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Strona Główna
          </Link>
          <Link 
            to="/favorites" 
            className={`${styles.navLink} ${isActive('/favorites') ? styles.active : ''}`}
          >
            Ulubione
          </Link>
          {onOpenSearch && (
            <button 
              type="button"
              className="button button--ghost button--sm" 
              onClick={onOpenSearch}
            >
              Szukaj
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
