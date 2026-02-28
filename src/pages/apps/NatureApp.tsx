// Nature Learning App - World-Class
import React, { useState } from 'react';
import { Box, Typography, Button, Container, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const GRADIENT = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';

const NATURE_DATA = [
  { name: 'Tree', emoji: '🌳', category: 'Plant', fact: 'Gives us oxygen' },
  { name: 'Flower', emoji: '🌸', category: 'Plant', fact: 'Beautiful and colorful' },
  { name: 'Sun', emoji: '☀️', category: 'Nature', fact: 'Gives light and warmth' },
  { name: 'Rain', emoji: '🌧️', category: 'Weather', fact: 'Waters the plants' },
  { name: 'Rainbow', emoji: '🌈', category: 'Weather', fact: 'Has seven colors' },
  { name: 'Mountain', emoji: '⛰️', category: 'Landform', fact: 'Very tall and rocky' },
  { name: 'River', emoji: '🏞️', category: 'Water', fact: 'Flows to the ocean' },
  { name: 'Ocean', emoji: '🌊', category: 'Water', fact: 'Home to many fish' },
  { name: 'Butterfly', emoji: '🦋', category: 'Insect', fact: 'Helps pollinate flowers' },
  { name: 'Bee', emoji: '🐝', category: 'Insect', fact: 'Makes honey' },
  { name: 'Cloud', emoji: '☁️', category: 'Weather', fact: 'Made of water vapor' },
  { name: 'Leaf', emoji: '🍃', category: 'Plant', fact: 'Makes food for plants' },
];

const generateQuestion = () => {
  const correctItem = NATURE_DATA[Math.floor(Math.random() * NATURE_DATA.length)];
  const wrongOptions = NATURE_DATA.filter(item => item.name !== correctItem.name).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [correctItem, ...wrongOptions].sort(() => Math.random() - 0.5);

  return {
    question: `What is this?`,
    display: { emoji: correctItem.emoji, category: correctItem.category },
    correctAnswer: correctItem.name,
    options: options.map(o => o.name),
    fact: correctItem.fact
  };
};

const NatureApp: React.FC = () => {
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

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <AppNavigation appName="Nature World 🌿" score={score} gradient={GRADIENT} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div key={questionsAnswered} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4, md: 5 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <Typography variant="h3" textAlign="center" fontWeight={700} mb={4} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {question.question}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, gap: 2 }}>
              <motion.div initial={{ scale: 0, y: 50 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', bounce: 0.5 }}>
                <Typography sx={{ fontSize: '10rem' }}>{question.display.emoji}</Typography>
              </motion.div>
              <Box sx={{ background: alpha('#11998e', 0.1), px: 3, py: 1, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={600} color="text.secondary">
                  Category: {question.display.category}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
              {question.options.map((option) => (
                <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={() => handleAnswer(option)} disabled={feedback !== null} sx={{ width: '100%', py: 3, fontSize: '1.2rem', fontWeight: 700, background: GRADIENT, color: 'white', borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', textTransform: 'none' }}>
                    {option}
                  </Button>
                </motion.div>
              ))}
            </Box>

            <Box sx={{ background: alpha('#11998e', 0.1), borderRadius: 2, p: 2, textAlign: 'center' }}>
              <Typography variant="body1" fontWeight={600} color="text.secondary">
                🌱 Fun Fact: {question.fact}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
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

export default NatureApp;
