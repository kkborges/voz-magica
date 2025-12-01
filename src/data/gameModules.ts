/**
 * Módulos de jogo disponíveis
 */

import { GameModule, GameCategory, Difficulty } from '@/types';
import { animalWords } from './words/animalWords';

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
  isUnlocked: true, // Sempre desbloqueado no MVP
  progress: {
    completedWords: [],
    totalAttempts: 0,
    successfulAttempts: 0,
    isCompleted: false,
    stars: 0,
  },
};

/**
 * Lista de todos os módulos (por enquanto só temos um)
 */
export const gameModules: GameModule[] = [animalModule];

/**
 * Função para obter um módulo por ID
 */
export function getModuleById(id: string): GameModule | undefined {
  return gameModules.find(module => module.id === id);
}

/**
 * Função para obter módulos desbloqueados
 */
export function getUnlockedModules(): GameModule[] {
  return gameModules.filter(module => module.isUnlocked);
}
