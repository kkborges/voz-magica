/**
 * Banco Completo de 15 Jogos Educativos
 * Baseado na metodologia fonoaudiológica e versão web v1.1.0
 */

import { GameModule, GameCategory, Difficulty, GameWord } from '@/types';

// ==================== JOGO 1: MUNDO ANIMAL ====================
export { animalWords, animalModule } from './words/animalWords';

// ==================== JOGO 2: MINHAS COISAS ====================
export const objectWords: GameWord[] = [
  // Fáceis
  {
    id: 'object_bola',
    word: 'BOLA',
    category: GameCategory.OBJECTS,
    difficulty: Difficulty.EASY,
    syllables: ['BO', 'LA'],
    phonemes: ['b', 'o', 'l', 'a'],
    imageUrl: 'objects/bola.png',
    audioUrl: 'audio/objects/bola.mp3',
    relatedWords: [],
    hints: [{ type: 'context', content: 'Redonda e divertida para jogar!' }],
  },
  {
    id: 'object_casa',
    word: 'CASA',
    category: GameCategory.OBJECTS,
    difficulty: Difficulty.EASY,
    syllables: ['CA', 'SA'],
    phonemes: ['k', 'a', 's', 'a'],
    imageUrl: 'objects/casa.png',
    audioUrl: 'audio/objects/casa.mp3',
    relatedWords: [],
    hints: [{ type: 'context', content: 'Onde você mora!' }],
  },
  {
    id: 'object_mesa',
    word: 'MESA',
    category: GameCategory.OBJECTS,
    difficulty: Difficulty.EASY,
    syllables: ['ME', 'SA'],
    phonemes: ['m', 'e', 's', 'a'],
    imageUrl: 'objects/mesa.png',
    audioUrl: 'audio/objects/mesa.mp3',
    relatedWords: [],
    hints: [{ type: 'context', content: 'Onde você come e estuda!' }],
  },
  {
    id: 'object_cama',
    word: 'CAMA',
    category: GameCategory.OBJECTS,
    difficulty: Difficulty.EASY,
    syllables: ['CA', 'MA'],
    phonemes: ['k', 'a', 'm', 'a'],
    imageUrl: 'objects/cama.png',
    audioUrl: 'audio/objects/cama.mp3',
    relatedWords: [],
    hints: [{ type: 'context', content: 'Onde você dorme!' }],
  },
  {
    id: 'object_livro',
    word: 'LIVRO',
    category: GameCategory.OBJECTS,
    difficulty: Difficulty.MEDIUM,
    syllables: ['LI', 'VRO'],
    phonemes: ['l', 'i', 'v', 'r', 'o'],
    imageUrl: 'objects/livro.png',
    audioUrl: 'audio/objects/livro.mp3',
    relatedWords: [],
    hints: [{ type: 'context', content: 'Cheio de histórias e figuras!' }],
  },
  // Adicionar mais 10 palavras...
];

// ==================== JOGO 3: CORES MÁGICAS ====================
export const colorWords: GameWord[] = [
  {
    id: 'color_azul',
    word: 'AZUL',
    category: GameCategory.COLORS,
    difficulty: Difficulty.EASY,
    syllables: ['A', 'ZUL'],
    phonemes: ['a', 'z', 'u', 'l'],
    imageUrl: 'colors/azul.png',
    audioUrl: 'audio/colors/azul.mp3',
    relatedWords: [],
    hints: [{ type: 'context', content: 'A cor do céu!' }],
  },
  {
    id: 'color_vermelho',
    word: 'VERMELHO',
    category: GameCategory.COLORS,
    difficulty: Difficulty.HARD,
    syllables: ['VER', 'ME', 'LHO'],
    phonemes: ['v', 'e', 'r', 'm', 'e', 'ʎ', 'o'],
    imageUrl: 'colors/vermelho.png',
    audioUrl: 'audio/colors/vermelho.mp3',
    relatedWords: [],
    hints: [{ type: 'context', content: 'A cor do amor e do coração!' }],
  },
  // Adicionar mais 13 cores...
];

// ==================== JOGO 4: NÚMEROS ====================
export const numberWords: GameWord[] = [
  {
    id: 'number_um',
    word: 'UM',
    category: GameCategory.NUMBERS,
    difficulty: Difficulty.EASY,
    syllables: ['UM'],
    phonemes: ['ũ'],
    imageUrl: 'numbers/um.png',
    audioUrl: 'audio/numbers/um.mp3',
    relatedWords: [],
    hints: [{ type: 'context', content: 'O primeiro número!' }],
  },
  {
    id: 'number_dois',
    word: 'DOIS',
    category: GameCategory.NUMBERS,
    difficulty: Difficulty.EASY,
    syllables: ['DOIS'],
    phonemes: ['d', 'o', 'j', 's'],
    imageUrl: 'numbers/dois.png',
    audioUrl: 'audio/numbers/dois.mp3',
    relatedWords: [],
    hints: [{ type: 'context', content: 'Depois do um!' }],
  },
  // Adicionar números 3-10...
];

// ==================== JOGO 5: AÇÕES ====================
export const actionWords: GameWord[] = [
  {
    id: 'action_pular',
    word: 'PULAR',
    category: GameCategory.ACTIONS,
    difficulty: Difficulty.MEDIUM,
    syllables: ['PU', 'LAR'],
    phonemes: ['p', 'u', 'l', 'a', 'r'],
    imageUrl: 'actions/pular.png',
    audioUrl: 'audio/actions/pular.mp3',
    relatedWords: [],
    hints: [{ type: 'context', content: 'Quando você salta!' }],
  },
  {
    id: 'action_correr',
    word: 'CORRER',
    category: GameCategory.ACTIONS,
    difficulty: Difficulty.MEDIUM,
    syllables: ['COR', 'RER'],
    phonemes: ['k', 'o', 'r', 'e', 'r'],
    imageUrl: 'actions/correr.png',
    audioUrl: 'audio/actions/correr.mp3',
    relatedWords: [],
    hints: [{ type: 'context', content: 'Ir rápido!' }],
  },
  // Adicionar mais 13 ações...
];

// ==================== MÓDULOS DE JOGO ====================

export const objectsModule: GameModule = {
  id: 'module_objects',
  name: 'Minhas Coisas',
  description: 'Aprenda o nome dos objetos do dia a dia!',
  category: GameCategory.OBJECTS,
  difficulty: Difficulty.ADAPTIVE,
  words: objectWords,
  unlockRequirement: {
    type: 'completion',
    value: 1,
    moduleId: 'module_animals',
  },
  isUnlocked: false,
  progress: {
    completedWords: [],
    totalAttempts: 0,
    successfulAttempts: 0,
    isCompleted: false,
    stars: 0,
  },
};

export const colorsModule: GameModule = {
  id: 'module_colors',
  name: 'Cores Mágicas',
  description: 'Descubra as cores do arco-íris!',
  category: GameCategory.COLORS,
  difficulty: Difficulty.ADAPTIVE,
  words: colorWords,
  unlockRequirement: {
    type: 'completion',
    value: 1,
    moduleId: 'module_objects',
  },
  isUnlocked: false,
  progress: {
    completedWords: [],
    totalAttempts: 0,
    successfulAttempts: 0,
    isCompleted: false,
    stars: 0,
  },
};

export const numbersModule: GameModule = {
  id: 'module_numbers',
  name: 'Números',
  description: 'Conte de 1 a 10!',
  category: GameCategory.NUMBERS,
  difficulty: Difficulty.ADAPTIVE,
  words: numberWords,
  isUnlocked: true,
  progress: {
    completedWords: [],
    totalAttempts: 0,
    successfulAttempts: 0,
    isCompleted: false,
    stars: 0,
  },
};

export const actionsModule: GameModule = {
  id: 'module_actions',
  name: 'Ações',
  description: 'O que você gosta de fazer?',
  category: GameCategory.ACTIONS,
  difficulty: Difficulty.ADAPTIVE,
  words: actionWords,
  unlockRequirement: {
    type: 'stars',
    value: 10,
  },
  isUnlocked: false,
  progress: {
    completedWords: [],
    totalAttempts: 0,
    successfulAttempts: 0,
    isCompleted: false,
    stars: 0,
  },
};

/**
 * Lista completa de módulos
 * Nota: Versão simplificada com 5 módulos iniciais
 * Os outros 10 jogos especializados serão adicionados em expansões
 */
export const allGameModules: GameModule[] = [
  // Módulo 1 importado de animalWords.ts
  objectsModule,    // Módulo 2
  colorsModule,     // Módulo 3
  numbersModule,    // Módulo 4
  actionsModule,    // Módulo 5
  // TODO: Adicionar módulos 6-15 da versão web:
  // - Histórias
  // - Rimas
  // - Sons de Animais
  // - Vogais
  // - Consoantes
  // - Sequência de Palavras
  // - Trava-Língua
  // - Memória Auditiva
  // - Ritmo e Compasso
  // - Conversa com Avatar
];
