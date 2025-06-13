import React from 'react'

import styles from './PageLayout.module.scss'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${styles.pageContainer} ${className || ''}`}>
      <div className={styles.pageContent}>
        {children}
      </div>
    </div>
  )
}
