/**
 * Tela de Progresso
 * Estatísticas, nível, conquistas e progresso por módulo
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/common';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants';
import { useProfileStore } from '@/store/useProfileStore';
import { useAchievementStore } from '@/store/useAchievementStore';
import { useGameProgress } from '@/hooks/useGameProgress';
import { gameModules } from '@/data/gameModules';
import { formatPlayTime, calculateAccuracyRate } from '@/utils/helpers';

export function ProgressScreen() {
  const { currentProfile } = useProfileStore();
  const { achievements, loadAchievements } = useAchievementStore();
  const { level, progress } = useGameProgress();

  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);

  if (!currentProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.emptyText}>Crie um perfil para ver o progresso!</Text>
        </View>
      </SafeAreaView>
    );
  }

  const stats = currentProfile.stats;
  const accuracy = calculateAccuracyRate(stats.totalWordsSuccess, stats.totalWordsAttempted);
  const unlockedAchievements = achievements.filter(a => a.isUnlocked);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Meu Progresso</Text>

        {/* Nível e XP */}
        <Card style={styles.card}>
          <View style={styles.levelRow}>
            <Text style={styles.levelBadge}>Nível {level}</Text>
            <Text style={styles.xpText}>
              {progress.currentXP}/{progress.requiredXP} XP
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress.progress}%` }]} />
          </View>
        </Card>

        {/* Estatísticas gerais */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>⭐</Text>
              <Text style={styles.statNumber}>{stats.starsEarned}</Text>
              <Text style={styles.statLabel}>Estrelas</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>🗣️</Text>
              <Text style={styles.statNumber}>{stats.totalWordsSuccess}</Text>
              <Text style={styles.statLabel}>Palavras</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>🎯</Text>
              <Text style={styles.statNumber}>{Math.round(accuracy)}%</Text>
              <Text style={styles.statLabel}>Precisão</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statNumber}>{stats.currentStreak}</Text>
              <Text style={styles.statLabel}>Sequência</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>⏰</Text>
              <Text style={styles.statNumber}>{formatPlayTime(stats.totalPlayTime)}</Text>
              <Text style={styles.statLabel}>Tempo</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>🏆</Text>
              <Text style={styles.statNumber}>{unlockedAchievements.length}</Text>
              <Text style={styles.statLabel}>Conquistas</Text>
            </View>
          </View>
        </Card>

        {/* Progresso por módulo */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Módulos</Text>
          {gameModules.map(module => {
            const total = module.words.length;
            const completed = module.progress.completedWords.length;
            const percent = total > 0 ? (completed / total) * 100 : 0;
            return (
              <View key={module.id} style={styles.moduleRow}>
                <View style={styles.moduleHeader}>
                  <Text style={styles.moduleName}>{module.name}</Text>
                  <Text style={styles.moduleCount}>
                    {completed}/{total}
                  </Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
                </View>
              </View>
            );
          })}
        </Card>

        {/* Conquistas */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>
            Conquistas ({unlockedAchievements.length}/{achievements.length})
          </Text>
          <View style={styles.achievementsGrid}>
            {achievements.map(achievement => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementBox,
                  !achievement.isUnlocked && styles.achievementLocked,
                ]}>
                <Text style={styles.achievementIcon}>
                  {achievement.isUnlocked ? achievement.iconUrl : '🔒'}
                </Text>
                <Text style={styles.achievementName} numberOfLines={2}>
                  {achievement.name}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },
  content: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  card: {
    marginBottom: Spacing.md,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  levelBadge: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  xpText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: BorderRadius.round,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.round,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statBox: {
    width: '33%',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statEmoji: {
    fontSize: 28,
  },
  statNumber: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  moduleRow: {
    marginBottom: Spacing.md,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  moduleName: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: FontWeight.medium,
  },
  moduleCount: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  achievementBox: {
    width: '25%',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  achievementLocked: {
    opacity: 0.4,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  achievementName: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
