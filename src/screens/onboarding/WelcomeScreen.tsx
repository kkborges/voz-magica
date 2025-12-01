/**
 * Tela de boas-vindas - Primeira tela do app
 */

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/common';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants';
import { useNavigation } from '@/hooks/useNavigation';

export function WelcomeScreen() {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate('CreateProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Mascote */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🎤✨</Text>
          <Text style={styles.title}>Voz Mágica</Text>
          <Text style={styles.subtitle}>
            Aprenda a falar de um jeito divertido!
          </Text>
        </View>

        {/* Ilustração */}
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustration}>👧🗣️🎮</Text>
        </View>

        {/* Descrição */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Jogue, fale e aprenda com jogos super divertidos!
          </Text>
          <Text style={styles.features}>
            ⭐ Jogos interativos{'\n'}
            🎯 Feedback personalizado{'\n'}
            🏆 Recompensas incríveis
          </Text>
        </View>

        {/* Botão */}
        <View style={styles.buttonContainer}>
          <Button
            title="Começar a Aventura!"
            onPress={handleStart}
            size="large"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  illustration: {
    fontSize: 120,
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  description: {
    fontSize: FontSize.lg,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontWeight: FontWeight.medium,
  },
  features: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'left',
    lineHeight: 28,
  },
  buttonContainer: {
    marginBottom: Spacing.lg,
  },
  button: {
    width: '100%',
  },
});
