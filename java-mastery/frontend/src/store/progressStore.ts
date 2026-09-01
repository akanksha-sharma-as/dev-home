import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress } from '../types';

interface ProgressStore {
  progress: UserProgress;
  markSetComplete: (setId: string, score?: number) => void;
  markTopicComplete: (setId: string, topicIndex: number) => void;
  addRandomQuizResult: (topic: string, score: number, total: number) => void;
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  completedSets: [],
  setScores: {},
  topicsSeen: {},
  completedTopics: {},
  totalQuizzesTaken: 0,
  lastActivity: new Date().toISOString(),
  randomQuizHistory: [],
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      progress: defaultProgress,
      markSetComplete: (setId, score = 100) =>
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
            lastActivity: new Date().toISOString(),
          },
        })),
      markTopicComplete: (setId, topicIndex) =>
        set((state) => {
          const existing = state.progress.completedTopics?.[setId] ?? [];
          if (existing.includes(topicIndex)) return state;
          return {
            progress: {
              ...state.progress,
              completedTopics: {
                ...(state.progress.completedTopics ?? {}),
                [setId]: [...existing, topicIndex],
              },
              lastActivity: new Date().toISOString(),
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
