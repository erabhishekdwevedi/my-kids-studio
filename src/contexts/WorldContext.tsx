// World Context - The Brain of Kids Studio
// Manages global state, adaptive learning, and world behavior

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import {
  Zone,
  ZoneId,
  ChildProfile,
  WorldState,
  WeatherState,
  Collection,
  Companion,
  CompanionType,
  Achievement,
  Creation,
  ActivityProgress
} from '../types/world';
import storage from '../utils/storage';
import logger from '../utils/logger';

const log = logger.createLogger('WorldContext');

// Define all zones in the Wonder Island
const ZONES: Zone[] = [
  {
    id: 'home-tree',
    name: 'Home Tree',
    emoji: '🏠',
    description: 'Your cozy treehouse hub',
    color: '#8B7355',
    gradient: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)',
    path: '/world/home-tree',
    position: { x: 50, y: 50 },
    unlocked: true,
    visited: true
  },
  {
    id: 'math-garden',
    name: 'Math Garden',
    emoji: '🔢',
    description: 'Where numbers grow like flowers',
    color: '#6B9B7F',
    gradient: 'linear-gradient(135deg, #B4E7CE 0%, #6B9B7F 100%)',
    path: '/world/math-garden',
    position: { x: 20, y: 70 },
    unlocked: true,
    visited: false
  },
  {
    id: 'music-forest',
    name: 'Music Forest',
    emoji: '🌲',
    description: 'Enchanted forest of melodies',
    color: '#B197FC',
    gradient: 'linear-gradient(135deg, #D8BFFF 0%, #B197FC 100%)',
    path: '/world/music-forest',
    position: { x: 20, y: 30 },
    unlocked: true,
    visited: false
  },
  {
    id: 'art-meadow',
    name: 'Art Meadow',
    emoji: '🎨',
    description: 'Where creativity blooms',
    color: '#FFAB73',
    gradient: 'linear-gradient(135deg, #FFD8A8 0%, #FFAB73 100%)',
    path: '/world/art-meadow',
    position: { x: 80, y: 30 },
    unlocked: true,
    visited: false
  },
  {
    id: 'story-beach',
    name: 'Story Beach',
    emoji: '🌊',
    description: 'Tales wash ashore here',
    color: '#63C7D1',
    gradient: 'linear-gradient(135deg, #A8D8FF 0%, #63C7D1 100%)',
    path: '/world/story-beach',
    position: { x: 80, y: 70 },
    unlocked: true,
    visited: false
  },
  {
    id: 'science-mountain',
    name: 'Science Mountain',
    emoji: '⛰️',
    description: 'Peak of discovery',
    color: '#4A5668',
    gradient: 'linear-gradient(135deg, #9D8FFF 0%, #4A5668 100%)',
    path: '/world/science-mountain',
    position: { x: 50, y: 10 },
    unlocked: true,
    visited: false
  },
  {
    id: 'wonder-plaza',
    name: 'Wonder Plaza',
    emoji: '🌟',
    description: 'The heart of knowledge',
    color: '#FFD8A8',
    gradient: 'linear-gradient(135deg, #FFE4B3 0%, #FFD8A8 100%)',
    path: '/world/wonder-plaza',
    position: { x: 50, y: 70 },
    unlocked: true,
    visited: false
  },
  {
    id: 'game-arcade',
    name: 'Game Arcade',
    emoji: '🎮',
    description: 'Hidden underground fun',
    color: '#9D8FFF',
    gradient: 'linear-gradient(135deg, #B8A9FF 0%, #9D8FFF 100%)',
    path: '/world/game-arcade',
    position: { x: 50, y: 90 },
    unlocked: false,
    visited: false
  }
];

// Companion definitions
const COMPANIONS: Record<CompanionType, Companion> = {
  bird: {
    type: 'bird',
    name: 'Chirpy',
    personality: 'curious',
    emoji: '🐦',
    appearsAt: ['home-tree', 'music-forest', 'science-mountain']
  },
  fox: {
    type: 'fox',
    name: 'Fennec',
    personality: 'creative',
    emoji: '🦊',
    appearsAt: ['home-tree', 'art-meadow', 'wonder-plaza']
  },
  owl: {
    type: 'owl',
    name: 'Hooty',
    personality: 'wise',
    emoji: '🦉',
    appearsAt: ['home-tree', 'story-beach', 'wonder-plaza']
  },
  rabbit: {
    type: 'rabbit',
    name: 'Hoppy',
    personality: 'playful',
    emoji: '🐰',
    appearsAt: ['home-tree', 'game-arcade', 'math-garden']
  }
};

interface WorldContextType {
  // State
  currentProfile: ChildProfile | null;
  worldState: WorldState;
  zones: Zone[];

  // Actions
  createProfile: (name: string, avatar: string) => void;
  switchProfile: (profileId: string) => void;
  navigateToZone: (zoneId: ZoneId) => void;
  updateCollection: (type: keyof Collection, value: number | string) => void;
  addAchievement: (achievement: Omit<Achievement, 'id' | 'earnedAt'>) => void;
  saveCreation: (creation: Omit<Creation, 'id' | 'createdAt'>) => void;
  updateActivityProgress: (progress: Partial<ActivityProgress> & { activityId: string; zoneId: ZoneId }) => void;
  detectAge: (interactionData: any) => void;

  // Getters
  getZone: (zoneId: ZoneId) => Zone | undefined;
  getCurrentZone: () => Zone | undefined;
  getCompanion: () => Companion;
  shouldShowCompanion: (zoneId: ZoneId) => boolean;
}

const WorldContext = createContext<WorldContextType | undefined>(undefined);

interface WorldProviderProps {
  children: ReactNode;
}

export const WorldProvider: React.FC<WorldProviderProps> = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState<ChildProfile | null>(null);
  const [worldState, setWorldState] = useState<WorldState>({
    currentZone: 'home-tree',
    weather: {
      type: 'sunny',
      intensity: 0.7,
      timeOfDay: 'morning'
    },
    unlockedZones: ['home-tree', 'math-garden', 'music-forest', 'art-meadow', 'story-beach', 'science-mountain', 'wonder-plaza'],
    recentActivities: [],
    wonderButtonFoundToday: false
  });

  // Update weather based on real time
  const updateWeatherBasedOnTime = useCallback(() => {
    const hour = new Date().getHours();
    let timeOfDay: WeatherState['timeOfDay'];
    let type: WeatherState['type'];

    if (hour >= 5 && hour < 12) {
      timeOfDay = 'morning';
      type = 'sunny';
    } else if (hour >= 12 && hour < 17) {
      timeOfDay = 'afternoon';
      type = 'sunny';
    } else if (hour >= 17 && hour < 20) {
      timeOfDay = 'evening';
      type = 'cloudy';
    } else {
      timeOfDay = 'night';
      type = 'starry';
    }

    setWorldState(prev => ({
      ...prev,
      weather: {
        type,
        intensity: 0.7,
        timeOfDay
      }
    }));
  }, []);

  // Place Wonder Button in random location
  const placeWonderButton = useCallback(() => {
    const unlockedZones = worldState.unlockedZones;
    const randomZone = unlockedZones[Math.floor(Math.random() * unlockedZones.length)];
    const randomX = Math.random() * 80 + 10; // 10-90%
    const randomY = Math.random() * 80 + 10; // 10-90%

    setWorldState(prev => ({
      ...prev,
      wonderButtonLocation: {
        zoneId: randomZone,
        x: randomX,
        y: randomY
      },
      wonderButtonFoundToday: false
    }));
  }, [worldState.unlockedZones]);

  // Initialize: Load or create profile
  useEffect(() => {
    try {
      const profiles = storage.getItem<ChildProfile[]>('childProfiles', []);

      if (profiles.length === 0) {
        // First time user - create default profile with auto-detected companion
        const defaultCompanion = COMPANIONS.bird; // Start with bird, will adapt
        const defaultProfile: ChildProfile = {
          id: 'default-' + Date.now(),
          name: 'Explorer',
          avatar: '🌟',
          createdAt: new Date(),
          lastVisitedZone: 'home-tree',
          collection: {
            seeds: 0,
            notes: 0,
            colors: ['#FF0000', '#00FF00', '#0000FF'], // Start with RGB
            stars: 0,
            butterflies: 0
          },
          companion: defaultCompanion,
          preferences: {
            skillLevels: {
              math: 5,
              music: 5,
              art: 5,
              reading: 5,
              science: 5,
              gk: 5
            }
          },
          achievements: [],
          creations: [],
          totalPlayTime: 0,
          sessionsCount: 0
        };

        storage.setItem('childProfiles', [defaultProfile]);
        setCurrentProfile(defaultProfile);
        log.info('Created default profile');
      } else {
        // Load last used profile
        const lastProfileId = storage.getItem<string>('lastUsedProfileId', profiles[0].id);
        const profile = profiles.find(p => p.id === lastProfileId) || profiles[0];
        setCurrentProfile(profile);
        log.info('Loaded profile', { profileId: profile.id });
      }

      // Initialize world state
      const savedWorldState = storage.getItem<WorldState | null>('worldState', null);
      if (savedWorldState) {
        setWorldState(savedWorldState);
      } else {
        // Set up Wonder Button for today
        placeWonderButton();
      }

      // Update weather based on real time
      updateWeatherBasedOnTime();

    } catch (error) {
      log.error('Error initializing world', error as Error);
    }
  }, [placeWonderButton, updateWeatherBasedOnTime]);

  // Save profile whenever it changes
  useEffect(() => {
    if (currentProfile) {
      try {
        const profiles = storage.getItem<ChildProfile[]>('childProfiles', []);
        const updatedProfiles = profiles.map(p =>
          p.id === currentProfile.id ? currentProfile : p
        );
        storage.setItem('childProfiles', updatedProfiles);
        storage.setItem('lastUsedProfileId', currentProfile.id);
      } catch (error) {
        log.error('Error saving profile', error as Error);
      }
    }
  }, [currentProfile]);

  // Save world state whenever it changes
  useEffect(() => {
    storage.setItem('worldState', worldState);
  }, [worldState]);

  // Create new profile
  const createProfile = useCallback((name: string, avatar: string) => {
    const newProfile: ChildProfile = {
      id: 'profile-' + Date.now(),
      name,
      avatar,
      createdAt: new Date(),
      lastVisitedZone: 'home-tree',
      collection: {
        seeds: 0,
        notes: 0,
        colors: ['#FF0000', '#00FF00', '#0000FF'],
        stars: 0,
        butterflies: 0
      },
      companion: COMPANIONS.bird, // Default, will adapt
      preferences: {
        skillLevels: {
          math: 5,
          music: 5,
          art: 5,
          reading: 5,
          science: 5,
          gk: 5
        }
      },
      achievements: [],
      creations: [],
      totalPlayTime: 0,
      sessionsCount: 1
    };

    const profiles = storage.getItem<ChildProfile[]>('childProfiles', []);
    storage.setItem('childProfiles', [...profiles, newProfile]);
    setCurrentProfile(newProfile);
    log.info('Created new profile', { name });
  }, []);

  // Switch between profiles
  const switchProfile = useCallback((profileId: string) => {
    const profiles = storage.getItem<ChildProfile[]>('childProfiles', []);
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setCurrentProfile(profile);
      storage.setItem('lastUsedProfileId', profileId);
      log.info('Switched profile', { profileId });
    }
  }, []);

  // Navigate to a zone
  const navigateToZone = useCallback((zoneId: ZoneId) => {
    setWorldState(prev => ({
      ...prev,
      currentZone: zoneId
    }));

    if (currentProfile) {
      setCurrentProfile(prev => prev ? {
        ...prev,
        lastVisitedZone: zoneId
      } : null);
    }
  }, [currentProfile]);

  // Update collection
  const updateCollection = useCallback((type: keyof Collection, value: number | string) => {
    if (!currentProfile) return;

    setCurrentProfile(prev => {
      if (!prev) return null;

      const newCollection = { ...prev.collection };

      if (type === 'colors' && typeof value === 'string') {
        if (!newCollection.colors.includes(value)) {
          newCollection.colors = [...newCollection.colors, value];
        }
      } else if (typeof value === 'number') {
        (newCollection[type] as number) = (newCollection[type] as number || 0) + value;
      }

      return {
        ...prev,
        collection: newCollection
      };
    });

    log.info('Updated collection', { type, value });
  }, [currentProfile]);

  // Add achievement
  const addAchievement = useCallback((achievement: Omit<Achievement, 'id' | 'earnedAt'>) => {
    if (!currentProfile) return;

    const newAchievement: Achievement = {
      ...achievement,
      id: 'ach-' + Date.now(),
      earnedAt: new Date()
    };

    setCurrentProfile(prev => prev ? {
      ...prev,
      achievements: [...prev.achievements, newAchievement]
    } : null);

    log.info('Achievement earned', { title: achievement.title });
  }, [currentProfile]);

  // Save creation
  const saveCreation = useCallback((creation: Omit<Creation, 'id' | 'createdAt'>) => {
    if (!currentProfile) return;

    const newCreation: Creation = {
      ...creation,
      id: 'create-' + Date.now(),
      createdAt: new Date()
    };

    setCurrentProfile(prev => prev ? {
      ...prev,
      creations: [...prev.creations, newCreation]
    } : null);

    log.info('Creation saved', { type: creation.type, title: creation.title });
  }, [currentProfile]);

  // Update activity progress
  const updateActivityProgress = useCallback((progress: Partial<ActivityProgress> & { activityId: string; zoneId: ZoneId }) => {
    setWorldState(prev => {
      const existing = prev.recentActivities.find(a => a.activityId === progress.activityId);

      if (existing) {
        return {
          ...prev,
          recentActivities: prev.recentActivities.map(a =>
            a.activityId === progress.activityId
              ? { ...a, ...progress, lastAttemptAt: new Date() }
              : a
          )
        };
      } else {
        const newProgress: ActivityProgress = {
          activityId: progress.activityId,
          zoneId: progress.zoneId,
          attempts: progress.attempts || 1,
          successes: progress.successes || 0,
          lastAttemptAt: new Date(),
          currentDifficulty: progress.currentDifficulty || 5,
          timeSpent: progress.timeSpent || 0
        };

        return {
          ...prev,
          recentActivities: [...prev.recentActivities, newProgress].slice(-20) // Keep last 20
        };
      }
    });
  }, []);

  // Detect age from interaction patterns
  const detectAge = useCallback((interactionData: any) => {
    // TODO: Implement ML-based age detection
    // For now, simple heuristics
    log.debug('Age detection data received', interactionData);
  }, []);

  // Get zone by ID
  const getZone = useCallback((zoneId: ZoneId): Zone | undefined => {
    return ZONES.find(z => z.id === zoneId);
  }, []);

  // Get current zone
  const getCurrentZone = useCallback((): Zone | undefined => {
    return ZONES.find(z => z.id === worldState.currentZone);
  }, [worldState.currentZone]);

  // Get companion
  const getCompanion = useCallback((): Companion => {
    return currentProfile?.companion || COMPANIONS.bird;
  }, [currentProfile]);

  // Check if companion should appear in zone
  const shouldShowCompanion = useCallback((zoneId: ZoneId): boolean => {
    const companion = getCompanion();
    return companion.appearsAt.includes(zoneId);
  }, [getCompanion]);

  // Memoize context value
  const contextValue = useMemo(() => ({
    currentProfile,
    worldState,
    zones: ZONES,
    createProfile,
    switchProfile,
    navigateToZone,
    updateCollection,
    addAchievement,
    saveCreation,
    updateActivityProgress,
    detectAge,
    getZone,
    getCurrentZone,
    getCompanion,
    shouldShowCompanion
  }), [
    currentProfile,
    worldState,
    createProfile,
    switchProfile,
    navigateToZone,
    updateCollection,
    addAchievement,
    saveCreation,
    updateActivityProgress,
    detectAge,
    getZone,
    getCurrentZone,
    getCompanion,
    shouldShowCompanion
  ]);

  return (
    <WorldContext.Provider value={contextValue}>
      {children}
    </WorldContext.Provider>
  );
};

export const useWorld = (): WorldContextType => {
  const context = useContext(WorldContext);
  if (context === undefined) {
    throw new Error('useWorld must be used within a WorldProvider');
  }
  return context;
};
