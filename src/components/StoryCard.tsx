import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  CardActionArea,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Story } from '../data/storyData';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

interface StoryCardProps {
  story: Story;
  delay?: number;
}

const MotionCard = motion(Card);

const StoryCard: React.FC<StoryCardProps> = ({ story, delay = 0 }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const handleClick = () => {
    navigate(`/story-reader/${story.id}`);
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
        boxShadow: `0 8px 24px ${story.shadowColor || theme.palette.primary.light}`,
        background: story.gradient || theme.palette.background.paper,
      }}
    >
      <CardActionArea 
        onClick={handleClick}
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'stretch',
          height: '100%',
          '&:hover': {
            '& .cover-image': {
              transform: 'scale(1.05)',
            }
          }
        }}
      >
        <Box 
          sx={{ 
            position: 'relative',
            overflow: 'hidden',
            height: 200,
          }}
        >
          <Box
            className="cover-image"
            component="img"
            src={story.coverImage}
            alt={story.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
            }}
            onError={(e) => {
              // Fallback for missing images
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x200?text=Story+Cover';
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              p: 1,
            }}
          >
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
              {story.category}
            </Typography>
          </Box>
        </Box>
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="h6" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              mb: 1
            }}
          >
            {story.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              flexGrow: 1
            }}
          >
            {story.description}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {story.tags.slice(0, 3).map((tag, index) => (
              <Chip 
                key={index} 
                label={tag} 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  fontSize: '0.7rem'
                }} 
              />
            ))}
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AutoStoriesIcon fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
              <Typography variant="caption" color="text.secondary">
                {story.pages.length} pages
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {story.ageRange}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </MotionCard>
  );
};

export default StoryCard; 