import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile, Theme } from '../types';
import { profiles, themes } from '../data';

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
    // Load profile from localStorage
    const profileId = localStorage.getItem('selectedProfile');
    if (profileId) {
      const profile = profiles.find(p => p.id === profileId);
      if (profile) {
        setSelectedProfileState(profile);
      }
    }

    // Load theme from localStorage
    const themeId = localStorage.getItem('selectedTheme');
    if (themeId) {
      const theme = themes.find(t => t.id === themeId);
      if (theme) {
        setSelectedThemeState(theme);
      }
    }
  }, []);

  const setSelectedProfile = (profile: Profile) => {
    localStorage.setItem('selectedProfile', profile.id);
    setSelectedProfileState(profile);
  };

  const setSelectedTheme = (theme: Theme) => {
    localStorage.setItem('selectedTheme', theme.id);
    setSelectedThemeState(theme);
  };

  const updateScore = (points: number) => {
    if (selectedProfile) {
      const updatedProfile = {
        ...selectedProfile,
        score: selectedProfile.score + points
      };
      setSelectedProfileState(updatedProfile);
      
      // Update the profile in localStorage
      const profilesInStorage = JSON.parse(localStorage.getItem('profiles') || '[]');
      const updatedProfiles = profilesInStorage.map((p: Profile) => 
        p.id === updatedProfile.id ? updatedProfile : p
      );
      localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    }
  };

  return (
    <AppContext.Provider value={{ 
      selectedProfile, 
      selectedTheme, 
      setSelectedProfile, 
      setSelectedTheme,
      updateScore
    }}>
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