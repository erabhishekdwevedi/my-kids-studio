import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  Container,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Avatar
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IcecreamIcon from '@mui/icons-material/Icecream';
import ForestIcon from '@mui/icons-material/Forest';
import CelebrationIcon from '@mui/icons-material/Celebration';

// Theme icons mapping
const themeIcons = {
  icecream: <IcecreamIcon />,
  jungle: <ForestIcon />,
  carnival: <CelebrationIcon />
};

// Theme names mapping
const themeNames = {
  icecream: 'Ice Cream Shop',
  jungle: 'Jungle Book',
  carnival: 'Carnival Fun'
};

const Navbar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('icecream');
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Math', path: '/math' },
    { name: 'Reading', path: '/reading' },
    { name: 'Science', path: '/science' },
  ];

  useEffect(() => {
    // Get selected theme from localStorage
    const themeId = localStorage.getItem('selectedTheme');
    if (themeId && (themeId === 'icecream' || themeId === 'jungle' || themeId === 'carnival')) {
      setSelectedTheme(themeId);
    }
  }, [location.pathname]); // Re-check when route changes

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Don't show navbar on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="h5" 
              component={RouterLink} 
              to="/dashboard" 
              sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.primary.main, 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              KIDS Studio
            </Typography>
            
            <Chip
              avatar={
                <Avatar sx={{ bgcolor: 'transparent' }}>
                  {themeIcons[selectedTheme as keyof typeof themeIcons]}
                </Avatar>
              }
              label={themeNames[selectedTheme as keyof typeof themeNames]}
              sx={{ 
                ml: 2, 
                bgcolor: `${theme.palette.primary.main}20`,
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                border: `1px solid ${theme.palette.primary.main}40`
              }}
            />
          </Box>

          <Box>
            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                  sx={{ ml: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {navItems.map((item) => (
                    <MenuItem 
                      key={item.name} 
                      component={RouterLink} 
                      to={item.path}
                      onClick={handleMenuClose}
                      sx={{ 
                        color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                        fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      mx: 1,
                      color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.primary,
                      fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                      '&:hover': {
                        bgcolor: `${theme.palette.primary.main}10`,
                      },
                      position: 'relative',
                      '&::after': location.pathname === item.path ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '20%',
                        width: '60%',
                        height: '3px',
                        bgcolor: theme.palette.primary.main,
                        borderRadius: '3px'
                      } : {}
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 