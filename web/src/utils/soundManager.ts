/**
 * Sound Manager - Sistema avançado de áudio
 * Suporta Web Audio API com fallback para HTML5 Audio
 */

export type SoundType =
  | 'click'
  | 'success'
  | 'error'
  | 'star'
  | 'levelup'
  | 'achievement'
  | 'whoosh'
  | 'pop'
  | 'chime'
  | 'magic'
  | 'confetti'
  | 'applause';

interface Sound {
  buffer?: AudioBuffer;
  url: string;
}

class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<SoundType, Sound> = new Map();
  private masterVolume = 0.7;
  private enabled = true;
  private soundEffectsVolume = 1.0;
  private musicVolume = 0.5;

  constructor() {
    this.initializeAudioContext();
    this.loadSounds();
  }

  private initializeAudioContext() {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass();

      // Resume context on user interaction (mobile requirement)
      document.addEventListener('touchstart', () => {
        if (this.audioContext?.state === 'suspended') {
          this.audioContext.resume();
        }
      }, { once: true });

      document.addEventListener('click', () => {
        if (this.audioContext?.state === 'suspended') {
          this.audioContext.resume();
        }
      }, { once: true });

    } catch (error) {
      console.warn('Web Audio API not supported, falling back to HTML5 Audio');
    }
  }

  private loadSounds() {
    // URLs dos sons (você pode hospedar ou usar bibliotecas de sons)
    const soundUrls: Record<SoundType, string> = {
      click: '/sounds/click.mp3',
      success: '/sounds/success.mp3',
      error: '/sounds/error.mp3',
      star: '/sounds/star.mp3',
      levelup: '/sounds/levelup.mp3',
      achievement: '/sounds/achievement.mp3',
      whoosh: '/sounds/whoosh.mp3',
      pop: '/sounds/pop.mp3',
      chime: '/sounds/chime.mp3',
      magic: '/sounds/magic.mp3',
      confetti: '/sounds/confetti.mp3',
      applause: '/sounds/applause.mp3',
    };

    Object.entries(soundUrls).forEach(([type, url]) => {
      this.sounds.set(type as SoundType, { url });
      this.preloadSound(type as SoundType, url);
    });
  }

  private async preloadSound(type: SoundType, url: string) {
    if (!this.audioContext) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      const sound = this.sounds.get(type);
      if (sound) {
        sound.buffer = audioBuffer;
      }
    } catch (error) {
      console.warn(`Failed to load sound: ${type}`, error);
    }
  }

  play(type: SoundType, options?: { volume?: number; playbackRate?: number; loop?: boolean }) {
    if (!this.enabled) return;

    const sound = this.sounds.get(type);
    if (!sound) return;

    // Web Audio API (preferencial)
    if (this.audioContext && sound.buffer) {
      this.playWebAudio(sound.buffer, options);
    } else {
      // Fallback: HTML5 Audio
      this.playHTML5Audio(sound.url, options);
    }
  }

  private playWebAudio(
    buffer: AudioBuffer,
    options?: { volume?: number; playbackRate?: number; loop?: boolean }
  ) {
    if (!this.audioContext) return;

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();

    source.buffer = buffer;
    source.loop = options?.loop || false;
    source.playbackRate.value = options?.playbackRate || 1;

    const volume = (options?.volume ?? 1) * this.soundEffectsVolume * this.masterVolume;
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    source.start(0);
  }

  private playHTML5Audio(
    url: string,
    options?: { volume?: number; playbackRate?: number; loop?: boolean }
  ) {
    const audio = new Audio(url);
    audio.volume = (options?.volume ?? 1) * this.soundEffectsVolume * this.masterVolume;
    audio.playbackRate = options?.playbackRate || 1;
    audio.loop = options?.loop || false;

    audio.play().catch(err => console.warn('Audio play failed:', err));
  }

  // Sequência de sons
  playSequence(sounds: Array<{ type: SoundType; delay: number; options?: any }>) {
    sounds.forEach(({ type, delay, options }) => {
      setTimeout(() => this.play(type, options), delay);
    });
  }

  // Efeito de áudio posicional (stereo panning)
  playPositional(type: SoundType, x: number) {
    if (!this.enabled || !this.audioContext) return;

    const sound = this.sounds.get(type);
    if (!sound?.buffer) return;

    const source = this.audioContext.createBufferSource();
    const panner = this.audioContext.createStereoPanner();
    const gainNode = this.audioContext.createGain();

    source.buffer = sound.buffer;
    panner.pan.value = Math.max(-1, Math.min(1, (x - 0.5) * 2)); // Normaliza para -1 a 1
    gainNode.gain.value = this.soundEffectsVolume * this.masterVolume;

    source.connect(panner);
    panner.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    source.start(0);
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  setSoundEffectsVolume(volume: number) {
    this.soundEffectsVolume = Math.max(0, Math.min(1, volume));
  }

  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  getMasterVolume() {
    return this.masterVolume;
  }

  isEnabled() {
    return this.enabled;
  }
}

// Singleton instance
export const soundManager = new SoundManager();

// Helper function
export function playSound(type: SoundType, options?: { volume?: number; playbackRate?: number }) {
  soundManager.play(type, options);
}

export default soundManager;
