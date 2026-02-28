// Dinosaur Game App - World-Class
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, Paper, Button, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import StarIcon from '@mui/icons-material/Star';

const GRADIENT = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';

// Different obstacle types for variety
const OBSTACLE_TYPES = ['🌵', '🪨', '🌴', '🦴', '🏔️'];

interface Obstacle {
  x: number;
  id: number;
  emoji: string;
}

const DinosaurGameApp: React.FC = () => {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'gameover'>('ready');
  const [dinoY, setDinoY] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [velocity, setVelocity] = useState(0);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const nextObstacleId = useRef(0);
  const scoreRef = useRef(0);

  const DINO_SIZE = 120; // Much bigger for kids
  const OBSTACLE_SIZE = 100; // Much bigger for kids
  const GRAVITY = 0.8; // Reduced gravity for floatier jumps
  const JUMP_STRENGTH = 35; // Higher jump to clear obstacles easily
  const GROUND_HEIGHT = 60; // Higher ground so dino runs on platform
  const GAME_SPEED = 3; // Slower for kids

  // Get actual game container width
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameWidth, setGameWidth] = useState(600);

  const gameLoop = useCallback(() => {
    // Update velocity (gravity pulls down)
    setVelocity(v => {
      const newVelocity = v - GRAVITY; // Subtract gravity to pull down
      return newVelocity;
    });

    // Update dino position
    setDinoY(y => {
      const newY = y + velocity;
      // Keep dino on or above ground (dinoY = 0 is ground, positive is UP)
      if (newY <= 0) {
        setVelocity(0); // Stop velocity when hitting ground
        return 0;
      }
      return newY;
    });

    // Update obstacles
    setObstacles(obs => {
      const updated = obs
        .map(o => ({ ...o, x: o.x - GAME_SPEED }))
        .filter(o => o.x > -OBSTACLE_SIZE);

      // Check collision with better accuracy for kids
      obs.forEach(o => {
        const dinoLeft = 20;
        const dinoRight = dinoLeft + DINO_SIZE;

        const obsLeft = o.x;
        const obsRight = o.x + OBSTACLE_SIZE;

        // Check if dino and obstacle overlap horizontally with margin
        const horizontalOverlap = dinoRight > obsLeft + 20 && dinoLeft < obsRight - 20;

        // Check if dino is low enough to hit obstacle
        // Need to jump high enough (dinoY should be greater than obstacle height)
        const verticalOverlap = dinoY < OBSTACLE_SIZE - 20;

        if (horizontalOverlap && verticalOverlap) {
          setGameState('gameover');
        }
      });

      // Add new obstacle with LOTS of spacing for kids
      if (updated.length === 0 || updated[updated.length - 1].x < gameWidth - 600) {
        if (Math.random() < 0.012) { // Even lower spawn rate
          const randomEmoji = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
          updated.push({
            x: gameWidth, // Spawn at right edge of screen
            id: nextObstacleId.current++,
            emoji: randomEmoji
          });
        }
      }

      return updated;
    });

    // Update score (slower increment)
    scoreRef.current = scoreRef.current + 1;
    if (scoreRef.current % 6 === 0) { // Only update every 6 frames (~10 times per second)
      setScore(s => s + 1);
    }
  }, [velocity, dinoY, gameWidth]);

  // Measure game container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setGameWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (gameState === 'playing') {
      const animate = () => {
        gameLoop();
        gameLoopRef.current = requestAnimationFrame(animate);
      };
      gameLoopRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = undefined;
      }
    };
  }, [gameState, gameLoop]);

  const jump = useCallback(() => {
    if (dinoY === 0 && gameState === 'playing') {
      setVelocity(JUMP_STRENGTH);
    }
  }, [dinoY, gameState]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    setDinoY(0);
    setVelocity(0);
    setObstacles([]);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'ready' || gameState === 'gameover') {
          startGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, jump, startGame]);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', display: 'flex', flexDirection: 'column' }}>
      <AppNavigation appName="Dino Run 🦖" score={Math.floor(score / 10)} gradient={GRADIENT} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2, pt: 1 }}>
        {/* Game Container - Full screen */}
        <Paper elevation={3} sx={{ flex: 1, borderRadius: 4, overflow: 'hidden', position: 'relative', minHeight: '500px' }}>
          <Box
            ref={containerRef}
            onClick={() => gameState === 'playing' && jump()}
            sx={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, #87CEEB 0%, #87CEEB 75%, #8B7355 75%, #8B7355 100%)',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              cursor: gameState === 'playing' ? 'pointer' : 'default'
            }}
          >
            {/* Dino */}
            <motion.div
              animate={{
                bottom: `${GROUND_HEIGHT + dinoY}px`,
                // Add bobbing animation when on ground (running effect)
                y: dinoY === 0 ? [0, -3, 0] : 0
              }}
              transition={{
                bottom: { duration: 0 },
                y: {
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                position: 'absolute',
                left: '20px',
                width: `${DINO_SIZE}px`,
                height: `${DINO_SIZE}px`,
                fontSize: '120px',
                lineHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'scaleX(-1)' // Flip to face obstacles coming from right
              }}
            >
              🦖
            </motion.div>

            {/* Obstacles */}
            {obstacles.map(obs => (
              <motion.div
                key={obs.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: `${obs.x}px`,
                    bottom: `${GROUND_HEIGHT}px`,
                    width: `${OBSTACLE_SIZE}px`,
                    height: `${OBSTACLE_SIZE}px`,
                    fontSize: '100px',
                    lineHeight: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {obs.emoji}
                </Box>
              </motion.div>
            ))}

            {/* Game Over / Ready Overlay */}
            {(gameState === 'ready' || gameState === 'gameover') && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: alpha('#000', 0.5),
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <Typography variant="h3" fontWeight={700} color="white">
                  {gameState === 'ready' ? 'Ready to Play?' : 'Game Over!'}
                </Typography>
                {gameState === 'gameover' && (
                  <Typography variant="h5" color="white">
                    Score: {Math.floor(score / 10)}
                  </Typography>
                )}
                <Button
                  onClick={startGame}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    background: GRADIENT,
                    color: 'white',
                    borderRadius: 3,
                    textTransform: 'none'
                  }}
                >
                  {gameState === 'ready' ? 'Start Game' : 'Play Again'}
                </Button>
              </Box>
            )}

            {/* Score Display */}
            <Box sx={{ position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 2, padding: '4px 12px', display: 'flex', alignItems: 'center' }}>
              <StarIcon sx={{ color: '#ffd54f', fontSize: 20, marginRight: 0.5 }} />
              <Typography sx={{ fontWeight: 'bold' }}>{Math.floor(score / 10)}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default DinosaurGameApp;
