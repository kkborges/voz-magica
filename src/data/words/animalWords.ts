/**
 * Banco de dados de palavras - Módulo Mundo Animal
 */

import { GameWord, GameCategory, Difficulty } from '@/types';

/**
 * Palavras do módulo Mundo Animal
 * 15 palavras com diferentes níveis de dificuldade
 */
export const animalWords: GameWord[] = [
  // Fáceis (3-5 letras, fonemas simples)
  {
    id: 'animal_gato',
    word: 'GATO',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.EASY,
    syllables: ['GA', 'TO'],
    phonemes: ['g', 'a', 't', 'o'],
    imageUrl: 'animals/gato.png',
    audioUrl: 'audio/animals/gato.mp3',
    relatedWords: ['tato', 'pato', 'rato'],
    hints: [
      {
        type: 'syllable',
        content: 'GA-TO',
        audioUrl: 'audio/hints/gato_syllable.mp3',
      },
      {
        type: 'context',
        content: 'O animal que faz miau!',
      },
    ],
  },
  {
    id: 'animal_cao',
    word: 'CÃO',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.EASY,
    syllables: ['CÃO'],
    phonemes: ['k', 'ã', 'w'],
    imageUrl: 'animals/cao.png',
    audioUrl: 'audio/animals/cao.mp3',
    relatedWords: ['mão', 'pão', 'chão'],
    hints: [
      {
        type: 'context',
        content: 'O melhor amigo do homem!',
      },
    ],
  },
  {
    id: 'animal_boi',
    word: 'BOI',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.EASY,
    syllables: ['BOI'],
    phonemes: ['b', 'o', 'i'],
    imageUrl: 'animals/boi.png',
    audioUrl: 'audio/animals/boi.mp3',
    relatedWords: [],
    hints: [
      {
        type: 'context',
        content: 'Animal grande que vive na fazenda!',
      },
    ],
  },
  {
    id: 'animal_pato',
    word: 'PATO',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.EASY,
    syllables: ['PA', 'TO'],
    phonemes: ['p', 'a', 't', 'o'],
    imageUrl: 'animals/pato.png',
    audioUrl: 'audio/animals/pato.mp3',
    relatedWords: ['gato', 'rato', 'mato'],
    hints: [
      {
        type: 'syllable',
        content: 'PA-TO',
        audioUrl: 'audio/hints/pato_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Nada na lagoa e faz quá-quá!',
      },
    ],
  },
  {
    id: 'animal_urso',
    word: 'URSO',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.EASY,
    syllables: ['UR', 'SO'],
    phonemes: ['u', 'r', 's', 'o'],
    imageUrl: 'animals/urso.png',
    audioUrl: 'audio/animals/urso.mp3',
    relatedWords: [],
    hints: [
      {
        type: 'syllable',
        content: 'UR-SO',
        audioUrl: 'audio/hints/urso_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Grande, peludo e adora mel!',
      },
    ],
  },

  // Médias (6-8 letras, fonemas moderados)
  {
    id: 'animal_cavalo',
    word: 'CAVALO',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.MEDIUM,
    syllables: ['CA', 'VA', 'LO'],
    phonemes: ['k', 'a', 'v', 'a', 'l', 'o'],
    imageUrl: 'animals/cavalo.png',
    audioUrl: 'audio/animals/cavalo.mp3',
    relatedWords: [],
    hints: [
      {
        type: 'syllable',
        content: 'CA-VA-LO',
        audioUrl: 'audio/hints/cavalo_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Corre rápido e as pessoas podem montar!',
      },
    ],
  },
  {
    id: 'animal_coelho',
    word: 'COELHO',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.MEDIUM,
    syllables: ['CO', 'E', 'LHO'],
    phonemes: ['k', 'o', 'e', 'ʎ', 'o'],
    imageUrl: 'animals/coelho.png',
    audioUrl: 'audio/animals/coelho.mp3',
    relatedWords: ['joelho', 'velho'],
    hints: [
      {
        type: 'syllable',
        content: 'CO-E-LHO',
        audioUrl: 'audio/hints/coelho_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Tem orelhas grandes e pula muito!',
      },
    ],
  },
  {
    id: 'animal_macaco',
    word: 'MACACO',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.MEDIUM,
    syllables: ['MA', 'CA', 'CO'],
    phonemes: ['m', 'a', 'k', 'a', 'k', 'o'],
    imageUrl: 'animals/macaco.png',
    audioUrl: 'audio/animals/macaco.mp3',
    relatedWords: [],
    hints: [
      {
        type: 'syllable',
        content: 'MA-CA-CO',
        audioUrl: 'audio/hints/macaco_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Sobe em árvores e adora banana!',
      },
    ],
  },
  {
    id: 'animal_girafa',
    word: 'GIRAFA',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.MEDIUM,
    syllables: ['GI', 'RA', 'FA'],
    phonemes: ['ʒ', 'i', 'r', 'a', 'f', 'a'],
    imageUrl: 'animals/girafa.png',
    audioUrl: 'audio/animals/girafa.mp3',
    relatedWords: [],
    hints: [
      {
        type: 'syllable',
        content: 'GI-RA-FA',
        audioUrl: 'audio/hints/girafa_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Tem pescoço muito comprido!',
      },
    ],
  },
  {
    id: 'animal_porco',
    word: 'PORCO',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.MEDIUM,
    syllables: ['POR', 'CO'],
    phonemes: ['p', 'o', 'r', 'k', 'o'],
    imageUrl: 'animals/porco.png',
    audioUrl: 'audio/animals/porco.mp3',
    relatedWords: [],
    hints: [
      {
        type: 'syllable',
        content: 'POR-CO',
        audioUrl: 'audio/hints/porco_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Vive na fazenda e faz oinc-oinc!',
      },
    ],
  },

  // Difíceis (fonemas complexos, palavras mais longas)
  {
    id: 'animal_elefante',
    word: 'ELEFANTE',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.HARD,
    syllables: ['E', 'LE', 'FAN', 'TE'],
    phonemes: ['e', 'l', 'e', 'f', 'ã', 't', 'e'],
    imageUrl: 'animals/elefante.png',
    audioUrl: 'audio/animals/elefante.mp3',
    relatedWords: [],
    hints: [
      {
        type: 'syllable',
        content: 'E-LE-FAN-TE',
        audioUrl: 'audio/hints/elefante_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Muito grande e tem uma tromba!',
      },
    ],
  },
  {
    id: 'animal_borboleta',
    word: 'BORBOLETA',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.HARD,
    syllables: ['BOR', 'BO', 'LE', 'TA'],
    phonemes: ['b', 'o', 'r', 'b', 'o', 'l', 'e', 't', 'a'],
    imageUrl: 'animals/borboleta.png',
    audioUrl: 'audio/animals/borboleta.mp3',
    relatedWords: [],
    hints: [
      {
        type: 'syllable',
        content: 'BOR-BO-LE-TA',
        audioUrl: 'audio/hints/borboleta_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Voa e tem asas coloridas!',
      },
    ],
  },
  {
    id: 'animal_tartaruga',
    word: 'TARTARUGA',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.HARD,
    syllables: ['TAR', 'TA', 'RU', 'GA'],
    phonemes: ['t', 'a', 'r', 't', 'a', 'r', 'u', 'g', 'a'],
    imageUrl: 'animals/tartaruga.png',
    audioUrl: 'audio/animals/tartaruga.mp3',
    relatedWords: [],
    hints: [
      {
        type: 'syllable',
        content: 'TAR-TA-RU-GA',
        audioUrl: 'audio/hints/tartaruga_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Anda devagar e tem uma casca!',
      },
    ],
  },
  {
    id: 'animal_passaro',
    word: 'PÁSSARO',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.HARD,
    syllables: ['PÁS', 'SA', 'RO'],
    phonemes: ['p', 'a', 's', 's', 'a', 'r', 'o'],
    imageUrl: 'animals/passaro.png',
    audioUrl: 'audio/animals/passaro.mp3',
    relatedWords: [],
    hints: [
      {
        type: 'syllable',
        content: 'PÁS-SA-RO',
        audioUrl: 'audio/hints/passaro_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Voa no céu e canta!',
      },
    ],
  },
  {
    id: 'animal_jacare',
    word: 'JACARÉ',
    category: GameCategory.ANIMALS,
    difficulty: Difficulty.HARD,
    syllables: ['JA', 'CA', 'RÉ'],
    phonemes: ['ʒ', 'a', 'k', 'a', 'r', 'ɛ'],
    imageUrl: 'animals/jacare.png',
    audioUrl: 'audio/animals/jacare.mp3',
    relatedWords: [],
    hints: [
      {
        type: 'syllable',
        content: 'JA-CA-RÉ',
        audioUrl: 'audio/hints/jacare_syllable.mp3',
      },
      {
        type: 'context',
        content: 'Vive no rio e tem dentes grandes!',
      },
    ],
  },
];

/**
 * Função para obter palavras por dificuldade
 */
export function getWordsByDifficulty(difficulty: Difficulty): GameWord[] {
  return animalWords.filter(word => word.difficulty === difficulty);
}

/**
 * Função para obter uma palavra aleatória
 */
export function getRandomAnimalWord(): GameWord {
  return animalWords[Math.floor(Math.random() * animalWords.length)];
}

/**
 * Função para obter palavras por dificuldade em ordem
 */
export function getProgressiveWords(): GameWord[] {
  return [
    ...getWordsByDifficulty(Difficulty.EASY),
    ...getWordsByDifficulty(Difficulty.MEDIUM),
    ...getWordsByDifficulty(Difficulty.HARD),
  ];
}
