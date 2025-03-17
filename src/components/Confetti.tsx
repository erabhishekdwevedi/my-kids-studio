import React, { useEffect, useState } from 'react';
// @ts-ignore
import ReactConfetti from 'react-confetti';
import { motion } from 'framer-motion';

interface ConfettiProps {
  active: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (active) {
      setIsActive(true);
      // Automatically hide confetti after 4 seconds
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isActive) return null;

  return (
    <>
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={300}
        recycle={false}
        tweenDuration={4000}
        gravity={0.25}
        initialVelocityY={20}
        colors={['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#98FB98', '#DDA0DD']}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1001,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ 
            duration: 0.5,
            repeat: 3,
          }}
          style={{
            fontSize: '8rem',
            color: '#FFD700',
            textShadow: '0 0 20px rgba(255,215,0,0.5)',
          }}
        >
          🌟
        </motion.div>
      </motion.div>
    </>
  );
};

export default Confetti; 