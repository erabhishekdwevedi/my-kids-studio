import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PestControlIcon from '@mui/icons-material/PestControl';

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

// Define games
const games = {
  'car-race': {
    name: 'Car Race',
    icon: <DirectionsCarIcon sx={{ fontSize: 60 }} />,
    description: 'Race against time and other cars',
    instructions: 'Use the arrow buttons to control your car. Avoid obstacles and reach the finish line!'
  },
  'snake': {
    name: 'Snake',
    icon: <PestControlIcon sx={{ fontSize: 60 }} />,
    description: 'Classic snake game with a twist',
    instructions: 'Use the arrow buttons to control the snake. Eat food to grow longer, but avoid hitting the walls or yourself!'
  }
};

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

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { gameId } = useParams<{ gameId: string }>();
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [score, setScore] = useState<number>(0);

  // Initial position for the controller
  const [controllerPosition, setControllerPosition] = useState({ x: 0, y: 0 });
  const dragControls = useDragControls();

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

    // Set current game based on gameId
    if (gameId && games[gameId as keyof typeof games]) {
      setCurrentGame(games[gameId as keyof typeof games]);
    } else {
      // If game not found, redirect to subjects
      navigate('/subject/games');
    }
  }, [navigate, gameId]);

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

  const handleBack = () => {
    navigate('/subject/games');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleControlPress = (direction: 'up' | 'down' | 'left' | 'right') => {
    console.log(`${direction} button pressed`);
    // This would be implemented differently for each game
    if (gameId === 'car-race') {
      // Car race controls
      if (direction === 'up') {
        setScore(prev => prev + 10); // Just for demo
      }
    } else if (gameId === 'snake') {
      // Snake controls
      if (direction === 'right') {
        setScore(prev => prev + 5); // Just for demo
      }
    }
  };

  if (!selectedProfile || !selectedTheme || !currentGame) {
    return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: selectedTheme.gradient,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          fontFamily: theme.typography.fontFamily, // Apply font family to the root element
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
            onClick={handleBack}
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
            onClick={handleHome}
            sx={{ 
              boxShadow: '0px 3px 8px rgba(0,0,0,0.2)',
              bgcolor: 'white'
            }}
          >
            <HomeIcon />
          </Fab>
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4}>
            {/* Game Display Container */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  backgroundColor: 'white',
                  border: selectedTheme.id === 'icecream' 
                    ? '5px solid #f8bbd0'
                    : selectedTheme.id === 'jungle'
                      ? '5px solid #a5d6a7'
                      : '5px solid #b3e5fc',
                  height: '450px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  mb: 4 // Reduced margin since controller is now floating
                }}
              >
                {/* Game Display */}
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    padding: 2
                  }}
                >
                  {/* Placeholder for actual game */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {currentGame.icon}
                  </motion.div>
                  
                  {/* Score Display */}
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10, 
                      backgroundColor: selectedTheme.backgroundColor,
                      padding: '5px 15px',
                      borderRadius: 20,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <StarIcon sx={{ color: '#ffd54f', fontSize: 20, marginRight: 0.5 }} />
                    <Typography 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: selectedTheme.textColor,
                        fontSize: '1rem',
                        fontFamily: theme.typography.fontFamily // Apply consistent font
                      }}
                    >
                      {score}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Floating Controls Container */}
          <motion.div
            drag
            dragControls={dragControls}
            dragMomentum={false}
            initial={{ x: 0, y: 0 }}
            style={{ 
              position: 'fixed',
              bottom: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100,
              touchAction: 'none'
            }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: 4,
                padding: 2,
                boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                border: `2px solid ${selectedTheme.textColor}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 300,
                position: 'relative'
              }}
            >
              {/* Drag Handle */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 5, 
                  left: 0, 
                  right: 0, 
                  display: 'flex', 
                  justifyContent: 'center',
                  cursor: 'grab',
                  color: selectedTheme.textColor,
                  '&:active': { cursor: 'grabbing' }
                }}
                onPointerDown={(e) => dragControls.start(e)}
              >
                <DragIndicatorIcon />
              </Box>
              
              {/* Up Button */}
              <IconButton 
                color="primary" 
                sx={{ 
                  backgroundColor: selectedTheme.backgroundColor,
                  color: selectedTheme.textColor,
                  '&:hover': { backgroundColor: selectedTheme.accentColor, color: 'white' },
                  mb: 1,
                  mt: 3, // Added margin top to make space for drag handle
                  width: 80,
                  height: 80,
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)'
                }}
                onClick={() => handleControlPress('up')}
              >
                <ArrowUpwardIcon sx={{ fontSize: 40 }} />
              </IconButton>

              {/* Middle Row (Left, Right) */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                <IconButton 
                  color="primary" 
                  sx={{ 
                    backgroundColor: selectedTheme.backgroundColor,
                    color: selectedTheme.textColor,
                    '&:hover': { backgroundColor: selectedTheme.accentColor, color: 'white' },
                    width: 80,
                    height: 80,
                    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)'
                  }}
                  onClick={() => handleControlPress('left')}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 40 }} />
                </IconButton>

                <IconButton 
                  color="primary" 
                  sx={{ 
                    backgroundColor: selectedTheme.backgroundColor,
                    color: selectedTheme.textColor,
                    '&:hover': { backgroundColor: selectedTheme.accentColor, color: 'white' },
                    width: 80,
                    height: 80,
                    boxShadow: '0px 4px 8px rgba(0,0,0,0.2)'
                  }}
                  onClick={() => handleControlPress('right')}
                >
                  <ArrowForwardIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </Box>

              {/* Down Button */}
              <IconButton 
                color="primary" 
                sx={{ 
                  backgroundColor: selectedTheme.backgroundColor,
                  color: selectedTheme.textColor,
                  '&:hover': { backgroundColor: selectedTheme.accentColor, color: 'white' },
                  width: 80,
                  height: 80,
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)'
                }}
                onClick={() => handleControlPress('down')}
              >
                <ArrowDownwardIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default GamePage; 