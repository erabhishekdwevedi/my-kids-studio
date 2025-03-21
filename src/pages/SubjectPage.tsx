import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';
import ForestIcon from '@mui/icons-material/Forest';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BrushIcon from '@mui/icons-material/Brush';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CalculateIcon from '@mui/icons-material/Calculate';
import ScienceIcon from '@mui/icons-material/Science';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PestControlIcon from '@mui/icons-material/PestControl';
import FlagIcon from '@mui/icons-material/Flag';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import { generateSprinkles, getThemeColors, generateJungleAnimals } from '../utils/animations';
import PageNavigation from '../components/PageNavigation';
import Sprinkle from '../components/Sprinkle';
import JungleAnimal from '../components/JungleAnimal';
import { panchatantraStories } from '../data/storyData';
import StoryCard from '../components/StoryCard';
import { useTheme } from '@mui/material/styles';

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

// Define profiles
const profiles = [
  {
    id: 'vidushi',
    name: 'Vidushi',
    icon: <CakeIcon sx={{ fontSize: 40 }} />,
    description: 'Strawberry Cake',
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
    description: 'Blueberry Ice Cream',
    backgroundColor: '#bbdefb', // Light blue
    gradient: 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
    shadowColor: 'rgba(144, 202, 249, 0.4)',
    textColor: '#1565c0',
    score: 980
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

// Define topics for each subject
const topicsBySubject = {
  games: [
    {
      id: 'car-race',
      name: 'Car Race',
      icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
      path: '/subject/games/topic/car-race',
      description: 'Race against time and other cars'
    },
    {
      id: 'snake',
      name: 'Snake',
      icon: <PestControlIcon sx={{ fontSize: 40 }} />,
      path: '/subject/games/topic/snake',
      description: 'Classic snake game with a twist'
    }
  ],
  art: [
    {
      id: 'drawing-board',
      name: 'Drawing Board',
      icon: <BrushIcon sx={{ fontSize: 40 }} />,
      path: '/subject/art/topic/drawing-board',
      description: 'Create colorful drawings and art'
    }
  ],
  music: [
    {
      id: 'piano',
      name: 'Piano',
      icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
      path: '/subject/music/topic/piano',
      description: 'Play piano and learn songs'
    }
  ],
  gk: [
    {
      id: 'flags',
      name: 'World Flags',
      icon: <FlagIcon sx={{ fontSize: 40 }} />,
      path: '/subject/gk/topic/flags',
      description: 'Learn about flags from around the world'
    },
    {
      id: 'capitals',
      name: 'Capital Cities',
      icon: <LocationCityIcon sx={{ fontSize: 40 }} />,
      path: '/subject/gk/topic/capitals',
      description: 'Discover capital cities of different countries'
    },
    {
      id: 'monuments',
      name: 'Famous Monuments',
      icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
      path: '/subject/gk/topic/monuments',
      description: 'Explore famous monuments and landmarks'
    },
    {
      id: 'people',
      name: 'Famous People',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      path: '/subject/gk/topic/people',
      description: 'Learn about important people in history'
    }
  ]
};

const SubjectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [selectedTheme, setSelectedTheme] = useState<any>(null);
  const [currentSubject, setCurrentSubject] = useState<any>(null);

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

    // Determine current subject based on path
    const path = location.pathname;
    const subject = subjects.find(s => s.path === path);
    if (subject) {
      setCurrentSubject(subject);
    }
  }, [navigate, location.pathname]);

  // Generate random sprinkles based on theme
  const sprinkles = useMemo(() => {
    if (!selectedTheme) return [];
    
    const colors = getThemeColors(selectedTheme.id);
    return generateSprinkles(30, colors);
  }, [selectedTheme]);

  // Generate jungle animals if jungle theme is selected
  const jungleAnimals = useMemo(() => {
    return selectedTheme?.id === 'jungle' ? generateJungleAnimals() : [];
  }, [selectedTheme?.id]);

  // Check if the current subject has topics
  const hasTopics = currentSubject && topicsBySubject[currentSubject.id as keyof typeof topicsBySubject];
  const currentTopics = currentSubject ? topicsBySubject[currentSubject.id as keyof typeof topicsBySubject] || [] : [];

  const handleBackToSubjects = () => {
    navigate('/subjects');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleTopicSelect = (path: string) => {
    // Direct navigation to game pages for game topics
    if (path === '/subject/games/topic/car-race') {
      navigate('/car-race');
    } else if (path === '/subject/games/topic/snake') {
      navigate('/snake');
    } else if (path === '/subject/art/topic/drawing-board') {
      navigate('/drawing-board');
    } else if (path === '/subject/music/topic/piano') {
      navigate('/piano');
    } 
    // Handle GK quiz topics
    else if (path === '/subject/gk/topic/flags') {
      navigate('/quiz/flags');
    } else if (path === '/subject/gk/topic/capitals') {
      navigate('/quiz/capitals');
    } else if (path === '/subject/gk/topic/monuments') {
      navigate('/quiz/monuments');
    } else if (path === '/subject/gk/topic/people') {
      navigate('/quiz/people');
    } 
    // Handle math subject
    else if (path === '/subject/math') {
      navigate('/math');
    } else {
      navigate(path);
    }
  };

  if (!selectedProfile || !selectedTheme || !currentSubject) {
    return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        maxHeight: '100vh',
        background: selectedTheme.gradient,
        position: 'relative',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Decorative sprinkles with reduced opacity */}
      {sprinkles.map(sprinkle => (
        <Sprinkle 
          key={sprinkle.id}
          color={sprinkle.color}
          top={sprinkle.top}
          left={sprinkle.left}
          delay={sprinkle.delay}
        />
      ))}

      {/* Jungle Animals with reduced opacity */}
      {jungleAnimals.map((animal, index) => (
        <JungleAnimal
          key={`animal-${index}`}
          type={animal.type}
          position={animal.position}
          delay={animal.delay}
        />
      ))}

      {/* Top Navigation */}
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
          showTitle={false}
          title={currentSubject.name}
          onBackClick={handleBackToSubjects}
          onHomeClick={handleBackToHome}
          showMuteButton={true}
        />
      </Box>

      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 2, md: 3 },
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          height: '100%',
          position: 'relative',
          zIndex: 1
        }}
      >
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
            {currentSubject.name}
          </Typography>
        </motion.div>

        {/* Display topics if available, otherwise show coming soon or redirect for special subjects */}
        {hasTopics ? (
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4 }}
            sx={{ 
              width: '100%',
              margin: '0 auto',
              py: { xs: 2, sm: 3 },
              flexGrow: 1
            }}
          >
            {currentTopics.map((topic, index) => (
              <Grid item xs={12} sm={6} md={4} key={topic.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    onClick={() => handleTopicSelect(topic.path)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 4,
                      boxShadow: `0 8px 24px ${selectedTheme.shadowColor}`,
                      transition: 'all 0.3s ease',
                      border: selectedTheme.id === 'icecream' 
                        ? '5px solid #f8bbd0'
                        : selectedTheme.id === 'jungle'
                          ? '5px solid #a5d6a7'
                          : '5px solid #b3e5fc',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 12px 48px ${selectedTheme.shadowColor}`,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography 
                        variant="h5" 
                        align="center" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 700, 
                          color: selectedTheme.textColor,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                          mb: 2
                        }}
                      >
                        {topic.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        align="center" 
                        sx={{ 
                          color: selectedTheme.textColor,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                          mb: 2
                        }}
                      >
                        {topic.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        ) : (
          // Special handling for math subject
          currentSubject.id === 'math' ? (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/math')}
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: 2,
                  fontSize: '1.2rem',
                  backgroundColor: selectedTheme.textColor,
                  '&:hover': {
                    backgroundColor: selectedTheme.textColor + 'dd',
                  }
                }}
              >
                Go to Math Activities
              </Button>
            </Box>
          ) : (
            <Box sx={{ p: 4, textAlign: 'center' }}>Coming Soon</Box>
          )
        )}

        {currentSubject.id === 'story' && (
          <Box sx={{ mt: 4 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                color: selectedTheme?.textColor || theme.palette.text.primary,
                mb: 3
              }}
            >
              Panchatantra Stories
            </Typography>
            
            <Grid container spacing={3}>
              {panchatantraStories.map((story, index) => (
                <Grid item xs={12} sm={6} md={4} key={story.id}>
                  <StoryCard story={story} delay={index} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SubjectPage;