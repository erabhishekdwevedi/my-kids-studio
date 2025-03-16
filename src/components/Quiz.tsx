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
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { QuizQuestion } from '../data/quizData';
import PageNavigation from './PageNavigation';
import { speak, stop } from '../utils/textToSpeech';

interface QuizProps {
  title: string;
  description: string;
  questions: QuizQuestion[];
  category: string;
}

const Quiz: React.FC<QuizProps> = ({ title, description, questions, category }) => {
  const navigate = useNavigate();
  const { selectedProfile, selectedTheme, updateScore } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

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
    if (selectedOption !== null) return; // Prevent multiple selections
    
    setSelectedOption(optionIndex);
    const correct = optionIndex === questions[currentQuestionIndex].correctAnswerIndex;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Stop current speech
    stop();
    
    // Read feedback
    if (correct) {
      speak("Correct answer! Well done!", 1);
      setScore(prevScore => prevScore + 10);
    } else {
      speak("Oops! That's not correct.", 1);
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
        // Update the user's score in the app context
        if (selectedProfile) {
          updateScore(score + (correct ? 10 : 0));
        }
        
        // Read completion message
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
            Question {currentQuestionIndex + 1} of {questions.length}
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
                mb: 4
              }}
            >
              {/* Question */}
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  fontWeight: 600, 
                  color: selectedTheme.textColor,
                  mb: 3
                }}
              >
                {currentQuestion.question}
              </Typography>

              {/* Image */}
              <Box
                sx={{
                  width: '100%',
                  height: { xs: 200, sm: 250, md: 300 },
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 3,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              >
                <img 
                  src={currentQuestion.imageUrl} 
                  alt={`Question ${currentQuestionIndex + 1}`}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
              </Box>

              {/* Options */}
              <Grid container spacing={2}>
                {currentQuestion.options.map((option, index) => (
                  <Grid item xs={12} key={index}>
                    <Button
                      fullWidth
                      variant={selectedOption === index ? "contained" : "outlined"}
                      onClick={() => handleOptionSelect(index)}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        backgroundColor: selectedOption === index 
                          ? (isCorrect ? 'success.light' : 'error.light') 
                          : 'transparent',
                        color: selectedOption === index 
                          ? 'white' 
                          : selectedTheme.textColor,
                        borderColor: selectedOption === index 
                          ? 'transparent' 
                          : selectedTheme.textColor,
                        '&:hover': {
                          backgroundColor: selectedOption === null 
                            ? 'rgba(0,0,0,0.05)' 
                            : selectedOption === index 
                              ? (isCorrect ? 'success.light' : 'error.light')
                              : 'transparent',
                        },
                        pointerEvents: selectedOption !== null ? 'none' : 'auto'
                      }}
                      startIcon={
                        selectedOption === index && showFeedback ? (
                          isCorrect ? (
                            <CheckCircleIcon />
                          ) : (
                            <CancelIcon />
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