/**
 * ScoreCounter - Contador animado de pontos/estrelas
 * Conta incrementalmente com efeitos visuais
 */

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { playSound } from '@/utils/soundManager';
import './ScoreCounter.css';

interface ScoreCounterProps {
  value: number;
  previousValue?: number;
  icon?: string;
  prefix?: string;
  suffix?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  animationDuration?: number;
  playSound?: boolean;
  showIncrease?: boolean;
  className?: string;
}

export default function ScoreCounter({
  value,
  previousValue = 0,
  icon,
  prefix = '',
  suffix = '',
  size = 'md',
  color = 'var(--primary)',
  animationDuration = 1000,
  playSound: shouldPlaySound = true,
  showIncrease = true,
  className = '',
}: ScoreCounterProps) {
  const spring = useSpring(previousValue, {
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);

    if (shouldPlaySound && value > previousValue) {
      playSound('star', { playbackRate: 1 + (value - previousValue) / 100 });
    }
  }, [value]);

  const increase = value - previousValue;
  const showIncreaseIndicator = showIncrease && increase > 0;

  return (
    <div className={`score-counter score-counter--${size} ${className}`}>
      {icon && (
        <motion.span
          className="score-counter__icon"
          animate={value > previousValue ? {
            scale: [1, 1.3, 1],
            rotate: [0, 10, -10, 0],
          } : {}}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.span>
      )}

      <div className="score-counter__value" style={{ color }}>
        {prefix}
        <motion.span>{display}</motion.span>
        {suffix}
      </div>

      {showIncreaseIndicator && (
        <motion.div
          className="score-counter__increase"
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 0], y: -30, scale: 1 }}
          transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1] }}
        >
          +{increase.toLocaleString()}
        </motion.div>
      )}
    </div>
  );
}

// Star Counter - Especializado para estrelas
export function StarCounter({ count, size = 'md' }: { count: number; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <ScoreCounter
      value={count}
      icon="⭐"
      size={size}
      color="var(--accent)"
    />
  );
}

// Gem Counter - Para gemas
export function GemCounter({ count, size = 'md' }: { count: number; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <ScoreCounter
      value={count}
      icon="💎"
      size={size}
      color="var(--info)"
    />
  );
}

// Coin Counter - Para moedas
export function CoinCounter({ count, size = 'md' }: { count: number; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <ScoreCounter
      value={count}
      icon="🪙"
      size={size}
      color="var(--accent)"
    />
  );
}

// Level Badge - Badge de nível animado
export function LevelBadge({ level, className = '' }: { level: number; className?: string }) {
  return (
    <motion.div
      className={`level-badge ${className}`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="level-badge__icon">🏆</div>
      <div className="level-badge__content">
        <div className="level-badge__label">Nível</div>
        <div className="level-badge__value">{level}</div>
      </div>
    </motion.div>
  );
}
