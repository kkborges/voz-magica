/**
 * Componente de card
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'flat';
  padding?: keyof typeof Spacing;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'elevated',
  padding = 'md',
}) => {
  const cardStyle = [
    styles.card,
    styles[`card_${variant}`],
    { padding: Spacing[padding] },
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
  },
  card_elevated: {
    ...Shadows.md,
  },
  card_outlined: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  card_flat: {
    backgroundColor: Colors.surfaceVariant,
  },
});
