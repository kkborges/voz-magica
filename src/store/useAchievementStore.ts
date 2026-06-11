/**
 * Store de Conquistas
 * Rastreia e desbloqueia conquistas baseado nas estatísticas
 */

import { create } from 'zustand';
import { Achievement, ProfileStats } from '@/types';
import { achievements as achievementCatalog } from '@/data/achievements';
import StorageService from '@/services/storage/StorageService';

interface AchievementStore {
  achievements: Achievement[];
  recentlyUnlocked: Achievement[];

  loadAchievements: () => Promise<void>;
  checkAchievements: (stats: ProfileStats, perfectCount: number) => Promise<Achievement[]>;
  clearRecentlyUnlocked: () => void;
}

export const useAchievementStore = create<AchievementStore>((set, get) => ({
  achievements: achievementCatalog,
  recentlyUnlocked: [],

  loadAchievements: async () => {
    const saved = await StorageService.getAchievements();
    if (saved.length > 0) {
      // Mescla estado salvo com catálogo (para novas conquistas adicionadas)
      const merged = achievementCatalog.map(catalogItem => {
        const savedItem = saved.find(s => s.id === catalogItem.id);
        return savedItem
          ? { ...catalogItem, isUnlocked: savedItem.isUnlocked, unlockedAt: savedItem.unlockedAt }
          : catalogItem;
      });
      set({ achievements: merged });
    }
  },

  checkAchievements: async (stats: ProfileStats, perfectCount: number) => {
    const { achievements } = get();
    const newlyUnlocked: Achievement[] = [];

    const updated = achievements.map(achievement => {
      if (achievement.isUnlocked) return achievement;

      let shouldUnlock = false;
      const { type, value } = achievement.requirement;

      switch (type) {
        case 'words_count':
          shouldUnlock = stats.totalWordsSuccess >= value;
          break;
        case 'accuracy_rate':
          shouldUnlock = perfectCount >= value;
          break;
        case 'streak_days':
          shouldUnlock = stats.currentStreak >= value;
          break;
        case 'play_time':
          shouldUnlock = stats.totalPlayTime >= value;
          break;
        // module_completion verificado separadamente via GameScreen
      }

      if (shouldUnlock) {
        const unlocked = { ...achievement, isUnlocked: true, unlockedAt: new Date() };
        newlyUnlocked.push(unlocked);
        return unlocked;
      }

      return achievement;
    });

    if (newlyUnlocked.length > 0) {
      set({ achievements: updated, recentlyUnlocked: newlyUnlocked });
      await StorageService.saveAchievements(updated);
    }

    return newlyUnlocked;
  },

  clearRecentlyUnlocked: () => set({ recentlyUnlocked: [] }),
}));
