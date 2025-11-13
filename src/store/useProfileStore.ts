/**
 * Store de perfis
 * Gerencia o estado dos perfis das crianças
 */

import { create } from 'zustand';
import { ChildProfile } from '@/types';
import StorageService from '@/services/storage/StorageService';

interface ProfileStore {
  profiles: ChildProfile[];
  currentProfile: ChildProfile | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadProfiles: () => Promise<void>;
  setCurrentProfile: (profileId: string) => Promise<void>;
  addProfile: (profile: ChildProfile) => Promise<void>;
  updateProfile: (profile: ChildProfile) => Promise<void>;
  deleteProfile: (profileId: string) => Promise<void>;
  clearError: () => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profiles: [],
  currentProfile: null,
  isLoading: false,
  error: null,

  loadProfiles: async () => {
    set({ isLoading: true, error: null });
    try {
      const profiles = await StorageService.getProfiles();
      const currentProfileId = await StorageService.getCurrentProfile();

      const currentProfile = currentProfileId
        ? profiles.find(p => p.id === currentProfileId) || null
        : null;

      set({ profiles, currentProfile, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load profiles',
        isLoading: false,
      });
    }
  },

  setCurrentProfile: async (profileId: string) => {
    const { profiles } = get();
    const profile = profiles.find(p => p.id === profileId);

    if (profile) {
      await StorageService.setCurrentProfile(profileId);
      set({ currentProfile: profile });
    }
  },

  addProfile: async (profile: ChildProfile) => {
    set({ isLoading: true, error: null });
    try {
      await StorageService.addProfile(profile);
      const profiles = await StorageService.getProfiles();
      set({ profiles, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to add profile',
        isLoading: false,
      });
    }
  },

  updateProfile: async (profile: ChildProfile) => {
    set({ isLoading: true, error: null });
    try {
      await StorageService.updateProfile(profile);
      const profiles = await StorageService.getProfiles();

      const currentProfile = get().currentProfile;
      const updatedCurrentProfile =
        currentProfile?.id === profile.id ? profile : currentProfile;

      set({ profiles, currentProfile: updatedCurrentProfile, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update profile',
        isLoading: false,
      });
    }
  },

  deleteProfile: async (profileId: string) => {
    set({ isLoading: true, error: null });
    try {
      await StorageService.deleteProfile(profileId);
      const profiles = await StorageService.getProfiles();

      const currentProfile = get().currentProfile;
      const updatedCurrentProfile =
        currentProfile?.id === profileId ? null : currentProfile;

      set({ profiles, currentProfile: updatedCurrentProfile, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete profile',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
