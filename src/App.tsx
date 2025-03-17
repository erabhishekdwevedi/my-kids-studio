import React, { useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { AnimatePresence } from 'framer-motion';

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
import StoryReaderPage from './pages/StoryReaderPage';
import MathActivityPage from './pages/MathActivityPage';
import MathPage from './pages/MathPage';

// Custom hook for device optimization
import { useTabletSize } from './hooks/useTabletSize';

// Context
import { AppProvider } from './contexts/AppContext';

// Components
import ErrorBoundary from './components/ErrorBoundary';

// Utils
import logger from './utils/logger';
import storage from './utils/storage';

const log = logger.createLogger('App');

function App() {
  const { isMobile, isTablet } = useTabletSize();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  // Repair corrupted localStorage on app startup
  useEffect(() => {
    try {
      const repairedCount = storage.repairCorruptedStorage();
      if (repairedCount > 0) {
        log.info(`Repaired ${repairedCount} corrupted localStorage items on startup`);
      }
    } catch (error) {
      log.error('Error during localStorage repair on startup', error as Error);
    }
  }, []);

  // Determine the appropriate dimensions based on screen size
  const dimensions = useMemo(() => {
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
  }, [isMobile, isTablet, isSmallScreen, isMediumScreen]);

  // Handle errors at the application level
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    log.error('Application error caught by ErrorBoundary', error, { errorInfo });
  };

  return (
    <ErrorBoundary onError={handleError}>
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
                  
                  {/* Story Reader */}
                  <Route path="/story-reader/:storyId" element={<StoryReaderPage />} />
                  
                  {/* Math Pages */}
                  <Route path="/math" element={<MathPage />} />
                  <Route path="/subject/math" element={<MathPage />} />
                  <Route path="/math/:activityId" element={<MathActivityPage />} />
                  
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
    </ErrorBoundary>
  );
}

export default App;
