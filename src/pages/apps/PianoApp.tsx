// Piano App - World-Class
import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';

const GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

// Piano notes with frequencies
const NOTES = [
  { note: 'C', frequency: 261.63, isBlack: false },
  { note: 'C#', frequency: 277.18, isBlack: true },
  { note: 'D', frequency: 293.66, isBlack: false },
  { note: 'D#', frequency: 311.13, isBlack: true },
  { note: 'E', frequency: 329.63, isBlack: false },
  { note: 'F', frequency: 349.23, isBlack: false },
  { note: 'F#', frequency: 369.99, isBlack: true },
  { note: 'G', frequency: 392.00, isBlack: false },
  { note: 'G#', frequency: 415.30, isBlack: true },
  { note: 'A', frequency: 440.00, isBlack: false },
  { note: 'A#', frequency: 466.16, isBlack: true },
  { note: 'B', frequency: 493.88, isBlack: false },
  { note: 'C', frequency: 523.25, isBlack: false },
];

const PianoApp: React.FC = () => {
  const [score, setScore] = useState(0);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const playNote = (frequency: number, note: string) => {
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.5);

    setActiveNote(note);
    setScore(score + 1);

    setTimeout(() => setActiveNote(null), 200);
  };

  const whiteKeys = NOTES.filter(n => !n.isBlack);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <AppNavigation appName="Piano 🎹" score={score} gradient={GRADIENT} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h2" align="center" fontWeight={700} mb={1} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Piano 🎹
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" mb={4}>
            Tap the keys to play music!
          </Typography>
        </motion.div>

        {/* Piano Container */}
        <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: 4, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ position: 'relative', display: 'flex', height: '300px' }}>
            {/* White Keys */}
            <Box sx={{ display: 'flex', gap: '2px' }}>
              {whiteKeys.map((key, idx) => (
                <motion.div
                  key={`${key.note}-${idx}`}
                  whileTap={{ scale: 0.95 }}
                  style={{ position: 'relative' }}
                >
                  <Box
                    onClick={() => playNote(key.frequency, key.note)}
                    sx={{
                      width: { xs: '50px', sm: '60px', md: '70px' },
                      height: '300px',
                      background: activeNote === key.note ? 'linear-gradient(to bottom, #e0e0e0, #bdbdbd)' : 'linear-gradient(to bottom, #ffffff, #f5f5f5)',
                      border: '2px solid #333',
                      borderRadius: '0 0 8px 8px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      pb: 2,
                      boxShadow: activeNote === key.note ? 'inset 0 5px 10px rgba(0,0,0,0.3)' : '0 5px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.1s ease',
                      '&:hover': {
                        background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)',
                      }
                    }}
                  >
                    <Typography variant="body2" fontWeight={700} color="#333">
                      {key.note}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>

            {/* Black Keys */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', pointerEvents: 'none' }}>
              {NOTES.map((key, idx) => {
                if (!key.isBlack) return <Box key={idx} sx={{ width: { xs: '52px', sm: '62px', md: '72px' } }} />;

                return (
                  <motion.div
                    key={`${key.note}-${idx}`}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      position: 'absolute',
                      left: `calc(${Math.floor(idx * 0.8) * (70 + 2)}px + ${Math.floor(idx * 0.8) * 2}px - 25px)`,
                      pointerEvents: 'auto'
                    }}
                  >
                    <Box
                      onClick={() => playNote(key.frequency, key.note)}
                      sx={{
                        width: { xs: '35px', sm: '40px', md: '50px' },
                        height: '180px',
                        background: activeNote === key.note ? 'linear-gradient(to bottom, #555, #333)' : 'linear-gradient(to bottom, #333, #000)',
                        border: '2px solid #000',
                        borderRadius: '0 0 5px 5px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        pb: 1,
                        boxShadow: activeNote === key.note ? 'inset 0 3px 6px rgba(0,0,0,0.5)' : '0 5px 15px rgba(0,0,0,0.5)',
                        transition: 'all 0.1s ease',
                        '&:hover': {
                          background: 'linear-gradient(to bottom, #444, #111)',
                        }
                      }}
                    >
                      <Typography variant="caption" fontWeight={700} color="white" sx={{ fontSize: '0.7rem' }}>
                        {key.note}
                      </Typography>
                    </Box>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* Instructions */}
        <Box sx={{ mt: 4, background: alpha('#fff', 0.9), borderRadius: 3, p: 3, textAlign: 'center' }}>
          <Typography variant="body1" fontWeight={600}>
            🎵 Tap or click on the piano keys to create beautiful music! 🎶
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PianoApp;
