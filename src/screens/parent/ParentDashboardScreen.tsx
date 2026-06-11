/**
 * Painel dos Pais
 * Protegido por PIN - relatórios de progresso da criança
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '@/components/common';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants';
import { useNavigation } from '@/hooks/useNavigation';
import { useProfileStore } from '@/store/useProfileStore';
import StorageService from '@/services/storage/StorageService';
import { GameSession, AttemptResult } from '@/types';
import { formatPlayTime, calculateAccuracyRate } from '@/utils/helpers';
import { getAvatarEmoji } from '@/data/avatars';

const DEFAULT_PIN = '1234'; // TODO: Configurável no primeiro acesso

export function ParentDashboardScreen() {
  const navigation = useNavigation();
  const { currentProfile } = useProfileStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [sessions, setSessions] = useState<GameSession[]>([]);

  useEffect(() => {
    if (isAuthenticated && currentProfile) {
      StorageService.getSessionsByProfile(currentProfile.id).then(setSessions);
    }
  }, [isAuthenticated, currentProfile]);

  const handlePinSubmit = () => {
    if (pin === DEFAULT_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin('');
    }
  };

  // ===== Tela de PIN =====
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.pinContainer}>
          <Text style={styles.pinIcon}>🔒</Text>
          <Text style={styles.pinTitle}>Área dos Pais</Text>
          <Text style={styles.pinSubtitle}>Digite o PIN para acessar</Text>

          <TextInput
            style={[styles.pinInput, pinError && styles.pinInputError]}
            value={pin}
            onChangeText={setPin}
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
            placeholder="• • • •"
            placeholderTextColor={Colors.textDisabled}
          />

          {pinError && <Text style={styles.pinErrorText}>PIN incorreto. Tente novamente.</Text>}
          <Text style={styles.pinHint}>PIN padrão: 1234</Text>

          <Button title="Entrar" onPress={handlePinSubmit} size="large" style={styles.pinButton} />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backLink}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ===== Dashboard =====
  if (!currentProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.pinContainer}>
          <Text style={styles.pinSubtitle}>Nenhum perfil ativo</Text>
        </View>
      </SafeAreaView>
    );
  }

  const stats = currentProfile.stats;
  const accuracy = calculateAccuracyRate(stats.totalWordsSuccess, stats.totalWordsAttempted);

  // Análise de fonemas com dificuldade (palavras erradas mais frequentes)
  const failedWords: Record<string, number> = {};
  sessions.forEach(session => {
    session.attempts.forEach(attempt => {
      if (
        attempt.result === AttemptResult.INCORRECT ||
        attempt.result === AttemptResult.CLOSE
      ) {
        failedWords[attempt.targetWord] = (failedWords[attempt.targetWord] || 0) + 1;
      }
    });
  });
  const difficultWords = Object.entries(failedWords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const recentSessions = [...sessions]
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, 10);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Painel dos Pais</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backLink}>Fechar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          Acompanhamento de {currentProfile.name} {getAvatarEmoji(currentProfile.avatarId)}
        </Text>

        {/* Resumo */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>📊 Resumo Geral</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{stats.totalWordsAttempted}</Text>
              <Text style={styles.summaryLabel}>Tentativas</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{stats.totalWordsSuccess}</Text>
              <Text style={styles.summaryLabel}>Acertos</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{Math.round(accuracy)}%</Text>
              <Text style={styles.summaryLabel}>Precisão</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{formatPlayTime(stats.totalPlayTime)}</Text>
              <Text style={styles.summaryLabel}>Tempo total</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{stats.currentStreak} dias</Text>
              <Text style={styles.summaryLabel}>Sequência</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{sessions.length}</Text>
              <Text style={styles.summaryLabel}>Sessões</Text>
            </View>
          </View>
        </Card>

        {/* Palavras com dificuldade */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>🎯 Palavras que Precisam de Prática</Text>
          {difficultWords.length === 0 ? (
            <Text style={styles.emptyHint}>
              Nenhuma dificuldade identificada ainda. Continue praticando!
            </Text>
          ) : (
            difficultWords.map(([word, count]) => (
              <View key={word} style={styles.difficultRow}>
                <Text style={styles.difficultWord}>{word}</Text>
                <Text style={styles.difficultCount}>{count} erros</Text>
              </View>
            ))
          )}
          <Text style={styles.tipText}>
            💡 Dica: pratique essas palavras junto com a criança, dividindo em sílabas
            e pronunciando devagar.
          </Text>
        </Card>

        {/* Histórico de sessões */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>📅 Sessões Recentes</Text>
          {recentSessions.length === 0 ? (
            <Text style={styles.emptyHint}>Nenhuma sessão registrada ainda.</Text>
          ) : (
            recentSessions.map(session => {
              const date = new Date(session.startedAt);
              const correct = session.attempts.filter(
                a => a.result === AttemptResult.PERFECT || a.result === AttemptResult.GOOD,
              ).length;
              return (
                <View key={session.id} style={styles.sessionRow}>
                  <Text style={styles.sessionDate}>
                    {date.toLocaleDateString('pt-BR')} às{' '}
                    {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                  <Text style={styles.sessionStats}>
                    {correct}/{session.attempts.length} acertos · {session.starsEarned} ⭐
                  </Text>
                </View>
              );
            })
          )}
        </Card>

        {/* Orientações */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>📖 Orientações</Text>
          <Text style={styles.guidanceText}>
            • Este app é uma ferramenta de APOIO e não substitui o acompanhamento
            fonoaudiológico profissional.{'\n\n'}
            • Recomendamos sessões de 10-15 minutos por dia.{'\n\n'}
            • Celebre cada conquista da criança, mesmo as pequenas.{'\n\n'}
            • Se notar dificuldades persistentes em fonemas específicos, compartilhe
            este relatório com um fonoaudiólogo.
          </Text>
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
  pinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  pinIcon: {
    fontSize: 60,
    marginBottom: Spacing.md,
  },
  pinTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  pinSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  pinInput: {
    width: 200,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSize.xxl,
    textAlign: 'center',
    letterSpacing: 8,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  pinInputError: {
    borderColor: Colors.error,
  },
  pinErrorText: {
    color: Colors.error,
    marginTop: Spacing.sm,
  },
  pinHint: {
    color: Colors.textDisabled,
    fontSize: FontSize.xs,
    marginTop: Spacing.sm,
  },
  pinButton: {
    marginTop: Spacing.xl,
    width: 200,
  },
  backLink: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    marginTop: Spacing.lg,
  },
  content: {
    padding: Spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  card: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  summaryItem: {
    width: '33%',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  summaryValue: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  summaryLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  difficultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  difficultWord: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  difficultCount: {
    fontSize: FontSize.sm,
    color: Colors.error,
  },
  emptyHint: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  tipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    backgroundColor: Colors.infoLight,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  sessionRow: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sessionDate: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: FontWeight.medium,
  },
  sessionStats: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  guidanceText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
