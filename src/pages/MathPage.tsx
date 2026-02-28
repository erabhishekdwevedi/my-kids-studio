import React from 'react';
import { 
  Box, 
  Container, 
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mathActivities } from '../data/mathData';
import MathCard from '../components/MathCard';
import { useApp } from '../contexts/AppContext';
import PageNavigation from '../components/PageNavigation';


const MathPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedTheme, selectedProfile } = useApp();
  
  // Decorative elements removed

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
        width: '100vw',
        maxWidth: '100%',
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: 3
      }}
    >
      

      {/* Top Navigation */}
      <PageNavigation 
        profile={selectedProfile}
        theme={selectedTheme}
        showTitle={true}
        title="Math Magic"
        onBackClick={handleBackToSubjects}
        onHomeClick={handleBackToHome}
        showMuteButton={true}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mt: 4, width: '100%' }}>
        {/* Math Activities */}
        <Grid container spacing={4}>
          {mathActivities.map((activity, index) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <MathCard activity={activity} delay={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MathPage; 