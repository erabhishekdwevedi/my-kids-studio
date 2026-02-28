// Car Race Game App - World-Class
import React, { useState, useRef } from 'react';
import { Box, Typography, Container, Paper, IconButton, Grid } from '@mui/material';
import { motion, useDragControls } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import StarIcon from '@mui/icons-material/Star';
import { CarRaceGame } from '../../games/CarRaceGame';

const GRADIENT = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';

interface CarRaceGameHandle {
  movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

const CarRaceGameApp: React.FC = () => {
  const [score, setScore] = useState(0);
  const gameRef = useRef<CarRaceGameHandle>(null);
  const dragControls = useDragControls();

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
  };

  const handleControlPress = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameRef.current) {
      gameRef.current.movePlayer(direction);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <AppNavigation appName="Car Race 🏎️" score={score} gradient={GRADIENT} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h2" align="center" fontWeight={700} mb={3} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Car Race 🏎️
          </Typography>
        </motion.div>

        {/* Game Container */}
        <Paper elevation={3} sx={{ p: 2, borderRadius: 4, overflow: 'hidden', position: 'relative', height: '60vh', maxHeight: '500px', mb: 3 }}>
          <Box sx={{ width: '100%', height: '100%', backgroundColor: '#222', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
            <CarRaceGame ref={gameRef} onScoreChange={handleScoreChange} themeColor="#f5576c" />
          </Box>

          {/* Score Display */}
          <Box sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 2, padding: '4px 12px', display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ color: '#ffd54f', fontSize: 20, marginRight: 0.5 }} />
            <Typography sx={{ fontWeight: 'bold' }}>{score}</Typography>
          </Box>
        </Paper>

        {/* Game Controls */}
        <motion.div drag dragControls={dragControls} dragMomentum={false} dragElastic={0.1} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} whileTap={{ scale: 0.98 }}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 4, width: 'fit-content', margin: '0 auto', position: 'relative' }}>
            <DragIndicatorIcon sx={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', color: 'text.secondary', cursor: 'grab' }} onPointerDown={(e) => dragControls.start(e)} />

            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton color="primary" size="large" onMouseDown={() => handleControlPress('up')} onTouchStart={() => handleControlPress('up')} sx={{ bgcolor: 'rgba(0,0,0,0.05)', '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' } }}>
                  <ArrowUpwardIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton color="primary" size="large" onMouseDown={() => handleControlPress('left')} onTouchStart={() => handleControlPress('left')} sx={{ bgcolor: 'rgba(0,0,0,0.05)', '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' } }}>
                    <ArrowBackIosNewIcon />
                  </IconButton>
                  <IconButton color="primary" size="large" onMouseDown={() => handleControlPress('down')} onTouchStart={() => handleControlPress('down')} sx={{ bgcolor: 'rgba(0,0,0,0.05)', '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' } }}>
                    <ArrowDownwardIcon />
                  </IconButton>
                  <IconButton color="primary" size="large" onMouseDown={() => handleControlPress('right')} onTouchStart={() => handleControlPress('right')} sx={{ bgcolor: 'rgba(0,0,0,0.05)', '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' } }}>
                    <ArrowForwardIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CarRaceGameApp;
