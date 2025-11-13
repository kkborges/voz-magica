import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/Button';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const handleStartGame = () => {
    navigation.navigate('Game');
  };

  return (
    <LinearGradient
      colors={['#FF6B9D', '#FFA07A', '#FFD93D']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.emoji}>🎯</Text>
          <Text style={styles.title}>Voz Mágica</Text>
          <Text style={styles.subtitle}>Aprenda a falar se divertindo!</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Escolha o Nível</Text>

          <View style={styles.levelContainer}>
            <TouchableOpacity
              style={[
                styles.levelCard,
                selectedDifficulty === 'easy' && styles.selectedCard,
              ]}
              onPress={() => setSelectedDifficulty('easy')}
            >
              <LinearGradient
                colors={selectedDifficulty === 'easy' ? ['#4CAF50', '#81C784'] : ['#fff', '#f0f0f0']}
                style={styles.levelGradient}
              >
                <Text style={styles.levelEmoji}>😊</Text>
                <Text style={[
                  styles.levelTitle,
                  selectedDifficulty === 'easy' && styles.selectedText,
                ]}>
                  Fácil
                </Text>
                <Text style={[
                  styles.levelDescription,
                  selectedDifficulty === 'easy' && styles.selectedText,
                ]}>
                  1-2 sílabas
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.levelCard,
                selectedDifficulty === 'medium' && styles.selectedCard,
              ]}
              onPress={() => setSelectedDifficulty('medium')}
            >
              <LinearGradient
                colors={selectedDifficulty === 'medium' ? ['#FF9800', '#FFB74D'] : ['#fff', '#f0f0f0']}
                style={styles.levelGradient}
              >
                <Text style={styles.levelEmoji}>🤔</Text>
                <Text style={[
                  styles.levelTitle,
                  selectedDifficulty === 'medium' && styles.selectedText,
                ]}>
                  Médio
                </Text>
                <Text style={[
                  styles.levelDescription,
                  selectedDifficulty === 'medium' && styles.selectedText,
                ]}>
                  2-3 sílabas
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.levelCard,
                selectedDifficulty === 'hard' && styles.selectedCard,
              ]}
              onPress={() => setSelectedDifficulty('hard')}
            >
              <LinearGradient
                colors={selectedDifficulty === 'hard' ? ['#F44336', '#E57373'] : ['#fff', '#f0f0f0']}
                style={styles.levelGradient}
              >
                <Text style={styles.levelEmoji}>🚀</Text>
                <Text style={[
                  styles.levelTitle,
                  selectedDifficulty === 'hard' && styles.selectedText,
                ]}>
                  Difícil
                </Text>
                <Text style={[
                  styles.levelDescription,
                  selectedDifficulty === 'hard' && styles.selectedText,
                ]}>
                  3-4 sílabas
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <Button
            title="Começar a Jogar! 🎮"
            onPress={handleStartGame}
            style={styles.startButton}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: 40,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  levelContainer: {
    gap: 15,
    marginBottom: 30,
  },
  levelCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedCard: {
    elevation: 8,
    shadowOpacity: 0.4,
    transform: [{ scale: 1.02 }],
  },
  levelGradient: {
    padding: 20,
    alignItems: 'center',
  },
  levelEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  levelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  levelDescription: {
    fontSize: 16,
    color: '#666',
  },
  selectedText: {
    color: '#fff',
  },
  startButton: {
    marginTop: 20,
  },
});
