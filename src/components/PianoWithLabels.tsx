import React, { useEffect, useRef } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

interface PianoWithLabelsProps {
  noteRange: { first: number; last: number };
  playNote: (midiNumber: number) => void;
  stopNote: (midiNumber: number) => void;
  disabled: boolean;
  width: number;
  keyboardShortcuts: KeyboardShortcuts[];
  activeNotes: number[];
  onPlayNoteInput: (midiNumber: number) => void;
}

const HOME_ROW_MAPPING = {
  a: 60, // middle C
  s: 62, // D
  d: 64, // E
  f: 65, // F
  g: 67, // G
  h: 69, // A
  j: 71, // B
  k: 72, // C
  l: 74, // D
  w: 61, // C#
  e: 63, // D#
  t: 66, // F#
  y: 68, // G#
  u: 70, // A#
  o: 73, // C#
  p: 75, // D#
};

const PianoWithLabels: React.FC<PianoWithLabelsProps> = (props) => {
  const pianoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pianoRef.current) {
      const keys = pianoRef.current.querySelectorAll('.ReactPiano__Key');
      const reverseMapping = Object.entries(HOME_ROW_MAPPING).reduce((acc, [key, midi]) => {
        acc[midi] = key;
        return acc;
      }, {} as { [key: number]: string });

      keys.forEach((key) => {
        // Remove any existing labels
        const existingLabel = key.querySelector('.key-label');
        const existingHighlight = key.querySelector('.piano-highlight');
        if (existingLabel) existingLabel.remove();
        if (existingHighlight) existingHighlight.remove();

        const midiNumber = parseInt(key.getAttribute('data-midi-number') || '0', 10);
        if (midiNumber) {
          // Add keyboard shortcut label
          const shortcutKey = reverseMapping[midiNumber];
          if (shortcutKey) {
            const label = document.createElement('div');
            label.className = 'key-label';
            label.textContent = shortcutKey.toUpperCase();
            key.appendChild(label);
          }

          // Add highlight bar for active notes
          if (props.activeNotes.includes(midiNumber)) {
            const highlight = document.createElement('div');
            highlight.className = 'piano-highlight';
            key.appendChild(highlight);
          }
        }
      });
    }
  }, [props.activeNotes]);

  return (
    <div ref={pianoRef}>
      <Piano {...props} />
    </div>
  );
};

export default PianoWithLabels; 