// Home Tree - The Magical Hub of Wonder Island
// Zero friction entry point where everything begins

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorld } from '../../contexts/WorldContext';
import { ZoneId } from '../../types/world';

// Zone navigation card component
interface ZoneCardProps {
  zoneId: ZoneId;
  emoji: string;
  name: string;
  description: string;
  gradient: string;
  position: { x: number; y: number };
  delay: number;
  onClick: () => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({
  emoji,
  name,
  description,
  gradient,
  delay,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{
        scale: 1.08,
        y: -10,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          background: gradient,
          borderRadius: 4,
          p: 3,
          minHeight: 180,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.2)'
            : '0 10px 30px rgba(0,0,0,0.15)',
          border: '4px solid white',
          transition: 'box-shadow 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Glowing pulse effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Emoji icon */}
        <motion.div
          animate={isHovered ? {
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <Typography
            sx={{
              fontSize: { xs: '3.5rem', sm: '4rem', md: '5rem' },
              lineHeight: 1,
              mb: 1,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
            }}
          >
            {emoji}
          </Typography>
        </motion.div>

        {/* Zone name */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            mb: 0.5,
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }
          }}
        >
          {name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255,255,255,0.95)',
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          {description}
        </Typography>

        {/* Hover sparkles */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                  style={{
                    position: 'absolute',
                    width: 8,
                    height: 8,
                    background: 'white',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

// Companion floating animation component
const CompanionAvatar: React.FC = () => {
  const { getCompanion } = useWorld();
  const companion = getCompanion();

  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, 0, -5, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        zIndex: 100,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '3rem', sm: '4rem' },
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        {companion.emoji}
      </Typography>
    </motion.div>
  );
};

// Main Home Tree Page
const HomeTreePage: React.FC = () => {
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const { zones, worldState, navigateToZone, currentProfile } = useWorld();

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Hide welcome message after 3 seconds
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleZoneClick = (zoneId: ZoneId, path: string) => {
    navigateToZone(zoneId);
    navigate(path);
  };

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 20) return 'Good Evening';
    return 'Good Night';
  };

  // Filter out home-tree and game-arcade (hidden) from main grid
  const visibleZones = zones.filter(z =>
    z.id !== 'home-tree' && (z.id !== 'game-arcade' || worldState.unlockedZones.includes('game-arcade'))
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFE4B3 0%, #FFD8A8 30%, #FFC371 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          opacity: 0.15,
          pointerEvents: 'none'
        }}
      >
        {/* Floating leaves */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: ['0vh', '100vh'],
              x: [0, Math.random() * 50 - 25],
              rotate: [0, 360]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `-10vh`
            }}
          >
            <Typography sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              🍃
            </Typography>
          </motion.div>
        ))}

        {/* Birds flying */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`bird-${i}`}
            animate={{
              x: ['-10vw', '110vw'],
              y: [
                `${20 + Math.random() * 30}vh`,
                `${15 + Math.random() * 30}vh`
              ]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              left: '-10vw',
              top: `${20 + Math.random() * 30}vh`
            }}
          >
            <Typography sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              🦅
            </Typography>
          </motion.div>
        ))}
      </Box>

      {/* Welcome message overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,228,179,0.95) 0%, rgba(255,216,168,0.95) 100%)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  fontWeight: 700,
                  color: '#8B7355',
                  textAlign: 'center',
                  textShadow: '3px 3px 6px rgba(0,0,0,0.1)'
                }}
              >
                ✨ Welcome to Wonder Island! ✨
              </Typography>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 }, flexGrow: 1, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: '#8B7355',
              mb: 1,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {getGreeting()}, {currentProfile?.name || 'Explorer'}! 🌟
          </Typography>

          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: '#A0826D',
              mb: { xs: 3, sm: 4 },
              fontSize: { xs: '1.2rem', sm: '1.4rem' }
            }}
          >
            Where would you like to explore today?
          </Typography>
        </motion.div>

        {/* Collection display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 2, sm: 3 },
              mb: { xs: 3, sm: 4 },
              flexWrap: 'wrap'
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>🌱</Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#8B7355', fontWeight: 600 }}>
                {currentProfile?.collection.seeds || 0}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>🎵</Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#8B7355', fontWeight: 600 }}>
                {currentProfile?.collection.notes || 0}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>🎨</Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#8B7355', fontWeight: 600 }}>
                {currentProfile?.collection.colors.length || 0}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>⭐</Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#8B7355', fontWeight: 600 }}>
                {currentProfile?.collection.stars || 0}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: '1.5rem' }}>🦋</Typography>
              <Typography sx={{ fontSize: '0.9rem', color: '#8B7355', fontWeight: 600 }}>
                {currentProfile?.collection.butterflies || 0}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Zone grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: { xs: 2, sm: 3, md: 4 }
          }}
        >
          {visibleZones.map((zone, index) => (
            <ZoneCard
              key={zone.id}
              zoneId={zone.id}
              emoji={zone.emoji}
              name={zone.name}
              description={zone.description}
              gradient={zone.gradient}
              position={zone.position}
              delay={0.7 + index * 0.1}
              onClick={() => handleZoneClick(zone.id, zone.path)}
            />
          ))}
        </Box>

        {/* Tree trunk at bottom (visual anchor) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              mt: { xs: 4, sm: 6 },
              fontSize: { xs: '4rem', sm: '6rem', md: '8rem' }
            }}
          >
            🌳
          </Box>
        </motion.div>
      </Container>

      {/* Companion */}
      <CompanionAvatar />
    </Box>
  );
};

export default HomeTreePage;
