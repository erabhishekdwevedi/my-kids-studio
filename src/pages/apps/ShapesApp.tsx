// Shapes Learning App - World-Class
import React, { useState } from 'react';
import { Box, Typography, Button, Container, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const GRADIENT = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';

const SHAPES_DATA = [
  { name: 'Circle', emoji: '⭕', sides: 0, fact: 'Has no corners', color: '#FF6B6B' },
  { name: 'Square', emoji: '🟥', sides: 4, fact: 'All sides are equal', color: '#4ECDC4' },
  { name: 'Triangle', emoji: '🔺', sides: 3, fact: 'Has three corners', color: '#95E1D3' },
  { name: 'Rectangle', emoji: '🟦', sides: 4, fact: 'Has 4 right angles', color: '#F38181' },
  { name: 'Star', emoji: '⭐', sides: 5, fact: 'Twinkles in the sky', color: '#FFD93D' },
  { name: 'Heart', emoji: '❤️', sides: 0, fact: 'Symbol of love', color: '#FF6B9D' },
  { name: 'Diamond', emoji: '💎', sides: 4, fact: 'Precious and shiny', color: '#6BCB77' },
  { name: 'Hexagon', emoji: '⬡', sides: 6, fact: 'Like a honeycomb', color: '#4D96FF' },
];

// SVG Shape Components
const ShapeDisplay: React.FC<{ shape: typeof SHAPES_DATA[0] }> = ({ shape }) => {
  const renderShape = () => {
    switch (shape.name) {
      case 'Circle':
        return <circle cx="100" cy="100" r="80" fill={shape.color} />;
      case 'Square':
        return <rect x="20" y="20" width="160" height="160" fill={shape.color} />;
      case 'Triangle':
        return <polygon points="100,20 20,180 180,180" fill={shape.color} />;
      case 'Rectangle':
        return <rect x="20" y="50" width="160" height="100" fill={shape.color} />;
      case 'Star':
        return <polygon points="100,20 120,80 180,80 135,120 155,180 100,140 45,180 65,120 20,80 80,80" fill={shape.color} />;
      case 'Heart':
        return <path d="M100,170 C100,170 20,120 20,80 C20,50 40,30 60,30 C80,30 90,40 100,55 C110,40 120,30 140,30 C160,30 180,50 180,80 C180,120 100,170 100,170" fill={shape.color} />;
      case 'Diamond':
        return <polygon points="100,20 180,100 100,180 20,100" fill={shape.color} />;
      case 'Hexagon':
        return <polygon points="100,20 160,60 160,140 100,180 40,140 40,60" fill={shape.color} />;
      default:
        return null;
    }
  };

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {renderShape()}
    </svg>
  );
};

const generateQuestion = () => {
  const type = Math.random() > 0.5 ? 'identify' : 'sides';
  const correctShape = SHAPES_DATA[Math.floor(Math.random() * SHAPES_DATA.length)];
  const wrongOptions = SHAPES_DATA.filter(shape => shape.name !== correctShape.name).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [correctShape, ...wrongOptions].sort(() => Math.random() - 0.5);

  if (type === 'identify') {
    return {
      type,
      question: 'What shape is this?',
      display: correctShape,
      correctAnswer: correctShape.name,
      options: options.map(o => o.name),
      fact: correctShape.fact
    };
  } else {
    return {
      type,
      question: `How many sides does ${correctShape.name} have?`,
      display: correctShape,
      correctAnswer: correctShape.sides === 0 ? 'No sides' : correctShape.sides.toString(),
      options: options.map(o => o.sides === 0 ? 'No sides' : o.sides.toString()),
      fact: correctShape.fact
    };
  }
};

const ShapesApp: React.FC = () => {
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
      <AppNavigation appName="Shape Master 🔷" score={score} gradient={GRADIENT} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div key={questionsAnswered} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4, md: 5 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <Typography variant="h3" textAlign="center" fontWeight={700} mb={4} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {question.question}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, gap: 2 }}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.8 }}
              >
                <Box sx={{ background: 'white', borderRadius: 4, p: 2, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                  <ShapeDisplay shape={question.display} />
                </Box>
              </motion.div>

              <Typography variant="h5" fontWeight={600} color="text.secondary">
                {question.display.name}
              </Typography>
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

            <Box sx={{ background: alpha('#f093fb', 0.1), borderRadius: 2, p: 2, textAlign: 'center' }}>
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
                {feedback === 'correct' ? <><CheckCircleIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Excellent!</Typography></> : <><CancelIcon sx={{ fontSize: 80 }} /><Typography variant="h4" fontWeight={700} mt={1}>Try Again</Typography></>}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default ShapesApp;
