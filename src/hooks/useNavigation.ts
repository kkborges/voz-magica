/**
 * Hook de navegação tipado
 */

import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';

export type NavigationProp = StackNavigationProp<RootStackParamList>;

/**
 * Hook customizado para navegação tipada
 */
export function useNavigation() {
  return useRNNavigation<NavigationProp>();
}
