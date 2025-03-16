import React from 'react';
import { motion } from 'framer-motion';
import PetsIcon from '@mui/icons-material/Pets';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

interface JungleAnimalProps {
  type: 'tiger' | 'zebra' | 'giraffe';
  position: { top: string; left: string };
  delay: number;
}

/**
 * Decorative component for jungle animals
 * Used in jungle theme pages for visual enhancement
 */
const JungleAnimal: React.FC<JungleAnimalProps> = ({ type, position, delay }) => {
  const getAnimalIcon = () => {
    switch(type) {
      case 'tiger':
        return <PetsIcon sx={{ fontSize: 60, color: '#ef6c00' }} />;
      case 'zebra':
        return <CrisisAlertIcon sx={{ fontSize: 60, color: '#424242' }} />;
      case 'giraffe':
        return <EmojiNatureIcon sx={{ fontSize: 60, color: '#ffa000' }} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 0,
        opacity: 0.6
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
      }}
      whileHover={{ scale: 1.2, opacity: 0.9 }}
    >
      {getAnimalIcon()}
    </motion.div>
  );
};

export default JungleAnimal; 