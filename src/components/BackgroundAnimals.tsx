import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

// SVG Animal Components
const AnimalSVGs = {
  elephant: (
    <path d="M60,40 C60,20 75,5 95,5 C115,5 130,20 130,40 C130,45 128,50 125,54 L140,80 L120,85 L110,65 C105,67 100,68 95,68 C90,68 85,67 80,65 L70,85 L50,80 L65,54 C62,50 60,45 60,40z" />
  ),
  giraffe: (
    <path d="M80,90 L75,40 L85,30 L95,40 L90,90 M80,35 L90,35 M75,50 C75,45 78,40 82,40 M88,40 C92,40 95,45 95,50" />
  ),
  monkey: (
    <path d="M70,30 C70,15 80,5 95,5 C110,5 120,15 120,30 C120,45 110,55 95,55 C80,55 70,45 70,30z M85,25 C85,22 87,20 90,20 C93,20 95,22 95,25 C95,28 93,30 90,30 C87,30 85,28 85,25z M95,25 C95,22 97,20 100,20 C103,20 105,22 105,25 C105,28 103,30 100,30 C97,30 95,28 95,25z M90,35 L100,35" />
  ),
  penguin: (
    <path d="M85,10 C85,5 90,0 95,0 C100,0 105,5 105,10 L105,80 C105,90 100,95 95,95 C90,95 85,90 85,80z M87,20 L103,20 M90,40 L100,40" />
  )
};

interface AnimalProps {
  type: keyof typeof AnimalSVGs;
  color: string;
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
}

const Animal: React.FC<AnimalProps> = ({ type, color, x, y, scale = 1, rotate = 0 }) => (
  <motion.svg
    width={50 * scale}
    height={50 * scale}
    viewBox="0 0 150 150"
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      transform: `rotate(${rotate}deg)`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 0.2,
      scale: scale,
      y: [0, -10, 0],
      rotate: [rotate - 5, rotate + 5, rotate - 5]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    }}
  >
    <g fill={color}>
      {AnimalSVGs[type]}
    </g>
  </motion.svg>
);

const BackgroundAnimals: React.FC<{ theme: any }> = ({ theme }) => {
  const animals: AnimalProps[] = [
    { type: 'elephant', color: theme.textColor || '#1565c0', x: 10, y: 20, scale: 1.2 },
    { type: 'giraffe', color: theme.textColor || '#2e7d32', x: 80, y: 30, scale: 1.5, rotate: -15 },
    { type: 'monkey', color: theme.textColor || '#c2185b', x: 20, y: 60, scale: 1 },
    { type: 'penguin', color: theme.textColor || '#0097a7', x: 70, y: 70, scale: 1.3, rotate: 10 },
    { type: 'elephant', color: theme.textColor || '#7b1fa2', x: 85, y: 15, scale: 0.8, rotate: -20 },
    { type: 'monkey', color: theme.textColor || '#ff8f00', x: 15, y: 85, scale: 0.9, rotate: 15 }
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {animals.map((animal, index) => (
        <Animal key={index} {...animal} />
      ))}
    </Box>
  );
};

export default BackgroundAnimals; 