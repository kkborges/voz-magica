/**
 * Constantes da aplicação
 */

export * from './theme';

/**
 * Configurações padrão
 */
export const DEFAULT_CONFIG = {
  microphoneSensitivity: 70,
  speechSpeed: 1.0,
  dailyGoal: 15, // minutos
  maxRecordingDuration: 5, // segundos
  minimumConfidence: 60, // porcentagem
};

/**
 * Limites e validações
 */
export const LIMITS = {
  maxProfiles: 5,
  maxCustomLists: 20,
  minChildAge: 3,
  maxChildAge: 12,
  maxWordLength: 30,
  maxAttempts: 3, // tentativas antes de oferecer ajuda
};

/**
 * URLs da API (placeholder)
 */
export const API_URLS = {
  base: 'https://api.vozmagica.com',
  speech: '/api/speech',
  analytics: '/api/analytics',
  content: '/api/content',
};

/**
 * Mensagens de feedback
 */
export const FEEDBACK_MESSAGES = {
  perfect: [
    'Perfeito! 🌟',
    'Você arrasou!',
    'Isso mesmo! Muito bem!',
    'Incrível! Continue assim!',
    'Parabéns! Você conseguiu!',
  ],
  good: [
    'Muito bom! Quase perfeito!',
    'Ótimo trabalho!',
    'Você está indo muito bem!',
    'Muito bom! Continue tentando!',
  ],
  close: [
    'Quase lá! Vamos tentar de novo?',
    'Você está perto! Mais uma vez!',
    'Boa tentativa! Vamos tentar juntos?',
  ],
  encouragement: [
    'Não desista! Você consegue!',
    'Vamos tentar de um jeito diferente?',
    'Que tal tentarmos juntos?',
    'Você está aprendendo! Continue!',
  ],
};

/**
 * Níveis de experiência
 */
export const EXPERIENCE_LEVELS = [
  { level: 1, xpRequired: 0 },
  { level: 2, xpRequired: 100 },
  { level: 3, xpRequired: 250 },
  { level: 4, xpRequired: 500 },
  { level: 5, xpRequired: 1000 },
  { level: 6, xpRequired: 2000 },
  { level: 7, xpRequired: 3500 },
  { level: 8, xpRequired: 5500 },
  { level: 9, xpRequired: 8000 },
  { level: 10, xpRequired: 12000 },
];

/**
 * Requisitos de estrelas para níveis
 */
export const STAR_MILESTONES = [
  { stars: 10, reward: 'Novo avatar' },
  { stars: 50, reward: 'Tema especial' },
  { stars: 100, reward: 'Adesivos exclusivos' },
  { stars: 250, reward: 'Animação especial' },
  { stars: 500, reward: 'Crachá lendário' },
];
