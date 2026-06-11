/**
 * Store do jogo
 * Gerencia o estado do jogo atual
 */

import { create } from 'zustand';
import {
  GameModule,
  GameSession,
  GameAttempt,
  GameWord,
  AttemptResult,
} from '@/types';
import StorageService from '@/services/storage/StorageService';

interface GameStore {
  currentModule: GameModule | null;
  currentSession: GameSession | null;
  currentWord: GameWord | null;
  currentAttemptNumber: number;
  isPlaying: boolean;
  isPaused: boolean;

  // Actions
  startSession: (profileId: string, module: GameModule) => void;
  endSession: () => Promise<void>;
  setCurrentWord: (word: GameWord) => void;
  recordAttempt: (attempt: GameAttempt) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  currentModule: null,
  currentSession: null,
  currentWord: null,
  currentAttemptNumber: 0,
  isPlaying: false,
  isPaused: false,

  startSession: (profileId: string, module: GameModule) => {
    const session: GameSession = {
      id: `session_${Date.now()}`,
      profileId,
      moduleId: module.id,
      startedAt: new Date(),
      attempts: [],
      totalScore: 0,
      starsEarned: 0,
    };

    set({
      currentModule: module,
      currentSession: session,
      isPlaying: true,
      isPaused: false,
    });
  },

  endSession: async () => {
    const { currentSession } = get();

    if (currentSession) {
      const endedSession: GameSession = {
        ...currentSession,
        endedAt: new Date(),
      };

      await StorageService.saveSession(endedSession);

      set({
        currentModule: null,
        currentSession: null,
        currentWord: null,
        currentAttemptNumber: 0,
        isPlaying: false,
      });
    }
  },

  setCurrentWord: (word: GameWord) => {
    set({ currentWord: word, currentAttemptNumber: 0 });
  },

  recordAttempt: (attempt: GameAttempt) => {
    const { currentSession, currentAttemptNumber } = get();

    if (currentSession) {
      const updatedAttempt = { ...attempt, attemptNumber: currentAttemptNumber + 1 };
      const attempts = [...currentSession.attempts, updatedAttempt];

      // Calcula score baseado no resultado
      let scoreIncrement = 0;
      switch (attempt.result) {
        case AttemptResult.PERFECT:
          scoreIncrement = 100;
          break;
        case AttemptResult.GOOD:
          scoreIncrement = 75;
          break;
        case AttemptResult.CLOSE:
          scoreIncrement = 50;
          break;
        default:
          scoreIncrement = 0;
      }

      const updatedSession: GameSession = {
        ...currentSession,
        attempts,
        totalScore: currentSession.totalScore + scoreIncrement,
        starsEarned:
          currentSession.starsEarned +
          (attempt.result === AttemptResult.PERFECT ? 1 : 0),
      };

      set({
        currentSession: updatedSession,
        currentAttemptNumber: currentAttemptNumber + 1,
      });
    }
  },

  pauseGame: () => set({ isPaused: true }),

  resumeGame: () => set({ isPaused: false }),

  resetGame: () =>
    set({
      currentModule: null,
      currentSession: null,
      currentWord: null,
      currentAttemptNumber: 0,
      isPlaying: false,
      isPaused: false,
    }),
}));
