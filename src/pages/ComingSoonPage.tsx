import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useApp } from '../contexts/AppContext';
import PageNavigation from '../components/PageNavigation';

const ComingSoonPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedProfile, selectedTheme } = useApp();

  // Decorative elements removed

  // Redirect if no profile or theme is selected
  React.useEffect(() => {
    if (!selectedProfile || !selectedTheme) {
      navigate('/');
    }
  }, [selectedProfile, selectedTheme, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  if (!selectedProfile || !selectedTheme) {
    return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  }

  return (
    <Box className="page-container" sx={{ 
      height: '100%', 
      width: '100%', 
      position: 'relative', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: 3
    }}>
      <PageNavigation 
        profile={selectedProfile}
        theme={selectedTheme}
        showTitle={false}
        onBackClick={handleBack}
        onHomeClick={handleHome}
      />
      
      <Container className="content-container" maxWidth="md" sx={{ 
        flex: 1,
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: 2, sm: 3, md: 4 }
      }}>
        
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', maxWidth: '500px' }}
          >
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: 4,
                textAlign: 'center',
                backgroundColor: 'background.paper',
                border: '1px dashed rgba(0,0,0,0.2)',
                width: '100%'
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
                <ConstructionIcon sx={{ fontSize: { xs: 60, sm: 70, md: 80 }, color: 'text.primary', mb: 2 }} />
              </motion.div>
              
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'text.primary',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                Coming Soon!
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  color: 'text.secondary',
                  fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }
                }}
              >
                We're working hard to bring you something amazing!
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4,
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                }}
              >
                This feature is currently under development. Please check back later!
              </Typography>
            </Paper>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ComingSoonPage; 