import { useState } from 'react';
import { Link } from 'react-router-dom';
import MCQQuestion from '../components/MCQQuestion';
import { sampleQuestions } from '../data/questions';

export default function QuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = sampleQuestions[currentIndex];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentIndex((prev) => (prev + 1) % sampleQuestions.length);
  };

  return (
    <div className="mx-auto max-w-4xl px-3 py-6 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Knowledge check</p>
          <h2 className="mt-2 text-2xl font-bold text-cyan-300 sm:text-3xl">Quiz</h2>
        </div>
        <Link to="/practice" className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200">
          Practice set
        </Link>
      </div>

      <div className="mb-4 text-sm text-slate-400">
        Question {currentIndex + 1} of {sampleQuestions.length}
      </div>

      <MCQQuestion
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
        showResult={showResult}
      />

      {showResult && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/25"
          >
            {currentIndex === sampleQuestions.length - 1 ? 'Restart quiz' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  );
}
