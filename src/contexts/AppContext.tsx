import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { Profile, Theme } from '../types';
import { profiles, themes } from '../data';
import storage from '../utils/storage';
import logger from '../utils/logger';

const log = logger.createLogger('AppContext');

interface AppContextType {
  selectedProfile: Profile | null;
  selectedTheme: Theme | null;
  setSelectedProfile: (profile: Profile) => void;
  setSelectedTheme: (theme: Theme) => void;
  updateScore: (points: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedProfile, setSelectedProfileState] = useState<Profile | null>(null);
  const [selectedTheme, setSelectedThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    // Load profile from localStorage with proper error handling
    try {
      const profileId = storage.getItem<string | null>('selectedProfile', null);
      if (profileId) {
        const profile = profiles.find(p => p.id === profileId);
        if (profile) {
          setSelectedProfileState(profile);
          log.info('Loaded profile from storage', { profileId });
        } else {
          log.warn('Profile ID from storage not found in available profiles', { profileId });
        }
      }

      // Load theme from localStorage with proper error handling
      const themeId = storage.getItem<string | null>('selectedTheme', null);
      if (themeId) {
        const theme = themes.find(t => t.id === themeId);
        if (theme) {
          setSelectedThemeState(theme);
          log.info('Loaded theme from storage', { themeId });
        } else {
          log.warn('Theme ID from storage not found in available themes', { themeId });
        }
      }

    } catch (error) {
      log.error('Error loading user preferences', error as Error);
    }
  }, []);

  // Ensure defaults for profile and theme to reduce clicks and avoid gating
  useEffect(() => {
    try {
      if (!selectedProfile && profiles.length > 0) {
        const defaultProfile = profiles[0];
        setSelectedProfileState(defaultProfile);
        storage.setItem('selectedProfile', defaultProfile.id);
        log.info('Default profile set', { profileId: defaultProfile.id });
      }
      if (!selectedTheme && themes.length > 0) {
        const defaultTheme = themes[0];
        setSelectedThemeState(defaultTheme);
        storage.setItem('selectedTheme', defaultTheme.id);
        log.info('Default theme set', { themeId: defaultTheme.id });
      }
    } catch (error) {
      log.error('Error setting default profile/theme', error as Error);
    }
  }, [selectedProfile, selectedTheme]);

  const setSelectedProfile = useCallback((profile: Profile) => {
    storage.setItem('selectedProfile', profile.id);
    setSelectedProfileState(profile);
    log.info('Profile selected', { profileId: profile.id });
  }, []);

  const setSelectedTheme = useCallback((theme: Theme) => {
    storage.setItem('selectedTheme', theme.id);
    setSelectedThemeState(theme);
    log.info('Theme selected', { themeId: theme.id });
  }, []);

  const updateScore = useCallback((points: number) => {
    if (selectedProfile) {
      try {
        const updatedProfile = {
          ...selectedProfile,
          score: selectedProfile.score + points
        };
        setSelectedProfileState(updatedProfile);
        
        // Update the profile in localStorage with proper error handling
        const profilesInStorage = storage.getItem<Profile[]>('profiles', []);
        const updatedProfiles = profilesInStorage.map((p: Profile) => 
          p.id === updatedProfile.id ? updatedProfile : p
        );
        storage.setItem('profiles', updatedProfiles);
        log.info('Score updated', { profileId: selectedProfile.id, points, newScore: updatedProfile.score });
      } catch (error) {
        log.error('Error updating score', error as Error, { profileId: selectedProfile.id, points });
      }
    }
  }, [selectedProfile]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    selectedProfile, 
    selectedTheme, 
    setSelectedProfile, 
    setSelectedTheme,
    updateScore
  }), [selectedProfile, selectedTheme, setSelectedProfile, setSelectedTheme, updateScore]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 