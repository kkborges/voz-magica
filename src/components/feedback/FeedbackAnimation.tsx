/**
 * Componente de animação de feedback
 */

import React, { useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { AttemptResult } from '@/types';
import { Colors, FontSize, FontWeight, Spacing } from '@/constants';

interface FeedbackAnimationProps {
  result: AttemptResult;
  message: string;
  onComplete?: () => void;
}

export function FeedbackAnimation({ result, message, onComplete }: FeedbackAnimationProps) {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-complete após 2 segundos
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [scaleAnim, opacityAnim, onComplete]);

  const getEmoji = () => {
    switch (result) {
      case AttemptResult.PERFECT:
        return '🌟✨';
      case AttemptResult.GOOD:
        return '👍😊';
      case AttemptResult.CLOSE:
        return '🤔💭';
      default:
        return '💪🎯';
    }
  };

  const getBackgroundColor = () => {
    switch (result) {
      case AttemptResult.PERFECT:
        return Colors.successLight;
      case AttemptResult.GOOD:
        return Colors.infoLight;
      case AttemptResult.CLOSE:
        return Colors.warningLight;
      default:
        return Colors.errorLight;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}>
      <Text style={styles.emoji}>{getEmoji()}</Text>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  emoji: {
    fontSize: 60,
    marginBottom: Spacing.md,
  },
  message: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: 'center',
  },
});
