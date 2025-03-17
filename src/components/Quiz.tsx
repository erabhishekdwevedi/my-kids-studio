import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Paper,
  Grid,
  Avatar,
  LinearProgress
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { QuizQuestion } from '../data/quizData';
import PageNavigation from './PageNavigation';
import { speak, stop } from '../utils/textToSpeech';
import Confetti from './Confetti';

interface QuizProps {
  title: string;
  description: string;
  questions: QuizQuestion[];
  category: string;
}

const QUESTIONS_PER_ROUND = 10;

const Quiz: React.FC<QuizProps> = ({ title, description, questions, category }) => {
  const navigate = useNavigate();
  const { selectedProfile, selectedTheme, updateScore } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [showRoundComplete, setShowRoundComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalRounds = Math.ceil(questions.length / QUESTIONS_PER_ROUND);
  const startIndex = (currentRound - 1) * QUESTIONS_PER_ROUND;
  const currentRoundQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_ROUND);
  const currentQuestion = currentRoundQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / QUESTIONS_PER_ROUND) * 100;

  // Read the question and options when they change
  useEffect(() => {
    if (currentQuestion && !quizCompleted) {
      // Prepare the text to be read
      const textToRead = `${currentQuestion.question}. Options: ${currentQuestion.options.join(', ')}`;
      
      // Use a slower rate for better comprehension
      speak(textToRead, 0.9);
    }

    // Clean up function to stop speech when component unmounts or question changes
    return () => {
      stop();
    };
  }, [currentQuestion, quizCompleted]);

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    const correct = optionIndex === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    stop();
    
    if (correct) {
      speak("Correct answer! Well done!", 1);
      setScore(prevScore => prevScore + 10);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      speak("Oops! That's not correct.", 1);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS_PER_ROUND - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setShowFeedback(false);
      } else if (currentRound < totalRounds) {
        setShowRoundComplete(true);
      } else {
        setQuizCompleted(true);
        if (selectedProfile) {
          updateScore(score + (correct ? 10 : 0));
        }
        speak(`Quiz completed! Your score is ${score + (correct ? 10 : 0)} points.`, 1);
      }
    }, 1500);
  };

  const handleBackToSubject = () => {
    // Stop any speech before navigating
    stop();
    navigate(`/subject/gk`);
  };

  const handleBackToHome = () => {
    // Stop any speech before navigating
    stop();
    navigate('/');
  };

  const handlePlayAgain = () => {
    // Stop any speech before restarting
    stop();
    
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setQuizCompleted(false);
    setShowFeedback(false);
  };

  const handleNextRound = () => {
    setCurrentRound(prev => prev + 1);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setShowRoundComplete(false);
  };

  if (!selectedProfile || !selectedTheme) {
    return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: selectedTheme.gradient,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: 3
      }}
    >
      {/* Top Navigation */}
      <PageNavigation 
        profile={selectedProfile}
        theme={selectedTheme}
        showTitle={false}
        onBackClick={handleBackToSubject}
        onHomeClick={handleBackToHome}
        showMuteButton={true}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Quiz Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700, 
              color: selectedTheme.textColor,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 2
            }}
          >
            {title}
          </Typography>
        </motion.div>

        {/* Progress Bar */}
        <Box sx={{ mb: 4 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              backgroundColor: 'rgba(255,255,255,0.5)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: selectedTheme.textColor,
              }
            }} 
          />
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ mt: 1, color: selectedTheme.textColor }}
          >
            Question {currentQuestionIndex + 1} of {QUESTIONS_PER_ROUND}
          </Typography>
        </Box>

        {!quizCompleted ? (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 4,
                backgroundColor: 'white',
                mb: 4,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 'inherit',
                  padding: '2px', // Border width
                  background: `linear-gradient(90deg, 
                    ${selectedTheme.textColor} ${progress}%, 
                    rgba(0,0,0,0.1) ${progress}%
                  )`,
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  pointerEvents: 'none'
                },
                '&::after': {
                  content: `"${score} points"`,
                  position: 'absolute',
                  top: -30,
                  right: 16,
                  background: 'white',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: selectedTheme.textColor,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: `2px solid ${selectedTheme.textColor}`
                }
              }}
            >
              {/* Image or Question Text based on category */}
              {category === 'capitals' ? (
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    color: selectedTheme.textColor,
                    mb: 4,
                    textAlign: 'center',
                    fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                    lineHeight: 1.4,
                    letterSpacing: '0.02em',
                    padding: '1em',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '3px solid rgba(0,0,0,0.1)'
                  }}
                >
                  {currentQuestion.question}
                </Typography>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: 175, sm: 245, md: 280 },
                    borderRadius: 4,
                    overflow: 'hidden',
                    mb: 4,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    backgroundColor: category === 'flags' ? '#f5f5f5' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    border: '5px solid rgba(255,255,255,0.5)',
                    '&::before': category === 'flags' ? {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.02) 75%), linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.02) 75%)',
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 10px 10px',
                      pointerEvents: 'none'
                    } : {}
                  }}
                >
                  <img 
                    src={currentQuestion.imageUrl} 
                    alt={`Question ${currentQuestionIndex + 1}`}
                    style={{ 
                      width: category === 'flags' ? '60%' : '70%',
                      height: '100%',
                      objectFit: category === 'flags' ? 'contain' : 'cover',
                      filter: category === 'flags' 
                        ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' 
                        : 'brightness(1.05) contrast(1.05)',
                      transition: 'transform 0.3s ease',
                      transform: selectedOption !== null ? 'scale(1.02)' : 'scale(1)'
                    }} 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      console.error(`Failed to load image: ${currentQuestion.imageUrl}`);
                    }}
                  />
                </Box>
              )}

              {/* Options */}
              <Grid container spacing={3}>
                {currentQuestion.options.slice(0, 2).map((option, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Button
                      fullWidth
                      variant={selectedOption === index ? "contained" : "outlined"}
                      onClick={() => handleOptionSelect(index)}
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        justifyContent: 'center',
                        textTransform: 'none',
                        fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2rem' },
                        fontWeight: 600,
                        minHeight: { xs: 80, sm: 100 },
                        backgroundColor: selectedOption === index 
                          ? (isCorrect ? 'success.light' : 'error.light') 
                          : 'rgba(255,255,255,0.9)',
                        color: selectedOption === index 
                          ? 'white' 
                          : selectedTheme.textColor,
                        borderColor: selectedOption === index 
                          ? 'transparent' 
                          : selectedTheme.textColor,
                        borderWidth: 3,
                        boxShadow: selectedOption === null ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: selectedOption === null ? 'translateY(-2px)' : 'none',
                          backgroundColor: selectedOption === null 
                            ? 'rgba(255,255,255,1)' 
                            : selectedOption === index 
                              ? (isCorrect ? 'success.light' : 'error.light')
                              : 'rgba(255,255,255,0.9)',
                          borderWidth: 3,
                          boxShadow: selectedOption === null ? '0 6px 16px rgba(0,0,0,0.15)' : 'none'
                        },
                        pointerEvents: selectedOption !== null ? 'none' : 'auto'
                      }}
                      startIcon={
                        selectedOption === index && showFeedback ? (
                          isCorrect ? (
                            <CheckCircleIcon sx={{ fontSize: 30 }} />
                          ) : (
                            <CancelIcon sx={{ fontSize: 30 }} />
                          )
                        ) : null
                      }
                    >
                      {option}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              {isCorrect && showFeedback && (
                <Confetti active={showConfetti} />
              )}

            </Paper>
          </motion.div>
        ) : showRoundComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                backgroundColor: 'white',
                textAlign: 'center'
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{ 
                  fontWeight: 700, 
                  color: selectedTheme.textColor,
                  mb: 2
                }}
              >
                Round {currentRound} Complete!
              </Typography>
              
              <Box sx={{ my: 4 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Current Score: {score} points
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Ready for Round {currentRound + 1}?
                </Typography>
                
                <Button
                  variant="contained"
                  onClick={handleNextRound}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    backgroundColor: selectedTheme.textColor,
                    '&:hover': {
                      backgroundColor: selectedTheme.accentColor,
                    }
                  }}
                >
                  Start Next Round
                </Button>
              </Box>
            </Paper>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                backgroundColor: 'white',
                textAlign: 'center'
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{ 
                  fontWeight: 700, 
                  color: selectedTheme.textColor,
                  mb: 2
                }}
              >
                Quiz Completed!
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  my: 4
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: selectedTheme.backgroundColor,
                    mb: 2
                  }}
                >
                  <StarIcon sx={{ fontSize: 40, color: selectedTheme.textColor }} />
                </Avatar>
                
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: selectedTheme.textColor 
                  }}
                >
                  {score}
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 2
                  }}
                >
                  points earned
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 4
                  }}
                >
                  You answered {score / 10} out of {questions.length} questions correctly!
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleBackToSubject}
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 500,
                      borderColor: selectedTheme.textColor,
                      color: selectedTheme.textColor
                    }}
                  >
                    Back to Topics
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handlePlayAgain}
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 500,
                      backgroundColor: selectedTheme.textColor,
                      '&:hover': {
                        backgroundColor: selectedTheme.accentColor,
                      }
                    }}
                  >
                    Play Again
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default Quiz; 