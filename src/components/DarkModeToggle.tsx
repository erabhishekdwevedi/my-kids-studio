import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useApp();

  return (
    <Tooltip 
      title={isDarkMode ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
      placement="left"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1300,
        }}
      >
        <Fab
          color="primary"
          size="large"
          onClick={toggleDarkMode}
          sx={{
            width: 64,
            height: 64,
            minHeight: 64,
            background: isDarkMode 
              ? 'linear-gradient(45deg, #ff4081 30%, #ff79b0 90%)'
              : 'linear-gradient(45deg, #ff6b9d 30%, #ff8fb3 90%)',
            boxShadow: isDarkMode
              ? '0 8px 24px rgba(255, 64, 129, 0.4)'
              : '0 8px 24px rgba(255, 107, 157, 0.4)',
            '&:hover': {
              background: isDarkMode 
                ? 'linear-gradient(45deg, #e91e63 30%, #ff4081 90%)'
                : 'linear-gradient(45deg, #e55a8a 30%, #ff6b9d 90%)',
              boxShadow: isDarkMode
                ? '0 12px 32px rgba(255, 64, 129, 0.6)'
                : '0 12px 32px rgba(255, 107, 157, 0.6)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '3px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <motion.div
            initial={{ rotate: 0, scale: 1 }}
            animate={{ 
              rotate: isDarkMode ? 180 : 0,
              scale: isDarkMode ? 1.1 : 1
            }}
            transition={{ 
              duration: 0.6, 
              ease: "easeInOut",
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            {isDarkMode ? 
              <LightMode sx={{ fontSize: 32, color: '#fff', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} /> : 
              <DarkMode sx={{ fontSize: 32, color: '#fff', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            }
          </motion.div>
        </Fab>
      </motion.div>
    </Tooltip>
  );
};

export default DarkModeToggle;
