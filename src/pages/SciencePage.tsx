import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import PetsIcon from '@mui/icons-material/Pets';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterIcon from '@mui/icons-material/Water';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TerrainIcon from '@mui/icons-material/Terrain';
import NatureIcon from '@mui/icons-material/Nature';
import AirIcon from '@mui/icons-material/Air';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const MotionCard = motion.create(Card);
const MotionPaper = motion.create(Paper);

const scienceActivities = [
  {
    title: 'Animal Kingdom',
    description: 'Explore different animals and their habitats',
    icon: <PetsIcon fontSize="large" color="primary" />,
    level: 'Beginner',
    ageRange: '3-6 years',
    color: '#fff8e1',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffc947 100%)',
    shadowColor: 'rgba(255, 152, 0, 0.4)'
  },
  {
    title: 'Weather Wonders',
    description: 'Learn about weather patterns and phenomena',
    icon: <WbSunnyIcon fontSize="large" color="primary" />,
    level: 'Beginner',
    ageRange: '4-7 years',
    color: '#e3f2fd',
    gradient: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)',
    shadowColor: 'rgba(33, 150, 243, 0.4)'
  },
  {
    title: 'Plant Life',
    description: 'Discover how plants grow and their importance',
    icon: <NatureIcon fontSize="large" color="primary" />,
    level: 'Beginner',
    ageRange: '3-6 years',
    color: '#e8f5e9',
    gradient: 'linear-gradient(135deg, #4caf50 0%, #80e27e 100%)',
    shadowColor: 'rgba(76, 175, 80, 0.4)'
  },
  {
    title: 'Water Science',
    description: 'Explore properties of water through fun experiments',
    icon: <WaterIcon fontSize="large" color="primary" />,
    level: 'Intermediate',
    ageRange: '5-8 years',
    color: '#e0f7fa',
    gradient: 'linear-gradient(135deg, #00bcd4 0%, #4dd0e1 100%)',
    shadowColor: 'rgba(0, 188, 212, 0.4)'
  },
  {
    title: 'Space Explorers',
    description: 'Journey through our solar system and beyond',
    icon: <RocketLaunchIcon fontSize="large" color="primary" />,
    level: 'Intermediate',
    ageRange: '5-8 years',
    color: '#ede7f6',
    gradient: 'linear-gradient(135deg, #673ab7 0%, #9575cd 100%)',
    shadowColor: 'rgba(103, 58, 183, 0.4)'
  },
  {
    title: 'Earth Science',
    description: 'Learn about our planet, rocks, and natural resources',
    icon: <TerrainIcon fontSize="large" color="primary" />,
    level: 'Intermediate',
    ageRange: '6-8 years',
    color: '#fff3e0',
    gradient: 'linear-gradient(135deg, #e65100 0%, #ff9800 100%)',
    shadowColor: 'rgba(230, 81, 0, 0.4)'
  }
];

const experiments = [
  {
    title: 'Rainbow in a Glass',
    description: 'Create a colorful density experiment with different liquids',
    materials: ['Sugar', 'Water', 'Food coloring', 'Clear glasses'],
    difficulty: 'Easy',
    gradient: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)',
    shadowColor: 'rgba(33, 150, 243, 0.4)'
  },
  {
    title: 'Volcano Eruption',
    description: 'Make a model volcano and watch it erupt with a chemical reaction',
    materials: ['Baking soda', 'Vinegar', 'Dish soap', 'Food coloring'],
    difficulty: 'Easy',
    gradient: 'linear-gradient(135deg, #f44336 0%, #ff7961 100%)',
    shadowColor: 'rgba(244, 67, 54, 0.4)'
  },
  {
    title: 'Growing Crystals',
    description: 'Observe crystal formation with a simple salt solution',
    materials: ['Salt or sugar', 'Water', 'String', 'Pencil'],
    difficulty: 'Medium',
    gradient: 'linear-gradient(135deg, #9c27b0 0%, #d05ce3 100%)',
    shadowColor: 'rgba(156, 39, 176, 0.4)'
  }
];

const SciencePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ 
      flexGrow: 1, 
      overflow: 'hidden',
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: '#f8f9fa',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)'
    }}>
      {/* App Header */}
      <Box
        sx={{
          bgcolor: 'white',
          py: 2.5,
          px: 3.5,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 2.5,
          background: 'linear-gradient(90deg, #ffffff 0%, #f8f9fa 100%)'
        }}
      >
        <IconButton 
          onClick={() => navigate('/')} 
          color="primary"
          sx={{ 
            p: 1.5,
            boxShadow: '0px 3px 8px rgba(255, 152, 0, 0.2)',
            '&:hover': {
              background: 'rgba(255, 152, 0, 0.1)'
            }
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Avatar 
          sx={{ 
            width: 60, 
            height: 60, 
            bgcolor: '#ff9800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 4px 10px rgba(255, 152, 0, 0.3)'
          }}
        >
          <ScienceIcon sx={{ fontSize: 36, color: 'white' }} />
        </Avatar>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            background: 'linear-gradient(45deg, #ff9800 30%, #ffc947 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0px 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          Science Explorers
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ flexGrow: 1, py: 4 }}
      >
        {/* Science Activities Section */}
        <Container maxWidth="lg" sx={{ mb: 7 }}>
          <Typography
            variant="h3"
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              color: theme.palette.secondary.main,
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Science Topics to Explore
          </Typography>
          
          <Grid container spacing={4}>
            {scienceActivities.map((activity, index) => (
              <Grid item xs={12} sm={6} md={4} key={activity.title}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: `0px 15px 30px ${activity.shadowColor}`
                  }}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: activity.gradient,
                    boxShadow: `0px 8px 20px ${activity.shadowColor}`,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
                      {React.cloneElement(activity.icon, { 
                        fontSize: 'large', 
                        sx: { fontSize: 50, color: 'white' } 
                      })}
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      sx={{ 
                        fontWeight: 'bold', 
                        textAlign: 'center',
                        color: 'white',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                        mb: 1.5
                      }}
                    >
                      {activity.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      paragraph
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        textAlign: 'center',
                        fontSize: '1.1rem',
                        mb: 2
                      }}
                    >
                      {activity.description}
                    </Typography>
                    <Divider sx={{ my: 1.5, backgroundColor: 'rgba(255,255,255,0.2)' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 'bold',
                          fontSize: '0.95rem'
                        }}
                      >
                        Level: {activity.level}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 'bold',
                          fontSize: '0.95rem'
                        }}
                      >
                        Ages: {activity.ageRange}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                      <Button 
                        variant="contained" 
                        sx={{ 
                          borderRadius: 30,
                          py: 1.2,
                          px: 3.5,
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          backgroundColor: 'white',
                          color: theme.palette.secondary.main,
                          boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                          '&:hover': {
                            backgroundColor: 'white',
                            boxShadow: '0px 6px 15px rgba(0,0,0,0.2)',
                            transform: 'translateY(-3px)'
                          }
                        }}
                      >
                        Explore
                      </Button>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Experiments Section */}
        <Box sx={{ 
          bgcolor: 'white', 
          py: 6,
          boxShadow: 'inset 0px 4px 20px rgba(0,0,0,0.05)'
        }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{ 
                mb: 5, 
                fontWeight: 'bold',
                textAlign: 'center',
                color: theme.palette.secondary.main,
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              Fun Science Experiments
            </Typography>
            
            <Grid container spacing={5}>
              {experiments.map((experiment, index) => (
                <Grid item xs={12} md={4} key={experiment.title}>
                  <MotionPaper
                    elevation={0}
                    sx={{ 
                      p: 4, 
                      height: '100%', 
                      borderRadius: 4,
                      boxShadow: '0px 8px 24px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      background: 'white',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0px 12px 30px rgba(0,0,0,0.12)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '8px',
                        background: experiment.gradient
                      }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 * index }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'transparent', 
                          mr: 2,
                          width: 60,
                          height: 60,
                          background: experiment.gradient,
                          boxShadow: `0px 4px 10px ${experiment.shadowColor}`
                        }}
                      >
                        <BiotechIcon sx={{ fontSize: 36, color: 'white' }} />
                      </Avatar>
                      <Typography 
                        variant="h4" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 'bold',
                          background: experiment.gradient,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        {experiment.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      paragraph
                      sx={{ fontSize: '1.15rem', lineHeight: 1.6, mb: 3 }}
                    >
                      {experiment.description}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold', 
                        mt: 2, 
                        mb: 2,
                        color: theme.palette.secondary.main
                      }}
                    >
                      Materials:
                    </Typography>
                    <List dense>
                      {experiment.materials.map((material, i) => (
                        <ListItem key={i} disableGutters sx={{ mb: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <AirIcon sx={{ color: theme.palette.secondary.main, fontSize: 24 }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={material} 
                            primaryTypographyProps={{ 
                              fontSize: '1.1rem',
                              fontWeight: 500
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, alignItems: 'center' }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: theme.palette.secondary.main,
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}
                      >
                        Difficulty: {experiment.difficulty}
                      </Typography>
                      <Button 
                        variant="contained" 
                        sx={{ 
                          borderRadius: 30,
                          py: 1,
                          px: 3,
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          background: experiment.gradient,
                          boxShadow: `0px 4px 10px ${experiment.shadowColor}`,
                          '&:hover': {
                            background: experiment.gradient,
                            boxShadow: `0px 6px 15px ${experiment.shadowColor}`,
                            transform: 'translateY(-3px)'
                          }
                        }}
                      >
                        View Instructions
                      </Button>
                    </Box>
                  </MotionPaper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default SciencePage; 