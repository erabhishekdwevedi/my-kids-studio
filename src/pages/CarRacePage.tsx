import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container,
  Avatar,
  Fab,
  Paper,
  Grid,
  IconButton,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { motion, useDragControls } from 'framer-motion';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';
import ForestIcon from '@mui/icons-material/Forest';
import CelebrationIcon from '@mui/icons-material/Celebration';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { CarRaceGame } from '../games/CarRaceGame';
import PageNavigation from '../components/PageNavigation';

// Create a theme with consistent fonts
const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
  },
});

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

// Define the type for the game ref
interface CarRaceGameHandle {
  movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

const CarRacePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [score, setScore] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [sprinkles, setSprinkles] = useState<any[]>([]);
  const gameRef = useRef<CarRaceGameHandle>(null);
  const controlsRef = useRef<any>(null);
  const dragControls = useDragControls();
  
  useEffect(() => {
    // Get selected profile from localStorage
    const profileId = localStorage.getItem('selectedProfile');
    const themeId = localStorage.getItem('selectedTheme');
    
    if (profileId) {
      const profile = profiles.find(p => p.id === profileId);
      if (profile) {
        setSelectedProfile(profile);
      }
    }
    
    if (themeId) {
      const theme = themes.find(t => t.id === themeId);
      if (theme) {
        setSelectedTheme(theme);
      }
    }
    
    // Generate sprinkles
    if (themeId) {
      setSprinkles(generateSprinkles(themeId));
    }
  }, []);
  
  const generateSprinkles = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return [];
    
    const colors = [theme.textColor, theme.accentColor, '#ffffff'];
    
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2
    }));
  };
  
  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
  };
  
  const handleControlPress = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameRef.current) {
      gameRef.current.movePlayer(direction);
    }
  };
  
  const handleBack = () => {
    navigate('/subject/games');
  };

  const handleHome = () => {
    navigate('/');
  };
  
  if (!selectedProfile || !selectedTheme) {
    return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          fontFamily: theme.typography.fontFamily, // Apply font family to the root element
        }}
      >
        

        {/* Top Navigation */}
        <PageNavigation 
          profile={selectedProfile}
          theme={selectedTheme}
          showTitle={false}
          title="Car Race"
          onBackClick={handleBack}
          onHomeClick={handleHome}
          showMuteButton={true}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mt: 2 }}>
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
                mb: 2
              }}
            >
              Car Race
            </Typography>
          </motion.div>

          {/* Game Container */}
          <Paper 
            elevation={3}
            sx={{ 
              p: 2, 
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              height: '60vh',
              maxHeight: '500px',
              mb: 3
            }}
          >
            <Box 
              sx={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: '#222',
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <CarRaceGame 
                ref={gameRef}
                onScoreChange={handleScoreChange}
                themeColor={selectedTheme.textColor}
              />
            </Box>
            
            {/* Score Display */}
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: 2,
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <StarIcon sx={{ color: '#ffd54f', fontSize: 20, marginRight: 0.5 }} />
              <Typography sx={{ fontWeight: 'bold' }}>
                {score}
              </Typography>
            </Box>
          </Paper>

          {/* Game Controls */}
          <motion.div
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0.1}
            ref={controlsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 4,
                width: 'fit-content',
                margin: '0 auto',
                position: 'relative'
              }}
            >
              <DragIndicatorIcon 
                sx={{ 
                  position: 'absolute', 
                  top: 8, 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  color: 'text.secondary',
                  cursor: 'grab'
                }}
                onPointerDown={(e) => dragControls.start(e)}
              />
              
              <Grid container spacing={1} sx={{ mt: 2 }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton 
                    color="primary" 
                    size="large"
                    onMouseDown={() => handleControlPress('up')}
                    onTouchStart={() => handleControlPress('up')}
                    sx={{ 
                      bgcolor: 'rgba(0,0,0,0.05)',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
                    }}
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton 
                      color="primary" 
                      size="large"
                      onMouseDown={() => handleControlPress('left')}
                      onTouchStart={() => handleControlPress('left')}
                      sx={{ 
                        bgcolor: 'rgba(0,0,0,0.05)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
                      }}
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton 
                      color="primary" 
                      size="large"
                      onMouseDown={() => handleControlPress('down')}
                      onTouchStart={() => handleControlPress('down')}
                      sx={{ 
                        bgcolor: 'rgba(0,0,0,0.05)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
                      }}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                    <IconButton 
                      color="primary" 
                      size="large"
                      onMouseDown={() => handleControlPress('right')}
                      onTouchStart={() => handleControlPress('right')}
                      sx={{ 
                        bgcolor: 'rgba(0,0,0,0.05)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
                      }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CarRacePage; 