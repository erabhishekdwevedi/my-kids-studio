import React from 'react';
import { 
  Card, 
  Typography, 
  Box, 
  CardActionArea,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MathActivity } from '../data/mathData';

interface MathCardProps {
  activity: MathActivity;
  delay?: number;
}

const MotionCard = motion(Card);

const MathCard: React.FC<MathCardProps> = ({ activity, delay = 0 }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const handleClick = () => {
    if (activity.path) {
      navigate(activity.path);
    }
  };
  
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: `0 10px 30px ${activity.shadowColor || theme.palette.primary.light}`,
        background: activity.gradient || theme.palette.background.paper,
        border: '5px solid rgba(255, 255, 255, 0.3)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 15px 35px ${activity.shadowColor || theme.palette.primary.light}`,
        }
      }}
    >
      <CardActionArea 
        onClick={handleClick}
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: 3,
          '&:hover': {
            '& .icon-container': {
              transform: 'scale(1.1) rotate(5deg)',
            }
          }
        }}
      >
        <Box 
          className="icon-container"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 160,
            height: 160,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            color: activity.textColor || theme.palette.primary.main,
            transition: 'transform 0.3s ease-in-out',
            mb: 3,
            '& svg': {
              fontSize: 100
            }
          }}
        >
          {activity.icon}
        </Box>
        
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold',
            color: activity.textColor || theme.palette.text.primary,
            textAlign: 'center',
            fontSize: '2.2rem'
          }}
        >
          {activity.title}
        </Typography>
      </CardActionArea>
    </MotionCard>
  );
};

export default MathCard; 