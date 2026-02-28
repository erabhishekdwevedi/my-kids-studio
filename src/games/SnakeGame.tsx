import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import PaletteIcon from '@mui/icons-material/Palette';
import BrushIcon from '@mui/icons-material/Brush';

interface SnakeGameProps {
  onScoreChange: (newScore: number) => void;
  themeColor: string;
}

interface Position {
  x: number;
  y: number;
}

type Direction = 'up' | 'down' | 'left' | 'right';

// Define the imperative handle type
interface SnakeGameHandle {
  changeDirection: (direction: Direction) => void;
}

const GRID_SIZE = 20; // 20x20 grid
const INITIAL_SNAKE_LENGTH = 3;
const INITIAL_SPEED = 200; // milliseconds between moves

// Crayon colors for the snake body
const CRAYON_COLORS = [
  '#FF5252', // Red
  '#FF9800', // Orange
  '#FFEB3B', // Yellow
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#673AB7', // Purple
  '#E91E63', // Pink
  '#00BCD4', // Cyan
  '#009688', // Teal
  '#8BC34A', // Light Green
];

// Confetti component for celebration effect
const Confetti = ({ x, y, color }: { x: number, y: number, color: string }) => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    angle: Math.random() * 360,
    distance: Math.random() * 50 + 10,
    size: Math.random() * 8 + 2,
    delay: Math.random() * 0.2,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: x, 
            y: y, 
            opacity: 1, 
            scale: 0 
          }}
          animate={{ 
            x: x + Math.cos(particle.angle) * particle.distance, 
            y: y + Math.sin(particle.angle) * particle.distance, 
            opacity: 0,
            scale: 1
          }}
          transition={{ 
            duration: 0.8, 
            delay: particle.delay,
            ease: "easeOut" 
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            borderRadius: '50%',
            zIndex: 20
          }}
        />
      ))}
    </>
  );
};

// Define a consistent font stack for cross-platform compatibility
const fontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"'
].join(',');

const SnakeGame = forwardRef<SnakeGameHandle, SnakeGameProps>(({ onScoreChange, themeColor }, ref) => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [snake, setSnake] = useState<Position[]>([]);
  const [colorItem, setColorItem] = useState<Position & { color: string }>({ x: 0, y: 0, color: CRAYON_COLORS[0] });
  const [direction, setDirection] = useState<Direction>('right');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameSpeed, setGameSpeed] = useState<number>(INITIAL_SPEED);
  const [snakeColors, setSnakeColors] = useState<string[]>([]);
  const [confetti, setConfetti] = useState<{ x: number, y: number, color: string, active: boolean }>({ x: 0, y: 0, color: '', active: false });
  
  // Place color item at random position
  const placeColorItem = useCallback((currentSnake: Position[]) => {
    const newColorItem = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
      color: CRAYON_COLORS[Math.floor(Math.random() * CRAYON_COLORS.length)]
    };
    
    // Make sure color item is not on the snake
    const isOnSnake = currentSnake.some(segment => 
      segment.x === newColorItem.x && segment.y === newColorItem.y
    );
    
    if (isOnSnake) {
      placeColorItem(currentSnake);
    } else {
      setColorItem(newColorItem);
    }
  }, []);

  const resetGame = useCallback(() => {
    // Create initial snake in the middle of the grid
    const initialSnake: Position[] = [];
    const middleY = Math.floor(GRID_SIZE / 2);
    const startX = Math.floor(GRID_SIZE / 3);
    
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({ x: startX - i, y: middleY });
    }
    
    // Initialize snake with random colors
    const initialColors = Array.from({ length: INITIAL_SNAKE_LENGTH }, 
      () => CRAYON_COLORS[Math.floor(Math.random() * CRAYON_COLORS.length)]);
    
    setSnake(initialSnake);
    setSnakeColors(initialColors);
    setDirection('right');
    setGameOver(false);
    setScore(0);
    onScoreChange(0);
    setGameSpeed(INITIAL_SPEED);
    setConfetti({ x: 0, y: 0, color: '', active: false });
    
    // Place color item at random position
    placeColorItem(initialSnake);
  }, [onScoreChange, placeColorItem]);
  
  // Initialize game
  useEffect(() => {
    resetGame();
  }, [resetGame]);
  
  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    changeDirection: (newDirection: Direction) => {
      if (!gameStarted) {
        setGameStarted(true);
      }
      
      if (gameOver) {
        resetGame();
        setGameStarted(true);
        return;
      }
      
      // Prevent 180-degree turns
      if (
        (newDirection === 'up' && direction !== 'down') ||
        (newDirection === 'down' && direction !== 'up') ||
        (newDirection === 'left' && direction !== 'right') ||
        (newDirection === 'right' && direction !== 'left')
      ) {
        setDirection(newDirection);
      }
    }
  }));
  
  // Move snake
  const moveSnake = () => {
    setSnake(prevSnake => {
      // Calculate new head position
      const head = prevSnake[0];
      let newHead: Position;
      
      switch (direction) {
        case 'up':
          newHead = { x: head.x, y: (head.y - 1 + GRID_SIZE) % GRID_SIZE };
          break;
        case 'down':
          newHead = { x: head.x, y: (head.y + 1) % GRID_SIZE };
          break;
        case 'left':
          newHead = { x: (head.x - 1 + GRID_SIZE) % GRID_SIZE, y: head.y };
          break;
        case 'right':
          newHead = { x: (head.x + 1) % GRID_SIZE, y: head.y };
          break;
        default:
          newHead = { ...head };
      }
      
      // Check for collision with self
      const selfCollision = prevSnake.some((segment, index) => 
        index !== 0 && segment.x === newHead.x && segment.y === newHead.y
      );
      
      if (selfCollision) {
        setGameOver(true);
        return prevSnake;
      }
      
      // Check for collision with color item
      const colorCollision = newHead.x === colorItem.x && newHead.y === colorItem.y;
      
      // Create new snake
      let newSnake: Position[];
      let newSnakeColors = [...snakeColors];
      
      if (colorCollision) {
        // Snake grows and adds the new color
        newSnake = [newHead, ...prevSnake];
        newSnakeColors = [colorItem.color, ...newSnakeColors];
        setSnakeColors(newSnakeColors);
        
        // Update score
        const newScore = score + 10;
        setScore(newScore);
        onScoreChange(newScore);
        
        // Trigger confetti effect
        const gameAreaRect = gameAreaRef.current?.getBoundingClientRect();
        if (gameAreaRect) {
          const cellWidth = gameAreaRect.width / GRID_SIZE;
          const cellHeight = gameAreaRect.height / GRID_SIZE;
          const confettiX = colorItem.x * cellWidth + cellWidth / 2;
          const confettiY = colorItem.y * cellHeight + cellHeight / 2;
          
          setConfetti({
            x: confettiX,
            y: confettiY,
            color: colorItem.color,
            active: true
          });
          
          // Reset confetti after animation
          setTimeout(() => {
            setConfetti(prev => ({ ...prev, active: false }));
          }, 1000);
        }
        
        // Increase speed every 50 points
        if (newScore % 50 === 0) {
          setGameSpeed(prevSpeed => Math.max(prevSpeed - 20, 50));
        }
        
        // Place new color item
        placeColorItem(newSnake);
      } else {
        // Snake moves (remove tail)
        newSnake = [newHead, ...prevSnake.slice(0, -1)];
      }
      
      return newSnake;
    });
  };
  
  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const gameInterval = setInterval(() => {
      moveSnake();
    }, gameSpeed);
    
    return () => clearInterval(gameInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- moveSnake captures game state, interval reset would break game loop
  }, [snake, direction, gameStarted, gameOver, gameSpeed, snakeColors]);
  
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) {
        setGameStarted(true);
      }
      
      if (gameOver) {
        resetGame();
        setGameStarted(true);
        return;
      }
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'down') {
            setDirection('up');
          }
          break;
        case 'ArrowDown':
          if (direction !== 'up') {
            setDirection('down');
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'right') {
            setDirection('left');
          }
          break;
        case 'ArrowRight':
          if (direction !== 'left') {
            setDirection('right');
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, direction, resetGame]);
  
  // Calculate cell size based on grid
  const cellSize = 100 / GRID_SIZE;
  
  return (
    <Box
      ref={gameAreaRef}
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        border: '2px solid #ccc',
        padding: 2,
        fontFamily: fontFamily // Apply consistent font family
      }}
      onClick={() => !gameStarted && setGameStarted(true)}
    >
      {/* Grid background - drawing paper texture */}
      <Box sx={{ 
        position: 'absolute',
        top: 16,
        left: 16,
        width: 'calc(100% - 32px)',
        height: 'calc(100% - 32px)',
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        opacity: 0.2,
        backgroundImage: 'linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)',
        backgroundSize: `${100/GRID_SIZE}% ${100/GRID_SIZE}%`
      }} />
      
      {/* Snake - Crayon segments */}
      {snake.map((segment, index) => (
        <Box
          key={`snake-${index}`}
          sx={{
            position: 'absolute',
            top: `${segment.y * cellSize}%`,
            left: `${segment.x * cellSize}%`,
            width: `${cellSize}%`,
            height: `${cellSize}%`,
            backgroundColor: snakeColors[index] || themeColor,
            borderRadius: index === 0 ? 
              // Change head shape based on direction
              (direction === 'up' || direction === 'down') ? 
                '20% 20% 20% 20% / 40% 40% 20% 20%' : // Vertical head shape
                '40% 40% 20% 20% / 20% 20% 20% 20%'   // Horizontal head shape
              : '10px', // Body segments remain the same
            zIndex: 10,
            transform: index === 0 ? 
              // Adjust rotation based on direction
              direction === 'up' ? 'rotate(0deg)' :
              direction === 'right' ? 'rotate(90deg)' :
              direction === 'down' ? 'rotate(180deg)' :
              'rotate(270deg)' : 'none',
            transition: 'transform 0.1s ease, border-radius 0.1s ease',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70%',
              height: '70%',
              backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
              backgroundSize: '4px 4px',
              borderRadius: 'inherit'
            },
            // Add eyes to the head
            ...(index === 0 ? {
              '&::after': {
                content: '""',
                position: 'absolute',
                top: direction === 'down' ? '60%' : 
                     direction === 'up' ? '20%' : 
                     direction === 'left' ? '40%' : '40%',
                left: direction === 'right' ? '60%' : 
                      direction === 'left' ? '20%' : 
                      direction === 'up' ? '40%' : '40%',
                width: '30%',
                height: '30%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
                boxShadow: '0px 0px 2px rgba(0,0,0,0.5)',
                zIndex: 11
              }
            } : {})
          }}
        />
      ))}
      
      {/* Color item to collect - Crayon style */}
      <Box
        sx={{
          position: 'absolute',
          top: `${colorItem.y * cellSize}%`,
          left: `${colorItem.x * cellSize}%`,
          width: `${cellSize}%`,
          height: `${cellSize}%`,
          backgroundColor: colorItem.color,
          borderRadius: '10px',
          zIndex: 5,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '70%',
            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
            backgroundSize: '4px 4px',
            borderRadius: 'inherit'
          }
        }}
      />
      
      {/* Confetti effect when collecting color */}
      {confetti.active && (
        <Confetti x={confetti.x} y={confetti.y} color={confetti.color} />
      )}
      
      {/* Game start overlay */}
      {!gameStarted && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: fontFamily, // Apply consistent font family
            zIndex: 20
          }}
        >
          <PaletteIcon sx={{ fontSize: 40, mb: 2, color: themeColor }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '24px', mb: 1, fontFamily: fontFamily, fontWeight: 'bold' }}>
              Crayon Snake
            </Typography>
            <Typography sx={{ fontSize: '16px', fontFamily: fontFamily }}>
              Click or Press Any Arrow Key to Start
            </Typography>
          </Box>
        </Box>
      )}
      
      {/* Game over overlay */}
      {gameOver && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: fontFamily, // Apply consistent font family
            zIndex: 20
          }}
        >
          <BrushIcon sx={{ fontSize: 40, mb: 2, color: themeColor }} />
          <Typography sx={{ fontSize: '28px', fontWeight: 'bold', mb: 2, fontFamily: fontFamily }}>
            Game Over!
          </Typography>
          <Typography sx={{ fontSize: '20px', mb: 3, fontFamily: fontFamily }}>
            Colors Collected: {score / 10}
          </Typography>
          <Typography sx={{ fontSize: '16px', fontFamily: fontFamily }}>
            Press any arrow key to restart
          </Typography>
        </Box>
      )}
    </Box>
  );
});

export { SnakeGame, type SnakeGameProps }; 