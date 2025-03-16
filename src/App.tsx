import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';

// Theme
import theme from './theme/index';

// Pages
import HomePage from './pages/HomePage';
import SubjectsPage from './pages/SubjectsPage';
import SubjectPage from './pages/SubjectPage';
import ComingSoonPage from './pages/ComingSoonPage';
import CarRacePage from './pages/CarRacePage';
import SnakePage from './pages/SnakePage';
import DashboardPage from './pages/DashboardPage';
import DrawingBoardPage from './pages/DrawingBoardPage';
import ThemeSelectionPage from './pages/ThemeSelectionPage';
import QuizPage from './pages/QuizPage';
import PianoPage from './pages/PianoPage';

// Custom hook for device optimization
import { useTabletSize } from './hooks/useTabletSize';

// Context
import { AppProvider } from './contexts/AppContext';

function App() {
  const { isMobile, isTablet } = useTabletSize();
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(muiTheme.breakpoints.between('sm', 'lg'));

  // Determine the appropriate dimensions based on screen size
  const getAppDimensions = () => {
    if (isMobile || isSmallScreen) {
      return {
        width: '100vw',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        margin: '0',
        boxShadow: 'none',
        border: 'none',
        borderRadius: '0',
      };
    } else if (isTablet || isMediumScreen) {
      return {
        width: '100vw',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        margin: '0',
        boxShadow: 'none',
        border: 'none',
        borderRadius: '0',
      };
    } else {
      // Desktop or large screens - still use full width for consistency
      return {
        width: '100vw',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        margin: '0',
        boxShadow: 'none',
        border: 'none',
        borderRadius: '0',
      };
    }
  };

  const dimensions = getAppDimensions();

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {/* Global styles to ensure full height usage */}
          <style>
            {`
              html, body, #root {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
                overflow: hidden;
              }
              
              body {
                min-height: 100vh;
                min-height: -webkit-fill-available;
                width: 100vw;
                max-width: 100%;
                overflow-x: hidden;
              }
              
              #root {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: #f5f5f5;
                height: 100%;
                width: 100vw;
                max-width: 100%;
              }

              @supports (-webkit-touch-callout: none) {
                body, html, #root {
                  height: -webkit-fill-available;
                  width: 100vw;
                  max-width: 100%;
                }
              }
            `}
          </style>
          
          {/* Additional touch-specific styles for mobile and tablet */}
          {(isMobile || isTablet) && (
            <style>
              {`
                html, body {
                  touch-action: manipulation;
                  user-select: none;
                  -webkit-user-select: none;
                  -webkit-tap-highlight-color: transparent;
                  width: 100vw;
                  max-width: 100%;
                }
                
                input, textarea {
                  user-select: text;
                  -webkit-user-select: text;
                }
              `}
            </style>
          )}
          
          <Box
            sx={{
              width: dimensions.width,
              height: dimensions.height,
              maxWidth: dimensions.maxWidth,
              maxHeight: dimensions.maxHeight,
              margin: dimensions.margin,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: dimensions.boxShadow,
              border: dimensions.border,
              borderRadius: dimensions.borderRadius,
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <AnimatePresence mode="wait">
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/subjects" element={<SubjectsPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/theme-selection" element={<ThemeSelectionPage />} />
                
                {/* Games */}
                <Route path="/snake" element={<SnakePage />} />
                <Route path="/car-race" element={<CarRacePage />} />
                <Route path="/drawing-board" element={<DrawingBoardPage />} />
                <Route path="/piano" element={<PianoPage />} />
                
                {/* Game paths from GamesPage */}
                <Route path="/games/snake" element={<SnakePage />} />
                <Route path="/games/car-race" element={<CarRacePage />} />
                
                {/* Quiz Routes */}
                <Route path="/quiz/:category" element={<QuizPage />} />
                
                {/* Subject Pages */}
                <Route path="/subject/:subject" element={<SubjectPage />} />
                <Route path="/subject/:subject/topic/:topic" element={<SubjectPage />} />
                <Route path="/subject/:subject/topic/:topic/chapter/:chapter" element={<SubjectPage />} />
                
                {/* Section Level */}
                <Route path="/subject/:subject/topic/:topic/chapter/:chapter/section/:section" element={<SubjectPage />} />
                
                {/* Redirect profile and settings to coming soon */}
                <Route path="/profile" element={<ComingSoonPage />} />
                <Route path="/settings" element={<ComingSoonPage />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<ComingSoonPage />} />
              </Routes>
            </AnimatePresence>
          </Box>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
