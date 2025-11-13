/**
 * Configuração do aplicativo
 */

import { AppConfig } from '@/types';

const isDevelopment = __DEV__;

export const appConfig: AppConfig = {
  apiUrl: isDevelopment ? 'http://localhost:3000' : 'https://api.vozmagica.com',
  speechApiKey: '', // TODO: Adicionar chave da API de speech
  audioSampleRate: 16000,
  maxRecordingDuration: 5,
  minimumConfidence: 60,
  enableAnalytics: !isDevelopment,
  enableCrashReporting: !isDevelopment,
  cacheDuration: 24, // 24 horas
};

export default appConfig;
