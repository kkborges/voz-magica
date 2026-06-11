/**
 * Serviço de Text-to-Speech (TTS)
 * Feedback 100% com voz em Português do Brasil
 */

import Tts from 'react-native-tts';
import { VoiceType } from '@/types';

export interface TTSConfig {
  language: string;
  rate: number; // 0.1 - 1.0 (velocidade)
  pitch: number; // 0.5 - 2.0 (tom)
  voiceType: VoiceType;
}

class TTSService {
  private config: TTSConfig = {
    language: 'pt-BR',
    rate: 0.45, // Mais devagar para crianças
    pitch: 1.1, // Tom levemente mais agudo, amigável
    voiceType: VoiceType.FEMALE_FRIENDLY,
  };

  private isInitialized = false;

  /**
   * Inicializa o TTS
   */
  async initialize(): Promise<boolean> {
    if (this.isInitialized) return true;

    try {
      await Tts.getInitStatus();
      await Tts.setDefaultLanguage(this.config.language);
      await Tts.setDefaultRate(this.config.rate);
      await Tts.setDefaultPitch(this.config.pitch);

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('TTS initialization failed:', error);
      return false;
    }
  }

  /**
   * Atualiza configuração
   */
  async updateConfig(config: Partial<TTSConfig>): Promise<void> {
    this.config = { ...this.config, ...config };

    if (this.isInitialized) {
      if (config.rate !== undefined) await Tts.setDefaultRate(config.rate);
      if (config.pitch !== undefined) await Tts.setDefaultPitch(config.pitch);
      if (config.language) await Tts.setDefaultLanguage(config.language);
    }
  }

  /**
   * Fala um texto
   */
  async speak(text: string): Promise<void> {
    if (!this.isInitialized) {
      const ok = await this.initialize();
      if (!ok) return;
    }

    try {
      await this.stop();
      Tts.speak(text);
    } catch (error) {
      console.error('TTS speak failed:', error);
    }
  }

  /**
   * Fala uma palavra lentamente (para aprendizado)
   */
  async speakWordSlowly(word: string): Promise<void> {
    const originalRate = this.config.rate;
    await Tts.setDefaultRate(0.3);
    await this.speak(word);
    // Restaura velocidade após a fala
    setTimeout(() => Tts.setDefaultRate(originalRate), 2000);
  }

  /**
   * Fala sílabas separadamente (técnica de divisão silábica)
   * Ex: "GA... TO... GATO!"
   */
  async speakSyllables(syllables: string[], fullWord: string): Promise<void> {
    const text = `${syllables.join('... ')}... ${fullWord}!`;
    const originalRate = this.config.rate;
    await Tts.setDefaultRate(0.3);
    await this.speak(text);
    setTimeout(() => Tts.setDefaultRate(originalRate), 4000);
  }

  /**
   * Apresenta uma palavra (estímulo do jogo)
   * Ex: "Olha, um GATO! Você consegue dizer GATO?"
   */
  async presentWord(word: string): Promise<void> {
    await this.speak(`Olha! ${word}! Você consegue dizer ${word}?`);
  }

  /**
   * Para a fala atual
   */
  async stop(): Promise<void> {
    try {
      await Tts.stop();
    } catch {
      // Ignora erros ao parar
    }
  }

  /**
   * Lista vozes disponíveis em pt-BR
   */
  async getAvailableVoices(): Promise<any[]> {
    try {
      const voices = await Tts.voices();
      return voices.filter(
        (v: any) => v.language === 'pt-BR' && !v.notInstalled,
      );
    } catch {
      return [];
    }
  }

  /**
   * Define uma voz específica
   */
  async setVoice(voiceId: string): Promise<void> {
    try {
      await Tts.setDefaultVoice(voiceId);
    } catch (error) {
      console.error('Failed to set voice:', error);
    }
  }
}

export default new TTSService();
