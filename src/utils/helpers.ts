/**
 * Funções auxiliares
 */

import { EXPERIENCE_LEVELS } from '@/constants';

/**
 * Calcula o nível baseado na experiência
 */
export function calculateLevel(experiencePoints: number): number {
  let level = 1;

  for (const levelData of EXPERIENCE_LEVELS) {
    if (experiencePoints >= levelData.xpRequired) {
      level = levelData.level;
    } else {
      break;
    }
  }

  return level;
}

/**
 * Calcula progresso para o próximo nível
 */
export function calculateLevelProgress(experiencePoints: number): {
  currentLevel: number;
  nextLevel: number;
  currentXP: number;
  requiredXP: number;
  progress: number;
} {
  const currentLevel = calculateLevel(experiencePoints);
  const nextLevel = currentLevel + 1;

  const currentLevelData = EXPERIENCE_LEVELS.find(l => l.level === currentLevel);
  const nextLevelData = EXPERIENCE_LEVELS.find(l => l.level === nextLevel);

  const currentXP = experiencePoints - (currentLevelData?.xpRequired || 0);
  const requiredXP = (nextLevelData?.xpRequired || 0) - (currentLevelData?.xpRequired || 0);
  const progress = requiredXP > 0 ? (currentXP / requiredXP) * 100 : 100;

  return {
    currentLevel,
    nextLevel,
    currentXP,
    requiredXP,
    progress: Math.min(progress, 100),
  };
}

/**
 * Formata tempo em minutos para string legível
 */
export function formatPlayTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
}

/**
 * Formata porcentagem
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Gera ID único
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Embaralha array (Fisher-Yates)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Seleciona item aleatório do array
 */
export function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Valida idade
 */
export function isValidAge(age: number): boolean {
  return age >= 3 && age <= 12;
}

/**
 * Calcula taxa de acerto
 */
export function calculateAccuracyRate(successful: number, total: number): number {
  if (total === 0) return 0;
  return (successful / total) * 100;
}
