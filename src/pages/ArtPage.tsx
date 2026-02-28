import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Avatar,
  Fab
} from '@mui/material';
import { motion } from 'framer-motion';
import GestureIcon from '@mui/icons-material/Gesture';
import ForestIcon from '@mui/icons-material/Forest';
import CelebrationIcon from '@mui/icons-material/Celebration';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import Face3Icon from '@mui/icons-material/Face3';
import TopMenu from '../components/TopMenu';

// Define profiles
const profiles = [
  {
    id: 'vidushi',
    name: 'Vidushi',
    icon: <Face3Icon sx={{ fontSize: 40 }} />,
    backgroundColor: '#f8bbd0', // Light pink
    gradient: 'linear-gradient(135deg, #f8bbd0 0%, #f48fb1 100%)',
    shadowColor: 'rgba(244, 143, 177, 0.4)',
    textColor: '#c2185b',
    score: 1250
  },
  {
    id: 'rishika',
    name: 'Rishika',
    icon: <Face3Icon sx={{ fontSize: 40 }} />,
    backgroundColor: '#bbdefb', // Light blue
    gradient: 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
    shadowColor: 'rgba(144, 202, 249, 0.4)',
    textColor: '#1565c0',
    score: 980
  }
];

// Define themes
const themes = [
  {
    id: 'icecream',
    name: 'Ice Cream Shop',
    icon: <Face3Icon sx={{ fontSize: 40 }} />,
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


const ArtPage: React.FC = () => {
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
        navigate('/subjects');
      }
    } else {
      // If no theme selected, redirect to theme selection
      navigate('/subjects');
    }
  }, [navigate]);

  // Decorative elements removed

  const handleOpenDrawingBoard = () => {
    navigate('/art/drawing-board');
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
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: 0
      }}
    >
      

      {/* Top Navigation */}
      <TopMenu showTitle={false} />

      {/* Content */}
      <Box sx={{ padding: 3, flexGrow: 1 }}>
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700, 
              color: selectedTheme.textColor,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 4
            }}
          >
            Art Studio
          </Typography>

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: `0 8px 24px ${selectedTheme.shadowColor}`,
              transition: 'all 0.3s ease',
              border: selectedTheme.id === 'icecream' 
                ? '5px solid #f8bbd0'
                : selectedTheme.id === 'jungle'
                  ? '5px solid #a5d6a7'
                  : '5px solid #b3e5fc',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: `0 12px 28px ${selectedTheme.shadowColor}`,
                backgroundColor: selectedTheme.backgroundColor
              }
            }}
          >
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: '#e1f5fe',
                  color: selectedTheme.textColor,
                  margin: '0 auto 16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  border: `4px solid ${selectedTheme.textColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <GestureIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  color: selectedTheme.textColor,
                  mb: 2
                }}
              >
                Drawing Board
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3,
                  color: 'text.secondary'
                }}
              >
                Create digital art with our interactive drawing board. Express yourself with colors and shapes!
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={handleOpenDrawingBoard}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                Open Drawing Board
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ArtPage; 