import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useWorld } from '../../contexts/WorldContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const experiments = [
  { id: 'volcano', name: 'Volcano', emoji: '🌋', description: 'Make it erupt!' },
  { id: 'weather', name: 'Weather', emoji: '🌦️', description: 'Control the weather' },
  { id: 'plants', name: 'Plant Growth', emoji: '🌱', description: 'Watch plants grow' },
  { id: 'magnets', name: 'Magnets', emoji: '🧲', description: 'Magnetic magic' },
  { id: 'water', name: 'Water Cycle', emoji: '💧', description: 'How water travels' },
  { id: 'space', name: 'Space', emoji: '🚀', description: 'Explore the stars' }
];

const ScienceMountainPage: React.FC = () => {
  const navigate = useNavigate();
  const { navigateToZone, updateCollection, currentProfile } = useWorld();

  useEffect(() => {
    navigateToZone('science-mountain');
  }, [navigateToZone]);

  const handleBack = () => {
    navigateToZone('home-tree');
    navigate('/world/home-tree');
  };

  const handleExperiment = () => {
    updateCollection('butterflies', 1);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #9D8FFF 0%, #4A5668 100%)',
      p: 3
    }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{
          color: 'white',
          background: 'rgba(255,255,255,0.2)',
          '&:hover': { background: 'rgba(255,255,255,0.3)' }
        }}
      >
        Home Tree
      </Button>

      <Typography variant="h3" sx={{ textAlign: 'center', my: 3, color: 'white', fontWeight: 700 }}>
        ⛰️ Science Mountain
      </Typography>

      <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, color: 'rgba(255,255,255,0.9)' }}>
        Butterflies collected: {currentProfile?.collection.butterflies || 0} 🦋
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: 1000, mx: 'auto', mt: 2 }}>
        {experiments.map((exp, i) => (
          <Grid item xs={12} sm={6} md={4} key={exp.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                fullWidth
                onClick={handleExperiment}
                sx={{
                  background: 'rgba(255,255,255,0.95)',
                  p: 4,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  border: '4px solid white',
                  '&:hover': { boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }
                }}
              >
                <Typography sx={{ fontSize: '4rem' }}>{exp.emoji}</Typography>
                <Typography variant="h6" sx={{ color: '#4A5668', fontWeight: 700 }}>
                  {exp.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {exp.description}
                </Typography>
              </Button>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ScienceMountainPage;
