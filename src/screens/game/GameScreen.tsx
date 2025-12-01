/**
 * Tela de jogo principal
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { WordCard } from '@/components/game/WordCard';
import { VoiceRecorder } from '@/components/game/VoiceRecorder';
import { FeedbackAnimation } from '@/components/feedback/FeedbackAnimation';
import { Button } from '@/components/common';
import { Colors, Spacing, FontSize, FontWeight, FEEDBACK_MESSAGES } from '@/constants';
import { useNavigation } from '@/hooks/useNavigation';
import { useGameStore } from '@/store/useGameStore';
import { useProfileStore } from '@/store/useProfileStore';
import { getModuleById } from '@/data/gameModules';
import VoiceRecognitionService from '@/services/voice/VoiceRecognitionService';
import AudioService from '@/services/audio/AudioService';
import { AttemptResult, FeedbackType, RootStackParamList } from '@/types';
import { randomItem, generateId } from '@/utils/helpers';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

export function GameScreen() {
  const navigation = useNavigation();
  const route = useRoute<GameScreenRouteProp>();
  const { moduleId } = route.params;

  const { currentProfile } = useProfileStore();
  const { startSession, setCurrentWord, recordAttempt, currentSession, currentWord } =
    useGameStore();

  const [module, setModule] = useState(() => getModuleById(moduleId));
  const [isListening, setIsListening] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{
    result: AttemptResult;
    message: string;
  } | null>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!module || !currentProfile) {
      Alert.alert('Erro', 'Módulo ou perfil não encontrado');
      navigation.goBack();
      return;
    }

    // Inicia a sessão
    startSession(currentProfile.id, module);

    // Define a primeira palavra
    setCurrentWord(module.words[0]);

    return () => {
      VoiceRecognitionService.destroy();
    };
  }, []);

  const handleStartListening = async () => {
    try {
      setIsListening(true);

      await VoiceRecognitionService.startListening(
        result => {
          // Resultado do reconhecimento de voz
          handleVoiceResult(result.recognizedText, result.confidence);
          setIsListening(false);
        },
        error => {
          console.error('Voice recognition error:', error);
          Alert.alert('Erro', 'Não consegui ouvir. Tente novamente!');
          setIsListening(false);
        }
      );
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      Alert.alert('Erro', 'Erro ao iniciar reconhecimento de voz');
      setIsListening(false);
    }
  };

  const handleStopListening = async () => {
    try {
      await VoiceRecognitionService.stopListening();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  const handleVoiceResult = (recognizedText: string, confidence: number) => {
    if (!currentWord || !currentSession) return;

    // Analisa similaridade
    const analysis = VoiceRecognitionService.analyzeSimilarity(
      currentWord.word,
      recognizedText
    );

    // Registra tentativa
    const attempt = {
      id: generateId('attempt'),
      wordId: currentWord.id,
      targetWord: currentWord.word,
      recognizedWord: recognizedText,
      confidence: analysis.confidence,
      result: analysis.result,
      timestamp: new Date(),
      attemptNumber: 1,
      feedbackType: getFeedbackType(analysis.result),
    };

    recordAttempt(attempt);

    // Mostra feedback
    showFeedbackForResult(analysis.result, recognizedText);

    // Toca som
    if (analysis.result === AttemptResult.PERFECT || analysis.result === AttemptResult.GOOD) {
      AudioService.playSoundEffect('success' as any);
    }
  };

  const getFeedbackType = (result: AttemptResult): FeedbackType => {
    switch (result) {
      case AttemptResult.PERFECT:
        return FeedbackType.POSITIVE_REINFORCEMENT;
      case AttemptResult.GOOD:
        return FeedbackType.POSITIVE_REINFORCEMENT;
      case AttemptResult.CLOSE:
        return FeedbackType.SIMILAR_WORD_QUESTION;
      default:
        return FeedbackType.ENCOURAGEMENT;
    }
  };

  const showFeedbackForResult = (result: AttemptResult, recognizedText: string) => {
    let message = '';

    switch (result) {
      case AttemptResult.PERFECT:
        message = randomItem(FEEDBACK_MESSAGES.perfect);
        break;
      case AttemptResult.GOOD:
        message = randomItem(FEEDBACK_MESSAGES.good);
        break;
      case AttemptResult.CLOSE:
        message = `Você disse "${recognizedText}"? Vamos tentar "${currentWord?.word}"!`;
        break;
      default:
        message = randomItem(FEEDBACK_MESSAGES.encouragement);
    }

    setFeedbackData({ result, message });
    setShowFeedback(true);
  };

  const handleFeedbackComplete = () => {
    setShowFeedback(false);
    setFeedbackData(null);

    // Avança para próxima palavra se acertou
    if (
      feedbackData?.result === AttemptResult.PERFECT ||
      feedbackData?.result === AttemptResult.GOOD
    ) {
      handleNextWord();
    }
  };

  const handleNextWord = () => {
    if (!module) return;

    const nextIndex = wordIndex + 1;

    if (nextIndex >= module.words.length) {
      // Finalizou o módulo
      Alert.alert(
        'Parabéns!',
        'Você completou todas as palavras! 🎉',
        [
          {
            text: 'Voltar',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      setWordIndex(nextIndex);
      setCurrentWord(module.words[nextIndex]);
    }
  };

  const handlePlaySound = () => {
    // TODO: Implementar reprodução de áudio
    console.log('Play sound for word:', currentWord?.word);
  };

  if (!module || !currentWord) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {wordIndex + 1} / {module.words.length}
          </Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Palavra atual */}
        <WordCard
          word={currentWord}
          showWord={true}
          onPlaySound={handlePlaySound}
        />

        {/* Gravador de voz */}
        <View style={styles.recorderContainer}>
          <VoiceRecorder
            isListening={isListening}
            onStartListening={handleStartListening}
            onStopListening={handleStopListening}
          />
        </View>

        {/* Dica */}
        {currentWord.hints && currentWord.hints.length > 0 && (
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>💡 {currentWord.hints[0].content}</Text>
          </View>
        )}
      </View>

      {/* Feedback Modal */}
      <Modal
        visible={showFeedback}
        transparent
        animationType="fade"
        onRequestClose={handleFeedbackComplete}>
        <View style={styles.modalOverlay}>
          {feedbackData && (
            <FeedbackAnimation
              result={feedbackData.result}
              message={feedbackData.message}
              onComplete={handleFeedbackComplete}
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },
  progressContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  progressText: {
    fontSize: FontSize.md,
    color: Colors.textOnPrimary,
    fontWeight: FontWeight.bold,
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-around',
  },
  recorderContainer: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  hintContainer: {
    backgroundColor: Colors.infoLight,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  hintText: {
    fontSize: FontSize.md,
    color: Colors.text,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
