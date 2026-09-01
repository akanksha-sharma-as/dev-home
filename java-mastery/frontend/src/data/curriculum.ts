import type { Question } from '../types';

export type CurriculumItem = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  lessons: string[];
};

export type RandomTopic = {
  name: string;
  questions: Question[];
};

export const randomTopics: RandomTopic[] = [
  {
    name: 'Java',
    questions: [
      {
        id: 1,
        question: 'Which Java keyword is used to define a class?',
        options: ['function', 'class', 'struct', 'interface'],
        correctAnswer: 1,
        explanation: 'A Java class is declared with the class keyword.',
        difficulty: 'easy',
      },
      {
        id: 2,
        question: 'What does the static keyword mean in Java?',
        options: ['The value changes often', 'It belongs to the class instead of an instance', 'It is only used in loops', 'It disables methods'],
        correctAnswer: 1,
        explanation: 'Static members belong to the class and are shared across instances.',
        difficulty: 'medium',
      },
      {
        id: 3,
        question: 'Which collection is best for storing unique items without duplicates?',
        options: ['ArrayList', 'HashSet', 'HashMap', 'Queue'],
        correctAnswer: 1,
        explanation: 'A HashSet stores unique elements and avoids duplicates.',
        difficulty: 'easy',
      },
    ],
  },
  {
    name: 'Spring Boot',
    questions: [
      {
        id: 1,
        question: 'What is the purpose of @SpringBootApplication?',
        options: ['Creates a database table', 'Bootstraps the Spring Boot app', 'Defines CSS', 'Starts a thread'],
        correctAnswer: 1,
        explanation: '@SpringBootApplication enables auto-configuration and component scanning.',
        difficulty: 'easy',
      },
      {
        id: 2,
        question: 'Which annotation maps HTTP GET requests to a controller method?',
        options: ['@PostMapping', '@RequestBody', '@GetMapping', '@Autowired'],
        correctAnswer: 2,
        explanation: '@GetMapping is used for GET endpoints.',
        difficulty: 'medium',
      },
    ],
  },
  {
    name: 'DSA',
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of binary search on a sorted array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correctAnswer: 1,
        explanation: 'Binary search halves the search space each step.',
        difficulty: 'medium',
      },
      {
        id: 2,
        question: 'Which data structure follows FIFO order?',
        options: ['Stack', 'Queue', 'Tree', 'Set'],
        correctAnswer: 1,
        explanation: 'A queue processes elements in first-in, first-out order.',
        difficulty: 'easy',
      },
    ],
  },
];

export const curriculum: Record<string, CurriculumItem[]> = {
  java: [
    {
      id: 'java-basics',
      title: 'Java Basics',
      description: 'Core Java syntax, control flow, and fundamentals.',
      difficulty: 'Beginner',
      lessons: ['Variables', 'Loops', 'Methods', 'Classes', 'OOP', 'Collections'],
    },
    {
      id: 'java-advanced',
      title: 'Java Advanced',
      description: 'Polymorphism, generics, streams, and design patterns.',
      difficulty: 'Intermediate',
      lessons: ['Generics', 'Streams', 'Interfaces', 'Exception Handling', 'Testing'],
    },
  ],
  springboot: [
    {
      id: 'springboot-essentials',
      title: 'Spring Boot Essentials',
      description: 'Create APIs, dependency injection, and configuration.',
      difficulty: 'Beginner',
      lessons: ['Spring MVC', 'Beans', 'REST APIs', 'Dependency Injection', 'Profiles'],
    },
    {
      id: 'springboot-production',
      title: 'Spring Boot Production',
      description: 'Security, testing, and deployment-ready application patterns.',
      difficulty: 'Advanced',
      lessons: ['Security', 'Validation', 'Actuator', 'Testing', 'Deployment'],
    },
  ],
  dsa: [
    {
      id: 'arrays-strings',
      title: 'Arrays & Strings',
      description: 'Master indexing, traversal, and efficient string operations.',
      difficulty: 'Beginner',
      lessons: ['Two pointers', 'Sliding window', 'Hashing', 'Patterns'],
    },
    {
      id: 'trees-graphs',
      title: 'Trees & Graphs',
      description: 'Understand recursive structures and graph traversal.',
      difficulty: 'Intermediate',
      lessons: ['DFS', 'BFS', 'Tree traversals', 'Shortest paths'],
    },
  ],
};
