import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box 
} from '@mui/material';
import { motion } from 'framer-motion';
import { Activity, Theme } from '../types';

interface ActivityCardProps {
  activity: Activity;
  theme: Theme;
  index: number;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, theme, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          background: 'white',
          borderRadius: 4,
          boxShadow: `0 8px 24px ${theme.shadowColor}`,
          transition: 'all 0.3s ease',
          border: theme.id === 'icecream' 
            ? '5px solid #f8bbd0'
            : theme.id === 'jungle'
              ? '5px solid #a5d6a7'
              : '5px solid #b3e5fc',
          height: '100%',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: `0 12px 28px ${theme.shadowColor}`,
            backgroundColor: theme.backgroundColor
          }
        }}
      >
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: theme.backgroundColor,
              color: theme.textColor,
              margin: '0 auto 16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: `4px solid ${theme.textColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {activity.icon}
          </Box>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              color: theme.textColor,
            }}
          >
            {activity.name}
          </Typography>
          {activity.description && (
            <Typography 
              variant="body1" 
              sx={{ 
                mt: 2,
                color: 'text.secondary'
              }}
            >
              {activity.description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActivityCard; 