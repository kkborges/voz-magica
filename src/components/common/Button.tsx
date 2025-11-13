/**
 * Componente de botão personalizado
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing, Shadows } from '@/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const buttonStyle = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    disabled && styles.button_disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.text_disabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.textOnPrimary : Colors.primary}
        />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyleCombined}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.lg,
    ...Shadows.md,
  },

  // Variants
  button_primary: {
    backgroundColor: Colors.primary,
  },
  button_secondary: {
    backgroundColor: Colors.secondary,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  button_ghost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },

  // Sizes
  button_small: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  button_medium: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  button_large: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },

  // States
  button_disabled: {
    opacity: 0.5,
  },

  // Text
  text: {
    fontWeight: FontWeight.semibold,
    textAlign: 'center',
  },
  text_primary: {
    color: Colors.textOnPrimary,
  },
  text_secondary: {
    color: Colors.textOnPrimary,
  },
  text_outline: {
    color: Colors.primary,
  },
  text_ghost: {
    color: Colors.primary,
  },
  text_small: {
    fontSize: FontSize.sm,
  },
  text_medium: {
    fontSize: FontSize.md,
  },
  text_large: {
    fontSize: FontSize.lg,
  },
  text_disabled: {
    color: Colors.textDisabled,
  },
});
