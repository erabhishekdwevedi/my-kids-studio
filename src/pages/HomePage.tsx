import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Container,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';
import PageNavigation from '../components/PageNavigation';
import { useApp } from '../contexts/AppContext';

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

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { selectedProfile } = useApp();

  // Generate random sprinkles - fewer on mobile for performance
  const sprinkleCount = isMobile ? 15 : isTablet ? 20 : 30;
  const sprinkles = Array.from({ length: sprinkleCount }, (_, i) => ({
    id: i,
    color: ['#c8e6c9', '#bbdefb', '#ffcc80', '#f8bbd0', '#b39ddb'][Math.floor(Math.random() * 5)],
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2
  }));

  const handleProfileSelect = (profileId: string) => {
    // Store selected profile in localStorage
    localStorage.setItem('selectedProfile', profileId);
    
    // Navigate to theme selection page
    navigate('/theme-selection');
  };

  return (
    <Box
      className="page-container vh-fix"
      sx={{
        background: 'linear-gradient(135deg, #fff8e1 0%, #fffde7 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: 2, sm: 3, md: 4 }
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



      <Container maxWidth="md" sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h1" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700, 
              color: '#f06292',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: { xs: 1, sm: 2 },
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }
            }}
          >
            Welcome to My Kids Studio!
          </Typography>

          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              mb: { xs: 3, sm: 4, md: 6 }, 
              color: '#8d6e63',
              opacity: 0.9,
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
            }}
          >
            Who's ready to learn today?
          </Typography>
        </motion.div>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {profiles.map((profile, index) => (
            <Grid item xs={12} sm={6} key={profile.id}>
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
                style={{ height: '100%' }}
              >
                <Card
                  onClick={() => handleProfileSelect(profile.id)}
                  sx={{
                    cursor: 'pointer',
                    background: profile.gradient,
                    borderRadius: { xs: 3, sm: 4 },
                    boxShadow: `0 8px 24px ${profile.shadowColor}`,
                    transition: 'all 0.3s ease',
                    border: '6px solid white',
                    height: '100%',
                    '&:hover': {
                      boxShadow: `0 12px 28px ${profile.shadowColor}`,
                    }
                  }}
                >
                  <CardContent sx={{ 
                    p: { xs: 2, sm: 3, md: 4 }, 
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Avatar
                      sx={{
                        width: { xs: 80, sm: 100, md: 120 },
                        height: { xs: 80, sm: 100, md: 120 },
                        backgroundColor: 'white',
                        color: profile.textColor,
                        margin: '0 auto 16px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: `4px solid ${profile.textColor}`
                      }}
                    >
                      {profile.icon}
                    </Avatar>
                    <Typography 
                      variant="h3" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 700, 
                        color: 'white',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
                      }}
                    >
                      {profile.name}
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

export default HomePage; 