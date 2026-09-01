import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SetPage from './pages/SetPage';
import QuizPage from './pages/QuizPage';
import RandomQuizPage from './pages/RandomQuizPage';
import DashboardPage from './pages/DashboardPage';
import PracticePage from './pages/PracticePage';
import { useThemeStore } from './store/themeStore';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-transparent text-slate-100">
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
      </div>
    </BrowserRouter>
  );
}

export default App;
