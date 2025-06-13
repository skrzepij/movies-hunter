import React from 'react';

import styles from './ErrorMessage.module.scss';
import { Button } from '../Button/Button';

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
  retryText?: string
  className?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Coś poszło nie tak',
  message,
  onRetry,
  retryText = 'Spróbuj ponownie',
  className,
}) => {
  return (
    <div className={`${styles.errorContainer} ${className || ''}`}>
      <div className={styles.errorIcon}>⚠️</div>
      <span className="text text--lg text--semibold text--primary">
        {title}
      </span>
      <span className={`text text--secondary ${styles.errorMessage}`}>
        {message}
      </span>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          {retryText}
        </Button>
      )}
    </div>
  )
}

export default ErrorMessage;
