import type { Question } from '../types';

export const sampleQuestions: Question[] = [
  {
    id: 1,
    question: 'Which Java type is best for storing a true/false value?',
    options: ['int', 'double', 'boolean', 'String'],
    correctAnswer: 2,
    explanation: 'A boolean is the correct type for true/false logic.',
    difficulty: 'easy',
  },
  {
    id: 2,
    question: 'What is the time complexity of binary search?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    correctAnswer: 1,
    explanation: 'Binary search halves the search space each iteration.',
    difficulty: 'medium',
  },
  {
    id: 3,
    question: 'Which annotation maps an HTTP GET request in Spring Boot?',
    options: ['@GetMapping', '@PostMapping', '@Autowired', '@Component'],
    correctAnswer: 0,
    explanation: '@GetMapping is used for HTTP GET endpoints.',
    difficulty: 'easy',
  },
];
