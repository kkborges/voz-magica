/**
 * InteractiveButton - Atomic Design
 * Botão com micro-interações avançadas, feedback háptico e sons
 */

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ReactNode, useCallback, useRef } from 'react';
import { playSound, SoundType } from '@/utils/soundManager';
import { hapticFeedback, HapticType } from '@/utils/haptics';
import './InteractiveButton.css';

export interface InteractiveButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'fun' | 'magical';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'jumbo';
  disabled?: boolean;
  loading?: boolean;
  sound?: SoundType;
  haptic?: HapticType;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
  pulse?: boolean;
  bounce?: boolean;
  confetti?: boolean;
  className?: string;
}

export default function InteractiveButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  sound = 'click',
  haptic = 'light',
  icon,
  iconPosition = 'left',
  glow = false,
  pulse = false,
  bounce = false,
  confetti = false,
  className = '',
}: InteractiveButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Motion values para animações avançadas
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transformações baseadas na posição do mouse
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const scale = useMotionValue(1);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      // Feedback sonoro
      playSound(sound);

      // Feedback háptico (mobile)
      hapticFeedback(haptic);

      // Confetti effect
      if (confetti) {
        createConfettiEffect(e.clientX, e.clientY);
      }

      // Ripple effect
      createRipple(e, buttonRef.current);

      // Callback
      onClick?.();
    },
    [disabled, loading, sound, haptic, confetti, onClick]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    idle: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.05,
      rotate: bounce ? [0, -2, 2, -2, 0] : 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      rotate: 0,
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  const glowVariants = {
    idle: {
      boxShadow: '0 0 0px rgba(255, 107, 157, 0)',
    },
    hover: {
      boxShadow: '0 0 20px rgba(255, 107, 157, 0.6)',
    },
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`interactive-button interactive-button--${variant} interactive-button--${size} ${
        disabled ? 'interactive-button--disabled' : ''
      } ${loading ? 'interactive-button--loading' : ''} ${className}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
      variants={pulse ? { ...variants, idle: variants.pulse } : variants}
      initial="idle"
      whileHover={!disabled && !loading ? 'hover' : undefined}
      whileTap={!disabled && !loading ? 'tap' : undefined}
      animate={glow ? glowVariants : undefined}
      style={{
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {loading && <LoadingSpinner />}

      {!loading && (
        <>
          {icon && iconPosition === 'left' && (
            <motion.span
              className="interactive-button__icon interactive-button__icon--left"
              initial={{ x: 0 }}
              whileHover={{ x: -2, rotate: -10 }}
            >
              {icon}
            </motion.span>
          )}

          <span className="interactive-button__text">{children}</span>

          {icon && iconPosition === 'right' && (
            <motion.span
              className="interactive-button__icon interactive-button__icon--right"
              initial={{ x: 0 }}
              whileHover={{ x: 2, rotate: 10 }}
            >
              {icon}
            </motion.span>
          )}
        </>
      )}

      {/* Camada de brilho */}
      {glow && <div className="interactive-button__glow" />}
    </motion.button>
  );
}

// Helper: Criar efeito ripple
function createRipple(
  event: React.MouseEvent<HTMLButtonElement>,
  button: HTMLButtonElement | null
) {
  if (!button) return;

  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add('interactive-button__ripple');

  const ripple = button.getElementsByClassName('interactive-button__ripple')[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);

  setTimeout(() => circle.remove(), 600);
}

// Helper: Criar efeito confetti
function createConfettiEffect(x: number, y: number) {
  const confettiCount = 20;
  const confettiColors = ['#FF6B9D', '#FFA94D', '#FFD93D', '#6BCF7F', '#4ECDC4'];

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-particle';
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor =
      confettiColors[Math.floor(Math.random() * confettiColors.length)];

    const angle = (Math.PI * 2 * i) / confettiCount;
    const velocity = 100 + Math.random() * 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 100;

    confetti.style.setProperty('--vx', `${vx}px`);
    confetti.style.setProperty('--vy', `${vy}px`);

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 1000);
  }
}

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <motion.div
      className="interactive-button__spinner"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div className="spinner-circle" />
    </motion.div>
  );
}
