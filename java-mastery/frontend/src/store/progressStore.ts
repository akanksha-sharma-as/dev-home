import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress } from '../types';

interface ProgressStore {
  progress: UserProgress;
  markSetComplete: (setId: number, score: number) => void;
  markTopicSeen: (setId: number, topicIndex: number) => void;
  addRandomQuizResult: (topic: string, score: number, total: number) => void;
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  completedSets: [],
  setScores: {},
  topicsSeen: {},
  totalQuizzesTaken: 0,
  lastActivity: new Date().toISOString(),
  randomQuizHistory: [],
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      progress: defaultProgress,
      markSetComplete: (setId, score) =>
        set((state) => ({
          progress: {
            ...state.progress,
            completedSets: state.progress.completedSets.includes(setId)
              ? state.progress.completedSets
              : [...state.progress.completedSets, setId],
            setScores: {
              ...state.progress.setScores,
              [setId]: Math.max(state.progress.setScores[setId] ?? 0, score),
            },
            totalQuizzesTaken: state.progress.totalQuizzesTaken + 1,
            lastActivity: new Date().toISOString(),
          },
        })),
      markTopicSeen: (setId, topicIndex) =>
        set((state) => {
          const existing = state.progress.topicsSeen[setId] ?? [];
          if (existing.includes(topicIndex)) return state;
          return {
            progress: {
              ...state.progress,
              topicsSeen: {
                ...state.progress.topicsSeen,
                [setId]: [...existing, topicIndex],
              },
            },
          };
        }),
      addRandomQuizResult: (topic, score, total) =>
        set((state) => ({
          progress: {
            ...state.progress,
            totalQuizzesTaken: state.progress.totalQuizzesTaken + 1,
            lastActivity: new Date().toISOString(),
            randomQuizHistory: [
              { date: new Date().toISOString(), score, topic, total },
              ...state.progress.randomQuizHistory.slice(0, 19),
            ],
          },
        })),
      resetProgress: () => set({ progress: defaultProgress }),
    }),
    { name: 'dev-dojo-progress' }
  )
);
