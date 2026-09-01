import type { Question } from '../types';

interface Props {
  question: Question;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  showResult: boolean;
}

const optionLabels = ['A', 'B', 'C', 'D'];

export default function MCQQuestion({
  question,
  selectedAnswer,
  onAnswer,
  showResult,
}: Props) {
  const getOptionStyle = (index: number) => {
    if (showResult && index === question.correctAnswer) {
      return 'border-green-500 bg-green-500/10 text-green-300';
    }

    if (showResult && index === selectedAnswer && index !== question.correctAnswer) {
      return 'border-red-500 bg-red-500/10 text-red-300';
    }

    if (selectedAnswer === index) {
      return 'border-blue-500 bg-blue-500/10 text-blue-300';
    }

    return 'border-slate-700 bg-slate-900/40 text-slate-200 hover:border-slate-500';
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6 shadow-lg">
      <p className="mb-4 text-lg font-medium text-slate-100">{question.question}</p>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onAnswer(index)}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${getOptionStyle(index)}`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current text-sm font-semibold">
              {optionLabels[index]}
            </span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950/50 p-4">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">
            Explanation
          </p>
          <p className="text-slate-200">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
