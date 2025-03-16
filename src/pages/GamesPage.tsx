import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Paper,
  Rating,
  Chip,
  Avatar,
  Fab
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';
import ForestIcon from '@mui/icons-material/Forest';
import CelebrationIcon from '@mui/icons-material/Celebration';

const MotionContainer = motion(Container);
const MotionTypography = motion(Typography);
const MotionBox = motion(Box);

// Define the Game interface
interface Game {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  ageRange: string;
  rating: number;
  color: string;
  path: string;
}

// Only keep the car racing and snake game cards
const games: Game[] = [
  {
    title: 'Car Race',
    description: 'Race against time and dodge obstacles in this exciting car racing game',
    icon: <DirectionsCarIcon fontSize="large" color="primary" />,
    category: 'Racing',
    ageRange: '5-10 years',
    rating: 4.9,
    color: '#ffebee',
    path: '/games/car-race'
  },
  {
    title: 'Snake Game',
    description: 'Control the snake, eat the food, and grow as long as possible without hitting the walls or yourself',
    icon: <SportsEsportsIcon fontSize="large" color="primary" />,
    category: 'Arcade',
    ageRange: '6-12 years',
    rating: 4.7,
    color: '#e8f5e9',
    path: '/games/snake'
  }
];

// Define themes
const themes = [
  {
    id: 'icecream',
    name: 'Ice Cream Shop',
    icon: <IcecreamIcon sx={{ fontSize: 40 }} />,
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
    backgroundColor: '#e1f5fe', // Light blue
    gradient: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)',
    shadowColor: 'rgba(179, 229, 252, 0.6)',
    textColor: '#ec407a',
    accentColor: '#ffd54f'
  }
];

// Define profiles
const profiles = [
  {
    id: 'vidushi',
    name: 'Vidushi',
    icon: <CakeIcon sx={{ fontSize: 40 }} />,
    backgroundColor: '#f8bbd0', // Light pink
    gradient: 'linear-gradient(135deg, #f8bbd0 0%, #f48fb1 100%)',
    shadowColor: 'rgba(244, 143, 177, 0.4)',
    textColor: '#c2185b',
    score: 1250
  },
  {
    id: 'rishika',
    name: 'Rishika',
    icon: <IcecreamIcon sx={{ fontSize: 40 }} />,
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

const GamesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState<any>(null);

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

    // Get selected theme from localStorage
    const themeId = localStorage.getItem('selectedTheme');
    if (themeId) {
      const theme = themes.find(t => t.id === themeId);
      if (theme) {
        setSelectedTheme(theme);
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

  const handlePlayGame = (path: string) => {
    navigate(path);
  };

  const handleBackToSubjects = () => {
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
      sx={{
        minHeight: '100vh',
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

      {/* Top Navigation */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 4, zIndex: 10 }}>
        {/* Back Button */}
        <Fab 
          color="default" 
          aria-label="back"
          onClick={handleBackToSubjects}
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
          onClick={handleBackToHome}
          sx={{ 
            boxShadow: '0px 3px 8px rgba(0,0,0,0.2)',
            bgcolor: 'white'
          }}
        >
          <HomeIcon />
        </Fab>
      </Box>

      {/* Games Section */}
      <Container maxWidth="lg" sx={{ mb: 4, zIndex: 1 }}>
        <Grid container spacing={4} justifyContent="center">
          {games.map((game, index) => (
            <Grid item xs={12} sm={6} key={game.title}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: '0.3s',
                    bgcolor: game.color,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0px 8px 16px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                  }}
                  onClick={() => handlePlayGame(game.path)}
                >
                  <CardContent sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ 
                      p: 3, 
                      bgcolor: 'white', 
                      borderRadius: '50%',
                      boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 120,
                      height: 120,
                      mb: 3
                    }}>
                      {game.title === 'Car Race' ? 
                        <DirectionsCarIcon sx={{ fontSize: 60, color: 'primary.main' }} /> : 
                        <SportsEsportsIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                      }
                    </Box>
                    <Typography
                      variant="h4"
                      component="h3"
                      sx={{ fontWeight: 'bold', textAlign: 'center' }}
                    >
                      {game.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GamesPage; 