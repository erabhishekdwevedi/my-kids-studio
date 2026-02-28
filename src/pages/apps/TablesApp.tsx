// Multiplication Tables App - World-Class
import React, { useState } from 'react';
import { Box, Typography, Button, Container, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const GRADIENT = 'linear-gradient(135deg, #ffecb3 0%, #ffd54f 100%)';

const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const correctAnswer = num1 * num2;
  const options = [correctAnswer];

  while (options.length < 4) {
    const option = (Math.floor(Math.random() * 10) + 1) * (Math.floor(Math.random() * 10) + 1);
    if (!options.includes(option)) {
      options.push(option);
    }
  }

  return { num1, num2, correctAnswer, options: options.sort(() => Math.random() - 0.5) };
};

const TablesApp: React.FC = () => {
  const [question, setQuestion] = useState(generateQuestion());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const handleAnswer = (answer: number) => {
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

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <AppNavigation appName="Times Tables ✖️" score={score} gradient={GRADIENT} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div key={questionsAnswered} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4, md: 5 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mb: 5 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                <Box sx={{ width: 120, height: 120, borderRadius: 3, background: GRADIENT, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 32px rgba(0,0,0,0.2)' }}>
                  <Typography variant="h1" fontWeight={700} color="white">{question.num1}</Typography>
                </Box>
              </motion.div>

              <Typography variant="h1" fontWeight={700} sx={{ color: '#ffd54f' }}>×</Typography>

              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                <Box sx={{ width: 120, height: 120, borderRadius: 3, background: GRADIENT, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 32px rgba(0,0,0,0.2)' }}>
                  <Typography variant="h1" fontWeight={700} color="white">{question.num2}</Typography>
                </Box>
              </motion.div>
            </Box>

            <Typography variant="h2" textAlign="center" fontWeight={700} mb={4} sx={{ color: '#666' }}>= ?</Typography>

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
                {feedback === 'correct' ? <><CheckCircleIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Excellent!</Typography></> : <><CancelIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Try Again</Typography></>}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default TablesApp;
