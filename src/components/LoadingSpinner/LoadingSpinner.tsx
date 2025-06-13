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
    <div className={`${styles.spinnerContainer} ${className || ''}`}>
      <div 
        className={`${styles.spinner} ${styles[size]}`} 
        aria-label="Ładowanie" 
      />
      {message && (
        <span className="text text--secondary text--sm">
          {message}
        </span>
      )}
    </div>
  )
}
