// Tipos principais do aplicativo Voz Mágica

export type AgeGroup = '4-5' | '6-8';
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';
export type GameCategory = 'ANIMALS' | 'OBJECTS' | 'NUMBERS' | 'COLORS' | 'ACTIONS' | 'FOODS';

export interface ChildProfile {
  id: string;
  name: string;
  avatar: string;
  ageGroup: AgeGroup;
  createdAt: Date;
  settings: ProfileSettings;
  stats: ProfileStats;
}

export interface ProfileSettings {
  microphoneSensitivity: number; // 0-1
  speechSpeed: 'slow' | 'normal' | 'fast';
  enableSoundEffects: boolean;
  enableMusic: boolean;
  enableHapticFeedback: boolean;
}

export interface ProfileStats {
  totalWords: number;
  successRate: number;
  playTime: number; // minutos
  currentStreak: number;
  stars: number;
  level: number;
  xp: number;
  lastPlayedAt?: Date;
}

export interface Word {
  id: string;
  text: string;
  category: GameCategory;
  difficulty: DifficultyLevel;
  syllables: string[];
  phoneticTranscription: string;
  imageUrl: string;
  audioUrl?: string;
  hint?: string;
}

export interface GameSession {
  id: string;
  profileId: string;
  category: GameCategory;
  startedAt: Date;
  endedAt?: Date;
  attempts: WordAttempt[];
  score: number;
  starsEarned: number;
}

export interface WordAttempt {
  wordId: string;
  wordText: string;
  spokenText: string;
  timestamp: Date;
  accuracy: number; // 0-100
  result: 'PERFECT' | 'GOOD' | 'CLOSE' | 'INCORRECT';
  feedbackGiven: string;
  audioRecording?: Blob;
}

export interface FeedbackResponse {
  result: 'PERFECT' | 'GOOD' | 'CLOSE' | 'INCORRECT';
  accuracy: number;
  message: string;
  encouragement: string;
  suggestions?: string[];
  syllableBreakdown?: string[];
  visualAid?: string;
  audioAid?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  requirement: {
    type: 'stars' | 'words' | 'streak' | 'accuracy' | 'playtime';
    target: number;
  };
}

export interface ParentReport {
  profileId: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  summary: {
    totalSessions: number;
    totalWords: number;
    averageAccuracy: number;
    totalPlayTime: number;
    improvement: number; // percentual
  };
  categoryProgress: {
    category: GameCategory;
    wordsAttempted: number;
    successRate: number;
  }[];
  difficultWords: {
    word: string;
    attempts: number;
    successRate: number;
  }[];
  recommendations: string[];
}

export interface MiniGame {
  id: string;
  name: string;
  description: string;
  category: GameCategory;
  icon: string;
  minAge: number;
  maxAge: number;
  difficulty: DifficultyLevel;
  isLocked: boolean;
  unlockRequirement?: {
    stars?: number;
    level?: number;
  };
}
