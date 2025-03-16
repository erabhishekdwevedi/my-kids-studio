import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Container,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';

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

  // Generate random sprinkles
  const sprinkles = Array.from({ length: 30 }, (_, i) => ({
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
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fff8e1 0%, #fffde7 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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

      <Container maxWidth="md">
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
              mb: 2
            }}
          >
            Welcome to My Kids Studio!
          </Typography>

          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              mb: 6, 
              color: '#8d6e63',
              opacity: 0.9
            }}
          >
            Who's ready to learn today?
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
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
              >
                <Card
                  onClick={() => handleProfileSelect(profile.id)}
                  sx={{
                    cursor: 'pointer',
                    background: profile.gradient,
                    borderRadius: 4,
                    boxShadow: `0 8px 24px ${profile.shadowColor}`,
                    transition: 'all 0.3s ease',
                    border: '6px solid white',
                    height: '100%',
                    '&:hover': {
                      boxShadow: `0 12px 28px ${profile.shadowColor}`,
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
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
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
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