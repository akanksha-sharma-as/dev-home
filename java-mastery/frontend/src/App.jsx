import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SetPage from './pages/SetPage';
import QuizPage from './pages/QuizPage';
import RandomQuizPage from './pages/RandomQuizPage';
import DashboardPage from './pages/DashboardPage';
import PracticePage from './pages/PracticePage';
import { useThemeStore } from './store/themeStore';
import { Analytics } from '@vercel/analytics/react';

class AppErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-xl px-4 py-16 text-center">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-8">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">This page could not load</h1>
            <p className="mt-2 text-[var(--text-secondary)]">Refresh the page or return home to continue learning.</p>
            <a href="/" className="mt-5 inline-flex rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950">Back to home</a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search]);

  return null;
}

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <AppErrorBoundary>
        <div className="min-h-screen bg-transparent text-slate-100">
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/set/:id" element={<SetPage />} />
            <Route path="/set/:id/quiz" element={<QuizPage />} />
            <Route path="/set/:id/practice" element={<PracticePage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/random-quiz" element={<RandomQuizPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
          <Analytics />
        </div>
      </AppErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
