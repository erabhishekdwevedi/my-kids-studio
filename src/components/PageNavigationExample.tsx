import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import PageNavigation from './PageNavigation';
import Face3Icon from '@mui/icons-material/Face3';

/**
 * Example component to demonstrate the PageNavigation layout
 * This is for documentation purposes only
 */
const PageNavigationExample: React.FC = () => {
  // Mock profile and theme for demonstration
  const mockProfile = {
    textColor: '#c2185b',
    backgroundColor: '#f8bbd0',
    score: 1250,
    icon: <Face3Icon />
  };

  const mockTheme = {
    textColor: '#c2185b'
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        maxWidth: '800px', 
        margin: '0 auto',
        background: 'linear-gradient(135deg, #f8bbd0 0%, #f48fb1 100%)',
      }}
    >
      <PageNavigation 
        profile={mockProfile}
        theme={mockTheme}
        showTitle={false}
        title="Example Page"
        onBackClick={() => console.log('Back clicked')}
        onHomeClick={() => console.log('Home clicked')}
      />

      <Box sx={{ mt: 8, p: 3, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          PageNavigation Component
        </Typography>
        <Typography variant="body1">
          This example demonstrates the updated PageNavigation component with:
        </Typography>
        <ul>
          <li>Back button (left side)</li>
          <li>Home button (left side, next to back button)</li>
          <li>Title or Profile display (right side)</li>
          <li>Mute button (right side)</li>
        </ul>
        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
          The component provides a consistent navigation experience across all pages.
        </Typography>
      </Box>
    </Paper>
  );
};

export default PageNavigationExample; 