/**
 * Hook para gerenciar progresso do jogo
 */

import { useState, useEffect } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import { useGameStore } from '@/store/useGameStore';
import { calculateLevel, calculateLevelProgress } from '@/utils/helpers';

export function useGameProgress() {
  const { currentProfile, updateProfile } = useProfileStore();
  const { currentSession } = useGameStore();

  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState({
    currentLevel: 1,
    nextLevel: 2,
    currentXP: 0,
    requiredXP: 100,
    progress: 0,
  });

  useEffect(() => {
    if (currentProfile) {
      const currentLevel = calculateLevel(currentProfile.stats.experiencePoints);
      const progressData = calculateLevelProgress(currentProfile.stats.experiencePoints);

      setLevel(currentLevel);
      setProgress(progressData);
    }
  }, [currentProfile]);

  const addExperience = async (xp: number) => {
    if (!currentProfile) return;

    const newProfile = {
      ...currentProfile,
      stats: {
        ...currentProfile.stats,
        experiencePoints: currentProfile.stats.experiencePoints + xp,
      },
    };

    await updateProfile(newProfile);
  };

  const addStars = async (stars: number) => {
    if (!currentProfile) return;

    const newProfile = {
      ...currentProfile,
      stats: {
        ...currentProfile.stats,
        starsEarned: currentProfile.stats.starsEarned + stars,
      },
    };

    await updateProfile(newProfile);
  };

  const updatePlayTime = async (minutes: number) => {
    if (!currentProfile) return;

    const newProfile = {
      ...currentProfile,
      stats: {
        ...currentProfile.stats,
        totalPlayTime: currentProfile.stats.totalPlayTime + minutes,
      },
    };

    await updateProfile(newProfile);
  };

  const updateStreak = async () => {
    if (!currentProfile) return;

    const today = new Date().toDateString();
    const lastActive = new Date(currentProfile.lastActiveAt).toDateString();

    const isToday = today === lastActive;
    const isYesterday =
      new Date(lastActive).getTime() === new Date().getTime() - 24 * 60 * 60 * 1000;

    let newStreak = currentProfile.stats.currentStreak;

    if (!isToday) {
      if (isYesterday) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }

    const newProfile = {
      ...currentProfile,
      lastActiveAt: new Date(),
      stats: {
        ...currentProfile.stats,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, currentProfile.stats.longestStreak),
      },
    };

    await updateProfile(newProfile);
  };

  return {
    level,
    progress,
    addExperience,
    addStars,
    updatePlayTime,
    updateStreak,
    currentSession,
  };
}
