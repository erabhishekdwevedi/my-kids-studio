// Type declarations for react-piano
declare module 'react-piano' {
  export interface KeyboardShortcuts {
    [key: string]: number;
  }

  export interface MidiNumbers {
    fromNote: (note: string) => number;
    getAttributes: (midiNumber: number) => {
      note: string;
      pitchName: string;
      octave: number;
      isAccidental: boolean;
    };
  }

  export interface PianoProps {
    noteRange: {
      first: number;
      last: number;
    };
    playNote: (midiNumber: number) => void;
    stopNote: (midiNumber: number) => void;
    width: number;
    keyboardShortcuts?: KeyboardShortcuts[];
    disabled?: boolean;
    activeNotes?: number[];
    className?: string;
    onPlayNoteInput?: (midiNumber: number) => void;
    onStopNoteInput?: (midiNumber: number) => void;
  }

  export const Piano: React.ComponentType<PianoProps>;
  export const KeyboardShortcuts: KeyboardShortcuts;
  export const MidiNumbers: MidiNumbers;
}

declare module 'react-piano/dist/styles.css';
