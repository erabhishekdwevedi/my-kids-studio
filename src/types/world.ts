// World and Zone Type Definitions for Kids Studio

export type ZoneId =
  | 'home-tree'
  | 'math-garden'
  | 'music-forest'
  | 'art-meadow'
  | 'story-beach'
  | 'science-mountain'
  | 'wonder-plaza'
  | 'game-arcade';

export interface Zone {
  id: ZoneId;
  name: string;
  emoji: string;
  description: string;
  color: string;
  gradient: string;
  path: string;
  position: {
    x: number;
    y: number;
  };
  unlocked: boolean;
  visited: boolean;
}

export interface Collection {
  seeds: number;      // Math
  notes: number;      // Music
  colors: string[];   // Art
  stars: number;      // General Knowledge
  butterflies: number; // Science
}

export type CompanionType = 'bird' | 'fox' | 'owl' | 'rabbit';

export interface Companion {
  type: CompanionType;
  name: string;
  personality: 'curious' | 'creative' | 'wise' | 'playful';
  emoji: string;
  appearsAt: string[]; // Zone IDs where companion appears
}

export interface WeatherState {
  type: 'sunny' | 'cloudy' | 'rainy' | 'starry' | 'rainbow';
  intensity: number; // 0-1
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

export interface ChildProfile {
  id: string;
  name: string;
  avatar: string;
  age?: number; // Detected, not required
  createdAt: Date;
  lastVisitedZone: ZoneId;
  collection: Collection;
  companion: Companion;
  preferences: {
    favoriteZone?: ZoneId;
    learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
    skillLevels: {
      math: number;      // 0-10
      music: number;     // 0-10
      art: number;       // 0-10
      reading: number;   // 0-10
      science: number;   // 0-10
      gk: number;        // 0-10
    };
  };
  achievements: Achievement[];
  creations: Creation[];
  totalPlayTime: number; // in minutes
  sessionsCount: number;
}

export interface Achievement {
  id: string;
  type: 'discovery' | 'mastery' | 'creativity' | 'persistence';
  title: string;
  description: string;
  emoji: string;
  earnedAt: Date;
  zoneId: ZoneId;
}

export interface Creation {
  id: string;
  type: 'drawing' | 'song' | 'story' | 'garden' | 'experiment';
  title: string;
  data: any; // Type-specific data
  thumbnail?: string;
  createdAt: Date;
  zoneId: ZoneId;
}

export interface ActivityProgress {
  activityId: string;
  zoneId: ZoneId;
  attempts: number;
  successes: number;
  lastAttemptAt: Date;
  currentDifficulty: number; // 0-10, adaptive
  timeSpent: number; // seconds
}

export interface WorldState {
  currentZone: ZoneId;
  weather: WeatherState;
  unlockedZones: ZoneId[];
  recentActivities: ActivityProgress[];
  wonderButtonLocation?: {
    zoneId: ZoneId;
    x: number;
    y: number;
  };
  wonderButtonFoundToday: boolean;
}
