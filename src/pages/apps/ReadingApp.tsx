// Reading Practice App - World-Class
import React, { useState } from 'react';
import { Box, Typography, Button, Container, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

const READING_WORDS = [
  // Simple 3-letter words
  { word: 'CAT', image: '🐱', hint: 'A pet that meows' },
  { word: 'DOG', image: '🐶', hint: 'A pet that barks' },
  { word: 'SUN', image: '☀️', hint: 'Shines in the day' },
  { word: 'BUS', image: '🚌', hint: 'Takes you to school' },
  { word: 'CUP', image: '☕', hint: 'You drink from this' },
  { word: 'HAT', image: '🎩', hint: 'You wear on your head' },
  { word: 'BAT', image: '🦇', hint: 'Flies at night' },
  { word: 'BEE', image: '🐝', hint: 'Makes honey' },

  // Simple 4-letter words
  { word: 'BALL', image: '⚽', hint: 'You kick this' },
  { word: 'BIRD', image: '🐦', hint: 'Can fly in the sky' },
  { word: 'TREE', image: '🌳', hint: 'Has leaves and trunk' },
  { word: 'FISH', image: '🐠', hint: 'Swims in water' },
  { word: 'MOON', image: '🌙', hint: 'Shines at night' },
  { word: 'BOOK', image: '📚', hint: 'You read this' },
  { word: 'STAR', image: '⭐', hint: 'Twinkles in sky' },
  { word: 'CAKE', image: '🎂', hint: 'Sweet birthday treat' },
];

const generateQuestion = () => {
  const correctWord = READING_WORDS[Math.floor(Math.random() * READING_WORDS.length)];

  // Scramble letters
  const scrambled = correctWord.word.split('').sort(() => Math.random() - 0.5);

  // Generate wrong options by mixing letters
  const wrongOptions: string[] = [];
  while (wrongOptions.length < 3) {
    const wrong = correctWord.word.split('')
      .map((letter, idx) => {
        if (Math.random() > 0.5) {
          const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
          return randomLetter;
        }
        return letter;
      })
      .join('');

    if (wrong !== correctWord.word && !wrongOptions.includes(wrong)) {
      wrongOptions.push(wrong);
    }
  }

  const options = [correctWord.word, ...wrongOptions].sort(() => Math.random() - 0.5);

  return {
    display: { image: correctWord.image, hint: correctWord.hint },
    scrambled,
    correctAnswer: correctWord.word,
    options
  };
};

const ReadingApp: React.FC = () => {
  const [question, setQuestion] = useState(generateQuestion());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (answer: string) => {
    if (answer === question.correctAnswer) {
      setFeedback('correct');
      setScore(score + 10);
      setTimeout(() => {
        setFeedback(null);
        setQuestion(generateQuestion());
        setQuestionsAnswered(questionsAnswered + 1);
        setShowHint(false);
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <AppNavigation appName="Reading Practice 📖" score={score} gradient={GRADIENT} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div key={questionsAnswered} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4, md: 5 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

            <Typography variant="h3" textAlign="center" fontWeight={700} mb={4} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              What word is this?
            </Typography>

            {/* Image Display */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, gap: 2 }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                <Typography sx={{ fontSize: '10rem' }}>{question.display.image}</Typography>
              </motion.div>

              {/* Scrambled letters */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {question.scrambled.map((letter, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Box sx={{
                      width: 50,
                      height: 50,
                      background: GRADIENT,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}>
                      {letter}
                    </Box>
                  </motion.div>
                ))}
              </Box>

              {/* Hint button */}
              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outlined"
                size="small"
                sx={{ textTransform: 'none', borderRadius: 2 }}
              >
                {showHint ? 'Hide Hint' : 'Show Hint'} 💡
              </Button>

              {showHint && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Box sx={{ background: alpha('#667eea', 0.1), px: 3, py: 1, borderRadius: 2 }}>
                    <Typography variant="body1" fontWeight={600} color="text.secondary">
                      Hint: {question.display.hint}
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </Box>

            {/* Options */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              {question.options.map((option) => (
                <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={() => handleAnswer(option)} disabled={feedback !== null} sx={{ width: '100%', py: 3, fontSize: '1.5rem', fontWeight: 700, background: GRADIENT, color: 'white', borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', textTransform: 'none', letterSpacing: '0.1em' }}>
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
                {feedback === 'correct' ? <><CheckCircleIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Perfect!</Typography></> : <><CancelIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Try Again</Typography></>}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default ReadingApp;
