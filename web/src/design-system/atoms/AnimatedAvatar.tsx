/**
 * AnimatedAvatar - Avatar 3D com expressões faciais
 * Componente super interativo que reage a interações
 */

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { playSound } from '@/utils/soundManager';
import './AnimatedAvatar.css';

export type AvatarExpression =
  | 'happy'
  | 'excited'
  | 'thinking'
  | 'sad'
  | 'surprised'
  | 'celebrating'
  | 'sleeping'
  | 'speaking';

export type AvatarEmoji = string;

interface AnimatedAvatarProps {
  emoji: AvatarEmoji;
  expression?: AvatarExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'jumbo';
  animate?: boolean;
  interactive?: boolean;
  glow?: boolean;
  bounce?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function AnimatedAvatar({
  emoji,
  expression = 'happy',
  size = 'md',
  animate = true,
  interactive = true,
  glow = false,
  bounce = false,
  onClick,
  className = '',
}: AnimatedAvatarProps) {
  const controls = useAnimation();
  const [currentExpression, setCurrentExpression] = useState(expression);

  useEffect(() => {
    setCurrentExpression(expression);
    playExpressionAnimation(expression);
  }, [expression]);

  const playExpressionAnimation = (expr: AvatarExpression) => {
    const animations: Record<AvatarExpression, any> = {
      happy: {
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.6 },
      },
      excited: {
        scale: [1, 1.2, 0.95, 1.1, 1],
        rotate: [0, -10, 10, -5, 5, 0],
        y: [0, -10, 0, -5, 0],
        transition: { duration: 0.8, times: [0, 0.2, 0.4, 0.6, 1] },
      },
      thinking: {
        rotate: [0, -15, -15, 0],
        x: [0, -5, -5, 0],
        transition: { duration: 2, times: [0, 0.3, 0.7, 1] },
      },
      sad: {
        y: [0, 5],
        opacity: [1, 0.8],
        transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' },
      },
      surprised: {
        scale: [1, 1.3, 1.2],
        transition: { duration: 0.3 },
      },
      celebrating: {
        rotate: [0, -15, 15, -10, 10, 0],
        scale: [1, 1.2, 1.1, 1.2, 1],
        y: [0, -15, 0, -10, 0],
        transition: { duration: 1, repeat: 2 },
      },
      sleeping: {
        scale: [1, 0.95, 1],
        opacity: [1, 0.7, 1],
        transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' },
      },
      speaking: {
        scale: [1, 1.05, 1, 1.03, 1],
        y: [0, -2, 0, -1, 0],
        transition: { duration: 0.6, repeat: Infinity },
      },
    };

    controls.start(animations[expr]);
  };

  const handleClick = () => {
    if (!interactive) return;

    // Animação de clique
    controls.start({
      scale: [1, 0.9, 1.1, 1],
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.4 },
    });

    playSound('pop', { playbackRate: 1.2 });
    onClick?.();
  };

  const handleHover = () => {
    if (!interactive) return;

    controls.start({
      scale: 1.1,
      transition: { duration: 0.2 },
    });
  };

  const handleHoverEnd = () => {
    if (!interactive) return;

    controls.start({
      scale: 1,
      transition: { duration: 0.2 },
    });
  };

  const sizeClasses = {
    sm: 'avatar--sm',
    md: 'avatar--md',
    lg: 'avatar--lg',
    xl: 'avatar--xl',
    jumbo: 'avatar--jumbo',
  };

  return (
    <motion.div
      className={`animated-avatar ${sizeClasses[size]} ${
        interactive ? 'animated-avatar--interactive' : ''
      } ${glow ? 'animated-avatar--glow' : ''} ${className}`}
      animate={animate ? controls : undefined}
      onClick={handleClick}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
      whileTap={interactive ? { scale: 0.95 } : undefined}
    >
      <div className="avatar__emoji">{emoji}</div>

      {glow && <div className="avatar__glow" />}

      {/* Partículas ao redor (celebrating) */}
      {currentExpression === 'celebrating' && (
        <div className="avatar__particles">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="avatar__particle"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 8) * 60,
                y: Math.sin((i * Math.PI * 2) / 8) * 60,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}

      {/* Z's para sleeping */}
      {currentExpression === 'sleeping' && (
        <div className="avatar__sleep-z">
          {['z', 'z', 'Z'].map((z, i) => (
            <motion.span
              key={i}
              className="sleep-z"
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: -30 - i * 10,
                x: 10 + i * 5,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {z}
            </motion.span>
          ))}
        </div>
      )}

      {/* Bolha de pensamento (thinking) */}
      {currentExpression === 'thinking' && (
        <motion.div
          className="avatar__thought-bubble"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          💭
        </motion.div>
      )}

      {bounce && (
        <motion.div
          className="avatar__bounce-indicator"
          animate={{
            y: [0, -10, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
          }}
        />
      )}
    </motion.div>
  );
}

// Componente auxiliar: AvatarGroup
interface AvatarGroupProps {
  avatars: Array<{ emoji: AvatarEmoji; expression?: AvatarExpression }>;
  size?: 'sm' | 'md' | 'lg';
  max?: number;
  spacing?: 'tight' | 'normal' | 'loose';
}

export function AvatarGroup({
  avatars,
  size = 'md',
  max = 5,
  spacing = 'normal'
}: AvatarGroupProps) {
  const displayed = avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - max);

  const spacingClasses = {
    tight: 'avatar-group--tight',
    normal: 'avatar-group--normal',
    loose: 'avatar-group--loose',
  };

  return (
    <div className={`avatar-group ${spacingClasses[spacing]}`}>
      {displayed.map((avatar, index) => (
        <motion.div
          key={index}
          className="avatar-group__item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AnimatedAvatar
            emoji={avatar.emoji}
            expression={avatar.expression}
            size={size}
            interactive={false}
          />
        </motion.div>
      ))}

      {remaining > 0 && (
        <div className={`avatar-group__more animated-avatar ${size}`}>
          <div className="avatar__emoji">+{remaining}</div>
        </div>
      )}
    </div>
  );
}
