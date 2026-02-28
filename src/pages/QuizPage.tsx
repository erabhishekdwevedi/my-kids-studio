import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { gkQuizData } from '../data/gkQuizData';
import Quiz from '../components/Quiz';
import { initSpeech, speak, stop } from '../utils/textToSpeech';
import PageNavigation from '../components/PageNavigation';
import { useApp } from '../contexts/AppContext';
import { useWorld } from '../contexts/WorldContext';

const QuizPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedProfile, selectedTheme } = useApp();
  const { updateCollection } = useWorld();

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

    if (!gkQuizData[category as keyof typeof gkQuizData]) {
      setError(`Invalid quiz category: ${category}`);
      navigate('/subjects');
      return;
    }
    
    // Simulate loading data (could be a real API call in the future)
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Announce the quiz is ready
      if (gkQuizData[category as keyof typeof gkQuizData]) {
        const quizTitle = gkQuizData[category as keyof typeof gkQuizData].title;
        speak(`${quizTitle} is ready. Let's begin!`, 1);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [category, navigate]);

  const handleBack = () => {
    navigate('/subject/gk');
  };

  const handleHome = () => {
    navigate('/');
  };

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
          background: selectedTheme?.gradient || 'white'
        }}
      >
        {selectedProfile && selectedTheme && (
          <Box sx={{ position: 'absolute', top: 16, left: 0, right: 0, px: 3 }}>
            <PageNavigation 
              profile={selectedProfile}
              theme={selectedTheme}
              showTitle={true}
              title="Loading Quiz..."
              onBackClick={handleBack}
              onHomeClick={handleHome}
              showMuteButton={true}
            />
          </Box>
        )}
        
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error || !category || !gkQuizData[category as keyof typeof gkQuizData]) {
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
          background: selectedTheme?.gradient || 'white'
        }}
      >
        {selectedProfile && selectedTheme && (
          <Box sx={{ position: 'absolute', top: 16, left: 0, right: 0, px: 3 }}>
            <PageNavigation 
              profile={selectedProfile}
              theme={selectedTheme}
              showTitle={true}
              title="Error"
              onBackClick={handleBack}
              onHomeClick={handleHome}
              showMuteButton={true}
            />
          </Box>
        )}
        
        <Typography variant="h5" color="error" sx={{ mb: 2 }}>
          {error || 'Quiz not found'}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/subjects')}
          sx={{ 
            p: 2,
            borderRadius: 3,
            fontSize: '1.2rem',
            fontWeight: 600
          }}
        >
          Back to Subjects
        </Button>
      </Box>
    );
  }

  const quizCategoryData = gkQuizData[category as keyof typeof gkQuizData];

  const handleQuizComplete = (score: number) => {
    // Award stars based on performance
    const starsEarned = Math.ceil(score / 10); // 1 star per 10 points
    updateCollection('stars', starsEarned);
  };

  return (
    <Quiz
      title={quizCategoryData.title}
      description={quizCategoryData.description}
      questions={quizCategoryData.questions}
      category={category}
      onComplete={handleQuizComplete}
    />
  );
};

export default QuizPage; 