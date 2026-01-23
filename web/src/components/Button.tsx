/**
 * Componente Button customizado para Voz Mágica
 * Design colorido e amigável para crianças
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'fun';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children: ReactNode;
  icon?: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const classNames = [
    'vm-button',
    `vm-button--${variant}`,
    `vm-button--${size}`,
    fullWidth ? 'vm-button--full-width' : '',
    disabled ? 'vm-button--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} disabled={disabled} {...props}>
      {icon && <span className="vm-button__icon">{icon}</span>}
      <span className="vm-button__text">{children}</span>
    </button>
  );
}
