// Coloring App - World-Class
import React, { useState } from 'react';
import { Box, Typography, Container, alpha, Button } from '@mui/material';
import { motion } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';

const GRADIENT = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';

const COLORS = [
  { name: 'Red', value: '#FF6B6B' },
  { name: 'Blue', value: '#4ECDC4' },
  { name: 'Green', value: '#95E1D3' },
  { name: 'Yellow', value: '#FFD93D' },
  { name: 'Purple', value: '#C77DFF' },
  { name: 'Orange', value: '#FF9F1C' },
  { name: 'Pink', value: '#FF6B9D' },
  { name: 'Brown', value: '#A0522D' },
];

const COLORING_IMAGES = [
  {
    name: 'Butterfly',
    emoji: '🦋',
    parts: [
      { id: 'body', path: 'M100,120 L100,180 L95,180 L95,120 Z', defaultColor: '#ccc' },
      { id: 'wing1', path: 'M95,130 Q60,100 70,140 Q75,160 95,150 Z', defaultColor: '#ccc' },
      { id: 'wing2', path: 'M100,130 Q135,100 125,140 Q120,160 100,150 Z', defaultColor: '#ccc' },
      { id: 'wing3', path: 'M95,150 Q60,170 70,190 Q75,200 95,185 Z', defaultColor: '#ccc' },
      { id: 'wing4', path: 'M100,150 Q135,170 125,190 Q120,200 100,185 Z', defaultColor: '#ccc' },
    ]
  },
  {
    name: 'Flower',
    emoji: '🌸',
    parts: [
      { id: 'center', path: 'M100,100 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0', defaultColor: '#ccc' },
      { id: 'petal1', path: 'M100,85 Q90,60 100,50 Q110,60 100,85 Z', defaultColor: '#ccc' },
      { id: 'petal2', path: 'M115,92 Q130,75 140,80 Q130,95 115,92 Z', defaultColor: '#ccc' },
      { id: 'petal3', path: 'M115,108 Q130,125 140,120 Q130,105 115,108 Z', defaultColor: '#ccc' },
      { id: 'petal4', path: 'M85,108 Q70,125 60,120 Q70,105 85,108 Z', defaultColor: '#ccc' },
      { id: 'petal5', path: 'M85,92 Q70,75 60,80 Q70,95 85,92 Z', defaultColor: '#ccc' },
      { id: 'stem', path: 'M100,115 L100,180 L95,180 L95,115 Z', defaultColor: '#ccc' },
    ]
  },
  {
    name: 'Car',
    emoji: '🚗',
    parts: [
      { id: 'body', path: 'M40,120 L160,120 L160,150 L40,150 Z', defaultColor: '#ccc' },
      { id: 'roof', path: 'M60,100 L140,100 L150,120 L50,120 Z', defaultColor: '#ccc' },
      { id: 'wheel1', path: 'M60,150 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0', defaultColor: '#ccc' },
      { id: 'wheel2', path: 'M140,150 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0', defaultColor: '#ccc' },
      { id: 'window', path: 'M70,105 L90,105 L95,120 L65,120 Z', defaultColor: '#ccc' },
    ]
  },
];

const ColoringApp: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [partColors, setPartColors] = useState<Record<string, string>>(
    Object.fromEntries(COLORING_IMAGES[0].parts.map(p => [p.id, p.defaultColor]))
  );

  const currentImage = COLORING_IMAGES[currentImageIndex];

  const handlePartClick = (partId: string) => {
    if (partColors[partId] === selectedColor) return; // Already this color

    setPartColors({
      ...partColors,
      [partId]: selectedColor
    });
    setScore(score + 5);
  };

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % COLORING_IMAGES.length;
    setCurrentImageIndex(nextIndex);
    setPartColors(
      Object.fromEntries(COLORING_IMAGES[nextIndex].parts.map(p => [p.id, p.defaultColor]))
    );
  };

  const handleClear = () => {
    setPartColors(
      Object.fromEntries(currentImage.parts.map(p => [p.id, p.defaultColor]))
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <AppNavigation appName="Coloring Book 🎨" score={score} gradient={GRADIENT} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

          <Typography variant="h3" textAlign="center" fontWeight={700} mb={1} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Color the {currentImage.name}
          </Typography>

          <Typography variant="h2" textAlign="center" mb={3}>{currentImage.emoji}</Typography>

          {/* Coloring Canvas */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box sx={{ background: 'white', borderRadius: 3, p: 3, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              <svg width="300" height="250" viewBox="0 0 200 200">
                {currentImage.parts.map((part) => (
                  <motion.path
                    key={part.id}
                    d={part.path}
                    fill={partColors[part.id]}
                    stroke="#333"
                    strokeWidth="2"
                    onClick={() => handlePartClick(part.id)}
                    style={{ cursor: 'pointer' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </svg>
            </Box>
          </Box>

          {/* Color Palette */}
          <Typography variant="h6" textAlign="center" fontWeight={600} mb={2}>
            Choose a Color:
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
            {COLORS.map((color) => (
              <motion.div key={color.value} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Box
                  onClick={() => setSelectedColor(color.value)}
                  sx={{
                    aspectRatio: '1',
                    backgroundColor: color.value,
                    borderRadius: 3,
                    cursor: 'pointer',
                    border: selectedColor === color.value ? '4px solid #333' : '2px solid #ccc',
                    boxShadow: selectedColor === color.value ? '0 8px 24px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {selectedColor === color.value && (
                    <Typography variant="h4" color="white" fontWeight={700}>✓</Typography>
                  )}
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={handleClear}
              variant="outlined"
              fullWidth
              sx={{
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: 3,
                borderWidth: 2,
                textTransform: 'none'
              }}
            >
              Clear
            </Button>
            <Button
              onClick={handleNextImage}
              fullWidth
              sx={{
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                background: GRADIENT,
                color: 'white',
                borderRadius: 3,
                textTransform: 'none'
              }}
            >
              Next Picture
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ColoringApp;
