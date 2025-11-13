/**
 * Categoria de jogo
 */
export enum GameCategory {
  ANIMALS = 'animals',
  OBJECTS = 'objects',
  NUMBERS = 'numbers',
  COLORS = 'colors',
  ACTIONS = 'actions',
  FOODS = 'foods',
  CUSTOM = 'custom',
}

/**
 * Dificuldade do jogo
 */
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  ADAPTIVE = 'adaptive', // Ajusta automaticamente
}

/**
 * Palavra/item do jogo
 */
export interface GameWord {
  id: string;
  word: string;
  category: GameCategory;
  difficulty: Difficulty;
  syllables: string[];
  phonemes: string[];
  imageUrl: string;
  audioUrl: string;
  alternativePronunciations?: string[];
  relatedWords?: string[]; // Para feedback de "você quis dizer..."
  hints?: WordHint[];
}

/**
 * Dica para a palavra
 */
export interface WordHint {
  type: 'syllable' | 'rhythm' | 'visual' | 'context';
  content: string;
  audioUrl?: string;
  imageUrl?: string;
}

/**
 * Módulo/nível do jogo
 */
export interface GameModule {
  id: string;
  name: string;
  description: string;
  category: GameCategory;
  difficulty: Difficulty;
  words: GameWord[];
  unlockRequirement?: {
    type: 'stars' | 'level' | 'completion';
    value: number;
    moduleId?: string; // módulo que precisa completar antes
  };
  isUnlocked: boolean;
  progress: ModuleProgress;
}

/**
 * Progresso no módulo
 */
export interface ModuleProgress {
  completedWords: string[]; // IDs das palavras
  totalAttempts: number;
  successfulAttempts: number;
  lastPlayedAt?: Date;
  isCompleted: boolean;
  stars: number; // 0-3
}

/**
 * Sessão de jogo
 */
export interface GameSession {
  id: string;
  profileId: string;
  moduleId: string;
  startedAt: Date;
  endedAt?: Date;
  attempts: GameAttempt[];
  totalScore: number;
  starsEarned: number;
}

/**
 * Tentativa de pronúncia
 */
export interface GameAttempt {
  id: string;
  wordId: string;
  targetWord: string;
  recognizedWord: string;
  confidence: number; // 0-100
  result: AttemptResult;
  audioRecordingUrl?: string;
  timestamp: Date;
  attemptNumber: number; // quantas vezes tentou essa palavra
  feedbackType: FeedbackType;
  phonemeAnalysis?: PhonemeAnalysis[];
}

/**
 * Resultado da tentativa
 */
export enum AttemptResult {
  PERFECT = 'perfect',
  GOOD = 'good',
  CLOSE = 'close',
  INCORRECT = 'incorrect',
  NO_SPEECH = 'no_speech',
  ERROR = 'error',
}

/**
 * Tipo de feedback dado
 */
export enum FeedbackType {
  POSITIVE_REINFORCEMENT = 'positive_reinforcement',
  SIMILAR_WORD_QUESTION = 'similar_word_question',
  SYLLABLE_BREAKDOWN = 'syllable_breakdown',
  RHYTHM_SONG = 'rhythm_song',
  VISUAL_CUE = 'visual_cue',
  ENCOURAGEMENT = 'encouragement',
}

/**
 * Análise fonética
 */
export interface PhonemeAnalysis {
  phoneme: string;
  expected: string;
  accuracy: number; // 0-100
  position: number; // posição na palavra
  suggestion?: string;
}

/**
 * Desafio diário
 */
export interface DailyChallenge {
  id: string;
  date: Date;
  words: GameWord[];
  bonusStars: number;
  isCompleted: boolean;
  completedAt?: Date;
}
