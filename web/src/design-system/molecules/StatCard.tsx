/**
 * StatCard - Cartão de estatística para dashboards
 * Exibe métricas importantes com tendências e progresso
 */

import { motion } from 'framer-motion';
import './StatCard.css';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  footer?: string;
  progress?: number; // 0-100
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
  onClick?: () => void;
  className?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  trend,
  footer,
  progress,
  variant = 'default',
  onClick,
  className = '',
}: StatCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend.direction) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <motion.div
      className={`stat-card stat-card--${variant} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="stat-card__header">
        {icon && (
          <motion.div
            className="stat-card__icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            {icon}
          </motion.div>
        )}
        {trend && (
          <motion.div
            className={`stat-card__trend stat-card__trend--${trend.direction}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span>{getTrendIcon()}</span>
            <span>{Math.abs(trend.value)}%</span>
          </motion.div>
        )}
      </div>

      <div className="stat-card__content">
        <div className="stat-card__label">{label}</div>
        <motion.div
          className="stat-card__value"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 150 }}
        >
          {value}
        </motion.div>
      </div>

      {progress !== undefined && (
        <div className="stat-card__progress">
          <motion.div
            className="stat-card__progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          />
        </div>
      )}

      {footer && (
        <motion.div
          className="stat-card__footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {footer}
        </motion.div>
      )}
    </motion.div>
  );
}
