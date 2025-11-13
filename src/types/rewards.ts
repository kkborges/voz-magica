/**
 * Sistema de recompensas e gamificação
 */

/**
 * Badge/conquista
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  category: AchievementCategory;
  requirement: AchievementRequirement;
  reward: Reward;
  isUnlocked: boolean;
  unlockedAt?: Date;
  rarity: Rarity;
}

/**
 * Categoria de conquista
 */
export enum AchievementCategory {
  WORDS = 'words',
  STREAK = 'streak',
  ACCURACY = 'accuracy',
  TIME = 'time',
  SPECIAL = 'special',
  SOCIAL = 'social',
}

/**
 * Raridade
 */
export enum Rarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

/**
 * Requisito para desbloquear
 */
export interface AchievementRequirement {
  type: 'words_count' | 'accuracy_rate' | 'streak_days' | 'play_time' | 'module_completion' | 'special';
  value: number;
  specificConditions?: Record<string, any>;
}

/**
 * Recompensa
 */
export interface Reward {
  type: RewardType;
  stars?: number;
  experiencePoints?: number;
  unlockable?: Unlockable;
}

/**
 * Tipo de recompensa
 */
export enum RewardType {
  STARS = 'stars',
  EXPERIENCE = 'experience',
  AVATAR = 'avatar',
  STICKER = 'sticker',
  THEME = 'theme',
  SOUND = 'sound',
  ANIMATION = 'animation',
}

/**
 * Item desbloqueável
 */
export interface Unlockable {
  id: string;
  type: RewardType;
  name: string;
  description: string;
  imageUrl: string;
  cost?: number; // em estrelas
  isUnlocked: boolean;
}

/**
 * Adesivo digital
 */
export interface Sticker {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  animationUrl?: string;
  isUnlocked: boolean;
}

/**
 * Tema visual
 */
export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  previewImageUrl: string;
  isUnlocked: boolean;
}

/**
 * Sequência de dias (streak)
 */
export interface Streak {
  current: number;
  longest: number;
  lastActiveDate: Date;
  milestones: StreakMilestone[];
}

/**
 * Marco de sequência
 */
export interface StreakMilestone {
  days: number;
  isReached: boolean;
  reward: Reward;
}

/**
 * Loja de recompensas
 */
export interface RewardShopItem {
  id: string;
  type: RewardType;
  name: string;
  description: string;
  imageUrl: string;
  cost: number; // em estrelas
  category: string;
  isPurchased: boolean;
  isAvailable: boolean;
}
