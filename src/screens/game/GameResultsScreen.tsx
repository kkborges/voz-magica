/**
 * Tela de Resultados pós-jogo
 * Mostra estatísticas, estrelas, XP e conquistas desbloqueadas
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Button, Card } from '@/components/common';
import { Colors, Spacing, FontSize, FontWeight } from '@/constants';
import { useNavigation } from '@/hooks/useNavigation';
import { useAvatar } from '@/hooks/useAvatar';
import { useAchievementStore } from '@/store/useAchievementStore';
import TTSService from '@/services/audio/TTSService';
import { RootStackParamList } from '@/types';

type ResultsRouteProp = RouteProp<RootStackParamList, 'GameResults'>;

export function GameResultsScreen() {
  const navigation = useNavigation();
  const route = useRoute<ResultsRouteProp>();
  const { avatar, getCelebration } = useAvatar();
  const { recentlyUnlocked, clearRecentlyUnlocked } = useAchievementStore();

  const { wordsAttempted, wordsCorrect, starsEarned, xpEarned } = route.params;
  const accuracy = wordsAttempted > 0 ? Math.round((wordsCorrect / wordsAttempted) * 100) : 0;

  useEffect(() => {
    const celebration = getCelebration();
    TTSService.speak(
      `${celebration} Você acertou ${wordsCorrect} de ${wordsAttempted} palavras e ganhou ${starsEarned} estrelas!`,
    );

    return () => {
      TTSService.stop();
      clearRecentlyUnlocked();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar celebrando */}
        <View style={styles.header}>
          <Text style={styles.avatarEmoji}>{avatar?.emoji || '🎉'}</Text>
          <Text style={styles.title}>{getCelebration()}</Text>
        </View>

        {/* Estatísticas da sessão */}
        <Card style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Palavras tentadas</Text>
            <Text style={styles.statValue}>{wordsAttempted}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Acertos</Text>
            <Text style={styles.statValue}>{wordsCorrect}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Precisão</Text>
            <Text style={[styles.statValue, { color: accuracy >= 70 ? Colors.success : Colors.warning }]}>
              {accuracy}%
            </Text>
          </View>
        </Card>

        {/* Recompensas */}
        <Card style={styles.rewardsCard}>
          <Text style={styles.rewardsTitle}>Recompensas</Text>
          <View style={styles.rewardsRow}>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardEmoji}>⭐</Text>
              <Text style={styles.rewardValue}>+{starsEarned}</Text>
              <Text style={styles.rewardLabel}>Estrelas</Text>
            </View>
            <View style={styles.rewardItem}>
              <Text style={styles.rewardEmoji}>✨</Text>
              <Text style={styles.rewardValue}>+{xpEarned}</Text>
              <Text style={styles.rewardLabel}>XP</Text>
            </View>
          </View>
        </Card>

        {/* Conquistas desbloqueadas */}
        {recentlyUnlocked.length > 0 && (
          <Card style={styles.achievementsCard}>
            <Text style={styles.rewardsTitle}>🏆 Conquistas Desbloqueadas!</Text>
            {recentlyUnlocked.map(achievement => (
              <View key={achievement.id} style={styles.achievementRow}>
                <Text style={styles.achievementIcon}>{achievement.iconUrl}</Text>
                <View style={styles.achievementText}>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                  <Text style={styles.achievementDesc}>{achievement.description}</Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        <Button title="Continuar" onPress={handleContinue} size="large" style={styles.button} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  avatarEmoji: {
    fontSize: 80,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    textAlign: 'center',
  },
  statsCard: {
    marginBottom: Spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  statLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  statValue: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  rewardsCard: {
    marginBottom: Spacing.md,
  },
  rewardsTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  rewardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rewardItem: {
    alignItems: 'center',
  },
  rewardEmoji: {
    fontSize: 40,
  },
  rewardValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  rewardLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  achievementsCard: {
    marginBottom: Spacing.md,
    backgroundColor: Colors.warningLight,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  achievementIcon: {
    fontSize: 36,
    marginRight: Spacing.md,
  },
  achievementText: {
    flex: 1,
  },
  achievementName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  achievementDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  button: {
    marginTop: Spacing.lg,
  },
});
