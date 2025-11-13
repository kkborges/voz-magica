import { Word } from '../types';

export const wordsDatabase: Word[] = [
  // Palavras Fáceis - 1 sílaba
  {
    id: '1',
    text: 'pá',
    syllables: ['pá'],
    difficulty: 'easy',
    category: 'objetos',
  },
  {
    id: '2',
    text: 'mão',
    syllables: ['mão'],
    difficulty: 'easy',
    category: 'corpo',
  },
  {
    id: '3',
    text: 'pé',
    syllables: ['pé'],
    difficulty: 'easy',
    category: 'corpo',
  },
  {
    id: '4',
    text: 'sol',
    syllables: ['sol'],
    difficulty: 'easy',
    category: 'natureza',
  },
  {
    id: '5',
    text: 'luz',
    syllables: ['luz'],
    difficulty: 'easy',
    category: 'objetos',
  },

  // Palavras Fáceis - 2 sílabas
  {
    id: '6',
    text: 'casa',
    syllables: ['ca', 'sa'],
    difficulty: 'easy',
    category: 'lugares',
  },
  {
    id: '7',
    text: 'bola',
    syllables: ['bo', 'la'],
    difficulty: 'easy',
    category: 'brinquedos',
  },
  {
    id: '8',
    text: 'gato',
    syllables: ['ga', 'to'],
    difficulty: 'easy',
    category: 'animais',
  },
  {
    id: '9',
    text: 'sapo',
    syllables: ['sa', 'po'],
    difficulty: 'easy',
    category: 'animais',
  },
  {
    id: '10',
    text: 'vaca',
    syllables: ['va', 'ca'],
    difficulty: 'easy',
    category: 'animais',
  },
  {
    id: '11',
    text: 'pato',
    syllables: ['pa', 'to'],
    difficulty: 'easy',
    category: 'animais',
  },
  {
    id: '12',
    text: 'água',
    syllables: ['á', 'gua'],
    difficulty: 'easy',
    category: 'natureza',
  },

  // Palavras Médias - 2-3 sílabas
  {
    id: '13',
    text: 'boneca',
    syllables: ['bo', 'ne', 'ca'],
    difficulty: 'medium',
    category: 'brinquedos',
  },
  {
    id: '14',
    text: 'sapato',
    syllables: ['sa', 'pa', 'to'],
    difficulty: 'medium',
    category: 'roupas',
  },
  {
    id: '15',
    text: 'macaco',
    syllables: ['ma', 'ca', 'co'],
    difficulty: 'medium',
    category: 'animais',
  },
  {
    id: '16',
    text: 'tomate',
    syllables: ['to', 'ma', 'te'],
    difficulty: 'medium',
    category: 'alimentos',
  },
  {
    id: '17',
    text: 'banana',
    syllables: ['ba', 'na', 'na'],
    difficulty: 'medium',
    category: 'alimentos',
  },
  {
    id: '18',
    text: 'cavalo',
    syllables: ['ca', 'va', 'lo'],
    difficulty: 'medium',
    category: 'animais',
  },
  {
    id: '19',
    text: 'janela',
    syllables: ['ja', 'ne', 'la'],
    difficulty: 'medium',
    category: 'objetos',
  },
  {
    id: '20',
    text: 'estrela',
    syllables: ['es', 'tre', 'la'],
    difficulty: 'medium',
    category: 'natureza',
  },

  // Palavras Difíceis - 3-4 sílabas
  {
    id: '21',
    text: 'borboleta',
    syllables: ['bor', 'bo', 'le', 'ta'],
    difficulty: 'hard',
    category: 'animais',
  },
  {
    id: '22',
    text: 'chocolate',
    syllables: ['cho', 'co', 'la', 'te'],
    difficulty: 'hard',
    category: 'alimentos',
  },
  {
    id: '23',
    text: 'dinossauro',
    syllables: ['di', 'nos', 'sau', 'ro'],
    difficulty: 'hard',
    category: 'animais',
  },
  {
    id: '24',
    text: 'elefante',
    syllables: ['e', 'le', 'fan', 'te'],
    difficulty: 'hard',
    category: 'animais',
  },
  {
    id: '25',
    text: 'passarinho',
    syllables: ['pas', 'sa', 'ri', 'nho'],
    difficulty: 'hard',
    category: 'animais',
  },
  {
    id: '26',
    text: 'geladeira',
    syllables: ['ge', 'la', 'dei', 'ra'],
    difficulty: 'hard',
    category: 'objetos',
  },
  {
    id: '27',
    text: 'melancia',
    syllables: ['me', 'lan', 'ci', 'a'],
    difficulty: 'hard',
    category: 'alimentos',
  },
  {
    id: '28',
    text: 'professora',
    syllables: ['pro', 'fes', 'so', 'ra'],
    difficulty: 'hard',
    category: 'pessoas',
  },
];

export const getWordsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Word[] => {
  return wordsDatabase.filter(word => word.difficulty === difficulty);
};

export const getWordsByCategory = (category: string): Word[] => {
  return wordsDatabase.filter(word => word.category === category);
};

export const getRandomWord = (difficulty?: 'easy' | 'medium' | 'hard'): Word => {
  const words = difficulty ? getWordsByDifficulty(difficulty) : wordsDatabase;
  return words[Math.floor(Math.random() * words.length)];
};
