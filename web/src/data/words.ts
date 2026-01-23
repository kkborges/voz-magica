/**
 * Banco de dados de palavras para os mini-jogos
 * Organizado por categoria e nível de dificuldade
 */

import type { Word, GameCategory, DifficultyLevel } from '@/types';

// Mundo Animal - 🦁
const animalWords: Word[] = [
  // EASY (3-5 letras, fonemas simples)
  {
    id: 'animal-1',
    text: 'gato',
    category: 'ANIMALS',
    difficulty: 'EASY',
    syllables: ['ga', 'to'],
    phoneticTranscription: 'gatu',
    imageUrl: '/images/animals/gato.svg',
    hint: 'Um bichinho que faz "miau"',
  },
  {
    id: 'animal-2',
    text: 'cão',
    category: 'ANIMALS',
    difficulty: 'EASY',
    syllables: ['cão'],
    phoneticTranscription: 'kãw',
    imageUrl: '/images/animals/cao.svg',
    hint: 'Melhor amigo do homem',
  },
  {
    id: 'animal-3',
    text: 'boi',
    category: 'ANIMALS',
    difficulty: 'EASY',
    syllables: ['boi'],
    phoneticTranscription: 'boj',
    imageUrl: '/images/animals/boi.svg',
    hint: 'Animal da fazenda que dá leite',
  },
  {
    id: 'animal-4',
    text: 'pato',
    category: 'ANIMALS',
    difficulty: 'EASY',
    syllables: ['pa', 'to'],
    phoneticTranscription: 'patu',
    imageUrl: '/images/animals/pato.svg',
    hint: 'Bicho que nada e faz "quack"',
  },
  {
    id: 'animal-5',
    text: 'urso',
    category: 'ANIMALS',
    difficulty: 'EASY',
    syllables: ['ur', 'so'],
    phoneticTranscription: 'ursu',
    imageUrl: '/images/animals/urso.svg',
    hint: 'Grande e peludo, gosta de mel',
  },

  // MEDIUM (6-8 letras)
  {
    id: 'animal-6',
    text: 'cavalo',
    category: 'ANIMALS',
    difficulty: 'MEDIUM',
    syllables: ['ca', 'va', 'lo'],
    phoneticTranscription: 'kavalu',
    imageUrl: '/images/animals/cavalo.svg',
    hint: 'Animal que corre rápido e tem crina',
  },
  {
    id: 'animal-7',
    text: 'coelho',
    category: 'ANIMALS',
    difficulty: 'MEDIUM',
    syllables: ['co', 'e', 'lho'],
    phoneticTranscription: 'kweʎu',
    imageUrl: '/images/animals/coelho.svg',
    hint: 'Pula muito e tem orelhas grandes',
  },
  {
    id: 'animal-8',
    text: 'macaco',
    category: 'ANIMALS',
    difficulty: 'MEDIUM',
    syllables: ['ma', 'ca', 'co'],
    phoneticTranscription: 'makaku',
    imageUrl: '/images/animals/macaco.svg',
    hint: 'Sobe em árvores e come banana',
  },
  {
    id: 'animal-9',
    text: 'girafa',
    category: 'ANIMALS',
    difficulty: 'MEDIUM',
    syllables: ['gi', 'ra', 'fa'],
    phoneticTranscription: 'ʒirafa',
    imageUrl: '/images/animals/girafa.svg',
    hint: 'Tem pescoço muito comprido',
  },
  {
    id: 'animal-10',
    text: 'porco',
    category: 'ANIMALS',
    difficulty: 'MEDIUM',
    syllables: ['por', 'co'],
    phoneticTranscription: 'porku',
    imageUrl: '/images/animals/porco.svg',
    hint: 'Faz "oinc oinc"',
  },

  // HARD (8+ letras, fonemas complexos)
  {
    id: 'animal-11',
    text: 'elefante',
    category: 'ANIMALS',
    difficulty: 'HARD',
    syllables: ['e', 'le', 'fan', 'te'],
    phoneticTranscription: 'elefãtʃi',
    imageUrl: '/images/animals/elefante.svg',
    hint: 'O maior animal da terra, tem tromba',
  },
  {
    id: 'animal-12',
    text: 'borboleta',
    category: 'ANIMALS',
    difficulty: 'HARD',
    syllables: ['bor', 'bo', 'le', 'ta'],
    phoneticTranscription: 'borboleta',
    imageUrl: '/images/animals/borboleta.svg',
    hint: 'Voa e tem asas coloridas',
  },
  {
    id: 'animal-13',
    text: 'tartaruga',
    category: 'ANIMALS',
    difficulty: 'HARD',
    syllables: ['tar', 'ta', 'ru', 'ga'],
    phoneticTranscription: 'tartaruga',
    imageUrl: '/images/animals/tartaruga.svg',
    hint: 'Anda devagar e tem casco',
  },
  {
    id: 'animal-14',
    text: 'jacaré',
    category: 'ANIMALS',
    difficulty: 'HARD',
    syllables: ['ja', 'ca', 'ré'],
    phoneticTranscription: 'ʒakaɾɛ',
    imageUrl: '/images/animals/jacare.svg',
    hint: 'Réptil verde que vive no rio',
  },
  {
    id: 'animal-15',
    text: 'pássaro',
    category: 'ANIMALS',
    difficulty: 'HARD',
    syllables: ['pás', 'sa', 'ro'],
    phoneticTranscription: 'pasaru',
    imageUrl: '/images/animals/passaro.svg',
    hint: 'Voa e canta no céu',
  },
];

// Minhas Coisas - 🎨
const objectWords: Word[] = [
  // EASY
  {
    id: 'object-1',
    text: 'bola',
    category: 'OBJECTS',
    difficulty: 'EASY',
    syllables: ['bo', 'la'],
    phoneticTranscription: 'bɔla',
    imageUrl: '/images/objects/bola.svg',
    hint: 'Redonda, usada para jogar',
  },
  {
    id: 'object-2',
    text: 'casa',
    category: 'OBJECTS',
    difficulty: 'EASY',
    syllables: ['ca', 'sa'],
    phoneticTranscription: 'kaza',
    imageUrl: '/images/objects/casa.svg',
    hint: 'Onde você mora',
  },
  {
    id: 'object-3',
    text: 'lápis',
    category: 'OBJECTS',
    difficulty: 'EASY',
    syllables: ['lá', 'pis'],
    phoneticTranscription: 'lapis',
    imageUrl: '/images/objects/lapis.svg',
    hint: 'Usa para desenhar',
  },
  {
    id: 'object-4',
    text: 'mesa',
    category: 'OBJECTS',
    difficulty: 'EASY',
    syllables: ['me', 'sa'],
    phoneticTranscription: 'meza',
    imageUrl: '/images/objects/mesa.svg',
    hint: 'Onde você come',
  },
  {
    id: 'object-5',
    text: 'cama',
    category: 'OBJECTS',
    difficulty: 'EASY',
    syllables: ['ca', 'ma'],
    phoneticTranscription: 'kama',
    imageUrl: '/images/objects/cama.svg',
    hint: 'Onde você dorme',
  },

  // MEDIUM
  {
    id: 'object-6',
    text: 'cadeira',
    category: 'OBJECTS',
    difficulty: 'MEDIUM',
    syllables: ['ca', 'dei', 'ra'],
    phoneticTranscription: 'kadejra',
    imageUrl: '/images/objects/cadeira.svg',
    hint: 'Você senta nela',
  },
  {
    id: 'object-7',
    text: 'janela',
    category: 'OBJECTS',
    difficulty: 'MEDIUM',
    syllables: ['ja', 'ne', 'la'],
    phoneticTranscription: 'ʒanɛla',
    imageUrl: '/images/objects/janela.svg',
    hint: 'Você olha pela...',
  },
  {
    id: 'object-8',
    text: 'sapato',
    category: 'OBJECTS',
    difficulty: 'MEDIUM',
    syllables: ['sa', 'pa', 'to'],
    phoneticTranscription: 'sapatu',
    imageUrl: '/images/objects/sapato.svg',
    hint: 'Você calça nos pés',
  },
  {
    id: 'object-9',
    text: 'boneca',
    category: 'OBJECTS',
    difficulty: 'MEDIUM',
    syllables: ['bo', 'ne', 'ca'],
    phoneticTranscription: 'bonɛka',
    imageUrl: '/images/objects/boneca.svg',
    hint: 'Brinquedo que parece bebê',
  },
  {
    id: 'object-10',
    text: 'livro',
    category: 'OBJECTS',
    difficulty: 'MEDIUM',
    syllables: ['li', 'vro'],
    phoneticTranscription: 'livru',
    imageUrl: '/images/objects/livro.svg',
    hint: 'Tem páginas e histórias',
  },

  // HARD
  {
    id: 'object-11',
    text: 'computador',
    category: 'OBJECTS',
    difficulty: 'HARD',
    syllables: ['com', 'pu', 'ta', 'dor'],
    phoneticTranscription: 'kõputador',
    imageUrl: '/images/objects/computador.svg',
    hint: 'Máquina para trabalhar e jogar',
  },
  {
    id: 'object-12',
    text: 'televisão',
    category: 'OBJECTS',
    difficulty: 'HARD',
    syllables: ['te', 'le', 'vi', 'são'],
    phoneticTranscription: 'televizãw',
    imageUrl: '/images/objects/televisao.svg',
    hint: 'Você assiste desenhos nela',
  },
  {
    id: 'object-13',
    text: 'bicicleta',
    category: 'OBJECTS',
    difficulty: 'HARD',
    syllables: ['bi', 'ci', 'cle', 'ta'],
    phoneticTranscription: 'bisiклeta',
    imageUrl: '/images/objects/bicicleta.svg',
    hint: 'Tem duas rodas e você pedala',
  },
  {
    id: 'object-14',
    text: 'escova',
    category: 'OBJECTS',
    difficulty: 'MEDIUM',
    syllables: ['es', 'co', 'va'],
    phoneticTranscription: 'iskova',
    imageUrl: '/images/objects/escova.svg',
    hint: 'Usa para escovar os dentes',
  },
  {
    id: 'object-15',
    text: 'mochila',
    category: 'OBJECTS',
    difficulty: 'MEDIUM',
    syllables: ['mo', 'chi', 'la'],
    phoneticTranscription: 'moʃila',
    imageUrl: '/images/objects/mochila.svg',
    hint: 'Carrega suas coisas da escola',
  },
];

// Cores Mágicas - 🌈
const colorWords: Word[] = [
  // EASY
  {
    id: 'color-1',
    text: 'azul',
    category: 'COLORS',
    difficulty: 'EASY',
    syllables: ['a', 'zul'],
    phoneticTranscription: 'azuw',
    imageUrl: '/images/colors/azul.svg',
    hint: 'A cor do céu',
  },
  {
    id: 'color-2',
    text: 'rosa',
    category: 'COLORS',
    difficulty: 'EASY',
    syllables: ['ro', 'sa'],
    phoneticTranscription: 'ʁoza',
    imageUrl: '/images/colors/rosa.svg',
    hint: 'Cor de uma flor bonita',
  },
  {
    id: 'color-3',
    text: 'verde',
    category: 'COLORS',
    difficulty: 'EASY',
    syllables: ['ver', 'de'],
    phoneticTranscription: 'verdʒi',
    imageUrl: '/images/colors/verde.svg',
    hint: 'A cor da grama',
  },
  {
    id: 'color-4',
    text: 'roxo',
    category: 'COLORS',
    difficulty: 'EASY',
    syllables: ['ro', 'xo'],
    phoneticTranscription: 'ʁoʃu',
    imageUrl: '/images/colors/roxo.svg',
    hint: 'Mistura de azul com vermelho',
  },
  {
    id: 'color-5',
    text: 'preto',
    category: 'COLORS',
    difficulty: 'EASY',
    syllables: ['pre', 'to'],
    phoneticTranscription: 'pretu',
    imageUrl: '/images/colors/preto.svg',
    hint: 'A cor da noite',
  },

  // MEDIUM
  {
    id: 'color-6',
    text: 'amarelo',
    category: 'COLORS',
    difficulty: 'MEDIUM',
    syllables: ['a', 'ma', 're', 'lo'],
    phoneticTranscription: 'amаɾelu',
    imageUrl: '/images/colors/amarelo.svg',
    hint: 'A cor do sol',
  },
  {
    id: 'color-7',
    text: 'vermelho',
    category: 'COLORS',
    difficulty: 'MEDIUM',
    syllables: ['ver', 'me', 'lho'],
    phoneticTranscription: 'veɾmeʎu',
    imageUrl: '/images/colors/vermelho.svg',
    hint: 'A cor do morango',
  },
  {
    id: 'color-8',
    text: 'laranja',
    category: 'COLORS',
    difficulty: 'MEDIUM',
    syllables: ['la', 'ran', 'ja'],
    phoneticTranscription: 'laɾãʒa',
    imageUrl: '/images/colors/laranja.svg',
    hint: 'A cor da fruta laranja',
  },
  {
    id: 'color-9',
    text: 'marrom',
    category: 'COLORS',
    difficulty: 'MEDIUM',
    syllables: ['mar', 'rom'],
    phoneticTranscription: 'maʁõ',
    imageUrl: '/images/colors/marrom.svg',
    hint: 'A cor do chocolate',
  },
  {
    id: 'color-10',
    text: 'branco',
    category: 'COLORS',
    difficulty: 'EASY',
    syllables: ['bran', 'co'],
    phoneticTranscription: 'brãku',
    imageUrl: '/images/colors/branco.svg',
    hint: 'A cor da nuvem',
  },

  // HARD
  {
    id: 'color-11',
    text: 'dourado',
    category: 'COLORS',
    difficulty: 'MEDIUM',
    syllables: ['dou', 'ra', 'do'],
    phoneticTranscription: 'dowɾadu',
    imageUrl: '/images/colors/dourado.svg',
    hint: 'A cor do ouro',
  },
  {
    id: 'color-12',
    text: 'prateado',
    category: 'COLORS',
    difficulty: 'HARD',
    syllables: ['pra', 'te', 'a', 'do'],
    phoneticTranscription: 'pɾateadu',
    imageUrl: '/images/colors/prateado.svg',
    hint: 'A cor da prata',
  },
  {
    id: 'color-13',
    text: 'turquesa',
    category: 'COLORS',
    difficulty: 'HARD',
    syllables: ['tur', 'que', 'sa'],
    phoneticTranscription: 'tuɾkeza',
    imageUrl: '/images/colors/turquesa.svg',
    hint: 'Azul esverdeado como o mar',
  },
  {
    id: 'color-14',
    text: 'lilás',
    category: 'COLORS',
    difficulty: 'MEDIUM',
    syllables: ['li', 'lás'],
    phoneticTranscription: 'lilas',
    imageUrl: '/images/colors/lilas.svg',
    hint: 'Roxo clarinho',
  },
  {
    id: 'color-15',
    text: 'cinza',
    category: 'COLORS',
    difficulty: 'EASY',
    syllables: ['cin', 'za'],
    phoneticTranscription: 'sĩza',
    imageUrl: '/images/colors/cinza.svg',
    hint: 'Entre preto e branco',
  },
];

// Números Divertidos - 🔢
const numberWords: Word[] = [
  // EASY
  {
    id: 'number-1',
    text: 'um',
    category: 'NUMBERS',
    difficulty: 'EASY',
    syllables: ['um'],
    phoneticTranscription: 'ũ',
    imageUrl: '/images/numbers/um.svg',
    hint: 'O primeiro número',
  },
  {
    id: 'number-2',
    text: 'dois',
    category: 'NUMBERS',
    difficulty: 'EASY',
    syllables: ['dois'],
    phoneticTranscription: 'dojʃ',
    imageUrl: '/images/numbers/dois.svg',
    hint: 'Um mais um',
  },
  {
    id: 'number-3',
    text: 'três',
    category: 'NUMBERS',
    difficulty: 'EASY',
    syllables: ['três'],
    phoneticTranscription: 'tɾeʃ',
    imageUrl: '/images/numbers/tres.svg',
    hint: 'Dois mais um',
  },
  {
    id: 'number-4',
    text: 'quatro',
    category: 'NUMBERS',
    difficulty: 'EASY',
    syllables: ['qua', 'tro'],
    phoneticTranscription: 'kwatɾu',
    imageUrl: '/images/numbers/quatro.svg',
    hint: 'Três mais um',
  },
  {
    id: 'number-5',
    text: 'cinco',
    category: 'NUMBERS',
    difficulty: 'EASY',
    syllables: ['cin', 'co'],
    phoneticTranscription: 'sĩku',
    imageUrl: '/images/numbers/cinco.svg',
    hint: 'Os dedos de uma mão',
  },

  // MEDIUM
  {
    id: 'number-6',
    text: 'seis',
    category: 'NUMBERS',
    difficulty: 'MEDIUM',
    syllables: ['seis'],
    phoneticTranscription: 'sejʃ',
    imageUrl: '/images/numbers/seis.svg',
    hint: 'Cinco mais um',
  },
  {
    id: 'number-7',
    text: 'sete',
    category: 'NUMBERS',
    difficulty: 'MEDIUM',
    syllables: ['se', 'te'],
    phoneticTranscription: 'sɛtʃi',
    imageUrl: '/images/numbers/sete.svg',
    hint: 'Seis mais um',
  },
  {
    id: 'number-8',
    text: 'oito',
    category: 'NUMBERS',
    difficulty: 'MEDIUM',
    syllables: ['oi', 'to'],
    phoneticTranscription: 'ojtu',
    imageUrl: '/images/numbers/oito.svg',
    hint: 'Parece um boneco de neve',
  },
  {
    id: 'number-9',
    text: 'nove',
    category: 'NUMBERS',
    difficulty: 'MEDIUM',
    syllables: ['no', 've'],
    phoneticTranscription: 'nɔvi',
    imageUrl: '/images/numbers/nove.svg',
    hint: 'Oito mais um',
  },
  {
    id: 'number-10',
    text: 'dez',
    category: 'NUMBERS',
    difficulty: 'MEDIUM',
    syllables: ['dez'],
    phoneticTranscription: 'dɛʃ',
    imageUrl: '/images/numbers/dez.svg',
    hint: 'Os dedos das duas mãos',
  },

  // HARD
  {
    id: 'number-11',
    text: 'onze',
    category: 'NUMBERS',
    difficulty: 'HARD',
    syllables: ['on', 'ze'],
    phoneticTranscription: 'õzi',
    imageUrl: '/images/numbers/onze.svg',
    hint: 'Dez mais um',
  },
  {
    id: 'number-12',
    text: 'doze',
    category: 'NUMBERS',
    difficulty: 'HARD',
    syllables: ['do', 'ze'],
    phoneticTranscription: 'dozi',
    imageUrl: '/images/numbers/doze.svg',
    hint: 'Uma dúzia',
  },
  {
    id: 'number-13',
    text: 'quinze',
    category: 'NUMBERS',
    difficulty: 'HARD',
    syllables: ['quin', 'ze'],
    phoneticTranscription: 'kĩzi',
    imageUrl: '/images/numbers/quinze.svg',
    hint: 'Dez mais cinco',
  },
  {
    id: 'number-14',
    text: 'vinte',
    category: 'NUMBERS',
    difficulty: 'HARD',
    syllables: ['vin', 'te'],
    phoneticTranscription: 'vĩtʃi',
    imageUrl: '/images/numbers/vinte.svg',
    hint: 'Dois dezenas',
  },
  {
    id: 'number-15',
    text: 'cem',
    category: 'NUMBERS',
    difficulty: 'HARD',
    syllables: ['cem'],
    phoneticTranscription: 'sẽ',
    imageUrl: '/images/numbers/cem.svg',
    hint: 'Um número bem grande!',
  },
];

// Hora da Comida - 🍎
const foodWords: Word[] = [
  // EASY
  {
    id: 'food-1',
    text: 'pão',
    category: 'FOODS',
    difficulty: 'EASY',
    syllables: ['pão'],
    phoneticTranscription: 'pãw',
    imageUrl: '/images/foods/pao.svg',
    hint: 'Você come no café da manhã',
  },
  {
    id: 'food-2',
    text: 'ovo',
    category: 'FOODS',
    difficulty: 'EASY',
    syllables: ['o', 'vo'],
    phoneticTranscription: 'ovu',
    imageUrl: '/images/foods/ovo.svg',
    hint: 'A galinha bota',
  },
  {
    id: 'food-3',
    text: 'suco',
    category: 'FOODS',
    difficulty: 'EASY',
    syllables: ['su', 'co'],
    phoneticTranscription: 'suku',
    imageUrl: '/images/foods/suco.svg',
    hint: 'Bebida de fruta',
  },
  {
    id: 'food-4',
    text: 'maçã',
    category: 'FOODS',
    difficulty: 'EASY',
    syllables: ['ma', 'çã'],
    phoneticTranscription: 'masã',
    imageUrl: '/images/foods/maca.svg',
    hint: 'Fruta vermelha ou verde',
  },
  {
    id: 'food-5',
    text: 'mel',
    category: 'FOODS',
    difficulty: 'EASY',
    syllables: ['mel'],
    phoneticTranscription: 'mɛw',
    imageUrl: '/images/foods/mel.svg',
    hint: 'Doce que a abelha faz',
  },

  // MEDIUM
  {
    id: 'food-6',
    text: 'banana',
    category: 'FOODS',
    difficulty: 'MEDIUM',
    syllables: ['ba', 'na', 'na'],
    phoneticTranscription: 'banana',
    imageUrl: '/images/foods/banana.svg',
    hint: 'Fruta amarela e comprida',
  },
  {
    id: 'food-7',
    text: 'arroz',
    category: 'FOODS',
    difficulty: 'MEDIUM',
    syllables: ['ar', 'roz'],
    phoneticTranscription: 'aʁɔʃ',
    imageUrl: '/images/foods/arroz.svg',
    hint: 'Branco e combina com feijão',
  },
  {
    id: 'food-8',
    text: 'feijão',
    category: 'FOODS',
    difficulty: 'MEDIUM',
    syllables: ['fei', 'jão'],
    phoneticTranscription: 'fejʒãw',
    imageUrl: '/images/foods/feijao.svg',
    hint: 'Preto, combina com arroz',
  },
  {
    id: 'food-9',
    text: 'tomate',
    category: 'FOODS',
    difficulty: 'MEDIUM',
    syllables: ['to', 'ma', 'te'],
    phoneticTranscription: 'tomatʃi',
    imageUrl: '/images/foods/tomate.svg',
    hint: 'Vermelho, vira molho',
  },
  {
    id: 'food-10',
    text: 'queijo',
    category: 'FOODS',
    difficulty: 'MEDIUM',
    syllables: ['quei', 'jo'],
    phoneticTranscription: 'kejʒu',
    imageUrl: '/images/foods/queijo.svg',
    hint: 'Feito de leite, amarelo',
  },

  // HARD
  {
    id: 'food-11',
    text: 'chocolate',
    category: 'FOODS',
    difficulty: 'HARD',
    syllables: ['cho', 'co', 'la', 'te'],
    phoneticTranscription: 'ʃokolatʃi',
    imageUrl: '/images/foods/chocolate.svg',
    hint: 'Doce marrom delicioso',
  },
  {
    id: 'food-12',
    text: 'sorvete',
    category: 'FOODS',
    difficulty: 'HARD',
    syllables: ['sor', 've', 'te'],
    phoneticTranscription: 'soɾvetʃi',
    imageUrl: '/images/foods/sorvete.svg',
    hint: 'Gelado e gostoso',
  },
  {
    id: 'food-13',
    text: 'espaguete',
    category: 'FOODS',
    difficulty: 'HARD',
    syllables: ['es', 'pa', 'gue', 'te'],
    phoneticTranscription: 'ispagetʃi',
    imageUrl: '/images/foods/espaguete.svg',
    hint: 'Massa comprida como fios',
  },
  {
    id: 'food-14',
    text: 'morango',
    category: 'FOODS',
    difficulty: 'MEDIUM',
    syllables: ['mo', 'ran', 'go'],
    phoneticTranscription: 'moɾãgu',
    imageUrl: '/images/foods/morango.svg',
    hint: 'Fruta vermelha com pontinhos',
  },
  {
    id: 'food-15',
    text: 'cenoura',
    category: 'FOODS',
    difficulty: 'MEDIUM',
    syllables: ['ce', 'nou', 'ra'],
    phoneticTranscription: 'senowɾa',
    imageUrl: '/images/foods/cenoura.svg',
    hint: 'Laranja, coelhos adoram',
  },
];

// Exporta todas as palavras organizadas por categoria
export const wordDatabase = {
  ANIMALS: animalWords,
  OBJECTS: objectWords,
  COLORS: colorWords,
  NUMBERS: numberWords,
  FOODS: foodWords,
  ACTIONS: [], // Será implementado depois
};

// Função para obter palavras por categoria e dificuldade
export function getWordsByCategory(
  category: GameCategory,
  difficulty?: DifficultyLevel
): Word[] {
  const words = wordDatabase[category] || [];

  if (difficulty) {
    return words.filter((word) => word.difficulty === difficulty);
  }

  return words;
}

// Função para obter uma palavra aleatória
export function getRandomWord(
  category: GameCategory,
  difficulty?: DifficultyLevel
): Word | null {
  const words = getWordsByCategory(category, difficulty);

  if (words.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Função para obter palavra por ID
export function getWordById(wordId: string): Word | null {
  const allWords = Object.values(wordDatabase).flat();
  return allWords.find((word) => word.id === wordId) || null;
}

// Estatísticas do banco de dados
export function getDatabaseStats() {
  return {
    totalWords: Object.values(wordDatabase).flat().length,
    byCategory: Object.entries(wordDatabase).map(([category, words]) => ({
      category,
      count: words.length,
      byDifficulty: {
        EASY: words.filter((w) => w.difficulty === 'EASY').length,
        MEDIUM: words.filter((w) => w.difficulty === 'MEDIUM').length,
        HARD: words.filter((w) => w.difficulty === 'HARD').length,
      },
    })),
  };
}

export default wordDatabase;
