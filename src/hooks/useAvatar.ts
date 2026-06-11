/**
 * Hook para gerenciar avatar personalizado
 */

import { useState, useEffect } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import {
  getAvatarById,
  getRandomEncouragement,
  getRandomCelebration,
  getRandomHint,
  AvatarPersonality,
} from '@/data/avatars';

export function useAvatar() {
  const { currentProfile } = useProfileStore();
  const [avatar, setAvatar] = useState<AvatarPersonality | null>(null);

  useEffect(() => {
    if (currentProfile?.avatarId) {
      const avatarData = getAvatarById(currentProfile.avatarId);
      setAvatar(avatarData || null);
    }
  }, [currentProfile]);

  const getEncouragement = () => {
    if (!currentProfile?.avatarId) return 'Você consegue!';
    return getRandomEncouragement(currentProfile.avatarId);
  };

  const getCelebration = () => {
    if (!currentProfile?.avatarId) return 'Parabéns!';
    return getRandomCelebration(currentProfile.avatarId);
  };

  const getHint = () => {
    if (!currentProfile?.avatarId) return 'Vamos tentar de novo!';
    return getRandomHint(currentProfile.avatarId);
  };

  return {
    avatar,
    getEncouragement,
    getCelebration,
    getHint,
  };
}
