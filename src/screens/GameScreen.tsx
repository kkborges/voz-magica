import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/Button';
import { WordCard } from '../components/WordCard';
import { StarRating } from '../components/StarRating';
import { RootStackParamList } from '../../App';
import { getRandomWord } from '../data/words';
import { VoiceService } from '../services/voiceService';
import { FeedbackService } from '../services/feedbackService';
import { Word, FeedbackResult } from '../types';

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;

interface Props {
  navigation: GameScreenNavigationProp;
}

export default function GameScreen({ navigation }: Props) {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [showSyllables, setShowSyllables] = useState(false);
  const [totalStars, setTotalStars] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [micScale] = useState(new Animated.Value(1));

  useEffect(() => {
    loadNewWord();
    initializeVoiceService();

    return () => {
      VoiceService.destroy();
    };
  }, []);

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(micScale, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(micScale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      micScale.setValue(1);
    }
  }, [isListening]);

  const initializeVoiceService = async () => {
    try {
      await VoiceService.initialize();
    } catch (error) {
      console.error('Failed to initialize voice service:', error);
    }
  };

  const loadNewWord = () => {
    const word = getRandomWord('easy');
    setCurrentWord(word);
    setFeedback(null);
    setShowSyllables(false);
  };

  const handleListenWord = async () => {
    if (currentWord) {
      await FeedbackService.speakWord(currentWord.text);
    }
  };

  const handleListenSyllables = async () => {
    if (currentWord) {
      setShowSyllables(true);
      await FeedbackService.speakSyllables(currentWord.syllables);
    }
  };

  const handleStartRecording = async () => {
    try {
      setIsListening(true);
      setFeedback(null);

      await VoiceService.startListening((spokenText: string) => {
        handleVoiceResult(spokenText);
      });

      // Auto-stop após 3 segundos
      setTimeout(() => {
        if (isListening) {
          handleStopRecording();
        }
      }, 3000);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsListening(false);
    }
  };

  const handleStopRecording = async () => {
    try {
      await VoiceService.stopListening();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping recording:', error);
      setIsListening(false);
    }
  };

  const handleVoiceResult = async (spokenText: string) => {
    if (!currentWord) return;

    await VoiceService.stopListening();
    setIsListening(false);

    const accuracy = VoiceService.comparePronunciation(spokenText, currentWord.text);
    const feedbackResult = FeedbackService.calculateFeedback(accuracy);

    setFeedback(feedbackResult);

    if (feedbackResult.success) {
      setTotalStars(totalStars + feedbackResult.stars);
      setWordsCompleted(wordsCompleted + 1);
    }

    await FeedbackService.provideAudioFeedback(
      feedbackResult.success,
      feedbackResult.message
    );
  };

  const handleNextWord = () => {
    loadNewWord();
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  if (!currentWord) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoHome} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Palavras</Text>
              <Text style={styles.statValue}>{wordsCompleted}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Estrelas</Text>
              <Text style={styles.statValue}>⭐ {totalStars}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <WordCard word={currentWord} showSyllables={showSyllables} />

          <View style={styles.actionsContainer}>
            <Button
              title="🔊 Ouvir Palavra"
              onPress={handleListenWord}
              variant="secondary"
              style={styles.actionButton}
            />

            <Button
              title="🎵 Ouvir Sílabas"
              onPress={handleListenSyllables}
              variant="secondary"
              style={styles.actionButton}
            />
          </View>

          <View style={styles.recordingContainer}>
            <Text style={styles.instructionText}>
              {isListening ? 'Fale agora!' : 'Toque no microfone para falar'}
            </Text>

            <TouchableOpacity
              onPress={isListening ? handleStopRecording : handleStartRecording}
              disabled={isListening}
              activeOpacity={0.8}
            >
              <Animated.View
                style={[
                  styles.micButton,
                  isListening && styles.micButtonActive,
                  { transform: [{ scale: micScale }] },
                ]}
              >
                <Text style={styles.micIcon}>🎤</Text>
              </Animated.View>
            </TouchableOpacity>

            {isListening && (
              <Text style={styles.listeningText}>Ouvindo...</Text>
            )}
          </View>

          {feedback && (
            <View style={styles.feedbackContainer}>
              <LinearGradient
                colors={feedback.success ? ['#4CAF50', '#81C784'] : ['#FF9800', '#FFB74D']}
                style={styles.feedbackGradient}
              >
                <Text style={styles.feedbackEmoji}>
                  {feedback.success ? '🎉' : '💪'}
                </Text>
                <Text style={styles.feedbackMessage}>{feedback.message}</Text>
                <StarRating stars={feedback.stars} />
                <Text style={styles.accuracyText}>
                  Precisão: {feedback.accuracy}%
                </Text>

                <Button
                  title="Próxima Palavra →"
                  onPress={handleNextWord}
                  style={styles.nextButton}
                />
              </LinearGradient>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    color: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    marginBottom: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  statLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  actionsContainer: {
    marginTop: 20,
    gap: 10,
  },
  actionButton: {
    marginVertical: 5,
  },
  recordingContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  micButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  micButtonActive: {
    backgroundColor: '#FF6B9D',
  },
  micIcon: {
    fontSize: 50,
  },
  listeningText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  feedbackContainer: {
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  feedbackGradient: {
    padding: 20,
    alignItems: 'center',
  },
  feedbackEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  feedbackMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  accuracyText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    marginBottom: 20,
  },
  nextButton: {
    marginTop: 10,
    minWidth: 200,
  },
});
