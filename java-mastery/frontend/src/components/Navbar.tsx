import { BookOpen, ChartNoAxesCombined, Home, MoonStar, PenLine, Sparkles, SunMedium } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore, type Theme } from '../store/themeStore';

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/practice?set=java-1&track=java', label: 'Practice' },
  { to: '/quiz?set=java-1&track=java', label: 'Quiz' },
  { to: '/set/java-1', label: 'Set' },
];

const mobileLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Progress', icon: ChartNoAxesCombined },
  { to: '/practice?set=java-1&track=java', label: 'Practice', icon: PenLine },
  { to: '/quiz?set=java-1&track=java', label: 'Quiz', icon: BookOpen },
];

const themeOptions: { key: Theme; label: string; icon: typeof SunMedium }[] = [
  { key: 'dark', label: 'Dark', icon: MoonStar },
  { key: 'light', label: 'Light', icon: SunMedium },
  { key: 'soft', label: 'Soft', icon: Sparkles },
];

export default function Navbar() {
  const location = useLocation();
  const { theme, setTheme } = useThemeStore();

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--card-bg)]/90 px-3 py-2.5 backdrop-blur-xl sm:px-6 sm:py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
            D
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Dev</p>
            <p className="truncate text-sm font-semibold text-[var(--text-primary)]">Dojo</p>
          </div>
        </div>

        <div className="hidden items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 md:flex">
          {links.map((link) => {
            const targetPath = link.to.split('?')[0];
            const isActive = location.pathname === targetPath;

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-cyan-500/15 text-cyan-200 shadow-sm shadow-cyan-500/10' : 'text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 sm:gap-2">
          {themeOptions.map(({ key, label, icon: Icon }) => {
            const active = key === theme;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setTheme(key)}
                className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-medium transition ${
                  active ? 'bg-[var(--text-primary)] text-[var(--app-bg)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                aria-label={`Switch to ${label} mode`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]/95 p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.28)] backdrop-blur-xl md:hidden" style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}>
        {mobileLinks.map(({ to, label, icon: Icon }) => {
          const targetPath = to.split('?')[0];
          const isActive = location.pathname === targetPath;

          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-[10px] font-medium transition ${
                isActive ? 'bg-cyan-500/15 text-cyan-200' : 'text-[var(--text-secondary)]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
