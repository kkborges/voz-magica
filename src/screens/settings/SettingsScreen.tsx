/**
 * Tela de Configurações
 * Áudio, acessibilidade e gerenciamento de perfil
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/common';
import { Colors, Spacing, FontSize, FontWeight } from '@/constants';
import { useNavigation } from '@/hooks/useNavigation';
import { useProfileStore } from '@/store/useProfileStore';
import TTSService from '@/services/audio/TTSService';
import { getAvatarEmoji } from '@/data/avatars';

export function SettingsScreen() {
  const navigation = useNavigation();
  const { currentProfile, updateProfile, deleteProfile } = useProfileStore();

  if (!currentProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.emptyText}>Nenhum perfil ativo</Text>
        </View>
      </SafeAreaView>
    );
  }

  const settings = currentProfile.settings;

  const updateSetting = async <K extends keyof typeof settings>(
    key: K,
    value: (typeof settings)[K],
  ) => {
    await updateProfile({
      ...currentProfile,
      settings: { ...settings, [key]: value },
    });
  };

  const handleSpeedChange = async (speed: number) => {
    await updateSetting('speechSpeed', speed);
    await TTSService.updateConfig({ rate: speed * 0.45 });
    TTSService.speak('Olá! Esta é a velocidade da minha voz!');
  };

  const handleSensitivityChange = async (value: number) => {
    await updateSetting('microphoneSensitivity', value);
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      'Apagar Perfil',
      `Tem certeza que deseja apagar o perfil de ${currentProfile.name}? Todo o progresso será perdido.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            await deleteProfile(currentProfile.id);
            navigation.navigate('Onboarding');
          },
        },
      ],
    );
  };

  const speedOptions = [
    { label: 'Devagar', value: 0.7 },
    { label: 'Normal', value: 1.0 },
    { label: 'Rápido', value: 1.3 },
  ];

  const sensitivityOptions = [
    { label: 'Fácil', value: 50 },
    { label: 'Normal', value: 70 },
    { label: 'Preciso', value: 85 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Configurações</Text>

        {/* Áudio */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>🔊 Áudio e Voz</Text>

          <Text style={styles.settingLabel}>Velocidade da fala</Text>
          <View style={styles.optionsRow}>
            {speedOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  settings.speechSpeed === option.value && styles.optionSelected,
                ]}
                onPress={() => handleSpeedChange(option.value)}>
                <Text
                  style={[
                    styles.optionText,
                    settings.speechSpeed === option.value && styles.optionTextSelected,
                  ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.settingLabel}>Sensibilidade do microfone</Text>
          <Text style={styles.settingHint}>
            "Fácil" aceita pronúncias menos precisas — ideal para começar
          </Text>
          <View style={styles.optionsRow}>
            {sensitivityOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionButton,
                  settings.microphoneSensitivity === option.value && styles.optionSelected,
                ]}
                onPress={() => handleSensitivityChange(option.value)}>
                <Text
                  style={[
                    styles.optionText,
                    settings.microphoneSensitivity === option.value && styles.optionTextSelected,
                  ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Acessibilidade */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>♿ Acessibilidade</Text>

          <View style={styles.switchRow}>
            <Text style={styles.settingLabel}>Alto contraste</Text>
            <Switch
              value={settings.highContrast}
              onValueChange={value => updateSetting('highContrast', value)}
              trackColor={{ true: Colors.primary }}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.settingLabel}>Modo daltônico</Text>
            <Switch
              value={settings.colorBlindMode}
              onValueChange={value => updateSetting('colorBlindMode', value)}
              trackColor={{ true: Colors.primary }}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.settingLabel}>Notificações</Text>
            <Switch
              value={settings.enableNotifications}
              onValueChange={value => updateSetting('enableNotifications', value)}
              trackColor={{ true: Colors.primary }}
            />
          </View>
        </Card>

        {/* Perfil */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>👤 Perfil</Text>
          <View style={styles.profileRow}>
            <Text style={styles.profileAvatar}>{getAvatarEmoji(currentProfile.avatarId)}</Text>
            <View>
              <Text style={styles.profileName}>{currentProfile.name}</Text>
              <Text style={styles.profileAge}>Faixa etária: {currentProfile.ageGroup} anos</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteProfile}>
            <Text style={styles.dangerButtonText}>Apagar perfil</Text>
          </TouchableOpacity>
        </Card>

        {/* Painel dos Pais */}
        <Card style={styles.card}>
          <TouchableOpacity
            style={styles.parentButton}
            onPress={() => navigation.navigate('ParentDashboard')}>
            <Text style={styles.parentButtonText}>👨‍👩‍👧 Painel dos Pais</Text>
            <Text style={styles.parentButtonHint}>Protegido por PIN</Text>
          </TouchableOpacity>
        </Card>

        {/* Sobre */}
        <Text style={styles.version}>Voz Mágica v1.0.0</Text>
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
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  settingLabel: {
    fontSize: FontSize.md,
    color: Colors.text,
    marginBottom: Spacing.sm,
    fontWeight: FontWeight.medium,
  },
  settingHint: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  optionsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  optionButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    backgroundColor: Colors.surface,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.successLight,
  },
  optionText: {
    fontSize: FontSize.sm,
    color: Colors.text,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  profileAvatar: {
    fontSize: 50,
    marginRight: Spacing.md,
  },
  profileName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  profileAge: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  dangerButton: {
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.error,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: Colors.error,
    fontWeight: FontWeight.semibold,
  },
  parentButton: {
    alignItems: 'center',
    padding: Spacing.sm,
  },
  parentButtonText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  parentButtonHint: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  version: {
    textAlign: 'center',
    color: Colors.textDisabled,
    fontSize: FontSize.sm,
    marginVertical: Spacing.lg,
  },
});
