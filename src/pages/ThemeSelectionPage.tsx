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

// Define profiles
const profiles = [
  {
    id: 'vidushi',
    name: 'Vidushi',
    icon: <CakeIcon sx={{ fontSize: 40 }} />,
    description: 'Mint Cake',
    backgroundColor: '#c8e6c9', // Light green
    gradient: 'linear-gradient(135deg, #c8e6c9 0%, #81c784 100%)',
    shadowColor: 'rgba(129, 199, 132, 0.4)',
    textColor: '#2e7d32',
    score: 1250
  },
  {
    id: 'rishika',
    name: 'Rishika',
    icon: <IcecreamIcon sx={{ fontSize: 40 }} />,
    description: 'Blueberry Ice Cream',
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
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  useEffect(() => {
    // Get selected profile from localStorage
    const profileId = localStorage.getItem('selectedProfile');
    if (profileId) {
      const profile = profiles.find(p => p.id === profileId);
      if (profile) {
        setSelectedProfile(profile);
      } else {
        // If profile not found, redirect to home
        navigate('/');
      }
    } else {
      // If no profile selected, redirect to home
      navigate('/');
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        paddingBottom: 10 // Add padding at the bottom for the floating footer
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

      <Container maxWidth="md">
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
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 2
            }}
          >
            Hi {selectedProfile.name}!
          </Typography>

          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              mb: 6, 
              color: 'white',
              opacity: 0.9
            }}
          >
            Choose your learning theme
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

      {/* Floating Footer with Navigation Icons */}
      <Box sx={{ position: 'fixed', bottom: 16, width: '100%', display: 'flex', justifyContent: 'space-between', px: 3, zIndex: 10 }}>
        {/* Back Button */}
        <Fab 
          color="default" 
          aria-label="back"
          onClick={handleBackToProfiles}
          sx={{
            boxShadow: '0px 3px 8px rgba(0,0,0,0.2)',
            bgcolor: 'white'
          }}
        >
          <ArrowBackIcon />
        </Fab>

        {/* Profile Pill Button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 30,
            padding: '4px 16px 4px 4px',
            boxShadow: '0px 3px 8px rgba(0,0,0,0.2)',
            border: `2px solid ${selectedProfile.textColor}`,
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: selectedProfile.backgroundColor,
              color: selectedProfile.textColor,
              marginRight: 1,
              border: `2px solid ${selectedProfile.textColor}`
            }}
          >
            {selectedProfile.icon}
          </Avatar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ color: '#ffd54f', fontSize: 20, marginRight: 0.5 }} />
            <Typography 
              sx={{ 
                fontWeight: 'bold', 
                color: selectedProfile.textColor,
                fontSize: '1rem'
              }}
            >
              {selectedProfile.score}
            </Typography>
          </Box>
        </Box>

        {/* Home Button */}
        <Fab 
          color="default" 
          aria-label="home"
          onClick={handleBackToProfiles}
          sx={{ 
            boxShadow: '0px 3px 8px rgba(0,0,0,0.2)',
            bgcolor: 'white'
          }}
        >
          <HomeIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default ThemeSelectionPage; 