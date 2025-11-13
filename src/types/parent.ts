/**
 * Conta dos pais/responsáveis
 */
export interface ParentAccount {
  id: string;
  email: string;
  name: string;
  role: ParentRole;
  childProfiles: string[]; // IDs dos perfis
  createdAt: Date;
  settings: ParentSettings;
}

/**
 * Papel do responsável
 */
export enum ParentRole {
  PARENT = 'parent',
  GUARDIAN = 'guardian',
  THERAPIST = 'therapist',
  EDUCATOR = 'educator',
}

/**
 * Configurações dos pais
 */
export interface ParentSettings {
  pinCode: string;
  receiveEmailReports: boolean;
  reportFrequency: 'daily' | 'weekly' | 'monthly';
  allowRecordings: boolean;
  recordingRetentionDays: number;
  enableDataSharing: boolean; // Para melhorias do app (anonimizado)
}

/**
 * Relatório de progresso
 */
export interface ProgressReport {
  id: string;
  profileId: string;
  startDate: Date;
  endDate: Date;
  generatedAt: Date;
  summary: ReportSummary;
  details: ReportDetails;
  recommendations: string[];
}

/**
 * Resumo do relatório
 */
export interface ReportSummary {
  totalSessions: number;
  totalPlayTime: number; // minutos
  wordsAttempted: number;
  wordsSuccessful: number;
  accuracyRate: number; // porcentagem
  starsEarned: number;
  currentStreak: number;
  improvement: number; // porcentagem de melhora
}

/**
 * Detalhes do relatório
 */
export interface ReportDetails {
  topCategories: CategoryPerformance[];
  difficultPhonemes: PhonemePerformance[];
  mostPracticedWords: WordPerformance[];
  sessionHistory: SessionSummary[];
  progressGraph: ProgressDataPoint[];
}

/**
 * Performance por categoria
 */
export interface CategoryPerformance {
  category: string;
  attempts: number;
  successRate: number;
  averageConfidence: number;
}

/**
 * Performance por fonema
 */
export interface PhonemePerformance {
  phoneme: string;
  attempts: number;
  successRate: number;
  needsPractice: boolean;
  examples: string[]; // palavras de exemplo
}

/**
 * Performance por palavra
 */
export interface WordPerformance {
  word: string;
  attempts: number;
  successRate: number;
  lastAttemptDate: Date;
}

/**
 * Resumo de sessão
 */
export interface SessionSummary {
  date: Date;
  duration: number; // minutos
  wordsAttempted: number;
  successRate: number;
  starsEarned: number;
}

/**
 * Ponto de dados do progresso
 */
export interface ProgressDataPoint {
  date: Date;
  successRate: number;
  wordsAttempted: number;
  averageConfidence: number;
}

/**
 * Lista personalizada de palavras (para terapeutas)
 */
export interface CustomWordList {
  id: string;
  name: string;
  description: string;
  createdBy: string; // ID do terapeuta
  words: GameWord[];
  targetProfileIds?: string[]; // perfis específicos
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Plano de exercícios personalizado
 */
export interface ExercisePlan {
  id: string;
  name: string;
  description: string;
  createdBy: string; // ID do terapeuta
  profileId: string;
  schedule: ExerciseSchedule;
  wordLists: string[]; // IDs das listas
  goals: ExerciseGoal[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

/**
 * Cronograma de exercícios
 */
export interface ExerciseSchedule {
  frequency: 'daily' | 'weekly' | 'custom';
  daysOfWeek?: number[]; // 0-6 (domingo-sábado)
  sessionsPerDay: number;
  minutesPerSession: number;
  reminderTime?: string; // HH:mm
}

/**
 * Meta de exercício
 */
export interface ExerciseGoal {
  id: string;
  description: string;
  target: number;
  current: number;
  unit: 'words' | 'sessions' | 'minutes' | 'accuracy';
  deadline?: Date;
  isCompleted: boolean;
}
