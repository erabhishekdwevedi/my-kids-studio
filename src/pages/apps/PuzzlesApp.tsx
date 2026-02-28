// Jigsaw Puzzle App - World-Class
import React, { useState } from 'react';
import { Box, Typography, Container, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';

const GRADIENT = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';

const PUZZLES = [
  { emoji: '🐶', pieces: ['🐕', '🦴', '🐾', '💖'], answer: 'Dog' },
  { emoji: '🌈', pieces: ['☀️', '🌧️', '☁️', '🌤️'], answer: 'Rainbow' },
  { emoji: '🏠', pieces: ['🧱', '🚪', '🪟', '🏡'], answer: 'House' },
  { emoji: '🌳', pieces: ['🌱', '🍃', '🪵', '🌲'], answer: 'Tree' },
  { emoji: '🎂', pieces: ['🍰', '🕯️', '🎉', '🎈'], answer: 'Birthday' },
  { emoji: '🚗', pieces: ['🛞', '🚙', '🛣️', '⛽'], answer: 'Car' },
];

const PuzzlesApp: React.FC = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(PUZZLES[0]);
  const [placedPieces, setPlacedPieces] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [availablePieces, setAvailablePieces] = useState(
    currentPuzzle.pieces.map((_, idx) => idx).sort(() => Math.random() - 0.5)
  );

  const handlePiecePlaced = (pieceIndex: number) => {
    if (!placedPieces.includes(pieceIndex)) {
      setPlacedPieces([...placedPieces, pieceIndex]);
      setAvailablePieces(availablePieces.filter(idx => idx !== pieceIndex));

      if (placedPieces.length + 1 === currentPuzzle.pieces.length) {
        // Puzzle complete
        setScore(score + 50);
        setTimeout(() => {
          // Load next puzzle
          const nextIndex = (PUZZLES.indexOf(currentPuzzle) + 1) % PUZZLES.length;
          const nextPuzzle = PUZZLES[nextIndex];
          setCurrentPuzzle(nextPuzzle);
          setPlacedPieces([]);
          setAvailablePieces(nextPuzzle.pieces.map((_, idx) => idx).sort(() => Math.random() - 0.5));
        }, 2000);
      }
    }
  };

  const isComplete = placedPieces.length === currentPuzzle.pieces.length;

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <AppNavigation appName="Puzzle Time 🧩" score={score} gradient={GRADIENT} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4, md: 5 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

          <Typography variant="h3" textAlign="center" fontWeight={700} mb={4} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Complete the Puzzle!
          </Typography>

          {/* Puzzle Board - Shows result */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              <Box sx={{
                width: 250,
                height: 250,
                borderRadius: 4,
                background: isComplete ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : alpha('#000', 0.05),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '4px dashed',
                borderColor: isComplete ? '#43e97b' : '#ccc',
                boxShadow: isComplete ? '0 20px 60px rgba(67, 233, 123, 0.3)' : 'none',
                transition: 'all 0.3s ease'
              }}>
                {isComplete ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Typography sx={{ fontSize: '10rem' }}>{currentPuzzle.emoji}</Typography>
                  </motion.div>
                ) : (
                  <Typography variant="h6" color="text.secondary">
                    {placedPieces.length} / {currentPuzzle.pieces.length}
                  </Typography>
                )}
              </Box>
            </motion.div>
          </Box>

          {isComplete && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Typography variant="h4" textAlign="center" fontWeight={700} mb={3} color="success.main">
                🎉 Perfect! It's a {currentPuzzle.answer}!
              </Typography>
            </motion.div>
          )}

          {/* Puzzle Pieces */}
          <Typography variant="h5" textAlign="center" fontWeight={600} mb={2} color="text.secondary">
            Drag pieces to complete:
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {currentPuzzle.pieces.map((piece, index) => {
              const isPlaced = placedPieces.includes(index);
              const isAvailable = availablePieces.includes(index);

              if (!isAvailable && !isPlaced) return <Box key={index} />;

              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isPlaced ? 0 : 1,
                    opacity: isPlaced ? 0 : 1
                  }}
                  whileHover={{ scale: isPlaced ? 0 : 1.1 }}
                  whileTap={{ scale: isPlaced ? 0 : 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    onClick={() => handlePiecePlaced(index)}
                    sx={{
                      aspectRatio: '1',
                      background: GRADIENT,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: isPlaced ? 'default' : 'pointer',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      '&:hover': {
                        boxShadow: isPlaced ? '0 8px 24px rgba(0,0,0,0.15)' : '0 12px 32px rgba(0,0,0,0.25)',
                      }
                    }}
                  >
                    <Typography sx={{ fontSize: '3rem' }}>{piece}</Typography>
                  </Box>
                </motion.div>
              );
            })}
          </Box>

          {/* Progress indicator */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
            {currentPuzzle.pieces.map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: placedPieces.includes(idx) ? GRADIENT : alpha('#000', 0.2),
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PuzzlesApp;
