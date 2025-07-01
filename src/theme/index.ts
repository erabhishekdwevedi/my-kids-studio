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
        main: mode === 'light' ? '#ff6b9d' : '#ff4081', // Bright pink
        light: mode === 'light' ? '#ffadc6' : '#ff79b0',
        dark: mode === 'light' ? '#c73e6f' : '#c51162',
        contrastText: '#ffffff',
      },
      secondary: {
        main: mode === 'light' ? '#4fc3f7' : '#29b6f6', // Bright blue
        light: mode === 'light' ? '#8bf6ff' : '#73e8ff',
        dark: mode === 'light' ? '#0093c4' : '#0086c3',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'light' ? '#fef7ff' : '#0d1421', // Softer backgrounds
        paper: mode === 'light' ? '#ffffff' : '#1a2332',
      },
      text: {
        primary: mode === 'light' ? '#2d3748' : '#f7fafc',
        secondary: mode === 'light' ? '#718096' : '#cbd5e0',
      },
      error: {
        main: mode === 'light' ? '#e53e3e' : '#fc8181',
        light: mode === 'light' ? '#feb2b2' : '#fbb6ce',
        dark: mode === 'light' ? '#c53030' : '#e53e3e',
      },
      warning: {
        main: mode === 'light' ? '#dd6b20' : '#f6ad55',
        light: mode === 'light' ? '#fbd38d' : '#fbb6ce',
        dark: mode === 'light' ? '#c05621' : '#dd6b20',
      },
      info: {
        main: mode === 'light' ? '#3182ce' : '#63b3ed',
        light: mode === 'light' ? '#90cdf4' : '#bee3f8',
        dark: mode === 'light' ? '#2c5282' : '#3182ce',
      },
      success: {
        main: mode === 'light' ? '#38a169' : '#68d391',
        light: mode === 'light' ? '#9ae6b4' : '#c6f6d5',
        dark: mode === 'light' ? '#2f855a' : '#38a169',
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
            borderRadius: 25, // More rounded buttons
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: mode === 'light' 
              ? '0 4px 12px rgba(255, 107, 157, 0.3)' 
              : '0 4px 12px rgba(255, 64, 129, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '@media (max-width:600px)': {
              padding: '10px 20px',
              fontSize: '0.9rem',
            },
          },
          containedPrimary: {
            background: mode === 'light' 
              ? 'linear-gradient(45deg, #ff6b9d 30%, #ff8fb3 90%)'
              : 'linear-gradient(45deg, #ff4081 30%, #ff79b0 90%)',
            '&:hover': {
              background: mode === 'light' 
                ? 'linear-gradient(45deg, #e55a8a 30%, #ff6b9d 90%)'
                : 'linear-gradient(45deg, #e91e63 30%, #ff4081 90%)',
              boxShadow: '0 6px 16px rgba(255, 107, 157, 0.4)',
              transform: 'translateY(-2px)',
            },
          },
          containedSecondary: {
            background: mode === 'light' 
              ? 'linear-gradient(45deg, #4fc3f7 30%, #81d4fa 90%)'
              : 'linear-gradient(45deg, #29b6f6 30%, #64b5f6 90%)',
            '&:hover': {
              background: mode === 'light' 
                ? 'linear-gradient(45deg, #29b6f6 30%, #4fc3f7 90%)'
                : 'linear-gradient(45deg, #039be5 30%, #29b6f6 90%)',
              boxShadow: '0 6px 16px rgba(79, 195, 247, 0.4)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            padding: '16px',
            boxShadow: mode === 'light'
              ? '0 8px 32px rgba(255, 107, 157, 0.15)'
              : '0 8px 32px rgba(0, 0, 0, 0.6)',
            background: mode === 'light' 
              ? 'linear-gradient(135deg, #ffffff 0%, #fef7ff 100%)'
              : 'linear-gradient(135deg, #1a2332 0%, #2d3748 100%)',
            border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'light'
                ? '0 12px 40px rgba(255, 107, 157, 0.2)'
                : '0 12px 40px rgba(0, 0, 0, 0.8)',
            },
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            '&:hover': {
              boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === 'light' 
              ? 'linear-gradient(90deg, #ff6b9d 0%, #4fc3f7 100%)'
              : 'linear-gradient(90deg, #ff4081 0%, #29b6f6 100%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundImage: 'none',
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