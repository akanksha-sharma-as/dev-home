import { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { randomTopics } from '../data/curriculum';
import { useProgressStore } from '../store/progressStore';
import MCQQuestion from '../components/MCQQuestion';
import type { Question } from '../types';

type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: Difficulty;
}

function mapToQuestion(q: GeneratedQuestion, id: number, diff: Difficulty): Question {
  const diffs: Question['difficulty'][] = ['easy', 'medium', 'hard'];
  const difficulty = (diff === 'mixed' ? diffs[id % 3] : diff) as Question['difficulty'];

  return {
    id,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    difficulty,
  };
}

function getFallbackQuestions(topic: string, count: number): Question[] {
  const all = randomTopics.flatMap((item) => item.questions);
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((q, i) => mapToQuestion(q, i + 1, 'mixed'));
}

export default function RandomQuizPage() {
  const { addRandomQuizResult } = useProgressStore();

  const [topic, setTopic] = useState('Java');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number | null>>([]);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');

  const generateQuiz = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, count: 10 }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      const data = await response.json();

      if (data.questions && data.questions.length > 0) {
        const mapped = data.questions.map((q: GeneratedQuestion, index: number) =>
          mapToQuestion(q, index + 1, difficulty)
        );
        setQuestions(mapped);
        setSelectedAnswers(Array(mapped.length).fill(null));
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuestions(getFallbackQuestions(topic, 10));
      }
    } catch {
      setQuestions(getFallbackQuestions(topic, 10));
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index: number) => {
    const updated = [...selectedAnswers];
    updated[currentIndex] = index;
    setSelectedAnswers(updated);
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((value) => value + 1);
      setSelectedAnswer(selectedAnswers[currentIndex + 1]);
      setShowResult(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((value) => value - 1);
      setSelectedAnswer(selectedAnswers[currentIndex - 1]);
      setShowResult(false);
    }
  };

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const score = questions.reduce((total, question, index) => {
    return total + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
  }, 0);

  const resetQuiz = () => {
    setQuestions([]);
    setSelectedAnswers([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setError('');
  };

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Random Quiz</p>
            <h1 className="mt-2 text-4xl font-bold text-white">Sharpen your skills</h1>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/30">
          <div className="mb-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <label className="mb-2 block text-sm text-slate-300">Topic</label>
              <select
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none"
              >
                {randomTopics.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <label className="mb-2 block text-sm text-slate-300">Difficulty</label>
              <select
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value as Difficulty)}
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <label className="mb-2 block text-sm text-slate-300">Questions</label>
              <div className="flex h-[42px] items-center rounded-xl border border-slate-600 bg-slate-800 px-3 text-white">
                10
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={generateQuiz}
            disabled={loading}
            className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:opacity-95 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? 'Generating...' : 'Generate Quiz'}
          </button>

          {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => resetQuiz()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <div className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-200">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/40">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Random Quiz</p>
            <h2 className="mt-2 text-3xl font-bold text-white">{topic}</h2>
          </div>
          <div className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
            {difficulty}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {['easy', 'medium', 'hard', 'mixed'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setDifficulty(level as Difficulty)}
              className={`rounded-full border px-3 py-2 text-sm transition ${
                difficulty === level
                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200'
                  : 'border-slate-700 bg-slate-800 text-slate-200 hover:border-slate-500'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <MCQQuestion
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
          showResult={showResult}
        />

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <div className="text-sm text-slate-300">
            Correct: {score} / {questions.length}
          </div>

          <button
            type="button"
            onClick={() => {
              if (isLast) {
                addRandomQuizResult(topic, score, questions.length);
                setQuestions([]);
                return;
              }
              handleNext();
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white"
          >
            {isLast ? 'Finish' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
