import type { PracticeProblem } from '../types';

type Props = {
  problem: PracticeProblem;
};

const DIFFICULTY_COLORS = {
  easy: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
  medium: 'border-amber-500/50 bg-amber-500/10 text-amber-300',
  hard: 'border-red-500/50 bg-red-500/10 text-red-300',
};

export default function PracticeProblemCard({ problem }: Props) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/30">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-100">{problem.title}</h3>
        <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${DIFFICULTY_COLORS[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {problem.hints.slice(0, 2).map((hint) => (
          <span key={hint} className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-slate-300">
            {hint}
          </span>
        ))}
      </div>

      <p className="mb-4 text-sm leading-6 text-slate-300">{problem.description}</p>

      {problem.examples && problem.examples.length > 0 && (
        <div className="mb-4 rounded-xl border border-slate-700 bg-slate-950/40 p-3">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Example</p>
          <p className="text-sm text-cyan-300">Input: {problem.examples[0].input}</p>
          <p className="mt-1 text-sm text-slate-200">Output: {problem.examples[0].output}</p>
        </div>
      )}

      <div className="mt-2 rounded-xl border border-slate-700 bg-slate-950/30 p-3">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Approach</p>
        <p className="text-sm leading-6 text-slate-200">{problem.approach}</p>
      </div>

      {problem.code && (
        <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-700 bg-slate-950/40 p-3 text-xs leading-6 text-slate-200 whitespace-pre-wrap">
          {problem.code}
        </pre>
      )}
    </div>
  );
}
