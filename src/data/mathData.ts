import { ReactNode } from 'react';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import Filter6Icon from '@mui/icons-material/Filter6';
import Filter7Icon from '@mui/icons-material/Filter7';
import Filter8Icon from '@mui/icons-material/Filter8';
import Filter9Icon from '@mui/icons-material/Filter9';
import Filter9PlusIcon from '@mui/icons-material/Filter9Plus';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CalculateIcon from '@mui/icons-material/Calculate';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import GridOnIcon from '@mui/icons-material/GridOn';
import CompareIcon from '@mui/icons-material/Compare';
import React from 'react';

export interface MathQuestion {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  image?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MathActivity {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  level: string;
  ageRange: string;
  backgroundColor: string;
  gradient: string;
  shadowColor: string;
  textColor: string;
  questions?: MathQuestion[];
  path?: string;
}

// Counting Activity (1-20)
const countingQuestions: MathQuestion[] = [
  {
    id: 'count-1',
    question: 'Count the apples: 🍎 🍎 🍎 🍎',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: 'There are 4 apple emojis in the question.',
    difficulty: 'easy'
  },
  {
    id: 'count-2',
    question: 'Count the stars: ⭐ ⭐ ⭐ ⭐ ⭐ ⭐',
    options: ['5', '6', '7', '8'],
    correctAnswer: '6',
    explanation: 'There are 6 star emojis in the question.',
    difficulty: 'easy'
  },
  {
    id: 'count-3',
    question: 'What comes after 7?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: 'In counting numbers, 8 comes after 7.',
    difficulty: 'easy'
  },
  {
    id: 'count-4',
    question: 'Count the balloons: 🎈 🎈 🎈 🎈 🎈 🎈 🎈 🎈',
    options: ['7', '8', '9', '10'],
    correctAnswer: '8',
    explanation: 'There are 8 balloon emojis in the question.',
    difficulty: 'easy'
  },
  {
    id: 'count-5',
    question: 'What number is between 12 and 14?',
    options: ['11', '12', '13', '15'],
    correctAnswer: '13',
    explanation: 'The number 13 comes between 12 and 14.',
    difficulty: 'medium'
  },
  {
    id: 'count-6',
    question: 'Count the fruits: 🍎 🍌 🍊 🍇 🍓 🍉 🍍 🥝 🍒 🍑',
    options: ['8', '9', '10', '11'],
    correctAnswer: '10',
    explanation: 'There are 10 fruit emojis in the question.',
    difficulty: 'medium'
  },
  {
    id: 'count-7',
    question: 'What is the 15th number when counting from 1?',
    options: ['14', '15', '16', '17'],
    correctAnswer: '15',
    explanation: 'When counting from 1, the 15th number is 15.',
    difficulty: 'medium'
  },
  {
    id: 'count-8',
    question: 'Count by 2s: 2, 4, 6, 8, __',
    options: ['9', '10', '12', '14'],
    correctAnswer: '10',
    explanation: 'When counting by 2s, after 8 comes 10.',
    difficulty: 'medium'
  },
  {
    id: 'count-9',
    question: 'What number is 3 more than 17?',
    options: ['19', '20', '21', '18'],
    correctAnswer: '20',
    explanation: '17 + 3 = 20',
    difficulty: 'hard'
  },
  {
    id: 'count-10',
    question: 'Count by 5s: 5, 10, 15, __',
    options: ['20', '25', '30', '35'],
    correctAnswer: '20',
    explanation: 'When counting by 5s, after 15 comes 20.',
    difficulty: 'hard'
  }
];

// Reverse Counting Activity (20-1)
const reverseCountingQuestions: MathQuestion[] = [
  {
    id: 'rev-count-1',
    question: 'Count backwards: 10, 9, 8, __',
    options: ['6', '7', '5', '4'],
    correctAnswer: '7',
    explanation: 'When counting backwards from 10, after 8 comes 7.',
    difficulty: 'easy'
  },
  {
    id: 'rev-count-2',
    question: 'What comes before 5?',
    options: ['3', '4', '6', '7'],
    correctAnswer: '4',
    explanation: 'When counting backwards, 4 comes before 5.',
    difficulty: 'easy'
  },
  {
    id: 'rev-count-3',
    question: 'Count backwards: 20, 19, 18, 17, __',
    options: ['15', '16', '14', '13'],
    correctAnswer: '16',
    explanation: 'When counting backwards from 20, after 17 comes 16.',
    difficulty: 'easy'
  },
  {
    id: 'rev-count-4',
    question: 'What number is 2 less than 10?',
    options: ['7', '8', '9', '11'],
    correctAnswer: '8',
    explanation: '10 - 2 = 8',
    difficulty: 'easy'
  },
  {
    id: 'rev-count-5',
    question: 'Count backwards by 2s: 20, 18, 16, __',
    options: ['15', '14', '13', '12'],
    correctAnswer: '14',
    explanation: 'When counting backwards by 2s from 20, after 16 comes 14.',
    difficulty: 'medium'
  },
  {
    id: 'rev-count-6',
    question: 'What number comes before 15?',
    options: ['13', '14', '16', '17'],
    correctAnswer: '14',
    explanation: 'When counting backwards, 14 comes before 15.',
    difficulty: 'medium'
  },
  {
    id: 'rev-count-7',
    question: 'Count backwards by 5s: 25, 20, 15, __',
    options: ['5', '10', '0', '20'],
    correctAnswer: '10',
    explanation: 'When counting backwards by 5s from 25, after 15 comes 10.',
    difficulty: 'medium'
  },
  {
    id: 'rev-count-8',
    question: 'What is 3 less than 12?',
    options: ['8', '9', '10', '11'],
    correctAnswer: '9',
    explanation: '12 - 3 = 9',
    difficulty: 'medium'
  },
  {
    id: 'rev-count-9',
    question: 'Count backwards: 15, 14, 13, 12, 11, __',
    options: ['9', '10', '8', '7'],
    correctAnswer: '10',
    explanation: 'When counting backwards from 15, after 11 comes 10.',
    difficulty: 'hard'
  },
  {
    id: 'rev-count-10',
    question: 'What is 5 less than 20?',
    options: ['14', '15', '16', '17'],
    correctAnswer: '15',
    explanation: '20 - 5 = 15',
    difficulty: 'hard'
  }
];

// Tables Activity (Multiplication 1-10)
const tablesQuestions: MathQuestion[] = [
  {
    id: 'tables-1',
    question: '2 × 1 = ?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    explanation: '2 multiplied by 1 equals 2.',
    difficulty: 'easy'
  },
  {
    id: 'tables-2',
    question: '5 × 2 = ?',
    options: ['8', '10', '12', '15'],
    correctAnswer: '10',
    explanation: '5 multiplied by 2 equals 10.',
    difficulty: 'easy'
  },
  {
    id: 'tables-3',
    question: '3 × 3 = ?',
    options: ['6', '9', '12', '15'],
    correctAnswer: '9',
    explanation: '3 multiplied by 3 equals 9.',
    difficulty: 'easy'
  },
  {
    id: 'tables-4',
    question: '4 × 2 = ?',
    options: ['6', '8', '10', '12'],
    correctAnswer: '8',
    explanation: '4 multiplied by 2 equals 8.',
    difficulty: 'easy'
  },
  {
    id: 'tables-5',
    question: '5 × 5 = ?',
    options: ['20', '25', '30', '35'],
    correctAnswer: '25',
    explanation: '5 multiplied by 5 equals 25.',
    difficulty: 'medium'
  },
  {
    id: 'tables-6',
    question: '6 × 3 = ?',
    options: ['15', '18', '21', '24'],
    correctAnswer: '18',
    explanation: '6 multiplied by 3 equals 18.',
    difficulty: 'medium'
  },
  {
    id: 'tables-7',
    question: '7 × 4 = ?',
    options: ['24', '28', '32', '36'],
    correctAnswer: '28',
    explanation: '7 multiplied by 4 equals 28.',
    difficulty: 'medium'
  },
  {
    id: 'tables-8',
    question: '8 × 5 = ?',
    options: ['35', '40', '45', '50'],
    correctAnswer: '40',
    explanation: '8 multiplied by 5 equals 40.',
    difficulty: 'medium'
  },
  {
    id: 'tables-9',
    question: '9 × 6 = ?',
    options: ['48', '54', '60', '66'],
    correctAnswer: '54',
    explanation: '9 multiplied by 6 equals 54.',
    difficulty: 'hard'
  },
  {
    id: 'tables-10',
    question: '10 × 10 = ?',
    options: ['90', '100', '110', '120'],
    correctAnswer: '100',
    explanation: '10 multiplied by 10 equals 100.',
    difficulty: 'hard'
  }
];

// Addition Activity
const additionQuestions: MathQuestion[] = [
  {
    id: 'add-1',
    question: '1 + 2 = ?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '3',
    explanation: '1 plus 2 equals 3.',
    difficulty: 'easy'
  },
  {
    id: 'add-2',
    question: '3 + 3 = ?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '6',
    explanation: '3 plus 3 equals 6.',
    difficulty: 'easy'
  },
  {
    id: 'add-3',
    question: '2 + 5 = ?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '7',
    explanation: '2 plus 5 equals 7.',
    difficulty: 'easy'
  },
  {
    id: 'add-4',
    question: '4 + 4 = ?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '4 plus 4 equals 8.',
    difficulty: 'easy'
  },
  {
    id: 'add-5',
    question: '6 + 7 = ?',
    options: ['12', '13', '14', '15'],
    correctAnswer: '13',
    explanation: '6 plus 7 equals 13.',
    difficulty: 'medium'
  },
  {
    id: 'add-6',
    question: '8 + 5 = ?',
    options: ['12', '13', '14', '15'],
    correctAnswer: '13',
    explanation: '8 plus 5 equals 13.',
    difficulty: 'medium'
  },
  {
    id: 'add-7',
    question: '9 + 9 = ?',
    options: ['17', '18', '19', '20'],
    correctAnswer: '18',
    explanation: '9 plus 9 equals 18.',
    difficulty: 'medium'
  },
  {
    id: 'add-8',
    question: '7 + 8 = ?',
    options: ['13', '14', '15', '16'],
    correctAnswer: '15',
    explanation: '7 plus 8 equals 15.',
    difficulty: 'medium'
  },
  {
    id: 'add-9',
    question: '12 + 8 = ?',
    options: ['18', '19', '20', '21'],
    correctAnswer: '20',
    explanation: '12 plus 8 equals 20.',
    difficulty: 'hard'
  },
  {
    id: 'add-10',
    question: '15 + 7 = ?',
    options: ['21', '22', '23', '24'],
    correctAnswer: '22',
    explanation: '15 plus 7 equals 22.',
    difficulty: 'hard'
  }
];

// Subtraction Activity
const subtractionQuestions: MathQuestion[] = [
  {
    id: 'sub-1',
    question: '5 - 2 = ?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '3',
    explanation: '5 minus 2 equals 3.',
    difficulty: 'easy'
  },
  {
    id: 'sub-2',
    question: '7 - 3 = ?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: '7 minus 3 equals 4.',
    difficulty: 'easy'
  },
  {
    id: 'sub-3',
    question: '10 - 5 = ?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '10 minus 5 equals 5.',
    difficulty: 'easy'
  },
  {
    id: 'sub-4',
    question: '8 - 4 = ?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '4',
    explanation: '8 minus 4 equals 4.',
    difficulty: 'easy'
  },
  {
    id: 'sub-5',
    question: '12 - 7 = ?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '12 minus 7 equals 5.',
    difficulty: 'medium'
  },
  {
    id: 'sub-6',
    question: '15 - 8 = ?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '7',
    explanation: '15 minus 8 equals 7.',
    difficulty: 'medium'
  },
  {
    id: 'sub-7',
    question: '20 - 12 = ?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8',
    explanation: '20 minus 12 equals 8.',
    difficulty: 'medium'
  },
  {
    id: 'sub-8',
    question: '18 - 9 = ?',
    options: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '18 minus 9 equals 9.',
    difficulty: 'medium'
  },
  {
    id: 'sub-9',
    question: '25 - 16 = ?',
    options: ['7', '8', '9', '10'],
    correctAnswer: '9',
    explanation: '25 minus 16 equals 9.',
    difficulty: 'hard'
  },
  {
    id: 'sub-10',
    question: '30 - 15 = ?',
    options: ['10', '15', '20', '25'],
    correctAnswer: '15',
    explanation: '30 minus 15 equals 15.',
    difficulty: 'hard'
  }
];

// Odd-Even Activity
const oddEvenQuestions: MathQuestion[] = [
  {
    id: 'odd-even-1',
    question: 'Is 2 an odd or even number?',
    options: ['Odd', 'Even'],
    correctAnswer: 'Even',
    explanation: '2 is an even number because it can be divided by 2 with no remainder.',
    difficulty: 'easy'
  },
  {
    id: 'odd-even-2',
    question: 'Is 5 an odd or even number?',
    options: ['Odd', 'Even'],
    correctAnswer: 'Odd',
    explanation: '5 is an odd number because when divided by 2, it leaves a remainder of 1.',
    difficulty: 'easy'
  },
  {
    id: 'odd-even-3',
    question: 'Is 10 an odd or even number?',
    options: ['Odd', 'Even'],
    correctAnswer: 'Even',
    explanation: '10 is an even number because it can be divided by 2 with no remainder.',
    difficulty: 'easy'
  },
  {
    id: 'odd-even-4',
    question: 'Is 7 an odd or even number?',
    options: ['Odd', 'Even'],
    correctAnswer: 'Odd',
    explanation: '7 is an odd number because when divided by 2, it leaves a remainder of 1.',
    difficulty: 'easy'
  },
  {
    id: 'odd-even-5',
    question: 'Which of these numbers is even?',
    options: ['3', '5', '8', '9'],
    correctAnswer: '8',
    explanation: '8 is an even number because it can be divided by 2 with no remainder.',
    difficulty: 'medium'
  },
  {
    id: 'odd-even-6',
    question: 'Which of these numbers is odd?',
    options: ['2', '4', '6', '9'],
    correctAnswer: '9',
    explanation: '9 is an odd number because when divided by 2, it leaves a remainder of 1.',
    difficulty: 'medium'
  },
  {
    id: 'odd-even-7',
    question: 'How many even numbers are there between 1 and 10?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: 'The even numbers between 1 and 10 are 2, 4, 6, 8, and 10. There are 5 of them.',
    difficulty: 'medium'
  },
  {
    id: 'odd-even-8',
    question: 'How many odd numbers are there between 1 and 10?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: 'The odd numbers between 1 and 10 are 1, 3, 5, 7, and 9. There are 5 of them.',
    difficulty: 'medium'
  },
  {
    id: 'odd-even-9',
    question: 'If you add an odd number and an even number, will the result be odd or even?',
    options: ['Always odd', 'Always even', 'Sometimes odd, sometimes even', 'Cannot determine'],
    correctAnswer: 'Always odd',
    explanation: 'When you add an odd number and an even number, the result is always odd.',
    difficulty: 'hard'
  },
  {
    id: 'odd-even-10',
    question: 'If you add two even numbers, will the result be odd or even?',
    options: ['Always odd', 'Always even', 'Sometimes odd, sometimes even', 'Cannot determine'],
    correctAnswer: 'Always even',
    explanation: 'When you add two even numbers, the result is always even.',
    difficulty: 'hard'
  }
];

// Math Activities
export const mathActivities: MathActivity[] = [
  {
    id: 'counting',
    title: 'Counting (1-20)',
    description: 'Learn to count numbers from 1 to 20 with fun interactive exercises',
    icon: React.createElement(FormatListNumberedIcon, { sx: { fontSize: 40 } }),
    level: 'Beginner',
    ageRange: '3-5 years',
    backgroundColor: '#e3f2fd',
    gradient: 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
    shadowColor: 'rgba(33, 150, 243, 0.4)',
    textColor: '#1565c0',
    questions: countingQuestions,
    path: '/math/counting'
  },
  {
    id: 'reverse-counting',
    title: 'Reverse Counting (20-1)',
    description: 'Practice counting backwards from 20 to 1 with engaging activities',
    icon: React.createElement(FormatListNumberedRtlIcon, { sx: { fontSize: 40 } }),
    level: 'Beginner',
    ageRange: '3-5 years',
    backgroundColor: '#e8f5e9',
    gradient: 'linear-gradient(135deg, #c8e6c9 0%, #81c784 100%)',
    shadowColor: 'rgba(76, 175, 80, 0.4)',
    textColor: '#2e7d32',
    questions: reverseCountingQuestions,
    path: '/math/reverse-counting'
  },
  {
    id: 'tables',
    title: 'Multiplication Tables',
    description: 'Learn multiplication tables from 1 to 10 with colorful visuals',
    icon: React.createElement(GridOnIcon, { sx: { fontSize: 40 } }),
    level: 'Intermediate',
    ageRange: '6-8 years',
    backgroundColor: '#fff8e1',
    gradient: 'linear-gradient(135deg, #ffecb3 0%, #ffd54f 100%)',
    shadowColor: 'rgba(255, 193, 7, 0.4)',
    textColor: '#ff8f00',
    questions: tablesQuestions,
    path: '/math/tables'
  },
  {
    id: 'addition',
    title: 'Addition Fun',
    description: 'Master addition with numbers up to 20 through interactive exercises',
    icon: React.createElement(AddIcon, { sx: { fontSize: 40 } }),
    level: 'Beginner',
    ageRange: '4-6 years',
    backgroundColor: '#f3e5f5',
    gradient: 'linear-gradient(135deg, #e1bee7 0%, #ba68c8 100%)',
    shadowColor: 'rgba(156, 39, 176, 0.4)',
    textColor: '#7b1fa2',
    questions: additionQuestions,
    path: '/math/addition'
  },
  {
    id: 'subtraction',
    title: 'Subtraction Safari',
    description: 'Learn subtraction with numbers up to 30 through fun activities',
    icon: React.createElement(RemoveIcon, { sx: { fontSize: 40 } }),
    level: 'Beginner',
    ageRange: '4-6 years',
    backgroundColor: '#e0f7fa',
    gradient: 'linear-gradient(135deg, #b2ebf2 0%, #4dd0e1 100%)',
    shadowColor: 'rgba(0, 188, 212, 0.4)',
    textColor: '#0097a7',
    questions: subtractionQuestions,
    path: '/math/subtraction'
  },
  {
    id: 'odd-even',
    title: 'Odd & Even Numbers',
    description: 'Discover the difference between odd and even numbers with engaging exercises',
    icon: React.createElement(CompareIcon, { sx: { fontSize: 40 } }),
    level: 'Beginner',
    ageRange: '5-7 years',
    backgroundColor: '#fce4ec',
    gradient: 'linear-gradient(135deg, #f8bbd0 0%, #f48fb1 100%)',
    shadowColor: 'rgba(233, 30, 99, 0.4)',
    textColor: '#c2185b',
    questions: oddEvenQuestions,
    path: '/math/odd-even'
  }
];

export default {
  mathActivities,
  countingQuestions,
  reverseCountingQuestions,
  tablesQuestions,
  additionQuestions,
  subtractionQuestions,
  oddEvenQuestions
}; 