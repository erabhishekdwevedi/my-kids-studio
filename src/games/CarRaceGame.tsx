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

// Car colors - removed red from the list so only player car is red
const CAR_COLORS = ['#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffc107', '#ff9800'];

// SVG Car component - Updated to look more like a sedan
const CarSVG = ({ color, size = 40, rotation = 0 }: { color: string, size?: number, rotation?: number }) => (
  <svg 
    width={size * 0.6} 
    height={size} 
    viewBox="0 0 60 100" 
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {/* Car body - sedan style */}
    <rect x="10" y="55" width="40" height="35" rx="5" fill={color} /> {/* Main body */}
    <rect x="12" y="30" width="36" height="25" rx="8" fill={color} /> {/* Hood */}
    <rect x="15" y="15" width="30" height="20" rx="6" fill={color} /> {/* Roof */}
    
    {/* Windows */}
    <rect x="17" y="20" width="26" height="12" rx="2" fill="#111" /> {/* Rear window */}
    <rect x="16" y="35" width="28" height="15" rx="2" fill="#111" /> {/* Front window */}
    <rect x="13" y="37" width="5" height="10" rx="1" fill="#111" /> {/* Left window */}
    <rect x="42" y="37" width="5" height="10" rx="1" fill="#111" /> {/* Right window */}
    
    {/* Lights - front */}
    <rect x="12" y="85" width="10" height="5" rx="2" fill="#ffeb3b" />
    <rect x="38" y="85" width="10" height="5" rx="2" fill="#ffeb3b" />
    
    {/* Lights - back */}
    <rect x="12" y="15" width="10" height="5" rx="2" fill="#f44336" />
    <rect x="38" y="15" width="10" height="5" rx="2" fill="#f44336" />
    
    {/* Wheels */}
    <circle cx="15" cy="70" r="6" fill="#111" />
    <circle cx="15" cy="70" r="3" fill="#555" />
    <circle cx="45" cy="70" r="6" fill="#111" />
    <circle cx="45" cy="70" r="3" fill="#555" />
    <circle cx="15" cy="30" r="6" fill="#111" />
    <circle cx="15" cy="30" r="3" fill="#555" />
    <circle cx="45" cy="30" r="6" fill="#111" />
    <circle cx="45" cy="30" r="3" fill="#555" />
    
    {/* Details */}
    <rect x="20" y="60" width="20" height="2" fill="#ddd" /> {/* Grill */}
    <rect x="25" y="50" width="10" height="1" fill="#ddd" /> {/* Hood detail */}
  </svg>
);

// Truck SVG component - Updated to face upward
const TruckSVG = ({ color, size = 50, rotation = 0 }: { color: string, size?: number, rotation?: number }) => (
  <svg 
    width={size * 0.6} 
    height={size} 
    viewBox="0 0 70 120" 
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {/* Truck cab */}
    <rect x="15" y="70" width="40" height="40" rx="5" fill={color} />
    
    {/* Truck cargo */}
    <rect x="10" y="20" width="50" height="50" rx="2" fill="#ddd" />
    <rect x="10" y="65" width="50" height="5" fill="#bbb" />
    
    {/* Windows */}
    <rect x="20" y="75" width="30" height="15" rx="2" fill="#111" />
    
    {/* Lights - front */}
    <rect x="15" y="105" width="10" height="5" rx="1" fill="#ffeb3b" />
    <rect x="45" y="105" width="10" height="5" rx="1" fill="#ffeb3b" />
    
    {/* Lights - back */}
    <rect x="15" y="20" width="10" height="5" rx="1" fill="#f44336" />
    <rect x="45" y="20" width="10" height="5" rx="1" fill="#f44336" />
    
    {/* Wheels */}
    <circle cx="15" cy="35" r="5" fill="#111" />
    <circle cx="55" cy="35" r="5" fill="#111" />
    <circle cx="15" cy="95" r="5" fill="#111" />
    <circle cx="55" cy="95" r="5" fill="#111" />
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

// Add a new Blast SVG component for crash animation with more dynamic appearance
const BlastSVG = ({ size = 100 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100"
  >
    {/* Outer explosion */}
    <circle cx="50" cy="50" r="45" fill="#ff5722" />
    <circle cx="50" cy="50" r="35" fill="#ff9800" />
    <circle cx="50" cy="50" r="25" fill="#ffeb3b" />
    <circle cx="50" cy="50" r="15" fill="#fff" />
    
    {/* Explosion rays */}
    <polygon points="50,5 60,25 40,25" fill="#ff5722" />
    <polygon points="50,95 60,75 40,75" fill="#ff5722" />
    <polygon points="5,50 25,60 25,40" fill="#ff5722" />
    <polygon points="95,50 75,60 75,40" fill="#ff5722" />
    <polygon points="15,15 30,30 5,5" fill="#ff5722" />
    <polygon points="85,85 70,70 95,95" fill="#ff5722" />
    <polygon points="15,85 30,70 5,95" fill="#ff5722" />
    <polygon points="85,15 70,30 95,5" fill="#ff5722" />
    
    {/* Debris particles */}
    <circle cx="65" cy="35" r="3" fill="#555" />
    <circle cx="30" cy="60" r="2" fill="#555" />
    <circle cx="70" cy="65" r="4" fill="#555" />
    <circle cx="40" cy="30" r="3" fill="#555" />
    <circle cx="60" cy="75" r="2" fill="#555" />
    <circle cx="25" cy="45" r="3" fill="#555" />
  </svg>
);

const CarRaceGame = forwardRef<CarRaceGameHandle, CarRaceGameProps>(({ onScoreChange, themeColor }, ref) => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 50, y: 85 }); // Moved player down to 85%
  const [playerLane, setPlayerLane] = useState<number>(0); // Start in left lane (0-indexed)
  const [targetLane, setTargetLane] = useState<number>(0); // Target lane for smooth animation
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [carsAvoided, setCarsAvoided] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameSpeed, setGameSpeed] = useState<number>(50); // milliseconds between updates
  const [roadSpeed, setRoadSpeed] = useState<number>(3); // Reduced from 5 to 3 for slower initial speed
  const [roadOffset, setRoadOffset] = useState<number>(0); // For road animation
  const [showDebug, setShowDebug] = useState<boolean>(false); // Debug mode off by default
  const [crashPosition, setCrashPosition] = useState<Position | null>(null); // Track crash position for blast animation
  const [showBlast, setShowBlast] = useState<boolean>(false); // Control blast animation visibility
  
  const obstacleTypes = ['car', 'truck', 'traffic'];
  
  // Road configuration - road with 2 lanes
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
    setTargetLane(0); // Reset target lane
    setPlayerPosition({ x: lanes[0], y: 85 }); // Reset to 85% down in left lane
    setGameSpeed(50);
    setRoadSpeed(3); // Reduced from 5 to 3
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
      
      // Only allow left and right movement - direct lane switching
      switch (direction) {
        case 'left':
          if (playerLane > 0) {
            // Directly set player lane for immediate response
            setPlayerLane(0);
            setTargetLane(0);
          }
          break;
        case 'right':
          if (playerLane < lanes.length - 1) {
            // Directly set player lane for immediate response
            setPlayerLane(1);
            setTargetLane(1);
          }
          break;
        default:
          break;
      }
    }
  }));
  
  // Initialize targetLane
  useEffect(() => {
    setTargetLane(playerLane);
  }, [playerLane]);
  
  // Update player position based on lane - with smooth transition
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
      
      // Increase difficulty over time - more gradually
      if (carsAvoided > 0 && carsAvoided % 10 === 0) { // Changed from 5 to 10
        setRoadSpeed(prev => Math.min(prev + 0.3, 10)); // Reduced from 0.5 to 0.3, max from 15 to 10
      }
    }, gameSpeed);
    
    return () => clearInterval(gameInterval);
  }, [gameStarted, gameOver, score, carsAvoided, gameSpeed, roadSpeed, playerPosition.y, onScoreChange]);
  
  // Initialize the game with some obstacles
  useEffect(() => {
    if (gameStarted && obstacles.length === 0) {
      // Add initial obstacles
      const initialObstacles: Obstacle[] = [];
      
      // Add 2 cars at different positions
      for (let i = 0; i < 2; i++) {
        const lane = Math.floor(Math.random() * lanes.length);
        const color = CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)];
        const yPos = -10 - (i * 40); // Stagger the initial positions, increased spacing
        
        initialObstacles.push({
          id: Date.now() + Math.random() + i,
          position: {
            x: lanes[lane],
            y: yPos
          },
          type: 'car',
          lane,
          speed: roadSpeed * 0.6 * (1 + Math.random() * 0.2), // Reduced from 0.8 to 0.6
          color
        });
      }
      
      setObstacles(initialObstacles);
    }
  }, [gameStarted, obstacles.length, lanes, roadSpeed]);
  
  // Spawn obstacles more frequently
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const obstacleInterval = setInterval(() => {
      // Lower base probability for spawning
      const spawnProbability = 0.6 + Math.min(carsAvoided / 100, 0.2); // Reduced from 0.8 to 0.6
      
      if (Math.random() < spawnProbability) {
        // Choose a random lane
        const lane = Math.floor(Math.random() * lanes.length);
        
        // Choose a random obstacle type with higher chance for cars
        const typeRandom = Math.random();
        let type: 'car' | 'truck' | 'traffic';
        if (typeRandom < 0.85) {
          type = 'car';
        } else if (typeRandom < 0.95) {
          type = 'truck';
        } else {
          type = 'traffic';
        }
        
        // Choose a random color for the vehicle (not red)
        const color = CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)];
        
        // Speed varies by obstacle type and increases with score - reduced overall
        const baseSpeed = roadSpeed * 0.6; // Reduced from 0.8 to 0.6
        const speedVariation = type === 'truck' ? 0.6 : type === 'traffic' ? 0.7 : 0.8; // All reduced
        const speed = baseSpeed * speedVariation * (1 + Math.random() * 0.3); // Reduced from 0.4 to 0.3
        
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
    }, 500 - Math.min(carsAvoided * 3, 200)); // Increased from 350 to 500, reduced rate of increase
    
    return () => clearInterval(obstacleInterval);
  }, [gameStarted, gameOver, carsAvoided, roadSpeed, lanes]);
  
  // Collision detection with improved accuracy
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const checkCollisions = () => {
      for (const obstacle of obstacles) {
        // Calculate collision box sizes based on vehicle types
        const playerWidth = 30; // Width of player car in percentage of lane
        const obstacleWidth = obstacle.type === 'truck' ? 35 : obstacle.type === 'car' ? 30 : 20;
        
        // Calculate vertical distance
        const verticalDistance = Math.abs(obstacle.position.y - playerPosition.y);
        const verticalThreshold = 15; // Reduced from 20 to match sedan shape
        
        // Only check obstacles that are near the player's y position
        if (verticalDistance < verticalThreshold) {
          // Check if in the same lane
          if (obstacle.lane === playerLane) {
            // Set crash position for blast animation
            setCrashPosition({
              x: playerPosition.x,
              y: playerPosition.y - 5 // Adjust to center of car
            });
            setShowBlast(true);
            
            // Set game over after a short delay to show the blast
            setTimeout(() => {
              setGameOver(true);
            }, 600); // Increased from 500ms to 600ms for longer blast animation
            break;
          }
        }
      }
    };
    
    const collisionInterval = setInterval(checkCollisions, 50);
    
    return () => clearInterval(collisionInterval);
  }, [obstacles, playerPosition, playerLane, gameStarted, gameOver]);
  
  // Reset blast animation when game is reset
  useEffect(() => {
    if (!gameOver) {
      setCrashPosition(null);
      setShowBlast(false);
    }
  }, [gameOver]);
  
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
            // Direct lane switching
            setPlayerLane(0);
            setTargetLane(0);
          }
          break;
        case 'ArrowRight':
          if (playerLane < lanes.length - 1) {
            // Direct lane switching
            setPlayerLane(1);
            setTargetLane(1);
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
        return <CarSVG color={obstacle.color} size={65} rotation={0} />; // Increased size from 60 to 65
      case 'truck':
        return <TruckSVG color={obstacle.color} size={75} rotation={0} />; // Increased size from 70 to 75
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
        } else if (!gameOver && !showBlast) {
          // Toggle lane on click when game is running
          setPlayerLane(prev => prev === 0 ? 1 : 0);
        } else if (gameOver) {
          resetGame();
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
      
      {/* Player car - Fixed position at the bottom of the screen - Hide when showing blast */}
      {!showBlast && (
        <Box
          sx={{
            position: 'absolute',
            left: `${playerPosition.x}%`,
            bottom: '10%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            transition: 'left 0.15s ease-out' // Slightly faster transition
          }}
        >
          <CarSVG color="#f44336" size={70} rotation={0} /> {/* Always red for player */}
        </Box>
      )}
      
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
            <CarSVG color="#f44336" size={80} rotation={0} /> {/* Red car in start screen */}
          </Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', fontFamily: fontFamily }}>
            Crazy Racer
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, fontFamily: fontFamily }}>
            Use ← → arrows or tap screen to switch lanes
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: fontFamily }}>
            Avoid other cars to score points!
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: fontFamily }}>
            Click or press any arrow key to start
          </Typography>
        </Box>
      )}
      
      {/* Blast animation at crash position */}
      {showBlast && crashPosition && (
        <Box
          sx={{
            position: 'absolute',
            left: `${crashPosition.x}%`,
            top: `${crashPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
            animation: 'pulse 0.6s infinite alternate'
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1.3, rotate: 15 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
          >
            <BlastSVG size={120} />
          </motion.div>
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
            Press any arrow key or click to restart
          </Typography>
        </Box>
      )}
      
      {/* Add keyframes for pulse animation */}
      <Box
        sx={{
          '@keyframes pulse': {
            '0%': {
              opacity: 1,
              transform: 'scale(1) translate(-50%, -50%) rotate(0deg)'
            },
            '50%': {
              opacity: 0.9,
              transform: 'scale(1.1) translate(-45%, -45%) rotate(5deg)'
            },
            '100%': {
              opacity: 0.8,
              transform: 'scale(1.2) translate(-40%, -40%) rotate(-5deg)'
            }
          }
        }}
      />
    </Box>
  );
});

export { CarRaceGame, type CarRaceGameProps }; 