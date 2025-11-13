/**
 * Tema e constantes de estilo
 */

export const Colors = {
  // Cores principais - paleta infantil e alegre
  primary: '#FF6B9D', // Rosa vibrante
  secondary: '#FFA94D', // Laranja
  accent: '#FFD93D', // Amarelo
  success: '#6BCF7F', // Verde
  error: '#FF6B6B', // Vermelho suave
  warning: '#FFD93D', // Amarelo
  info: '#4ECDC4', // Azul turquesa

  // Tons de cinza
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceVariant: '#F1F3F4',
  border: '#E0E0E0',

  // Textos
  text: '#2D3436',
  textSecondary: '#636E72',
  textDisabled: '#B2BEC3',
  textOnPrimary: '#FFFFFF',

  // Feedback
  successLight: '#D4EDDA',
  errorLight: '#F8D7DA',
  warningLight: '#FFF3CD',
  infoLight: '#D1ECF1',

  // Gamificação
  star: '#FFD93D',
  coin: '#FFA94D',
  level: '#A29BFE',
  streak: '#FF6B9D',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const Animation = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
};
