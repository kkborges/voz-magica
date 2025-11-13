/**
 * Serviço de áudio
 * Responsável por tocar sons, efeitos sonoros e feedback de voz
 */

import Sound from 'react-native-sound';

export interface AudioConfig {
  volume: number; // 0-1
  enableSoundEffects: boolean;
  enableVoiceFeedback: boolean;
}

export enum SoundEffect {
  SUCCESS = 'success',
  STAR_EARNED = 'star_earned',
  WRONG = 'wrong',
  CLICK = 'click',
  ACHIEVEMENT = 'achievement',
  LEVEL_UP = 'level_up',
}

class AudioService {
  private config: AudioConfig;
  private sounds: Map<string, Sound>;
  private currentVoice?: Sound;

  constructor() {
    this.config = {
      volume: 0.7,
      enableSoundEffects: true,
      enableVoiceFeedback: true,
    };
    this.sounds = new Map();

    // Habilita playback em modo silencioso (iOS)
    Sound.setCategory('Playback');
  }

  /**
   * Atualiza configuração
   */
  updateConfig(config: Partial<AudioConfig>): void {
    this.config = { ...this.config, ...config };
    this.updateAllVolumes();
  }

  /**
   * Atualiza volume de todos os sons carregados
   */
  private updateAllVolumes(): void {
    this.sounds.forEach(sound => {
      sound.setVolume(this.config.volume);
    });
  }

  /**
   * Carrega um arquivo de som
   */
  private loadSound(path: string): Promise<Sound> {
    return new Promise((resolve, reject) => {
      const sound = new Sound(path, Sound.MAIN_BUNDLE, error => {
        if (error) {
          reject(error);
          return;
        }
        sound.setVolume(this.config.volume);
        resolve(sound);
      });
    });
  }

  /**
   * Toca um efeito sonoro
   */
  async playSoundEffect(effect: SoundEffect): Promise<void> {
    if (!this.config.enableSoundEffects) {
      return;
    }

    try {
      const soundPath = this.getSoundEffectPath(effect);

      if (this.sounds.has(effect)) {
        const sound = this.sounds.get(effect)!;
        sound.play();
      } else {
        const sound = await this.loadSound(soundPath);
        this.sounds.set(effect, sound);
        sound.play();
      }
    } catch (error) {
      console.error(`Error playing sound effect ${effect}:`, error);
    }
  }

  /**
   * Retorna o caminho do arquivo de som
   */
  private getSoundEffectPath(effect: SoundEffect): string {
    // TODO: Mapear para arquivos reais
    const soundMap: Record<SoundEffect, string> = {
      [SoundEffect.SUCCESS]: 'success.mp3',
      [SoundEffect.STAR_EARNED]: 'star_earned.mp3',
      [SoundEffect.WRONG]: 'wrong.mp3',
      [SoundEffect.CLICK]: 'click.mp3',
      [SoundEffect.ACHIEVEMENT]: 'achievement.mp3',
      [SoundEffect.LEVEL_UP]: 'level_up.mp3',
    };

    return soundMap[effect];
  }

  /**
   * Toca feedback de voz (TTS ou áudio pré-gravado)
   */
  async playVoiceFeedback(
    text: string,
    audioUrl?: string,
  ): Promise<void> {
    if (!this.config.enableVoiceFeedback) {
      return;
    }

    try {
      // Para a voz atual se houver
      this.stopVoiceFeedback();

      if (audioUrl) {
        // Usa áudio pré-gravado
        this.currentVoice = await this.loadSound(audioUrl);
        this.currentVoice.play(success => {
          if (success) {
            console.log('Voice feedback completed');
          } else {
            console.error('Voice feedback failed');
          }
          this.currentVoice?.release();
          this.currentVoice = undefined;
        });
      } else {
        // TODO: Implementar TTS (Text-to-Speech)
        console.log('TTS not implemented yet. Text:', text);
      }
    } catch (error) {
      console.error('Error playing voice feedback:', error);
    }
  }

  /**
   * Para o feedback de voz atual
   */
  stopVoiceFeedback(): void {
    if (this.currentVoice) {
      this.currentVoice.stop();
      this.currentVoice.release();
      this.currentVoice = undefined;
    }
  }

  /**
   * Toca a pronúncia de uma palavra
   */
  async playWordPronunciation(audioUrl: string): Promise<void> {
    try {
      this.stopVoiceFeedback();

      const sound = await this.loadSound(audioUrl);
      sound.play(success => {
        if (success) {
          console.log('Word pronunciation completed');
        }
        sound.release();
      });
    } catch (error) {
      console.error('Error playing word pronunciation:', error);
    }
  }

  /**
   * Toca uma música de ritmo
   */
  async playRhythmSong(audioUrl: string): Promise<void> {
    await this.playVoiceFeedback('', audioUrl);
  }

  /**
   * Para todos os sons
   */
  stopAll(): void {
    this.stopVoiceFeedback();
    this.sounds.forEach(sound => sound.stop());
  }

  /**
   * Libera recursos
   */
  cleanup(): void {
    this.stopAll();
    this.sounds.forEach(sound => sound.release());
    this.sounds.clear();
  }
}

export default new AudioService();
