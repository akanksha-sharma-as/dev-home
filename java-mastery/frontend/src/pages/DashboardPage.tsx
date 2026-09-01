import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { allSets } from '../data/allSets';
import { useProgressStore } from '../store/progressStore';

const allCurriculum = ['all', 'Java', 'Spring Boot', 'DSA'] as const;

export default function DashboardPage() {
  const { progress } = useProgressStore();
  const [track, setTrack] = useState<(typeof allCurriculum)[number]>('all');

  const displaySets = useMemo(() => {
    if (track === 'all') return allSets;
    return allSets.filter((set) => set.topic === track);
  }, [track]);

  const bestScore =
    Object.values(progress.setScores).length > 0
      ? Math.max(...Object.values(progress.setScores))
      : 0;

  const stats = [
    {
      label: 'Sets Completed',
      value: String(progress.completedSets.length),
      tone: 'text-cyan-300',
    },
    {
      label: 'Total Quizzes',
      value: String(progress.totalQuizzesTaken),
      tone: 'text-green-300',
    },
    {
      label: 'Best Score',
      value: `${bestScore}%`,
      tone: 'text-violet-300',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8 sm:gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">Overview</p>
          <h2 className="mt-2 text-2xl font-bold text-cyan-300 sm:text-3xl">Dashboard</h2>
        </div>
        <Link
          to="/"
          className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-300 transition hover:border-cyan-400 sm:px-4"
        >
          Back to home
        </Link>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
            <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
            <p className={`mt-3 text-3xl font-bold ${stat.tone}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">Progress</p>
        <ProgressBar value={Math.min(progress.completedSets.length * 10, 100)} label="Course completion" />
      </div>

      <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">Track overview</h3>
          <div className="flex flex-wrap gap-2">
            {allCurriculum.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTrack(item)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  track === item
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-200'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item === 'all' ? 'All' : item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {allCurriculum
            .filter((item) => item !== 'all')
            .map((curriculum) => {
              const programSets = allSets.filter((set) => set.topic === curriculum);
              const completed = programSets.filter((set) => {
                return progress.completedSets.includes(set.id);
              }).length;
              const percentage = programSets.length ? Math.round((completed / programSets.length) * 100) : 0;

              return (
                <div key={curriculum} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{curriculum}</span>
                    <span className="text-xs text-[var(--text-muted)]">{percentage}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--panel)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">Recent learning</h3>
          <div className="space-y-4">
            {displaySets.slice(0, 4).map((set) => (
              <div key={set.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-cyan-300">{set.title}</span>
                  <span className="text-xs text-[var(--text-muted)]">{set.topic}</span>
                </div>
                <ProgressBar value={set.completed} max={set.total} label={`${set.completed}/${set.total} completed`} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">Track focus</h3>
          <div className="space-y-3">
            {['Java', 'Spring Boot', 'DSA'].map((trackName, index) => (
              <div key={trackName} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[var(--text-primary)]">{trackName}</span>
                  <span className="text-sm text-[var(--text-muted)]">{[72, 65, 81, 58][index]}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[var(--panel)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    style={{ width: `${[72, 65, 81, 58][index]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {progress.randomQuizHistory.length > 0 && (
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">Recent random quizzes</h3>
          <div className="space-y-3">
            {progress.randomQuizHistory.slice(0, 5).map((entry, index) => (
              <div key={`${entry.date}-${index}`} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-cyan-300">{entry.topic}</span>
                  <span className="text-xs text-[var(--text-muted)]">{new Date(entry.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Score: <span className="text-cyan-300">{entry.score}</span> / {entry.total}
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--panel)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    style={{ width: `${(entry.score / entry.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
