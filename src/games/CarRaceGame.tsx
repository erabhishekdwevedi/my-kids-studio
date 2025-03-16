import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SpeedIcon from '@mui/icons-material/Speed';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface CarRaceGameProps {
  onScoreChange: (newScore: number) => void;
  themeColor: string;
}

interface Position {
  x: number;
  y: number;
}

interface Obstacle {
  id: number;
  position: Position;
  type: 'car' | 'truck' | 'traffic';
  lane: number;
  speed: number;
  color: string;
}

// Define the imperative handle type
interface CarRaceGameHandle {
  movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

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

// Car colors
const CAR_COLORS = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50'];

// SVG Car component
const CarSVG = ({ color, size = 40, rotation = 0 }: { color: string, size?: number, rotation?: number }) => (
  <svg 
    width={size} 
    height={size * 0.6} 
    viewBox="0 0 100 60" 
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {/* Car body */}
    <rect x="10" y="20" width="80" height="25" rx="5" fill={color} />
    <rect x="20" y="10" width="60" height="15" rx="5" fill={color} />
    
    {/* Windows */}
    <rect x="25" y="12" width="50" height="10" rx="2" fill="#111" />
    
    {/* Lights */}
    <rect x="85" y="25" width="5" height="5" rx="1" fill="#ffeb3b" />
    <rect x="85" y="35" width="5" height="5" rx="1" fill="#ffeb3b" />
    <rect x="10" y="25" width="5" height="5" rx="1" fill="#f44336" />
    <rect x="10" y="35" width="5" height="5" rx="1" fill="#f44336" />
    
    {/* Wheels */}
    <circle cx="25" cy="45" r="8" fill="#111" />
    <circle cx="75" cy="45" r="8" fill="#111" />
    <circle cx="25" cy="45" r="3" fill="#555" />
    <circle cx="75" cy="45" r="3" fill="#555" />
    
    {/* Racing stripes */}
    <rect x="30" y="10" width="5" height="35" fill="white" />
    <rect x="65" y="10" width="5" height="35" fill="white" />
  </svg>
);

// Truck SVG component
const TruckSVG = ({ color, size = 50, rotation = 0 }: { color: string, size?: number, rotation?: number }) => (
  <svg 
    width={size} 
    height={size * 0.6} 
    viewBox="0 0 120 70" 
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {/* Truck cab */}
    <rect x="10" y="30" width="40" height="25" rx="5" fill={color} />
    <rect x="15" y="15" width="30" height="15" rx="3" fill={color} />
    
    {/* Truck cargo */}
    <rect x="50" y="20" width="60" height="35" rx="2" fill="#ddd" />
    <rect x="50" y="20" width="60" height="5" fill="#bbb" />
    
    {/* Windows */}
    <rect x="20" y="17" width="20" height="10" rx="2" fill="#111" />
    
    {/* Lights */}
    <rect x="10" y="35" width="5" height="5" rx="1" fill="#f44336" />
    <rect x="45" y="35" width="5" height="5" rx="1" fill="#ffeb3b" />
    
    {/* Wheels */}
    <circle cx="25" cy="55" r="8" fill="#111" />
    <circle cx="60" cy="55" r="8" fill="#111" />
    <circle cx="90" cy="55" r="8" fill="#111" />
    <circle cx="25" cy="55" r="3" fill="#555" />
    <circle cx="60" cy="55" r="3" fill="#555" />
    <circle cx="90" cy="55" r="3" fill="#555" />
  </svg>
);

// Traffic cone SVG
const TrafficConeSVG = ({ size = 30 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 50 50"
  >
    <polygon points="25,5 35,45 15,45" fill="#ff9800" />
    <rect x="12" y="45" width="26" height="5" fill="#555" />
    <rect x="18" y="15" width="14" height="3" fill="white" />
    <rect x="18" y="25" width="14" height="3" fill="white" />
    <rect x="18" y="35" width="14" height="3" fill="white" />
  </svg>
);

// Tree SVG component
const TreeSVG = ({ size = 40, xOffset = 0 }: { size?: number, xOffset?: number }) => (
  <svg 
    width={size} 
    height={size * 1.2} 
    viewBox="0 0 100 120"
    style={{ transform: `translateX(${xOffset}px)` }}
  >
    {/* Tree trunk */}
    <rect x="45" y="70" width="10" height="40" fill="#8B4513" />
    
    {/* Tree foliage */}
    <polygon points="50,10 20,70 80,70" fill="#2E7D32" />
    <polygon points="50,30 25,80 75,80" fill="#388E3C" />
  </svg>
);

// Bush SVG component
const BushSVG = ({ size = 30, xOffset = 0 }: { size?: number, xOffset?: number }) => (
  <svg 
    width={size} 
    height={size * 0.6} 
    viewBox="0 0 100 60"
    style={{ transform: `translateX(${xOffset}px)` }}
  >
    <ellipse cx="50" cy="40" rx="40" ry="20" fill="#388E3C" />
    <ellipse cx="30" cy="30" rx="25" ry="15" fill="#2E7D32" />
    <ellipse cx="70" cy="30" rx="25" ry="15" fill="#2E7D32" />
    <ellipse cx="50" cy="20" rx="30" ry="20" fill="#388E3C" />
  </svg>
);

// Flower SVG component
const FlowerSVG = ({ size = 15, xOffset = 0 }: { size?: number, xOffset?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 50 50"
    style={{ transform: `translateX(${xOffset}px)` }}
  >
    <circle cx="25" cy="25" r="8" fill="#FFEB3B" />
    <circle cx="15" cy="15" r="7" fill="#E91E63" />
    <circle cx="35" cy="15" r="7" fill="#E91E63" />
    <circle cx="15" cy="35" r="7" fill="#E91E63" />
    <circle cx="35" cy="35" r="7" fill="#E91E63" />
  </svg>
);

const CarRaceGame = forwardRef<CarRaceGameHandle, CarRaceGameProps>(({ onScoreChange, themeColor }, ref) => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 50, y: 85 }); // Moved player down to 85%
  const [playerLane, setPlayerLane] = useState<number>(0); // Start in left lane (0-indexed)
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [carsAvoided, setCarsAvoided] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameSpeed, setGameSpeed] = useState<number>(50); // milliseconds between updates
  const [roadSpeed, setRoadSpeed] = useState<number>(5); // Initial road speed
  const [roadOffset, setRoadOffset] = useState<number>(0); // For road animation
  const [showDebug, setShowDebug] = useState<boolean>(false); // Debug mode off by default
  
  const obstacleTypes = ['car', 'truck', 'traffic'];
  
  // Road configuration - narrower road with 2 lanes
  const roadLeft = 25; // Road starts at 25% from left
  const roadWidth = 50; // Road width is 50% of screen
  
  // Adjusted lane positions for 2 lanes
  const lanes = [
    roadLeft + roadWidth * 0.25, // Left lane (about 37.5%)
    roadLeft + roadWidth * 0.75  // Right lane (about 62.5%)
  ];
  
  // Reset game function
  const resetGame = () => {
    setGameOver(false);
    setScore(0);
    setCarsAvoided(0);
    setObstacles([]);
    setPlayerLane(0); // Start in left lane
    setPlayerPosition({ x: lanes[0], y: 85 }); // Reset to 85% down
    setGameSpeed(50);
    setRoadSpeed(5);
    onScoreChange(0);
  };
  
  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => {
      if (!gameStarted) {
        setGameStarted(true);
      }
      
      if (gameOver) {
        resetGame();
        return;
      }
      
      // Only allow left and right movement
      switch (direction) {
        case 'left':
          if (playerLane > 0) {
            setPlayerLane(prev => prev - 1);
          }
          break;
        case 'right':
          if (playerLane < lanes.length - 1) {
            setPlayerLane(prev => prev + 1);
          }
          break;
        default:
          break;
      }
    }
  }));
  
  // Update player position based on lane
  useEffect(() => {
    setPlayerPosition(prev => ({
      ...prev,
      x: lanes[playerLane]
    }));
  }, [playerLane, lanes]);
  
  // Game loop - handles road animation and obstacle movement
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const gameInterval = setInterval(() => {
      // Animate road
      setRoadOffset(prev => (prev + roadSpeed) % 40); // 40px is the height of the road marking
      
      // Move obstacles and count passed cars
      setObstacles(prevObstacles => {
        let newCarsAvoided = 0;
        
        const updatedObstacles = prevObstacles.map(obstacle => {
          // Check if obstacle has just passed the player
          if (obstacle.position.y < playerPosition.y && 
              obstacle.position.y + obstacle.speed >= playerPosition.y) {
            newCarsAvoided++;
          }
          
          return {
            ...obstacle,
            position: {
              ...obstacle.position,
              y: obstacle.position.y + obstacle.speed
            }
          };
        }).filter(obstacle => obstacle.position.y < 110);
        
        // Update score for avoided cars
        if (newCarsAvoided > 0) {
          setCarsAvoided(prev => prev + newCarsAvoided);
          setScore(prev => prev + (newCarsAvoided * 10)); // 10 points per car avoided
          onScoreChange(score + (newCarsAvoided * 10));
        }
        
        return updatedObstacles;
      });
      
      // Increase difficulty over time
      if (carsAvoided > 0 && carsAvoided % 5 === 0) {
        setRoadSpeed(prev => Math.min(prev + 0.5, 15)); // Cap at max speed
      }
    }, gameSpeed);
    
    return () => clearInterval(gameInterval);
  }, [gameStarted, gameOver, score, carsAvoided, gameSpeed, roadSpeed, playerPosition.y, onScoreChange]);
  
  // Spawn obstacles more frequently
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const obstacleInterval = setInterval(() => {
      // Higher base probability for spawning
      const spawnProbability = 0.5 + Math.min(carsAvoided / 50, 0.3);
      
      if (Math.random() < spawnProbability) {
        // Choose a random lane
        const lane = Math.floor(Math.random() * lanes.length);
        
        // Choose a random obstacle type with higher chance for cars
        const typeRandom = Math.random();
        let type: 'car' | 'truck' | 'traffic';
        if (typeRandom < 0.7) {
          type = 'car';
        } else if (typeRandom < 0.9) {
          type = 'truck';
        } else {
          type = 'traffic';
        }
        
        // Choose a random color for the vehicle
        const color = CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)];
        
        // Speed varies by obstacle type and increases with score
        const baseSpeed = roadSpeed * 0.8;
        const speedVariation = type === 'truck' ? 0.7 : type === 'traffic' ? 0.8 : 1;
        const speed = baseSpeed * speedVariation * (1 + Math.random() * 0.4);
        
        const newObstacle: Obstacle = {
          id: Date.now() + Math.random(),
          position: {
            x: lanes[lane],
            y: -10 // Start above the screen
          },
          type,
          lane,
          speed,
          color
        };
        
        setObstacles(prevObstacles => [...prevObstacles, newObstacle]);
      }
    }, 500 - Math.min(carsAvoided * 5, 300)); // Spawn rate increases with cars avoided
    
    return () => clearInterval(obstacleInterval);
  }, [gameStarted, gameOver, carsAvoided, roadSpeed, lanes]);
  
  // Collision detection
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const checkCollisions = () => {
      for (const obstacle of obstacles) {
        // Only check obstacles that are near the player's y position
        if (Math.abs(obstacle.position.y - playerPosition.y) < 20) {
          // Check if in the same lane
          if (obstacle.lane === playerLane) {
            setGameOver(true);
            break;
          }
        }
      }
    };
    
    const collisionInterval = setInterval(checkCollisions, 50);
    
    return () => clearInterval(collisionInterval);
  }, [obstacles, playerPosition, playerLane, gameStarted, gameOver]);
  
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) {
        setGameStarted(true);
      }
      
      if (gameOver) {
        resetGame();
        return;
      }
      
      switch (e.key) {
        case 'ArrowLeft':
          if (playerLane > 0) {
            setPlayerLane(prev => prev - 1);
          }
          break;
        case 'ArrowRight':
          if (playerLane < lanes.length - 1) {
            setPlayerLane(prev => prev + 1);
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, playerLane, lanes.length]);
  
  // Get obstacle component based on type
  const getObstacleComponent = (obstacle: Obstacle) => {
    switch (obstacle.type) {
      case 'car':
        return <CarSVG color={obstacle.color} size={60} rotation={180} />;
      case 'truck':
        return <TruckSVG color={obstacle.color} size={70} rotation={180} />;
      case 'traffic':
        return <TrafficConeSVG size={40} />;
      default:
        return null;
    }
  };
  
  // Generate road markings
  const roadMarkings = Array.from({ length: 15 }, (_, i) => (
    <Box 
      key={`marking-${i}`}
      sx={{ 
        position: 'absolute', 
        left: '50%', 
        top: `${(i * 40 + roadOffset) % 600}px`, 
        width: '4px', 
        height: '20px', 
        backgroundColor: 'white',
        transform: 'translateX(-50%)',
        zIndex: 1
      }} 
    />
  ));

  // Generate trees for left side
  const leftTrees = Array.from({ length: 8 }, (_, i) => (
    <Box
      key={`left-tree-${i}`}
      sx={{
        position: 'absolute',
        left: `${roadLeft - 20}px`,
        top: `${(i * 80 + roadOffset * 0.5) % 600}px`,
        zIndex: 2
      }}
    >
      <TreeSVG size={50} xOffset={Math.sin(i * 0.5) * 5} />
    </Box>
  ));

  // Generate trees for right side
  const rightTrees = Array.from({ length: 8 }, (_, i) => (
    <Box
      key={`right-tree-${i}`}
      sx={{
        position: 'absolute',
        right: `${100 - roadLeft - roadWidth - 20}px`,
        top: `${(i * 80 + roadOffset * 0.5 + 40) % 600}px`,
        zIndex: 2
      }}
    >
      <TreeSVG size={50} xOffset={Math.sin(i * 0.5) * -5} />
    </Box>
  ));

  // Generate bushes for left side
  const leftBushes = Array.from({ length: 12 }, (_, i) => (
    <Box
      key={`left-bush-${i}`}
      sx={{
        position: 'absolute',
        left: `${roadLeft - 10}px`,
        top: `${(i * 50 + roadOffset * 0.3) % 600}px`,
        zIndex: 1
      }}
    >
      <BushSVG size={25} xOffset={Math.sin(i * 0.8) * 3} />
    </Box>
  ));

  // Generate bushes for right side
  const rightBushes = Array.from({ length: 12 }, (_, i) => (
    <Box
      key={`right-bush-${i}`}
      sx={{
        position: 'absolute',
        right: `${100 - roadLeft - roadWidth - 10}px`,
        top: `${(i * 50 + roadOffset * 0.3 + 25) % 600}px`,
        zIndex: 1
      }}
    >
      <BushSVG size={25} xOffset={Math.sin(i * 0.8) * -3} />
    </Box>
  ));

  // Generate flowers
  const flowers = Array.from({ length: 20 }, (_, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    const position = side === 'left' ? 
      { left: `${roadLeft - 5 - Math.random() * 15}px` } : 
      { right: `${100 - roadLeft - roadWidth - 5 - Math.random() * 15}px` };
    
    return (
      <Box
        key={`flower-${i}`}
        sx={{
          position: 'absolute',
          ...position,
          top: `${(i * 30 + roadOffset * 0.2) % 600}px`,
          zIndex: 1
        }}
      >
        <FlowerSVG size={15} xOffset={Math.sin(i) * 2} />
      </Box>
    );
  });
  
  return (
    <Box
      ref={gameAreaRef}
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: '#4CAF50', // Green background for grass
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        border: '2px solid #388E3C',
        fontFamily: fontFamily
      }}
      onClick={() => {
        if (!gameStarted) {
          setGameStarted(true);
        } else {
          // Toggle debug mode on click when game is running
          setShowDebug(prev => !prev);
        }
      }}
    >
      {/* Grass texture */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(rgba(76, 175, 80, 0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(76, 175, 80, 0.7) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        zIndex: 0
      }} />

      {/* Road and lanes */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: `${roadLeft}%`, 
        width: `${roadWidth}%`, 
        height: '100%', 
        backgroundColor: '#333',
        zIndex: 0,
        boxShadow: '0 0 10px rgba(0,0,0,0.5)'
      }}>
        {/* Side borders */}
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          height: '100%', 
          width: '10px', 
          backgroundColor: '#f1c40f',
          zIndex: 1
        }} />
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          right: 0, 
          height: '100%', 
          width: '10px', 
          backgroundColor: '#f1c40f',
          zIndex: 1
        }} />
        
        {/* Lane divider - just one for 2 lanes */}
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: '50%', 
          height: '100%', 
          width: '2px', 
          backgroundColor: 'white',
          zIndex: 1,
          opacity: 0.5
        }} />
        
        {/* Center line markings */}
        {roadMarkings}
      </Box>

      {/* Greenery */}
      {leftTrees}
      {rightTrees}
      {leftBushes}
      {rightBushes}
      {flowers}
      
      {/* Player car - Fixed position at the bottom of the screen */}
      <Box
        sx={{
          position: 'absolute',
          left: `${playerPosition.x}%`,
          bottom: '10%',
          transform: 'translateX(-50%)',
          zIndex: 10
        }}
      >
        <CarSVG color={themeColor} size={70} />
      </Box>
      
      {/* Obstacles - Fixed positioning */}
      {obstacles.map(obstacle => (
        <Box
          key={obstacle.id}
          sx={{
            position: 'absolute',
            left: `${obstacle.position.x}%`,
            top: `${obstacle.position.y}%`,
            transform: 'translateX(-50%)',
            zIndex: 5
          }}
        >
          {getObstacleComponent(obstacle)}
        </Box>
      ))}
      
      {/* Debug lane markers - Always visible in debug mode */}
      {showDebug && lanes.map((lane, index) => (
        <Box
          key={`lane-marker-${index}`}
          sx={{
            position: 'absolute',
            left: `${lane}%`,
            top: '0',
            width: '2px',
            height: '100%',
            backgroundColor: 'red',
            zIndex: 20
          }}
        />
      ))}
      
      {/* Debug info */}
      {showDebug && (
        <Box
          sx={{
            position: 'absolute',
            top: 50,
            left: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px',
            borderRadius: 2,
            zIndex: 30,
            fontSize: '12px',
            maxWidth: '200px'
          }}
        >
          <Typography variant="body2" sx={{ fontFamily: fontFamily, mb: 1 }}>
            Debug Mode (click to toggle)
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: fontFamily, fontSize: '10px' }}>
            Player Lane: {playerLane}<br />
            Player X: {playerPosition.x.toFixed(1)}%<br />
            Lane Positions: [{lanes.map(l => l.toFixed(1)).join(', ')}]<br />
            Obstacles: {obstacles.length}<br />
            Cars Avoided: {carsAvoided}
          </Typography>
        </Box>
      )}
      
      {/* Score and cars avoided indicator */}
      {gameStarted && !gameOver && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: 2,
            zIndex: 15
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <SpeedIcon sx={{ mr: 1, fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontFamily: fontFamily }}>
              {Math.floor(roadSpeed * 20)} km/h
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontFamily: fontFamily }}>
            Score: {score} | Cars Avoided: {carsAvoided}
          </Typography>
        </Box>
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            zIndex: 20,
            fontFamily: fontFamily
          }}
        >
          <Box sx={{ mb: 2 }}>
            <CarSVG color={themeColor} size={80} />
          </Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', fontFamily: fontFamily }}>
            Crazy Racer
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, fontFamily: fontFamily }}>
            Use ← → arrows to avoid other cars
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: fontFamily }}>
            Score points for each car you avoid!
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: fontFamily }}>
            Click or press any arrow key to start
          </Typography>
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            zIndex: 100, // Higher z-index to ensure visibility
            fontFamily: fontFamily
          }}
        >
          <Typography variant="h4" sx={{ color: 'red', fontWeight: 'bold', mb: 2, fontFamily: fontFamily }}>
            CRASH!
          </Typography>
          <EmojiEventsIcon sx={{ fontSize: 60, mb: 2, color: '#FFD700' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontFamily: fontFamily }}>
            Game Over!
          </Typography>
          <Typography variant="h6" sx={{ mb: 1, fontFamily: fontFamily }}>
            Score: {score}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, fontFamily: fontFamily }}>
            Cars Avoided: {carsAvoided}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: fontFamily }}>
            Press any arrow key to restart
          </Typography>
        </Box>
      )}
    </Box>
  );
});

export { CarRaceGame, type CarRaceGameProps }; 