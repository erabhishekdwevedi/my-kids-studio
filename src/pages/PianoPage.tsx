import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  Snackbar,
  Alert,
  Chip,
  Grid,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import PageNavigation from '../components/PageNavigation';
import { speak, stop } from '../utils/textToSpeech';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SONGS from '../data/songData';

// Piano notes with their frequencies
const NOTES = {
  'C3': 130.81,
  'C#3': 138.59,
  'D3': 146.83,
  'D#3': 155.56,
  'E3': 164.81,
  'F3': 174.61,
  'F#3': 185.00,
  'G3': 196.00,
  'G#3': 207.65,
  'A3': 220.00,
  'A#3': 233.08,
  'B3': 246.94,
  'C4': 261.63,
  'C#4': 277.18,
  'D4': 293.66,
  'D#4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'F#4': 369.99,
  'G4': 392.00,
  'G#4': 415.30,
  'A4': 440.00,
  'A#4': 466.16,
  'B4': 493.88,
  'C5': 523.25
};

// Piano key component
interface PianoKeyProps {
  note: string;
  isBlack: boolean;
  isHighlighted: boolean;
  isPreviouslyPressed: boolean;
  isNextKey: boolean;
  consecutiveCount: number;
  onPress: (note: string) => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({ 
  note, 
  isBlack, 
  isHighlighted, 
  isPreviouslyPressed, 
  isNextKey,
  consecutiveCount,
  onPress 
}) => {
  // Determine background color based on state
  const getBackgroundColor = () => {
    if (isHighlighted) {
      // Next key to press - green
      return isBlack ? '#4CAF50' : '#8BC34A';
    } else if (isNextKey) {
      // Next-to-next key to press - gray
      return isBlack ? '#757575' : '#BDBDBD';
    } else {
      // Default key color (don't show previously pressed keys differently)
      return isBlack ? '#333' : 'white';
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      onClick={() => onPress(note)}
      style={{
        position: 'relative',
        height: isBlack ? '120px' : '200px',
        width: isBlack ? '30px' : '50px',
        backgroundColor: getBackgroundColor(),
        border: '1px solid #333',
        borderRadius: isBlack ? '0 0 3px 3px' : '0 0 5px 5px',
        boxShadow: isHighlighted 
          ? '0 0 10px rgba(76, 175, 80, 0.8)' 
          : (isNextKey 
            ? '0 0 10px rgba(189, 189, 189, 0.8)'
            : (isBlack ? '0 0 5px rgba(0,0,0,0.5)' : '0 2px 5px rgba(0,0,0,0.2)')),
        zIndex: isBlack ? 2 : 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '10px',
        cursor: 'pointer',
        transition: 'all 0.1s ease'
      }}
    >
      {/* Consecutive press counter - show directly on the key */}
      {consecutiveCount > 1 && isHighlighted && (
        <Box
          sx={{
            position: 'absolute',
            top: isBlack ? 40 : 140,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#4CAF50',
            fontSize: 16,
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            border: '1px solid #4CAF50',
            mb: 2
          }}
        >
          {consecutiveCount}
        </Box>
      )}
      
      <Typography 
        variant="caption" 
        sx={{ 
          color: (isHighlighted || isNextKey) 
            ? 'white' 
            : (isBlack ? 'white' : '#333'),
          fontWeight: isHighlighted ? 'bold' : 'normal',
          mt: isBlack ? 0 : 2
        }}
      >
        {note}
      </Typography>
    </motion.div>
  );
};

const PianoPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedProfile, selectedTheme, updateScore } = useApp();
  const [selectedSong, setSelectedSong] = useState<string>('Happy Birthday');
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<{show: boolean, correct: boolean}>({show: false, correct: false});
  const [progress, setProgress] = useState<number>(0);
  const [pressedNotes, setPressedNotes] = useState<string[]>([]);
  const [consecutiveKeyMap, setConsecutiveKeyMap] = useState<Record<string, number>>({});
  const audioContext = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Cleanup
    return () => {
      if (audioContext.current && audioContext.current.state !== 'closed') {
        audioContext.current.close();
      }
      stop();
    };
  }, []);

  // Reset game when song changes
  useEffect(() => {
    resetGame();
  }, [selectedSong]);

  // Play a note
  const playNote = (note: string, duration: number = 500) => {
    if (!audioContext.current) return;
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = NOTES[note as keyof typeof NOTES];
    
    gainNode.gain.value = 0.5;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.start();
    
    // Smooth release
    gainNode.gain.exponentialRampToValueAtTime(
      0.001, audioContext.current.currentTime + duration / 1000
    );
    
    setTimeout(() => {
      oscillator.stop();
    }, duration);
  };

  // Start the song
  const startSong = () => {
    setIsPlaying(true);
    setCurrentNoteIndex(0);
    setScore(0);
    setProgress(0);
    setPressedNotes([]);
    
    // Calculate consecutive keys on start
    setConsecutiveKeyMap(calculateConsecutiveKeys());
    
    // Announce the start
    speak(`Let's play ${selectedSong}. Follow the highlighted keys.`);
  };

  // Reset the game
  const resetGame = () => {
    setIsPlaying(false);
    setCurrentNoteIndex(-1);
    setScore(0);
    setProgress(0);
    setPressedNotes([]);
    setConsecutiveKeyMap({});
  };

  // Get highlighted note
  const getHighlightedNote = () => {
    if (!isPlaying || currentNoteIndex === -1) return null;
    
    const currentSong = SONGS[selectedSong].notes;
    return currentSong[currentNoteIndex].note;
  };

  // Get next-to-next note
  const getNextNote = () => {
    if (!isPlaying || currentNoteIndex === -1) return null;
    
    const currentSong = SONGS[selectedSong].notes;
    const currentNote = currentSong[currentNoteIndex].note;
    
    // Don't show next note if current note needs to be pressed multiple times
    if (consecutiveKeyMap[currentNote] && consecutiveKeyMap[currentNote] > 1) {
      return null;
    }
    
    if (currentNoteIndex + 1 < currentSong.length) {
      return currentSong[currentNoteIndex + 1].note;
    }
    return null;
  };

  // Calculate consecutive key presses
  const calculateConsecutiveKeys = () => {
    if (!isPlaying || currentNoteIndex === -1) return {};
    
    const currentSong = SONGS[selectedSong].notes;
    const result: Record<string, number> = {};
    
    // Start from current note and look ahead
    let count = 1;
    const currentNote = currentSong[currentNoteIndex].note;
    
    // Look ahead for consecutive notes
    for (let i = currentNoteIndex + 1; i < currentSong.length; i++) {
      if (currentSong[i].note === currentNote) {
        count++;
      } else {
        break;
      }
    }
    
    if (count > 1) {
      result[currentNote] = count;
    }
    
    return result;
  };

  // Handle key press
  const handleKeyPress = (note: string) => {
    playNote(note);
    
    if (!isPlaying || currentNoteIndex === -1) return;
    
    const currentSong = SONGS[selectedSong].notes;
    const expectedNote = currentSong[currentNoteIndex].note;
    
    if (note === expectedNote) {
      // Correct note
      setFeedback({show: true, correct: true});
      setScore(prev => prev + 10);
      
      // Add to pressed notes
      setPressedNotes(prev => [...prev, note]);
      
      // Update consecutive key map for the current note
      if (consecutiveKeyMap[note] && consecutiveKeyMap[note] > 1) {
        // Decrement the count for consecutive presses
        setConsecutiveKeyMap(prev => ({
          ...prev,
          [note]: prev[note] - 1
        }));
        
        // If we still need to press the same key, don't advance to next note
        if (consecutiveKeyMap[note] > 2) {
          return;
        }
      }
      
      // Move to next note
      if (currentNoteIndex < currentSong.length - 1) {
        setCurrentNoteIndex(prev => prev + 1);
        setProgress(((currentNoteIndex + 1) / currentSong.length) * 100);
        
        // Update consecutive key map
        setConsecutiveKeyMap(calculateConsecutiveKeys());
      } else {
        // Song completed
        setIsPlaying(false);
        setCurrentNoteIndex(-1);
        setConsecutiveKeyMap({});
        
        // Update profile score
        if (selectedProfile) {
          updateScore(score + 10);
        }
        
        // Celebrate
        speak('Great job! You completed the song!');
      }
    } else {
      // Wrong note
      setFeedback({show: true, correct: false});
    }
    
    // Hide feedback after a short delay
    setTimeout(() => {
      setFeedback({show: false, correct: false});
    }, 1000);
  };

  // Check if a note was previously pressed
  const isPreviouslyPressed = (note: string) => {
    return pressedNotes.includes(note);
  };

  // Handle navigation
  const handleBackToSubject = () => {
    stop();
    navigate('/subject/music');
  };

  const handleBackToHome = () => {
    stop();
    navigate('/');
  };

  if (!selectedProfile || !selectedTheme) {
    return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  }

  const highlightedNote = getHighlightedNote();
  const nextNote = getNextNote();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: selectedTheme.gradient,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: 3
      }}
    >
      {/* Top Navigation */}
      <PageNavigation 
        profile={selectedProfile}
        theme={selectedTheme}
        showTitle={false}
        onBackClick={handleBackToSubject}
        onHomeClick={handleBackToHome}
        showMuteButton={true}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mt: 2 }}>
        {/* Score and Progress */}
        <Paper 
          elevation={3}
          sx={{ 
            p: 2, 
            mb: 3, 
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6">
            Score: {score}
          </Typography>
          
          <Box sx={{ width: '60%' }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 10, 
                borderRadius: 5,
                backgroundColor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: selectedTheme.textColor,
                }
              }} 
            />
          </Box>
        </Paper>

        {/* Song Selection and Feedback */}
        <Paper 
          elevation={3}
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="song-select-label">Select Song</InputLabel>
                <Select
                  labelId="song-select-label"
                  value={selectedSong}
                  label="Select Song"
                  onChange={(e) => setSelectedSong(e.target.value as string)}
                  disabled={isPlaying}
                >
                  {Object.keys(SONGS).map((song) => (
                    <MenuItem key={song} value={song}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MusicNoteIcon sx={{ mr: 1, color: selectedTheme.textColor }} />
                        <Typography>{song}</Typography>
                        <Chip 
                          label={SONGS[song].difficulty} 
                          size="small" 
                          color={
                            SONGS[song].difficulty === 'easy' ? 'success' : 
                            SONGS[song].difficulty === 'medium' ? 'warning' : 'error'
                          }
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              {feedback.show ? (
                feedback.correct ? (
                  <ThumbUpIcon 
                    sx={{ 
                      fontSize: 60, 
                      color: '#4CAF50',
                      animation: 'pulse 0.5s infinite alternate'
                    }} 
                  />
                ) : (
                  <ThumbDownIcon 
                    sx={{ 
                      fontSize: 60, 
                      color: '#F44336',
                      animation: 'shake 0.5s'
                    }} 
                  />
                )
              ) : (
                <Box sx={{ height: 60 }} /> // Placeholder to maintain layout
              )}
            </Grid>
            
            <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color={isPlaying ? "error" : "primary"}
                onClick={isPlaying ? resetGame : startSong}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  backgroundColor: isPlaying ? '#f44336' : selectedTheme.textColor,
                  '&:hover': {
                    backgroundColor: isPlaying ? '#d32f2f' : selectedTheme.accentColor,
                  }
                }}
              >
                {isPlaying ? 'Stop' : 'Start Song'}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Piano */}
        <Paper 
          elevation={5}
          sx={{ 
            p: 4, 
            borderRadius: 3,
            backgroundColor: '#f5f5f5',
            mb: 4
          }}
        >
          {/* Instructions - Simplified */}
          {isPlaying && (
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, gap: 2 }}>
                <Tooltip title="Next key to press">
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    backgroundColor: '#8BC34A', 
                    borderRadius: 1,
                    display: 'inline-block'
                  }} />
                </Tooltip>
                <Tooltip title="Key to press after next">
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    backgroundColor: '#BDBDBD', 
                    borderRadius: 1,
                    display: 'inline-block'
                  }} />
                </Tooltip>
                {Object.keys(consecutiveKeyMap).length > 0 && (
                  <Tooltip title="Number shows how many times to press">
                    <Box sx={{ 
                      width: 20, 
                      height: 20, 
                      backgroundColor: 'white', 
                      borderRadius: '50%',
                      display: 'inline-block',
                      color: '#4CAF50',
                      fontSize: 14,
                      textAlign: 'center',
                      lineHeight: '20px',
                      border: '1px solid #4CAF50'
                    }}>
                      2+
                    </Box>
                  </Tooltip>
                )}
              </Box>
            </Box>
          )}
          
          {/* Piano Keys */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              height: 220,
              mb: 2,
              overflowX: 'auto',
              width: '100%',
              pb: 2
            }}
          >
            {/* White keys */}
            <Box sx={{ display: 'flex', position: 'relative' }}>
              <PianoKey 
                note="C3" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'C3'} 
                isPreviouslyPressed={isPreviouslyPressed('C3')}
                isNextKey={nextNote === 'C3'}
                consecutiveCount={consecutiveKeyMap['C3'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="D3" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'D3'} 
                isPreviouslyPressed={isPreviouslyPressed('D3')}
                isNextKey={nextNote === 'D3'}
                consecutiveCount={consecutiveKeyMap['D3'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="E3" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'E3'} 
                isPreviouslyPressed={isPreviouslyPressed('E3')}
                isNextKey={nextNote === 'E3'}
                consecutiveCount={consecutiveKeyMap['E3'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="F3" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'F3'} 
                isPreviouslyPressed={isPreviouslyPressed('F3')}
                isNextKey={nextNote === 'F3'}
                consecutiveCount={consecutiveKeyMap['F3'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="G3" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'G3'} 
                isPreviouslyPressed={isPreviouslyPressed('G3')}
                isNextKey={nextNote === 'G3'}
                consecutiveCount={consecutiveKeyMap['G3'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="A3" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'A3'} 
                isPreviouslyPressed={isPreviouslyPressed('A3')}
                isNextKey={nextNote === 'A3'}
                consecutiveCount={consecutiveKeyMap['A3'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="B3" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'B3'} 
                isPreviouslyPressed={isPreviouslyPressed('B3')}
                isNextKey={nextNote === 'B3'}
                consecutiveCount={consecutiveKeyMap['B3'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="C4" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'C4'} 
                isPreviouslyPressed={isPreviouslyPressed('C4')}
                isNextKey={nextNote === 'C4'}
                consecutiveCount={consecutiveKeyMap['C4'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="D4" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'D4'} 
                isPreviouslyPressed={isPreviouslyPressed('D4')}
                isNextKey={nextNote === 'D4'}
                consecutiveCount={consecutiveKeyMap['D4'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="E4" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'E4'} 
                isPreviouslyPressed={isPreviouslyPressed('E4')}
                isNextKey={nextNote === 'E4'}
                consecutiveCount={consecutiveKeyMap['E4'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="F4" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'F4'} 
                isPreviouslyPressed={isPreviouslyPressed('F4')}
                isNextKey={nextNote === 'F4'}
                consecutiveCount={consecutiveKeyMap['F4'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="G4" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'G4'} 
                isPreviouslyPressed={isPreviouslyPressed('G4')}
                isNextKey={nextNote === 'G4'}
                consecutiveCount={consecutiveKeyMap['G4'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="A4" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'A4'} 
                isPreviouslyPressed={isPreviouslyPressed('A4')}
                isNextKey={nextNote === 'A4'}
                consecutiveCount={consecutiveKeyMap['A4'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="B4" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'B4'} 
                isPreviouslyPressed={isPreviouslyPressed('B4')}
                isNextKey={nextNote === 'B4'}
                consecutiveCount={consecutiveKeyMap['B4'] || 1}
                onPress={handleKeyPress} 
              />
              <PianoKey 
                note="C5" 
                isBlack={false} 
                isHighlighted={highlightedNote === 'C5'} 
                isPreviouslyPressed={isPreviouslyPressed('C5')}
                isNextKey={nextNote === 'C5'}
                consecutiveCount={consecutiveKeyMap['C5'] || 1}
                onPress={handleKeyPress} 
              />
            </Box>
            
            {/* Black keys */}
            <Box sx={{ 
              display: 'flex', 
              position: 'absolute', 
              left: 'calc(50% - 350px)',
              zIndex: 2
            }}>
              <Box sx={{ width: 35 }} /> {/* Space for C3 */}
              <PianoKey 
                note="C#3" 
                isBlack={true} 
                isHighlighted={highlightedNote === 'C#3'} 
                isPreviouslyPressed={isPreviouslyPressed('C#3')}
                isNextKey={nextNote === 'C#3'}
                consecutiveCount={consecutiveKeyMap['C#3'] || 1}
                onPress={handleKeyPress} 
              />
              <Box sx={{ width: 20 }} />
              <PianoKey 
                note="D#3" 
                isBlack={true} 
                isHighlighted={highlightedNote === 'D#3'} 
                isPreviouslyPressed={isPreviouslyPressed('D#3')}
                isNextKey={nextNote === 'D#3'}
                consecutiveCount={consecutiveKeyMap['D#3'] || 1}
                onPress={handleKeyPress} 
              />
              <Box sx={{ width: 50 }} /> {/* Space for E3 and F3 */}
              <PianoKey 
                note="F#3" 
                isBlack={true} 
                isHighlighted={highlightedNote === 'F#3'} 
                isPreviouslyPressed={isPreviouslyPressed('F#3')}
                isNextKey={nextNote === 'F#3'}
                consecutiveCount={consecutiveKeyMap['F#3'] || 1}
                onPress={handleKeyPress} 
              />
              <Box sx={{ width: 20 }} />
              <PianoKey 
                note="G#3" 
                isBlack={true} 
                isHighlighted={highlightedNote === 'G#3'} 
                isPreviouslyPressed={isPreviouslyPressed('G#3')}
                isNextKey={nextNote === 'G#3'}
                consecutiveCount={consecutiveKeyMap['G#3'] || 1}
                onPress={handleKeyPress} 
              />
              <Box sx={{ width: 20 }} />
              <PianoKey 
                note="A#3" 
                isBlack={true} 
                isHighlighted={highlightedNote === 'A#3'} 
                isPreviouslyPressed={isPreviouslyPressed('A#3')}
                isNextKey={nextNote === 'A#3'}
                consecutiveCount={consecutiveKeyMap['A#3'] || 1}
                onPress={handleKeyPress} 
              />
              <Box sx={{ width: 50 }} /> {/* Space for B3 and C4 */}
              <PianoKey 
                note="C#4" 
                isBlack={true} 
                isHighlighted={highlightedNote === 'C#4'} 
                isPreviouslyPressed={isPreviouslyPressed('C#4')}
                isNextKey={nextNote === 'C#4'}
                consecutiveCount={consecutiveKeyMap['C#4'] || 1}
                onPress={handleKeyPress} 
              />
              <Box sx={{ width: 20 }} />
              <PianoKey 
                note="D#4" 
                isBlack={true} 
                isHighlighted={highlightedNote === 'D#4'} 
                isPreviouslyPressed={isPreviouslyPressed('D#4')}
                isNextKey={nextNote === 'D#4'}
                consecutiveCount={consecutiveKeyMap['D#4'] || 1}
                onPress={handleKeyPress} 
              />
              <Box sx={{ width: 50 }} /> {/* Space for E4 and F4 */}
              <PianoKey 
                note="F#4" 
                isBlack={true} 
                isHighlighted={highlightedNote === 'F#4'} 
                isPreviouslyPressed={isPreviouslyPressed('F#4')}
                isNextKey={nextNote === 'F#4'}
                consecutiveCount={consecutiveKeyMap['F#4'] || 1}
                onPress={handleKeyPress} 
              />
              <Box sx={{ width: 20 }} />
              <PianoKey 
                note="G#4" 
                isBlack={true} 
                isHighlighted={highlightedNote === 'G#4'} 
                isPreviouslyPressed={isPreviouslyPressed('G#4')}
                isNextKey={nextNote === 'G#4'}
                consecutiveCount={consecutiveKeyMap['G#4'] || 1}
                onPress={handleKeyPress} 
              />
              <Box sx={{ width: 20 }} />
              <PianoKey 
                note="A#4" 
                isBlack={true} 
                isHighlighted={highlightedNote === 'A#4'} 
                isPreviouslyPressed={isPreviouslyPressed('A#4')}
                isNextKey={nextNote === 'A#4'}
                consecutiveCount={consecutiveKeyMap['A#4'] || 1}
                onPress={handleKeyPress} 
              />
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Feedback Snackbar */}
      <Snackbar
        open={feedback.show}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={feedback.correct ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {feedback.correct ? "Correct!" : "Try again!"}
        </Alert>
      </Snackbar>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            100% { transform: scale(1.2); }
          }
          
          @keyframes shake {
            0% { transform: translateX(0); }
            20% { transform: translateX(-10px); }
            40% { transform: translateX(10px); }
            60% { transform: translateX(-10px); }
            80% { transform: translateX(10px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default PianoPage; 