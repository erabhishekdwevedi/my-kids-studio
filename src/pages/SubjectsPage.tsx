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
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Face3Icon from '@mui/icons-material/Face3';
import { useApp } from '../contexts/AppContext';
import PageNavigation from '../components/PageNavigation';
import { subjects as catalogSubjects, topicsBySubject, type CatalogSubject, type CatalogTopic } from '../data/catalog';
 

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

// Use shared subjects catalog
const subjects = catalogSubjects;

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
        navigate('/subjects');
      }
    } else {
      // If no theme selected, redirect to theme selection
      navigate('/subjects');
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
    // Special handling for math subject
    if (path === '/subject/math') {
      navigate('/math');
    } else {
      navigate(path);
    }
  };

  const handleTopicSelect = (path: string) => {
    if (path === '/subject/games/topic/car-race') {
      navigate('/car-race');
    } else if (path === '/subject/games/topic/snake') {
      navigate('/snake');
    } else if (path === '/subject/art/topic/drawing-board') {
      navigate('/drawing-board');
    } else if (path === '/subject/music/topic/piano') {
      navigate('/piano');
    } else if (path === '/subject/gk/topic/flags') {
      navigate('/quiz/flags');
    } else if (path === '/subject/gk/topic/capitals') {
      navigate('/quiz/capitals');
    } else if (path === '/subject/gk/topic/monuments') {
      navigate('/quiz/monuments');
    } else if (path === '/subject/gk/topic/people') {
      navigate('/quiz/people');
    } else if (path === '/subject/math') {
      navigate('/math');
    } else {
      navigate(path);
    }
  };

  const handleBackToThemes = () => {
    navigate('/subjects');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!selectedProfile || !selectedTheme) {
    return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  }

  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        position: 'relative',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      

      {/* Navigation */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          padding: { xs: 1, sm: 2 }
        }}
      >
        <PageNavigation
          profile={selectedProfile}
          theme={selectedTheme}
          showTitle={true}
          onBackClick={handleBackToThemes}
          onHomeClick={handleBackToHome}
        />
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 2, md: 3 }
        }}
      >
        {subjects.map((subject: CatalogSubject) => {
          return (
          <Box key={subject.id} sx={{ mb: { xs: 3, sm: 4, md: 5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ color: 'text.primary' }}>{subject.icon}</Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                {subject.name}
              </Typography>
            </Box>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {(topicsBySubject[subject.id] || []).map((topic: CatalogTopic) => (
                <Grid item xs={12} sm={6} md={4} key={`${subject.id}-${topic.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ height: '100%' }}
                  >
                    <Card
                      onClick={() => handleTopicSelect(topic.path)}
                      sx={{
                        height: '100%',
                        cursor: 'pointer',
                        backgroundColor: '#ffffff',
                        borderRadius: 3,
                        border: '1px solid rgba(0,0,0,0.08)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.12)'
                        }
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 2,
                          p: { xs: 2, sm: 3 },
                          textAlign: 'center'
                        }}
                      >
                        <Box
                          sx={{
                            color: 'text.primary',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 1,
                            borderRadius: '50%',
                            backgroundColor: 'transparent'
                          }}
                        >
                          {topic.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary'
                          }}
                        >
                          {topic.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        );})}
      </Container>
    </Box>
  );
};

export default SubjectsPage; 