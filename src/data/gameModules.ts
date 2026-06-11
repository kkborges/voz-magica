/**
 * Módulos de jogo disponíveis
 */

import { GameModule, GameCategory, Difficulty } from '@/types';
import { animalWords } from './words/animalWords';
import {
  objectsModule,
  colorsModule,
  numbersModule,
  actionsModule,
  foodsModule,
  bodyModule,
  vowelsModule,
  animalSoundsModule,
  rhymesModule,
  consonantsModule,
  sequencesModule,
  memoryModule,
  conversationModule,
  tongueTwistersModule,
} from './allGames';

/**
 * Módulo Mundo Animal
 */
export const animalModule: GameModule = {
  id: 'module_animals',
  name: 'Mundo Animal',
  description: 'Aprenda a falar o nome dos animais!',
  category: GameCategory.ANIMALS,
  difficulty: Difficulty.ADAPTIVE,
  words: animalWords,
  isUnlocked: true, // Sempre desbloqueado
  progress: {
    completedWords: [],
    totalAttempts: 0,
    successfulAttempts: 0,
    isCompleted: false,
    stars: 0,
  },
};

/**
 * Lista de todos os módulos
 */
export const gameModules: GameModule[] = [
  animalModule,         // 1 - Sempre desbloqueado
  vowelsModule,         // 2 - Desbloqueado (base fonética)
  animalSoundsModule,   // 3 - Desbloqueado (onomatopeias)
  objectsModule,        // 4 - Desbloqueado
  colorsModule,         // 5 - Desbloqueado
  numbersModule,        // 6 - Desbloqueado
  actionsModule,        // 7 - 10 estrelas
  foodsModule,          // 8 - 20 estrelas
  bodyModule,           // 9 - 30 estrelas
  rhymesModule,         // 10 - 40 estrelas
  consonantsModule,     // 11 - 50 estrelas
  sequencesModule,      // 12 - 60 estrelas
  memoryModule,         // 13 - 70 estrelas
  conversationModule,   // 14 - 80 estrelas
  tongueTwistersModule, // 15 - 100 estrelas (desafio final!)
];

/**
 * Função para obter um módulo por ID
 */
export function getModuleById(id: string): GameModule | undefined {
  return gameModules.find(module => module.id === id);
}

/**
 * Função para obter módulos desbloqueados
 */
export function getUnlockedModules(stats?: { starsEarned: number }): GameModule[] {
  return gameModules.filter(module => {
    if (module.isUnlocked) return true;

    if (!module.unlockRequirement) return false;

    // Verificar requisito de estrelas
    if (module.unlockRequirement.type === 'stars') {
      return stats && stats.starsEarned >= module.unlockRequirement.value;
    }

    // Verificar requisito de completação
    if (module.unlockRequirement.type === 'completion' && module.unlockRequirement.moduleId) {
      const requiredModule = getModuleById(module.unlockRequirement.moduleId);
      return requiredModule?.progress.isCompleted || false;
    }

    return false;
  });
}

/**
 * Verificar se um módulo pode ser desbloqueado
 */
export function canUnlockModule(moduleId: string, stats: { starsEarned: number }): boolean {
  const module = getModuleById(moduleId);
  if (!module) return false;

  if (module.isUnlocked) return true;
  if (!module.unlockRequirement) return false;

  if (module.unlockRequirement.type === 'stars') {
    return stats.starsEarned >= module.unlockRequirement.value;
  }

  if (module.unlockRequirement.type === 'completion' && module.unlockRequirement.moduleId) {
    const requiredModule = getModuleById(module.unlockRequirement.moduleId);
    return requiredModule?.progress.isCompleted || false;
  }

  return false;
}
