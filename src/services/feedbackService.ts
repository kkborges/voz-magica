import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { FeedbackResult } from '../types';

export class FeedbackService {
  static async provideAudioFeedback(success: boolean, message?: string): Promise<void> {
    try {
      if (success) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Speech.speak(message || 'Muito bem! Você acertou!', {
          language: 'pt-BR',
          pitch: 1.2,
          rate: 0.9,
        });
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Speech.speak(message || 'Quase lá! Tente novamente!', {
          language: 'pt-BR',
          pitch: 1.0,
          rate: 0.85,
        });
      }
    } catch (error) {
      console.error('Error providing audio feedback:', error);
    }
  }

  static async speakWord(word: string): Promise<void> {
    try {
      await Speech.speak(word, {
        language: 'pt-BR',
        pitch: 1.1,
        rate: 0.7,
      });
    } catch (error) {
      console.error('Error speaking word:', error);
    }
  }

  static async speakSyllables(syllables: string[]): Promise<void> {
    try {
      for (const syllable of syllables) {
        await new Promise(resolve => setTimeout(resolve, 300));
        await Speech.speak(syllable, {
          language: 'pt-BR',
          pitch: 1.2,
          rate: 0.5,
        });
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Error speaking syllables:', error);
    }
  }

  static calculateFeedback(accuracy: number): FeedbackResult {
    let stars = 0;
    let message = '';
    let success = false;

    if (accuracy >= 90) {
      stars = 3;
      message = 'Perfeito! Você é uma estrela!';
      success = true;
    } else if (accuracy >= 70) {
      stars = 2;
      message = 'Muito bom! Continue assim!';
      success = true;
    } else if (accuracy >= 50) {
      stars = 1;
      message = 'Bom trabalho! Vamos tentar de novo?';
      success = true;
    } else {
      stars = 0;
      message = 'Tente novamente! Você consegue!';
      success = false;
    }

    return {
      success,
      accuracy,
      message,
      stars,
    };
  }

  static async playSuccessSound(): Promise<void> {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/success.mp3'),
        { shouldPlay: true }
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Success sound not available, using haptic feedback only');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }

  static async playErrorSound(): Promise<void> {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/error.mp3'),
        { shouldPlay: true }
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Error sound not available, using haptic feedback only');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }
}
