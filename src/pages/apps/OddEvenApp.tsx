// Odd/Even App - World-Class
import React, { useState } from 'react';
import { Box, Typography, Button, Container, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const GRADIENT = 'linear-gradient(135deg, #f8bbd0 0%, #f48fb1 100%)';

const generateQuestion = () => {
  const number = Math.floor(Math.random() * 20) + 1;
  const isOdd = number % 2 === 1;
  return { number, correctAnswer: isOdd ? 'Odd' : 'Even', options: ['Odd', 'Even'] };
};

const OddEvenApp: React.FC = () => {
  const [question, setQuestion] = useState(generateQuestion());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const handleAnswer = (answer: string) => {
    if (answer === question.correctAnswer) {
      setFeedback('correct');
      setScore(score + 10);
      setTimeout(() => {
        setFeedback(null);
        setQuestion(generateQuestion());
        setQuestionsAnswered(questionsAnswered + 1);
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const pairs = Math.floor(question.number / 2);
  const hasExtra = question.number % 2 === 1;

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <AppNavigation appName="Odd or Even? 🎲" score={score} gradient={GRADIENT} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div key={questionsAnswered} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4, md: 5 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

            <Typography variant="h3" textAlign="center" fontWeight={700} mb={4} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Is this number Odd or Even?
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                <Box sx={{ width: 200, height: 200, borderRadius: 4, background: GRADIENT, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                  <Typography variant="h1" fontWeight={700} color="white" sx={{ fontSize: '5rem' }}>{question.number}</Typography>
                </Box>
              </motion.div>
            </Box>

            {/* Visual representation */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mb: 4 }}>
              {Array(pairs).fill(0).map((_, idx) => (
                <motion.div key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.05 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography sx={{ fontSize: '2rem' }}>🔵</Typography>
                    <Typography sx={{ fontSize: '2rem' }}>🔵</Typography>
                  </Box>
                </motion.div>
              ))}
              {hasExtra && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: pairs * 0.05 }}>
                  <Typography sx={{ fontSize: '2rem' }}>🔴</Typography>
                </motion.div>
              )}
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              {question.options.map((option) => (
                <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={() => handleAnswer(option)} disabled={feedback !== null} sx={{ width: '100%', py: 3, fontSize: '2rem', fontWeight: 700, background: GRADIENT, color: 'white', borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                    {option}
                  </Button>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
              <Box sx={{ background: feedback === 'correct' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderRadius: '50%', width: 200, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', color: 'white' }}>
                {feedback === 'correct' ? <><CheckCircleIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Right!</Typography></> : <><CancelIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Try Again</Typography></>}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default OddEvenApp;
