/**
 * Serviço de armazenamento local
 * Responsável por persistir dados do aplicativo
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ChildProfile,
  GameSession,
  ParentAccount,
  Achievement,
  CustomWordList,
  ExercisePlan,
} from '@/types';

class StorageService {
  private readonly KEYS = {
    PROFILES: '@voz_magica:profiles',
    CURRENT_PROFILE: '@voz_magica:current_profile',
    PARENT_ACCOUNT: '@voz_magica:parent_account',
    SESSIONS: '@voz_magica:sessions',
    ACHIEVEMENTS: '@voz_magica:achievements',
    CUSTOM_LISTS: '@voz_magica:custom_lists',
    EXERCISE_PLANS: '@voz_magica:exercise_plans',
    SETTINGS: '@voz_magica:settings',
    ONBOARDING_COMPLETED: '@voz_magica:onboarding_completed',
  };

  /**
   * Salva um item no storage
   */
  private async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  }

  /**
   * Recupera um item do storage
   */
  private async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      throw error;
    }
  }

  /**
   * Remove um item do storage
   */
  private async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  // ==================== Perfis ====================

  /**
   * Salva todos os perfis
   */
  async saveProfiles(profiles: ChildProfile[]): Promise<void> {
    await this.setItem(this.KEYS.PROFILES, profiles);
  }

  /**
   * Recupera todos os perfis
   */
  async getProfiles(): Promise<ChildProfile[]> {
    const profiles = await this.getItem<ChildProfile[]>(this.KEYS.PROFILES);
    return profiles || [];
  }

  /**
   * Adiciona um novo perfil
   */
  async addProfile(profile: ChildProfile): Promise<void> {
    const profiles = await this.getProfiles();
    profiles.push(profile);
    await this.saveProfiles(profiles);
  }

  /**
   * Atualiza um perfil
   */
  async updateProfile(profile: ChildProfile): Promise<void> {
    const profiles = await this.getProfiles();
    const index = profiles.findIndex(p => p.id === profile.id);

    if (index !== -1) {
      profiles[index] = profile;
      await this.saveProfiles(profiles);
    }
  }

  /**
   * Remove um perfil
   */
  async deleteProfile(profileId: string): Promise<void> {
    const profiles = await this.getProfiles();
    const filtered = profiles.filter(p => p.id !== profileId);
    await this.saveProfiles(filtered);
  }

  /**
   * Define o perfil atual
   */
  async setCurrentProfile(profileId: string): Promise<void> {
    await this.setItem(this.KEYS.CURRENT_PROFILE, profileId);
  }

  /**
   * Recupera o perfil atual
   */
  async getCurrentProfile(): Promise<string | null> {
    return await this.getItem<string>(this.KEYS.CURRENT_PROFILE);
  }

  // ==================== Conta dos Pais ====================

  /**
   * Salva conta dos pais
   */
  async saveParentAccount(account: ParentAccount): Promise<void> {
    await this.setItem(this.KEYS.PARENT_ACCOUNT, account);
  }

  /**
   * Recupera conta dos pais
   */
  async getParentAccount(): Promise<ParentAccount | null> {
    return await this.getItem<ParentAccount>(this.KEYS.PARENT_ACCOUNT);
  }

  // ==================== Sessões ====================

  /**
   * Salva uma sessão de jogo
   */
  async saveSession(session: GameSession): Promise<void> {
    const sessions = await this.getSessions();
    sessions.push(session);
    await this.setItem(this.KEYS.SESSIONS, sessions);
  }

  /**
   * Recupera todas as sessões
   */
  async getSessions(): Promise<GameSession[]> {
    const sessions = await this.getItem<GameSession[]>(this.KEYS.SESSIONS);
    return sessions || [];
  }

  /**
   * Recupera sessões de um perfil específico
   */
  async getSessionsByProfile(profileId: string): Promise<GameSession[]> {
    const sessions = await this.getSessions();
    return sessions.filter(s => s.profileId === profileId);
  }

  // ==================== Conquistas ====================

  /**
   * Salva conquistas
   */
  async saveAchievements(achievements: Achievement[]): Promise<void> {
    await this.setItem(this.KEYS.ACHIEVEMENTS, achievements);
  }

  /**
   * Recupera conquistas
   */
  async getAchievements(): Promise<Achievement[]> {
    const achievements = await this.getItem<Achievement[]>(this.KEYS.ACHIEVEMENTS);
    return achievements || [];
  }

  // ==================== Listas Personalizadas ====================

  /**
   * Salva listas personalizadas
   */
  async saveCustomWordLists(lists: CustomWordList[]): Promise<void> {
    await this.setItem(this.KEYS.CUSTOM_LISTS, lists);
  }

  /**
   * Recupera listas personalizadas
   */
  async getCustomWordLists(): Promise<CustomWordList[]> {
    const lists = await this.getItem<CustomWordList[]>(this.KEYS.CUSTOM_LISTS);
    return lists || [];
  }

  // ==================== Planos de Exercício ====================

  /**
   * Salva planos de exercício
   */
  async saveExercisePlans(plans: ExercisePlan[]): Promise<void> {
    await this.setItem(this.KEYS.EXERCISE_PLANS, plans);
  }

  /**
   * Recupera planos de exercício
   */
  async getExercisePlans(): Promise<ExercisePlan[]> {
    const plans = await this.getItem<ExercisePlan[]>(this.KEYS.EXERCISE_PLANS);
    return plans || [];
  }

  // ==================== Configurações ====================

  /**
   * Marca onboarding como completo
   */
  async setOnboardingCompleted(completed: boolean): Promise<void> {
    await this.setItem(this.KEYS.ONBOARDING_COMPLETED, completed);
  }

  /**
   * Verifica se onboarding foi completado
   */
  async isOnboardingCompleted(): Promise<boolean> {
    const completed = await this.getItem<boolean>(this.KEYS.ONBOARDING_COMPLETED);
    return completed || false;
  }

  /**
   * Limpa todos os dados
   */
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }
}

export default new StorageService();
