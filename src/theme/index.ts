import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Define optimized breakpoints
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
        fontSize: '2.5rem', // Smaller base size for better mobile display
        fontWeight: 700,
        '@media (min-width:600px)': {
          fontSize: '3rem',
        },
        '@media (min-width:960px)': {
          fontSize: '3.5rem',
        },
      },
      h2: {
        fontSize: '2.2rem', // Smaller base size for better mobile display
        fontWeight: 700,
        '@media (min-width:600px)': {
          fontSize: '2.5rem',
        },
        '@media (min-width:960px)': {
          fontSize: '3rem',
        },
      },
      h3: {
        fontSize: '1.8rem', // Smaller base size for better mobile display
        fontWeight: 600,
        '@media (min-width:600px)': {
          fontSize: '2.2rem',
        },
        '@media (min-width:960px)': {
          fontSize: '2.5rem',
        },
      },
      h4: {
        fontSize: '1.5rem', // Smaller base size for better mobile display
        fontWeight: 600,
        '@media (min-width:600px)': {
          fontSize: '1.8rem',
        },
        '@media (min-width:960px)': {
          fontSize: '2rem',
        },
      },
      h5: {
        fontSize: '1.2rem',
        fontWeight: 500,
        '@media (min-width:600px)': {
          fontSize: '1.4rem',
        },
        '@media (min-width:960px)': {
          fontSize: '1.5rem',
        },
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
        '@media (min-width:600px)': {
          fontSize: '1.1rem',
        },
        '@media (min-width:960px)': {
          fontSize: '1.25rem',
        },
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
            padding: '8px 16px', // Smaller padding on mobile
            boxShadow: mode === 'light' 
              ? '0 4px 8px rgba(0,0,0,0.1)' 
              : '0 4px 8px rgba(0,0,0,0.3)',
            '@media (min-width:600px)': {
              padding: '10px 24px', // Larger padding on tablet and up
            },
          },
          containedPrimary: {
            '&:hover': {
              boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
              transform: 'translateY(-2px)',
            },
          },
          // Size variants for responsive buttons
          sizeSmall: {
            padding: '4px 12px',
            fontSize: '0.8125rem',
          },
          sizeMedium: {
            padding: '8px 16px',
            fontSize: '0.875rem',
            '@media (min-width:600px)': {
              padding: '10px 24px',
            },
          },
          sizeLarge: {
            padding: '10px 20px',
            fontSize: '0.9375rem',
            '@media (min-width:600px)': {
              padding: '12px 32px',
              fontSize: '1rem',
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
      MuiGrid: {
        styleOverrides: {
          container: {
            width: '100%',
            margin: 0,
          },
          item: {
            padding: 8,
            '@media (min-width:600px)': {
              padding: 12,
            },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: '56px',
            '@media (min-width:600px)': {
              minHeight: '64px',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            margin: 16,
            width: 'calc(100% - 32px)',
            maxWidth: '600px',
            '@media (max-width:599px)': {
              borderRadius: 12,
            },
          },
        },
      },
    },
  });

  // Apply responsive font sizes
  theme = responsiveFontSizes(theme, {
    breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
    factor: 2, // Stronger factor for more noticeable difference
  });

  return theme;
};

export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');

export default lightTheme; 