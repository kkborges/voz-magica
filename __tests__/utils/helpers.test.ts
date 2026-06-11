/**
 * Testes das funções auxiliares
 */

import {
  calculateLevel,
  calculateLevelProgress,
  calculateAccuracyRate,
  formatPlayTime,
  generateId,
  shuffleArray,
} from '@/utils/helpers';

describe('calculateLevel', () => {
  it('nível 1 com 0 XP', () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it('nível 2 com 100 XP', () => {
    expect(calculateLevel(100)).toBe(2);
  });

  it('nível 5 com 1000 XP', () => {
    expect(calculateLevel(1000)).toBe(5);
  });

  it('nível máximo (10) com XP muito alto', () => {
    expect(calculateLevel(999999)).toBe(10);
  });
});

describe('calculateLevelProgress', () => {
  it('calcula progresso parcial corretamente', () => {
    const progress = calculateLevelProgress(50); // metade do caminho para nível 2
    expect(progress.currentLevel).toBe(1);
    expect(progress.nextLevel).toBe(2);
    expect(progress.progress).toBe(50);
  });
});

describe('calculateAccuracyRate', () => {
  it('retorna 0 quando não houve tentativas', () => {
    expect(calculateAccuracyRate(0, 0)).toBe(0);
  });

  it('calcula porcentagem corretamente', () => {
    expect(calculateAccuracyRate(7, 10)).toBe(70);
  });

  it('retorna 100 para acerto total', () => {
    expect(calculateAccuracyRate(5, 5)).toBe(100);
  });
});

describe('formatPlayTime', () => {
  it('formata minutos', () => {
    expect(formatPlayTime(45)).toBe('45 min');
  });

  it('formata horas exatas', () => {
    expect(formatPlayTime(120)).toBe('2h');
  });

  it('formata horas com minutos', () => {
    expect(formatPlayTime(95)).toBe('1h 35min');
  });
});

describe('generateId', () => {
  it('gera IDs únicos com prefixo', () => {
    const id1 = generateId('test');
    const id2 = generateId('test');
    expect(id1).toMatch(/^test_/);
    expect(id1).not.toBe(id2);
  });
});

describe('shuffleArray', () => {
  it('mantém os mesmos elementos', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);
    expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it('não modifica o array original', () => {
    const original = [1, 2, 3];
    shuffleArray(original);
    expect(original).toEqual([1, 2, 3]);
  });
});
