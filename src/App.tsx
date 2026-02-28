import React, { lazy, Suspense, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { AnimatePresence } from 'framer-motion';

// Theme
import { lightTheme } from './theme/index';

// Custom hook for device optimization
import { useTabletSize } from './hooks/useTabletSize';

// Context
import { AppProvider } from './contexts/AppContext';
import { WorldProvider } from './contexts/WorldContext';

// Components
import ErrorBoundary from './components/ErrorBoundary';

// Utils
import logger from './utils/logger';
import storage from './utils/storage';

const log = logger.createLogger('App');

// Lazy load pages for better performance
// Main Home Page
const HomeTreePageV2 = lazy(() => import('./pages/world/HomeTreePageV2'));

// Active App Pages
const StoryBeachPage = lazy(() => import('./pages/world/StoryBeachPage'));
const ScienceMountainPage = lazy(() => import('./pages/world/ScienceMountainPage'));
const WonderPlazaPage = lazy(() => import('./pages/world/WonderPlazaPage'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'));

// Games - Old versions (kept for backward compatibility) - commented out as they're not used
// const CarRacePage = lazy(() => import('./pages/CarRacePage'));
// const SnakePage = lazy(() => import('./pages/SnakePage'));
// const DinosaurPage = lazy(() => import('./pages/DinosaurPage'));
// const DrawingBoardPage = lazy(() => import('./pages/DrawingBoardPage'));
// const PianoPage = lazy(() => import('./pages/PianoPage'));

// World-Class Apps - Games
const SnakeGameApp = lazy(() => import('./pages/apps/SnakeGameApp'));
const CarRaceGameApp = lazy(() => import('./pages/apps/CarRaceGameApp'));
const DinosaurGameApp = lazy(() => import('./pages/apps/DinosaurGameApp'));

// World-Class Apps - Music
const PianoApp = lazy(() => import('./pages/apps/PianoApp'));

// World-Class Apps - Creative
const DrawingBoardApp = lazy(() => import('./pages/apps/DrawingBoardApp'));

// Learning Pages
const QuizPage = lazy(() => import('./pages/QuizPage'));
const StoryReaderPage = lazy(() => import('./pages/StoryReaderPage'));
const MathActivityPage = lazy(() => import('./pages/MathActivityPage'));

// World-Class Apps - Math
const CountingApp = lazy(() => import('./pages/apps/CountingApp'));
const ReverseCountingApp = lazy(() => import('./pages/apps/ReverseCountingApp'));
const AdditionApp = lazy(() => import('./pages/apps/AdditionApp'));
const SubtractionApp = lazy(() => import('./pages/apps/SubtractionApp'));
const TablesApp = lazy(() => import('./pages/apps/TablesApp'));
const OddEvenApp = lazy(() => import('./pages/apps/OddEvenApp'));

// World-Class Apps - Quiz
const FlagsQuizApp = lazy(() => import('./pages/apps/AllQuizApps').then(module => ({ default: module.FlagsQuizApp })));
const CapitalsQuizApp = lazy(() => import('./pages/apps/AllQuizApps').then(module => ({ default: module.CapitalsQuizApp })));
const MonumentsQuizApp = lazy(() => import('./pages/apps/AllQuizApps').then(module => ({ default: module.MonumentsQuizApp })));
const PeopleQuizApp = lazy(() => import('./pages/apps/AllQuizApps').then(module => ({ default: module.PeopleQuizApp })));

// World-Class Apps - Discovery
const ABCApp = lazy(() => import('./pages/apps/ABCApp'));
const AnimalsApp = lazy(() => import('./pages/apps/AnimalsApp'));
const SpaceApp = lazy(() => import('./pages/apps/SpaceApp'));
const NatureApp = lazy(() => import('./pages/apps/NatureApp'));
const ShapesApp = lazy(() => import('./pages/apps/ShapesApp'));

// World-Class Apps - Puzzle
const MemoryApp = lazy(() => import('./pages/apps/MemoryApp'));
const PuzzlesApp = lazy(() => import('./pages/apps/PuzzlesApp'));

// World-Class Apps - Creative & Learning
const ColoringApp = lazy(() => import('./pages/apps/ColoringApp'));
const ReadingApp = lazy(() => import('./pages/apps/ReadingApp'));

// Legacy (for backward compatibility - redirects to home)
const HomePage = lazy(() => import('./pages/HomePage'));

// Loading component
const LoadingFallback: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}
  >
    <CircularProgress size={60} sx={{ color: 'white' }} />
  </Box>
);

// Inner component that uses the context
const AppContent: React.FC = () => {
  const { isMobile, isTablet } = useTabletSize();
  
  // Always use light theme
  const currentTheme = lightTheme;

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
    const baseStyle = {
      width: '100vw',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      margin: '0',
      boxShadow: 'none',
      border: 'none',
      borderRadius: '0',
    };
    return baseStyle;
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
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
              background-color: ${currentTheme.palette.background.default};
              color: ${currentTheme.palette.text.primary};
              transition: background-color 0.3s ease, color 0.3s ease;
            }
            
            #root {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background-color: ${currentTheme.palette.background.default};
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
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
              {/* Home Route */}
              <Route path="/" element={<HomeTreePageV2 />} />

              {/* Math Apps - World Class */}
              <Route path="/math/counting" element={<CountingApp />} />
              <Route path="/math/reverse-counting" element={<ReverseCountingApp />} />
              <Route path="/math/addition" element={<AdditionApp />} />
              <Route path="/math/subtraction" element={<SubtractionApp />} />
              <Route path="/math/tables" element={<TablesApp />} />
              <Route path="/math/odd-even" element={<OddEvenApp />} />
              <Route path="/math/:activityId" element={<MathActivityPage />} />

              {/* Learning Apps */}
              <Route path="/reading" element={<ReadingApp />} />
              <Route path="/stories" element={<StoryBeachPage />} />
              <Route path="/science" element={<ScienceMountainPage />} />
              <Route path="/numbers" element={<ComingSoonPage />} />

              {/* Creative Apps */}
              <Route path="/drawing-board" element={<DrawingBoardApp />} />
              <Route path="/coloring" element={<ColoringApp />} />
              <Route path="/piano" element={<PianoApp />} />
              <Route path="/music/melodies" element={<ComingSoonPage />} />

              {/* Quiz Apps - World Class */}
              <Route path="/quiz/flags" element={<FlagsQuizApp />} />
              <Route path="/quiz/capitals" element={<CapitalsQuizApp />} />
              <Route path="/quiz/monuments" element={<MonumentsQuizApp />} />
              <Route path="/quiz/people" element={<PeopleQuizApp />} />

              {/* Games & Puzzles */}
              <Route path="/puzzles" element={<PuzzlesApp />} />
              <Route path="/memory" element={<MemoryApp />} />
              <Route path="/quiz" element={<WonderPlazaPage />} />
              <Route path="/quiz/:category" element={<QuizPage />} />

              {/* Redirect old /games route to home */}
              <Route path="/games" element={<HomeTreePageV2 />} />

              {/* Discovery Apps */}
              <Route path="/alphabet" element={<ABCApp />} />
              <Route path="/animals" element={<AnimalsApp />} />
              <Route path="/space" element={<SpaceApp />} />
              <Route path="/nature" element={<NatureApp />} />
              <Route path="/shapes" element={<ShapesApp />} />

              {/* Individual Games */}
              <Route path="/snake" element={<SnakeGameApp />} />
              <Route path="/car-race" element={<CarRaceGameApp />} />
              <Route path="/dinosaur" element={<DinosaurGameApp />} />
              <Route path="/games/snake" element={<SnakeGameApp />} />
              <Route path="/games/car-race" element={<CarRaceGameApp />} />
              <Route path="/games/dinosaur" element={<DinosaurGameApp />} />

              {/* Story Reader */}
              <Route path="/story-reader/:storyId" element={<StoryReaderPage />} />

              {/* Redirect old routes to home */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/subjects" element={<HomeTreePageV2 />} />
              <Route path="/dashboard" element={<HomeTreePageV2 />} />
              <Route path="/subject/:subject" element={<HomeTreePageV2 />} />
              <Route path="/subject/games" element={<HomeTreePageV2 />} />
              <Route path="/subject/math" element={<HomeTreePageV2 />} />
              <Route path="/subject/:subject/topic/:topic" element={<HomeTreePageV2 />} />
              <Route path="/subject/:subject/topic/:topic/chapter/:chapter" element={<HomeTreePageV2 />} />
              <Route path="/subject/:subject/topic/:topic/chapter/:chapter/section/:section" element={<HomeTreePageV2 />} />

              {/* Redirect profile and settings to coming soon */}
              <Route path="/profile" element={<ComingSoonPage />} />
              <Route path="/settings" element={<ComingSoonPage />} />

              {/* Catch-all route */}
              <Route path="*" element={<ComingSoonPage />} />
            </Routes>
            </Suspense>
          </AnimatePresence>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

// Main App component
function App() {
  // Handle errors at the application level
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    log.error('Application error caught by ErrorBoundary', error, { errorInfo });
  };

  return (
    <ErrorBoundary onError={handleError}>
      <AppProvider>
        <WorldProvider>
          <AppContent />
        </WorldProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
