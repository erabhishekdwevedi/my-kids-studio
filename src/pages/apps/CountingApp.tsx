// Counting App (1-20) - World-Class Implementation
// Beautiful, interactive counting with animations

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const GRADIENT = 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)';

// Generate random counting questions
const generateQuestion = () => {
  const type = Math.random() > 0.5 ? 'count' : 'select';
  const count = Math.floor(Math.random() * 20) + 1;

  if (type === 'count') {
    const emojis = ['🍎', '⭐', '🎈', '🌸', '🦋', '🍓', '🌟', '💎', '🎨', '🎵'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const items = Array(count).fill(emoji);

    return {
      type: 'count',
      question: 'How many items are there?',
      items,
      correctAnswer: count,
      options: generateOptions(count)
    };
  } else {
    return {
      type: 'select',
      question: `Select ${count}`,
      items: [],
      correctAnswer: count,
      options: generateOptions(count)
    };
  }
};

const generateOptions = (correct: number) => {
  const options = [correct];
  while (options.length < 4) {
    const option = Math.floor(Math.random() * 20) + 1;
    if (!options.includes(option)) {
      options.push(option);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};

const CountingApp: React.FC = () => {
  const [question, setQuestion] = useState(generateQuestion());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const handleAnswer = (answer: number) => {
    if (answer === question.correctAnswer) {
      setFeedback('correct');
      setScore(score + 10);

      // Celebration sound/animation
      setTimeout(() => {
        setFeedback(null);
        setQuestion(generateQuestion());
        setQuestionsAnswered(questionsAnswered + 1);
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        position: 'relative'
      }}
    >
      {/* Navigation */}
      <AppNavigation appName="Counting 1-20" score={score} gradient={GRADIENT} />

      {/* Background decoration */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 50%, ${alpha('#667eea', 0.3)} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${alpha('#f093fb', 0.3)} 0%, transparent 50%)
          `,
          opacity: 0.8,
          zIndex: 0
        }}
      />

      {/* Main Content */}
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
          py: 4
        }}
      >
        {/* Question Card */}
        <motion.div
          key={questionsAnswered}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            sx={{
              background: alpha('#ffffff', 0.95),
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
              p: { xs: 3, sm: 4, md: 5 },
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              border: `2px solid ${alpha('#ffffff', 0.5)}`
            }}
          >
            {/* Question */}
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                mb: 4,
                background: GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
              }}
            >
              {question.question}
            </Typography>

            {/* Items to count */}
            {question.items.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                  mb: 4,
                  minHeight: 150
                }}
              >
                {question.items.map((emoji, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05, type: 'spring' }}
                  >
                    <Typography
                      sx={{
                        fontSize: '3rem',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                      }}
                    >
                      {emoji}
                    </Typography>
                  </motion.div>
                ))}
              </Box>
            )}

            {/* Answer Options */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                mt: 4
              }}
            >
              {question.options.map((option) => (
                <motion.div
                  key={option}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => handleAnswer(option)}
                    disabled={feedback !== null}
                    sx={{
                      width: '100%',
                      py: 3,
                      fontSize: '2rem',
                      fontWeight: 700,
                      background: GRADIENT,
                      color: 'white',
                      borderRadius: 3,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      '&:hover': {
                        background: GRADIENT,
                        boxShadow: '0 12px 32px rgba(0,0,0,0.2)'
                      },
                      '&:disabled': {
                        opacity: 0.6
                      }
                    }}
                  >
                    {option}
                  </Button>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Feedback Animation */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000
              }}
            >
              <Box
                sx={{
                  background: feedback === 'correct'
                    ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                    : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  borderRadius: '50%',
                  width: 200,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  color: 'white'
                }}
              >
                {feedback === 'correct' ? (
                  <>
                    <CheckCircleIcon sx={{ fontSize: 80 }} />
                    <Typography variant="h4" fontWeight={700} mt={1}>
                      Great!
                    </Typography>
                  </>
                ) : (
                  <>
                    <CancelIcon sx={{ fontSize: 80 }} />
                    <Typography variant="h4" fontWeight={700} mt={1}>
                      Try Again
                    </Typography>
                  </>
                )}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default CountingApp;
