import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Container,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import ForestIcon from '@mui/icons-material/Forest';
import CelebrationIcon from '@mui/icons-material/Celebration';
import IcecreamIcon from '@mui/icons-material/Icecream';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BrushIcon from '@mui/icons-material/Brush';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CalculateIcon from '@mui/icons-material/Calculate';
import ScienceIcon from '@mui/icons-material/Science';
import PetsIcon from '@mui/icons-material/Pets';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlightIcon from '@mui/icons-material/Flight';
import Face3Icon from '@mui/icons-material/Face3';
import { useApp } from '../contexts/AppContext';
import PageNavigation from '../components/PageNavigation';

// Define profiles
const profiles = [
  {
    id: 'vidushi',
    name: 'Vidushi',
    icon: <Face3Icon sx={{ fontSize: 40 }} />,
    description: 'Girl with Pink',
    backgroundColor: '#f8bbd0', // Light pink
    gradient: 'linear-gradient(135deg, #f8bbd0 0%, #f48fb1 100%)',
    shadowColor: 'rgba(244, 143, 177, 0.4)',
    textColor: '#c2185b',
    score: 1250
  },
  {
    id: 'rishika',
    name: 'Rishika',
    icon: <Face3Icon sx={{ fontSize: 40 }} />,
    description: 'Girl with Blue',
    backgroundColor: '#bbdefb', // Light blue
    gradient: 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
    shadowColor: 'rgba(144, 202, 249, 0.4)',
    textColor: '#1565c0',
    score: 980
  }
];

// Define themes
const themes = [
  {
    id: 'icecream',
    name: 'Ice Cream Shop',
    icon: <IcecreamIcon sx={{ fontSize: 40 }} />,
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
    icon: <ForestIcon sx={{ fontSize: 40 }} />,
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
    icon: <CelebrationIcon sx={{ fontSize: 40 }} />,
    description: 'Exciting games and colorful balloons',
    backgroundColor: '#e1f5fe', // Light blue
    gradient: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)',
    shadowColor: 'rgba(179, 229, 252, 0.6)',
    textColor: '#ec407a',
    accentColor: '#ffd54f'
  }
];

// Define subjects
const subjects = [
  {
    id: 'gk',
    name: 'General Knowledge',
    icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
    path: '/subject/gk',
    description: 'Learn interesting facts about the world'
  },
  {
    id: 'story',
    name: 'Story Time',
    icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
    path: '/subject/story',
    description: 'Enjoy exciting stories and adventures'
  },
  {
    id: 'art',
    name: 'Art & Craft',
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    path: '/subject/art',
    description: 'Create beautiful art and crafts'
  },
  {
    id: 'music',
    name: 'Music & Dance',
    icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
    path: '/subject/music',
    description: 'Sing, dance and have fun with music'
  },
  {
    id: 'math',
    name: 'Math Magic',
    icon: <CalculateIcon sx={{ fontSize: 40 }} />,
    path: '/subject/math',
    description: 'Solve puzzles and learn numbers'
  },
  {
    id: 'science',
    name: 'Science Lab',
    icon: <ScienceIcon sx={{ fontSize: 40 }} />,
    path: '/subject/science',
    description: 'Discover how things work'
  },
  {
    id: 'games',
    name: 'Fun Games',
    icon: <SportsEsportsIcon sx={{ fontSize: 40 }} />,
    path: '/subject/games',
    description: 'Play educational games and have fun'
  },
  {
    id: 'habits',
    name: 'Good Habits',
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    path: '/subject/habits',
    description: 'Learn good habits for a healthy lifestyle'
  },
  {
    id: 'travel',
    name: 'Travel Adventures',
    icon: <FlightIcon sx={{ fontSize: 40 }} />,
    path: '/subject/travel',
    description: 'Explore different places around the world'
  }
];

// Sprinkle component for decoration
const Sprinkle = ({ color, top, left, delay }: { color: string, top: string, left: string, delay: number }) => (
  <motion.div
    style={{
      position: 'absolute',
      top,
      left,
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: color,
      zIndex: 0
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.5, 
      delay, 
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: Math.random() * 2
    }}
  />
);

// Jungle Animal component for decoration
const JungleAnimal = ({ type, position, delay }: { type: 'tiger' | 'zebra' | 'giraffe', position: { top: string, left: string }, delay: number }) => {
  const getAnimalIcon = () => {
    switch(type) {
      case 'tiger':
        return <PetsIcon sx={{ fontSize: 60, color: '#ef6c00' }} />;
      case 'zebra':
        return <CrisisAlertIcon sx={{ fontSize: 60, color: '#424242' }} />;
      case 'giraffe':
        return <EmojiNatureIcon sx={{ fontSize: 60, color: '#ffa000' }} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 0,
        opacity: 0.6
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
      }}
      whileHover={{ scale: 1.2, opacity: 0.9 }}
    >
      {getAnimalIcon()}
    </motion.div>
  );
};

const SubjectsPage = () => {
  const navigate = useNavigate();
  const { selectedProfile, selectedTheme } = useApp();

  useEffect(() => {
    // Get selected profile from localStorage
    const profileId = localStorage.getItem('selectedProfile');
    if (profileId) {
      const profile = profiles.find(p => p.id === profileId);
      if (profile) {
        // No need to set selectedProfile here, as it's already handled in useApp
      } else {
        // If profile not found, redirect to home
        navigate('/');
      }
    } else {
      // If no profile selected, redirect to home
      navigate('/');
    }

    // Get selected theme from localStorage
    const themeId = localStorage.getItem('selectedTheme');
    if (themeId) {
      const theme = themes.find(t => t.id === themeId);
      if (theme) {
        // No need to set selectedTheme here, as it's already handled in useApp
      } else {
        // If theme not found, redirect to theme selection
        navigate('/theme-selection');
      }
    } else {
      // If no theme selected, redirect to theme selection
      navigate('/theme-selection');
    }
  }, [navigate]);

  // Generate random sprinkles based on theme
  const generateSprinkles = () => {
    if (!selectedTheme) return [];
    
    const colors = selectedTheme.id === 'icecream' 
      ? ['#f8bbd0', '#bbdefb', '#ffcc80', '#c5e1a5', '#b39ddb']
      : selectedTheme.id === 'jungle'
        ? ['#a5d6a7', '#c8e6c9', '#ffcc80', '#bcaaa4', '#81c784']
        : ['#f8bbd0', '#bbdefb', '#ffe082', '#b39ddb', '#90caf9'];
    
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2
    }));
  };

  const sprinkles = generateSprinkles();

  // Generate jungle animals if jungle theme is selected
  const jungleAnimals = selectedTheme?.id === 'jungle' ? [
    { type: 'tiger' as const, position: { top: '15%', left: '10%' }, delay: 0.5 },
    { type: 'zebra' as const, position: { top: '70%', left: '15%' }, delay: 0.8 },
    { type: 'giraffe' as const, position: { top: '25%', left: '85%' }, delay: 1.2 },
    { type: 'tiger' as const, position: { top: '80%', left: '80%' }, delay: 1.5 },
    { type: 'zebra' as const, position: { top: '40%', left: '5%' }, delay: 1.8 },
    { type: 'giraffe' as const, position: { top: '60%', left: '90%' }, delay: 2.0 },
  ] : [];

  const handleSubjectSelect = (path: string) => {
    navigate(path);
  };

  const handleBackToThemes = () => {
    navigate('/theme-selection');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!selectedProfile || !selectedTheme) {
    return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        background: selectedTheme.gradient,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: 3
      }}
    >
      {/* Decorative sprinkles */}
      {sprinkles.map(sprinkle => (
        <Sprinkle 
          key={sprinkle.id}
          color={sprinkle.color}
          top={sprinkle.top}
          left={sprinkle.left}
          delay={sprinkle.delay}
        />
      ))}

      {/* Jungle Animals (only shown when jungle theme is selected) */}
      {jungleAnimals.map((animal, index) => (
        <JungleAnimal
          key={`animal-${index}`}
          type={animal.type}
          position={animal.position}
          delay={animal.delay}
        />
      ))}

      {/* Top Navigation */}
      <PageNavigation 
        profile={selectedProfile}
        theme={selectedTheme}
        showTitle={true}
        title="Subjects"
        onBackClick={handleBackToThemes}
        onHomeClick={handleBackToHome}
        showMuteButton={true}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mt: 2, width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700, 
              color: selectedTheme.textColor,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 4
            }}
          >
            Choose a Subject
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {subjects.map((subject, index) => (
            <Grid item xs={12} sm={6} md={4} key={subject.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card
                  onClick={() => handleSubjectSelect(subject.path)}
                  sx={{
                    cursor: 'pointer',
                    background: 'white',
                    borderRadius: 4,
                    boxShadow: `0 8px 24px ${selectedTheme.shadowColor}`,
                    transition: 'all 0.3s ease',
                    border: selectedTheme.id === 'icecream' 
                      ? '5px solid #f8bbd0'
                      : selectedTheme.id === 'jungle'
                        ? '5px solid #a5d6a7'
                        : '5px solid #b3e5fc',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: `0 12px 28px ${selectedTheme.shadowColor}`,
                      backgroundColor: selectedTheme.backgroundColor
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: selectedTheme.backgroundColor,
                        color: selectedTheme.textColor,
                        margin: '0 auto 16px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: `4px solid ${selectedTheme.textColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {subject.icon}
                    </Box>
                    <Typography 
                      variant="h4" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 700, 
                        color: selectedTheme.textColor,
                      }}
                    >
                      {subject.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SubjectsPage; 