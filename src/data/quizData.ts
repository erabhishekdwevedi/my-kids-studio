export interface QuizQuestion {
  id: number;
  question: string;
  imageUrl: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizData {
  [category: string]: {
    title: string;
    description: string;
    questions: QuizQuestion[];
  };
}

export const quizData: QuizData = {
  flags: {
    title: "World Flags Quiz",
    description: "Test your knowledge of flags from around the world!",
    questions: [
      {
        id: 1,
        question: "Which country does this flag belong to?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/800px-Flag_of_Russia.svg.png",
        options: ["Russia", "France", "Netherlands"],
        correctAnswerIndex: 0
      },
      {
        id: 2,
        question: "Which country does this flag belong to?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/720px-Flag_of_Brazil.svg.png",
        options: ["Portugal", "Brazil", "Mexico"],
        correctAnswerIndex: 1
      },
      {
        id: 3,
        question: "Which country does this flag belong to?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/800px-Flag_of_the_People%27s_Republic_of_China.svg.png",
        options: ["Japan", "Vietnam", "China"],
        correctAnswerIndex: 2
      },
      {
        id: 4,
        question: "Which country does this flag belong to?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/800px-Flag_of_India.svg.png",
        options: ["India", "Ireland", "Ivory Coast"],
        correctAnswerIndex: 0
      },
      {
        id: 5,
        question: "Which country does this flag belong to?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_South_Africa.svg/800px-Flag_of_South_Africa.svg.png",
        options: ["Kenya", "South Africa", "Ethiopia"],
        correctAnswerIndex: 1
      },
      {
        id: 6,
        question: "Which country does this flag belong to?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png",
        options: ["United Kingdom", "Australia", "United States"],
        correctAnswerIndex: 2
      },
      {
        id: 7,
        question: "Which country does this flag belong to?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/800px-Flag_of_Mexico.svg.png",
        options: ["Mexico", "Italy", "Hungary"],
        correctAnswerIndex: 0
      },
      {
        id: 8,
        question: "Which country does this flag belong to?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/800px-Flag_of_France.svg.png",
        options: ["Netherlands", "France", "Luxembourg"],
        correctAnswerIndex: 1
      },
      {
        id: 9,
        question: "Which country does this flag belong to?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/800px-Flag_of_Japan.svg.png",
        options: ["South Korea", "Bangladesh", "Japan"],
        correctAnswerIndex: 2
      },
      {
        id: 10,
        question: "Which country does this flag belong to?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.svg.png",
        options: ["Germany", "Belgium", "Spain"],
        correctAnswerIndex: 0
      }
    ]
  },
  capitals: {
    title: "Capital Cities Quiz",
    description: "Test your knowledge of capital cities around the world!",
    questions: [
      {
        id: 1,
        question: "What is the capital city of Russia?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Saint_Basil%27s_Cathedral_and_the_Red_Square.jpg/640px-Saint_Basil%27s_Cathedral_and_the_Red_Square.jpg",
        options: ["Moscow", "St. Petersburg", "Kiev"],
        correctAnswerIndex: 0
      },
      {
        id: 2,
        question: "What is the capital city of Brazil?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Congresso_Nacional_do_Brasil.jpg/640px-Congresso_Nacional_do_Brasil.jpg",
        options: ["Rio de Janeiro", "Brasília", "São Paulo"],
        correctAnswerIndex: 1
      },
      {
        id: 3,
        question: "What is the capital city of China?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tiananmen_Gate.jpg/640px-Tiananmen_Gate.jpg",
        options: ["Shanghai", "Hong Kong", "Beijing"],
        correctAnswerIndex: 2
      },
      {
        id: 4,
        question: "What is the capital city of India?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/India_Gate_in_New_Delhi_03-2016.jpg/640px-India_Gate_in_New_Delhi_03-2016.jpg",
        options: ["New Delhi", "Mumbai", "Kolkata"],
        correctAnswerIndex: 0
      },
      {
        id: 5,
        question: "What is the capital city of South Africa?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Union_Buildings%2C_Pretoria%2C_Gauteng%2C_South_Africa.jpg/640px-Union_Buildings%2C_Pretoria%2C_Gauteng%2C_South_Africa.jpg",
        options: ["Cape Town", "Pretoria", "Johannesburg"],
        correctAnswerIndex: 1
      },
      {
        id: 6,
        question: "What is the capital city of the United States?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Washington_DC_Capitol_Building_at_night.jpg/640px-Washington_DC_Capitol_Building_at_night.jpg",
        options: ["New York", "Los Angeles", "Washington D.C."],
        correctAnswerIndex: 2
      },
      {
        id: 7,
        question: "What is the capital city of France?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/640px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
        options: ["Paris", "Lyon", "Marseille"],
        correctAnswerIndex: 0
      },
      {
        id: 8,
        question: "What is the capital city of the United Kingdom?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg/640px-Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007.jpg",
        options: ["Manchester", "London", "Liverpool"],
        correctAnswerIndex: 1
      },
      {
        id: 9,
        question: "What is the capital city of Japan?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Tokyo_Tower_and_Tokyo_Skytree_2014_January.jpg/640px-Tokyo_Tower_and_Tokyo_Skytree_2014_January.jpg",
        options: ["Osaka", "Kyoto", "Tokyo"],
        correctAnswerIndex: 2
      },
      {
        id: 10,
        question: "What is the capital city of Mexico?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Palacio_de_Bellas_Artes_-_01.jpg/640px-Palacio_de_Bellas_Artes_-_01.jpg",
        options: ["Mexico City", "Guadalajara", "Cancún"],
        correctAnswerIndex: 0
      }
    ]
  },
  monuments: {
    title: "Famous Monuments Quiz",
    description: "Test your knowledge of famous monuments around the world!",
    questions: [
      {
        id: 1,
        question: "In which country is this famous monument located?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Taj_Mahal_May_2012.jpg/640px-Taj_Mahal_May_2012.jpg",
        options: ["India", "Pakistan", "Bangladesh"],
        correctAnswerIndex: 0
      },
      {
        id: 2,
        question: "In which country is this famous monument located?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/640px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
        options: ["Greece", "Italy", "Spain"],
        correctAnswerIndex: 1
      },
      {
        id: 3,
        question: "In which country is this famous monument located?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kiyomizu-dera_in_Kyoto-r.jpg/640px-Kiyomizu-dera_in_Kyoto-r.jpg",
        options: ["China", "South Korea", "Japan"],
        correctAnswerIndex: 2
      },
      {
        id: 4,
        question: "In which country is this famous monument located?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoonGiza.jpg/640px-FullMoonGiza.jpg",
        options: ["Egypt", "Sudan", "Libya"],
        correctAnswerIndex: 0
      },
      {
        id: 5,
        question: "In which country is this famous monument located?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/640px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
        options: ["Mongolia", "China", "North Korea"],
        correctAnswerIndex: 1
      },
      {
        id: 6,
        question: "In which country is this famous monument located?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Statue_of_Liberty_7.jpg/640px-Statue_of_Liberty_7.jpg",
        options: ["France", "Canada", "United States"],
        correctAnswerIndex: 2
      },
      {
        id: 7,
        question: "In which country is this famous monument located?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Christ_the_Redeemer_-_Cristo_Redentor.jpg/640px-Christ_the_Redeemer_-_Cristo_Redentor.jpg",
        options: ["Brazil", "Argentina", "Colombia"],
        correctAnswerIndex: 0
      },
      {
        id: 8,
        question: "In which country is this famous monument located?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/640px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
        options: ["Belgium", "France", "Switzerland"],
        correctAnswerIndex: 1
      },
      {
        id: 9,
        question: "In which country is this famous monument located?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Kremlin_walls_and_towers.jpg/640px-Kremlin_walls_and_towers.jpg",
        options: ["Ukraine", "Belarus", "Russia"],
        correctAnswerIndex: 2
      },
      {
        id: 10,
        question: "In which country is this famous monument located?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Robben_Island_Prison.jpg/640px-Robben_Island_Prison.jpg",
        options: ["South Africa", "Namibia", "Zimbabwe"],
        correctAnswerIndex: 0
      }
    ]
  },
  people: {
    title: "Famous People Quiz",
    description: "Test your knowledge of famous people from around the world!",
    questions: [
      {
        id: 1,
        question: "Who is this famous person?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Mahatma-Gandhi%2C_studio%2C_1931.jpg/640px-Mahatma-Gandhi%2C_studio%2C_1931.jpg",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"],
        correctAnswerIndex: 0
      },
      {
        id: 2,
        question: "Who is this famous person?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Vladimir_Putin_in_2023.jpg/640px-Vladimir_Putin_in_2023.jpg",
        options: ["Dmitry Medvedev", "Vladimir Putin", "Boris Yeltsin"],
        correctAnswerIndex: 1
      },
      {
        id: 3,
        question: "Who is this famous person?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Xi_Jinping_2019.jpg/640px-Xi_Jinping_2019.jpg",
        options: ["Hu Jintao", "Li Keqiang", "Xi Jinping"],
        correctAnswerIndex: 2
      },
      {
        id: 4,
        question: "Who is this famous person?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/640px-President_Barack_Obama.jpg",
        options: ["Barack Obama", "Joe Biden", "Bill Clinton"],
        correctAnswerIndex: 0
      },
      {
        id: 5,
        question: "Who is this famous person?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Luiz_In%C3%A1cio_Lula_da_Silva_%28foto_oficial%29.jpg/640px-Luiz_In%C3%A1cio_Lula_da_Silva_%28foto_oficial%29.jpg",
        options: ["Jair Bolsonaro", "Luiz Inácio Lula da Silva", "Dilma Rousseff"],
        correctAnswerIndex: 1
      },
      {
        id: 6,
        question: "Who is this famous person?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nelson_Mandela_1994.jpg/640px-Nelson_Mandela_1994.jpg",
        options: ["Desmond Tutu", "Thabo Mbeki", "Nelson Mandela"],
        correctAnswerIndex: 2
      },
      {
        id: 7,
        question: "Who is this famous person?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Narendra_Modi_in_2023.jpg/640px-Narendra_Modi_in_2023.jpg",
        options: ["Narendra Modi", "Rahul Gandhi", "Manmohan Singh"],
        correctAnswerIndex: 0
      },
      {
        id: 8,
        question: "Who is this famous person?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Emmanuel_Macron_June_2022_%28cropped%29.jpg/640px-Emmanuel_Macron_June_2022_%28cropped%29.jpg",
        options: ["François Hollande", "Emmanuel Macron", "Nicolas Sarkozy"],
        correctAnswerIndex: 1
      },
      {
        id: 9,
        question: "Who is this famous person?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Angela_Merkel_2019_cropped.jpg/640px-Angela_Merkel_2019_cropped.jpg",
        options: ["Ursula von der Leyen", "Olaf Scholz", "Angela Merkel"],
        correctAnswerIndex: 2
      },
      {
        id: 10,
        question: "Who is this famous person?",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Cyril_Ramaphosa_2023_%28cropped%29.jpg/640px-Cyril_Ramaphosa_2023_%28cropped%29.jpg",
        options: ["Cyril Ramaphosa", "Jacob Zuma", "F. W. de Klerk"],
        correctAnswerIndex: 0
      }
    ]
  }
};

export default quizData; 