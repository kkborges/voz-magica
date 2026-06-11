/**
 * Catálogo de Conquistas
 * 24 conquistas em 5 categorias
 */

import { Achievement, AchievementCategory, Rarity, RewardType } from '@/types';

function makeAchievement(
  id: string,
  name: string,
  description: string,
  icon: string,
  category: AchievementCategory,
  requirementType: Achievement['requirement']['type'],
  value: number,
  rarity: Rarity,
  stars: number,
  xp: number,
): Achievement {
  return {
    id,
    name,
    description,
    iconUrl: icon,
    category,
    requirement: { type: requirementType, value },
    reward: { type: RewardType.STARS, stars, experiencePoints: xp },
    isUnlocked: false,
    rarity,
  };
}

export const achievements: Achievement[] = [
  // ===== PALAVRAS =====
  makeAchievement('words_1', 'Primeira Palavra', 'Falou sua primeira palavra!', '🗣️', AchievementCategory.WORDS, 'words_count', 1, Rarity.COMMON, 5, 50),
  makeAchievement('words_10', 'Tagarela', 'Falou 10 palavras!', '💬', AchievementCategory.WORDS, 'words_count', 10, Rarity.COMMON, 10, 100),
  makeAchievement('words_50', 'Falante', 'Falou 50 palavras!', '📣', AchievementCategory.WORDS, 'words_count', 50, Rarity.RARE, 25, 250),
  makeAchievement('words_100', 'Mestre das Palavras', 'Falou 100 palavras!', '🎓', AchievementCategory.WORDS, 'words_count', 100, Rarity.EPIC, 50, 500),
  makeAchievement('words_500', 'Lenda da Fala', 'Falou 500 palavras!', '👑', AchievementCategory.WORDS, 'words_count', 500, Rarity.LEGENDARY, 100, 1000),

  // ===== PRECISÃO =====
  makeAchievement('perfect_1', 'Na Mosca!', 'Primeira pronúncia perfeita!', '🎯', AchievementCategory.ACCURACY, 'accuracy_rate', 1, Rarity.COMMON, 5, 50),
  makeAchievement('perfect_10', 'Atirador de Elite', '10 pronúncias perfeitas!', '🏹', AchievementCategory.ACCURACY, 'accuracy_rate', 10, Rarity.COMMON, 15, 150),
  makeAchievement('perfect_50', 'Voz de Ouro', '50 pronúncias perfeitas!', '🥇', AchievementCategory.ACCURACY, 'accuracy_rate', 50, Rarity.RARE, 30, 300),
  makeAchievement('perfect_100', 'Voz de Diamante', '100 pronúncias perfeitas!', '💎', AchievementCategory.ACCURACY, 'accuracy_rate', 100, Rarity.EPIC, 60, 600),

  // ===== SEQUÊNCIA (STREAK) =====
  makeAchievement('streak_3', 'Três é Demais', '3 dias seguidos praticando!', '🔥', AchievementCategory.STREAK, 'streak_days', 3, Rarity.COMMON, 10, 100),
  makeAchievement('streak_7', 'Uma Semana Inteira', '7 dias seguidos!', '🌟', AchievementCategory.STREAK, 'streak_days', 7, Rarity.RARE, 25, 250),
  makeAchievement('streak_30', 'Um Mês de Dedicação', '30 dias seguidos!', '🏆', AchievementCategory.STREAK, 'streak_days', 30, Rarity.EPIC, 75, 750),
  makeAchievement('streak_100', 'Cem Dias de Magia', '100 dias seguidos!', '⭐', AchievementCategory.STREAK, 'streak_days', 100, Rarity.LEGENDARY, 200, 2000),

  // ===== TEMPO =====
  makeAchievement('time_60', 'Uma Hora de Diversão', '1 hora total de prática!', '⏰', AchievementCategory.TIME, 'play_time', 60, Rarity.COMMON, 10, 100),
  makeAchievement('time_600', 'Dez Horas de Aprendizado', '10 horas totais!', '📚', AchievementCategory.TIME, 'play_time', 600, Rarity.RARE, 40, 400),
  makeAchievement('time_3000', 'Cinquenta Horas', '50 horas totais!', '🎖️', AchievementCategory.TIME, 'play_time', 3000, Rarity.EPIC, 100, 1000),

  // ===== ESPECIAIS (MÓDULOS) =====
  makeAchievement('module_animals', 'Amigo dos Animais', 'Completou o Mundo Animal!', '🦁', AchievementCategory.SPECIAL, 'module_completion', 1, Rarity.RARE, 20, 200),
  makeAchievement('module_objects', 'Explorador de Casa', 'Completou Minhas Coisas!', '🧸', AchievementCategory.SPECIAL, 'module_completion', 2, Rarity.RARE, 20, 200),
  makeAchievement('module_colors', 'Pintor de Palavras', 'Completou Cores Mágicas!', '🌈', AchievementCategory.SPECIAL, 'module_completion', 3, Rarity.RARE, 20, 200),
  makeAchievement('module_numbers', 'Pequeno Matemático', 'Completou Números!', '🔢', AchievementCategory.SPECIAL, 'module_completion', 4, Rarity.RARE, 20, 200),
  makeAchievement('module_actions', 'Super Ativo', 'Completou Ações!', '🏃', AchievementCategory.SPECIAL, 'module_completion', 5, Rarity.RARE, 20, 200),
  makeAchievement('module_foods', 'Chef de Palavras', 'Completou Comidas Gostosas!', '🍰', AchievementCategory.SPECIAL, 'module_completion', 6, Rarity.RARE, 20, 200),
  makeAchievement('module_body', 'Conhece-te a Ti Mesmo', 'Completou Meu Corpo!', '🙋', AchievementCategory.SPECIAL, 'module_completion', 7, Rarity.RARE, 20, 200),
  makeAchievement('all_modules', 'Campeão da Voz Mágica', 'Completou TODOS os módulos!', '🏅', AchievementCategory.SPECIAL, 'module_completion', 99, Rarity.LEGENDARY, 150, 1500),
];

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find(a => a.id === id);
}
