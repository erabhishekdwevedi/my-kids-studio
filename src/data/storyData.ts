export interface StoryPage {
  id: string;
  content: string;
  image: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  category: string;
  tags: string[];
  ageRange: string;
  readingLevel: string;
  pages: StoryPage[];
  backgroundColor: string;
  gradient: string;
  shadowColor: string;
}

// Panchatantra Stories
export const panchatantraStories: Story[] = [
  {
    id: 'the-monkey-and-the-crocodile',
    title: 'The Monkey and the Crocodile',
    author: 'Panchatantra',
    description: 'A tale of friendship, betrayal, and quick thinking from the ancient Indian collection of fables.',
    coverImage: '/images/stories/monkey-crocodile-cover.jpg',
    category: 'Panchatantra',
    tags: ['Friendship', 'Wisdom', 'Betrayal', 'Quick Thinking'],
    ageRange: '4-8 years',
    readingLevel: 'Beginner',
    backgroundColor: '#e8f5e9',
    gradient: 'linear-gradient(135deg, #4caf50 0%, #80e27e 100%)',
    shadowColor: 'rgba(76, 175, 80, 0.4)',
    pages: [
      {
        id: 'page-1',
        content: 'Once upon a time, there lived a monkey who resided on a berry tree on the banks of a river. The tree was always full of fruits, and the monkey lived happily eating them.',
        image: '/images/stories/monkey-crocodile-1.jpg'
      },
      {
        id: 'page-2',
        content: 'One day, a crocodile swam up to the tree and rested under it. The kind monkey offered him some fruits. The crocodile enjoyed them and thanked the monkey.',
        image: '/images/stories/monkey-crocodile-2.jpg'
      },
      {
        id: 'page-3',
        content: 'The crocodile started visiting the monkey regularly. They became good friends. The crocodile would take some fruits for his wife too.',
        image: '/images/stories/monkey-crocodile-3.jpg'
      },
      {
        id: 'page-4',
        content: 'The crocodile\'s wife loved the sweet berries. But she grew jealous of her husband\'s friendship with the monkey. She hatched a wicked plan.',
        image: '/images/stories/monkey-crocodile-4.jpg'
      },
      {
        id: 'page-5',
        content: '"I want to eat the monkey\'s heart," she told her husband. "It must be very sweet since he eats such sweet berries all day."',
        image: '/images/stories/monkey-crocodile-5.jpg'
      },
      {
        id: 'page-6',
        content: 'The crocodile was shocked, but he loved his wife very much. He decided to trick his friend. "My wife has invited you for dinner," he told the monkey.',
        image: '/images/stories/monkey-crocodile-6.jpg'
      },
      {
        id: 'page-7',
        content: 'The monkey was delighted but said, "I can\'t swim!" The crocodile offered to carry him on his back. The monkey happily agreed and jumped onto the crocodile\'s back.',
        image: '/images/stories/monkey-crocodile-7.jpg'
      },
      {
        id: 'page-8',
        content: 'As they reached the middle of the river, the crocodile said, "I\'m going to take you to my wife so she can eat your heart." The monkey was terrified but remained calm.',
        image: '/images/stories/monkey-crocodile-8.jpg'
      },
      {
        id: 'page-9',
        content: 'Thinking quickly, the monkey said, "Oh no! I left my heart on the tree. We monkeys always keep our hearts on trees. Let\'s go back and get it."',
        image: '/images/stories/monkey-crocodile-9.jpg'
      },
      {
        id: 'page-10',
        content: 'The foolish crocodile believed him and swam back to the tree. As soon as they reached, the monkey jumped onto the tree and climbed to safety.',
        image: '/images/stories/monkey-crocodile-10.jpg'
      },
      {
        id: 'page-11',
        content: '"You betrayed our friendship," said the monkey. "I will never trust you again." The crocodile felt ashamed and swam away, having lost a true friend.',
        image: '/images/stories/monkey-crocodile-11.jpg'
      },
      {
        id: 'page-12',
        content: 'Moral of the story: Intelligence is more powerful than physical strength, and true friendship should never be betrayed.',
        image: '/images/stories/monkey-crocodile-12.jpg'
      }
    ]
  },
  {
    id: 'the-lion-and-the-rabbit',
    title: 'The Lion and the Rabbit',
    author: 'Panchatantra',
    description: 'A clever tale about how intelligence can overcome strength, from the ancient Indian collection of fables.',
    coverImage: '/images/stories/lion-rabbit-cover.jpg',
    category: 'Panchatantra',
    tags: ['Wisdom', 'Cleverness', 'Survival', 'Strategy'],
    ageRange: '4-8 years',
    readingLevel: 'Beginner',
    backgroundColor: '#fff8e1',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffc947 100%)',
    shadowColor: 'rgba(255, 152, 0, 0.4)',
    pages: [
      {
        id: 'page-1',
        content: 'In a dense forest, there lived a fierce lion who terrorized all the animals. Every day, he would hunt and kill animals for his meal, even when he wasn\'t hungry.',
        image: '/images/stories/lion-rabbit-1.jpg'
      },
      {
        id: 'page-2',
        content: 'The animals were very worried. They held a meeting and decided to make a deal with the lion. They would send one animal each day as his meal if he promised not to hunt anymore.',
        image: '/images/stories/lion-rabbit-2.jpg'
      },
      {
        id: 'page-3',
        content: 'The lion agreed. Every day, one animal would go to the lion as his meal. This way, most animals were safe, and the lion didn\'t have to hunt.',
        image: '/images/stories/lion-rabbit-3.jpg'
      },
      {
        id: 'page-4',
        content: 'One day, it was a small rabbit\'s turn. The rabbit was clever and didn\'t want to be eaten. He came up with a plan and walked slowly to the lion\'s den.',
        image: '/images/stories/lion-rabbit-4.jpg'
      },
      {
        id: 'page-5',
        content: 'The lion was angry because the rabbit was late. "Why are you late?" roared the lion. The rabbit bowed respectfully and said, "I\'m sorry, Your Majesty. I was delayed because of another lion."',
        image: '/images/stories/lion-rabbit-5.jpg'
      },
      {
        id: 'page-6',
        content: '"Another lion?" the lion was surprised. "Yes, another lion captured me on my way here. I escaped to inform you that there\'s another lion in this forest who claims to be the king."',
        image: '/images/stories/lion-rabbit-6.jpg'
      },
      {
        id: 'page-7',
        content: 'The lion was furious. "Take me to this impostor!" he commanded. The clever rabbit led the lion to a deep well filled with water.',
        image: '/images/stories/lion-rabbit-7.jpg'
      },
      {
        id: 'page-8',
        content: '"He lives down there," said the rabbit, pointing into the well. The lion peeked into the well and saw his own reflection in the water. Thinking it was another lion, he roared angrily.',
        image: '/images/stories/lion-rabbit-8.jpg'
      },
      {
        id: 'page-9',
        content: 'The reflection seemed to roar back at him. Enraged, the lion jumped into the well to fight his rival, not realizing it was just his reflection. He fell into the deep water and couldn\'t climb out.',
        image: '/images/stories/lion-rabbit-9.jpg'
      },
      {
        id: 'page-10',
        content: 'The rabbit watched as the lion struggled in the water. Soon, the lion drowned. The clever rabbit had saved all the animals in the forest from the tyrannical lion.',
        image: '/images/stories/lion-rabbit-10.jpg'
      },
      {
        id: 'page-11',
        content: 'The rabbit returned to the other animals and told them what had happened. They were overjoyed and celebrated their freedom from the lion\'s terror.',
        image: '/images/stories/lion-rabbit-11.jpg'
      },
      {
        id: 'page-12',
        content: 'Moral of the story: Intelligence and quick thinking can overcome even the strongest of foes. A small, clever animal can defeat a powerful but foolish one.',
        image: '/images/stories/lion-rabbit-12.jpg'
      }
    ]
  }
];

// All stories collection
export const allStories: Story[] = [
  ...panchatantraStories,
  // Add more story collections here as they are created
];

const storyData = {
  panchatantraStories,
  allStories
};

export default storyData; 