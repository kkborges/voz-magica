/**
 * Testes do FeedbackStrategySelector
 * Valida o escalonamento pedagógico do feedback
 */

import FeedbackStrategySelector from '@/services/feedback/FeedbackStrategySelector';
import { AttemptResult, FeedbackType, GameWord, GameCategory, Difficulty } from '@/types';

const testWord: GameWord = {
  id: 'test_gato',
  word: 'GATO',
  category: GameCategory.ANIMALS,
  difficulty: Difficulty.EASY,
  syllables: ['GA', 'TO'],
  phonemes: ['g', 'a', 't', 'o'],
  imageUrl: '',
  audioUrl: '',
};

const AVATAR = 'raposa';

describe('FeedbackStrategySelector.selectStrategy', () => {
  it('acerto perfeito: celebra, avança e dá 3 estrelas', () => {
    const plan = FeedbackStrategySelector.selectStrategy(
      AttemptResult.PERFECT, testWord, 1, AVATAR,
    );
    expect(plan.type).toBe(FeedbackType.POSITIVE_REINFORCEMENT);
    expect(plan.shouldAdvance).toBe(true);
    expect(plan.starsAwarded).toBe(3);
    expect(plan.xpAwarded).toBe(100);
  });

  it('acerto bom: avança com 2 estrelas', () => {
    const plan = FeedbackStrategySelector.selectStrategy(
      AttemptResult.GOOD, testWord, 1, AVATAR,
    );
    expect(plan.shouldAdvance).toBe(true);
    expect(plan.starsAwarded).toBe(2);
  });

  it('pronúncia parecida: pergunta de diferenciação, não avança', () => {
    const plan = FeedbackStrategySelector.selectStrategy(
      AttemptResult.CLOSE, testWord, 1, AVATAR, 'tato',
    );
    expect(plan.type).toBe(FeedbackType.SIMILAR_WORD_QUESTION);
    expect(plan.shouldAdvance).toBe(false);
    expect(plan.spokenMessage).toContain('tato');
    expect(plan.spokenMessage).toContain('GATO');
  });

  it('1º erro: divisão silábica com sílabas visíveis', () => {
    const plan = FeedbackStrategySelector.selectStrategy(
      AttemptResult.INCORRECT, testWord, 1, AVATAR,
    );
    expect(plan.type).toBe(FeedbackType.SYLLABLE_BREAKDOWN);
    expect(plan.showSyllables).toBe(true);
    expect(plan.shouldAdvance).toBe(false);
    expect(plan.message).toContain('GA - TO');
  });

  it('2º erro: técnica de ritmo/música', () => {
    const plan = FeedbackStrategySelector.selectStrategy(
      AttemptResult.INCORRECT, testWord, 2, AVATAR,
    );
    expect(plan.type).toBe(FeedbackType.RHYTHM_SONG);
    expect(plan.shouldAdvance).toBe(false);
  });

  it('3º erro: encoraja, dá estrela de esforço e avança (sem frustração)', () => {
    const plan = FeedbackStrategySelector.selectStrategy(
      AttemptResult.INCORRECT, testWord, 3, AVATAR,
    );
    expect(plan.type).toBe(FeedbackType.ENCOURAGEMENT);
    expect(plan.shouldAdvance).toBe(true);
    expect(plan.starsAwarded).toBe(1);
  });
});
