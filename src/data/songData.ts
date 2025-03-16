export interface SongNote {
  note: string;
  duration: number;
  text: string;
}

export interface Song {
  title: string;
  notes: SongNote[];
  difficulty: 'easy' | 'medium' | 'hard';
  origin: string;
}

export const SONGS: Record<string, Song> = {
  'Happy Birthday': {
    title: 'Happy Birthday',
    difficulty: 'easy',
    origin: 'American',
    notes: [
      { note: 'C4', duration: 500, text: 'Hap' },
      { note: 'C4', duration: 500, text: 'py' },
      { note: 'D4', duration: 1000, text: 'birth' },
      { note: 'C4', duration: 1000, text: 'day' },
      { note: 'F4', duration: 1000, text: 'to' },
      { note: 'E4', duration: 2000, text: 'you' },
      
      { note: 'C4', duration: 500, text: 'Hap' },
      { note: 'C4', duration: 500, text: 'py' },
      { note: 'D4', duration: 1000, text: 'birth' },
      { note: 'C4', duration: 1000, text: 'day' },
      { note: 'G4', duration: 1000, text: 'to' },
      { note: 'F4', duration: 2000, text: 'you' },
      
      { note: 'C4', duration: 500, text: 'Hap' },
      { note: 'C4', duration: 500, text: 'py' },
      { note: 'C5', duration: 1000, text: 'birth' },
      { note: 'A4', duration: 1000, text: 'day' },
      { note: 'F4', duration: 1000, text: 'dear' },
      { note: 'E4', duration: 1000, text: 'friend' },
      { note: 'D4', duration: 2000, text: '' },
      
      { note: 'A#4', duration: 500, text: 'Hap' },
      { note: 'A#4', duration: 500, text: 'py' },
      { note: 'A4', duration: 1000, text: 'birth' },
      { note: 'F4', duration: 1000, text: 'day' },
      { note: 'G4', duration: 1000, text: 'to' },
      { note: 'F4', duration: 2000, text: 'you' }
    ]
  },
  'Twinkle Twinkle': {
    title: 'Twinkle Twinkle',
    difficulty: 'easy',
    origin: 'French/English',
    notes: [
      { note: 'C4', duration: 1000, text: 'Twin' },
      { note: 'C4', duration: 1000, text: 'kle' },
      { note: 'G4', duration: 1000, text: 'twin' },
      { note: 'G4', duration: 1000, text: 'kle' },
      { note: 'A4', duration: 1000, text: 'lit' },
      { note: 'A4', duration: 1000, text: 'tle' },
      { note: 'G4', duration: 2000, text: 'star' },
      
      { note: 'F4', duration: 1000, text: 'How' },
      { note: 'F4', duration: 1000, text: 'I' },
      { note: 'E4', duration: 1000, text: 'won' },
      { note: 'E4', duration: 1000, text: 'der' },
      { note: 'D4', duration: 1000, text: 'what' },
      { note: 'D4', duration: 1000, text: 'you' },
      { note: 'C4', duration: 2000, text: 'are' }
    ]
  },
  'Mary Had a Little Lamb': {
    title: 'Mary Had a Little Lamb',
    difficulty: 'easy',
    origin: 'American',
    notes: [
      { note: 'E4', duration: 1000, text: 'Ma' },
      { note: 'D4', duration: 1000, text: 'ry' },
      { note: 'C4', duration: 1000, text: 'had' },
      { note: 'D4', duration: 1000, text: 'a' },
      { note: 'E4', duration: 1000, text: 'lit' },
      { note: 'E4', duration: 1000, text: 'tle' },
      { note: 'E4', duration: 2000, text: 'lamb' },
      
      { note: 'D4', duration: 1000, text: 'Lit' },
      { note: 'D4', duration: 1000, text: 'tle' },
      { note: 'D4', duration: 2000, text: 'lamb' },
      { note: 'E4', duration: 1000, text: 'Lit' },
      { note: 'G4', duration: 1000, text: 'tle' },
      { note: 'G4', duration: 2000, text: 'lamb' }
    ]
  },
  'Jana Gana Mana': {
    title: 'Jana Gana Mana',
    difficulty: 'medium',
    origin: 'Indian',
    notes: [
      { note: 'C4', duration: 1000, text: 'Ja' },
      { note: 'D4', duration: 1000, text: 'na' },
      { note: 'E4', duration: 1000, text: 'ga' },
      { note: 'F4', duration: 1000, text: 'na' },
      { note: 'E4', duration: 1000, text: 'ma' },
      { note: 'D4', duration: 1000, text: 'na' },
      { note: 'C4', duration: 2000, text: 'adhi' },
      
      { note: 'E4', duration: 1000, text: 'na' },
      { note: 'F4', duration: 1000, text: 'ya' },
      { note: 'G4', duration: 1000, text: 'ka' },
      { note: 'A4', duration: 1000, text: 'ja' },
      { note: 'G4', duration: 1000, text: 'ya' },
      { note: 'F4', duration: 1000, text: 'he' },
      { note: 'E4', duration: 2000, text: '' },
      
      { note: 'G4', duration: 1000, text: 'Bha' },
      { note: 'A4', duration: 1000, text: 'ra' },
      { note: 'B4', duration: 1000, text: 'ta' },
      { note: 'C5', duration: 1000, text: 'bha' },
      { note: 'B4', duration: 1000, text: 'gya' },
      { note: 'A4', duration: 1000, text: 'vi' },
      { note: 'G4', duration: 2000, text: 'dha' },
      { note: 'F4', duration: 1000, text: 'ta' }
    ]
  },
  'Om Jai Jagdish Hare': {
    title: 'Om Jai Jagdish Hare',
    difficulty: 'medium',
    origin: 'Indian',
    notes: [
      { note: 'C4', duration: 1000, text: 'Om' },
      { note: 'E4', duration: 1000, text: 'Jai' },
      { note: 'G4', duration: 1000, text: 'Jag' },
      { note: 'E4', duration: 1000, text: 'dish' },
      { note: 'G4', duration: 1000, text: 'Ha' },
      { note: 'A4', duration: 1000, text: 're' },
      
      { note: 'G4', duration: 1000, text: 'Swa' },
      { note: 'E4', duration: 1000, text: 'mi' },
      { note: 'G4', duration: 1000, text: 'Om' },
      { note: 'E4', duration: 1000, text: 'Jai' },
      { note: 'C4', duration: 1000, text: 'Jag' },
      { note: 'D4', duration: 1000, text: 'dish' },
      { note: 'C4', duration: 2000, text: 'Ha' },
      { note: 'E4', duration: 1000, text: 're' }
    ]
  },
  'Ram Aayenge': {
    title: 'Ram Aayenge',
    difficulty: 'medium',
    origin: 'Indian',
    notes: [
      { note: 'G4', duration: 1000, text: 'Ram' },
      { note: 'A4', duration: 1000, text: 'Aa' },
      { note: 'G4', duration: 1000, text: 'yen' },
      { note: 'E4', duration: 1000, text: 'ge' },
      
      { note: 'G4', duration: 1000, text: 'To' },
      { note: 'A4', duration: 1000, text: 'Man' },
      { note: 'G4', duration: 1000, text: 'dir' },
      { note: 'E4', duration: 1000, text: 'Ba' },
      { note: 'D4', duration: 1000, text: 'nen' },
      { note: 'C4', duration: 1000, text: 'ge' },
      
      { note: 'E4', duration: 1000, text: 'Ram' },
      { note: 'G4', duration: 1000, text: 'Aa' },
      { note: 'E4', duration: 1000, text: 'yen' },
      { note: 'D4', duration: 1000, text: 'ge' },
      
      { note: 'E4', duration: 1000, text: 'To' },
      { note: 'G4', duration: 1000, text: 'Man' },
      { note: 'E4', duration: 1000, text: 'dir' },
      { note: 'D4', duration: 1000, text: 'Ba' },
      { note: 'C4', duration: 1000, text: 'nen' },
      { note: 'C4', duration: 1000, text: 'ge' }
    ]
  },
  'Vande Mataram': {
    title: 'Vande Mataram',
    difficulty: 'medium',
    origin: 'Indian',
    notes: [
      { note: 'C4', duration: 1000, text: 'Van' },
      { note: 'D4', duration: 1000, text: 'de' },
      { note: 'E4', duration: 1000, text: 'Ma' },
      { note: 'F4', duration: 1000, text: 'ta' },
      { note: 'G4', duration: 2000, text: 'ram' },
      
      { note: 'E4', duration: 1000, text: 'Su' },
      { note: 'F4', duration: 1000, text: 'ja' },
      { note: 'G4', duration: 1000, text: 'lam' },
      { note: 'A4', duration: 1000, text: 'Su' },
      { note: 'G4', duration: 1000, text: 'pha' },
      { note: 'F4', duration: 1000, text: 'lam' },
      
      { note: 'E4', duration: 1000, text: 'Ma' },
      { note: 'F4', duration: 1000, text: 'la' },
      { note: 'G4', duration: 1000, text: 'ya' },
      { note: 'A4', duration: 1000, text: 'ja' },
      { note: 'G4', duration: 1000, text: 'shi' },
      { note: 'F4', duration: 1000, text: 'ta' },
      { note: 'E4', duration: 1000, text: 'lam' }
    ]
  },
  'Merry Christmas': {
    title: 'Merry Christmas',
    difficulty: 'easy',
    origin: 'Western',
    notes: [
      { note: 'G4', duration: 1000, text: 'We' },
      { note: 'G4', duration: 1000, text: 'wish' },
      { note: 'A4', duration: 1000, text: 'you' },
      { note: 'G4', duration: 1000, text: 'a' },
      { note: 'C5', duration: 1000, text: 'Mer' },
      { note: 'B4', duration: 1000, text: 'ry' },
      
      { note: 'A4', duration: 1000, text: 'Christ' },
      { note: 'G4', duration: 1000, text: 'mas' },
      { note: 'F4', duration: 1000, text: 'We' },
      { note: 'F4', duration: 1000, text: 'wish' },
      { note: 'G4', duration: 1000, text: 'you' },
      { note: 'F4', duration: 1000, text: 'a' },
      { note: 'A4', duration: 1000, text: 'Mer' },
      { note: 'G4', duration: 1000, text: 'ry' },
      
      { note: 'G4', duration: 1000, text: 'Christ' },
      { note: 'E4', duration: 1000, text: 'mas' },
      { note: 'D4', duration: 1000, text: 'We' },
      { note: 'D4', duration: 1000, text: 'wish' },
      { note: 'E4', duration: 1000, text: 'you' },
      { note: 'D4', duration: 1000, text: 'a' },
      { note: 'G4', duration: 1000, text: 'Mer' },
      { note: 'F4', duration: 1000, text: 'ry' },
      { note: 'E4', duration: 1000, text: 'Christ' },
      { note: 'D4', duration: 1000, text: 'mas' }
    ]
  }
};

export default SONGS; 