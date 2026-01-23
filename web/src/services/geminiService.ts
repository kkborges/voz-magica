/**
 * Serviço de Integração com Google Gemini AI
 * Responsável por análise inteligente de pronúncia e feedback personalizado
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { FeedbackResponse } from '@/types';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private isInitialized = false;

  /**
   * Inicializa o serviço Gemini com a chave de API
   */
  async initialize(apiKey?: string) {
    try {
      const key = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

      if (!key) {
        console.warn('Gemini API key não encontrada. Usando modo fallback.');
        return false;
      }

      this.genAI = new GoogleGenerativeAI(key);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      this.isInitialized = true;

      console.log('✅ Gemini AI inicializado com sucesso!');
      return true;
    } catch (error) {
      console.error('❌ Erro ao inicializar Gemini AI:', error);
      return false;
    }
  }

  /**
   * Verifica se o serviço está pronto para uso
   */
  isReady(): boolean {
    return this.isInitialized && this.model !== null;
  }

  /**
   * Analisa a pronúncia da criança e fornece feedback inteligente
   */
  async analyzePronunciation(
    targetWord: string,
    spokenWord: string,
    childAge: number,
    previousAttempts: number = 0
  ): Promise<FeedbackResponse> {
    // Se Gemini não estiver disponível, usa análise básica
    if (!this.isReady()) {
      return this.fallbackAnalysis(targetWord, spokenWord);
    }

    try {
      const prompt = this.createAnalysisPrompt(targetWord, spokenWord, childAge, previousAttempts);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseFeedbackFromGemini(text, targetWord, spokenWord);
    } catch (error) {
      console.error('Erro na análise Gemini:', error);
      return this.fallbackAnalysis(targetWord, spokenWord);
    }
  }

  /**
   * Cria um prompt especializado para análise de pronúncia infantil
   */
  private createAnalysisPrompt(
    targetWord: string,
    spokenWord: string,
    childAge: number,
    previousAttempts: number
  ): string {
    return `
Você é um assistente fonoaudiólogo especializado em ajudar crianças de ${childAge} anos a melhorar sua pronúncia.

CONTEXTO:
- Palavra alvo: "${targetWord}"
- Palavra falada pela criança: "${spokenWord}"
- Tentativas anteriores: ${previousAttempts}

TAREFA:
Analise a pronúncia da criança e forneça um feedback CONSTRUTIVO, POSITIVO e ENCORAJADOR, adequado para uma criança.

RESPONDA NO SEGUINTE FORMATO JSON:
{
  "result": "PERFECT" | "GOOD" | "CLOSE" | "INCORRECT",
  "accuracy": <número de 0 a 100>,
  "message": "<mensagem principal curta e amigável>",
  "encouragement": "<frase encorajadora>",
  "suggestions": [<dicas específicas se necessário>],
  "syllableBreakdown": [<divisão silábica se necessário>],
  "visualAid": "<descrição de ajuda visual, se necessário>",
  "audioAid": "<descrição de ajuda sonora, se necessário>"
}

DIRETRIZES:
1. Seja SEMPRE positivo e encorajador
2. Use linguagem simples e amigável
3. Se a criança errou, ofereça dicas específicas mas gentis
4. Celebre qualquer progresso
5. Use emojis para tornar a comunicação mais divertida
6. Para palavras parecidas mas diferentes, explique a diferença de forma lúdica
7. Considere que crianças dessa idade podem ter dificuldades naturais com certos fonemas

IMPORTANTE: Retorne APENAS o JSON, sem texto adicional.
`.trim();
  }

  /**
   * Faz parsing da resposta do Gemini e converte para FeedbackResponse
   */
  private parseFeedbackFromGemini(geminiText: string, targetWord: string, spokenWord: string): FeedbackResponse {
    try {
      // Remove markdown code blocks se existirem
      const cleanText = geminiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanText);

      return {
        result: parsed.result || this.determineResult(targetWord, spokenWord),
        accuracy: parsed.accuracy || this.calculateAccuracy(targetWord, spokenWord),
        message: parsed.message || 'Muito bem!',
        encouragement: parsed.encouragement || 'Continue tentando, você está indo muito bem!',
        suggestions: parsed.suggestions || [],
        syllableBreakdown: parsed.syllableBreakdown,
        visualAid: parsed.visualAid,
        audioAid: parsed.audioAid,
      };
    } catch (error) {
      console.error('Erro ao fazer parsing da resposta Gemini:', error);
      return this.fallbackAnalysis(targetWord, spokenWord);
    }
  }

  /**
   * Análise de fallback quando Gemini não está disponível
   */
  private fallbackAnalysis(targetWord: string, spokenWord: string): FeedbackResponse {
    const accuracy = this.calculateAccuracy(targetWord, spokenWord);
    const result = this.determineResult(targetWord, spokenWord);

    const messages = {
      PERFECT: {
        message: '🎉 Perfeito! Você disse certinho!',
        encouragement: 'Você é incrível! Continue assim!',
      },
      GOOD: {
        message: '😊 Muito bom! Quase perfeito!',
        encouragement: 'Você está indo muito bem!',
      },
      CLOSE: {
        message: '🌟 Quase lá! Vamos tentar de novo?',
        encouragement: 'Você está melhorando a cada tentativa!',
      },
      INCORRECT: {
        message: '💪 Vamos tentar juntos?',
        encouragement: 'Não desista! Você consegue!',
      },
    };

    const feedback = messages[result];

    return {
      result,
      accuracy,
      message: feedback.message,
      encouragement: feedback.encouragement,
      suggestions: result === 'CLOSE' || result === 'INCORRECT' ? this.generateSuggestions(targetWord) : [],
      syllableBreakdown: result === 'CLOSE' || result === 'INCORRECT' ? this.breakIntoSyllables(targetWord) : undefined,
    };
  }

  /**
   * Calcula a similaridade entre duas palavras (Levenshtein distance normalizado)
   */
  private calculateAccuracy(word1: string, word2: string): number {
    const s1 = this.normalize(word1);
    const s2 = this.normalize(word2);

    if (s1 === s2) return 100;

    const distance = this.levenshteinDistance(s1, s2);
    const maxLength = Math.max(s1.length, s2.length);
    const similarity = ((maxLength - distance) / maxLength) * 100;

    return Math.round(Math.max(0, similarity));
  }

  /**
   * Normaliza string para comparação
   */
  private normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .trim();
  }

  /**
   * Calcula distância de Levenshtein entre duas strings
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
            matrix[i][j - 1] + 1,     // inserção
            matrix[i - 1][j] + 1      // remoção
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Determina o resultado baseado na acurácia
   */
  private determineResult(targetWord: string, spokenWord: string): FeedbackResponse['result'] {
    const accuracy = this.calculateAccuracy(targetWord, spokenWord);

    if (accuracy === 100) return 'PERFECT';
    if (accuracy >= 80) return 'GOOD';
    if (accuracy >= 50) return 'CLOSE';
    return 'INCORRECT';
  }

  /**
   * Gera sugestões de melhoria
   */
  private generateSuggestions(word: string): string[] {
    return [
      `Vamos dizer devagar: ${word}`,
      'Tente prestar atenção em cada som',
      'Você pode repetir comigo?',
    ];
  }

  /**
   * Divide palavra em sílabas (algoritmo simples em português)
   */
  private breakIntoSyllables(word: string): string[] {
    const normalized = word.toLowerCase();
    const vowels = 'aeiouáéíóúâêîôûãõ';
    const syllables: string[] = [];
    let currentSyllable = '';

    for (let i = 0; i < normalized.length; i++) {
      currentSyllable += normalized[i];

      const isVowel = vowels.includes(normalized[i]);
      const nextIsConsonant = i < normalized.length - 1 && !vowels.includes(normalized[i + 1]);

      if (isVowel && nextIsConsonant && i < normalized.length - 2) {
        syllables.push(currentSyllable);
        currentSyllable = '';
      }
    }

    if (currentSyllable) {
      syllables.push(currentSyllable);
    }

    return syllables.length > 0 ? syllables : [word];
  }

  /**
   * Gera um exercício personalizado para a criança
   */
  async generateCustomExercise(
    difficulty: 'EASY' | 'MEDIUM' | 'HARD',
    category: string,
    childAge: number,
    weakPhonemes?: string[]
  ): Promise<string[]> {
    if (!this.isReady()) {
      return this.getFallbackExercises(difficulty, category);
    }

    try {
      const prompt = `
Crie uma lista de 5 palavras em português para exercício de pronúncia infantil.

PARÂMETROS:
- Dificuldade: ${difficulty}
- Categoria: ${category}
- Idade da criança: ${childAge} anos
${weakPhonemes ? `- Fonemas que a criança tem dificuldade: ${weakPhonemes.join(', ')}` : ''}

REGRAS:
- Para EASY: palavras de 3-5 letras, fonemas simples
- Para MEDIUM: palavras de 6-8 letras, fonemas moderados
- Para HARD: palavras de 8+ letras, fonemas complexos
- Retorne APENAS as palavras, uma por linha, sem numeração

Responda apenas com a lista de palavras.
`.trim();

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
    } catch (error) {
      console.error('Erro ao gerar exercício personalizado:', error);
      return this.getFallbackExercises(difficulty, category);
    }
  }

  /**
   * Exercícios de fallback
   */
  private getFallbackExercises(difficulty: string, category: string): string[] {
    const exercises: Record<string, string[]> = {
      EASY: ['gato', 'casa', 'bola', 'sol', 'lua'],
      MEDIUM: ['cavalo', 'banana', 'janela', 'sapato', 'coelho'],
      HARD: ['elefante', 'borboleta', 'tartaruga', 'helicóptero', 'biblioteca'],
    };

    return exercises[difficulty] || exercises.EASY;
  }
}

// Exporta instância singleton
export const geminiService = new GeminiService();
export default geminiService;
