// All Quiz Apps in One File for Efficiency
import React from 'react';
import QuizAppTemplate from './QuizAppTemplate';

// Flags Quiz
export const FlagsQuizApp: React.FC = () => (
  <QuizAppTemplate
    title="World Flags 🏁"
    gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    questions={[
      { question: "Which country's flag is this?", emoji: "🇺🇸", options: ["USA", "UK", "France", "Canada"], correctAnswer: "USA" },
      { question: "Which country's flag is this?", emoji: "🇬🇧", options: ["USA", "UK", "Australia", "New Zealand"], correctAnswer: "UK" },
      { question: "Which country's flag is this?", emoji: "🇯🇵", options: ["China", "Japan", "South Korea", "Thailand"], correctAnswer: "Japan" },
      { question: "Which country's flag is this?", emoji: "🇮🇳", options: ["Pakistan", "Bangladesh", "India", "Sri Lanka"], correctAnswer: "India" },
      { question: "Which country's flag is this?", emoji: "🇧🇷", options: ["Brazil", "Argentina", "Chile", "Peru"], correctAnswer: "Brazil" },
      { question: "Which country's flag is this?", emoji: "🇨🇦", options: ["USA", "Canada", "UK", "Australia"], correctAnswer: "Canada" },
      { question: "Which country's flag is this?", emoji: "🇫🇷", options: ["France", "Italy", "Belgium", "Netherlands"], correctAnswer: "France" },
      { question: "Which country's flag is this?", emoji: "🇩🇪", options: ["Germany", "Belgium", "Austria", "Switzerland"], correctAnswer: "Germany" },
    ]}
  />
);

// Capitals Quiz
export const CapitalsQuizApp: React.FC = () => (
  <QuizAppTemplate
    title="Capital Cities 🏙️"
    gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    questions={[
      { question: "Capital of USA?", emoji: "🇺🇸", options: ["New York", "Washington DC", "Los Angeles", "Chicago"], correctAnswer: "Washington DC" },
      { question: "Capital of France?", emoji: "🇫🇷", options: ["Paris", "Lyon", "Marseille", "Nice"], correctAnswer: "Paris" },
      { question: "Capital of India?", emoji: "🇮🇳", options: ["Mumbai", "Delhi", "Bangalore", "Chennai"], correctAnswer: "Delhi" },
      { question: "Capital of Japan?", emoji: "🇯🇵", options: ["Osaka", "Tokyo", "Kyoto", "Hiroshima"], correctAnswer: "Tokyo" },
      { question: "Capital of Brazil?", emoji: "🇧🇷", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], correctAnswer: "Brasília" },
      { question: "Capital of UK?", emoji: "🇬🇧", options: ["London", "Manchester", "Birmingham", "Liverpool"], correctAnswer: "London" },
      { question: "Capital of China?", emoji: "🇨🇳", options: ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"], correctAnswer: "Beijing" },
      { question: "Capital of Australia?", emoji: "🇦🇺", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correctAnswer: "Canberra" },
    ]}
  />
);

// Monuments Quiz
export const MonumentsQuizApp: React.FC = () => (
  <QuizAppTemplate
    title="Famous Monuments 🏛️"
    gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    questions={[
      { question: "Where is the Taj Mahal?", emoji: "🕌", options: ["India", "Pakistan", "Bangladesh", "Nepal"], correctAnswer: "India" },
      { question: "Where is the Eiffel Tower?", emoji: "🗼", options: ["France", "Italy", "Spain", "Germany"], correctAnswer: "France" },
      { question: "Where is the Statue of Liberty?", emoji: "🗽", options: ["USA", "UK", "France", "Canada"], correctAnswer: "USA" },
      { question: "Where is the Great Wall?", emoji: "🏯", options: ["Japan", "China", "Korea", "Vietnam"], correctAnswer: "China" },
      { question: "Where are the Pyramids?", emoji: "🔺", options: ["Mexico", "Peru", "Egypt", "Sudan"], correctAnswer: "Egypt" },
      { question: "Where is Big Ben?", emoji: "🏰", options: ["USA", "UK", "France", "Germany"], correctAnswer: "UK" },
      { question: "Where is the Colosseum?", emoji: "🏛️", options: ["Greece", "Italy", "Turkey", "Spain"], correctAnswer: "Italy" },
      { question: "Where is Machu Picchu?", emoji: "⛰️", options: ["Chile", "Peru", "Bolivia", "Ecuador"], correctAnswer: "Peru" },
    ]}
  />
);

// Famous People Quiz
export const PeopleQuizApp: React.FC = () => (
  <QuizAppTemplate
    title="Famous People 👤"
    gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    questions={[
      { question: "Who invented the light bulb?", emoji: "💡", options: ["Edison", "Tesla", "Einstein", "Newton"], correctAnswer: "Edison" },
      { question: "Who painted the Mona Lisa?", emoji: "🎨", options: ["Picasso", "Da Vinci", "Van Gogh", "Monet"], correctAnswer: "Da Vinci" },
      { question: "Who wrote Harry Potter?", emoji: "📚", options: ["J.K. Rowling", "Tolkien", "Lewis", "Dahl"], correctAnswer: "J.K. Rowling" },
      { question: "First person on the moon?", emoji: "🚀", options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], correctAnswer: "Neil Armstrong" },
      { question: "Who discovered gravity?", emoji: "🍎", options: ["Einstein", "Newton", "Galileo", "Darwin"], correctAnswer: "Newton" },
      { question: "Who was Mahatma Gandhi?", emoji: "🕊️", options: ["Freedom Fighter", "Scientist", "Artist", "Athlete"], correctAnswer: "Freedom Fighter" },
      { question: "Who composed many symphonies?", emoji: "🎵", options: ["Bach", "Mozart", "Beethoven", "All of them"], correctAnswer: "All of them" },
      { question: "Who wrote plays like Hamlet?", emoji: "🎭", options: ["Shakespeare", "Dickens", "Austen", "Wilde"], correctAnswer: "Shakespeare" },
    ]}
  />
);
