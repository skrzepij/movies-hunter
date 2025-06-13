import React from 'react'

import styles from './SearchBar.module.scss'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  placeholder?: string
  className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Wyszukaj filmy...',
  className,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const handleClear = () => {
    onChange('')
    onClear?.()
  }

  return (
    <div className={`${styles.searchContainer} ${className || ''}`} data-testid="search-bar">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        aria-label="Wyszukaj filmy"
        className={styles.searchInput}
      />
      {value && (
        <button
          onClick={handleClear}
          aria-label="Wyczyść wyszukiwanie"
          type="button"
          className={styles.clearButton}
        >
          ✕
        </button>
      )}
    </div>
  )
}
