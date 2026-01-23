/**
 * Serviço de Reconhecimento de Voz
 * Utiliza Web Speech API para capturar e reconhecer a fala das crianças
 */

type VoiceCallback = (transcript: string, isFinal: boolean) => void;
type ErrorCallback = (error: string) => void;
type EndCallback = () => void;

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

class VoiceService {
  private recognition: any = null;
  private isListening = false;
  private onResultCallback: VoiceCallback | null = null;
  private onErrorCallback: ErrorCallback | null = null;
  private onEndCallback: EndCallback | null = null;

  constructor() {
    this.initializeRecognition();
  }

  /**
   * Inicializa o reconhecimento de voz
   */
  private initializeRecognition(): boolean {
    try {
      // Verifica se o navegador suporta Web Speech API
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.error('❌ Web Speech API não suportada neste navegador');
        return false;
      }

      this.recognition = new SpeechRecognition();

      // Configurações para melhor reconhecimento de voz infantil
      this.recognition.continuous = false; // Para após reconhecer uma frase
      this.recognition.interimResults = true; // Mostra resultados parciais
      this.recognition.lang = 'pt-BR'; // Português do Brasil
      this.recognition.maxAlternatives = 3; // Múltiplas alternativas para maior precisão

      // Event listeners
      this.recognition.onresult = this.handleResult.bind(this);
      this.recognition.onerror = this.handleError.bind(this);
      this.recognition.onend = this.handleEnd.bind(this);
      this.recognition.onstart = this.handleStart.bind(this);

      console.log('✅ Reconhecimento de voz inicializado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao inicializar reconhecimento de voz:', error);
      return false;
    }
  }

  /**
   * Verifica se o serviço está disponível
   */
  isAvailable(): boolean {
    return this.recognition !== null;
  }

  /**
   * Inicia a escuta
   */
  startListening(
    onResult: VoiceCallback,
    onError?: ErrorCallback,
    onEnd?: EndCallback
  ): boolean {
    if (!this.isAvailable()) {
      console.error('Reconhecimento de voz não disponível');
      onError?.('Reconhecimento de voz não suportado no seu navegador');
      return false;
    }

    if (this.isListening) {
      console.warn('Já está escutando');
      return false;
    }

    try {
      this.onResultCallback = onResult;
      this.onErrorCallback = onError || null;
      this.onEndCallback = onEnd || null;

      this.recognition.start();
      return true;
    } catch (error) {
      console.error('Erro ao iniciar reconhecimento:', error);
      onError?.('Erro ao iniciar o microfone');
      return false;
    }
  }

  /**
   * Para a escuta
   */
  stopListening(): void {
    if (this.isListening && this.recognition) {
      this.recognition.stop();
    }
  }

  /**
   * Cancela a escuta sem processar resultados
   */
  cancelListening(): void {
    if (this.isListening && this.recognition) {
      this.recognition.abort();
      this.isListening = false;
    }
  }

  /**
   * Handler para quando o reconhecimento começa
   */
  private handleStart(): void {
    this.isListening = true;
    console.log('🎤 Microfone ativado - escutando...');
  }

  /**
   * Handler para resultados do reconhecimento
   */
  private handleResult(event: SpeechRecognitionEvent): void {
    const results = event.results;
    const currentResult = results[event.resultIndex];

    if (!currentResult) return;

    const transcript = currentResult[0].transcript;
    const isFinal = currentResult.isFinal;
    const confidence = currentResult[0].confidence;

    console.log(`📝 Transcript: "${transcript}" (${isFinal ? 'final' : 'parcial'}) - Confiança: ${(confidence * 100).toFixed(1)}%`);

    // Callback com o resultado
    if (this.onResultCallback) {
      this.onResultCallback(transcript.trim(), isFinal);
    }

    // Se for resultado final, para a escuta
    if (isFinal) {
      this.stopListening();
    }
  }

  /**
   * Handler para erros
   */
  private handleError(event: SpeechRecognitionErrorEvent): void {
    console.error('❌ Erro no reconhecimento de voz:', event.error);

    let errorMessage = 'Erro desconhecido';

    switch (event.error) {
      case 'no-speech':
        errorMessage = 'Nenhuma fala detectada. Tente falar mais alto!';
        break;
      case 'audio-capture':
        errorMessage = 'Microfone não encontrado ou sem permissão';
        break;
      case 'not-allowed':
        errorMessage = 'Permissão do microfone negada';
        break;
      case 'network':
        errorMessage = 'Erro de conexão. Verifique sua internet';
        break;
      case 'aborted':
        errorMessage = 'Reconhecimento cancelado';
        break;
      default:
        errorMessage = `Erro: ${event.error}`;
    }

    if (this.onErrorCallback) {
      this.onErrorCallback(errorMessage);
    }

    this.isListening = false;
  }

  /**
   * Handler para quando o reconhecimento termina
   */
  private handleEnd(): void {
    console.log('🛑 Reconhecimento de voz finalizado');
    this.isListening = false;

    if (this.onEndCallback) {
      this.onEndCallback();
    }
  }

  /**
   * Verifica se está escutando
   */
  getIsListening(): boolean {
    return this.isListening;
  }

  /**
   * Solicita permissão do microfone
   */
  async requestMicrophonePermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Para o stream imediatamente
      console.log('✅ Permissão do microfone concedida');
      return true;
    } catch (error) {
      console.error('❌ Permissão do microfone negada:', error);
      return false;
    }
  }

  /**
   * Testa o reconhecimento de voz
   */
  async testRecognition(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.isAvailable()) {
        resolve(false);
        return;
      }

      const timeout = setTimeout(() => {
        this.stopListening();
        resolve(false);
      }, 5000);

      this.startListening(
        (transcript, isFinal) => {
          if (isFinal && transcript.length > 0) {
            clearTimeout(timeout);
            resolve(true);
          }
        },
        () => {
          clearTimeout(timeout);
          resolve(false);
        }
      );
    });
  }

  /**
   * Text-to-Speech: fala uma palavra/frase
   */
  speak(text: string, options?: {
    rate?: number; // 0.1 a 10 (padrão 1)
    pitch?: number; // 0 a 2 (padrão 1)
    volume?: number; // 0 a 1 (padrão 1)
    lang?: string;
    onEnd?: () => void;
  }): void {
    if (!('speechSynthesis' in window)) {
      console.error('Text-to-Speech não suportado');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options?.lang || 'pt-BR';
    utterance.rate = options?.rate || 1;
    utterance.pitch = options?.pitch || 1;
    utterance.volume = options?.volume || 1;

    if (options?.onEnd) {
      utterance.onend = options.onEnd;
    }

    // Cancela falas anteriores
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  /**
   * Para qualquer fala em andamento
   */
  stopSpeaking(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Lista vozes disponíveis (útil para escolher voz feminina/masculina)
   */
  getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!('speechSynthesis' in window)) {
      return [];
    }

    return window.speechSynthesis.getVoices().filter(voice =>
      voice.lang.startsWith('pt')
    );
  }

  /**
   * Seleciona a melhor voz em português
   */
  getBestPortugueseVoice(): SpeechSynthesisVoice | null {
    const voices = this.getAvailableVoices();

    // Prioriza vozes pt-BR, depois pt-PT
    const ptBR = voices.find(v => v.lang === 'pt-BR');
    if (ptBR) return ptBR;

    const ptPT = voices.find(v => v.lang === 'pt-PT');
    if (ptPT) return ptPT;

    return voices[0] || null;
  }
}

// Exporta instância singleton
export const voiceService = new VoiceService();
export default voiceService;
