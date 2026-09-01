import { Link, useParams, useSearchParams } from 'react-router-dom';
import PracticeProblemCard from '../components/PracticeProblemCard';
import { allSets } from '../data/allSets';
import { learningSets } from './SetPage';

const resolveLearningSet = (routeId: string | null | undefined) => {
  const safeRouteId = String(routeId ?? 'java-1').toLowerCase();
  const routeMeta = allSets.find((set) => set.id.toLowerCase() === safeRouteId);

  if (routeMeta) {
    const fallback = safeRouteId.startsWith('java-')
      ? learningSets[0]
      : safeRouteId.startsWith('springboot-')
        ? learningSets[3]
        : safeRouteId.startsWith('dsa-')
          ? learningSets[4]
          : learningSets[0];

    return {
      ...fallback,
      id: Number(routeMeta.id.split('-').pop() ?? fallback.id),
      title: routeMeta.title,
      subtitle: routeMeta.title,
      topics: routeMeta.topics.map((topicTitle, index) => ({
        ...((fallback.topics[index % fallback.topics.length] ?? fallback.topics[0])),
        title: topicTitle,
      })),
    };
  }

  if (safeRouteId.startsWith('java-')) return learningSets[0];
  if (safeRouteId.startsWith('springboot-')) return learningSets[3];
  if (safeRouteId.startsWith('dsa-')) return learningSets[4];

  const matchedSet = learningSets.find((set) => String(set.id) === safeRouteId);
  return matchedSet ?? learningSets[0];
};

export default function PracticePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const routeId = id ?? searchParams.get('set') ?? 'java-1';
  const selectedSet = resolveLearningSet(routeId);
  const selectedTopicName = searchParams.get('topic') ?? selectedSet.topics[0]?.title ?? 'General Practice';
  const chosenTopic = selectedSet.topics.find((topic) => topic.title === selectedTopicName) ?? selectedSet.topics[0];
  const practiceProblems = chosenTopic?.practiceProblems ?? selectedSet.practiceProblems ?? [];
  const track = routeId.startsWith('dsa-') ? 'DSA' : routeId.startsWith('springboot-') ? 'Spring Boot' : 'Java';

  if (!routeId) {
    return (
      <div className="mx-auto max-w-5xl px-3 py-6 sm:px-6 sm:py-10">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-10 text-center">
          <p className="text-xl font-semibold text-slate-100">Set not found.</p>
          <Link to="/" className="mt-4 inline-flex rounded-xl bg-cyan-500 px-4 py-2 text-sm text-slate-950">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-3 py-6 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8 sm:gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{track}</p>
          <h2 className="mt-2 text-2xl font-bold text-cyan-300 sm:text-3xl">{selectedSet.title} Practice</h2>
        </div>
        <Link to="/" className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
          Back to home
        </Link>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-slate-200 sm:p-6">
        <p className="text-base leading-relaxed sm:text-lg">
          Try to solve it mentally <span className="font-semibold text-cyan-300">(or on paper)</span> before revealing hints or the approach.
          The goal is to practice <span className="font-semibold text-cyan-300">recognizing patterns</span> and building the solution from scratch.
        </p>
      </div>

      {practiceProblems.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {practiceProblems.map((problem) => (
            <PracticeProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 text-slate-200">
          <p className="text-lg font-medium text-slate-100">No practice problems are available for this topic yet.</p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-700 pt-6">
        <Link to={`/set/${routeId}`} className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:border-slate-500">
          Back to Topics
        </Link>
        <Link
          to={`/set/${routeId}/quiz`}
          className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-yellow-500/20"
        >
          Take Quiz
        </Link>
      </div>
    </div>
  );
}
