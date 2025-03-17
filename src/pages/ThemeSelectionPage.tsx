import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Container,
  Grid,
  CircularProgress
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import PageNavigation from '../components/PageNavigation';
import { Theme, Profile } from '../types';
import { themes } from '../data';
import logger from '../utils/logger';

const log = logger.createLogger('ThemeSelectionPage');

// Create a temporary theme object from profile for navigation
const createTempTheme = (profile: Profile): Theme => ({
  ...profile,
  accentColor: profile.textColor, // Use textColor as accentColor for consistency
});

const ThemeSelectionPage = () => {
  const navigate = useNavigate();
  const { selectedProfile, setSelectedTheme } = useApp();

  useEffect(() => {
    try {
      if (!selectedProfile) {
        log.info('No profile selected, redirecting to home');
        navigate('/');
      }
    } catch (error) {
      log.error('Error in profile check', error as Error);
      navigate('/');
    }
  }, [selectedProfile, navigate]);

  const handleThemeSelect = useCallback((theme: Theme) => {
    try {
      log.info('Theme selected', { themeId: theme.id });
      setSelectedTheme(theme);
      localStorage.setItem('selectedTheme', theme.id);
      navigate('/subjects');
    } catch (error) {
      log.error('Error selecting theme', error as Error, { themeId: theme.id });
    }
  }, [navigate, setSelectedTheme]);

  const handleBackToHome = useCallback(() => {
    try {
      log.info('Navigating back to home');
      navigate('/');
    } catch (error) {
      log.error('Error navigating to home', error as Error);
    }
  }, [navigate]);

  if (!selectedProfile) {
    return (
      <Box 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Create temporary theme from profile for navigation
  const tempTheme = createTempTheme(selectedProfile);

  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: selectedProfile.gradient,
        position: 'relative',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Navigation */}
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
          theme={tempTheme}
          showTitle={true}
          onBackClick={handleBackToHome}
          onHomeClick={handleBackToHome}
        />
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 2, md: 3 }
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 700,
            color: selectedProfile.textColor,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
            mb: { xs: 2, sm: 3 }
          }}
        >
          Choose Your Theme
        </Typography>

        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{ 
            width: '100%',
            margin: '0 auto'
          }}
        >
          <AnimatePresence>
            {themes.map((theme: Theme, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={theme.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ height: '100%' }}
                  layout
                >
                  <Card
                    onClick={() => handleThemeSelect(theme)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      background: theme.gradient,
                      borderRadius: 3,
                      boxShadow: `0 8px 32px ${theme.shadowColor}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 12px 48px ${theme.shadowColor}`
                      }
                    }}
                    role="button"
                    aria-label={`Select ${theme.name} theme`}
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleThemeSelect(theme);
                      }
                    }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        p: { xs: 2, sm: 3 },
                        textAlign: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 60, sm: 80 },
                          height: { xs: 60, sm: 80 },
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(8px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: theme.textColor,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      >
                        {theme.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          color: 'white',
                          fontSize: { xs: '1.25rem', sm: '1.5rem' },
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        {theme.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                          textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}
                      >
                        {theme.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
    </Box>
  );
};

export default ThemeSelectionPage; 