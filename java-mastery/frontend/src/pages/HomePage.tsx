import { Link, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { allSets } from '../data/allSets';

const TRACK_CONFIG = {
  java: {
    label: 'Java',
    badge: 'bg-blue-600',
    active: 'border-blue-500 text-blue-200',
    color: 'text-blue-300',
    highlight: 'from-blue-500 to-cyan-500',
  },
  springboot: {
    label: 'Spring Boot',
    badge: 'bg-green-600',
    active: 'border-green-500 text-green-200',
    color: 'text-green-300',
    highlight: 'from-green-500 to-emerald-500',
  },
  dsa: {
    label: 'DSA',
    badge: 'bg-violet-600',
    active: 'border-violet-500 text-violet-200',
    color: 'text-violet-300',
    highlight: 'from-violet-500 to-purple-500',
  },
} as const;

const TRACK_DESCRIPTIONS = {
  java: 'Build a strong Java foundation with practical fundamentals, design patterns, and clean coding habits.',
  springboot: 'Create production-ready backend services with REST APIs, security, and real-world architecture patterns.',
  dsa: 'Sharpen your problem-solving instincts with arrays, trees, graphs, and algorithmic thinking.',
};

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTrack = (searchParams.get('track') as keyof typeof TRACK_CONFIG) || 'java';
  const [activeTrack, setActiveTrack] = useState<keyof typeof TRACK_CONFIG>(initialTrack);

  const trackData = useMemo(() => TRACK_CONFIG[activeTrack], [activeTrack]);
  const visibleSets = useMemo(() => allSets.filter((set) => set.topic === trackData.label), [trackData.label]);

  const handleTrackChange = (track: keyof typeof TRACK_CONFIG) => {
    setActiveTrack(track);
    setSearchParams({ track });
  };

  const overviewCards = [
    { label: 'Available sets', value: String(visibleSets.length), tone: 'text-cyan-300' },
    { label: 'Topics covered', value: String(visibleSets.reduce((sum, set) => sum + set.topics.length, 0)), tone: 'text-violet-300' },
    { label: 'Track focus', value: trackData.label, tone: 'text-emerald-300' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="mb-6 overflow-hidden rounded-[28px] border border-[var(--border)] bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_26%),linear-gradient(135deg,var(--card-bg),var(--panel))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-cyan-300/90">Java mastery</p>
            <h1 className="text-4xl font-black tracking-tight text-[var(--text-primary)] md:text-5xl">Learn faster. Build smarter.</h1>
            <p className="mt-4 max-w-xl text-base text-[var(--text-secondary)] md:text-lg">{TRACK_DESCRIPTIONS[activeTrack]}</p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-lg shadow-[rgba(15,23,42,0.08)]">
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-r ${trackData.highlight}`} />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">Current track</p>
              <p className={`mt-1 text-xl font-semibold ${trackData.color}`}>{trackData.label}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {(Object.keys(TRACK_CONFIG) as Array<keyof typeof TRACK_CONFIG>).map((track) => {
          const config = TRACK_CONFIG[track];
          const isActive = track === activeTrack;

          return (
            <button
              key={track}
              type="button"
              onClick={() => handleTrackChange(track)}
              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                isActive
                  ? `border-cyan-500/60 bg-[var(--surface)] shadow-[0_18px_40px_rgba(6,182,212,0.12)] ${config.active}`
                  : 'border-[var(--border)] bg-[var(--panel)] text-[var(--text-primary)] hover:border-[var(--border)] hover:bg-[var(--surface)]'
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${config.badge} text-lg font-bold text-white`}>
                  {config.label.slice(0, 1)}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">Track</span>
              </div>
              <p className="text-xl font-semibold text-[var(--text-primary)]">{config.label}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{TRACK_DESCRIPTIONS[track]}</p>
            </button>
          );
        })}
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {overviewCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
            <p className="text-sm text-[var(--text-muted)]">{card.label}</p>
            <p className={`mt-3 text-3xl font-bold ${card.tone}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold text-cyan-300">{trackData.label} curriculum</h2>
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--text-secondary)]">
              {visibleSets.length} sets
            </span>
          </div>

          <div className="grid gap-3">
            {visibleSets.map((set, index) => (
              <Link
                key={set.id}
                to={`/set/${set.id}`}
                className="group block cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition duration-200 hover:border-cyan-500/40 hover:bg-[var(--panel)]"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-300">
                      {index + 1}
                    </span>
                    <span className="text-lg font-medium text-[var(--text-primary)]">{set.title}</span>
                  </div>
                  <span className="text-sm font-medium text-cyan-300 transition group-hover:text-cyan-200">Open</span>
                </div>

                <div className="mb-3 flex flex-wrap gap-2">
                  {set.topics.slice(0, 4).map((topic) => (
                    <span key={topic} className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-[var(--surface)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500"
                    style={{ width: `${(set.completed / set.total) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                  <span>{set.completed}/{set.total}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">{set.difficulty}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
          <h3 className="mb-5 text-xl font-semibold text-[var(--text-primary)]">What you will get</h3>
          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-sm text-[var(--text-muted)]">Structured learning</p>
              <p className="mt-2 text-3xl font-bold text-cyan-300">01</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-sm text-[var(--text-muted)]">Practice loops</p>
              <p className="mt-2 text-3xl font-bold text-violet-300">02</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-sm text-[var(--text-muted)]">Quizzes</p>
              <p className="mt-2 text-3xl font-bold text-emerald-300">03</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
