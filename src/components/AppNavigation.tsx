// World-Class App Navigation
// Clean, modern navigation bar with home and score

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface AppNavigationProps {
  appName: string;
  score?: number;
  showScore?: boolean;
  gradient?: string;
}

const AppNavigation: React.FC<AppNavigationProps> = ({
  appName,
  score = 0,
  showScore = true,
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: alpha('#ffffff', 0.95),
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${alpha('#000', 0.08)}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 3, md: 4 },
          py: 1.5,
          maxWidth: 1400,
          mx: 'auto'
        }}
      >
        {/* Home Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconButton
            onClick={handleHome}
            aria-label="home"
            sx={{
              background: gradient,
              color: 'white',
              width: 48,
              height: 48,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              '&:hover': {
                background: gradient,
                boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
              }
            }}
          >
            <HomeIcon />
          </IconButton>
        </motion.div>

        {/* App Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            letterSpacing: '-0.02em'
          }}
        >
          {appName}
        </Typography>

        {/* Score Display */}
        {showScore && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                background: gradient,
                px: 2,
                py: 1,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <EmojiEventsIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
              <Typography
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                {score}
              </Typography>
            </Box>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default AppNavigation;
