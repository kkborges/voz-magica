/**
 * ProgressRing - Anel de progresso circular animado
 * Visual atraente para mostrar progresso
 */

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './ProgressRing.css';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl';
  thickness?: number;
  color?: string;
  showPercentage?: boolean;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  glow?: boolean;
  icon?: string;
  className?: string;
}

export default function ProgressRing({
  progress,
  size = 'md',
  thickness = 8,
  color,
  showPercentage = true,
  showLabel = false,
  label,
  animated = true,
  glow = false,
  icon,
  className = '',
}: ProgressRingProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      // Anima o progresso
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  const sizes = {
    sm: 60,
    md: 100,
    lg: 140,
    xl: 180,
  };

  const radius = sizes[size] / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayProgress / 100) * circumference;

  // Cor baseada no progresso
  const getColor = () => {
    if (color) return color;
    if (displayProgress >= 80) return 'var(--success)';
    if (displayProgress >= 50) return 'var(--info)';
    if (displayProgress >= 25) return 'var(--warning)';
    return 'var(--error)';
  };

  return (
    <div className={`progress-ring progress-ring--${size} ${className}`}>
      <svg
        width={sizes[size]}
        height={sizes[size]}
        className="progress-ring__svg"
      >
        {/* Background circle */}
        <circle
          className="progress-ring__background"
          cx={sizes[size] / 2}
          cy={sizes[size] / 2}
          r={radius}
          strokeWidth={thickness}
        />

        {/* Progress circle */}
        <motion.circle
          className="progress-ring__progress"
          cx={sizes[size] / 2}
          cy={sizes[size] / 2}
          r={radius}
          strokeWidth={thickness}
          stroke={getColor()}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            filter: glow ? `drop-shadow(0 0 8px ${getColor()})` : 'none',
          }}
        />
      </svg>

      {/* Centro - Texto/Icon */}
      <div className="progress-ring__content">
        {icon && <div className="progress-ring__icon">{icon}</div>}

        {showPercentage && !icon && (
          <motion.div
            className="progress-ring__percentage"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(displayProgress)}%
          </motion.div>
        )}

        {showLabel && label && (
          <div className="progress-ring__label">{label}</div>
        )}
      </div>
    </div>
  );
}

// Progress Ring com múltiplos segmentos
interface MultiProgressRingProps {
  segments: Array<{
    value: number;
    color: string;
    label?: string;
  }>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  thickness?: number;
}

export function MultiProgressRing({
  segments,
  size = 'md',
  thickness = 8,
}: MultiProgressRingProps) {
  const sizes = {
    sm: 60,
    md: 100,
    lg: 140,
    xl: 180,
  };

  const radius = sizes[size] / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className={`progress-ring progress-ring--${size} progress-ring--multi`}>
      <svg width={sizes[size]} height={sizes[size]}>
        {segments.map((segment, index) => {
          const segmentLength = (segment.value / 100) * circumference;
          const offset = currentOffset;
          currentOffset += segmentLength;

          return (
            <motion.circle
              key={index}
              className="progress-ring__segment"
              cx={sizes[size] / 2}
              cy={sizes[size] / 2}
              r={radius}
              strokeWidth={thickness}
              stroke={segment.color}
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={-offset}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{
                strokeDasharray: `${segmentLength} ${circumference}`,
              }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          );
        })}
      </svg>

      <div className="progress-ring__content">
        <div className="progress-ring__total">
          {segments.reduce((sum, s) => sum + s.value, 0)}%
        </div>
      </div>
    </div>
  );
}
