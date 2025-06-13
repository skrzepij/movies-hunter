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
    <header className={`${styles.pageHeader} ${className || ''}`}>
      <div className={styles.headerContent}>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && (
            <p className={styles.subtitle}>{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className={styles.headerActions}>
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}
