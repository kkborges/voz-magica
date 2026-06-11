/**
 * Serviço de reconhecimento de voz
 * Responsável por capturar e processar a fala da criança
 */

import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
  SpeechEndEvent,
} from '@react-native-voice/voice';
import { AttemptResult, PhonemeAnalysis } from '@/types';

export interface VoiceRecognitionConfig {
  language: string;
  sensitivity: number; // 0-100
  maxDuration: number; // segundos
  continuousRecognition: boolean;
}

export interface RecognitionResult {
  recognizedText: string;
  confidence: number;
  alternatives?: string[];
  rawData?: any;
}

class VoiceRecognitionService {
  private isListening: boolean = false;
  private config: VoiceRecognitionConfig;
  private onResultCallback?: (result: RecognitionResult) => void;
  private onErrorCallback?: (error: Error) => void;

  constructor() {
    this.config = {
      language: 'pt-BR',
      sensitivity: 70,
      maxDuration: 5,
      continuousRecognition: false,
    };

    this.initializeListeners();
  }

  /**
   * Inicializa os listeners do Voice
   */
  private initializeListeners(): void {
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechError = this.onSpeechError;
  }

  /**
   * Callback quando a fala inicia
   */
  private onSpeechStart = (): void => {
    console.log('Speech started');
  };

  /**
   * Callback quando a fala termina
   */
  private onSpeechEnd = (e: SpeechEndEvent): void => {
    console.log('Speech ended', e);
    this.isListening = false;
  };

  /**
   * Callback quando há resultados
   */
  private onSpeechResults = (e: SpeechResultsEvent): void => {
    if (e.value && e.value.length > 0) {
      const result: RecognitionResult = {
        recognizedText: e.value[0],
        confidence: 85, // TODO: Pegar confiança real da API
        alternatives: e.value.slice(1),
      };

      if (this.onResultCallback) {
        this.onResultCallback(result);
      }
    }
  };

  /**
   * Callback quando há erro
   */
  private onSpeechError = (e: SpeechErrorEvent): void => {
    console.error('Speech error', e);
    this.isListening = false;

    if (this.onErrorCallback) {
      this.onErrorCallback(new Error(e.error?.message || 'Unknown speech error'));
    }
  };

  /**
   * Atualiza a configuração
   */
  updateConfig(config: Partial<VoiceRecognitionConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Inicia o reconhecimento de voz
   */
  async startListening(
    onResult: (result: RecognitionResult) => void,
    onError?: (error: Error) => void,
  ): Promise<void> {
    if (this.isListening) {
      throw new Error('Already listening');
    }

    this.onResultCallback = onResult;
    this.onErrorCallback = onError;

    try {
      await Voice.start(this.config.language, {
        RECOGNIZER_ENGINE: 'GOOGLE', // Android
      });
      this.isListening = true;
    } catch (error) {
      this.isListening = false;
      throw error;
    }
  }

  /**
   * Para o reconhecimento de voz
   */
  async stopListening(): Promise<void> {
    if (!this.isListening) {
      return;
    }

    try {
      await Voice.stop();
      this.isListening = false;
    } catch (error) {
      console.error('Error stopping voice recognition', error);
      throw error;
    }
  }

  /**
   * Cancela o reconhecimento de voz
   */
  async cancelListening(): Promise<void> {
    if (!this.isListening) {
      return;
    }

    try {
      await Voice.cancel();
      this.isListening = false;
    } catch (error) {
      console.error('Error canceling voice recognition', error);
      throw error;
    }
  }

  /**
   * Verifica se o reconhecimento está disponível
   */
  async isAvailable(): Promise<boolean> {
    try {
      return !!(await Voice.isAvailable());
    } catch {
      return false;
    }
  }

  /**
   * Limpa os listeners
   */
  destroy(): void {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  /**
   * Analisa a similaridade entre a palavra alvo e a reconhecida
   */
  analyzeSimilarity(target: string, recognized: string): {
    result: AttemptResult;
    confidence: number;
    suggestions?: string[];
  } {
    const targetLower = this.normalizeText(target);
    const recognizedLower = this.normalizeText(recognized);

    // Exato
    if (targetLower === recognizedLower) {
      return { result: AttemptResult.PERFECT, confidence: 100 };
    }

    // Calcula distância de Levenshtein
    const distance = this.levenshteinDistance(targetLower, recognizedLower);
    const maxLength = Math.max(targetLower.length, recognizedLower.length);
    const similarity = ((maxLength - distance) / maxLength) * 100;

    // Determina o resultado baseado na similaridade
    if (similarity >= 80) {
      return { result: AttemptResult.GOOD, confidence: similarity };
    } else if (similarity >= 50) {
      return {
        result: AttemptResult.CLOSE,
        confidence: similarity,
        suggestions: this.getSimilarWordSuggestions(target, recognized),
      };
    } else {
      return { result: AttemptResult.INCORRECT, confidence: similarity };
    }
  }

  /**
   * Normaliza texto para comparação
   */
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .trim();
  }

  /**
   * Calcula distância de Levenshtein
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substituição
            matrix[i][j - 1] + 1, // inserção
            matrix[i - 1][j] + 1, // deleção
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Gera sugestões de palavras similares
   */
  private getSimilarWordSuggestions(target: string, _recognized: string): string[] {
    const suggestions: string[] = [];

    // TODO: Implementar lógica mais sofisticada
    // Por enquanto, apenas retorna a palavra alvo
    suggestions.push(target);

    return suggestions;
  }

  /**
   * Analisa fonemas (placeholder para futura implementação com IA)
   */
  async analyzePhonemes(
    target: string,
    recognized: string,
    _audioData?: Blob,
  ): Promise<PhonemeAnalysis[]> {
    // TODO: Integrar com API de análise fonética
    // Por enquanto, retorna análise básica baseada em texto

    const analysis: PhonemeAnalysis[] = [];
    const targetChars = target.split('');
    const recognizedChars = recognized.split('');

    const maxLength = Math.max(targetChars.length, recognizedChars.length);

    for (let i = 0; i < maxLength; i++) {
      const expected = targetChars[i] || '';
      const actual = recognizedChars[i] || '';

      analysis.push({
        phoneme: actual,
        expected: expected,
        accuracy: expected === actual ? 100 : 0,
        position: i,
        suggestion: expected !== actual ? expected : undefined,
      });
    }

    return analysis;
  }
}

export default new VoiceRecognitionService();
