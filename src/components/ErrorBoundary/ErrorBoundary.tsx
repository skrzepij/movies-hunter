import React from 'react'

import styles from './ErrorBoundary.module.scss'
import { Button } from '../Button/Button'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
}

interface ErrorFallbackProps {
  error?: Error
  resetError: () => void
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => (
  <div className={styles.errorBoundary}>
    <div className={styles.errorContent}>
      <div className={styles.errorIcon}>⚠️</div>
      <h1 className={styles.errorTitle}>Coś poszło nie tak</h1>
      <p className={styles.errorMessage}>
        Wystąpił nieoczekiwany błąd w aplikacji. Przepraszamy za niedogodności.
      </p>
      
      {import.meta.env.DEV && error && (
        <details className={styles.errorDetails}>
          <summary>Szczegóły błędu (tryb deweloperski)</summary>
          <pre className={styles.errorStack}>{error.stack}</pre>
        </details>
      )}
      
      <div className={styles.errorActions}>
        <Button onClick={resetError} variant="primary">
          Spróbuj ponownie
        </Button>
        <Button onClick={() => window.location.href = '/'} variant="secondary">
          Wróć do strony głównej
        </Button>
      </div>
    </div>
  </div>
)

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Log error to external service in production
    if (import.meta.env.PROD) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
      // Here you could send error to monitoring service like Sentry
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent 
          error={this.state.error} 
          resetError={this.resetError}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
