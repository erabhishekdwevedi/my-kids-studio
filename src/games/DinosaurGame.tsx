import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper,
  Container,
  IconButton,
  useTheme,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedIcon from '@mui/icons-material/Speed';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Obstacle extends GameObject {
  type: 'cactus' | 'bird';
  passed: boolean;
}

interface Character {
  id: string;
  name: string;
  emoji: string;
  color: string;
  jumpForce: number;
}

interface SpeedSetting {
  id: string;
  name: string;
  multiplier: number;
  emoji: string;
}

const DinosaurGame: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { selectedProfile, updateScore } = useApp();
  const gameLoopRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game state
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'paused' | 'gameOver'>('waiting');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('dinoHighScore');
    return saved ? parseInt(saved) : 0;
  });

  // Game objects
  const [dinosaur, setDinosaur] = useState<GameObject>({
    x: 50,
    y: 150,
    width: 40,
    height: 40
  });
  
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [clouds, setClouds] = useState<GameObject[]>([]);
  
  // Game physics
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(3);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>({
    id: 'dino',
    name: 'Dinosaur',
    emoji: '🦕',
    color: '#4caf50',
    jumpForce: -12
  });
  const [selectedSpeedSetting, setSelectedSpeedSetting] = useState<SpeedSetting>({
    id: 'normal',
    name: 'Normal',
    multiplier: 1,
    emoji: '🚶'
  });
  const [showSettings, setShowSettings] = useState(false);

  // Character options
  const characters: Character[] = [
    {
      id: 'dino',
      name: 'Dinosaur',
      emoji: '🦕',
      color: '#4caf50',
      jumpForce: -12
    },
    {
      id: 'motorbike',
      name: 'Motorbike',
      emoji: '🏍️',
      color: '#ff9800',
      jumpForce: -14
    },
    {
      id: 'girl',
      name: 'Girl Runner',
      emoji: '🏃‍♀️',
      color: '#e91e63',
      jumpForce: -11
    }
  ];

  // Speed settings
  const speedSettings: SpeedSetting[] = [
    {
      id: 'slow',
      name: 'Slow',
      multiplier: 0.7,
      emoji: '🐌'
    },
    {
      id: 'normal',
      name: 'Normal',
      multiplier: 1,
      emoji: '🚶'
    },
    {
      id: 'fast',
      name: 'Fast',
      multiplier: 1.5,
      emoji: '🏃'
    },
    {
      id: 'turbo',
      name: 'Turbo',
      multiplier: 2,
      emoji: '🚀'
    }
  ];

  // Constants
  const GRAVITY = 0.6;
  const GROUND_Y = 150;
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 200;

  // Initialize clouds
  useEffect(() => {
    const initialClouds: GameObject[] = [];
    for (let i = 0; i < 3; i++) {
      initialClouds.push({
        x: Math.random() * CANVAS_WIDTH,
        y: 20 + Math.random() * 30,
        width: 40,
        height: 20
      });
    }
    setClouds(initialClouds);
  }, []);

  // Game functions
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    const initialSpeed = 3 * selectedSpeedSetting.multiplier;
    setGameSpeed(initialSpeed);
    setObstacles([]);
    setDinosaur(prev => ({ ...prev, y: GROUND_Y }));
    setVelocity({ x: 0, y: 0 });
    setIsJumping(false);
  }, [GROUND_Y, selectedSpeedSetting.multiplier]);

  const gameOver = useCallback(() => {
    setGameState('gameOver');
    if (selectedProfile && score > 0) {
      updateScore(Math.floor(score / 10));
    }
  }, [selectedProfile, score, updateScore]);

  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Handle jump
  const jump = useCallback(() => {
    if (gameState === 'playing' && !isJumping) {
      setVelocity(prev => ({ ...prev, y: selectedCharacter.jumpForce }));
      setIsJumping(true);
    }
  }, [gameState, isJumping, selectedCharacter.jumpForce]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameState === 'waiting') {
          startGame();
        } else if (gameState === 'gameOver') {
          resetGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, jump, resetGame, startGame]);

  // Game logic
  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return;

    // Update dinosaur physics
    setDinosaur(prev => {
      const newY = prev.y + velocity.y;
      const onGround = newY >= GROUND_Y;
      
      if (onGround) {
        setIsJumping(false);
        setVelocity(v => ({ ...v, y: 0 }));
        return { ...prev, y: GROUND_Y };
      }
      
      return { ...prev, y: newY };
    });

    // Apply gravity
    if (isJumping) {
      setVelocity(prev => ({ ...prev, y: prev.y + GRAVITY }));
    }

    // Update obstacles
    setObstacles(prev => {
      const updated = prev.map(obstacle => ({
        ...obstacle,
        x: obstacle.x - gameSpeed,
        passed: obstacle.x + obstacle.width < dinosaur.x && !obstacle.passed ? true : obstacle.passed
      }));

      // Remove off-screen obstacles
      const filtered = updated.filter(obstacle => obstacle.x + obstacle.width > -50);

      // Add new obstacles
      const shouldAddObstacle = Math.random() < 0.005 && 
        (filtered.length === 0 || filtered[filtered.length - 1].x < CANVAS_WIDTH - 200);

      if (shouldAddObstacle) {
        const obstacleType = Math.random() < 0.7 ? 'cactus' : 'bird';
        filtered.push({
          x: CANVAS_WIDTH,
          y: obstacleType === 'cactus' ? GROUND_Y : GROUND_Y - 50,
          width: 20,
          height: obstacleType === 'cactus' ? 40 : 20,
          type: obstacleType,
          passed: false
        });
      }

      return filtered;
    });

    // Update clouds
    setClouds(prev => {
      const updated = prev.map(cloud => ({
        ...cloud,
        x: cloud.x - 0.5
      }));

      // Reset clouds that go off screen
      return updated.map(cloud => 
        cloud.x < -cloud.width 
          ? { ...cloud, x: CANVAS_WIDTH + Math.random() * 100 }
          : cloud
      );
    });

    // Update score
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('dinoHighScore', newScore.toString());
      }
      return newScore;
    });

    // Increase game speed
    setGameSpeed(prev => Math.min(prev + 0.001, 8));

    // Check collision
    obstacles.forEach(obstacle => {
      if (
        dinosaur.x < obstacle.x + obstacle.width &&
        dinosaur.x + dinosaur.width > obstacle.x &&
        dinosaur.y < obstacle.y + obstacle.height &&
        dinosaur.y + dinosaur.height > obstacle.y
      ) {
        gameOver();
      }
    });

  }, [gameState, velocity, isJumping, dinosaur, gameSpeed, highScore, obstacles, gameOver]);

  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      if (gameState === 'playing') {
        updateGame();
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      }
    };

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, updateGame]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = theme.palette.mode === 'dark' ? '#1a1a2e' : '#f7f7f7';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw clouds
    ctx.fillStyle = theme.palette.mode === 'dark' ? '#444' : '#ddd';
    clouds.forEach(cloud => {
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, 15, 0, Math.PI * 2);
      ctx.arc(cloud.x + 15, cloud.y, 20, 0, Math.PI * 2);
      ctx.arc(cloud.x + 30, cloud.y, 15, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw ground
    ctx.fillStyle = theme.palette.mode === 'dark' ? '#333' : '#ccc';
    ctx.fillRect(0, GROUND_Y + 40, CANVAS_WIDTH, 2);

    // Draw dinosaur/character
    ctx.fillStyle = selectedCharacter.color;
    ctx.fillRect(dinosaur.x, dinosaur.y, dinosaur.width, dinosaur.height);
    
    // Character-specific shape
    ctx.fillStyle = selectedCharacter.color;
    if (selectedCharacter.id === 'dino') {
      // Dinosaur shape
      // Body
      ctx.fillRect(dinosaur.x + 5, dinosaur.y + 10, 30, 20);
      // Head
      ctx.fillRect(dinosaur.x + 25, dinosaur.y, 15, 15);
      // Legs
      ctx.fillRect(dinosaur.x + 5, dinosaur.y + 25, 8, 15);
      ctx.fillRect(dinosaur.x + 20, dinosaur.y + 25, 8, 15);
      // Tail
      ctx.fillRect(dinosaur.x, dinosaur.y + 15, 10, 8);
    } else if (selectedCharacter.id === 'motorbike') {
      // Motorbike shape
      // Body
      ctx.fillRect(dinosaur.x + 10, dinosaur.y + 15, 25, 15);
      // Wheels
      ctx.beginPath();
      ctx.arc(dinosaur.x + 8, dinosaur.y + 35, 8, 0, Math.PI * 2);
      ctx.arc(dinosaur.x + 32, dinosaur.y + 35, 8, 0, Math.PI * 2);
      ctx.fill();
      // Handlebars
      ctx.fillRect(dinosaur.x + 15, dinosaur.y + 5, 15, 3);
    } else if (selectedCharacter.id === 'girl') {
      // Girl runner shape
      // Body
      ctx.fillRect(dinosaur.x + 15, dinosaur.y + 12, 12, 20);
      // Head
      ctx.beginPath();
      ctx.arc(dinosaur.x + 21, dinosaur.y + 8, 8, 0, Math.PI * 2);
      ctx.fill();
      // Arms
      ctx.fillRect(dinosaur.x + 8, dinosaur.y + 15, 8, 3);
      ctx.fillRect(dinosaur.x + 26, dinosaur.y + 15, 8, 3);
      // Legs
      ctx.fillRect(dinosaur.x + 12, dinosaur.y + 28, 6, 12);
      ctx.fillRect(dinosaur.x + 22, dinosaur.y + 28, 6, 12);
    }

    // Draw obstacles
    obstacles.forEach(obstacle => {
      if (obstacle.type === 'cactus') {
        ctx.fillStyle = '#4caf50';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        // Cactus arms
        ctx.fillRect(obstacle.x - 5, obstacle.y + 10, 10, 5);
        ctx.fillRect(obstacle.x + 15, obstacle.y + 15, 10, 5);
      } else {
        // Bird
        ctx.fillStyle = '#ff9800';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        // Wings
        ctx.fillRect(obstacle.x - 5, obstacle.y + 5, 10, 3);
        ctx.fillRect(obstacle.x + 15, obstacle.y + 5, 10, 3);
      }
    });

  }, [dinosaur, obstacles, clouds, theme, selectedCharacter]);

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const handleBack = () => {
    navigate('/games');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: 2
    }}>
      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <IconButton onClick={handleBack} sx={{ color: theme.palette.primary.main }}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={handleHome} sx={{ color: theme.palette.primary.main }}>
          <HomeIcon />
        </IconButton>
      </Box>

      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3
          }}>
            🦕 Dino Jump
          </Typography>
        </motion.div>

        {/* Score Display */}
        <Paper elevation={3} sx={{ p: 2, mb: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <Typography variant="h6">
              Score: <strong>{score}</strong>
            </Typography>
            <Typography variant="h6">
              High Score: <strong>{highScore}</strong>
            </Typography>
          </Box>
        </Paper>

        {/* Game Canvas */}
        <Paper elevation={6} sx={{ p: 2, borderRadius: 3, mb: 3 }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onClick={jump}
            style={{
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: '8px',
              cursor: 'pointer',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </Paper>

        {/* Game Controls */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
          {gameState === 'waiting' && (
            <>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={startGame}
              >
                Start Game
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<SettingsIcon />}
                onClick={() => setShowSettings(true)}
              >
                Settings
              </Button>
            </>
          )}
          
          {gameState === 'playing' && (
            <>
              <Button
                variant="contained"
                size="large"
                startIcon={<PauseIcon />}
                onClick={pauseGame}
              >
                Pause
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={jump}
              >
                Jump!
              </Button>
            </>
          )}
          
          {gameState === 'paused' && (
            <>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={resumeGame}
              >
                Resume
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<SettingsIcon />}
                onClick={() => setShowSettings(true)}
              >
                Settings
              </Button>
            </>
          )}
          
          {gameState === 'gameOver' && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', mb: 2 }}>
                  <Typography variant="h5" color="error" gutterBottom>
                    Game Over!
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Final Score: {score}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<RestartAltIcon />}
                      onClick={resetGame}
                    >
                      Play Again
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<SettingsIcon />}
                      onClick={() => setShowSettings(true)}
                    >
                      Settings
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            </AnimatePresence>
          )}
        </Box>

        {/* Current Settings Display */}
        <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Chip
              icon={<PersonIcon />}
              label={`${selectedCharacter.emoji} ${selectedCharacter.name}`}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<SpeedIcon />}
              label={`${selectedSpeedSetting.emoji} ${selectedSpeedSetting.name}`}
              color="secondary"
              variant="outlined"
            />
          </Box>
        </Paper>

        {/* Settings Dialog */}
        <Dialog 
          open={showSettings} 
          onClose={() => setShowSettings(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
            <Typography variant="h5">🎮 Game Settings</Typography>
          </DialogTitle>
          
          <DialogContent>
            <Grid container spacing={3}>
              {/* Character Selection */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon /> Choose Character
                </Typography>
                <Grid container spacing={2}>
                  {characters.map((character) => (
                    <Grid item xs={12} key={character.id}>
                      <Card 
                        sx={{ 
                          cursor: 'pointer',
                          border: selectedCharacter.id === character.id ? 2 : 1,
                          borderColor: selectedCharacter.id === character.id 
                            ? 'primary.main' 
                            : 'divider',
                          '&:hover': {
                            boxShadow: 3
                          }
                        }}
                        onClick={() => setSelectedCharacter(character)}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h4">{character.emoji}</Typography>
                            <Box>
                              <Typography variant="h6">{character.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Jump Power: {Math.abs(character.jumpForce)}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Speed Selection */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SpeedIcon /> Choose Speed
                </Typography>
                <Grid container spacing={2}>
                  {speedSettings.map((speed) => (
                    <Grid item xs={12} key={speed.id}>
                      <Card 
                        sx={{ 
                          cursor: 'pointer',
                          border: selectedSpeedSetting.id === speed.id ? 2 : 1,
                          borderColor: selectedSpeedSetting.id === speed.id 
                            ? 'secondary.main' 
                            : 'divider',
                          '&:hover': {
                            boxShadow: 3
                          }
                        }}
                        onClick={() => setSelectedSpeedSetting(speed)}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h4">{speed.emoji}</Typography>
                            <Box>
                              <Typography variant="h6">{speed.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Speed: {speed.multiplier}x
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setShowSettings(false)} size="large" variant="contained">
              Done
            </Button>
          </DialogActions>
        </Dialog>

        {/* Instructions */}
        <Paper elevation={2} sx={{ p: 2, mt: 3, maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            How to Play:
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Press <strong>SPACE</strong> or <strong>UP ARROW</strong> to jump
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Click the canvas or "Jump!" button to jump
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Avoid the cacti 🌵 and birds 🐦
          </Typography>
          <Typography variant="body2">
            • The game gets faster as your score increases!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default DinosaurGame;
