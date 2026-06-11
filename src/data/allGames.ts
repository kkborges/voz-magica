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
import {
  vowelWords,
  rhymeWords,
  animalSoundWords,
  consonantWords,
  tongueTwisterWords,
  sequenceWords,
  memoryWords,
  conversationWords,
} from './words/specializedWords';

export { objectWords, colorWords, numberWords, actionWords, foodWords, bodyWords };
export * from './words/specializedWords';

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

// ===== MÓDULOS ESPECIALIZADOS (8-15) =====

export const vowelsModule: GameModule = {
  id: 'module_vowels',
  name: 'Vogais',
  description: 'A, E, I, O, U - a base de tudo!',
  category: GameCategory.CUSTOM,
  difficulty: Difficulty.ADAPTIVE,
  words: vowelWords,
  isUnlocked: true,
  progress: emptyProgress(),
};

export const animalSoundsModule: GameModule = {
  id: 'module_animal_sounds',
  name: 'Sons de Animais',
  description: 'Au au, miau! Imite os bichinhos!',
  category: GameCategory.CUSTOM,
  difficulty: Difficulty.ADAPTIVE,
  words: animalSoundWords,
  isUnlocked: true,
  progress: emptyProgress(),
};

export const rhymesModule: GameModule = {
  id: 'module_rhymes',
  name: 'Rimas',
  description: 'Palavras que combinam no som!',
  category: GameCategory.CUSTOM,
  difficulty: Difficulty.ADAPTIVE,
  words: rhymeWords,
  unlockRequirement: { type: 'stars', value: 40 },
  isUnlocked: false,
  progress: emptyProgress(),
};

export const consonantsModule: GameModule = {
  id: 'module_consonants',
  name: 'Consoantes',
  description: 'Treine os sons mais difíceis!',
  category: GameCategory.CUSTOM,
  difficulty: Difficulty.ADAPTIVE,
  words: consonantWords,
  unlockRequirement: { type: 'stars', value: 50 },
  isUnlocked: false,
  progress: emptyProgress(),
};

export const sequencesModule: GameModule = {
  id: 'module_sequences',
  name: 'Sequência de Palavras',
  description: 'Fale duas ou três palavras juntas!',
  category: GameCategory.CUSTOM,
  difficulty: Difficulty.ADAPTIVE,
  words: sequenceWords,
  unlockRequirement: { type: 'stars', value: 60 },
  isUnlocked: false,
  progress: emptyProgress(),
};

export const memoryModule: GameModule = {
  id: 'module_memory',
  name: 'Memória Auditiva',
  description: 'Ouça e repita na ordem certa!',
  category: GameCategory.CUSTOM,
  difficulty: Difficulty.ADAPTIVE,
  words: memoryWords,
  unlockRequirement: { type: 'stars', value: 70 },
  isUnlocked: false,
  progress: emptyProgress(),
};

export const conversationModule: GameModule = {
  id: 'module_conversation',
  name: 'Conversa',
  description: 'Frases para o dia a dia!',
  category: GameCategory.CUSTOM,
  difficulty: Difficulty.ADAPTIVE,
  words: conversationWords,
  unlockRequirement: { type: 'stars', value: 80 },
  isUnlocked: false,
  progress: emptyProgress(),
};

export const tongueTwistersModule: GameModule = {
  id: 'module_tongue_twisters',
  name: 'Trava-Língua',
  description: 'O desafio final dos campeões!',
  category: GameCategory.CUSTOM,
  difficulty: Difficulty.HARD,
  words: tongueTwisterWords,
  unlockRequirement: { type: 'stars', value: 100 },
  isUnlocked: false,
  progress: emptyProgress(),
};
