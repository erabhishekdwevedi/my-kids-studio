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
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IcecreamIcon from '@mui/icons-material/Icecream';
import ForestIcon from '@mui/icons-material/Forest';
import CelebrationIcon from '@mui/icons-material/Celebration';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

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
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>('icecream');
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  
  const navItems = [
    { name: 'Math', path: '/math', icon: null },
    { name: 'Reading', path: '/reading', icon: null },
    { name: 'Science', path: '/science', icon: null },
  ];

  useEffect(() => {
    // Get selected theme from localStorage
    const themeId = localStorage.getItem('selectedTheme');
    if (themeId && (themeId === 'icecream' || themeId === 'jungle' || themeId === 'carnival')) {
      setSelectedTheme(themeId);
    }
    
    // Get selected profile from localStorage
    const profileId = localStorage.getItem('selectedProfile');
    if (profileId) {
      setSelectedProfile(profileId);
    }
    
    // Close drawer when route changes
    setDrawerOpen(false);
  }, [location.pathname]); 

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
    setAnchorEl(null);
  };

  // Don't show navbar on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        backgroundColor: theme.palette.background.paper,
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Container maxWidth="lg" disableGutters={isMobile}>
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between', 
            py: { xs: 0.5, sm: 1 },
            px: { xs: 1, sm: 2 },
            minHeight: { xs: '56px', sm: '64px' }
          }}
        >
          {/* Left side with logo and home icon */}
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
                alignItems: 'center',
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }}
            >
              KIDS Studio
            </Typography>
            
            <Tooltip title="Home">
              <IconButton
                component={RouterLink}
                to="/"
                color="primary"
                sx={{ 
                  ml: { xs: 1, sm: 2 },
                  bgcolor: `${theme.palette.primary.main}10`,
                  '&:hover': {
                    bgcolor: `${theme.palette.primary.main}20`,
                  }
                }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Center navigation for desktop */}
          {!isMobile && !isTablet && (
            <Box sx={{ display: 'flex', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
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

          {/* Right side with user profile and menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* User profile chip */}
            {!isMobile && (
              <Chip
                avatar={
                  <Avatar sx={{ bgcolor: 'transparent' }}>
                    {themeIcons[selectedTheme as keyof typeof themeIcons] || <PersonIcon />}
                  </Avatar>
                }
                label={selectedProfile || 'User'}
                sx={{ 
                  mr: 2, 
                  bgcolor: `${theme.palette.primary.main}20`,
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  border: `1px solid ${theme.palette.primary.main}40`,
                  height: '32px',
                  '& .MuiChip-label': {
                    px: 1,
                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' }
                  }
                }}
              />
            )}
            
            {/* Mobile/Tablet menu button */}
            {(isMobile || isTablet) && (
              <>
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={() => toggleDrawer(true)}
                  size="medium"
                  edge="end"
                >
                  <MenuIcon />
                </IconButton>
                
                {/* Mobile drawer navigation */}
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={() => toggleDrawer(false)}
                  PaperProps={{
                    sx: {
                      width: '80%',
                      maxWidth: '300px',
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px',
                      pt: 2
                    }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    px: 2,
                    pb: 1,
                    borderBottom: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.08)'
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Menu
                    </Typography>
                    <IconButton onClick={() => toggleDrawer(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  
                  {/* User profile in drawer */}
                  <Box sx={{ 
                    px: 2, 
                    py: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    borderBottom: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.08)'
                  }}>
                    <Avatar sx={{ 
                      bgcolor: `${theme.palette.primary.main}20`,
                      color: theme.palette.primary.main
                    }}>
                      {themeIcons[selectedTheme as keyof typeof themeIcons] || <PersonIcon />}
                    </Avatar>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {selectedProfile || 'User'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {themeNames[selectedTheme as keyof typeof themeNames] || 'Theme'}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <List sx={{ pt: 1 }}>
                    {/* Home item in drawer */}
                    <ListItem 
                      onClick={() => handleNavigation('/')}
                      sx={{ 
                        py: 1.5,
                        backgroundColor: location.pathname === '/' 
                          ? `${theme.palette.primary.main}10` 
                          : 'transparent',
                        borderLeft: location.pathname === '/' 
                          ? `4px solid ${theme.palette.primary.main}` 
                          : '4px solid transparent',
                        '&:hover': {
                          backgroundColor: `${theme.palette.primary.main}10`,
                        }
                      }}
                    >
                      <ListItemIcon sx={{ 
                        color: location.pathname === '/' 
                          ? theme.palette.primary.main 
                          : 'inherit',
                        minWidth: '40px'
                      }}>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Home" 
                        primaryTypographyProps={{
                          fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                          color: location.pathname === '/' ? theme.palette.primary.main : 'inherit'
                        }}
                      />
                    </ListItem>
                    
                    {/* Other nav items */}
                    {navItems.map((item) => (
                      <ListItem 
                        key={item.name} 
                        onClick={() => handleNavigation(item.path)}
                        sx={{ 
                          py: 1.5,
                          backgroundColor: location.pathname === item.path 
                            ? `${theme.palette.primary.main}10` 
                            : 'transparent',
                          borderLeft: location.pathname === item.path 
                            ? `4px solid ${theme.palette.primary.main}` 
                            : '4px solid transparent',
                          '&:hover': {
                            backgroundColor: `${theme.palette.primary.main}10`,
                          }
                        }}
                      >
                        {item.icon && (
                          <ListItemIcon sx={{ 
                            color: location.pathname === item.path 
                              ? theme.palette.primary.main 
                              : 'inherit',
                            minWidth: '40px'
                          }}>
                            {item.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText 
                          primary={item.name} 
                          primaryTypographyProps={{
                            fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                            color: location.pathname === item.path ? theme.palette.primary.main : 'inherit'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 