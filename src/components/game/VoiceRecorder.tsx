/**
 * Componente de gravação de voz
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants';

interface VoiceRecorderProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  disabled?: boolean;
}

export function VoiceRecorder({
  isListening,
  onStartListening,
  onStopListening,
  disabled = false,
}: VoiceRecorderProps) {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isListening) {
      // Animação de pulso quando está ouvindo
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening, pulseAnim]);

  const handlePress = () => {
    if (isListening) {
      onStopListening();
    } else {
      onStartListening();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.8}>
        <Animated.View
          style={[
            styles.buttonInner,
            isListening && styles.buttonListening,
            { transform: [{ scale: pulseAnim }] },
          ]}>
          <Text style={styles.icon}>🎤</Text>
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.instruction}>
        {isListening ? 'Fale agora!' : 'Toque para falar'}
      </Text>

      {isListening && (
        <View style={styles.waveContainer}>
          <Text style={styles.wave}>〰️</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    ...{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonListening: {
    backgroundColor: Colors.success,
  },
  icon: {
    fontSize: 50,
  },
  instruction: {
    marginTop: Spacing.md,
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  waveContainer: {
    marginTop: Spacing.sm,
  },
  wave: {
    fontSize: 30,
    color: Colors.success,
  },
});
