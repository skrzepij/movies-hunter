import React from 'react'

import styles from './ConfirmationModal.module.scss'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Potwierdź',
  cancelText = 'Anuluj',
  variant = 'warning',
}) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const getIconForVariant = () => {
    switch (variant) {
      case 'danger':
        return '⚠️'
      case 'warning':
        return '❓'
      case 'info':
        return 'ℹ️'
      default:
        return '❓'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <div className={styles.confirmationModal}>
        <div className={styles.header}>
          <div className={`${styles.icon} ${styles[variant]}`}>
            {getIconForVariant()}
          </div>
          <h2 className={styles.title}>{title}</h2>
        </div>
        
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
        </div>
        
        <div className={styles.actions}>
          <Button
            variant="secondary"
            onClick={onClose}
            className={styles.cancelButton}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            className={`${styles.confirmButton} ${styles[variant]}`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
