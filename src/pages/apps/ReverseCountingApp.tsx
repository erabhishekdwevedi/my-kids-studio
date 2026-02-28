// Reverse Counting App (20-1) - World-Class
import React, { useState } from 'react';
import { Box, Typography, Button, Container, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const GRADIENT = 'linear-gradient(135deg, #c8e6c9 0%, #81c784 100%)';

const generateQuestion = () => {
  const start = Math.floor(Math.random() * 11) + 10; // 10-20
  const steps = Math.floor(Math.random() * 3) + 2; // 2-4 steps
  const sequence = [];

  for (let i = 0; i < steps; i++) {
    sequence.push(start - i);
  }

  const correctAnswer = start - steps;
  const options = [correctAnswer];

  while (options.length < 4) {
    const option = correctAnswer + Math.floor(Math.random() * 7) - 3;
    if (option > 0 && !options.includes(option)) {
      options.push(option);
    }
  }

  return {
    sequence,
    correctAnswer,
    options: options.sort(() => Math.random() - 0.5)
  };
};

const ReverseCountingApp: React.FC = () => {
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
      <AppNavigation appName="Reverse Counting 🔃" score={score} gradient={GRADIENT} />

      <Box sx={{ position: 'fixed', inset: 0, background: `radial-gradient(circle at 20% 50%, ${alpha('#c8e6c9', 0.3)} 0%, transparent 50%)`, opacity: 0.8, zIndex: 0 }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        <motion.div key={questionsAnswered} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4, md: 5 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, mb: 4, background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              What comes next?
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
              {question.sequence.map((num, idx) => (
                <motion.div key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.1 }}>
                  <Box sx={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', background: GRADIENT, borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                    <Typography variant="h3" fontWeight={700} color="white">{num}</Typography>
                  </Box>
                </motion.div>
              ))}
              <Box sx={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px dashed #81c784', borderRadius: 3 }}>
                <Typography variant="h3" fontWeight={700} color="#81c784">?</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              {question.options.map((option) => (
                <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={() => handleAnswer(option)} disabled={feedback !== null} sx={{ width: '100%', py: 3, fontSize: '2rem', fontWeight: 700, background: GRADIENT, color: 'white', borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', '&:hover': { background: GRADIENT, boxShadow: '0 12px 32px rgba(0,0,0,0.2)' } }}>
                    {option}
                  </Button>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
              <Box sx={{ background: feedback === 'correct' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderRadius: '50%', width: 200, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', color: 'white' }}>
                {feedback === 'correct' ? <><CheckCircleIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Perfect!</Typography></> : <><CancelIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Try Again</Typography></>}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default ReverseCountingApp;
