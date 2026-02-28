// Memory Game App - World-Class
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';

const GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];

const generateCards = (pairCount: number = 6) => {
  const selectedEmojis = EMOJIS.slice(0, pairCount);
  const pairs = [...selectedEmojis, ...selectedEmojis];
  return pairs.sort(() => Math.random() - 0.5).map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
};

const MemoryApp: React.FC = () => {
  const [cards, setCards] = useState(generateCards(6));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, isMatched: true } : card
          ));
          setScore(score + 20);
          setFlippedCards([]);
          setIsChecking(false);
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, isFlipped: false } : card
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
      setMoves(moves + 1);
    }
  }, [flippedCards]);

  const handleCardClick = (index: number) => {
    if (isChecking || flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    setCards(prev => prev.map((card, idx) =>
      idx === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards([...flippedCards, index]);
  };

  const allMatched = cards.every(card => card.isMatched);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <AppNavigation appName="Memory Game 🧠" score={score} gradient={GRADIENT} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: { xs: 3, sm: 4 }, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

          <Typography variant="h3" textAlign="center" fontWeight={700} mb={3} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Find the Matching Pairs!
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">Moves</Typography>
              <Typography variant="h4" fontWeight={700}>{moves}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">Pairs Found</Typography>
              <Typography variant="h4" fontWeight={700}>{cards.filter(c => c.isMatched).length / 2} / 6</Typography>
            </Box>
          </Box>

          {/* Cards Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
              >
                <Box
                  onClick={() => handleCardClick(index)}
                  sx={{
                    aspectRatio: '1',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: card.isMatched ? 'default' : 'pointer',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Back of card */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      background: GRADIENT,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    }}
                  >
                    <Typography sx={{ fontSize: '2rem', color: 'white' }}>?</Typography>
                  </Box>

                  {/* Front of card */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      background: card.isMatched ? alpha('#43e97b', 0.2) : 'white',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: 'rotateY(180deg)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    }}
                  >
                    <Typography sx={{ fontSize: '3rem' }}>{card.emoji}</Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>

          {allMatched && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Box sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', borderRadius: 3, p: 3, textAlign: 'center', color: 'white' }}>
                <Typography variant="h4" fontWeight={700} mb={1}>🎉 Congratulations!</Typography>
                <Typography variant="h6">You completed the game in {moves} moves!</Typography>
              </Box>
            </motion.div>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default MemoryApp;
