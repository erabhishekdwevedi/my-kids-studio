import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Face3Icon from '@mui/icons-material/Face3';
import PageNavigation from './PageNavigation';

interface TopMenuProps {
  title?: string;
  showTitle?: boolean;
}

/**
 * @deprecated Use PageNavigation component instead
 * This component is kept for backward compatibility
 */
const TopMenu: React.FC<TopMenuProps> = ({ title, showTitle = true }) => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [profileColor, setProfileColor] = useState('#f06292');
  const [profileBgColor, setProfileBgColor] = useState('#f8bbd0');
  const [profileName, setProfileName] = useState('User');

  useEffect(() => {
    // Get selected profile from localStorage
    const profileId = localStorage.getItem('selectedProfile');
    if (profileId) {
      // Set score based on profile
      if (profileId === 'vidushi') {
        setScore(1250);
        setProfileColor('#c2185b');
        setProfileBgColor('#f8bbd0');
        setProfileName('Vidushi');
      } else if (profileId === 'rishika') {
        setScore(980);
        setProfileColor('#1565c0');
        setProfileBgColor('#bbdefb');
        setProfileName('Rishika');
      }
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  // Create a mock profile object for PageNavigation
  const mockProfile = {
    textColor: profileColor,
    backgroundColor: profileBgColor,
    score: score,
    icon: <Face3Icon />
  };

  // Create a mock theme object for PageNavigation
  const mockTheme = {
    textColor: profileColor
  };

  return (
    <Box sx={{ p: 2 }}>
      <PageNavigation
        profile={mockProfile}
        theme={mockTheme}
        title={showTitle ? title : undefined}
        showTitle={showTitle}
        onBackClick={handleBack}
        onHomeClick={handleHome}
      />
    </Box>
  );
};

export default TopMenu; 