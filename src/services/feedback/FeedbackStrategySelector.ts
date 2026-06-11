/**
 * Seletor de Estratégia de Feedback
 * Escolhe o melhor tipo de feedback baseado no resultado e histórico
 *
 * Estratégia pedagógica (baseada em metodologia fonoaudiológica):
 * - Acerto: celebração personalizada do avatar
 * - Quase: pergunta de diferenciação ("você disse X ou Y?")
 * - Erro 1ª tentativa: divisão silábica
 * - Erro 2ª tentativa: ritmo/música
 * - Erro 3ª tentativa: pronúncia lenta + avançar (sem frustração)
 */

import { AttemptResult, FeedbackType, GameWord } from '@/types';
import {
  getRandomCelebration,
  getRandomEncouragement,
  getRandomHint,
} from '@/data/avatars';
import TTSService from '@/services/audio/TTSService';

export interface FeedbackPlan {
  type: FeedbackType;
  message: string;
  spokenMessage: string;
  shouldAdvance: boolean;
  showSyllables: boolean;
  starsAwarded: number;
  xpAwarded: number;
}

class FeedbackStrategySelector {
  /**
   * Seleciona a estratégia de feedback ideal
   */
  selectStrategy(
    result: AttemptResult,
    word: GameWord,
    attemptNumber: number,
    avatarId: string,
    recognizedText?: string,
  ): FeedbackPlan {
    switch (result) {
      case AttemptResult.PERFECT:
        return {
          type: FeedbackType.POSITIVE_REINFORCEMENT,
          message: getRandomCelebration(avatarId),
          spokenMessage: `Isso mesmo! Você disse ${word.word} direitinho! ${getRandomCelebration(avatarId)}`,
          shouldAdvance: true,
          showSyllables: false,
          starsAwarded: 3,
          xpAwarded: 100,
        };

      case AttemptResult.GOOD:
        return {
          type: FeedbackType.POSITIVE_REINFORCEMENT,
          message: getRandomCelebration(avatarId),
          spokenMessage: `Muito bem! Você disse ${word.word}!`,
          shouldAdvance: true,
          showSyllables: false,
          starsAwarded: 2,
          xpAwarded: 75,
        };

      case AttemptResult.CLOSE: {
        // Pergunta de diferenciação fonêmica
        const heardWord = recognizedText || '';
        return {
          type: FeedbackType.SIMILAR_WORD_QUESTION,
          message: `Hmm, ouvi "${heardWord}". Vamos tentar ${word.word}?`,
          spokenMessage: `Hmm, ouvi ${heardWord}. Você quis dizer ${heardWord}, ou ${word.word}? Vamos tentar de novo: ${word.word}!`,
          shouldAdvance: false,
          showSyllables: false,
          starsAwarded: 0,
          xpAwarded: 25,
        };
      }

      default: {
        // Erro ou ininteligível - escalonamento pedagógico
        if (attemptNumber <= 1) {
          // 1ª tentativa: divisão silábica
          return {
            type: FeedbackType.SYLLABLE_BREAKDOWN,
            message: `Quase lá! Vamos juntos: ${word.syllables.join(' - ')}`,
            spokenMessage: `Quase lá! Vamos tentar juntos, devagarinho.`,
            shouldAdvance: false,
            showSyllables: true,
            starsAwarded: 0,
            xpAwarded: 10,
          };
        } else if (attemptNumber === 2) {
          // 2ª tentativa: ritmo/música
          const rhythmText = word.syllables.join('... ');
          return {
            type: FeedbackType.RHYTHM_SONG,
            message: `Vamos cantar? ♪ ${rhythmText}... ${word.word}! ♪`,
            spokenMessage: `Vamos cantar? ${rhythmText}... ${word.word}!`,
            shouldAdvance: false,
            showSyllables: true,
            starsAwarded: 0,
            xpAwarded: 10,
          };
        } else {
          // 3ª tentativa: encorajamento + avançar (evita frustração)
          return {
            type: FeedbackType.ENCOURAGEMENT,
            message: getRandomEncouragement(avatarId),
            spokenMessage: `${getRandomEncouragement(avatarId)} Vamos para a próxima palavra e voltamos nessa depois!`,
            shouldAdvance: true,
            showSyllables: false,
            starsAwarded: 1, // Estrela de esforço!
            xpAwarded: 25,
          };
        }
      }
    }
  }

  /**
   * Executa o feedback com voz (TTS)
   */
  async deliverSpokenFeedback(plan: FeedbackPlan, word: GameWord): Promise<void> {
    await TTSService.speak(plan.spokenMessage);

    // Se for divisão silábica, fala as sílabas devagar após a mensagem
    if (plan.type === FeedbackType.SYLLABLE_BREAKDOWN) {
      setTimeout(() => {
        TTSService.speakSyllables(word.syllables, word.word);
      }, 2500);
    }
  }

  /**
   * Apresenta uma nova palavra com voz
   */
  async presentWord(word: GameWord): Promise<void> {
    await TTSService.presentWord(word.word);
  }

  /**
   * Dica do avatar com voz
   */
  async speakHint(avatarId: string, word: GameWord): Promise<void> {
    const hint = getRandomHint(avatarId);
    const contextHint = word.hints?.find(h => h.type === 'context')?.content || '';
    await TTSService.speak(`${hint} ${contextHint}`);
  }
}

export default new FeedbackStrategySelector();
