import React from 'react';
import { Profile, Theme, Subject } from '../types';
import Face3Icon from '@mui/icons-material/Face3';
import IcecreamIcon from '@mui/icons-material/Icecream';
import ForestIcon from '@mui/icons-material/Forest';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BrushIcon from '@mui/icons-material/Brush';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CalculateIcon from '@mui/icons-material/Calculate';
import ScienceIcon from '@mui/icons-material/Science';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlightIcon from '@mui/icons-material/Flight';

// Define profiles
export const profiles: Profile[] = [
  {
    id: 'vidushi',
    name: 'Vidushi',
    icon: React.createElement(Face3Icon, { sx: { fontSize: 40 } }),
    description: 'Girl with Green',
    backgroundColor: '#c8e6c9', // Light green
    gradient: 'linear-gradient(135deg, #c8e6c9 0%, #81c784 100%)',
    shadowColor: 'rgba(129, 199, 132, 0.4)',
    textColor: '#2e7d32',
    score: 1250
  },
  {
    id: 'rishika',
    name: 'Rishika',
    icon: React.createElement(Face3Icon, { sx: { fontSize: 40 } }),
    description: 'Girl with Blue',
    backgroundColor: '#bbdefb', // Light blue
    gradient: 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
    shadowColor: 'rgba(144, 202, 249, 0.4)',
    textColor: '#1565c0',
    score: 980
  }
];

// Define themes
export const themes: Theme[] = [
  {
    id: 'icecream',
    name: 'Tasty Treat',
    icon: React.createElement(IcecreamIcon, { sx: { fontSize: 40 } }),
    description: 'Sweet treats and colorful sprinkles',
    backgroundColor: '#fff8e1', // Light cream
    gradient: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
    shadowColor: 'rgba(255, 236, 179, 0.6)',
    textColor: '#f06292',
    accentColor: '#7986cb'
  },
  {
    id: 'jungle',
    name: 'Jungle Book',
    icon: React.createElement(ForestIcon, { sx: { fontSize: 40 } }),
    description: 'Wild adventures in the forest',
    backgroundColor: '#e8f5e9', // Light green
    gradient: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    shadowColor: 'rgba(200, 230, 201, 0.6)',
    textColor: '#388e3c',
    accentColor: '#8d6e63'
  },
  {
    id: 'carnival',
    name: 'Carnival Fun',
    icon: React.createElement(CelebrationIcon, { sx: { fontSize: 40 } }),
    description: 'Exciting games and colorful balloons',
    backgroundColor: '#e1f5fe', // Light blue
    gradient: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)',
    shadowColor: 'rgba(179, 229, 252, 0.6)',
    textColor: '#ec407a',
    accentColor: '#ffd54f'
  }
];

// Define subjects
export const subjects: Subject[] = [
  {
    id: 'gk',
    name: 'General Knowledge',
    icon: React.createElement(PsychologyIcon, { sx: { fontSize: 40 } }),
    path: '/subject/gk',
    description: 'Learn interesting facts about the world'
  },
  {
    id: 'story',
    name: 'Story Time',
    icon: React.createElement(AutoStoriesIcon, { sx: { fontSize: 40 } }),
    path: '/subject/story',
    description: 'Enjoy exciting stories and adventures'
  },
  {
    id: 'art',
    name: 'Art & Craft',
    icon: React.createElement(BrushIcon, { sx: { fontSize: 40 } }),
    path: '/subject/art',
    description: 'Create beautiful art and crafts'
  },
  {
    id: 'music',
    name: 'Music & Dance',
    icon: React.createElement(MusicNoteIcon, { sx: { fontSize: 40 } }),
    path: '/subject/music',
    description: 'Sing, dance and have fun with music'
  },
  {
    id: 'math',
    name: 'Math Magic',
    icon: React.createElement(CalculateIcon, { sx: { fontSize: 40 } }),
    path: '/subject/math',
    description: 'Solve puzzles and learn numbers'
  },
  {
    id: 'science',
    name: 'Science Lab',
    icon: React.createElement(ScienceIcon, { sx: { fontSize: 40 } }),
    path: '/subject/science',
    description: 'Discover how things work'
  },
  {
    id: 'games',
    name: 'Fun Games',
    icon: React.createElement(SportsEsportsIcon, { sx: { fontSize: 40 } }),
    path: '/subject/games',
    description: 'Play educational games and have fun'
  },
  {
    id: 'habits',
    name: 'Good Habits',
    icon: React.createElement(EmojiEventsIcon, { sx: { fontSize: 40 } }),
    path: '/subject/habits',
    description: 'Learn good habits for a healthy lifestyle'
  },
  {
    id: 'travel',
    name: 'Travel Adventures',
    icon: React.createElement(FlightIcon, { sx: { fontSize: 40 } }),
    path: '/subject/travel',
    description: 'Explore different places around the world'
  }
]; 