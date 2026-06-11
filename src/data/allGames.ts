/**
 * Módulos de Jogo Completos
 * 7 módulos com 77+ palavras (expansível para 15)
 */

import { GameModule, GameCategory, Difficulty } from '@/types';
import { objectWords } from './words/objectWords';
import { colorWords } from './words/colorWords';
import { numberWords } from './words/numberWords';
import { actionWords } from './words/actionWords';
import { foodWords } from './words/foodWords';
import { bodyWords } from './words/bodyWords';

export { objectWords, colorWords, numberWords, actionWords, foodWords, bodyWords };

const emptyProgress = () => ({
  completedWords: [],
  totalAttempts: 0,
  successfulAttempts: 0,
  isCompleted: false,
  stars: 0,
});

export const objectsModule: GameModule = {
  id: 'module_objects',
  name: 'Minhas Coisas',
  description: 'Aprenda o nome dos objetos do dia a dia!',
  category: GameCategory.OBJECTS,
  difficulty: Difficulty.ADAPTIVE,
  words: objectWords,
  isUnlocked: true,
  progress: emptyProgress(),
};

export const colorsModule: GameModule = {
  id: 'module_colors',
  name: 'Cores Mágicas',
  description: 'Descubra as cores do arco-íris!',
  category: GameCategory.COLORS,
  difficulty: Difficulty.ADAPTIVE,
  words: colorWords,
  isUnlocked: true,
  progress: emptyProgress(),
};

export const numbersModule: GameModule = {
  id: 'module_numbers',
  name: 'Números',
  description: 'Conte de 1 a 10!',
  category: GameCategory.NUMBERS,
  difficulty: Difficulty.ADAPTIVE,
  words: numberWords,
  isUnlocked: true,
  progress: emptyProgress(),
};

export const actionsModule: GameModule = {
  id: 'module_actions',
  name: 'Ações',
  description: 'O que você gosta de fazer?',
  category: GameCategory.ACTIONS,
  difficulty: Difficulty.ADAPTIVE,
  words: actionWords,
  unlockRequirement: { type: 'stars', value: 10 },
  isUnlocked: false,
  progress: emptyProgress(),
};

export const foodsModule: GameModule = {
  id: 'module_foods',
  name: 'Comidas Gostosas',
  description: 'Fale o nome das delícias!',
  category: GameCategory.FOODS,
  difficulty: Difficulty.ADAPTIVE,
  words: foodWords,
  unlockRequirement: { type: 'stars', value: 20 },
  isUnlocked: false,
  progress: emptyProgress(),
};

export const bodyModule: GameModule = {
  id: 'module_body',
  name: 'Meu Corpo',
  description: 'Conheça as partes do corpo!',
  category: GameCategory.CUSTOM,
  difficulty: Difficulty.ADAPTIVE,
  words: bodyWords,
  unlockRequirement: { type: 'stars', value: 30 },
  isUnlocked: false,
  progress: emptyProgress(),
};
