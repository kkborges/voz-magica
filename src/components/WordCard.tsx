import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Word } from '../types';

interface WordCardProps {
  word: Word;
  onPress?: () => void;
  showSyllables?: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  onPress,
  showSyllables = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <LinearGradient
        colors={['#FFE5EC', '#FFF0F5']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.emoji}>🎯</Text>
          <Text style={styles.word}>{word.text}</Text>

          {showSyllables && (
            <View style={styles.syllablesContainer}>
              {word.syllables.map((syllable, index) => (
                <View key={index} style={styles.syllableBox}>
                  <Text style={styles.syllable}>{syllable}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {word.difficulty === 'easy' ? 'Fácil' : word.difficulty === 'medium' ? 'Médio' : 'Difícil'}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  word: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 10,
  },
  syllablesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  syllableBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 3,
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  syllable: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF6B9D',
  },
  badge: {
    backgroundColor: '#FF6B9D',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 15,
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
