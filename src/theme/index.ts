import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Define tablet-optimized breakpoints
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

// Create a theme instance for each mode (light/dark)
const getTheme = (mode: PaletteMode): Theme => {
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#f06292', // Pink for primary actions
        light: '#f8bbd0',
        dark: '#c2185b',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#7986cb', // Indigo for secondary actions
        light: '#aab6fe',
        dark: '#5c6bc0',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      error: {
        main: '#f44336',
      },
      warning: {
        main: '#ff9800',
      },
      info: {
        main: '#2196f3',
      },
      success: {
        main: '#4caf50',
      },
    },
    breakpoints,
    typography: {
      fontFamily: [
        'Nunito',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '3rem',
        fontWeight: 700,
      },
      h3: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h4: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h5: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.875rem',
      },
      button: {
        textTransform: 'none', // Avoid all-caps buttons
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12, // Rounded corners for a kid-friendly UI
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30, // Pill-shaped buttons
            padding: '10px 24px',
            boxShadow: mode === 'light' 
              ? '0 4px 8px rgba(0,0,0,0.1)' 
              : '0 4px 8px rgba(0,0,0,0.3)',
          },
          containedPrimary: {
            '&:hover': {
              boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light'
              ? '0 8px 24px rgba(0,0,0,0.1)'
              : '0 8px 24px rgba(0,0,0,0.3)',
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: 16,
            paddingRight: 16,
            '@media (min-width:600px)': {
              paddingLeft: 24,
              paddingRight: 24,
            },
          },
        },
      },
    },
  });

  // Apply responsive font sizes
  theme = responsiveFontSizes(theme);

  return theme;
};

export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');

export default lightTheme; 