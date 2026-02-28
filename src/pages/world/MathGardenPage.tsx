// Math Garden V2 - Modern Apple-Quality Design
// Glassmorphism, particle effects, premium animations

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Container, alpha } from '@mui/material';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useWorld } from '../../contexts/WorldContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Modern math activities with vibrant gradients
const MATH_ACTIVITIES = [
  {
    id: 'counting',
    title: 'Counting Garden',
    emoji: '🌻',
    description: 'Count the flowers',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accentColor: '#667eea',
    minAge: 3,
    maxAge: 6
  },
  {
    id: 'addition',
    title: 'Addition Plants',
    emoji: '🌺',
    description: 'Plant numbers together',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accentColor: '#f093fb',
    minAge: 5,
    maxAge: 8
  },
  {
    id: 'subtraction',
    title: 'Pruning Garden',
    emoji: '🌹',
    description: 'Take petals away',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    accentColor: '#fa709a',
    minAge: 5,
    maxAge: 8
  },
  {
    id: 'shapes',
    title: 'Shape Paths',
    emoji: '🔷',
    description: 'Walk the shape trail',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    accentColor: '#4facfe',
    minAge: 3,
    maxAge: 7
  },
  {
    id: 'patterns',
    title: 'Pattern Garden',
    emoji: '🌼',
    description: 'Complete the patterns',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    accentColor: '#43e97b',
    minAge: 4,
    maxAge: 8
  },
  {
    id: 'multiplication',
    title: 'Garden Rows',
    emoji: '🌷',
    description: 'Plant in rows',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    accentColor: '#30cfd0',
    minAge: 7,
    maxAge: 10
  }
];


// Modern Activity Card with Glassmorphism
interface ActivityCardProps {
  activity: typeof MATH_ACTIVITIES[0];
  index: number;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }
    });
  }, [controls, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      whileHover={{
        scale: 1.05,
        y: -15,
        transition: { duration: 0.3, type: 'spring', stiffness: 300 }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {/* Glow effect on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 0.9
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: -20,
          background: activity.gradient,
          borderRadius: 32,
          filter: 'blur(30px)',
          opacity: 0.6,
          zIndex: 0
        }}
      />

      {/* Main card */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          background: isHovered
            ? alpha('#ffffff', 0.25)
            : alpha('#ffffff', 0.15),
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: `2px solid ${alpha('#ffffff', 0.3)}`,
          borderRadius: 4,
          p: 4,
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          boxShadow: isHovered
            ? `0 30px 60px ${alpha(activity.accentColor, 0.4)}`
            : `0 20px 40px ${alpha('#000', 0.15)}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: activity.gradient,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }
        }}
      >
        {/* Emoji with animation */}
        <motion.div
          animate={isHovered ? {
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <Typography
            sx={{
              fontSize: '4rem',
              lineHeight: 1,
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
              userSelect: 'none'
            }}
          >
            {activity.emoji}
          </Typography>
        </motion.div>

        {/* Activity name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          {activity.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: alpha('#ffffff', 0.85),
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: 500,
            letterSpacing: '0.02em'
          }}
        >
          {activity.description}
        </Typography>

        {/* Shimmer effect */}
        <motion.div
          animate={{
            x: isHovered ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '50%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            pointerEvents: 'none'
          }}
        />
      </Box>
    </motion.div>
  );
};

// Modern Counting Activity
const CountingActivity: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [targetNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [selectedCount, setSelectedCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFlowerClick = (count: number) => {
    setSelectedCount(count);
    if (count === targetNumber) {
      setShowSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: 'white',
          fontWeight: 700,
          textShadow: '0 4px 12px rgba(0,0,0,0.3)',
          letterSpacing: '-0.02em'
        }}
      >
        How many flowers are there?
      </Typography>

      {/* Display flowers to count */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        {[...Array(targetNumber)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 200 }}
          >
            <Typography sx={{
              fontSize: '3rem',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))'
            }}>
              🌻
            </Typography>
          </motion.div>
        ))}
      </Box>

      {/* Modern number buttons */}
      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 400, mx: 'auto' }}>
        {[...Array(10)].map((_, i) => {
          const isSelected = selectedCount === i + 1;
          return (
            <Grid item xs={4} key={i}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleFlowerClick(i + 1)}
                  sx={{
                    fontSize: '1.5rem',
                    py: 2,
                    fontWeight: 700,
                    background: isSelected
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : alpha('#ffffff', 0.2),
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${alpha('#ffffff', 0.3)}`,
                    color: 'white',
                    boxShadow: isSelected
                      ? `0 15px 30px ${alpha('#667eea', 0.4)}`
                      : `0 8px 16px ${alpha('#000', 0.1)}`,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  {i + 1}
                </Button>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      {/* Success message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Typography
              variant="h3"
              sx={{
                mt: 4,
                color: 'white',
                fontWeight: 800,
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))'
              }}
            >
              🎉 Perfect! You found {targetNumber} flowers!
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

// Modern Addition Activity
const AdditionActivity: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [num1] = useState(Math.floor(Math.random() * 5) + 1);
  const [num2] = useState(Math.floor(Math.random() * 5) + 1);
  const [answer, setAnswer] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const correctAnswer = num1 + num2;

  const handleAnswer = (selectedAnswer: number) => {
    setAnswer(selectedAnswer);
    if (selectedAnswer === correctAnswer) {
      setShowSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: 'white',
          fontWeight: 700,
          textShadow: '0 4px 12px rgba(0,0,0,0.3)',
          letterSpacing: '-0.02em'
        }}
      >
        Plant these numbers together!
      </Typography>

      {/* Visual representation */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, mb: 4, flexWrap: 'wrap' }}>
        {/* First group */}
        <Box>
          {[...Array(num1)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
            >
              <Typography sx={{
                fontSize: '2.5rem',
                display: 'inline-block',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))'
              }}>
                🌱
              </Typography>
            </motion.span>
          ))}
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 700,
              textShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            {num1}
          </Typography>
        </Box>

        <Typography variant="h2" sx={{ color: 'white', fontWeight: 700 }}>+</Typography>

        {/* Second group */}
        <Box>
          {[...Array(num2)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: (num1 + i) * 0.1, type: 'spring' }}
            >
              <Typography sx={{
                fontSize: '2.5rem',
                display: 'inline-block',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))'
              }}>
                🌱
              </Typography>
            </motion.span>
          ))}
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 700,
              textShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            {num2}
          </Typography>
        </Box>

        <Typography variant="h2" sx={{ color: 'white', fontWeight: 700 }}>=</Typography>
        <Typography variant="h2" sx={{ color: 'white', fontWeight: 700 }}>?</Typography>
      </Box>

      {/* Modern answer options */}
      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 400, mx: 'auto' }}>
        {[correctAnswer - 1, correctAnswer, correctAnswer + 1, correctAnswer + 2]
          .filter(opt => opt > 0)
          .sort(() => Math.random() - 0.5)
          .map((option, i) => {
            const isCorrect = option === correctAnswer;
            const isSelected = answer === option;
            return (
              <Grid item xs={6} key={i}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAnswer(option)}
                    disabled={answer !== null}
                    sx={{
                      fontSize: '2rem',
                      py: 3,
                      fontWeight: 700,
                      background: isSelected
                        ? (isCorrect
                          ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                          : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)')
                        : alpha('#ffffff', 0.2),
                      backdropFilter: 'blur(10px)',
                      border: `2px solid ${alpha('#ffffff', 0.3)}`,
                      color: 'white',
                      boxShadow: isSelected
                        ? `0 15px 30px ${alpha(isCorrect ? '#43e97b' : '#fa709a', 0.4)}`
                        : `0 8px 16px ${alpha('#000', 0.1)}`,
                      '&:hover:not(:disabled)': {
                        background: alpha('#ffffff', 0.3),
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    {option}
                  </Button>
                </motion.div>
              </Grid>
            );
          })}
      </Grid>

      {/* Success animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  mb: 2,
                  fontWeight: 800,
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
              >
                🌺 Amazing! A beautiful flower grew!
              </Typography>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <Typography sx={{
                  fontSize: '5rem',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
                }}>
                  🌺
                </Typography>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

// Modern Shape Activity
const ShapeActivity: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const shapes = [
    { name: 'Circle', emoji: '🔵', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#667eea' },
    { name: 'Square', emoji: '🟦', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: '#4facfe' },
    { name: 'Triangle', emoji: '🔺', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: '#fa709a' },
    { name: 'Star', emoji: '⭐', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#f093fb' }
  ];
  const [currentShape] = useState(shapes[Math.floor(Math.random() * shapes.length)]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleShapeClick = (shape: typeof shapes[0]) => {
    if (shape.name === currentShape.name) {
      setShowSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: 'white',
          fontWeight: 700,
          textShadow: '0 4px 12px rgba(0,0,0,0.3)',
          letterSpacing: '-0.02em'
        }}
      >
        Find the {currentShape.name}!
      </Typography>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <Typography sx={{
          fontSize: '6rem',
          mb: 4,
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
        }}>
          {currentShape.emoji}
        </Typography>
      </motion.div>

      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 500, mx: 'auto' }}>
        {shapes.sort(() => Math.random() - 0.5).map((shape, i) => (
          <Grid item xs={6} key={i}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleShapeClick(shape)}
                sx={{
                  py: 4,
                  background: alpha('#ffffff', 0.2),
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${alpha('#ffffff', 0.3)}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  boxShadow: `0 15px 30px ${alpha(shape.color, 0.3)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: alpha('#ffffff', 0.3),
                    boxShadow: `0 20px 40px ${alpha(shape.color, 0.5)}`
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: shape.gradient
                  }
                }}
              >
                <Typography sx={{
                  fontSize: '3rem',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))'
                }}>
                  {shape.emoji}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  {shape.name}
                </Typography>
              </Button>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Typography
              variant="h3"
              sx={{
                mt: 4,
                color: 'white',
                fontWeight: 800,
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))'
              }}
            >
              🌟 Perfect! You found the {currentShape.name}!
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

// Main Math Garden Page - Modern Apple Design
const MathGardenPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateCollection, addAchievement, currentProfile, navigateToZone } = useWorld();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    navigateToZone('math-garden');
  }, [navigateToZone]);

  const handleActivityComplete = () => {
    updateCollection('seeds', 1);
    setCompletedCount(prev => prev + 1);

    setTimeout(() => {
      setSelectedActivity(null);
    }, 2500);

    if (completedCount + 1 === 5) {
      addAchievement({
        type: 'mastery',
        title: 'Math Gardener',
        description: 'Completed 5 math activities',
        emoji: '🌱',
        zoneId: 'math-garden'
      });
    }
  };

  const handleBackToHome = () => {
    navigateToZone('home-tree');
    navigate('/world/home-tree');
  };

  const selectedActivityData = MATH_ACTIVITIES.find(a => a.id === selectedActivity);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #43e97b 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated gradient mesh background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 50%, ${alpha('#667eea', 0.3)} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${alpha('#43e97b', 0.3)} 0%, transparent 50%),
            radial-gradient(circle at 40% 10%, ${alpha('#764ba2', 0.2)} 0%, transparent 50%)
          `,
          opacity: 0.8
        }}
      />


      {/* Modern glassmorphic header */}
      <Box sx={{ position: 'relative', zIndex: 1, pt: 3, px: 2 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToHome}
            sx={{
              color: 'white',
              background: alpha('#ffffff', 0.2),
              backdropFilter: 'blur(10px)',
              border: `2px solid ${alpha('#ffffff', 0.3)}`,
              fontWeight: 600,
              px: 3,
              py: 1,
              boxShadow: `0 8px 16px ${alpha('#000', 0.1)}`,
              '&:hover': {
                background: alpha('#ffffff', 0.3),
                transform: 'translateY(-2px)',
                boxShadow: `0 12px 24px ${alpha('#000', 0.15)}`
              }
            }}
          >
            Home Tree
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 800,
                textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                letterSpacing: '-0.03em',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }
              }}
            >
              🔢 Math Garden
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mt: 2,
                px: 3,
                py: 1.5,
                background: alpha('#ffffff', 0.2),
                backdropFilter: 'blur(10px)',
                border: `2px solid ${alpha('#ffffff', 0.3)}`,
                borderRadius: 3,
                boxShadow: `0 10px 20px ${alpha('#000', 0.15)}`
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 700
                }}
              >
                Seeds: {currentProfile?.collection.seeds || 0}
              </Typography>
              <Typography sx={{ fontSize: '1.5rem' }}>🌱</Typography>
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {!selectedActivity ? (
            <motion.div
              key="activities"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={3}>
                {MATH_ACTIVITIES.map((activity, index) => (
                  <Grid item xs={12} sm={6} md={4} key={activity.id}>
                    <ActivityCard
                      activity={activity}
                      index={index}
                      onClick={() => setSelectedActivity(activity.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          ) : (
            <motion.div
              key="activity"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  background: selectedActivityData
                    ? alpha('#ffffff', 0.15)
                    : alpha('#ffffff', 0.15),
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: `2px solid ${alpha('#ffffff', 0.3)}`,
                  borderRadius: 4,
                  p: 4,
                  boxShadow: `0 30px 60px ${alpha('#000', 0.2)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': selectedActivityData ? {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: selectedActivityData.gradient
                  } : {}
                }}
              >
                {selectedActivity === 'counting' && <CountingActivity onComplete={handleActivityComplete} />}
                {selectedActivity === 'addition' && <AdditionActivity onComplete={handleActivityComplete} />}
                {selectedActivity === 'shapes' && <ShapeActivity onComplete={handleActivityComplete} />}
                {/* Other activities would follow same pattern */}

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setSelectedActivity(null)}
                      sx={{
                        background: alpha('#ffffff', 0.2),
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${alpha('#ffffff', 0.3)}`,
                        color: 'white',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        boxShadow: `0 8px 16px ${alpha('#000', 0.1)}`,
                        '&:hover': {
                          background: alpha('#ffffff', 0.3),
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      Choose Different Activity
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default MathGardenPage;
