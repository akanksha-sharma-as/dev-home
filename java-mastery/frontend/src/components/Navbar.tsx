import { MoonStar, Sparkles, SunMedium } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore, type Theme } from '../store/themeStore';

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/practice?set=java-1&track=java', label: 'Practice' },
  { to: '/quiz?set=java-1&track=java', label: 'Quiz' },
  { to: '/set/java-1', label: 'Set' },
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
    <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--card-bg)]/90 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
            D
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/80">Dev</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Dojo</p>
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

        <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
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
    </nav>
  );
}
