import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Avatar, 
  Typography, 
  Fab
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';

interface TopMenuProps {
  title?: string;
  showTitle?: boolean;
}

const TopMenu: React.FC<TopMenuProps> = ({ title, showTitle = true }) => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [profileColor, setProfileColor] = useState('#f06292');
  const [profileIcon, setProfileIcon] = useState<React.ReactNode>(<CakeIcon />);
  const [profileBgColor, setProfileBgColor] = useState('#f8bbd0');

  useEffect(() => {
    // Get selected profile from localStorage
    const profileId = localStorage.getItem('selectedProfile');
    if (profileId) {
      // Set score based on profile
      if (profileId === 'vidushi') {
        setScore(1250);
        setProfileColor('#c2185b');
        setProfileIcon(<CakeIcon />);
        setProfileBgColor('#f8bbd0');
      } else if (profileId === 'rishika') {
        setScore(980);
        setProfileColor('#1565c0');
        setProfileIcon(<IcecreamIcon />);
        setProfileBgColor('#bbdefb');
      }
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      p: 2, 
      bgcolor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Back Button */}
      <Fab 
        size="small"
        color="default" 
        aria-label="back"
        onClick={handleBack}
        sx={{
          boxShadow: '0px 3px 8px rgba(0,0,0,0.2)',
          bgcolor: 'white'
        }}
      >
        <ArrowBackIcon />
      </Fab>

      {/* Title or Profile Pill */}
      {showTitle ? (
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
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
            border: `2px solid ${profileColor}`,
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: profileBgColor,
              color: profileColor,
              marginRight: 1,
              border: `2px solid ${profileColor}`
            }}
          >
            {profileIcon}
          </Avatar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ color: '#ffd54f', fontSize: 20, marginRight: 0.5 }} />
            <Typography 
              sx={{ 
                fontWeight: 'bold', 
                color: profileColor,
                fontSize: '1rem'
              }}
            >
              {score}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Home Button */}
      <Fab 
        size="small"
        color="secondary" 
        aria-label="home"
        onClick={handleHome}
        sx={{ 
          boxShadow: '0px 3px 8px rgba(0,0,0,0.2)',
          bgcolor: 'white'
        }}
      >
        <HomeIcon />
      </Fab>
    </Box>
  );
};

export default TopMenu; 