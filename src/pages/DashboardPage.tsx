import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card,
  Avatar,
  Button,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Icons
import CalculateIcon from '@mui/icons-material/Calculate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScienceIcon from '@mui/icons-material/Science';
import CakeIcon from '@mui/icons-material/Cake';
import IcecreamIcon from '@mui/icons-material/Icecream';
import StarIcon from '@mui/icons-material/Star';
import ForestIcon from '@mui/icons-material/Forest';
import PetsIcon from '@mui/icons-material/Pets';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const MotionContainer = motion.create(Container);
const MotionTypography = motion.create(Typography);
const MotionGrid = motion.create(Grid);
const MotionBox = motion.create(Box);

// Theme definitions
const themes = [
  {
    id: 'icecream',
    name: 'Ice Cream Shop',
    icon: <IcecreamIcon sx={{ fontSize: 80, color: '#f06292' }} />,
    background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
    primaryColor: '#f06292', // Pink (strawberry)
    secondaryColor: '#7986cb', // Indigo (blueberry)
    accentColor: '#4db6ac', // Teal (mint)
    textColor: '#5d4037', // Chocolate brown
    sprinkleColors: ['#f06292', '#7986cb', '#4db6ac', '#ffb74d', '#aed581'],
    borderStyle: '5px dashed #ffcc80', // Wafer border
    categoryStyles: {
      math: {
        title: 'Math Adventures',
        description: 'Fun with numbers, shapes, and puzzles',
        icon: <CalculateIcon sx={{ fontSize: 50, color: 'white' }} />,
        bgColor: 'linear-gradient(135deg, #f06292 0%, #f8bbd0 100%)',
        shadowColor: 'rgba(240, 98, 146, 0.4)',
        dessert: 'Strawberry Cupcake'
      },
      reading: {
        title: 'Reading & Language',
        description: 'Stories, vocabulary, and language skills',
        icon: <MenuBookIcon sx={{ fontSize: 50, color: 'white' }} />,
        bgColor: 'linear-gradient(135deg, #7986cb 0%, #9fa8da 100%)',
        shadowColor: 'rgba(121, 134, 203, 0.4)',
        dessert: 'Blueberry Muffin'
      },
      science: {
        title: 'Science Explorers',
        description: 'Discover the wonders of science',
        icon: <ScienceIcon sx={{ fontSize: 50, color: 'white' }} />,
        bgColor: 'linear-gradient(135deg, #4db6ac 0%, #80cbc4 100%)',
        shadowColor: 'rgba(77, 182, 172, 0.4)',
        dessert: 'Mint Chocolate Chip'
      }
    }
  },
  {
    id: 'jungle',
    name: 'Jungle Book',
    icon: <ForestIcon sx={{ fontSize: 80, color: '#66bb6a' }} />,
    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    primaryColor: '#66bb6a', // Green
    secondaryColor: '#8d6e63', // Brown
    accentColor: '#ffb74d', // Orange
    textColor: '#33691e', // Dark green
    sprinkleColors: ['#66bb6a', '#8d6e63', '#ffb74d', '#43a047', '#1b5e20'],
    borderStyle: '5px solid #8d6e63', // Wood border
    categoryStyles: {
      math: {
        title: 'Jungle Math',
        description: 'Count animals and measure vines',
        icon: <CalculateIcon sx={{ fontSize: 50, color: 'white' }} />,
        bgColor: 'linear-gradient(135deg, #66bb6a 0%, #81c784 100%)',
        shadowColor: 'rgba(102, 187, 106, 0.4)',
        dessert: 'Jungle Counting'
      },
      reading: {
        title: 'Jungle Stories',
        description: 'Tales from the wild and animal adventures',
        icon: <MenuBookIcon sx={{ fontSize: 50, color: 'white' }} />,
        bgColor: 'linear-gradient(135deg, #8d6e63 0%, #a1887f 100%)',
        shadowColor: 'rgba(141, 110, 99, 0.4)',
        dessert: 'Animal Tales'
      },
      science: {
        title: 'Wildlife Science',
        description: 'Discover plants, animals and ecosystems',
        icon: <ScienceIcon sx={{ fontSize: 50, color: 'white' }} />,
        bgColor: 'linear-gradient(135deg, #ffb74d 0%, #ffcc80 100%)',
        shadowColor: 'rgba(255, 183, 77, 0.4)',
        dessert: 'Nature Explorer'
      }
    }
  },
  {
    id: 'carnival',
    name: 'Carnival Fun',
    icon: <CelebrationIcon sx={{ fontSize: 80, color: '#ec407a' }} />,
    background: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)',
    primaryColor: '#ec407a', // Pink
    secondaryColor: '#ffd54f', // Yellow
    accentColor: '#29b6f6', // Blue
    textColor: '#0277bd', // Dark blue
    sprinkleColors: ['#ec407a', '#ffd54f', '#29b6f6', '#7e57c2', '#26c6da'],
    borderStyle: '5px dotted #ffd54f', // Festive dotted border
    categoryStyles: {
      math: {
        title: 'Carnival Math',
        description: 'Fun with numbers at the fair',
        icon: <CalculateIcon sx={{ fontSize: 50, color: 'white' }} />,
        bgColor: 'linear-gradient(135deg, #ec407a 0%, #f48fb1 100%)',
        shadowColor: 'rgba(236, 64, 122, 0.4)',
        dessert: 'Number Games'
      },
      reading: {
        title: 'Carnival Stories',
        description: 'Exciting tales from the big top',
        icon: <MenuBookIcon sx={{ fontSize: 50, color: 'white' }} />,
        bgColor: 'linear-gradient(135deg, #ffd54f 0%, #ffe082 100%)',
        shadowColor: 'rgba(255, 213, 79, 0.4)',
        dessert: 'Story Tickets'
      },
      science: {
        title: 'Carnival Science',
        description: 'The amazing science behind rides and games',
        icon: <ScienceIcon sx={{ fontSize: 50, color: 'white' }} />,
        bgColor: 'linear-gradient(135deg, #29b6f6 0%, #4fc3f7 100%)',
        shadowColor: 'rgba(41, 182, 246, 0.4)',
        dessert: 'Science Magic'
      }
    }
  }
];

const profiles = [
  {
    name: 'Vidushi',
    icon: <CakeIcon sx={{ fontSize: 80, color: '#5d4037' }} />,
    description: 'Strawberry Cake',
    score: 1250
  },
  {
    name: 'Rishika',
    icon: <IcecreamIcon sx={{ fontSize: 80, color: '#5d4037' }} />,
    description: 'Blueberry Ice Cream',
    score: 980
  }
];

// Sweet sprinkle shapes for decoration
const Sprinkle = ({ top, left, color, rotate, delay }: { top: string, left: string, color: string, rotate: number, delay: number }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    sx={{
      position: 'absolute',
      top,
      left,
      width: '12px',
      height: '4px',
      borderRadius: '4px',
      backgroundColor: color,
      transform: `rotate(${rotate}deg)`,
      zIndex: 0
    }}
  />
);

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('icecream');
  
  // Get current theme
  const currentTheme = themes.find(theme => theme.id === selectedTheme) || themes[0];
  
  // Generate categories based on current theme
  const categories = [
    {
      ...currentTheme.categoryStyles.math,
      path: '/math'
    },
    {
      ...currentTheme.categoryStyles.reading,
      path: '/reading'
    },
    {
      ...currentTheme.categoryStyles.science,
      path: '/science'
    }
  ];
  
  // Generate random sprinkles for decoration
  const sprinkles = Array.from({ length: 30 }, (_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    color: currentTheme.sprinkleColors[Math.floor(Math.random() * currentTheme.sprinkleColors.length)],
    rotate: Math.random() * 360,
    delay: Math.random() * 0.5
  }));

  useEffect(() => {
    // Get selected profile from localStorage
    const profileIndex = localStorage.getItem('selectedProfile');
    const themeId = localStorage.getItem('selectedTheme');
    
    if (profileIndex) {
      setSelectedProfile(parseInt(profileIndex));
    } else {
      // Redirect to home if no profile is selected
      navigate('/');
    }
    
    if (themeId) {
      setSelectedTheme(themeId);
    }
  }, [navigate]);

  const handleChangeProfile = () => {
    // Clear selected profile and redirect to home
    localStorage.removeItem('selectedProfile');
    navigate('/');
  };

  // If no profile is selected yet, show loading or redirect
  if (selectedProfile === null) {
    return null; // Or a loading spinner
  }

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        overflow: 'hidden',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
        transition: 'all 0.5s ease',
        position: 'relative'
      }}
    >
      

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto', position: 'relative', zIndex: 1 }}>
        <MotionContainer maxWidth="md" sx={{ py: 4 }}>
          {/* Profile and Score Header */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 5,
              pb: 3,
              borderBottom: '1px solid rgba(0,0,0,0.12)'
            }}
          >
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2 
              }}
            >
              <Avatar 
                sx={{ 
                  width: 60, 
                  height: 60,
                  bgcolor: 'white',
                  boxShadow: `0px 4px 8px ${currentTheme.primaryColor}40`
                }}
              >
                {profiles[selectedProfile].icon}
              </Avatar>
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: currentTheme.textColor
                  }}
                >
                  {profiles[selectedProfile].name}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: currentTheme.textColor,
                    opacity: 0.8
                  }}
                >
                  {profiles[selectedProfile].description}
                </Typography>
              </Box>
            </MotionBox>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Chip
                  icon={<StarIcon sx={{ color: '#ffd54f !important' }} />}
                  label={`${profiles[selectedProfile].score} Points`}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    border: '2px solid #ffd54f',
                    color: currentTheme.textColor,
                    fontWeight: 'bold',
                    px: 1,
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }}
                />
              </MotionBox>
              
              <Button
                variant="outlined"
                onClick={handleChangeProfile}
                sx={{
                  color: currentTheme.textColor,
                  borderColor: currentTheme.textColor,
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: currentTheme.textColor,
                    borderWidth: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                Change Profile
              </Button>
            </Box>
          </Box>
          
          <MotionTypography
            variant="h4"
            gutterBottom
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              color: currentTheme.textColor,
              opacity: 0.9
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {currentTheme.id === 'icecream' ? 'Pick Your Learning Flavor' : 
             currentTheme.id === 'jungle' ? 'Explore Learning Trails' : 
             'Choose Your Carnival Attraction'}
          </MotionTypography>
          
          <MotionGrid
            container
            spacing={4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={category.title}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                  whileHover={{ scale: 1.05, y: -5, rotate: 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    component={RouterLink}
                    to={category.path}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      p: 3,
                      background: category.bgColor,
                      textDecoration: 'none',
                      borderRadius: '24px',
                      boxShadow: `0px 8px 20px ${category.shadowColor}`,
                      transition: 'all 0.3s ease',
                      height: '100%',
                      border: '5px solid white',
                      position: 'relative',
                      overflow: 'visible',
                      '&:hover': {
                        boxShadow: `0px 12px 28px ${category.shadowColor}`,
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '50%',
                        height: '15px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.3)',
                        zIndex: 0
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: 'white', 
                        width: 80, 
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        boxShadow: `0px 6px 12px ${category.shadowColor}`
                      }}
                    >
                      {category.icon}
                    </Avatar>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{ 
                          fontWeight: 'bold', 
                          color: 'white',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                          mb: 1
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontSize: '1.1rem',
                          mb: 1
                        }}
                      >
                        {category.description}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          bgcolor: 'rgba(255,255,255,0.2)',
                          py: 0.5,
                          px: 1.5,
                          borderRadius: '20px',
                          display: 'inline-block',
                          mt: 1
                        }}
                      >
                        {category.dessert}
                      </Typography>
                    </Box>
                  </Card>
                </Box>
              </Grid>
            ))}
          </MotionGrid>
        </MotionContainer>
      </Box>
    </Box>
  );
};

export default DashboardPage; 