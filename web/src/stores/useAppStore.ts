/**
 * Store principal do aplicativo Voz Mágica
 * Gerencia perfis, sessões de jogo, progresso e configurações
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ChildProfile,
  GameSession,
  WordAttempt,
  Achievement,
  MiniGame,
} from '@/types';

interface AppState {
  // Perfis
  profiles: ChildProfile[];
  currentProfile: ChildProfile | null;

  // Sessão de jogo
  currentSession: GameSession | null;
  isPlaying: boolean;

  // Conquistas
  achievements: Achievement[];

  // Mini-jogos
  availableGames: MiniGame[];

  // UI State
  showParentPanel: boolean;
  parentPinVerified: boolean;

  // Actions - Perfis
  createProfile: (profile: Omit<ChildProfile, 'id' | 'createdAt' | 'stats'>) => void;
  updateProfile: (id: string, updates: Partial<ChildProfile>) => void;
  deleteProfile: (id: string) => void;
  selectProfile: (id: string) => void;

  // Actions - Jogo
  startGame: (category: string) => void;
  endGame: () => void;
  addAttempt: (attempt: WordAttempt) => void;
  updateStats: (stars: number, xp: number) => void;

  // Actions - Conquistas
  unlockAchievement: (achievementId: string) => void;

  // Actions - UI
  toggleParentPanel: () => void;
  verifyParentPin: (pin: string) => boolean;

  // Utilities
  reset: () => void;
}

const defaultGames: MiniGame[] = [
  {
    id: 'mundo-animal',
    name: 'Mundo Animal',
    description: 'Aprenda os nomes dos animais!',
    category: 'ANIMALS',
    icon: '🦁',
    minAge: 4,
    maxAge: 8,
    difficulty: 'EASY',
    isLocked: false,
  },
  {
    id: 'minhas-coisas',
    name: 'Minhas Coisas',
    description: 'Descubra objetos do dia a dia!',
    category: 'OBJECTS',
    icon: '🎨',
    minAge: 4,
    maxAge: 8,
    difficulty: 'EASY',
    isLocked: false,
  },
  {
    id: 'cores-magicas',
    name: 'Cores Mágicas',
    description: 'Aprenda as cores brincando!',
    category: 'COLORS',
    icon: '🌈',
    minAge: 4,
    maxAge: 8,
    difficulty: 'EASY',
    isLocked: false,
  },
  {
    id: 'numeros-divertidos',
    name: 'Números Divertidos',
    description: 'Conte e fale os números!',
    category: 'NUMBERS',
    icon: '🔢',
    minAge: 5,
    maxAge: 8,
    difficulty: 'MEDIUM',
    isLocked: false,
  },
  {
    id: 'hora-da-comida',
    name: 'Hora da Comida',
    description: 'Fale o nome das comidas!',
    category: 'FOODS',
    icon: '🍎',
    minAge: 4,
    maxAge: 8,
    difficulty: 'MEDIUM',
    isLocked: false,
  },
  {
    id: 'acoes-malucas',
    name: 'Ações Malucas',
    description: 'Diga o que está acontecendo!',
    category: 'ACTIONS',
    icon: '⚡',
    minAge: 6,
    maxAge: 8,
    difficulty: 'HARD',
    isLocked: true,
    unlockRequirement: { stars: 50 },
  },
];

const defaultAchievements: Achievement[] = [
  {
    id: 'first-word',
    title: 'Primeira Palavra',
    description: 'Fale sua primeira palavra corretamente!',
    icon: '⭐',
    requirement: { type: 'words', target: 1 },
  },
  {
    id: 'star-collector',
    title: 'Colecionador de Estrelas',
    description: 'Colete 10 estrelas',
    icon: '🌟',
    requirement: { type: 'stars', target: 10 },
  },
  {
    id: 'persistent',
    title: 'Persistente',
    description: 'Jogue 3 dias seguidos',
    icon: '🔥',
    requirement: { type: 'streak', target: 3 },
  },
  {
    id: 'master',
    title: 'Mestre da Pronúncia',
    description: 'Consiga 90% de acerto',
    icon: '🏆',
    requirement: { type: 'accuracy', target: 90 },
  },
  {
    id: 'dedicated',
    title: 'Dedicado',
    description: 'Jogue por 60 minutos',
    icon: '⏰',
    requirement: { type: 'playtime', target: 60 },
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      profiles: [],
      currentProfile: null,
      currentSession: null,
      isPlaying: false,
      achievements: defaultAchievements,
      availableGames: defaultGames,
      showParentPanel: false,
      parentPinVerified: false,

      // Criar perfil
      createProfile: (profileData) => {
        const newProfile: ChildProfile = {
          id: crypto.randomUUID(),
          ...profileData,
          createdAt: new Date(),
          stats: {
            totalWords: 0,
            successRate: 0,
            playTime: 0,
            currentStreak: 0,
            stars: 0,
            level: 1,
            xp: 0,
          },
        };

        set((state) => ({
          profiles: [...state.profiles, newProfile],
          currentProfile: newProfile,
        }));
      },

      // Atualizar perfil
      updateProfile: (id, updates) => {
        set((state) => ({
          profiles: state.profiles.map((profile) =>
            profile.id === id ? { ...profile, ...updates } : profile
          ),
          currentProfile:
            state.currentProfile?.id === id
              ? { ...state.currentProfile, ...updates }
              : state.currentProfile,
        }));
      },

      // Deletar perfil
      deleteProfile: (id) => {
        set((state) => ({
          profiles: state.profiles.filter((profile) => profile.id !== id),
          currentProfile:
            state.currentProfile?.id === id ? null : state.currentProfile,
        }));
      },

      // Selecionar perfil
      selectProfile: (id) => {
        const profile = get().profiles.find((p) => p.id === id);
        if (profile) {
          set({ currentProfile: profile });
        }
      },

      // Iniciar jogo
      startGame: (category) => {
        const { currentProfile } = get();
        if (!currentProfile) return;

        const newSession: GameSession = {
          id: crypto.randomUUID(),
          profileId: currentProfile.id,
          category: category as any,
          startedAt: new Date(),
          attempts: [],
          score: 0,
          starsEarned: 0,
        };

        set({
          currentSession: newSession,
          isPlaying: true,
        });
      },

      // Finalizar jogo
      endGame: () => {
        const { currentSession, currentProfile } = get();
        if (!currentSession || !currentProfile) return;

        const endedSession = {
          ...currentSession,
          endedAt: new Date(),
        };

        // Atualiza estatísticas do perfil
        const totalAttempts = endedSession.attempts.length;
        const successfulAttempts = endedSession.attempts.filter(
          (a) => a.result === 'PERFECT' || a.result === 'GOOD'
        ).length;

        const sessionPlayTime = endedSession.endedAt
          ? Math.floor(
              (endedSession.endedAt.getTime() - endedSession.startedAt.getTime()) /
                1000 /
                60
            )
          : 0;

        const updatedStats = {
          ...currentProfile.stats,
          totalWords: currentProfile.stats.totalWords + totalAttempts,
          successRate:
            totalAttempts > 0
              ? Math.round(
                  ((currentProfile.stats.totalWords *
                    currentProfile.stats.successRate +
                    successfulAttempts) /
                    (currentProfile.stats.totalWords + totalAttempts)) *
                    100
                ) / 100
              : currentProfile.stats.successRate,
          playTime: currentProfile.stats.playTime + sessionPlayTime,
          lastPlayedAt: new Date(),
        };

        get().updateProfile(currentProfile.id, { stats: updatedStats });

        set({
          currentSession: null,
          isPlaying: false,
        });

        // Verifica conquistas
        get().checkAchievements();
      },

      // Adicionar tentativa
      addAttempt: (attempt) => {
        set((state) => {
          if (!state.currentSession) return state;

          const updatedAttempts = [...state.currentSession.attempts, attempt];

          // Calcula pontuação
          let points = 0;
          if (attempt.result === 'PERFECT') points = 100;
          else if (attempt.result === 'GOOD') points = 75;
          else if (attempt.result === 'CLOSE') points = 50;

          const updatedScore = state.currentSession.score + points;
          const updatedStars =
            state.currentSession.starsEarned +
            (attempt.result === 'PERFECT' ? 1 : 0);

          return {
            currentSession: {
              ...state.currentSession,
              attempts: updatedAttempts,
              score: updatedScore,
              starsEarned: updatedStars,
            },
          };
        });
      },

      // Atualizar estatísticas (estrelas e XP)
      updateStats: (stars, xp) => {
        const { currentProfile } = get();
        if (!currentProfile) return;

        const newStars = currentProfile.stats.stars + stars;
        const newXP = currentProfile.stats.xp + xp;

        // Sistema de níveis: cada nível requer 100 XP a mais que o anterior
        let newLevel = currentProfile.stats.level;
        let remainingXP = newXP;

        while (remainingXP >= newLevel * 100) {
          remainingXP -= newLevel * 100;
          newLevel++;
        }

        get().updateProfile(currentProfile.id, {
          stats: {
            ...currentProfile.stats,
            stars: newStars,
            xp: remainingXP,
            level: newLevel,
          },
        });

        // Desbloqueia jogos baseado em estrelas
        get().unlockGamesBasedOnStars(newStars);
      },

      // Desbloquear conquista
      unlockAchievement: (achievementId) => {
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === achievementId
              ? { ...achievement, unlockedAt: new Date() }
              : achievement
          ),
        }));
      },

      // Verificar conquistas
      checkAchievements: () => {
        const { currentProfile, achievements } = get();
        if (!currentProfile) return;

        achievements.forEach((achievement) => {
          if (achievement.unlockedAt) return; // Já desbloqueada

          let shouldUnlock = false;

          switch (achievement.requirement.type) {
            case 'words':
              shouldUnlock =
                currentProfile.stats.totalWords >= achievement.requirement.target;
              break;
            case 'stars':
              shouldUnlock =
                currentProfile.stats.stars >= achievement.requirement.target;
              break;
            case 'streak':
              shouldUnlock =
                currentProfile.stats.currentStreak >= achievement.requirement.target;
              break;
            case 'accuracy':
              shouldUnlock =
                currentProfile.stats.successRate * 100 >=
                achievement.requirement.target;
              break;
            case 'playtime':
              shouldUnlock =
                currentProfile.stats.playTime >= achievement.requirement.target;
              break;
          }

          if (shouldUnlock) {
            get().unlockAchievement(achievement.id);
          }
        });
      },

      // Desbloquear jogos baseado em estrelas
      unlockGamesBasedOnStars: (totalStars) => {
        set((state) => ({
          availableGames: state.availableGames.map((game) => {
            if (
              game.isLocked &&
              game.unlockRequirement?.stars &&
              totalStars >= game.unlockRequirement.stars
            ) {
              return { ...game, isLocked: false };
            }
            return game;
          }),
        }));
      },

      // Toggle painel dos pais
      toggleParentPanel: () => {
        set((state) => ({ showParentPanel: !state.showParentPanel }));
      },

      // Verificar PIN dos pais (simples por enquanto)
      verifyParentPin: (pin) => {
        // PIN padrão: 1234 (em produção, seria hash armazenado)
        const isValid = pin === '1234';
        set({ parentPinVerified: isValid });
        return isValid;
      },

      // Reset completo
      reset: () => {
        set({
          profiles: [],
          currentProfile: null,
          currentSession: null,
          isPlaying: false,
          achievements: defaultAchievements,
          availableGames: defaultGames,
          showParentPanel: false,
          parentPinVerified: false,
        });
      },
    }),
    {
      name: 'voz-magica-storage',
      partialize: (state) => ({
        profiles: state.profiles,
        currentProfile: state.currentProfile,
        achievements: state.achievements,
      }),
    }
  )
);
