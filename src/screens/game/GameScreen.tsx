/**
 * Tela de jogo principal
 * Fluxo: estímulo (TTS) → resposta (voz) → análise → feedback inteligente
 */

import React, { useState, useEffect, useRef } from 'react';
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
import { Colors, Spacing, FontSize, FontWeight } from '@/constants';
import { useNavigation } from '@/hooks/useNavigation';
import { useGameStore } from '@/store/useGameStore';
import { useProfileStore } from '@/store/useProfileStore';
import { useAchievementStore } from '@/store/useAchievementStore';
import { getModuleById } from '@/data/gameModules';
import VoiceRecognitionService from '@/services/voice/VoiceRecognitionService';
import FeedbackStrategySelector, { FeedbackPlan } from '@/services/feedback/FeedbackStrategySelector';
import TTSService from '@/services/audio/TTSService';
import { AttemptResult, RootStackParamList } from '@/types';
import { generateId } from '@/utils/helpers';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

export function GameScreen() {
  const navigation = useNavigation();
  const route = useRoute<GameScreenRouteProp>();
  const { moduleId } = route.params;

  const { currentProfile, updateProfile } = useProfileStore();
  const { startSession, endSession, setCurrentWord, recordAttempt, currentSession, currentWord } =
    useGameStore();
  const { checkAchievements } = useAchievementStore();

  const [module] = useState(() => getModuleById(moduleId));
  const [isListening, setIsListening] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackPlan, setFeedbackPlan] = useState<FeedbackPlan | null>(null);
  const [feedbackResult, setFeedbackResult] = useState<AttemptResult>(AttemptResult.PERFECT);
  const [wordIndex, setWordIndex] = useState(0);
  const [attemptOnWord, setAttemptOnWord] = useState(0);

  // Estatísticas da sessão (acumuladas localmente)
  const sessionStats = useRef({
    wordsAttempted: 0,
    wordsCorrect: 0,
    starsEarned: 0,
    xpEarned: 0,
    perfectCount: 0,
    startTime: Date.now(),
  });

  useEffect(() => {
    if (!module || !currentProfile) {
      Alert.alert('Erro', 'Módulo ou perfil não encontrado');
      navigation.goBack();
      return;
    }

    TTSService.initialize();
    startSession(currentProfile.id, module);
    setCurrentWord(module.words[0]);

    // Apresenta a primeira palavra com voz
    setTimeout(() => {
      FeedbackStrategySelector.presentWord(module.words[0]);
    }, 800);

    return () => {
      VoiceRecognitionService.destroy();
      TTSService.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartListening = async () => {
    try {
      await TTSService.stop(); // Para a voz do app antes de ouvir
      setIsListening(true);

      await VoiceRecognitionService.startListening(
        result => {
          handleVoiceResult(result.recognizedText);
          setIsListening(false);
        },
        error => {
          console.error('Voice recognition error:', error);
          setIsListening(false);
          TTSService.speak('Não consegui te ouvir. Vamos tentar de novo?');
        },
      );
    } catch (error) {
      console.error('Error starting voice recognition:', error);
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

  const handleVoiceResult = (recognizedText: string) => {
    if (!currentWord || !currentSession || !currentProfile) return;

    const analysis = VoiceRecognitionService.analyzeSimilarity(currentWord.word, recognizedText);
    const newAttemptNumber = attemptOnWord + 1;
    setAttemptOnWord(newAttemptNumber);

    // Seleciona estratégia de feedback baseada no avatar e tentativa
    const plan = FeedbackStrategySelector.selectStrategy(
      analysis.result,
      currentWord,
      newAttemptNumber,
      currentProfile.avatarId,
      recognizedText,
    );

    // Registra a tentativa
    recordAttempt({
      id: generateId('attempt'),
      wordId: currentWord.id,
      targetWord: currentWord.word,
      recognizedWord: recognizedText,
      confidence: analysis.confidence,
      result: analysis.result,
      timestamp: new Date(),
      attemptNumber: newAttemptNumber,
      feedbackType: plan.type,
    });

    // Acumula estatísticas
    const stats = sessionStats.current;
    stats.wordsAttempted += 1;
    stats.starsEarned += plan.starsAwarded;
    stats.xpEarned += plan.xpAwarded;
    if (analysis.result === AttemptResult.PERFECT) {
      stats.perfectCount += 1;
      stats.wordsCorrect += 1;
    } else if (analysis.result === AttemptResult.GOOD) {
      stats.wordsCorrect += 1;
    }

    // Entrega feedback (visual + voz)
    setFeedbackResult(analysis.result);
    setFeedbackPlan(plan);
    setShowFeedback(true);
    FeedbackStrategySelector.deliverSpokenFeedback(plan, currentWord);
  };

  const handleFeedbackComplete = () => {
    const plan = feedbackPlan;
    setShowFeedback(false);
    setFeedbackPlan(null);

    if (plan?.shouldAdvance) {
      handleNextWord();
    }
  };

  const handleNextWord = async () => {
    if (!module) return;

    const nextIndex = wordIndex + 1;
    setAttemptOnWord(0);

    if (nextIndex >= module.words.length) {
      await finishSession();
    } else {
      setWordIndex(nextIndex);
      setCurrentWord(module.words[nextIndex]);

      // Apresenta próxima palavra com voz
      setTimeout(() => {
        FeedbackStrategySelector.presentWord(module.words[nextIndex]);
      }, 500);
    }
  };

  const finishSession = async () => {
    const stats = sessionStats.current;
    const playTimeMinutes = Math.max(1, Math.round((Date.now() - stats.startTime) / 60000));

    // Atualiza perfil com estatísticas acumuladas
    if (currentProfile) {
      const updatedProfile = {
        ...currentProfile,
        lastActiveAt: new Date(),
        stats: {
          ...currentProfile.stats,
          totalWordsAttempted: currentProfile.stats.totalWordsAttempted + stats.wordsAttempted,
          totalWordsSuccess: currentProfile.stats.totalWordsSuccess + stats.wordsCorrect,
          totalPlayTime: currentProfile.stats.totalPlayTime + playTimeMinutes,
          starsEarned: currentProfile.stats.starsEarned + stats.starsEarned,
          experiencePoints: currentProfile.stats.experiencePoints + stats.xpEarned,
        },
      };
      await updateProfile(updatedProfile);

      // Verifica conquistas desbloqueadas
      await checkAchievements(updatedProfile.stats, stats.perfectCount);
    }

    await endSession();

    navigation.navigate('GameResults', {
      wordsAttempted: stats.wordsAttempted,
      wordsCorrect: stats.wordsCorrect,
      starsEarned: stats.starsEarned,
      xpEarned: stats.xpEarned,
    });
  };

  const handlePlaySound = () => {
    if (currentWord) {
      TTSService.speakWordSlowly(currentWord.word);
    }
  };

  const handleExit = () => {
    Alert.alert('Sair do jogo?', 'Seu progresso nesta sessão será salvo.', [
      { text: 'Continuar jogando', style: 'cancel' },
      { text: 'Sair', onPress: finishSession },
    ]);
  };

  if (!module || !currentWord) {
    return null;
  }

  const showSyllableHelp = feedbackPlan?.showSyllables && showFeedback;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleExit}>
          <Text style={styles.backButton}>← Sair</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {wordIndex + 1} / {module.words.length}
          </Text>
        </View>
        <View style={styles.starsBadge}>
          <Text style={styles.starsText}>⭐ {sessionStats.current.starsEarned}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <WordCard word={currentWord} showWord={true} onPlaySound={handlePlaySound} />

        <View style={styles.recorderContainer}>
          <VoiceRecorder
            isListening={isListening}
            onStartListening={handleStartListening}
            onStopListening={handleStopListening}
            disabled={showFeedback}
          />
        </View>

        {currentWord.hints && currentWord.hints.length > 0 && (
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>
              💡 {currentWord.hints.find(h => h.type === 'context')?.content}
            </Text>
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
          {feedbackPlan && (
            <View style={styles.feedbackContainer}>
              <FeedbackAnimation
                result={feedbackResult}
                message={feedbackPlan.message}
                onComplete={handleFeedbackComplete}
              />
              {showSyllableHelp && (
                <View style={styles.syllableContainer}>
                  {currentWord.syllables.map((syllable, index) => (
                    <View key={index} style={styles.syllableBox}>
                      <Text style={styles.syllableText}>{syllable}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
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
  starsBadge: {
    backgroundColor: Colors.warningLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  starsText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-around',
  },
  recorderContainer: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
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
  feedbackContainer: {
    alignItems: 'center',
  },
  syllableContainer: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
  },
  syllableBox: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    marginHorizontal: Spacing.xs,
    borderWidth: 3,
    borderColor: Colors.accent,
  },
  syllableText: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
});
