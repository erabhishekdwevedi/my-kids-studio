// ABC Learning App - World-Class
import React, { useState } from 'react';
import { Box, Typography, Button, Container, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

const ALPHABET_DATA = [
  { letter: 'A', word: 'Apple', emoji: '🍎', sound: 'AY' },
  { letter: 'B', word: 'Ball', emoji: '⚽', sound: 'BEE' },
  { letter: 'C', word: 'Cat', emoji: '🐱', sound: 'SEE' },
  { letter: 'D', word: 'Dog', emoji: '🐶', sound: 'DEE' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', sound: 'EE' },
  { letter: 'F', word: 'Fish', emoji: '🐠', sound: 'EF' },
  { letter: 'G', word: 'Grapes', emoji: '🍇', sound: 'JEE' },
  { letter: 'H', word: 'House', emoji: '🏠', sound: 'AYCH' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', sound: 'EYE' },
  { letter: 'J', word: 'Juice', emoji: '🧃', sound: 'JAY' },
  { letter: 'K', word: 'Kite', emoji: '🪁', sound: 'KAY' },
  { letter: 'L', word: 'Lion', emoji: '🦁', sound: 'EL' },
  { letter: 'M', word: 'Moon', emoji: '🌙', sound: 'EM' },
  { letter: 'N', word: 'Nest', emoji: '🪺', sound: 'EN' },
  { letter: 'O', word: 'Orange', emoji: '🍊', sound: 'OH' },
  { letter: 'P', word: 'Penguin', emoji: '🐧', sound: 'PEE' },
  { letter: 'Q', word: 'Queen', emoji: '👸', sound: 'KYOO' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰', sound: 'AR' },
  { letter: 'S', word: 'Sun', emoji: '☀️', sound: 'ESS' },
  { letter: 'T', word: 'Tree', emoji: '🌳', sound: 'TEE' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', sound: 'YOO' },
  { letter: 'V', word: 'Van', emoji: '🚐', sound: 'VEE' },
  { letter: 'W', word: 'Whale', emoji: '🐋', sound: 'DOUBLE-YOO' },
  { letter: 'X', word: 'Xylophone', emoji: '🎵', sound: 'EX' },
  { letter: 'Y', word: 'Yacht', emoji: '⛵', sound: 'WHY' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', sound: 'ZEE' },
];

const generateQuestion = () => {
  const type = Math.random() > 0.5 ? 'find-letter' : 'find-word';
  const correctItem = ALPHABET_DATA[Math.floor(Math.random() * ALPHABET_DATA.length)];

  // Generate 3 wrong options
  const wrongOptions = ALPHABET_DATA
    .filter(item => item.letter !== correctItem.letter)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = [correctItem, ...wrongOptions].sort(() => Math.random() - 0.5);

  if (type === 'find-letter') {
    return {
      type,
      question: `Which letter is this?`,
      display: { emoji: correctItem.emoji, word: correctItem.word },
      correctAnswer: correctItem.letter,
      options: options.map(o => o.letter)
    };
  } else {
    return {
      type,
      question: `What starts with ${correctItem.letter}?`,
      display: { letter: correctItem.letter, sound: correctItem.sound },
      correctAnswer: correctItem.word,
      options: options.map(o => o.word)
    };
  }
};

const ABCApp: React.FC = () => {
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
      <AppNavigation appName="ABC Learning 🔤" score={score} gradient={GRADIENT} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div key={questionsAnswered} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4, md: 5 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

            <Typography variant="h3" textAlign="center" fontWeight={700} mb={4} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {question.question}
            </Typography>

            {/* Display Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4, flexDirection: 'column', gap: 2 }}>
              {question.type === 'find-letter' ? (
                <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <Typography sx={{ fontSize: '8rem' }}>{question.display.emoji}</Typography>
                  </motion.div>
                  <Typography variant="h4" fontWeight={600} color="text.secondary">
                    {question.display.word}
                  </Typography>
                </>
              ) : (
                <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <Box sx={{ width: 200, height: 200, borderRadius: 4, background: GRADIENT, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                      <Typography variant="h1" fontWeight={700} color="white" sx={{ fontSize: '8rem' }}>{question.display.letter}</Typography>
                    </Box>
                  </motion.div>
                  <Typography variant="h5" fontWeight={600} color="text.secondary">
                    ({question.display.sound})
                  </Typography>
                </>
              )}
            </Box>

            {/* Options */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              {question.options.map((option) => (
                <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={() => handleAnswer(option)} disabled={feedback !== null} sx={{ width: '100%', py: 3, fontSize: '1.5rem', fontWeight: 700, background: GRADIENT, color: 'white', borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', textTransform: 'none' }}>
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
                {feedback === 'correct' ? <><CheckCircleIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Great!</Typography></> : <><CancelIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Try Again</Typography></>}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default ABCApp;
