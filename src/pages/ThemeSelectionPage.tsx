import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Container,
  Grid,
  Fab,
  Avatar
} from '@mui/material';
import { motion } from 'framer-motion';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';
import ForestIcon from '@mui/icons-material/Forest';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import PageNavigation from '../components/PageNavigation';
import { useApp } from '../contexts/AppContext';

// Define profiles
const profiles = [
  {
    id: 'vidushi',
    name: 'Vidushi',
    icon: <Face3Icon sx={{ fontSize: 40 }} />,
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
    name: 'Tasty Treat',
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

const ThemeSelectionPage = () => {
  const navigate = useNavigate();
  const { selectedProfile } = useApp();
  const [selectedTheme, setSelectedTheme] = useState<any>(null);

  useEffect(() => {
    // Get selected profile from localStorage
    const profileId = localStorage.getItem('selectedProfile');
    
    // If no profile is selected, redirect to home page
    if (!profileId) {
      navigate('/');
      return;
    }
    
    // Find the profile by ID
    const profile = profiles.find(p => p.id === profileId);
    
    // If profile not found, redirect to home page
    if (!profile) {
      navigate('/');
      return;
    }
  }, [navigate]);

  // Generate random sprinkles
  const sprinkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: ['#f8bbd0', '#bbdefb', '#ffcc80', '#c5e1a5', '#b39ddb'][Math.floor(Math.random() * 5)],
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2
  }));

  const handleThemeSelect = (theme: any) => {
    // Save selected theme to localStorage
    localStorage.setItem('selectedTheme', theme.id);
    // Navigate to subjects page
    navigate('/subjects');
  };

  const handleBackToProfiles = () => {
    navigate('/');
  };

  if (!selectedProfile) {
    return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: selectedProfile.gradient,
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

      {/* Top Navigation */}
      <PageNavigation 
        profile={selectedProfile}
        theme={selectedProfile} // Use profile as theme since we don't have a theme yet
        showTitle={false}
        title="Choose Your Theme"
        onBackClick={handleBackToProfiles}
        onHomeClick={handleBackToProfiles}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, mt: 4 }}>
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
              color: selectedProfile.textColor,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 4
            }}
          >
            Choose Your Theme
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {themes.map((theme, index) => (
            <Grid item xs={12} sm={6} md={4} key={theme.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  onClick={() => handleThemeSelect(theme)}
                  sx={{
                    cursor: 'pointer',
                    background: theme.gradient,
                    borderRadius: 4,
                    boxShadow: `0 8px 24px ${theme.shadowColor}`,
                    transition: 'all 0.3s ease',
                    border: '6px solid white',
                    height: '100%',
                    '&:hover': {
                      boxShadow: `0 12px 28px ${theme.shadowColor}`,
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        color: theme.textColor,
                        margin: '0 auto 16px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: `4px solid ${theme.textColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {theme.icon}
                    </Box>
                    <Typography 
                      variant="h4" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 700, 
                        color: 'white',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                      }}
                    >
                      {theme.name}
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

export default ThemeSelectionPage; 