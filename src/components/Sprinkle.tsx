import React from 'react';
import { motion } from 'framer-motion';

interface SprinkleProps {
  color: string;
  top: string;
  left: string;
  delay: number;
  size?: number;
}

/**
 * Decorative component for sprinkle effects
 * Used across the app for visual enhancement
 */
const Sprinkle: React.FC<SprinkleProps> = ({ color, top, left, delay, size = 8 }) => (
  <motion.div
    style={{
      position: 'absolute',
      top,
      left,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      backgroundColor: color,
      zIndex: 0
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.5, 
      delay, 
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: Math.random() * 2
    }}
  />
);

export default Sprinkle; 