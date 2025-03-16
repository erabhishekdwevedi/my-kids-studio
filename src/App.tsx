import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

// Pages
import HomePage from './pages/HomePage';
import ThemeSelectionPage from './pages/ThemeSelectionPage';
import SubjectsPage from './pages/SubjectsPage';
import SubjectPage from './pages/SubjectPage';
import ComingSoonPage from './pages/ComingSoonPage';
import CarRacePage from './pages/CarRacePage';
import SnakePage from './pages/SnakePage';
import GamePage from './pages/GamePage';
import ArtPage from './pages/ArtPage';
import MathPage from './pages/MathPage';
import SciencePage from './pages/SciencePage';
import ReadingPage from './pages/ReadingPage';
import GamesPage from './pages/GamesPage';
import DashboardPage from './pages/DashboardPage';
import DrawingBoardPage from './pages/DrawingBoardPage';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#f06292', // Pink (strawberry)
      light: '#f8bbd0',
      dark: '#c2185b',
    },
    secondary: {
      main: '#7986cb', // Indigo (blueberry)
      light: '#9fa8da',
      dark: '#5c6bc0',
    },
    background: {
      default: '#fff8e1', // Light cream/vanilla
      paper: '#ffffff',
    },
    text: {
      primary: '#5d4037', // Chocolate brown
      secondary: '#8d6e63', // Lighter brown
    },
    error: {
      main: '#e53935',
      light: '#ef5350',
    },
    warning: {
      main: '#ffb74d', // Orange (orange sherbet)
      light: '#ffcc80',
    },
    info: {
      main: '#4fc3f7', // Light blue (blue raspberry)
      light: '#81d4fa',
    },
    success: {
      main: '#aed581', // Light green (mint)
      light: '#c5e1a5',
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
    fontSize: 16,
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '10px 20px',
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Core Pages - Do not modify */}
            <Route path="/" element={<HomePage />} />
            <Route path="/theme-selection" element={<ThemeSelectionPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Subject Level */}
            <Route path="/subjects" element={<SubjectsPage />} />
            
            {/* Subject Pages */}
            <Route path="/subject/gk" element={<SubjectPage />} />
            <Route path="/subject/story" element={<SubjectPage />} />
            <Route path="/subject/art" element={<ArtPage />} />
            <Route path="/subject/music" element={<SubjectPage />} />
            <Route path="/subject/math" element={<ComingSoonPage />} />
            <Route path="/subject/science" element={<ComingSoonPage />} />
            <Route path="/subject/games" element={<GamesPage />} />
            <Route path="/subject/habits" element={<SubjectPage />} />
            <Route path="/subject/travel" element={<SubjectPage />} />
            <Route path="/subject/reading" element={<ReadingPage />} />
            
            {/* Topic Level */}
            <Route path="/subject/:subject/topic/:topic" element={<SubjectPage />} />
            
            {/* Games Main Page */}
            <Route path="/games" element={<GamesPage />} />
            
            {/* Game Pages */}
            <Route path="/games/car-race" element={<CarRacePage />} />
            <Route path="/games/snake" element={<SnakePage />} />
            <Route path="/games/game" element={<ComingSoonPage />} />
            
            {/* Art Pages */}
            <Route path="/art/drawing-board" element={<DrawingBoardPage />} />
            
            {/* Chapter Level */}
            <Route path="/subject/:subject/topic/:topic/chapter/:chapter" element={<SubjectPage />} />
            
            {/* Section Level */}
            <Route path="/subject/:subject/topic/:topic/chapter/:chapter/section/:section" element={<SubjectPage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<ComingSoonPage />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;
