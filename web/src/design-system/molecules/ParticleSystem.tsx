/**
 * ParticleSystem - Sistema de partículas para celebrações
 * Cria efeitos visuais incríveis para engajar crianças
 */

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { playSound } from '@/utils/soundManager';
import './ParticleSystem.css';

export type ParticleType =
  | 'confetti'
  | 'stars'
  | 'hearts'
  | 'sparkles'
  | 'bubbles'
  | 'fireworks'
  | 'coins'
  | 'emojis';

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  scale: number;
  color?: string;
  emoji?: string;
}

interface ParticleSystemProps {
  type?: ParticleType;
  count?: number;
  duration?: number;
  autoPlay?: boolean;
  loop?: boolean;
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  onComplete?: () => void;
  trigger?: boolean;
  customEmojis?: string[];
}

export default function ParticleSystem({
  type = 'confetti',
  count = 50,
  duration = 3000,
  autoPlay = false,
  loop = false,
  intensity = 'medium',
  onComplete,
  trigger = false,
  customEmojis,
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (autoPlay || trigger) {
      playParticles();
    }
  }, [autoPlay, trigger]);

  const playParticles = () => {
    setIsPlaying(true);

    // Som baseado no tipo
    const soundMap: Record<ParticleType, any> = {
      confetti: 'confetti',
      stars: 'magic',
      hearts: 'chime',
      sparkles: 'magic',
      bubbles: 'pop',
      fireworks: 'achievement',
      coins: 'star',
      emojis: 'success',
    };

    playSound(soundMap[type]);

    // Gera partículas
    const newParticles = generateParticles(count, type, intensity);
    setParticles(newParticles);

    // Remove após duration
    setTimeout(() => {
      setParticles([]);
      setIsPlaying(false);
      onComplete?.();

      if (loop) {
        setTimeout(() => playParticles(), 500);
      }
    }, duration);
  };

  const generateParticles = (
    num: number,
    particleType: ParticleType,
    level: string
  ): Particle[] => {
    const multipliers = {
      low: 0.5,
      medium: 1,
      high: 1.5,
      extreme: 2.5,
    };

    const mult = multipliers[level as keyof typeof multipliers];
    const actualCount = Math.floor(num * mult);

    return Array.from({ length: actualCount }, (_, i) => {
      const angle = (Math.PI * 2 * i) / actualCount + Math.random() * 0.5;
      const speed = 150 + Math.random() * 200;

      return {
        id: `particle-${Date.now()}-${i}`,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 150, // Bias para cima
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1,
        color: getParticleColor(particleType),
        emoji: getParticleEmoji(particleType, customEmojis),
      };
    });
  };

  const getParticleColor = (particleType: ParticleType): string => {
    const colors: Record<ParticleType, string[]> = {
      confetti: ['#FF6B9D', '#FFA94D', '#FFD93D', '#6BCF7F', '#4ECDC4', '#B565D8'],
      stars: ['#FFD93D', '#FFC700', '#FFE66D'],
      hearts: ['#FF6B9D', '#FF4D7A', '#FFB3D1'],
      sparkles: ['#FFFFFF', '#FFD93D', '#4ECDC4'],
      bubbles: ['rgba(255,255,255,0.6)', 'rgba(78,205,196,0.6)'],
      fireworks: ['#FF6B9D', '#FFA94D', '#FFD93D', '#6BCF7F'],
      coins: ['#FFD93D', '#FFC700'],
      emojis: ['transparent'],
    };

    const colorArray = colors[particleType];
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  };

  const getParticleEmoji = (particleType: ParticleType, custom?: string[]): string => {
    if (custom && custom.length > 0) {
      return custom[Math.floor(Math.random() * custom.length)];
    }

    const emojis: Record<ParticleType, string[]> = {
      confetti: [],
      stars: ['⭐', '🌟', '✨'],
      hearts: ['❤️', '💖', '💕', '💗'],
      sparkles: ['✨', '💫', '⭐'],
      bubbles: ['⚪', '🫧'],
      fireworks: ['🎆', '🎇', '✨'],
      coins: ['🪙', '💰', '💎'],
      emojis: ['😊', '🎉', '🌟', '💫', '🎊'],
    };

    const emojiArray = emojis[particleType];
    return emojiArray.length > 0
      ? emojiArray[Math.floor(Math.random() * emojiArray.length)]
      : '';
  };

  if (!isPlaying && particles.length === 0) return null;

  return (
    <div className="particle-system">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`particle particle--${type}`}
          initial={{
            x: particle.x,
            y: particle.y,
            scale: particle.scale,
            rotate: particle.rotation,
            opacity: 1,
          }}
          animate={{
            x: particle.x + particle.vx,
            y: particle.y + particle.vy + 300, // Gravidade
            rotate: particle.rotation + 720,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: duration / 1000,
            ease: [0.4, 0, 0.2, 1],
            times: [0, 0.5, 0.8, 1],
          }}
          style={{
            backgroundColor: particle.emoji ? 'transparent' : particle.color,
          }}
        >
          {particle.emoji && (
            <span className="particle__emoji">{particle.emoji}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Hook customizado para usar partículas programaticamente
export function useParticles() {
  const [trigger, setTrigger] = useState(false);

  const celebrate = (type: ParticleType = 'confetti', intensity: 'low' | 'medium' | 'high' | 'extreme' = 'medium') => {
    setTrigger(true);
    setTimeout(() => setTrigger(false), 100);
  };

  return { trigger, celebrate };
}

// Componente de atalho para confetti explosão
export function ConfettiExplosion({ onComplete }: { onComplete?: () => void }) {
  return (
    <ParticleSystem
      type="confetti"
      count={80}
      duration={3000}
      intensity="extreme"
      autoPlay
      onComplete={onComplete}
    />
  );
}

// Componente de atalho para chuva de estrelas
export function StarRain({ duration = 5000 }: { duration?: number }) {
  return (
    <ParticleSystem
      type="stars"
      count={30}
      duration={duration}
      intensity="medium"
      autoPlay
      loop
    />
  );
}
