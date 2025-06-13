import React from 'react'

import styles from './LoadingSpinner.module.scss'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
  className,
}) => {
  return (
    <div 
      className={`${styles.spinnerContainer} ${className || ''}`}
      data-testid="loading-spinner-container"
    >
      <div 
        className={`${styles.spinner} ${styles[size]}`} 
        aria-label="Ładowanie"
        data-testid="loading-spinner"
        data-size={size}
      />
      {message && (
        <span 
          className="text text--secondary text--sm"
          data-testid="loading-message"
        >
          {message}
        </span>
      )}
    </div>
  )
}
