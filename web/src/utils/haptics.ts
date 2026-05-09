/**
 * Haptic Feedback Manager
 * Suporta Vibration API (mobile) e Gamepad Haptics
 */

export type HapticType =
  | 'light'      // Toque leve
  | 'medium'     // Toque médio
  | 'heavy'      // Toque forte
  | 'success'    // Feedback de sucesso
  | 'warning'    // Feedback de aviso
  | 'error'      // Feedback de erro
  | 'selection'; // Feedback de seleção

interface HapticPattern {
  duration?: number;
  pattern?: number[];
}

class HapticsManager {
  private enabled = true;
  private intensity = 1.0;

  constructor() {
    this.checkSupport();
  }

  private checkSupport(): boolean {
    return 'vibrate' in navigator;
  }

  trigger(type: HapticType) {
    if (!this.enabled || !this.checkSupport()) return;

    const patterns: Record<HapticType, HapticPattern> = {
      light: { duration: 10 },
      medium: { duration: 20 },
      heavy: { duration: 40 },
      success: { pattern: [10, 50, 10, 50, 30] },
      warning: { pattern: [20, 100, 20] },
      error: { pattern: [50, 100, 50, 100, 50] },
      selection: { duration: 15 },
    };

    const pattern = patterns[type];

    if (pattern.duration) {
      this.vibrate(pattern.duration * this.intensity);
    } else if (pattern.pattern) {
      this.vibrate(pattern.pattern.map(d => d * this.intensity));
    }
  }

  private vibrate(pattern: number | number[]) {
    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Vibration failed:', error);
    }
  }

  // Padrões customizados
  custom(pattern: number[]) {
    if (!this.enabled || !this.checkSupport()) return;
    this.vibrate(pattern.map(d => d * this.intensity));
  }

  // Sequência de vibrações
  sequence(patterns: Array<{ type: HapticType; delay: number }>) {
    patterns.forEach(({ type, delay }) => {
      setTimeout(() => this.trigger(type), delay);
    });
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setIntensity(intensity: number) {
    this.intensity = Math.max(0, Math.min(1, intensity));
  }

  isEnabled() {
    return this.enabled;
  }

  isSupported() {
    return this.checkSupport();
  }
}

// Singleton instance
export const hapticsManager = new HapticsManager();

// Helper function
export function hapticFeedback(type: HapticType) {
  hapticsManager.trigger(type);
}

export default hapticsManager;
