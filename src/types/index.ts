import { ReactNode } from 'react';

export interface Profile {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  backgroundColor: string;
  gradient: string;
  shadowColor: string;
  textColor: string;
  score: number;
}

export interface Theme {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  backgroundColor: string;
  gradient: string;
  shadowColor: string;
  textColor: string;
  accentColor: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: ReactNode;
  path: string;
  description: string;
}

export interface Activity {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  path?: string;
  backgroundColor?: string;
  gradient?: string;
  shadowColor?: string;
  textColor?: string;
}

export interface SprinkleProps {
  color: string;
  top: string;
  left: string;
  delay: number;
}

export interface JungleAnimalProps {
  type: 'tiger' | 'zebra' | 'giraffe';
  position: { top: string; left: string };
  delay: number;
} 