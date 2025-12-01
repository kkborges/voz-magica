/**
 * Tela de criação de perfil da criança
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '@/components/common';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants';
import { useNavigation } from '@/hooks/useNavigation';
import { useProfileStore } from '@/store/useProfileStore';
import { AgeGroup, FontSize as ProfileFontSize, VoiceType } from '@/types';
import { generateId } from '@/utils/helpers';

const AVATARS = ['🦁', '🐯', '🐻', '🐼', '🐨', '🐸', '🦊', '🐱'];

export function CreateProfileScreen() {
  const navigation = useNavigation();
  const { addProfile, setCurrentProfile } = useProfileStore();

  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>(AgeGroup.FOUR_TO_FIVE);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Ops!', 'Por favor, digite o nome da criança');
      return;
    }

    const newProfile = {
      id: generateId('profile'),
      name: name.trim(),
      avatarId: selectedAvatar,
      ageGroup: selectedAgeGroup,
      createdAt: new Date(),
      lastActiveAt: new Date(),
      settings: {
        microphoneSensitivity: 70,
        speechSpeed: 1.0,
        voiceType: VoiceType.FEMALE_FRIENDLY,
        enableNotifications: true,
        dailyGoal: 15,
        colorBlindMode: false,
        highContrast: false,
        fontSize: ProfileFontSize.MEDIUM,
      },
      stats: {
        totalWordsAttempted: 0,
        totalWordsSuccess: 0,
        totalPlayTime: 0,
        currentStreak: 0,
        longestStreak: 0,
        starsEarned: 0,
        level: 1,
        experiencePoints: 0,
      },
    };

    await addProfile(newProfile);
    await setCurrentProfile(newProfile.id);

    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Criar Perfil</Text>
          <Text style={styles.subtitle}>Vamos conhecer você!</Text>
        </View>

        {/* Nome */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Qual é o seu nome?</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome aqui"
            placeholderTextColor={Colors.textDisabled}
            value={name}
            onChangeText={setName}
            maxLength={20}
            autoCapitalize="words"
          />
        </Card>

        {/* Avatar */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha seu avatar!</Text>
          <View style={styles.avatarGrid}>
            {AVATARS.map(avatar => (
              <TouchableOpacity
                key={avatar}
                style={[
                  styles.avatarOption,
                  selectedAvatar === avatar && styles.avatarOptionSelected,
                ]}
                onPress={() => setSelectedAvatar(avatar)}>
                <Text style={styles.avatarEmoji}>{avatar}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Idade */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Quantos anos você tem?</Text>
          <View style={styles.ageGroup}>
            <TouchableOpacity
              style={[
                styles.ageOption,
                selectedAgeGroup === AgeGroup.FOUR_TO_FIVE && styles.ageOptionSelected,
              ]}
              onPress={() => setSelectedAgeGroup(AgeGroup.FOUR_TO_FIVE)}>
              <Text
                style={[
                  styles.ageText,
                  selectedAgeGroup === AgeGroup.FOUR_TO_FIVE && styles.ageTextSelected,
                ]}>
                4-5 anos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.ageOption,
                selectedAgeGroup === AgeGroup.SIX_TO_EIGHT && styles.ageOptionSelected,
              ]}
              onPress={() => setSelectedAgeGroup(AgeGroup.SIX_TO_EIGHT)}>
              <Text
                style={[
                  styles.ageText,
                  selectedAgeGroup === AgeGroup.SIX_TO_EIGHT && styles.ageTextSelected,
                ]}>
                6-8 anos
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Botão */}
        <Button
          title="Criar Perfil"
          onPress={handleCreate}
          size="large"
          style={styles.button}
        />
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
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSize.lg,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarOption: {
    width: '22%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 3,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.surface,
  },
  avatarOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.successLight,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  ageGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ageOption: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    backgroundColor: Colors.surface,
  },
  ageOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.successLight,
  },
  ageText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.medium,
    color: Colors.text,
  },
  ageTextSelected: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  button: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
});
