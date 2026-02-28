import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useWorld } from '../../contexts/WorldContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { allStories, Story } from '../../data/storyData';

const StoryBeachPage: React.FC = () => {
  const navigate = useNavigate();
  const { navigateToZone } = useWorld();

  useEffect(() => {
    navigateToZone('story-beach');
  }, [navigateToZone]);

  const handleBack = () => {
    navigateToZone('home-tree');
    navigate('/world/home-tree');
  };

  const handleStoryClick = (storyId: string) => {
    navigate(`/story-reader/${storyId}`);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #A8D8FF 0%, #63C7D1 100%)',
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
        🌊 Story Beach
      </Typography>

      <Typography variant="h6" sx={{ textAlign: 'center', mb: 4, color: 'rgba(255,255,255,0.9)' }}>
        Stories wash ashore in glowing bottles...
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
        {allStories.map((story: Story, i: number) => (
          <Grid item xs={12} sm={6} md={4} key={story.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                fullWidth
                onClick={() => handleStoryClick(story.id)}
                sx={{
                  background: 'rgba(255,255,255,0.95)',
                  p: 3,
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  border: '4px solid white',
                  '&:hover': { boxShadow: '0 12px 32px rgba(0,0,0,0.2)' }
                }}
              >
                <Typography sx={{ fontSize: '3rem' }}>📖</Typography>
                <Typography variant="h6" sx={{ color: '#63C7D1', fontWeight: 700 }}>
                  {story.title}
                </Typography>
              </Button>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StoryBeachPage;
