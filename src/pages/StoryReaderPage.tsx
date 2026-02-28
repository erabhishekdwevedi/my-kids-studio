import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Paper, 
  useTheme, 
  useMediaQuery,
  Container,
  Fade,
  Zoom,
  Tooltip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeIcon from '@mui/icons-material/Home';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { allStories, Story } from '../data/storyData';
import logger from '../utils/logger';
import { useApp } from '../contexts/AppContext';

const log = logger.createLogger('StoryReaderPage');

// Book page flip animation variants
const pageVariants = {
  initial: (direction: number) => ({
    rotateY: direction > 0 ? -180 : 0,
    boxShadow: direction > 0 
      ? '0px 0px 10px rgba(0, 0, 0, 0.2)' 
      : '-10px 0px 15px rgba(0, 0, 0, 0.3)',
    zIndex: direction > 0 ? 1 : 2,
  }),
  animate: (direction: number) => ({
    rotateY: direction > 0 ? 0 : -180,
    boxShadow: direction > 0 
      ? '-10px 0px 15px rgba(0, 0, 0, 0.3)' 
      : '0px 0px 10px rgba(0, 0, 0, 0.2)',
    zIndex: direction > 0 ? 2 : 1,
  }),
  exit: (direction: number) => ({
    rotateY: direction > 0 ? 180 : -360,
    boxShadow: direction > 0 
      ? '10px 0px 15px rgba(0, 0, 0, 0.3)' 
      : '-10px 0px 15px rgba(0, 0, 0, 0.3)',
    zIndex: 0,
  }),
};

const StoryReaderPage: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { selectedTheme } = useApp();
  
  // State
  const [story, setStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Speech synthesis
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Load story data
  useEffect(() => {
    try {
      if (storyId) {
        const foundStory = allStories.find(s => s.id === storyId);
        if (foundStory) {
          setStory(foundStory);
          log.info('Story loaded successfully', { storyId });
        } else {
          log.error('Story not found', new Error(`Story with ID ${storyId} not found`));
          navigate('/subject/story');
        }
      }
    } catch (error) {
      log.error('Error loading story', error as Error);
      navigate('/subject/story');
    }
    
    // Initialize speech synthesis
    if (window.speechSynthesis) {
      speechSynthesisRef.current = window.speechSynthesis;
    }
    
    // Cleanup
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
      
      if (speechSynthesisRef.current && speechUtteranceRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, [storyId, navigate]);
  
  // Handle page navigation
  const goToNextPage = useCallback(() => {
    if (story && currentPage < story.pages.length - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  }, [story, currentPage]);
  
  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNextPage, goToPrevPage]);
  
  // Text-to-speech functionality
  const readPageContent = useCallback((content: string) => {
    if (!speechSynthesisRef.current) return;
    
    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel();
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.9; // Slightly slower for children
    utterance.pitch = 1.1; // Slightly higher pitch
    
    // Get available voices and select a good one if available
    const voices = speechSynthesisRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Google') || 
      voice.lang.includes('en-US')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Store reference and speak
    speechUtteranceRef.current = utterance;
    speechSynthesisRef.current.speak(utterance);
    
    // Set reading state
    setIsReading(true);
    
    // Event handlers
    utterance.onend = () => {
      setIsReading(false);
      
      // Auto-advance to next page if autoplay is enabled
      if (autoPlayEnabled && story && currentPage < story.pages.length - 1) {
        autoPlayTimerRef.current = setTimeout(() => {
          goToNextPage();
        }, 1500); // Delay before moving to next page
      }
    };
    
    utterance.onerror = (event) => {
      log.error('Speech synthesis error', new Error('Speech synthesis failed'));
      setIsReading(false);
    };
  }, [autoPlayEnabled, story, currentPage, goToNextPage]);
  
  // Toggle autoplay
  const toggleAutoPlay = useCallback(() => {
    setAutoPlayEnabled(prev => {
      const newState = !prev;
      
      // If turning on autoplay, start reading current page
      if (newState && story && currentPage < story.pages.length) {
        const content = story.pages[currentPage].content;
        readPageContent(content);
      } else if (!newState) {
        // If turning off, stop reading
        if (speechSynthesisRef.current) {
          speechSynthesisRef.current.cancel();
        }
        
        if (autoPlayTimerRef.current) {
          clearTimeout(autoPlayTimerRef.current);
        }
        
        setIsReading(false);
      }
      
      return newState;
    });
  }, [story, currentPage, readPageContent]);
  
  // Read page content when page changes
  useEffect(() => {
    if (autoPlayEnabled && story && story.pages[currentPage]) {
      const content = story.pages[currentPage].content;
      readPageContent(content);
    }
  }, [currentPage, autoPlayEnabled, story, readPageContent]);
  
  // Stop reading when navigating away
  const handleBack = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
    }
    
    navigate('/subject/story');
  };
  
  // Handle page click to toggle reading
  const handlePageClick = () => {
    if (isReading) {
      // Stop reading
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
      setIsReading(false);
    } else if (story && story.pages[currentPage]) {
      // Start reading
      const content = story.pages[currentPage].content;
      readPageContent(content);
    }
  };
  
  // Calculate dimensions based on device
  const getBookDimensions = () => {
    if (isMobile) {
      return {
        width: '90vw',
        height: '70vh',
        fontSize: '1rem',
        padding: 2,
      };
    } else if (isTablet) {
      return {
        width: '80vw',
        height: '70vh',
        fontSize: '1.1rem',
        padding: 3,
      };
    } else {
      return {
        width: '80vw',
        maxWidth: '1000px',
        height: '70vh',
        fontSize: '1.2rem',
        padding: 4,
      };
    }
  };
  
  const dimensions = getBookDimensions();
  
  // If story is not loaded yet
  if (!story) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: selectedTheme?.backgroundColor || theme.palette.background.default,
        }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <AutoStoriesIcon 
            sx={{ 
              fontSize: 80, 
              color: selectedTheme?.textColor || theme.palette.primary.main,
              opacity: 0.7,
            }} 
          />
        </motion.div>
        <Typography 
          variant="h6" 
          sx={{ 
            mt: 2,
            color: selectedTheme?.textColor || theme.palette.text.primary,
          }}
        >
          Loading story...
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: story.backgroundColor || selectedTheme?.backgroundColor || theme.palette.background.default,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 10,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleBack} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="h1" 
            sx={{ 
              ml: 1,
              fontWeight: 'bold',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            {story.title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={autoPlayEnabled ? "Turn off auto-read" : "Turn on auto-read"}>
            <IconButton 
              onClick={toggleAutoPlay} 
              color={autoPlayEnabled ? "primary" : "default"}
              aria-label={autoPlayEnabled ? "turn off auto-read" : "turn on auto-read"}
            >
              {autoPlayEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Go to home">
            <IconButton 
              onClick={() => navigate('/')} 
              aria-label="home"
              sx={{ ml: 1 }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Book container */}
      <Container 
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          py: 4,
        }}
      >
        {/* Page counter */}
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2,
            color: theme.palette.text.secondary,
            fontWeight: 'medium',
          }}
        >
          Page {currentPage + 1} of {story.pages.length}
        </Typography>
        
        {/* Book */}
        <Box
          sx={{
            position: 'relative',
            width: dimensions.width,
            height: dimensions.height,
            perspective: '1500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Book cover (visible when on first page) */}
          {currentPage === 0 && (
            <Fade in={currentPage === 0} timeout={500}>
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  background: story.gradient || theme.palette.background.paper,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 4,
                  zIndex: 0,
                }}
              >
                <Typography 
                  variant="h4" 
                  component="h1" 
                  align="center"
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 2,
                    color: theme.palette.text.primary,
                  }}
                >
                  {story.title}
                </Typography>
                
                <Box
                  component="img"
                  src={story.coverImage}
                  alt={story.title}
                  sx={{
                    width: '70%',
                    maxHeight: '50%',
                    objectFit: 'contain',
                    borderRadius: 2,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                    mb: 3,
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300?text=Story+Cover';
                  }}
                />
                
                <Typography 
                  variant="body1" 
                  align="center"
                  sx={{ 
                    fontStyle: 'italic',
                    mb: 1,
                    color: theme.palette.text.secondary,
                  }}
                >
                  A Panchatantra Story
                </Typography>
                
                <Typography 
                  variant="body2" 
                  align="center"
                  sx={{ 
                    color: theme.palette.text.secondary,
                  }}
                >
                  Click to start reading
                </Typography>
              </Box>
            </Fade>
          )}
          
          {/* Animated pages */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                transformOrigin: direction > 0 ? 'left center' : 'right center',
              }}
              onClick={handlePageClick}
            >
              <Paper
                elevation={3}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  backgroundColor: '#fff',
                  position: 'relative',
                }}
              >
                {/* Page content */}
                <Box
                  sx={{
                    flex: 1,
                    p: dimensions.padding,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'auto',
                  }}
                >
                  <Typography 
                    variant="body1" 
                    component="div"
                    sx={{ 
                      fontSize: dimensions.fontSize,
                      lineHeight: 1.8,
                      color: theme.palette.text.primary,
                      mb: 2,
                    }}
                  >
                    {story.pages[currentPage].content}
                  </Typography>
                  
                  {/* Reading indicator */}
                  {isReading && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: 10,
                        px: 1.5,
                        py: 0.5,
                      }}
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: 'loop',
                        }}
                      >
                        <VolumeUpIcon 
                          fontSize="small" 
                          sx={{ 
                            color: theme.palette.primary.main,
                            mr: 0.5,
                          }} 
                        />
                      </motion.div>
                      <Typography variant="caption" color="text.secondary">
                        Reading...
                      </Typography>
                    </Box>
                  )}
                </Box>
                
                {/* Page image */}
                <Box
                  sx={{
                    width: { xs: '100%', md: '50%' },
                    height: { xs: '40%', md: '100%' },
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <Box
                    component="img"
                    src={story.pages[currentPage].image}
                    alt={`Illustration for page ${currentPage + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x600?text=Story+Illustration';
                    }}
                  />
                </Box>
              </Paper>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <Zoom in={currentPage > 0}>
            <IconButton
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              aria-label="previous page"
              sx={{
                position: 'absolute',
                left: { xs: -20, sm: -30 },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                zIndex: 5,
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Zoom>
          
          <Zoom in={story && currentPage < story.pages.length - 1}>
            <IconButton
              onClick={goToNextPage}
              disabled={!story || currentPage >= story.pages.length - 1}
              aria-label="next page"
              sx={{
                position: 'absolute',
                right: { xs: -20, sm: -30 },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                zIndex: 5,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Zoom>
        </Box>
        
        {/* Mobile navigation (for small screens) */}
        {isMobile && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mt: 2,
              px: 2,
            }}
          >
            <IconButton
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              aria-label="previous page"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            
            <IconButton
              onClick={goToNextPage}
              disabled={!story || currentPage >= story.pages.length - 1}
              aria-label="next page"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default StoryReaderPage; 