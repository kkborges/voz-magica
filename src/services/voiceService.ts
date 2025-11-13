import Voice from '@react-native-voice/voice';

export class VoiceService {
  private static isListening = false;

  static async initialize(): Promise<void> {
    try {
      Voice.onSpeechResults = this.onSpeechResults;
      Voice.onSpeechError = this.onSpeechError;
    } catch (error) {
      console.error('Error initializing voice service:', error);
    }
  }

  static async startListening(onResult: (text: string) => void): Promise<void> {
    try {
      if (this.isListening) {
        await this.stopListening();
      }

      this.resultCallback = onResult;
      await Voice.start('pt-BR');
      this.isListening = true;
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      throw error;
    }
  }

  static async stopListening(): Promise<void> {
    try {
      await Voice.stop();
      this.isListening = false;
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  }

  static async destroy(): Promise<void> {
    try {
      await Voice.destroy();
      this.isListening = false;
      Voice.removeAllListeners();
    } catch (error) {
      console.error('Error destroying voice service:', error);
    }
  }

  private static resultCallback: ((text: string) => void) | null = null;

  private static onSpeechResults = (e: any) => {
    if (e.value && e.value.length > 0 && this.resultCallback) {
      this.resultCallback(e.value[0]);
    }
  };

  private static onSpeechError = (e: any) => {
    console.error('Speech recognition error:', e);
  };

  static comparePronunciation(spoken: string, target: string): number {
    const spokenLower = spoken.toLowerCase().trim();
    const targetLower = target.toLowerCase().trim();

    if (spokenLower === targetLower) {
      return 100;
    }

    // Calcula similaridade usando Levenshtein
    const distance = this.levenshteinDistance(spokenLower, targetLower);
    const maxLength = Math.max(spokenLower.length, targetLower.length);
    const similarity = ((maxLength - distance) / maxLength) * 100;

    return Math.round(similarity);
  }

  private static levenshteinDistance(str1: string, str2: string): number {
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
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }
}
