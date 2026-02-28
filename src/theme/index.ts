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
            textTransform: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
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
            background: undefined as unknown as string,
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
export default lightTheme;