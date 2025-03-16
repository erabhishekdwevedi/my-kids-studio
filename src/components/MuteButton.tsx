import React, { useState, useEffect } from 'react';
import { Fab, Tooltip } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { getMuteState, toggleMute } from '../utils/textToSpeech';

interface MuteButtonProps {
  size?: 'small' | 'medium' | 'large';
  position?: 'fixed' | 'absolute' | 'relative';
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: number;
  color?: string;
  backgroundColor?: string;
}

/**
 * A reusable mute button component that toggles text-to-speech functionality
 */
const MuteButton: React.FC<MuteButtonProps> = ({
  size = 'medium',
  position = 'absolute',
  top = 'auto',
  right = 16,
  bottom = 16,
  left = 'auto',
  zIndex = 1000,
  color = 'primary.main',
  backgroundColor = 'white',
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(getMuteState());

  // Update the mute state when it changes externally
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isMuted') {
        setIsMuted(e.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleToggleMute = () => {
    const newMuteState = toggleMute();
    setIsMuted(newMuteState);
  };

  return (
    <Tooltip title={isMuted ? 'Unmute' : 'Mute'}>
      <Fab
        size={size}
        aria-label={isMuted ? 'unmute' : 'mute'}
        onClick={handleToggleMute}
        sx={{
          position,
          top,
          right,
          bottom,
          left,
          zIndex,
          backgroundColor,
          color,
          boxShadow: '0px 3px 8px rgba(0,0,0,0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
        }}
      >
        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </Fab>
    </Tooltip>
  );
};

export default MuteButton; 