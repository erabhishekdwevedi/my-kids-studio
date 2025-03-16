import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container,
  Fab,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ConstructionIcon from '@mui/icons-material/Construction';
import TopMenu from '../components/TopMenu';

// Sprinkle component for decoration
const Sprinkle = ({ color, top, left, delay }: { color: string, top: string, left: string, delay: number }) => (
  <motion.div
    style={{
      position: 'absolute',
      top,
      left,
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: color,
      zIndex: 1,
    }}
    initial={{ opacity: 0, y: -20 }}
    animate={{ 
      opacity: [0, 1, 0],
      y: ['-20px', '0px', '20px'],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatType: 'loop',
    }}
  />
);

const ComingSoonPage: React.FC = () => {
  const navigate = useNavigate();

  // Generate random sprinkles for decoration
  const generateSprinkles = () => {
    const sprinkles = [];
    const colors = ['#f06292', '#7986cb', '#ffb74d', '#4fc3f7', '#aed581'];
    
    for (let i = 0; i < 30; i++) {
      sprinkles.push(
        <Sprinkle 
          key={i}
          color={colors[Math.floor(Math.random() * colors.length)]}
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          delay={Math.random() * 2}
        />
      );
    }
    
    return sprinkles;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <TopMenu showTitle={false} />
      
      <Container maxWidth="md" sx={{ height: 'calc(100vh - 72px)', position: 'relative', overflow: 'hidden' }}>
        {generateSprinkles()}
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 5,
                borderRadius: 4,
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(5px)',
                border: '2px dashed #f06292',
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                <ConstructionIcon sx={{ fontSize: 80, color: '#f06292', mb: 2 }} />
              </motion.div>
              
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#5d4037' }}>
                Coming Soon!
              </Typography>
              
              <Typography variant="h5" sx={{ mb: 4, color: '#8d6e63' }}>
                We're working hard to bring you something amazing!
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 4, color: '#8d6e63' }}>
                This feature is currently under development. Please check back later!
              </Typography>
            </Paper>
          </motion.div>
          
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Fab
              color="primary"
              aria-label="back"
              onClick={handleBack}
              sx={{ 
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                '&:hover': { transform: 'translateY(-2px)' }
              }}
            >
              <ArrowBackIcon />
            </Fab>
            
            <Fab
              color="secondary"
              aria-label="home"
              onClick={handleHome}
              sx={{ 
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                '&:hover': { transform: 'translateY(-2px)' }
              }}
            >
              <HomeIcon />
            </Fab>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ComingSoonPage; 