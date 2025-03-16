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
        width: '100%',
        height: '100vh',
        maxWidth: '100%',
        maxHeight: '100vh',
        margin: '0',
        boxShadow: 'none',
        border: 'none',
        borderRadius: '0',
      };
    } else if (isTablet || isMediumScreen) {
      return {
        width: '100%',
        height: '100vh',
        maxWidth: '768px',
        maxHeight: '100vh',
        margin: '0 auto',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      };
    } else {
      // Desktop or large screens
      return {
        width: '100%',
        height: '100vh',
        maxWidth: '1024px',
        maxHeight: '100vh',
        margin: '0 auto',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
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
              }
              
              #root {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: #f5f5f5;
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
                }
                
                body {
                  position: fixed;
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
