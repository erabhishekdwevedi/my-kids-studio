// Space Learning App - World-Class
import React, { useState } from 'react';
import { Box, Typography, Button, Container, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const GRADIENT = 'linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%)';

const SPACE_DATA = [
  { name: 'Sun', emoji: '☀️', type: 'Star', fact: 'Center of our solar system', question: 'What provides light and heat?' },
  { name: 'Earth', emoji: '🌍', type: 'Planet', fact: 'Our home planet', question: 'Which planet do we live on?' },
  { name: 'Moon', emoji: '🌙', type: 'Satellite', fact: 'Orbits around Earth', question: 'What orbits around Earth?' },
  { name: 'Mars', emoji: '🔴', type: 'Planet', fact: 'The red planet', question: 'Which planet is red?' },
  { name: 'Saturn', emoji: '🪐', type: 'Planet', fact: 'Has beautiful rings', question: 'Which planet has rings?' },
  { name: 'Jupiter', emoji: '🌕', type: 'Planet', fact: 'Largest planet', question: 'Which is the largest planet?' },
  { name: 'Rocket', emoji: '🚀', type: 'Vehicle', fact: 'Takes astronauts to space', question: 'What takes us to space?' },
  { name: 'Astronaut', emoji: '👨‍🚀', type: 'Person', fact: 'Explores space', question: 'Who explores space?' },
  { name: 'Satellite', emoji: '🛰️', type: 'Technology', fact: 'Orbits Earth', question: 'What helps with TV and phones?' },
  { name: 'Comet', emoji: '☄️', type: 'Object', fact: 'Has a glowing tail', question: 'What has a glowing tail?' },
  { name: 'Star', emoji: '⭐', type: 'Celestial', fact: 'Twinkles in the night', question: 'What twinkles at night?' },
  { name: 'Galaxy', emoji: '🌌', type: 'System', fact: 'Billions of stars together', question: 'What contains billions of stars?' },
];

const generateQuestion = () => {
  const type = Math.random() > 0.5 ? 'identify' : 'type';
  const correctItem = SPACE_DATA[Math.floor(Math.random() * SPACE_DATA.length)];

  // Generate 3 wrong options
  const wrongOptions = SPACE_DATA
    .filter(item => item.name !== correctItem.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = [correctItem, ...wrongOptions].sort(() => Math.random() - 0.5);

  if (type === 'identify') {
    return {
      type,
      question: correctItem.question,
      display: { emoji: correctItem.emoji, type: correctItem.type },
      correctAnswer: correctItem.name,
      options: options.map(o => o.name),
      fact: correctItem.fact
    };
  } else {
    return {
      type,
      question: `What type is ${correctItem.name}?`,
      display: { emoji: correctItem.emoji, name: correctItem.name },
      correctAnswer: correctItem.type,
      options: options.map(o => o.type),
      fact: correctItem.fact
    };
  }
};

const SpaceApp: React.FC = () => {
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
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000428 0%, #004e92 50%, #1a1a2e 100%)' }}>
      <AppNavigation appName="Space Explorer 🚀" score={score} gradient={GRADIENT} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div key={questionsAnswered} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4, md: 5 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

            <Typography variant="h3" textAlign="center" fontWeight={700} mb={4} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {question.question}
            </Typography>

            {/* Display Section with orbiting animation */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, gap: 2, position: 'relative' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ scale: { type: 'spring', duration: 0.8 }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
              >
                <Box sx={{ width: 250, height: 250, borderRadius: '50%', background: 'linear-gradient(135deg, #000428 0%, #004e92 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(78, 146, 255, 0.5)', position: 'relative' }}>
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                    <Typography sx={{ fontSize: '8rem' }}>{question.display.emoji}</Typography>
                  </motion.div>

                  {/* Orbiting stars */}
                  {[0, 120, 240].map((angle, idx) => (
                    <motion.div
                      key={idx}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                      }}
                      animate={{
                        rotate: angle,
                        x: Math.cos((angle * Math.PI) / 180) * 140 - 10,
                        y: Math.sin((angle * Math.PI) / 180) * 140 - 10,
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    >
                      <Typography sx={{ fontSize: '1.5rem' }}>⭐</Typography>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>

              {question.type === 'identify' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, background: alpha('#4a00e0', 0.1), px: 3, py: 1, borderRadius: 2 }}>
                  <Typography variant="h6" fontWeight={600} color="text.secondary">
                    Type: {question.display.type}
                  </Typography>
                </Box>
              )}

              {question.type === 'type' && (
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
            <Box sx={{ background: alpha('#4a00e0', 0.1), borderRadius: 2, p: 2, textAlign: 'center' }}>
              <Typography variant="body1" fontWeight={600} color="text.secondary">
                🌟 Fun Fact: {question.fact}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
              <Box sx={{ background: feedback === 'correct' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderRadius: '50%', width: 200, height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', color: 'white' }}>
                {feedback === 'correct' ? <><CheckCircleIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Stellar!</Typography></> : <><CancelIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Try Again</Typography></>}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default SpaceApp;
