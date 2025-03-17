import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  LinearProgress,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReplayIcon from '@mui/icons-material/Replay';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { mathActivities, MathActivity, MathQuestion } from '../data/mathData';
import { useApp } from '../contexts/AppContext';
import PageNavigation from '../components/PageNavigation';

const MotionPaper = motion(Paper);

// Sprinkle component for decoration
const Sprinkle = ({ color, top, left, delay }: { color: string, top: string, left: string, delay: number }) => (
  <motion.div
    style={{
      position: 'absolute',
      top,
      left,
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: color,
      zIndex: 0
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.5, 
      delay, 
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: Math.random() * 2
    }}
  />
);

const MathActivityPage: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { selectedTheme, selectedProfile, updateScore } = useApp();
  
  // State
  const [activity, setActivity] = useState<MathActivity | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Generate random sprinkles based on theme
  const generateSprinkles = () => {
    if (!selectedTheme) return [];
    
    const colors = selectedTheme.id === 'icecream' 
      ? ['#f8bbd0', '#bbdefb', '#ffcc80', '#c5e1a5', '#b39ddb']
      : selectedTheme.id === 'jungle'
        ? ['#a5d6a7', '#c8e6c9', '#ffcc80', '#bcaaa4', '#81c784']
        : ['#f8bbd0', '#bbdefb', '#ffe082', '#b39ddb', '#90caf9'];
    
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2
    }));
  };

  const sprinkles = generateSprinkles();
  
  // Load activity data
  useEffect(() => {
    try {
      if (activityId) {
        const foundActivity = mathActivities.find(a => a.id === activityId);
        if (foundActivity) {
          setActivity(foundActivity);
          console.info(`[MathActivityPage] Activity loaded successfully: ${activityId}`);
        } else {
          console.error(`[MathActivityPage] Activity not found: ${activityId}`);
          navigate('/math');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[MathActivityPage] Error loading activity: ${errorMessage}`);
      navigate('/math');
    }
  }, [activityId, navigate]);
  
  // Current question
  const currentQuestion = activity?.questions?.[currentQuestionIndex] || null;
  
  // Handle answer selection
  const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(event.target.value);
    }
  };
  
  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (!currentQuestion || !selectedAnswer) return;
    
    const correct = selectedAnswer === currentQuestion.correctAnswer.toString();
    setIsCorrect(correct);
    setIsAnswerSubmitted(true);
    
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    if (!activity || !activity.questions) return;
    
    if (currentQuestionIndex < activity.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      // End of quiz
      setShowResults(true);
      
      // Update user score if profile exists
      if (selectedProfile && updateScore) {
        updateScore(score);
      }
    }
  };
  
  // Handle restart
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setShowResults(false);
  };

  const handleBackToMath = () => {
    navigate('/math');
  };

  const handleBackToHome = () => {
    navigate('/');
  };
  
  // If activity is not loaded yet
  if (!activity || !activity.questions || !selectedProfile || !selectedTheme) {
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
        <Typography variant="h6">Loading activity...</Typography>
      </Box>
    );
  }
  
  // Calculate progress
  const progress = (currentQuestionIndex / activity.questions.length) * 100;
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        background: selectedTheme.gradient,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: 3
      }}
    >
      {/* Decorative sprinkles */}
      {sprinkles.map(sprinkle => (
        <Sprinkle 
          key={sprinkle.id}
          color={sprinkle.color}
          top={sprinkle.top}
          left={sprinkle.left}
          delay={sprinkle.delay}
        />
      ))}

      {/* Top Navigation */}
      <PageNavigation 
        profile={selectedProfile}
        theme={selectedTheme}
        showTitle={true}
        title={activity.title}
        onBackClick={handleBackToMath}
        onHomeClick={handleBackToHome}
        showMuteButton={true}
      />
      
      {/* Progress bar */}
      {!showResults && (
        <Box sx={{ mt: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              Question {currentQuestionIndex + 1} of {activity.questions.length}
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 12,
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.3)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: activity.textColor || theme.palette.primary.main,
                borderRadius: 6
              }
            }} 
          />
        </Box>
      )}
      
      <Container maxWidth="md" sx={{ mt: 2, position: 'relative', zIndex: 1 }}>
        {/* Results screen */}
        {showResults ? (
          <MotionPaper
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: 'center',
              backgroundColor: 'white',
              border: '5px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 3
              }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ 
                  duration: 1,
                  repeat: 1,
                }}
              >
                <EmojiEventsIcon 
                  sx={{ 
                    fontSize: 120, 
                    color: score > activity.questions.length / 2 ? '#FFD700' : '#C0C0C0',
                    mb: 2
                  }} 
                />
              </motion.div>
              
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1,
                  color: activity.textColor || theme.palette.primary.main,
                }}
              >
                {score === activity.questions.length 
                  ? 'Perfect Score!' 
                  : score > activity.questions.length / 2 
                    ? 'Great Job!' 
                    : 'Good Try!'}
              </Typography>
              
              <Typography variant="h4" sx={{ mb: 3 }}>
                You scored {score} out of {activity.questions.length}
              </Typography>
              
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 30, 
                  backgroundColor: '#f5f5f5',
                  borderRadius: 15,
                  mb: 3,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box 
                  sx={{ 
                    width: `${(score / activity.questions.length) * 100}%`, 
                    height: '100%',
                    backgroundColor: score === activity.questions.length 
                      ? '#4caf50' 
                      : score > activity.questions.length / 2 
                        ? '#2196f3' 
                        : '#ff9800',
                    borderRadius: 15,
                    transition: 'width 1s ease-in-out',
                  }}
                />
              </Box>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  startIcon={<ReplayIcon sx={{ fontSize: 30 }} />}
                  onClick={handleRestart}
                  sx={{ 
                    py: 2,
                    borderRadius: 3,
                    borderWidth: 3,
                    borderColor: activity.textColor || theme.palette.primary.main,
                    color: activity.textColor || theme.palette.primary.main,
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      borderWidth: 3,
                      borderColor: activity.textColor || theme.palette.primary.dark,
                      backgroundColor: 'rgba(0,0,0,0.04)',
                    }
                  }}
                >
                  Try Again
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => navigate('/math')}
                  sx={{ 
                    py: 2,
                    borderRadius: 3,
                    backgroundColor: activity.textColor || theme.palette.primary.main,
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: activity.textColor 
                        ? `${activity.textColor}dd` 
                        : theme.palette.primary.dark,
                    }
                  }}
                >
                  Back to Math
                </Button>
              </Grid>
            </Grid>
          </MotionPaper>
        ) : (
          /* Question screen */
          <Box>
            {currentQuestion && (
              <MotionPaper
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backgroundColor: 'white',
                  border: '5px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <Typography 
                  variant="h3" 
                  sx={{ 
                    mb: 4,
                    fontWeight: 'bold',
                    color: activity.textColor || theme.palette.text.primary,
                    textAlign: 'center',
                    fontSize: '3rem',
                    lineHeight: 1.2,
                    letterSpacing: '0.02em',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    padding: '0.5em 0.2em',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '3px dashed rgba(255,255,255,0.4)',
                    transform: 'rotate(-1deg)',
                    animation: 'pulse 2s infinite ease-in-out',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1) rotate(-1deg)' },
                      '50%': { transform: 'scale(1.02) rotate(0deg)' },
                      '100%': { transform: 'scale(1) rotate(-1deg)' }
                    }
                  }}
                >
                  {currentQuestion.question}
                </Typography>
                
                {currentQuestion.image && (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 3 
                    }}
                  >
                    <Box
                      component="img"
                      src={currentQuestion.image}
                      alt="Question illustration"
                      sx={{
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: 200,
                        borderRadius: 2,
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </Box>
                )}
                
                <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
                  <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={selectedAnswer || ''}
                    onChange={handleAnswerSelect}
                  >
                    <Grid container spacing={3}>
                      {currentQuestion.options?.map((option, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <MotionPaper
                            whileHover={!isAnswerSubmitted ? { scale: 1.05, rotate: 1 } : {}}
                            whileTap={!isAnswerSubmitted ? { scale: 0.95 } : {}}
                            elevation={3}
                            sx={{
                              p: 3,
                              borderRadius: 8,
                              cursor: isAnswerSubmitted ? 'default' : 'pointer',
                              border: '4px solid',
                              borderColor: isAnswerSubmitted
                                ? option === currentQuestion.correctAnswer.toString()
                                  ? '#4caf50'
                                  : selectedAnswer === option
                                    ? '#f44336'
                                    : 'rgba(255, 255, 255, 0.5)'
                                : selectedAnswer === option
                                  ? activity.textColor || theme.palette.primary.main
                                  : 'rgba(255, 255, 255, 0.5)',
                              backgroundColor: isAnswerSubmitted
                                ? option === currentQuestion.correctAnswer.toString()
                                  ? 'rgba(76, 175, 80, 0.2)'
                                  : selectedAnswer === option
                                    ? 'rgba(244, 67, 54, 0.2)'
                                    : 'white'
                                : selectedAnswer === option
                                  ? 'rgba(0, 0, 0, 0.05)'
                                  : 'white',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              overflow: 'hidden',
                              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                              '&:hover': {
                                boxShadow: !isAnswerSubmitted ? '0 12px 25px rgba(0,0,0,0.15)' : '0 8px 20px rgba(0,0,0,0.1)'
                              }
                            }}
                            onClick={() => {
                              if (!isAnswerSubmitted) {
                                setSelectedAnswer(option);
                              }
                            }}
                          >
                            <FormControlLabel
                              value={option}
                              control={
                                <Radio 
                                  sx={{ 
                                    color: activity.textColor || theme.palette.primary.main,
                                    '& .MuiSvgIcon-root': {
                                      fontSize: 28
                                    },
                                    '&.Mui-checked': {
                                      color: isAnswerSubmitted
                                        ? option === currentQuestion.correctAnswer.toString()
                                          ? '#4caf50'
                                          : '#f44336'
                                        : activity.textColor || theme.palette.primary.main,
                                    }
                                  }} 
                                />
                              }
                              label={option}
                              sx={{ 
                                width: '100%',
                                margin: 0,
                                pointerEvents: isAnswerSubmitted ? 'none' : 'auto',
                                '& .MuiFormControlLabel-label': {
                                  fontSize: '1.6rem',
                                  fontWeight: 600,
                                  lineHeight: 1.3,
                                  letterSpacing: '0.01em',
                                  color: isAnswerSubmitted 
                                    ? option === currentQuestion.correctAnswer.toString()
                                      ? '#4caf50'
                                      : selectedAnswer === option
                                        ? '#f44336'
                                        : theme.palette.text.primary
                                    : theme.palette.text.primary
                                }
                              }}
                              disabled={isAnswerSubmitted}
                            />
                            
                            {isAnswerSubmitted && option === currentQuestion.correctAnswer.toString() && (
                              <CheckCircleOutlineIcon 
                                sx={{ 
                                  color: '#4caf50',
                                  position: 'absolute',
                                  right: 16,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  fontSize: 30
                                }} 
                              />
                            )}
                            
                            {isAnswerSubmitted && selectedAnswer === option && option !== currentQuestion.correctAnswer.toString() && (
                              <HighlightOffIcon 
                                sx={{ 
                                  color: '#f44336',
                                  position: 'absolute',
                                  right: 16,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  fontSize: 30
                                }} 
                              />
                            )}
                          </MotionPaper>
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                </FormControl>
                
                {isAnswerSubmitted && (
                  <Box 
                    sx={{ 
                      p: 3, 
                      borderRadius: 3, 
                      backgroundColor: isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                      mb: 3,
                      border: `3px solid ${isCorrect ? '#4caf50' : '#f44336'}`
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: isCorrect ? '#4caf50' : '#f44336',
                        mb: 1,
                      }}
                    >
                      {isCorrect ? 'Correct!' : 'Incorrect!'}
                    </Typography>
                    
                    {currentQuestion.explanation && (
                      <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                        {currentQuestion.explanation}
                      </Typography>
                    )}
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  {!isAnswerSubmitted ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={!selectedAnswer}
                      onClick={handleSubmitAnswer}
                      sx={{ 
                        px: 6,
                        py: 2,
                        borderRadius: 30,
                        backgroundColor: activity.textColor || theme.palette.primary.main,
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: activity.textColor 
                            ? `${activity.textColor}dd` 
                            : theme.palette.primary.dark,
                        },
                        '&.Mui-disabled': {
                          backgroundColor: 'rgba(0, 0, 0, 0.12)',
                          color: 'rgba(0, 0, 0, 0.26)',
                        }
                      }}
                    >
                      Check Answer
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleNextQuestion}
                      sx={{ 
                        px: 6,
                        py: 2,
                        borderRadius: 30,
                        backgroundColor: activity.textColor || theme.palette.primary.main,
                        fontSize: '1.3rem',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: activity.textColor 
                            ? `${activity.textColor}dd` 
                            : theme.palette.primary.dark,
                        }
                      }}
                    >
                      {currentQuestionIndex < activity.questions.length - 1 ? 'Next Question' : 'See Results'}
                    </Button>
                  )}
                </Box>
              </MotionPaper>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MathActivityPage; 