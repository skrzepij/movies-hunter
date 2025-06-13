import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;
