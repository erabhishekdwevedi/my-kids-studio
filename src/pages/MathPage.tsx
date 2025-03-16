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
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import CalculateIcon from '@mui/icons-material/Calculate';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MotionContainer = motion(Container);
const MotionTypography = motion(Typography);

const mathActivities = [
  {
    title: 'Counting Fun',
    description: 'Learn to count from 1 to 100 with fun interactive games',
    icon: <LooksOneIcon fontSize="large" color="primary" />,
    level: 'Beginner',
    ageRange: '3-5 years',
    color: '#e3f2fd'
  },
  {
    title: 'Addition Adventure',
    description: 'Master addition with colorful objects and engaging puzzles',
    icon: <AddIcon fontSize="large" color="primary" />,
    level: 'Beginner',
    ageRange: '4-6 years',
    color: '#e8f5e9'
  },
  {
    title: 'Subtraction Safari',
    description: 'Learn subtraction through fun animal-themed activities',
    icon: <RemoveIcon fontSize="large" color="primary" />,
    level: 'Beginner',
    ageRange: '4-6 years',
    color: '#fff8e1'
  },
  {
    title: 'Multiplication Madness',
    description: 'Discover the magic of multiplication with interactive games',
    icon: <CloseIcon fontSize="large" color="primary" />,
    level: 'Intermediate',
    ageRange: '6-8 years',
    color: '#f3e5f5'
  },
  {
    title: 'Shape Explorer',
    description: 'Learn about different shapes and their properties',
    icon: <Filter3Icon fontSize="large" color="primary" />,
    level: 'Beginner',
    ageRange: '3-5 years',
    color: '#e0f7fa'
  },
  {
    title: 'Number Patterns',
    description: 'Discover patterns in numbers and sequences',
    icon: <Filter2Icon fontSize="large" color="primary" />,
    level: 'Intermediate',
    ageRange: '5-7 years',
    color: '#e8eaf6'
  }
];

const mathSkills = [
  {
    title: 'Number Sense',
    items: [
      'Counting and number recognition',
      'Basic addition and subtraction',
      'Introduction to multiplication'
    ],
    icon: <LooksOneIcon color="primary" />
  },
  {
    title: 'Spatial Reasoning',
    items: [
      'Shape recognition and properties',
      'Pattern recognition and creation',
      'Basic measurement concepts'
    ],
    icon: <Filter2Icon color="primary" />
  }
];

const MathPage: React.FC = () => {
  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        overflow: 'hidden',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f5f5f5'
      }}
    >
      {/* App Header */}
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: 'white', 
          boxShadow: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton 
          component={RouterLink} 
          to="/" 
          sx={{ mr: 2 }}
          aria-label="back to home"
        >
          <ArrowBackIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: '#4caf50', mr: 2 }}>
          <CalculateIcon />
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Math Adventures
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
        <MotionContainer maxWidth="md" sx={{ py: 2 }}>
          <MotionTypography
            variant="h6"
            paragraph
            sx={{ mb: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Explore the exciting world of numbers, shapes, and mathematical concepts through fun and interactive activities.
          </MotionTypography>
          
          <MotionTypography
            variant="h5"
            sx={{ fontWeight: 'bold', mb: 3 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Math Activities
          </MotionTypography>
          
          <Grid container spacing={3}>
            {mathActivities.map((activity, index) => (
              <Grid item xs={12} sm={6} md={4} key={activity.title}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: '0.3s',
                      bgcolor: activity.color,
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: 2,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        {activity.icon}
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h3"
                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                      >
                        {activity.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph align="center">
                        {activity.description}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="caption" color="primary">
                          Level: {activity.level}
                        </Typography>
                        <Typography variant="caption" color="primary">
                          Ages: {activity.ageRange}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" size="small" sx={{ borderRadius: 30 }}>
                          Start Activity
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Math Skills Section */}
          <Box sx={{ mt: 5 }}>
            <MotionTypography
              variant="h5"
              sx={{ fontWeight: 'bold', mb: 3 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Math Skills You'll Develop
            </MotionTypography>
            
            <Grid container spacing={3}>
              {mathSkills.map((skill, index) => (
                <Grid item xs={12} md={6} key={skill.title}>
                  <Paper
                    component={motion.div}
                    elevation={0}
                    sx={{ 
                      p: 3, 
                      height: '100%', 
                      borderRadius: 4,
                      border: '1px solid #e0e0e0',
                      bgcolor: 'white'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (0.1 * index) }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: '#e3f2fd', mr: 2 }}>
                        {skill.icon}
                      </Avatar>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {skill.title}
                      </Typography>
                    </Box>
                    <List dense>
                      {skill.items.map((item, i) => (
                        <ListItem key={i} disableGutters>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Box 
                              sx={{ 
                                width: 8, 
                                height: 8, 
                                borderRadius: '50%', 
                                bgcolor: 'primary.main' 
                              }} 
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={item} 
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </MotionContainer>
      </Box>
    </Box>
  );
};

export default MathPage; 