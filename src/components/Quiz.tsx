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
  onComplete?: (score: number) => void;
}

const QUESTIONS_PER_ROUND = 10;

const Quiz: React.FC<QuizProps> = ({ title, description, questions, category, onComplete }) => {
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
        const finalScore = score + (correct ? 10 : 0);
        if (selectedProfile) {
          updateScore(finalScore);
        }
        // Call onComplete callback if provided
        if (onComplete) {
          onComplete(finalScore);
        }
        speak(`Quiz completed! Your score is ${finalScore} points.`, 1);
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
      component="main"
      sx={{
        width: '100%',
        minHeight: '100vh',
        maxHeight: '100vh',
        backgroundColor: 'background.default',
        position: 'relative',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          padding: { xs: 1, sm: 2 }
        }}
      >
        <PageNavigation 
          profile={selectedProfile}
          theme={selectedTheme}
          showTitle={false}
          onBackClick={handleBackToSubject}
          onHomeClick={handleBackToHome}
          showMuteButton={true}
        />
      </Box>

      <Container 
        maxWidth="md" 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 2, md: 3 },
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          height: '100%'
        }}
      >
        <Typography 
          variant="h3" 
          align="center"
          sx={{ 
            fontWeight: 700, 
            color: selectedTheme.textColor,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }
          }}
        >
          {title}
        </Typography>

        <Box sx={{ width: '100%' }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(255,255,255,0.3)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: selectedTheme.textColor,
              }
            }} 
          />
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              mt: 1, 
              color: selectedTheme.textColor,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Question {currentQuestionIndex + 1} of {QUESTIONS_PER_ROUND}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          {!quizCompleted ? (
            <Paper
              elevation={3}
              sx={{
                width: '100%',
                borderRadius: 3,
                backgroundColor: 'white',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 3 },
                p: { xs: 2, sm: 3 },
                maxHeight: { xs: 'calc(100vh - 200px)', sm: 'calc(100vh - 220px)' },
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {category === 'capitals' ? (
                <Typography 
                  variant="h4" 
                  align="center"
                  sx={{ 
                    fontWeight: 'bold',
                    color: selectedTheme.textColor,
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    lineHeight: 1.4,
                    p: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '2px solid rgba(0,0,0,0.1)'
                  }}
                >
                  {currentQuestion.question}
                </Typography>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    position: 'relative',
                    paddingTop: category === 'flags' ? '60%' : '56.25%',
                    backgroundColor: category === 'flags' ? '#f5f5f5' : 'white',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    component="img"
                    src={currentQuestion.imageUrl}
                    alt={`Question ${currentQuestionIndex + 1}`}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: category === 'flags' ? 'contain' : 'cover',
                      p: category === 'flags' ? 2 : 0
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </Box>
              )}

              <Grid 
                container 
                spacing={2} 
                sx={{ 
                  mt: { xs: 1, sm: 2 },
                  px: { xs: 1, sm: 2 }
                }}
              >
                {currentQuestion.options.slice(0, 2).map((option, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Button
                      fullWidth
                      variant={selectedOption === index ? "contained" : "outlined"}
                      onClick={() => handleOptionSelect(index)}
                      sx={{
                        py: { xs: 1.5, sm: 2 },
                        px: { xs: 2, sm: 3 },
                        borderRadius: 2,
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                        fontWeight: 600,
                        backgroundColor: selectedOption === index 
                          ? (isCorrect ? 'success.light' : 'error.light') 
                          : 'white',
                        color: selectedOption === index ? 'white' : selectedTheme.textColor,
                        borderColor: selectedTheme.textColor,
                        borderWidth: 2,
                        '&:hover': {
                          backgroundColor: selectedOption === null ? 'rgba(255,255,255,0.9)' : undefined,
                          borderWidth: 2
                        }
                      }}
                      startIcon={
                        selectedOption === index && showFeedback ? (
                          isCorrect ? (
                            <CheckCircleIcon sx={{ fontSize: 20 }} />
                          ) : (
                            <CancelIcon sx={{ fontSize: 20 }} />
                          )
                        ) : null
                      }
                    >
                      {option}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          ) : showRoundComplete ? (
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
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
          ) : (
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
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
          )}
        </Box>

        {isCorrect && showFeedback && (
          <Confetti active={showConfetti} />
        )}
      </Container>
    </Box>
  );
};

export default Quiz; 