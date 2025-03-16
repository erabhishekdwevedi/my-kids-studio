import React from 'react';
import { Box, Typography, Fab, Avatar, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import MuteButton from './MuteButton';

interface PageNavigationProps {
  title?: string;
  showTitle?: boolean;
  backPath?: string;
  onBackClick?: () => void;
  onHomeClick?: () => void;
  profile: any; // Replace with proper type from your context
  theme: any; // Replace with proper type from your context
  showMuteButton?: boolean;
}

/**
 * Reusable navigation component for page headers
 * Includes back button, profile pill with score, and home button
 */
const PageNavigation: React.FC<PageNavigationProps> = ({
  title,
  showTitle = true,
  backPath,
  onBackClick,
  onHomeClick,
  profile,
  theme,
  showMuteButton = true,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1); // Default to browser back
    }
  };

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      navigate('/');
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, zIndex: 10, position: 'relative' }}>
      {/* Left side: Back and Home buttons */}
      <Stack direction="row" spacing={1}>
        <Fab 
          color="default" 
          aria-label="back"
          onClick={handleBackClick}
          sx={{
            boxShadow: '0px 3px 8px rgba(0,0,0,0.2)',
            bgcolor: 'white'
          }}
        >
          <ArrowBackIcon />
        </Fab>
        
        <Fab 
          color="default" 
          aria-label="home"
          onClick={handleHomeClick}
          sx={{ 
            boxShadow: '0px 3px 8px rgba(0,0,0,0.2)',
            bgcolor: 'white'
          }}
        >
          <HomeIcon />
        </Fab>
      </Stack>

      {/* Right side: Title/Profile and Mute Button */}
      <Stack direction="row" spacing={2} alignItems="center">
        {showTitle && title ? (
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              color: theme?.textColor || 'primary.main',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {title}
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 30,
              padding: '4px 16px 4px 4px',
              boxShadow: '0px 3px 8px rgba(0,0,0,0.2)',
              border: `2px solid ${profile?.textColor || 'primary.main'}`
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: profile?.backgroundColor || 'primary.light',
                color: profile?.textColor || 'primary.main',
                marginRight: 1,
                border: `2px solid ${profile?.textColor || 'primary.main'}`
              }}
            >
              {profile?.icon}
            </Avatar>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon sx={{ color: '#ffd54f', fontSize: 20, marginRight: 0.5 }} />
              <Typography 
                sx={{ 
                  fontWeight: 'bold', 
                  color: profile?.textColor || 'primary.main',
                  fontSize: '1rem'
                }}
              >
                {profile?.score || 0}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Mute Button */}
        {showMuteButton && (
          <MuteButton 
            size="small" 
            position="relative" 
            color={theme?.textColor || 'primary.main'}
            backgroundColor="white"
          />
        )}
      </Stack>
    </Box>
  );
};

export default PageNavigation; 