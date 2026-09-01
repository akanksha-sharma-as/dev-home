import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { TraceStep } from '../types';

type Props = {
  steps: TraceStep[];
};

export default function TraceThrough({ steps }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  if (!steps || steps.length === 0) {
    return <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-slate-300">No trace steps available.</div>;
  }

  const currentStep = steps[activeStep];
  const canGoPrev = activeStep > 0;
  const canGoNext = activeStep < steps.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {steps.map((step, index) => (
            <button
              key={`${step.label}-${index}`}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                activeStep === index
                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200'
                  : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
              }`}
            >
              Step {index + 1}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!canGoPrev}
            onClick={() => setActiveStep((value) => Math.max(0, value - 1))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous step"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={!canGoNext}
            onClick={() => setActiveStep((value) => Math.min(steps.length - 1, value + 1))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next step"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-cyan-300">{currentStep.label}</span>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{activeStep + 1}/{steps.length}</span>
        </div>

        <p className="mb-4 text-sm leading-6 text-slate-200">{currentStep.explanation}</p>

        {currentStep.array && (
          <div className="flex flex-wrap gap-2">
            {currentStep.array.map((value, index) => {
              const isHighlighted = currentStep.highlights?.includes(index) ?? false;
              return (
                <div
                  key={`${value}-${index}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium ${
                    isHighlighted
                      ? 'border-cyan-500 bg-cyan-500/20 text-cyan-100'
                      : 'border-slate-600 bg-slate-800 text-slate-200'
                  }`}
                >
                  {value}
                </div>
              );
            })}
          </div>
        )}

        {currentStep.pointers && currentStep.pointers.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {currentStep.pointers.map((pointer) => (
              <span
                key={`${pointer.name}-${pointer.index}`}
                className="rounded-full border px-2 py-1 text-xs text-slate-200"
                style={{ borderColor: pointer.color, backgroundColor: `${pointer.color}20` }}
              >
                {pointer.name}: {pointer.index}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
