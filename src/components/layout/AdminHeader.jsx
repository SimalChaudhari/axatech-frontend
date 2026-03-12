import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const PROFILE_DROPDOWN_LINKS = [
  { to: '/dashboard', label: 'Settings', icon: 'icon-[mdi--cog-outline]' },
  { to: '/dashboard', label: 'Profile', icon: 'icon-[la--user-secret]' },
];

export default function AdminHeader({ sidebarOpen, onMenuToggle }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate('/');
  };

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 bg-slate-100 dark:bg-gray-900 px-4 py-3 md:px-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex md:hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={sidebarOpen}
        >
          <span className="icon-[mdi--menu] text-2xl" aria-hidden />
        </button>
        {/* <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Admin</span> */}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-primary transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-secondary dark:hover:bg-secondary/20"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <span className="icon-[mdi--weather-sunny] text-[20px]" aria-hidden />
          ) : (
            <span className="icon-[mdi--weather-night] text-[20px]" aria-hidden />
          )}
        </button>
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 py-2 px-3 text-[0.9375rem] font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            onClick={() => setProfileOpen((o) => !o)}
            aria-expanded={profileOpen}
            aria-haspopup="true"
            >
            <span className="icon-[la--user-secret] text-[25px] shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
            <span className="hidden sm:inline">Profile</span>
            <span
              className={`icon-[mdi--chevron-down] text-lg shrink-0 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </button>
          {profileOpen && (
            <div
              className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white py-2 shadow-xl shadow-gray-200/50 dark:border-gray-600 dark:bg-gray-800 dark:shadow-black/20"
              role="menu"
            >
            {PROFILE_DROPDOWN_LINKS.map(({ to, label, icon }) => (
              <Link
                key={label}
                to={to}
                role="menuitem"
                className="flex items-center gap-3 w-full px-4 py-2.5 text-[0.9375rem] font-medium text-gray-700 no-underline transition-colors hover:bg-emerald-500/10 hover:text-emerald-700 dark:text-gray-200 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-300"
                onClick={() => setProfileOpen(false)}
              >
                <span className={`${icon} text-[20px] shrink-0 opacity-80`} aria-hidden />
                {label}
              </Link>
            ))}
            <div className="my-2 border-t border-gray-100 dark:border-gray-600" />
            <button
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[0.9375rem] font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-200 dark:hover:bg-red-900/20 dark:hover:text-red-400"
              onClick={handleLogout}
            >
              <span className="icon-[mdi--logout] text-[20px] shrink-0 opacity-80" aria-hidden />
              Logout
            </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
