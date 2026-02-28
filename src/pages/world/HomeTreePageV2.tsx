// Kids Studio Home - iPad-Style App Grid
// Simple home with all independent applications

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, alpha } from '@mui/material';
import { motion } from 'framer-motion';

// All Kids Applications - COMPLETELY FLAT - Every app at top level
const APPS = [
  // Math Apps (6 apps from MathPage)
  {
    id: 'counting',
    name: 'Counting',
    emoji: '🔢',
    gradient: 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
    path: '/math/counting',
    category: 'math'
  },
  {
    id: 'reverse-counting',
    name: 'Reverse',
    emoji: '🔃',
    gradient: 'linear-gradient(135deg, #c8e6c9 0%, #81c784 100%)',
    path: '/math/reverse-counting',
    category: 'math'
  },
  {
    id: 'tables',
    name: 'Tables',
    emoji: '✖️',
    gradient: 'linear-gradient(135deg, #ffecb3 0%, #ffd54f 100%)',
    path: '/math/tables',
    category: 'math'
  },
  {
    id: 'addition',
    name: 'Addition',
    emoji: '➕',
    gradient: 'linear-gradient(135deg, #e1bee7 0%, #ba68c8 100%)',
    path: '/math/addition',
    category: 'math'
  },
  {
    id: 'subtraction',
    name: 'Subtract',
    emoji: '➖',
    gradient: 'linear-gradient(135deg, #b2ebf2 0%, #4dd0e1 100%)',
    path: '/math/subtraction',
    category: 'math'
  },
  {
    id: 'odd-even',
    name: 'Odd/Even',
    emoji: '🎲',
    gradient: 'linear-gradient(135deg, #f8bbd0 0%, #f48fb1 100%)',
    path: '/math/odd-even',
    category: 'math'
  },

  // Music Apps (2 modes from MusicForestPage - now separate apps!)
  {
    id: 'piano-free',
    name: 'Piano',
    emoji: '🎹',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    path: '/piano',
    category: 'music'
  },
  {
    id: 'melodies',
    name: 'Melodies',
    emoji: '🎼',
    gradient: 'linear-gradient(135deg, #BB8FCE 0%, #9D8FFF 100%)',
    path: '/music/melodies',
    category: 'music'
  },

  // Quiz Apps (4 apps from GK catalog)
  {
    id: 'flags',
    name: 'Flags',
    emoji: '🏁',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    path: '/quiz/flags',
    category: 'quiz'
  },
  {
    id: 'capitals',
    name: 'Capitals',
    emoji: '🏙️',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    path: '/quiz/capitals',
    category: 'quiz'
  },
  {
    id: 'monuments',
    name: 'Monuments',
    emoji: '🏛️',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    path: '/quiz/monuments',
    category: 'quiz'
  },
  {
    id: 'people',
    name: 'People',
    emoji: '👤',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    path: '/quiz/people',
    category: 'quiz'
  },

  // Stories & Reading
  {
    id: 'stories',
    name: 'Stories',
    emoji: '📚',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    path: '/stories',
    category: 'learning'
  },
  {
    id: 'reading',
    name: 'Reading',
    emoji: '📖',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    path: '/reading',
    category: 'learning'
  },

  // Science
  {
    id: 'science',
    name: 'Science',
    emoji: '🔬',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    path: '/science',
    category: 'learning'
  },

  // Creative Apps
  {
    id: 'drawing',
    name: 'Draw',
    emoji: '✏️',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    path: '/drawing-board',
    category: 'creative'
  },
  {
    id: 'coloring',
    name: 'Color',
    emoji: '🎨',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    path: '/coloring',
    category: 'creative'
  },

  // Games (3 games from GamesPage)
  {
    id: 'car-race',
    name: 'Car Race',
    emoji: '🏎️',
    gradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
    path: '/car-race',
    category: 'games'
  },
  {
    id: 'snake',
    name: 'Snake',
    emoji: '🐍',
    gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    path: '/snake',
    category: 'games'
  },
  {
    id: 'dinosaur',
    name: 'Dino',
    emoji: '🦖',
    gradient: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
    path: '/dinosaur',
    category: 'games'
  },

  // Additional Learning & Discovery Apps
  {
    id: 'alphabet',
    name: 'ABC',
    emoji: '🔤',
    gradient: 'linear-gradient(135deg, #ebc0fd 0%, #d9ded8 100%)',
    path: '/alphabet',
    category: 'learning'
  },
  {
    id: 'animals',
    name: 'Animals',
    emoji: '🦁',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    path: '/animals',
    category: 'discovery'
  },
  {
    id: 'space',
    name: 'Space',
    emoji: '🚀',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    path: '/space',
    category: 'discovery'
  },
  {
    id: 'nature',
    name: 'Nature',
    emoji: '🌿',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    path: '/nature',
    category: 'discovery'
  },
  {
    id: 'shapes',
    name: 'Shapes',
    emoji: '🔷',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    path: '/shapes',
    category: 'discovery'
  },
  {
    id: 'puzzles',
    name: 'Puzzles',
    emoji: '🧩',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    path: '/puzzles',
    category: 'games'
  },
  {
    id: 'memory',
    name: 'Memory',
    emoji: '🧠',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    path: '/memory',
    category: 'games'
  }
];


// iPad-style App Icon
interface AppIconProps {
  app: typeof APPS[0];
  index: number;
  onClick: () => void;
}

const AppIcon: React.FC<AppIconProps> = ({ app, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}
      >
        {/* App Icon */}
        <Box
          sx={{
            width: { xs: 80, sm: 100, md: 110 },
            height: { xs: 80, sm: 100, md: 110 },
            borderRadius: { xs: '18px', sm: '22px', md: '24px' },
            background: app.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
              borderRadius: 'inherit'
            }
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              lineHeight: 1,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
              userSelect: 'none',
              position: 'relative',
              zIndex: 1
            }}
          >
            {app.emoji}
          </Typography>
        </Box>

        {/* App Name */}
        <Typography
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
            fontWeight: 500,
            color: 'white',
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            maxWidth: { xs: 80, sm: 100, md: 110 },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {app.name}
        </Typography>
      </Box>
    </motion.div>
  );
};


// Main Kids Studio Home Component - iPad Style
const HomeTreePageV2: React.FC = () => {
  const navigate = useNavigate();

  const handleAppClick = (path: string) => {
    navigate(path);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get profile name from localStorage (simple approach)
  const profileName = localStorage.getItem('selectedProfile') === 'vidushi' ? 'Vidushi' :
                      localStorage.getItem('selectedProfile') === 'rishika' ? 'Rishika' : 'Explorer';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        position: 'relative',
        overflow: 'auto',
        py: { xs: 4, sm: 6, md: 8 }
      }}
    >
      {/* Animated gradient mesh background */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 50%, ${alpha('#667eea', 0.3)} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${alpha('#f093fb', 0.3)} 0%, transparent 50%),
            radial-gradient(circle at 40% 10%, ${alpha('#764ba2', 0.2)} 0%, transparent 50%)
          `,
          opacity: 0.8,
          zIndex: 0
        }}
      />

      {/* Main content */}
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              color: 'white',
              mb: 6,
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              letterSpacing: '-0.02em',
              textShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            {getGreeting()}, {profileName}!
          </Typography>
        </motion.div>

        {/* App Grid - iPad Style */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(3, 1fr)',
              sm: 'repeat(4, 1fr)',
              md: 'repeat(5, 1fr)',
              lg: 'repeat(6, 1fr)'
            },
            gap: { xs: 3, sm: 4, md: 5 },
            justifyItems: 'center',
            px: { xs: 2, sm: 3, md: 4 },
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {APPS.map((app, index) => (
            <AppIcon
              key={app.id}
              app={app}
              index={index}
              onClick={() => handleAppClick(app.path)}
            />
          ))}
        </Box>

        {/* Page Indicators (iPad-style dots) */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 6
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'white',
              opacity: 1
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'white',
              opacity: 0.4
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HomeTreePageV2;
