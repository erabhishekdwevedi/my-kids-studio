// Music Forest V2 - Modern Apple-Quality Design
// Glassmorphism, animated sound waves, glow effects

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Container, alpha } from '@mui/material';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useWorld } from '../../contexts/WorldContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// 21-key piano with Western and Hindi notation
const PIANO_NOTES = [
  // Octave 3
  { note: 'C3', label: 'Do', hindi: 'सा', color: '#FF6B9D', emoji: '🎵', type: 'white' as const, freq: 130.81 },
  { note: 'C#3', label: 'Do#', hindi: 'रे♭', color: '#000000', emoji: '🎶', type: 'black' as const, freq: 138.59 },
  { note: 'D3', label: 'Re', hindi: 'रे', color: '#FFA07A', emoji: '🎵', type: 'white' as const, freq: 146.83 },
  { note: 'D#3', label: 'Re#', hindi: 'ग♭', color: '#000000', emoji: '🎶', type: 'black' as const, freq: 155.56 },
  { note: 'E3', label: 'Mi', hindi: 'ग', color: '#FFD700', emoji: '🎵', type: 'white' as const, freq: 164.81 },
  { note: 'F3', label: 'Fa', hindi: 'म', color: '#98D8C8', emoji: '🎶', type: 'white' as const, freq: 174.61 },
  { note: 'F#3', label: 'Fa#', hindi: 'म॑', color: '#000000', emoji: '🎵', type: 'black' as const, freq: 185.00 },
  { note: 'G3', label: 'Sol', hindi: 'प', color: '#6BCF7F', emoji: '🎶', type: 'white' as const, freq: 196.00 },
  { note: 'G#3', label: 'Sol#', hindi: 'ध♭', color: '#000000', emoji: '🎵', type: 'black' as const, freq: 207.65 },
  { note: 'A3', label: 'La', hindi: 'ध', color: '#5DADE2', emoji: '🎶', type: 'white' as const, freq: 220.00 },
  { note: 'A#3', label: 'La#', hindi: 'नि♭', color: '#000000', emoji: '🎵', type: 'black' as const, freq: 233.08 },
  { note: 'B3', label: 'Si', hindi: 'नि', color: '#BB8FCE', emoji: '🎶', type: 'white' as const, freq: 246.94 },
  // Octave 4 (middle C)
  { note: 'C4', label: 'Do', hindi: 'सा', color: '#FF85A8', emoji: '🎵', type: 'white' as const, freq: 261.63 },
  { note: 'C#4', label: 'Do#', hindi: 'रे♭', color: '#000000', emoji: '🎶', type: 'black' as const, freq: 277.18 },
  { note: 'D4', label: 'Re', hindi: 'रे', color: '#FFB695', emoji: '🎵', type: 'white' as const, freq: 293.66 },
  { note: 'D#4', label: 'Re#', hindi: 'ग♭', color: '#000000', emoji: '🎶', type: 'black' as const, freq: 311.13 },
  { note: 'E4', label: 'Mi', hindi: 'ग', color: '#FFE44D', emoji: '🎵', type: 'white' as const, freq: 329.63 },
  { note: 'F4', label: 'Fa', hindi: 'म', color: '#B0E8DC', emoji: '🎶', type: 'white' as const, freq: 349.23 },
  { note: 'F#4', label: 'Fa#', hindi: 'म॑', color: '#000000', emoji: '🎵', type: 'black' as const, freq: 369.99 },
  { note: 'G4', label: 'Sol', hindi: 'प', color: '#85DD96', emoji: '🎶', type: 'white' as const, freq: 392.00 },
  { note: 'G#4', label: 'Sol#', hindi: 'ध♭', color: '#000000', emoji: '🎵', type: 'black' as const, freq: 415.30 }
];

// Simple melodies to learn (using octave 4 notes)
const MELODIES = [
  { name: 'Twinkle Star', notes: ['C4', 'C4', 'G4', 'G4', 'A3', 'A3', 'G4'], emoji: '⭐', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', accentColor: '#667eea' },
  { name: 'Happy Song', notes: ['C4', 'D4', 'E4', 'C4', 'E4', 'C4'], emoji: '😊', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', accentColor: '#f093fb' },
  { name: 'Rainbow', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A3', 'B3', 'C4'], emoji: '🌈', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', accentColor: '#4facfe' }
];

// GRAND PIANO Sound Engine - Professional Quality
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

const playPianoNote = (frequency: number, duration: number = 2.0) => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Create multiple oscillators for rich grand piano sound
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    // Fundamental and harmonics with realistic piano ratios
    const partials = [
      { freq: frequency * 1, gain: 1.0 },        // Fundamental
      { freq: frequency * 2, gain: 0.5 },        // 1st overtone
      { freq: frequency * 3, gain: 0.3 },        // 2nd overtone
      { freq: frequency * 4, gain: 0.2 },        // 3rd overtone
      { freq: frequency * 5, gain: 0.15 },       // 4th overtone
      { freq: frequency * 6, gain: 0.1 },        // 5th overtone
      { freq: frequency * 1.001, gain: 0.4 },    // Slight detune for warmth
      { freq: frequency * 0.999, gain: 0.4 }     // Slight detune for chorus
    ];

    // Create oscillators for each partial
    partials.forEach(({ freq, gain: gainAmount }) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine'; // Pure sine for piano-like tone
      osc.frequency.setValueAtTime(freq, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);

      oscillators.push(osc);
      gains.push(gain);
      osc.connect(gain);
    });

    // High-quality filter for brightness
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(8000, now);
    filter.Q.setValueAtTime(0.5, now);

    // Reverb simulation with delay
    const delay = ctx.createDelay();
    delay.delayTime.setValueAtTime(0.03, now);
    const delayGain = ctx.createGain();
    delayGain.gain.setValueAtTime(0.15, now);

    // Master gain
    const masterGain = ctx.createGain();

    // Professional compressor
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-24, now);
    compressor.knee.setValueAtTime(30, now);
    compressor.ratio.setValueAtTime(12, now);
    compressor.attack.setValueAtTime(0.003, now);
    compressor.release.setValueAtTime(0.25, now);

    // Connect gains to filter
    gains.forEach(gain => gain.connect(filter));

    // Create wet/dry mix for reverb
    filter.connect(masterGain);
    filter.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(masterGain);

    // Master to compressor to destination
    masterGain.connect(compressor);
    compressor.connect(ctx.destination);

    // GRAND PIANO ADSR envelope - Very realistic
    const attackTime = 0.001;      // Instant attack
    const decayTime = 0.2;          // Natural decay
    const sustainLevel = 0.3;       // Sustain level
    const releaseTime = 1.5;        // Long, natural release

    // Apply envelope to each gain with slight variations
    gains.forEach((gain, index) => {
      const partialGain = partials[index].gain * 0.2; // Overall volume scaling
      const randomVariation = 0.95 + Math.random() * 0.1; // Natural variation

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(partialGain * randomVariation, now + attackTime);
      gain.gain.exponentialRampToValueAtTime(partialGain * sustainLevel * randomVariation, now + attackTime + decayTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    });

    // Master gain envelope
    masterGain.gain.setValueAtTime(1, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Dynamic filter sweep for realism
    filter.frequency.setValueAtTime(8000, now);
    filter.frequency.exponentialRampToValueAtTime(2000, now + duration * 0.5);

    // Start and stop all oscillators
    const stopTime = now + duration;
    oscillators.forEach(osc => {
      osc.start(now);
      osc.stop(stopTime);
    });

  } catch (error) {
    console.warn('Audio playback failed:', error);
  }
};


// Piano Key Component - Realistic piano keys for kids
interface PianoKeyProps {
  note: typeof PIANO_NOTES[0];
  onPlay: (note: string) => void;
  index: number;
  isHighlighted?: boolean;
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, onPlay, index, isHighlighted = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const isBlackKey = note.type === 'black';
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.03, type: 'spring' }
    });
  }, [controls, index]);

  const handlePlay = () => {
    setIsPlaying(true);
    setShowNote(true);

    // Play sound
    playPianoNote(note.freq, 0.5);

    // Call parent handler
    onPlay(note.note);

    setTimeout(() => {
      setIsPlaying(false);
      setShowNote(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ y: isBlackKey ? -8 : -10 }}
      whileTap={{ y: isBlackKey ? 4 : 6 }}
      onClick={handlePlay}
      style={{
        height: '100%',
        width: '100%',
        cursor: 'pointer'
      }}
    >
      {/* Glow effect when playing or highlighted */}
      <AnimatePresence>
        {(isPlaying || isHighlighted) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: -10,
              background: `radial-gradient(circle, ${note.color}, transparent)`,
              borderRadius: isBlackKey ? 8 : 12,
              filter: 'blur(20px)',
              zIndex: -1,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating note visual when key is pressed */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -150, opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '3rem',
              pointerEvents: 'none',
              zIndex: 100,
              filter: `drop-shadow(0 0 10px ${note.color})`
            }}
          >
            {note.emoji}
          </motion.div>
        )}
      </AnimatePresence>

      <Box
        sx={{
          height: '100%',
          width: '100%',
          background: isBlackKey
            ? `linear-gradient(180deg, #2a2a2a 0%, #000000 100%)`
            : isPlaying || isHighlighted
            ? `linear-gradient(180deg, ${alpha(note.color, 0.2)} 0%, #ffffff 70%, #fafafa 100%)`
            : 'linear-gradient(180deg, #ffffff 0%, #fefefe 70%, #f8f8f8 100%)',
          border: isBlackKey
            ? 'none'
            : isHighlighted
            ? `3px solid ${note.color}`
            : '1px solid rgba(0,0,0,0.08)',
          borderRadius: isBlackKey ? '0 0 8px 8px' : '0 0 12px 12px',
          boxShadow: isPlaying
            ? isBlackKey
              ? `0 12px 40px ${alpha(note.color, 0.6)}, inset 0 -8px 16px rgba(0,0,0,0.6)`
              : `0 12px 40px ${alpha(note.color, 0.5)}, inset 0 -6px 12px rgba(0,0,0,0.15)`
            : isBlackKey
            ? 'inset 0 -8px 16px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4)'
            : 'inset 0 -6px 12px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          pb: isBlackKey ? 2 : 3,
          gap: 1,
          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:active': {
            transform: isBlackKey ? 'translateY(4px)' : 'translateY(6px)',
            boxShadow: isBlackKey
              ? 'inset 0 -4px 12px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.3)'
              : 'inset 0 -3px 8px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.04)'
          }
        }}
      >
        {/* Western notation */}
        <Typography
          sx={{
            fontSize: isBlackKey ? '0.9rem' : '1.1rem',
            fontWeight: 700,
            color: isBlackKey ? '#e0e0e0' : isHighlighted ? note.color : '#555',
            textShadow: isBlackKey ? '0 2px 6px rgba(0,0,0,0.6)' : '0 1px 2px rgba(0,0,0,0.1)',
            userSelect: 'none',
            letterSpacing: '0.02em',
            mb: 0.5
          }}
        >
          {note.label}
        </Typography>

        {/* Hindi notation */}
        <Typography
          sx={{
            fontSize: isBlackKey ? '1.1rem' : '1.5rem',
            fontWeight: 600,
            color: isBlackKey ? '#fff' : isHighlighted ? note.color : '#333',
            textShadow: isBlackKey ? '0 2px 6px rgba(0,0,0,0.6)' : '0 1px 2px rgba(0,0,0,0.1)',
            userSelect: 'none'
          }}
        >
          {note.hindi}
        </Typography>

        {/* Note emoji (only on white keys) */}
        {!isBlackKey && (
          <motion.div
            animate={isPlaying ? { scale: 1.3, rotate: 10 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Typography sx={{ fontSize: '1.5rem', lineHeight: 1, userSelect: 'none', mt: 0.5 }}>
              {note.emoji}
            </Typography>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

// Helper function to position black keys perfectly between white keys
const getBlackKeyPosition = (note: string): string => {
  const whiteKeyWidth = 100 / 12; // 12 white keys take 100% width
  const blackKeyWidth = 6; // Black key width percentage
  const offset = blackKeyWidth / 2; // Center black key (half its width)

  const positions: Record<string, string> = {
    // Octave 3 - Position between white keys (centered on the gap)
    'C#3': `calc(${whiteKeyWidth * 0.75}% - ${offset}%)`,    // Between C3 (0) and D3 (1)
    'D#3': `calc(${whiteKeyWidth * 1.75}% - ${offset}%)`,    // Between D3 (1) and E3 (2)
    'F#3': `calc(${whiteKeyWidth * 3.75}% - ${offset}%)`,    // Between F3 (3) and G3 (4)
    'G#3': `calc(${whiteKeyWidth * 4.75}% - ${offset}%)`,    // Between G3 (4) and A3 (5)
    'A#3': `calc(${whiteKeyWidth * 5.75}% - ${offset}%)`,    // Between A3 (5) and B3 (6)
    // Octave 4
    'C#4': `calc(${whiteKeyWidth * 6.75}% - ${offset}%)`,    // Between C4 (6) and D4 (7)
    'D#4': `calc(${whiteKeyWidth * 7.75}% - ${offset}%)`,    // Between D4 (7) and E4 (8)
    'F#4': `calc(${whiteKeyWidth * 9.75}% - ${offset}%)`,    // Between F4 (9) and G4 (10)
    'G#4': `calc(${whiteKeyWidth * 10.75}% - ${offset}%)`    // Between G4 (10) and A4 (11)
  };
  return positions[note] || '0';
};

// Modern Melody Game
const MelodyGame: React.FC<{ melody: typeof MELODIES[0], onComplete: () => void }> = ({ melody, onComplete }) => {
  const [playedNotes, setPlayedNotes] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNotePlay = (note: string) => {
    if (note === melody.notes[currentStep]) {
      const newPlayed = [...playedNotes, note];
      setPlayedNotes(newPlayed);
      setCurrentStep(currentStep + 1);

      if (currentStep + 1 === melody.notes.length) {
        setShowSuccess(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    } else {
      // Wrong note, reset
      setPlayedNotes([]);
      setCurrentStep(0);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          color: 'white',
          fontWeight: 700,
          textShadow: '0 4px 12px rgba(0,0,0,0.3)',
          letterSpacing: '-0.02em'
        }}
      >
        {melody.emoji} Play: {melody.name}
      </Typography>

      <Box
        sx={{
          mb: 3,
          minHeight: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap'
        }}
      >
        {melody.notes.map((note, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{
              opacity: i < currentStep ? 1 : i === currentStep ? 1 : 0.3,
              scale: i === currentStep ? 1.4 : 1
            }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{ display: 'inline-block' }}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                background: i < currentStep
                  ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                  : i === currentStep
                  ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                  : alpha('#ffffff', 0.2),
                backdropFilter: 'blur(10px)',
                border: `2px solid ${alpha('#ffffff', 0.3)}`,
                borderRadius: 2,
                boxShadow: i === currentStep
                  ? `0 15px 30px ${alpha('#f093fb', 0.4)}`
                  : `0 8px 16px ${alpha('#000', 0.1)}`
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'white',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}
              >
                {note}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>

      {/* Piano Keyboard for melody game */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          position: 'relative',
          height: 300,
          maxWidth: 800,
          mx: 'auto',
          mb: 3,
          px: 2
        }}
      >
        {PIANO_NOTES.filter(n => n.type === 'white').map((note, idx) => (
          <PianoKey
            key={note.note}
            note={note}
            onPlay={handleNotePlay}
            index={idx}
            isHighlighted={note.note === melody.notes[currentStep]}
          />
        ))}
        {PIANO_NOTES.filter(n => n.type === 'black').map((note, idx) => (
          <PianoKey
            key={note.note}
            note={note}
            onPlay={handleNotePlay}
            index={idx + 8}
            isHighlighted={note.note === melody.notes[currentStep]}
          />
        ))}
      </Box>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Typography
              variant="h3"
              sx={{
                mt: 4,
                color: 'white',
                fontWeight: 800,
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))'
              }}
            >
              🎉 Beautiful melody! You earned a note! 🎵
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

// Modern Mode Selection Card
interface ModeCardProps {
  emoji: string;
  title: string;
  description: string;
  gradient: string;
  accentColor: string;
  index: number;
  onClick: () => void;
}

const ModeCard: React.FC<ModeCardProps> = ({ emoji, title, description, gradient, accentColor, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.2, type: 'spring', stiffness: 100 }
    });
  }, [controls, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      whileHover={{
        scale: 1.05,
        y: -15,
        transition: { duration: 0.3, type: 'spring', stiffness: 300 }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 0.9
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: -20,
          background: gradient,
          borderRadius: 32,
          filter: 'blur(30px)',
          opacity: 0.6,
          zIndex: 0
        }}
      />

      {/* Main card */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          background: isHovered
            ? alpha('#ffffff', 0.25)
            : alpha('#ffffff', 0.15),
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: `2px solid ${alpha('#ffffff', 0.3)}`,
          borderRadius: 4,
          p: 4,
          minHeight: 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          boxShadow: isHovered
            ? `0 30px 60px ${alpha(accentColor, 0.4)}`
            : `0 20px 40px ${alpha('#000', 0.15)}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: gradient,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }
        }}
      >
        <motion.div
          animate={isHovered ? {
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0]
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <Typography
            sx={{
              fontSize: '5rem',
              lineHeight: 1,
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
            }}
          >
            {emoji}
          </Typography>
        </motion.div>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: alpha('#ffffff', 0.85),
            textAlign: 'center',
            fontWeight: 500
          }}
        >
          {description}
        </Typography>

        {/* Shimmer effect */}
        <motion.div
          animate={{
            x: isHovered ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '50%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            pointerEvents: 'none'
          }}
        />
      </Box>
    </motion.div>
  );
};

// Main Music Forest Page - Modern Apple Design
// Musical Staff Display Component - Shows notes as they're played
interface PlayedNoteDisplay {
  note: string;
  id: number;
  color: string;
}

const MusicalStaff: React.FC<{ playedNotes: PlayedNoteDisplay[] }> = ({ playedNotes }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 900,
        height: 140,
        mx: 'auto',
        mb: 3,
        background: alpha('#ffffff', 0.15),
        backdropFilter: 'blur(20px) saturate(180%)',
        border: `2px solid ${alpha('#ffffff', 0.3)}`,
        borderRadius: 3,
        boxShadow: `0 20px 40px ${alpha('#000', 0.2)}`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3
      }}
    >
      {/* Musical staff lines */}
      {[0, 1, 2, 3, 4].map((line) => (
        <Box
          key={line}
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${20 + line * 20}%`,
            height: 2,
            background: alpha('#ffffff', 0.3),
            zIndex: 1
          }}
        />
      ))}

      {/* Treble clef emoji */}
      <Typography
        sx={{
          position: 'absolute',
          left: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '4rem',
          zIndex: 2,
          opacity: 0.5,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
        }}
      >
        🎼
      </Typography>

      {/* Played notes */}
      <AnimatePresence>
        {playedNotes.map((noteDisplay, idx) => (
          <motion.div
            key={noteDisplay.id}
            initial={{ x: -50, opacity: 0, scale: 0.5 }}
            animate={{ x: 100 + idx * 80, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, type: 'spring' }}
            style={{
              position: 'absolute',
              zIndex: 10
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${noteDisplay.color}, ${alpha(noteDisplay.color, 0.6)})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 20px ${alpha(noteDisplay.color, 0.6)}`,
                border: `3px solid ${alpha('#ffffff', 0.8)}`
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'white',
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}
              >
                {noteDisplay.note.replace(/[34]/g, '')}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Instruction text when no notes */}
      {playedNotes.length === 0 && (
        <Typography
          sx={{
            color: alpha('#ffffff', 0.6),
            fontSize: '1.1rem',
            fontWeight: 600,
            textAlign: 'center',
            zIndex: 2
          }}
        >
          Press piano keys to see notes appear! 🎵
        </Typography>
      )}
    </Box>
  );
};

const MusicForestPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateCollection, currentProfile, navigateToZone } = useWorld();
  const [selectedMode, setSelectedMode] = useState<'free' | 'melody' | null>(null);
  const [selectedMelody, setSelectedMelody] = useState<typeof MELODIES[0] | null>(null);
  const [playedNotesDisplay, setPlayedNotesDisplay] = useState<PlayedNoteDisplay[]>([]);
  const [noteIdCounter, setNoteIdCounter] = useState(0);

  useEffect(() => {
    navigateToZone('music-forest');
  }, [navigateToZone]);

  const handleBackToHome = () => {
    navigateToZone('home-tree');
    navigate('/world/home-tree');
  };

  const handleMelodyComplete = () => {
    updateCollection('notes', 1);
    setTimeout(() => {
      setSelectedMode(null);
      setSelectedMelody(null);
    }, 2500);
  };

  const handleFreePlay = (note: string) => {
    updateCollection('notes', 0.1);

    // Find the note data for color
    const noteData = PIANO_NOTES.find(n => n.note === note);
    if (noteData) {
      const newNote: PlayedNoteDisplay = {
        note: `${noteData.label}/${noteData.hindi}`,
        id: noteIdCounter,
        color: noteData.color
      };

      setNoteIdCounter(prev => prev + 1);
      setPlayedNotesDisplay(prev => {
        const newNotes = [...prev, newNote];
        // Keep only last 6 notes
        return newNotes.slice(-6);
      });

      // Remove note after 3 seconds
      setTimeout(() => {
        setPlayedNotesDisplay(prev => prev.filter(n => n.id !== newNote.id));
      }, 3000);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #BB8FCE 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated gradient mesh background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 50%, ${alpha('#f093fb', 0.3)} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${alpha('#BB8FCE', 0.3)} 0%, transparent 50%),
            radial-gradient(circle at 40% 10%, ${alpha('#f5576c', 0.2)} 0%, transparent 50%)
          `,
          opacity: 0.8
        }}
      />


      {/* Modern glassmorphic header */}
      <Box sx={{ position: 'relative', zIndex: 1, pt: 3, px: 2 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToHome}
            sx={{
              color: 'white',
              background: alpha('#ffffff', 0.2),
              backdropFilter: 'blur(10px)',
              border: `2px solid ${alpha('#ffffff', 0.3)}`,
              fontWeight: 600,
              px: 3,
              py: 1,
              boxShadow: `0 8px 16px ${alpha('#000', 0.1)}`,
              '&:hover': {
                background: alpha('#ffffff', 0.3),
                transform: 'translateY(-2px)',
                boxShadow: `0 12px 24px ${alpha('#000', 0.15)}`
              }
            }}
          >
            Home Tree
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 800,
                textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                letterSpacing: '-0.03em',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }
              }}
            >
              🎹 Grand Piano
            </Typography>
          </Box>
        </motion.div>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {!selectedMode ? (
            <motion.div
              key="modes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <ModeCard
                    emoji="🎹"
                    title="Free Play"
                    description="Tap trees to make music"
                    gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                    accentColor="#f093fb"
                    index={0}
                    onClick={() => setSelectedMode('free')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ModeCard
                    emoji="🎼"
                    title="Learn Melodies"
                    description="Follow the notes"
                    gradient="linear-gradient(135deg, #BB8FCE 0%, #9D8FFF 100%)"
                    accentColor="#BB8FCE"
                    index={1}
                    onClick={() => setSelectedMode('melody')}
                  />
                </Grid>
              </Grid>
            </motion.div>
          ) : selectedMode === 'free' ? (
            <motion.div
              key="free-play"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  background: alpha('#ffffff', 0.15),
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: `2px solid ${alpha('#ffffff', 0.3)}`,
                  borderRadius: 4,
                  p: 4,
                  boxShadow: `0 30px 60px ${alpha('#000', 0.2)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                  }
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 700,
                    textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  🎹 Apple-Quality Piano
                </Typography>

                {/* Musical Staff Display */}
                <MusicalStaff playedNotes={playedNotesDisplay} />

                {/* FULL-WIDTH PIANO - Breaking out of container */}
                <Box
                  sx={{
                    width: 'calc(100vw - 48px)',
                    maxWidth: 1400,
                    mx: 'auto',
                    mt: 3,
                    mb: 3,
                    position: 'relative',
                    height: 320,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 100%)',
                    borderRadius: 3,
                    boxShadow: `inset 0 6px 20px ${alpha('#000', 0.2)}, 0 10px 30px ${alpha('#000', 0.15)}`,
                    p: 2
                  }}
                >
                  {/* White keys container */}
                  <Box sx={{ display: 'flex', gap: '2px', height: '100%', position: 'relative' }}>
                    {PIANO_NOTES.filter(n => n.type === 'white').map((note, idx) => (
                      <Box key={note.note} sx={{ flex: 1, height: '100%', position: 'relative' }}>
                        <PianoKey note={note} onPlay={handleFreePlay} index={idx} />
                      </Box>
                    ))}
                  </Box>

                  {/* Black keys - positioned absolutely over white keys */}
                  {PIANO_NOTES.filter(n => n.type === 'black').map((note, idx) => (
                    <Box
                      key={note.note}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: getBlackKeyPosition(note.note),
                        width: '6%',
                        height: '60%',
                        zIndex: 10
                      }}
                    >
                      <PianoKey note={note} onPlay={handleFreePlay} index={idx + 12} />
                    </Box>
                  ))}
                </Box>

                <Box sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setSelectedMode(null)}
                      sx={{
                        background: alpha('#ffffff', 0.2),
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${alpha('#ffffff', 0.3)}`,
                        color: 'white',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        boxShadow: `0 8px 16px ${alpha('#000', 0.1)}`,
                        '&:hover': {
                          background: alpha('#ffffff', 0.3)
                        }
                      }}
                    >
                      Back to Menu
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          ) : selectedMode === 'melody' && !selectedMelody ? (
            <motion.div
              key="melody-select"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  background: alpha('#ffffff', 0.15),
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: `2px solid ${alpha('#ffffff', 0.3)}`,
                  borderRadius: 4,
                  p: 4,
                  boxShadow: `0 30px 60px ${alpha('#000', 0.2)}`
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 700,
                    textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Choose a melody to learn
                </Typography>

                <Grid container spacing={3}>
                  {MELODIES.map((melody, i) => (
                    <Grid item xs={12} sm={4} key={i}>
                      <Box
                        onClick={() => setSelectedMelody(melody)}
                        sx={{
                          cursor: 'pointer',
                          position: 'relative',
                          '&:hover .melody-glow': {
                            opacity: 1
                          }
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, type: 'spring' }}
                          whileHover={{ scale: 1.05, y: -10 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Glow */}
                          <Box
                            className="melody-glow"
                            sx={{
                              position: 'absolute',
                              inset: -15,
                              background: melody.gradient,
                              borderRadius: 24,
                              filter: 'blur(25px)',
                              zIndex: 0,
                              opacity: 0,
                              transition: 'opacity 0.3s ease'
                            }}
                          />

                          <Box
                            sx={{
                              position: 'relative',
                              zIndex: 1,
                              background: alpha('#ffffff', 0.2),
                              backdropFilter: 'blur(10px)',
                              border: `2px solid ${alpha('#ffffff', 0.3)}`,
                              borderRadius: 3,
                              p: 3,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: 1,
                              boxShadow: `0 15px 30px ${alpha(melody.accentColor, 0.3)}`,
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: melody.gradient
                              }
                            }}
                          >
                            <Typography sx={{ fontSize: '3rem' }}>{melody.emoji}</Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'white',
                                fontWeight: 700,
                                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                              }}
                            >
                              {melody.name}
                            </Typography>
                          </Box>
                        </motion.div>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setSelectedMode(null)}
                      sx={{
                        background: alpha('#ffffff', 0.2),
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${alpha('#ffffff', 0.3)}`,
                        color: 'white',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        boxShadow: `0 8px 16px ${alpha('#000', 0.1)}`,
                        '&:hover': {
                          background: alpha('#ffffff', 0.3)
                        }
                      }}
                    >
                      Back to Menu
                    </Button>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          ) : selectedMelody ? (
            <motion.div
              key="melody-game"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  background: alpha('#ffffff', 0.15),
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: `2px solid ${alpha('#ffffff', 0.3)}`,
                  borderRadius: 4,
                  p: 4,
                  boxShadow: `0 30px 60px ${alpha('#000', 0.2)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: selectedMelody.gradient
                  }
                }}
              >
                <MelodyGame melody={selectedMelody} onComplete={handleMelodyComplete} />
              </Box>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default MusicForestPage;
