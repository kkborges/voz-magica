/**
 * Perfil da criança no aplicativo
 */
export interface ChildProfile {
  id: string;
  name: string;
  avatarId: string;
  ageGroup: AgeGroup;
  createdAt: Date;
  lastActiveAt: Date;
  settings: ProfileSettings;
  stats: ProfileStats;
}

/**
 * Faixa etária da criança
 */
export enum AgeGroup {
  FOUR_TO_FIVE = '4-5',
  SIX_TO_EIGHT = '6-8',
}

/**
 * Configurações do perfil
 */
export interface ProfileSettings {
  microphoneSensitivity: number; // 0-100
  speechSpeed: number; // 0.5 - 2.0
  voiceType: VoiceType;
  enableNotifications: boolean;
  dailyGoal: number; // minutos por dia
  colorBlindMode: boolean;
  highContrast: boolean;
  fontSize: FontSize;
}

/**
 * Tipo de voz do aplicativo
 */
export enum VoiceType {
  FEMALE_FRIENDLY = 'female_friendly',
  MALE_FRIENDLY = 'male_friendly',
  CHILD_FRIENDLY = 'child_friendly',
}

/**
 * Tamanho de fonte
 */
export enum FontSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra_large',
}

/**
 * Estatísticas do perfil
 */
export interface ProfileStats {
  totalWordsAttempted: number;
  totalWordsSuccess: number;
  totalPlayTime: number; // em minutos
  currentStreak: number; // dias consecutivos
  longestStreak: number;
  starsEarned: number;
  level: number;
  experiencePoints: number;
}

/**
 * Avatar disponível
 */
export interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  unlockRequirement?: {
    type: 'stars' | 'level' | 'achievement';
    value: number;
  };
  isUnlocked: boolean;
}
