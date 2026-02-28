import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import DrawingBoardPage from '../DrawingBoardPage';
import { useWorld } from '../../contexts/WorldContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ArtMeadowPage: React.FC = () => {
  const navigate = useNavigate();
  const { navigateToZone, updateCollection } = useWorld();

  useEffect(() => {
    navigateToZone('art-meadow');
    updateCollection('colors', '#' + Math.floor(Math.random()*16777215).toString(16));
  }, [navigateToZone, updateCollection]);

  const handleBack = () => {
    navigateToZone('home-tree');
    navigate('/world/home-tree');
  };

  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 100,
          background: 'rgba(255,255,255,0.9)',
          '&:hover': { background: 'white' }
        }}
      >
        Home Tree
      </Button>
      <DrawingBoardPage />
    </Box>
  );
};

export default ArtMeadowPage;
