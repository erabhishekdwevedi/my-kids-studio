import React, { useState, useEffect } from 'react';
import Soundfont, { InstrumentName, Player } from 'soundfont-player';

interface SoundfontProviderProps {
  instrumentName: InstrumentName;
  hostname: string;
  audioContext: AudioContext;
  render: (props: {
    isLoading: boolean;
    playNote: (midiNumber: number) => void;
    stopNote: (midiNumber: number) => void;
  }) => React.ReactElement;
}

type SoundfontPlayer = Player & {
  play(note: string | number): AudioBufferSourceNode;
  stop(note: string | number): void;
};

const SoundfontProvider: React.FC<SoundfontProviderProps> = ({
  instrumentName,
  hostname,
  audioContext,
  render
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [instrument, setInstrument] = useState<SoundfontPlayer | null>(null);
  const [activeNotes, setActiveNotes] = useState<{ [key: number]: AudioBufferSourceNode }>({});

  useEffect(() => {
    loadInstrument();
    return () => {
      // Cleanup active notes on unmount
      Object.values(activeNotes).forEach(node => {
        try {
          node.stop();
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
    };
  }, [instrumentName]);

  const loadInstrument = () => {
    setLoading(true);
    Soundfont.instrument(audioContext, instrumentName, {
      hostname,
      format: 'mp3'
    })
      .then((loadedInstrument) => {
        setLoading(false);
        setInstrument(loadedInstrument as SoundfontPlayer);
      })
      .catch((error) => {
        console.error('Error loading instrument:', error);
        setLoading(false);
      });
  };

  const playNote = (midiNumber: number) => {
    if (!instrument || loading) return;

    try {
      // Stop any existing note
      if (activeNotes[midiNumber]) {
        activeNotes[midiNumber].stop();
      }

      // Play the note and store the audio node
      const audioNode = instrument.play(midiNumber);
      setActiveNotes(prev => ({
        ...prev,
        [midiNumber]: audioNode
      }));
    } catch (error) {
      console.error('Error playing note:', error);
    }
  };

  const stopNote = (midiNumber: number) => {
    if (!instrument || loading) return;

    try {
      // Stop the note if it exists
      if (activeNotes[midiNumber]) {
        activeNotes[midiNumber].stop();
        setActiveNotes(prev => {
          const newNotes = { ...prev };
          delete newNotes[midiNumber];
          return newNotes;
        });
      }
    } catch (error) {
      console.error('Error stopping note:', error);
    }
  };

  return render({
    isLoading: loading,
    playNote,
    stopNote
  });
};

export default SoundfontProvider; 