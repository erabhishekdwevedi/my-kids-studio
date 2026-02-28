import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useWorld } from '../../contexts/WorldContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const games = [
  { id: 'snake', name: 'Snake', emoji: '🐍', path: '/snake', description: 'Classic snake game' },
  { id: 'car-race', name: 'Car Race', emoji: '🏎️', path: '/car-race', description: 'Race to the finish' },
  { id: 'dinosaur', name: 'Dino Jump', emoji: '🦕', path: '/dinosaur', description: 'Jump over obstacles' }
];

const GameArcadePage: React.FC = () => {
  const navigate = useNavigate();
  const { navigateToZone } = useWorld();

  useEffect(() => {
    navigateToZone('game-arcade');
  }, [navigateToZone]);

  const handleBack = () => {
    navigateToZone('home-tree');
    navigate('/world/home-tree');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #B8A9FF 0%, #9D8FFF 100%)',
      p: 3,
      position: 'relative'
    }}>
      {/* Neon light effect */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)',
        pointerEvents: 'none'
      }} />

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{
          color: 'white',
          background: 'rgba(255,255,255,0.2)',
          '&:hover': { background: 'rgba(255,255,255,0.3)' },
          position: 'relative',
          zIndex: 1
        }}
      >
        Home Tree
      </Button>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', my: 3, color: 'white', fontWeight: 700 }}>
          🎮 Game Arcade
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'center', mb: 4, color: 'rgba(255,255,255,0.9)' }}>
          Hidden underground fun!
        </Typography>

        <Grid container spacing={3} sx={{ maxWidth: 1000, mx: 'auto' }}>
          {games.map((game, i) => (
            <Grid item xs={12} sm={4} key={game.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: '0 20px 40px rgba(157, 143, 255, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  onClick={() => navigate(game.path)}
                  sx={{
                    background: 'rgba(255,255,255,0.95)',
                    p: 4,
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    border: '4px solid white',
                    '&:hover': {
                      background: 'white',
                      boxShadow: '0 12px 32px rgba(157, 143, 255, 0.3)'
                    }
                  }}
                >
                  <Typography sx={{ fontSize: '4rem' }}>{game.emoji}</Typography>
                  <Typography variant="h5" sx={{ color: '#9D8FFF', fontWeight: 700 }}>
                    {game.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {game.description}
                  </Typography>
                </Button>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GameArcadePage;
