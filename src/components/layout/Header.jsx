import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const CONTAINER = 'w-full max-w-[1200px] mx-auto px-5';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/licenses', label: 'Licenses' },
  { to: '/products', label: 'Add-ons' },
  { to: '/services', label: 'Services' },
  { to: '/cloud-hosting', label: 'Cloud Hosting' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const getNavLinkClassName = ({ isActive }) =>
  `block text-[0.9375rem] font-medium px-3 py-2.5 rounded-lg transition-all duration-200 max-[900px]:py-3 max-[900px]:px-4 max-[900px]:text-base max-[900px]:rounded-xl ${isActive
    ? 'text-primary-hover font-semibold bg-primary/10 dark:text-secondary dark:bg-secondary/20 dark:font-semibold max-[900px]:bg-primary/20 max-[900px]:dark:bg-secondary/25 max-[900px]:border-l-4 max-[900px]:border-primary max-[900px]:dark:border-secondary max-[900px]:pl-[calc(1rem-4px)]'
    : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5 dark:hover:text-secondary dark:hover:bg-secondary/15 max-[900px]:hover:bg-primary/10 max-[900px]:dark:hover:bg-secondary/15'
  }`;

const actionLinkClass =
  'inline-flex items-center justify-center gap-1.5 text-[0.9375rem] font-semibold text-primary dark:text-gray-200 px-4 py-2.5 rounded-xl border border-primary/30 dark:border-secondary/40 transition-all duration-200 hover:bg-primary/10 hover:border-primary dark:hover:bg-secondary/20 dark:hover:border-secondary max-[900px]:w-full max-[900px]:py-3';

const utilityLinkClass =
  'inline-flex items-center gap-2 text-[0.8125rem] font-medium text-gray-600 dark:text-gray-400 no-underline transition-colors duration-200 hover:text-primary dark:hover:text-secondary [&>span]:opacity-80';

const PROFILE_DROPDOWN_LINKS = [
  { to: '/dashboard', label: 'Settings', icon: 'icon-[mdi--cog-outline]' },
  { to: '/dashboard', label: 'Profile', icon: 'icon-[mdi--account-outline]' },
];

export default function Header({ menuOpen, onMenuToggle, closeMenu, user, logout }) {
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      data-theme={theme}
      className="sticky top-0 z-100 bg-white dark:bg-gray-900 border-b border-gray-200/80 dark:border-gray-700/80 shadow-sm dark:shadow-none"
    >
      {/* Top bar - hidden on mobile to avoid duplicate with sidebar header */}
      <div className="hidden min-[901px]:block bg-gray-50 dark:bg-gray-900 border-b border-gray-200/80 dark:border-gray-700/80">
        <div className={`${CONTAINER} flex justify-end items-center py-2 sm:py-2.5`}>
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap justify-end">
            <a href="tel:+918448449099" className={utilityLinkClass}>
              <span className="icon-[mdi--phone] text-[13px] shrink-0" aria-hidden />
              <span className="hidden sm:inline">+91 8448449099</span>
            </a>
            <a href="mailto:info@axatech.com" className={utilityLinkClass}>
              <span className="icon-[mdi--email-outline] text-[13px] shrink-0" aria-hidden />
              <span className="hidden sm:inline">info@axatech.com</span>
            </a>
            <span className="w-px h-4 bg-gray-300 dark:bg-gray-600 hidden sm:block" aria-hidden />
            <Link to="/contact" className={utilityLinkClass} onClick={closeMenu}>
              Career
            </Link>
            <Link to="/contact" className={utilityLinkClass} onClick={closeMenu}>
              <span className="icon-[mdi--download] text-[13px] shrink-0" aria-hidden />
              Download
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white dark:bg-gray-900">
        <div className={`${CONTAINER} relative flex items-center justify-between gap-6 py-4`}>
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 no-underline transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
            onClick={closeMenu}
          >
            <img src="/logo.png" alt="Axatech" className="h-11 sm:h-[50px] w-auto object-contain" />
          </Link>

          <div className='flex items-center gap-2'>

            {/* Mobile: theme toggle before hamburger */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex lg:hidden items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-primary dark:text-secondary cursor-pointer transition-all duration-200 hover:bg-primary/10 dark:hover:bg-secondary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <span className="icon-[mdi--weather-sunny] text-[20px]" aria-hidden />
              ) : (
                <span className="icon-[mdi--weather-night] text-[20px]" aria-hidden />
              )}
            </button>

            <button
              type="button"
              className="header-hamburger-btn flex lg:hidden items-center justify-center w-11 h-11 rounded-xl p-0 border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 cursor-pointer text-primary dark:text-secondary transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={onMenuToggle}
            >
              <svg className="header-hamburger-svg" viewBox="0 0 32 32" aria-hidden>
                <path
                  className="header-hamburger-line header-hamburger-line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                />
                <path className="header-hamburger-line" d="M7 16 27 16" />
              </svg>
            </button>

          </div>

          <nav
            className={`flex items-center gap-0.5 flex-1 justify-end max-[900px]:absolute max-[900px]:top-full max-[900px]:left-0 max-[900px]:right-0 max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:bg-white max-[900px]:dark:bg-gray-900 max-[900px]:border-b max-[900px]:border-gray-200 max-[900px]:dark:border-gray-700 max-[900px]:shadow-xl max-[900px]:rounded-b-2xl max-[900px]:overflow-y-auto max-[900px]:max-h-[calc(100vh-120px)] max-[900px]:pt-0 ${menuOpen ? 'max-[900px]:flex' : 'max-[900px]:hidden'
              }`}
          >

            <div className="flex items-center space-y-2 gap-0.5 max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-0 max-[900px]:px-4 max-[900px]:pt-5 max-[900px]:pb-5 max-[900px]:border-b max-[900px]:border-gray-100 max-[900px]:dark:border-gray-700">
              {NAV_LINKS.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={closeMenu}
                  className={getNavLinkClassName}
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2.5 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 max-[900px]:ml-0 max-[900px]:border-l-0 max-[900px]:gap-3 max-[900px]:flex-col max-[900px]:px-4 max-[900px]:pt-5 max-[900px]:pb-5">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex max-[900px]:hidden items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-primary dark:text-secondary cursor-pointer transition-all duration-200 hover:bg-primary/10 dark:hover:bg-secondary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <span className="icon-[mdi--weather-sunny] text-[20px]" aria-hidden />
                ) : (
                  <span className="icon-[mdi--weather-night] text-[20px]" aria-hidden />
                )}
              </button>

              {user ? (
                <>
                  {user.role === 'admin' && (
                    <NavLink to="/admin" onClick={closeMenu} className={actionLinkClass}>
                      <span className="icon-[mdi--shield-account] text-[18px] shrink-0" aria-hidden />
                      Admin
                    </NavLink>
                  )}
                  <div className="relative" ref={profileRef}>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-[0.9375rem] font-semibold text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 cursor-pointer transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 dark:hover:border-secondary/50 dark:hover:bg-secondary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 max-[900px]:w-full max-[900px]:justify-center"
                      onClick={() => setProfileOpen((o) => !o)}
                      aria-expanded={profileOpen}
                      aria-haspopup="true"
                    >
                      <span className="icon-[mdi--account-circle] text-[22px] shrink-0 text-primary dark:text-secondary" aria-hidden />
                      <span className="max-[900px]:hidden">Profile</span>
                      <span
                        className={`icon-[mdi--chevron-down] text-lg shrink-0 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                        aria-hidden
                      />
                    </button>
                    {profileOpen && (
                      <div
                        className="absolute right-0 top-full mt-2 min-w-[200px] py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-xl shadow-gray-200/50 dark:shadow-black/20 z-110"
                        role="menu"
                      >
                        {PROFILE_DROPDOWN_LINKS.map(({ to, label, icon }) => (
                          <Link
                            key={label}
                            to={to}
                            role="menuitem"
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-[0.9375rem] font-medium text-gray-700 dark:text-gray-200 no-underline transition-colors duration-200 hover:bg-primary/5 hover:text-primary dark:hover:bg-secondary/20 dark:hover:text-white"
                            onClick={() => {
                              closeMenu();
                              setProfileOpen(false);
                            }}
                          >
                            <span className={`${icon} text-[20px] shrink-0 opacity-80`} aria-hidden />
                            {label}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 dark:border-gray-600 my-2" />
                        <button
                          type="button"
                          role="menuitem"
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-[0.9375rem] font-medium text-gray-700 dark:text-gray-200 text-left transition-colors duration-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                          onClick={() => {
                            logout();
                            closeMenu();
                            setProfileOpen(false);
                          }}
                        >
                          <span className="icon-[mdi--logout] text-[20px] shrink-0 opacity-80" aria-hidden />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-[0.9375rem] font-semibold rounded-xl bg-transparent text-primary dark:text-gray-200 border-2 border-primary/40 dark:border-gray-500 transition-all duration-200 hover:bg-primary hover:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:hover:border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 max-[900px]:w-full max-[900px]:py-3"
                    onClick={closeMenu}
                  >
                    <span className="icon-[mdi--login] text-[18px] shrink-0" aria-hidden />
                    Login
                  </Link>
                  <Link
                    to="/licenses"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-5 text-[0.9375rem] font-semibold rounded-xl bg-secondary text-white border-0 shadow-md shadow-secondary/25 transition-all duration-200 hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 max-[900px]:w-full max-[900px]:py-3"
                    onClick={closeMenu}
                  >
                    <span className="icon-[mdi--cart-outline] text-[18px] shrink-0" aria-hidden />
                    Buy
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-5 text-[0.9375rem] font-semibold rounded-xl bg-primary text-white border-0 shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 max-[900px]:w-full max-[900px]:py-3"
                    onClick={closeMenu}
                  >
                    Talk To Expert
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
