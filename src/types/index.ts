/**
 * Exportação central de todos os tipos
 */

export * from './profile';
export * from './game';
export * from './parent';
export * from './rewards';

/**
 * Tipos de navegação
 */
export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Profile: { profileId: string };
  Game: { moduleId: string };
  GameResults: {
    wordsAttempted: number;
    wordsCorrect: number;
    starsEarned: number;
    xpEarned: number;
  };
  Progress: { profileId: string };
  Settings: undefined;
  ParentDashboard: undefined;
  CreateProfile: undefined;
  EditProfile: { profileId: string };
  RewardShop: undefined;
  DailyChallenge: undefined;
};

/**
 * Estado de loading
 */
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  message?: string;
}

/**
 * Resposta de API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

/**
 * Erro de API
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * Configuração do aplicativo
 */
export interface AppConfig {
  apiUrl: string;
  speechApiKey: string;
  audioSampleRate: number;
  maxRecordingDuration: number; // segundos
  minimumConfidence: number; // 0-100
  enableAnalytics: boolean;
  enableCrashReporting: boolean;
  cacheDuration: number; // horas
}
