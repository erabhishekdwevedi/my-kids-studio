import React from 'react';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BrushIcon from '@mui/icons-material/Brush';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CalculateIcon from '@mui/icons-material/Calculate';
import ScienceIcon from '@mui/icons-material/Science';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PestControlIcon from '@mui/icons-material/PestControl';
import FlagIcon from '@mui/icons-material/Flag';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';

export type CatalogTopic = { id: string; name: string; icon: React.ReactNode; path: string };
export type CatalogSubject = { id: string; name: string; icon: React.ReactNode; path: string };

export const subjects: CatalogSubject[] = [
  { id: 'gk', name: 'General Knowledge', icon: <PsychologyIcon sx={{ fontSize: 40 }} />, path: '/subject/gk' },
  { id: 'story', name: 'Story Time', icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />, path: '/subject/story' },
  { id: 'art', name: 'Art & Craft', icon: <BrushIcon sx={{ fontSize: 40 }} />, path: '/subject/art' },
  { id: 'music', name: 'Music & Dance', icon: <MusicNoteIcon sx={{ fontSize: 40 }} />, path: '/subject/music' },
  { id: 'math', name: 'Math Magic', icon: <CalculateIcon sx={{ fontSize: 40 }} />, path: '/subject/math' },
  { id: 'science', name: 'Science Lab', icon: <ScienceIcon sx={{ fontSize: 40 }} />, path: '/subject/science' },
  { id: 'games', name: 'Fun Games', icon: <SportsEsportsIcon sx={{ fontSize: 40 }} />, path: '/subject/games' },
];

export const topicsBySubject: Record<string, CatalogTopic[]> = {
  games: [
    { id: 'car-race', name: 'Car Race', icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />, path: '/subject/games/topic/car-race' },
    { id: 'snake', name: 'Snake', icon: <PestControlIcon sx={{ fontSize: 40 }} />, path: '/subject/games/topic/snake' },
  ],
  art: [
    { id: 'drawing-board', name: 'Drawing Board', icon: <BrushIcon sx={{ fontSize: 40 }} />, path: '/subject/art/topic/drawing-board' },
  ],
  music: [
    { id: 'piano', name: 'Piano', icon: <MusicNoteIcon sx={{ fontSize: 40 }} />, path: '/subject/music/topic/piano' },
  ],
  gk: [
    { id: 'flags', name: 'World Flags', icon: <FlagIcon sx={{ fontSize: 40 }} />, path: '/subject/gk/topic/flags' },
    { id: 'capitals', name: 'Capital Cities', icon: <LocationCityIcon sx={{ fontSize: 40 }} />, path: '/subject/gk/topic/capitals' },
    { id: 'monuments', name: 'Famous Monuments', icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />, path: '/subject/gk/topic/monuments' },
    { id: 'people', name: 'Famous People', icon: <PersonIcon sx={{ fontSize: 40 }} />, path: '/subject/gk/topic/people' },
  ],
};


