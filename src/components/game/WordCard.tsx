/**
 * Componente de card da palavra
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@/components/common';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants';
import { GameWord } from '@/types';

interface WordCardProps {
  word: GameWord;
  showWord?: boolean;
  onPlaySound?: () => void;
}

export function WordCard({ word, showWord = true, onPlaySound }: WordCardProps) {
  return (
    <Card style={styles.container}>
      {/* Imagem placeholder */}
      <View style={styles.imageContainer}>
        <Text style={styles.imagePlaceholder}>
          {word.category === 'animals' ? '🦁' : '🎮'}
        </Text>
      </View>

      {/* Palavra */}
      {showWord && (
        <View style={styles.wordContainer}>
          <Text style={styles.word}>{word.word}</Text>
          <Text style={styles.syllables}>{word.syllables.join(' - ')}</Text>
        </View>
      )}

      {/* Botão de áudio */}
      {onPlaySound && (
        <TouchableOpacity style={styles.soundButton} onPress={onPlaySound}>
          <Text style={styles.soundIcon}>🔊</Text>
          <Text style={styles.soundText}>Ouvir</Text>
        </TouchableOpacity>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: Spacing.xl,
    minHeight: 300,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  imagePlaceholder: {
    fontSize: 100,
  },
  wordContainer: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  word: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  syllables: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  soundButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.secondary,
    ...{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
  },
  soundIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  soundText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textOnPrimary,
  },
});
