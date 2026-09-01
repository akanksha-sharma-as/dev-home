export type AppState = {
  topic: string;
  difficulty: number;
};

export type TraceStep = {
  label: string;
  explanation: string;
  array?: string[] | number[];
  highlights?: number[];
  pointers?: { name: string; index: number; color: string }[];
};

export type ComplexityRow = {
  operation: string;
  time: string;
  space: string;
  notes?: string;
};

export type PracticeProblem = {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples?: { input: string; output: string; explanation?: string }[];
  hints: string[];
  approach: string;
  code: string;
};

export type Topic = {
  title: string;
  content: string;
  template?: string;
  code: string;
  keyPoints: string[];
  traceSteps: TraceStep[];
  practiceProblems?: PracticeProblem[];
};

export type Quiz = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type LearningSet = {
  id: string | number;
  title: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  topics: Topic[];
  questions: Question[];
  estimatedTime: string;
  complexities?: ComplexityRow[];
  practiceProblems?: PracticeProblem[];
  patternQuestions?: Question[];
};

export type RandomQuizEntry = {
  date: string;
  topic: string;
  score: number;
  total: number;
};

export type UserProgress = {
  completedSets: string[];
  setScores: Record<string, number>;
  topicsSeen: Record<string, number[]>;
  completedTopics: Record<string, number[]>;
  totalQuizzesTaken: number;
  lastActivity: string;
  randomQuizHistory: RandomQuizEntry[];
};
