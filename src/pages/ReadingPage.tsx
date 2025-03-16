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
  Divider,
  Chip,
  Avatar,
  IconButton,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AbcIcon from '@mui/icons-material/Abc';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import TranslateIcon from '@mui/icons-material/Translate';
import CreateIcon from '@mui/icons-material/Create';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import TopMenu from '../components/TopMenu';

const MotionCard = motion.create(Card);

const readingActivities = [
  {
    title: 'Alphabet Adventure',
    description: 'Learn letters and sounds through interactive games',
    icon: <AbcIcon fontSize="large" color="primary" />,
    level: 'Beginner',
    ageRange: '3-5 years',
    tags: ['Alphabet', 'Phonics'],
    color: '#e3f2fd',
    gradient: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)',
    shadowColor: 'rgba(33, 150, 243, 0.4)'
  },
  {
    title: 'Story Time',
    description: 'Enjoy interactive stories with colorful illustrations',
    icon: <AutoStoriesIcon fontSize="large" color="primary" />,
    level: 'All Levels',
    ageRange: '3-8 years',
    tags: ['Stories', 'Comprehension'],
    color: '#e8f5e9',
    gradient: 'linear-gradient(135deg, #4caf50 0%, #80e27e 100%)',
    shadowColor: 'rgba(76, 175, 80, 0.4)'
  },
  {
    title: 'Word Builder',
    description: 'Learn to form words with letters and sounds',
    icon: <CreateIcon fontSize="large" color="primary" />,
    level: 'Beginner',
    ageRange: '4-6 years',
    tags: ['Vocabulary', 'Spelling'],
    color: '#fff8e1',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffc947 100%)',
    shadowColor: 'rgba(255, 152, 0, 0.4)'
  },
  {
    title: 'Reading Comprehension',
    description: 'Understand stories through fun questions and activities',
    icon: <MenuBookIcon fontSize="large" color="primary" />,
    level: 'Intermediate',
    ageRange: '5-8 years',
    tags: ['Comprehension', 'Critical Thinking'],
    color: '#f3e5f5',
    gradient: 'linear-gradient(135deg, #9c27b0 0%, #d05ce3 100%)',
    shadowColor: 'rgba(156, 39, 176, 0.4)'
  },
  {
    title: 'Phonics Fun',
    description: 'Master letter sounds and phonics rules',
    icon: <RecordVoiceOverIcon fontSize="large" color="primary" />,
    level: 'Beginner',
    ageRange: '4-6 years',
    tags: ['Phonics', 'Pronunciation'],
    color: '#e0f7fa',
    gradient: 'linear-gradient(135deg, #00bcd4 0%, #4dd0e1 100%)',
    shadowColor: 'rgba(0, 188, 212, 0.4)'
  },
  {
    title: 'Vocabulary Builder',
    description: 'Expand your word knowledge through games and activities',
    icon: <TranslateIcon fontSize="large" color="primary" />,
    level: 'Intermediate',
    ageRange: '5-8 years',
    tags: ['Vocabulary', 'Language'],
    color: '#fce4ec',
    gradient: 'linear-gradient(135deg, #e91e63 0%, #f48fb1 100%)',
    shadowColor: 'rgba(233, 30, 99, 0.4)'
  }
];

const readingSkills = [
  {
    title: 'Language Development',
    description: 'Reading helps children develop language skills, expand vocabulary, and improve communication abilities.',
    icon: <AbcIcon sx={{ fontSize: 70, color: 'primary.main' }} />,
    gradient: 'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)'
  },
  {
    title: 'Cognitive Growth',
    description: 'Reading stimulates the brain, enhances concentration, and develops critical thinking and problem-solving skills.',
    icon: <AutoStoriesIcon sx={{ fontSize: 70, color: 'primary.main' }} />,
    gradient: 'linear-gradient(135deg, #4caf50 0%, #80e27e 100%)'
  },
  {
    title: 'Emotional Intelligence',
    description: 'Stories help children understand emotions, develop empathy, and learn about different perspectives and experiences.',
    icon: <RecordVoiceOverIcon sx={{ fontSize: 70, color: 'primary.main' }} />,
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffc947 100%)'
  }
];

const ReadingPage: React.FC = () => {
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
      <TopMenu title="Reading Adventures" showTitle={false} />

      {/* Main Content */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ flexGrow: 1, py: 4 }}
      >
        {/* Reading Activities Section */}
        <Container maxWidth="lg" sx={{ mb: 7 }}>
          <Typography
            variant="h3"
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Reading Activities
          </Typography>
          
          <Grid container spacing={4}>
            {readingActivities.map((activity, index) => (
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
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, justifyContent: 'center' }}>
                      {activity.tags.map(tag => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          size="medium" 
                          sx={{ 
                            color: 'white', 
                            borderColor: 'rgba(255,255,255,0.5)',
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            fontWeight: 'bold',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.25)',
                            }
                          }}
                          variant="outlined" 
                        />
                      ))}
                    </Box>
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
                          color: theme.palette.primary.main,
                          boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                          '&:hover': {
                            backgroundColor: 'white',
                            boxShadow: '0px 6px 15px rgba(0,0,0,0.2)',
                            transform: 'translateY(-3px)'
                          }
                        }}
                      >
                        Start Activity
                      </Button>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Reading Skills Section */}
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
                color: theme.palette.primary.main,
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              Benefits of Early Reading
            </Typography>
            
            <Grid container spacing={5}>
              {readingSkills.map((skill, index) => (
                <Grid item xs={12} md={4} key={skill.title}>
                  <Paper
                    component={motion.div}
                    elevation={0}
                    sx={{ 
                      p: 4, 
                      height: '100%', 
                      borderRadius: 4,
                      boxShadow: '0px 8px 24px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0px 12px 30px rgba(0,0,0,0.12)',
                      }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 * index }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                      {skill.icon}
                    </Box>
                    <Typography 
                      variant="h4" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold', 
                        textAlign: 'center',
                        mb: 2,
                        background: skill.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {skill.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      align="center"
                      sx={{ fontSize: '1.15rem', lineHeight: 1.6 }}
                    >
                      {skill.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default ReadingPage; 