// Animals Learning App - World-Class
import React, { useState } from 'react';
import { Box, Typography, Button, Container, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const GRADIENT = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';

const ANIMALS_DATA = [
  { name: 'Lion', emoji: '🦁', sound: 'Roar', habitat: 'Savanna', fact: 'King of the jungle' },
  { name: 'Elephant', emoji: '🐘', sound: 'Trumpet', habitat: 'Forest', fact: 'Largest land animal' },
  { name: 'Monkey', emoji: '🐵', sound: 'Chatter', habitat: 'Jungle', fact: 'Loves bananas' },
  { name: 'Tiger', emoji: '🐯', sound: 'Growl', habitat: 'Jungle', fact: 'Excellent hunter' },
  { name: 'Giraffe', emoji: '🦒', sound: 'Hum', habitat: 'Savanna', fact: 'Tallest animal' },
  { name: 'Zebra', emoji: '🦓', sound: 'Bray', habitat: 'Savanna', fact: 'Black and white stripes' },
  { name: 'Penguin', emoji: '🐧', sound: 'Squawk', habitat: 'Antarctica', fact: 'Cannot fly but swims' },
  { name: 'Dolphin', emoji: '🐬', sound: 'Click', habitat: 'Ocean', fact: 'Very intelligent' },
  { name: 'Whale', emoji: '🐋', sound: 'Sing', habitat: 'Ocean', fact: 'Largest animal' },
  { name: 'Owl', emoji: '🦉', sound: 'Hoot', habitat: 'Forest', fact: 'Nocturnal hunter' },
  { name: 'Eagle', emoji: '🦅', sound: 'Screech', habitat: 'Mountains', fact: 'Sharp vision' },
  { name: 'Rabbit', emoji: '🐰', sound: 'Squeak', habitat: 'Fields', fact: 'Fast runner' },
  { name: 'Fox', emoji: '🦊', sound: 'Bark', habitat: 'Forest', fact: 'Clever animal' },
  { name: 'Bear', emoji: '🐻', sound: 'Growl', habitat: 'Forest', fact: 'Loves honey' },
  { name: 'Panda', emoji: '🐼', sound: 'Bleat', habitat: 'Bamboo Forest', fact: 'Eats bamboo' },
];

const generateQuestion = () => {
  const type = Math.random() > 0.5 ? 'identify' : 'habitat';
  const correctAnimal = ANIMALS_DATA[Math.floor(Math.random() * ANIMALS_DATA.length)];

  // Generate 3 wrong options
  const wrongOptions = ANIMALS_DATA
    .filter(animal => animal.name !== correctAnimal.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = [correctAnimal, ...wrongOptions].sort(() => Math.random() - 0.5);

  if (type === 'identify') {
    return {
      type,
      question: 'Which animal is this?',
      display: { emoji: correctAnimal.emoji, sound: correctAnimal.sound },
      correctAnswer: correctAnimal.name,
      options: options.map(o => o.name),
      fact: correctAnimal.fact
    };
  } else {
    return {
      type,
      question: `Where does ${correctAnimal.name} live?`,
      display: { emoji: correctAnimal.emoji, name: correctAnimal.name },
      correctAnswer: correctAnimal.habitat,
      options: options.map(o => o.habitat),
      fact: correctAnimal.fact
    };
  }
};

const AnimalsApp: React.FC = () => {
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
      <AppNavigation appName="Animal Kingdom 🦁" score={score} gradient={GRADIENT} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div key={questionsAnswered} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4, md: 5 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

            <Typography variant="h3" textAlign="center" fontWeight={700} mb={4} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {question.question}
            </Typography>

            {/* Display Section */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, gap: 2 }}>
              <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', duration: 0.8 }}>
                <Typography sx={{ fontSize: '10rem' }}>{question.display.emoji}</Typography>
              </motion.div>

              {question.type === 'identify' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, background: alpha('#000', 0.05), px: 3, py: 1, borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight={600} color="text.secondary">
                    Says: "{question.display.sound}"
                  </Typography>
                </Box>
              )}

              {question.type === 'habitat' && (
                <Typography variant="h5" fontWeight={600} color="text.secondary">
                  {question.display.name}
                </Typography>
              )}
            </Box>

            {/* Options */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
              {question.options.map((option) => (
                <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={() => handleAnswer(option)} disabled={feedback !== null} sx={{ width: '100%', py: 3, fontSize: '1.2rem', fontWeight: 700, background: GRADIENT, color: 'white', borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', textTransform: 'none' }}>
                    {option}
                  </Button>
                </motion.div>
              ))}
            </Box>

            {/* Fun Fact */}
            <Box sx={{ background: alpha(GRADIENT, 0.1), borderRadius: 2, p: 2, textAlign: 'center' }}>
              <Typography variant="body1" fontWeight={600} color="text.secondary">
                💡 Fun Fact: {question.fact}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
              <Box sx={{ background: feedback === 'correct' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderRadius: '50%', width: 200, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', color: 'white' }}>
                {feedback === 'correct' ? <><CheckCircleIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Amazing!</Typography></> : <><CancelIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Try Again</Typography></>}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default AnimalsApp;
