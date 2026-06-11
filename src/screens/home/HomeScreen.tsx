/**
 * Tela principal - Seleção de módulos
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/common';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants';
import { useNavigation } from '@/hooks/useNavigation';
import { useProfileStore } from '@/store/useProfileStore';
import { gameModules } from '@/data/gameModules';
import { getAvatarEmoji } from '@/data/avatars';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.lg * 3) / 2;

const MODULE_ICONS: Record<string, string> = {
  module_animals: '🦁',
  module_objects: '🧸',
  module_colors: '🌈',
  module_numbers: '🔢',
  module_actions: '🏃',
  module_foods: '🍰',
  module_body: '🙋',
};

export function HomeScreen() {
  const navigation = useNavigation();
  const { currentProfile, loadProfiles } = useProfileStore();

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const handleModulePress = (moduleId: string) => {
    navigation.navigate('Game', { moduleId });
  };

  if (!currentProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Carregando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {currentProfile.name}!</Text>
            <Text style={styles.subtitle}>O que vamos aprender hoje?</Text>
          </View>
          <Text style={styles.avatar}>{getAvatarEmoji(currentProfile.avatarId)}</Text>
        </View>

        {/* Stats */}
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{currentProfile.stats.starsEarned}</Text>
              <Text style={styles.statLabel}>⭐ Estrelas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{currentProfile.stats.level}</Text>
              <Text style={styles.statLabel}>🎯 Nível</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{currentProfile.stats.currentStreak}</Text>
              <Text style={styles.statLabel}>🔥 Sequência</Text>
            </View>
          </View>
        </Card>

        {/* Módulos */}
        <View style={styles.modulesSection}>
          <Text style={styles.sectionTitle}>Escolha um jogo</Text>
          <View style={styles.modulesGrid}>
            {gameModules.map(module => (
              <TouchableOpacity
                key={module.id}
                style={[styles.moduleCard, !module.isUnlocked && styles.moduleCardLocked]}
                onPress={() => module.isUnlocked && handleModulePress(module.id)}
                disabled={!module.isUnlocked}>
                <Card style={styles.moduleContent}>
                  <Text style={styles.moduleIcon}>{MODULE_ICONS[module.id] || '🎮'}</Text>
                  <Text style={styles.moduleName}>{module.name}</Text>
                  <Text style={styles.moduleDescription}>{module.description}</Text>

                  {/* Progress */}
                  <View style={styles.moduleProgress}>
                    <Text style={styles.progressText}>
                      {module.progress.completedWords.length}/{module.words.length} palavras
                    </Text>
                    <View style={styles.starsContainer}>
                      {[1, 2, 3].map(star => (
                        <Text
                          key={star}
                          style={[
                            styles.star,
                            module.progress.stars >= star && styles.starFilled,
                          ]}>
                          ⭐
                        </Text>
                      ))}
                    </View>
                  </View>

                  {!module.isUnlocked && (
                    <View style={styles.lockedOverlay}>
                      <Text style={styles.lockedIcon}>🔒</Text>
                    </View>
                  )}
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  avatar: {
    fontSize: 60,
  },
  statsCard: {
    marginBottom: Spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  modulesSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleCard: {
    width: CARD_WIDTH,
    marginBottom: Spacing.md,
  },
  moduleCardLocked: {
    opacity: 0.6,
  },
  moduleContent: {
    padding: Spacing.md,
    alignItems: 'center',
    minHeight: 200,
  },
  moduleIcon: {
    fontSize: 50,
    marginBottom: Spacing.sm,
  },
  moduleName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  moduleDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  moduleProgress: {
    width: '100%',
    marginTop: 'auto',
  },
  progressText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    fontSize: 16,
    opacity: 0.3,
  },
  starFilled: {
    opacity: 1,
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
  },
  lockedIcon: {
    fontSize: 40,
  },
  comingSoon: {
    backgroundColor: Colors.surfaceVariant,
    justifyContent: 'center',
  },
  comingSoonText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
    marginTop: Spacing.sm,
  },
  loadingText: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },
});
