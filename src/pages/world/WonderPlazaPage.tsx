import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useWorld } from '../../contexts/WorldContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const quizCategories = [
  { id: 'flags', name: 'World Flags', emoji: '🏁', description: 'Learn country flags' },
  { id: 'capitals', name: 'Capital Cities', emoji: '🏛️', description: 'Match cities to countries' },
  { id: 'monuments', name: 'Monuments', emoji: '🗽', description: 'Famous landmarks' },
  { id: 'people', name: 'Famous People', emoji: '👤', description: 'Historical figures' }
];

const WonderPlazaPage: React.FC = () => {
  const navigate = useNavigate();
  const { navigateToZone, currentProfile } = useWorld();

  useEffect(() => {
    navigateToZone('wonder-plaza');
  }, [navigateToZone]);

  const handleBack = () => {
    navigateToZone('home-tree');
    navigate('/world/home-tree');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFE4B3 0%, #FFD8A8 100%)',
      p: 3
    }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{
          color: '#8B7355',
          background: 'rgba(255,255,255,0.5)',
          '&:hover': { background: 'rgba(255,255,255,0.7)' }
        }}
      >
        Home Tree
      </Button>

      <Typography variant="h3" sx={{ textAlign: 'center', my: 3, color: '#8B7355', fontWeight: 700 }}>
        🌟 Wonder Plaza
      </Typography>

      <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, color: '#A0826D' }}>
        Stars collected: {currentProfile?.collection.stars || 0} ⭐
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: 1000, mx: 'auto', mt: 2 }}>
        {quizCategories.map((cat, i) => (
          <Grid item xs={12} sm={6} key={cat.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                fullWidth
                onClick={() => navigate(`/quiz/${cat.id}`)}
                sx={{
                  background: 'rgba(255,255,255,0.95)',
                  p: 4,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  border: '4px solid white',
                  '&:hover': { boxShadow: '0 12px 32px rgba(0,0,0,0.2)' }
                }}
              >
                <Typography sx={{ fontSize: '4rem' }}>{cat.emoji}</Typography>
                <Typography variant="h5" sx={{ color: '#FFD8A8', fontWeight: 700 }}>
                  {cat.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {cat.description}
                </Typography>
              </Button>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WonderPlazaPage;
