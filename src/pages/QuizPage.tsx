import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { quizData } from '../data/quizData';
import Quiz from '../components/Quiz';
import { initSpeech, speak, stop } from '../utils/textToSpeech';
import MuteButton from '../components/MuteButton';

const QuizPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize text-to-speech on component mount
  useEffect(() => {
    initSpeech();
    
    // Clean up speech when component unmounts
    return () => {
      stop();
    };
  }, []);

  // Validate the category and redirect if invalid
  useEffect(() => {
    if (!category) {
      setError('No category specified');
      navigate('/subjects');
      return;
    }

    if (!quizData[category as keyof typeof quizData]) {
      setError(`Invalid quiz category: ${category}`);
      navigate('/subjects');
      return;
    }
    
    // Simulate loading data (could be a real API call in the future)
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Announce the quiz is ready
      if (quizData[category as keyof typeof quizData]) {
        const quizTitle = quizData[category as keyof typeof quizData].title;
        speak(`${quizTitle} is ready. Let's begin!`, 1);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [category, navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Quiz...
        </Typography>
        
        {/* Mute Button */}
        <MuteButton position="absolute" bottom={16} right={16} />
      </Box>
    );
  }

  if (error || !category || !quizData[category as keyof typeof quizData]) {
    // This should not happen due to the redirect in useEffect
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Typography variant="h5" color="error">
          {error || 'Quiz not found'}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/subjects')}
          sx={{ mt: 2 }}
        >
          Back to Subjects
        </Button>
        
        {/* Mute Button */}
        <MuteButton position="absolute" bottom={16} right={16} />
      </Box>
    );
  }

  const quizCategoryData = quizData[category as keyof typeof quizData];

  return (
    <Quiz
      title={quizCategoryData.title}
      description={quizCategoryData.description}
      questions={quizCategoryData.questions}
      category={category}
    />
  );
};

export default QuizPage; 