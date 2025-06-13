import React from 'react'

import styles from './PageHeader.module.scss'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  className
}) => {
  return (
    <header 
      className={`${styles.pageHeader} ${className || ''}`}
      data-testid="page-header"
    >
      <div className={styles.headerContent} data-testid="header-content">
        <div className={styles.headerInfo} data-testid="header-info">
          <h1 className={styles.title} data-testid="page-title">{title}</h1>
          {subtitle && (
            <p className={styles.subtitle} data-testid="page-subtitle">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className={styles.headerActions} data-testid="header-actions">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}
