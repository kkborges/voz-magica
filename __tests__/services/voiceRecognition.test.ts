/**
 * Testes do VoiceRecognitionService
 * Foco: análise de similaridade (núcleo do reconhecimento)
 */

import VoiceRecognitionService from '@/services/voice/VoiceRecognitionService';
import { AttemptResult } from '@/types';

describe('VoiceRecognitionService.analyzeSimilarity', () => {
  it('retorna PERFECT para correspondência exata', () => {
    const result = VoiceRecognitionService.analyzeSimilarity('GATO', 'gato');
    expect(result.result).toBe(AttemptResult.PERFECT);
    expect(result.confidence).toBe(100);
  });

  it('ignora acentos na comparação', () => {
    const result = VoiceRecognitionService.analyzeSimilarity('CÃO', 'cao');
    expect(result.result).toBe(AttemptResult.PERFECT);
  });

  it('ignora espaços extras', () => {
    const result = VoiceRecognitionService.analyzeSimilarity('BOLA', '  bola  ');
    expect(result.result).toBe(AttemptResult.PERFECT);
  });

  it('retorna CLOSE para palavra parecida (tato vs gato)', () => {
    const result = VoiceRecognitionService.analyzeSimilarity('GATO', 'tato');
    // 1 letra diferente em 4 = 75% de similaridade
    expect(result.result).toBe(AttemptResult.CLOSE);
    expect(result.confidence).toBeGreaterThanOrEqual(50);
    expect(result.confidence).toBeLessThan(80);
  });

  it('retorna GOOD para alta similaridade em palavra longa', () => {
    // BORBOLETA (9 letras) vs BORBOLETO: 1 diff = ~89%
    const result = VoiceRecognitionService.analyzeSimilarity('BORBOLETA', 'borboleto');
    expect(result.result).toBe(AttemptResult.GOOD);
  });

  it('retorna INCORRECT para palavra totalmente diferente', () => {
    const result = VoiceRecognitionService.analyzeSimilarity('GATO', 'elefante');
    expect(result.result).toBe(AttemptResult.INCORRECT);
  });

  it('fornece sugestões quando o resultado é CLOSE', () => {
    const result = VoiceRecognitionService.analyzeSimilarity('GATO', 'pato');
    expect(result.result).toBe(AttemptResult.CLOSE);
    expect(result.suggestions).toContain('GATO');
  });
});
