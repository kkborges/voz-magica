/**
 * Sistema de Avatares com Personalidades
 * Baseado na versão web v1.1.0
 */

import { Avatar } from '@/types';

export interface AvatarPersonality {
  id: string;
  name: string;
  emoji: string;
  personality: string;
  traits: string[];
  encouragements: string[];
  celebrations: string[];
  hints: string[];
  color: string;
}

/**
 * 8 Avatares Personalizados
 */
export const avatarPersonalities: AvatarPersonality[] = [
  {
    id: 'raposa',
    name: 'Raposa Rosada',
    emoji: '🦊',
    personality: 'Animada e encorajadora',
    traits: ['energética', 'positiva', 'motivadora'],
    encouragements: [
      'Você consegue! Vamos lá!',
      'Mais uma vez, você está quase lá!',
      'Que legal! Você está aprendendo!',
      'Eba! Continue assim!',
    ],
    celebrations: [
      'Uau! Você é incrível! 🌟',
      'Perfeito! Eu sabia que você conseguia!',
      'Arrasou! Que orgulho de você!',
      'Demais! Você é um campeão!',
    ],
    hints: [
      'Vamos tentar juntos? Eu te ajudo!',
      'Que tal dividir em partes menores?',
      'Vou te dar uma dica especial...',
    ],
    color: '#FF6B9D',
  },
  {
    id: 'gatinha',
    name: 'Gatinha Mágica',
    emoji: '🐱',
    personality: 'Felina e curiosa',
    traits: ['curiosa', 'carinhosa', 'observadora'],
    encouragements: [
      'Miau! Você está indo muito bem!',
      'Que interessante! Tente de novo!',
      'Estou curiosa para ver você acertar!',
    ],
    celebrations: [
      'Miau! Que maravilha! ✨',
      'Ronron... Perfeito!',
      'Que legal! Você me surpreendeu!',
    ],
    hints: [
      'Vamos observar melhor...',
      'Minha curiosidade diz que você pode tentar assim...',
    ],
    color: '#A29BFE',
  },
  {
    id: 'ursinho',
    name: 'Ursinho Carinhoso',
    emoji: '🐻',
    personality: 'Afetuoso e carinhoso',
    traits: ['amoroso', 'paciente', 'gentil'],
    encouragements: [
      'Querido, você está indo ótimo!',
      'Com carinho e paciência, você consegue!',
      'Eu acredito em você!',
    ],
    celebrations: [
      'Um grande abraço de urso! Você conseguiu! 🤗',
      'Que orgulho! Você é especial!',
      'Meu coração está feliz por você!',
    ],
    hints: [
      'Vamos com calma, sem pressa...',
      'Respire fundo e tente de novo, querido...',
    ],
    color: '#6BCF7F',
  },
  {
    id: 'pandinha',
    name: 'Pandinha Divertida',
    emoji: '🐼',
    personality: 'Alegre e engraçada',
    traits: ['divertida', 'brincalhona', 'alegre'],
    encouragements: [
      'Haha! Isso é divertido! Tente mais!',
      'Vamos fazer isso brincando!',
      'Que tal rir e tentar de novo?',
    ],
    celebrations: [
      'Hahaha! Você é demais! 🎉',
      'Bambu e felicidade! Conseguiu!',
      'Que risada boa! Você acertou!',
    ],
    hints: [
      'Vamos brincar com as palavras...',
      'Que tal fazer uma careta e tentar?',
    ],
    color: '#4ECDC4',
  },
  {
    id: 'leao',
    name: 'Leão Corajoso',
    emoji: '🦁',
    personality: 'Valente e confiante',
    traits: ['corajoso', 'líder', 'confiante'],
    encouragements: [
      'Você é forte! Pode fazer isso!',
      'Seja corajoso como um leão!',
      'Com coragem, tudo é possível!',
    ],
    celebrations: [
      'RUGIDO DE VITÓRIA! Você venceu! 🦁',
      'Corajoso e vitorioso!',
      'O rei da floresta está orgulhoso!',
    ],
    hints: [
      'Um guerreiro nunca desiste...',
      'Levante a cabeça e tente com confiança!',
    ],
    color: '#FFA94D',
  },
  {
    id: 'sapinha',
    name: 'Sapinha Saltitante',
    emoji: '🐸',
    personality: 'Ativa e brincalhona',
    traits: ['ativa', 'rápida', 'enérgica'],
    encouragements: [
      'Pula, pula! Você consegue!',
      'Vamos saltar para o sucesso!',
      'Mais um pulinho e você chega lá!',
    ],
    celebrations: [
      'Coaxando de felicidade! Você conseguiu! 🐸',
      'Pulou direitinho até o sucesso!',
      'Que salto incrível!',
    ],
    hints: [
      'Vamos dar um pulinho nas sílabas...',
      'Salta de uma letra para outra!',
    ],
    color: '#95E1D3',
  },
  {
    id: 'unicornio',
    name: 'Unicórnio Mágico',
    emoji: '🦄',
    personality: 'Mágica e especial',
    traits: ['mágica', 'encantadora', 'sonhadora'],
    encouragements: [
      'A magia está em você!',
      'Acredite na sua magia!',
      'Com um toque mágico, você consegue!',
    ],
    celebrations: [
      'Pó de estrelas! Você é mágico! ✨🦄',
      'Que encantamento maravilhoso!',
      'A magia do sucesso brilha em você!',
    ],
    hints: [
      'Vou usar minha magia para te ajudar...',
      'Feche os olhos e imagine a palavra...',
    ],
    color: '#E056FD',
  },
  {
    id: 'dragaozinho',
    name: 'Dragãozinho Amigável',
    emoji: '🐲',
    personality: 'Aventureiro e épico',
    traits: ['aventureiro', 'corajoso', 'leal'],
    encouragements: [
      'Aventureiros nunca desistem!',
      'Vamos nessa missão juntos!',
      'Você é um herói em treinamento!',
    ],
    celebrations: [
      'Missão cumprida, herói! 🐲⚔️',
      'Você conquistou o tesouro!',
      'Dragão vitorioso!',
    ],
    hints: [
      'Todo herói precisa de estratégia...',
      'Vamos voar por cima desse desafio!',
    ],
    color: '#F97E72',
  },
];

/**
 * Obter avatar por ID (aceita também o emoji, para perfis antigos)
 */
export function getAvatarById(id: string): AvatarPersonality | undefined {
  return avatarPersonalities.find(avatar => avatar.id === id || avatar.emoji === id);
}

/**
 * Obter emoji do avatar (com fallback para o valor cru)
 */
export function getAvatarEmoji(avatarId: string): string {
  return getAvatarById(avatarId)?.emoji || avatarId;
}

/**
 * Obter mensagem aleatória de encorajamento
 */
export function getRandomEncouragement(avatarId: string): string {
  const avatar = getAvatarById(avatarId);
  if (!avatar) return 'Você consegue!';

  return avatar.encouragements[Math.floor(Math.random() * avatar.encouragements.length)];
}

/**
 * Obter mensagem aleatória de celebração
 */
export function getRandomCelebration(avatarId: string): string {
  const avatar = getAvatarById(avatarId);
  if (!avatar) return 'Parabéns!';

  return avatar.celebrations[Math.floor(Math.random() * avatar.celebrations.length)];
}

/**
 * Obter dica aleatória
 */
export function getRandomHint(avatarId: string): string {
  const avatar = getAvatarById(avatarId);
  if (!avatar) return 'Vamos tentar de novo!';

  return avatar.hints[Math.floor(Math.random() * avatar.hints.length)];
}
