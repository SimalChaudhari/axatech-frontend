import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import api from '../../api';
import {
  PhoneIcon,
  EmailOutlineIcon,
  DownloadIcon,
  WeatherSunnyIcon,
  WeatherNightIcon,
  ShieldAccountIcon,
  AccountCircleIcon,
  ChevronDownIcon,
  CogOutlineIcon,
  AccountOutlineIcon,
  LogoutIcon,
  LoginIcon,
  CartOutlineIcon,
  CloseIcon,
} from '../icons';
import { Button, LevelItem } from '../common';
import TechnologiesDropdown from './TechnologiesDropdown';
import './Header.css';

const CONTAINER = 'w-full max-w-[1200px] mx-auto px-5';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/licenses', label: 'Tally', hasTallyLevel: true },
  { to: '/products', label: 'TDL Shop', hasTdlLevel: true },
  { to: '/technologies', label: 'Technologies', hasDropdown: true },
  { to: '/web-app-development', label: 'Web App' },
  { to: '/blog', label: 'Blogs' },
  { to: '/projects', label: 'Projects' },
];

const getNavLinkClassName = ({ isActive }) =>
  `block text-[0.9375rem] font-medium px-3 py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap max-[900px]:py-3 max-[900px]:px-4 max-[900px]:text-base max-[900px]:rounded-xl ${isActive
    ? 'bg-info-lighter text-info-dark dark:bg-info/20 dark:text-info-light dark:font-semibold max-[900px]:bg-primary/20 max-[900px]:dark:bg-secondary/25 max-[900px]:border-l-4 max-[900px]:border-primary max-[900px]:dark:border-secondary max-[900px]:pl-[calc(1rem-4px)]'
    : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5 dark:hover:text-secondary dark:hover:bg-secondary/15 max-[900px]:hover:bg-primary/10 max-[900px]:dark:hover:bg-secondary/15'
  }`;

const actionBtnBase =
  'inline-flex items-center justify-center gap-2 min-w-[7rem] text-[0.9375rem] font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 max-[900px]:w-full max-[900px]:py-3';

const utilityLinkClass =
  'inline-flex items-center gap-2 text-[0.8125rem] font-medium text-gray-600 dark:text-gray-400 no-underline transition-colors duration-200 hover:text-primary dark:hover:text-secondary [&>span]:opacity-80';

const PROFILE_DROPDOWN_LINKS = [
  { to: '/profile', label: 'Settings', Icon: CogOutlineIcon },
  { to: '/profile', label: 'Profile', Icon: AccountOutlineIcon },
];

export default function Header({ menuOpen, onMenuToggle, closeMenu, user, logout }) {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [techMenuOpen, setTechMenuOpen] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const profileRef = useRef(null);
  const isTechnologiesActive = pathname === '/technologies' || pathname.startsWith('/technologies/');
  const isDesktopTallyCollapsed = true;
  const isDesktopTdlCollapsed = true;
  const tallyLevelItems = [
    { label: 'Tally Licenses', to: '/licenses', navEnd: true, onClick: closeMenu },
    {
      label: 'TSS',
      children: [
        { label: 'Single User TSS', to: '/tss-renewal-single-user', onClick: closeMenu },
        { label: 'Multi User TSS', to: '/tss-renewal-multi-user', onClick: closeMenu },
      ],
    },
    {
      label: 'Tally on Cloud',
      children: [
        { label: 'Cloud Hosting', to: '/cloud-hosting', onClick: closeMenu },
        { label: 'Tally on Cloud', to: '/tally-on-cloud', onClick: closeMenu },
        { label: 'Dedicated VPS Server', to: '/dedicated-vps-server', onClick: closeMenu },
      ],
    },
    {
      label: 'Tally Integration',
      children: [
        { label: 'Excel Import', to: '/integration-excel-import', onClick: closeMenu },
        { label: 'Third-Party Integration', to: '/integration-third-party', onClick: closeMenu },
        { label: 'Tally to WhatsApp', to: '/integration-whatsapp', onClick: closeMenu },
        { label: 'SMS API Integration', to: '/integration-sms-api', onClick: closeMenu },
      ],
    },
    { label: 'Tally AMC', to: '/tally-amc', onClick: closeMenu },
    { label: 'Tally Business Solutions', to: '/tally-business-solutions', onClick: closeMenu },
  ];
  const tdlLevelItems = [
    { label: 'All TDL Products', to: '/products', navEnd: true, onClick: closeMenu },
    { label: 'Security Control TDL', to: '/products/tdl-security-control', onClick: closeMenu },
    { label: 'Productivity TDL', to: '/products/tdl-productivity', onClick: closeMenu },
    { label: 'MIS Reporting TDL', to: '/products/tdl-mis-reporting', onClick: closeMenu },
    { label: 'Invoice TDL', to: '/products/tdl-invoice', onClick: closeMenu },
    { label: 'Business-Specific TDL', to: '/products/tdl-business-specific', onClick: closeMenu },
    { label: 'Banking TDL', to: '/products/tdl-banking', onClick: closeMenu },
  ];

  useEffect(() => {
    api.technologies().then(setTechnologies).catch(() => setTechnologies([]));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeMenu?.();
    };
    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      data-theme={theme}
      className="sticky top-0 z-8 bg-white dark:bg-gray-900 border-b border-gray-200/80 dark:border-gray-700/80 shadow-sm dark:shadow-none"
    >
      {/* Top bar - hidden on mobile to avoid duplicate with sidebar header */}
      <div className="hidden min-[901px]:block bg-gray-50 dark:bg-gray-900 border-b border-gray-200/80 dark:border-gray-700/80">
        <div className={`${CONTAINER} flex justify-end items-center py-2 sm:py-2.5`}>
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap justify-end">
            <a href="tel:+918448449099" className={utilityLinkClass}>
              <PhoneIcon className="text-[13px] shrink-0" />
              <span className="hidden sm:inline">+91 8448449099</span>
            </a>
            <a href="mailto:info@axatech.com" className={utilityLinkClass}>
              <EmailOutlineIcon className="text-[13px] shrink-0" />
              <span className="hidden sm:inline">info@axatech.com</span>
            </a>
            <span className="w-px h-4 bg-gray-300 dark:bg-gray-600 hidden sm:block" aria-hidden />
            <Link to="/contact" className={utilityLinkClass} onClick={closeMenu}>
              Career
            </Link>
            <Link to="/contact" className={utilityLinkClass} onClick={closeMenu}>
              <DownloadIcon className="text-[13px] shrink-0" />
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
                <WeatherSunnyIcon className="text-[20px]" />
              ) : (
                <WeatherNightIcon className="text-[20px]" />
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

          {/* Desktop nav - hidden on mobile */}
          <nav className="hidden min-[901px]:flex items-center gap-0.5 flex-1 justify-end">
            <div className="flex items-center gap-0.5">
              {NAV_LINKS.map(({ to, label, end, hasDropdown, hasTdlLevel }) =>
                hasDropdown ? (
                  <div
                    key={to}
                    className="relative"
                    onMouseEnter={() => setTechMenuOpen(true)}
                    onMouseLeave={() => setTechMenuOpen(false)}
                  >
                    <NavLink to={to} end={end} onClick={closeMenu} className={getNavLinkClassName}>
                      {label}
                    </NavLink>
                    {techMenuOpen && technologies.length > 0 && (
                      <TechnologiesDropdown
                        technologies={technologies}
                        onClose={() => { setTechMenuOpen(false); closeMenu(); }}
                      />
                    )}
                  </div>
                ) : to === '/licenses' ? (
                  <div key={to} className="relative min-w-[70px]">
                    <LevelItem
                      id="header-tally-level-desktop"
                      label={label}
                      collapsed={isDesktopTallyCollapsed}
                      defaultOpen
                      items={tallyLevelItems}
                      className="w-full"
                      contentClassName="!left-0 !top-full !ml-0 !mt-1"
                      triggerClassName="!capitalize !justify-between !gap-2 !px-3 !py-2.5 !text-[0.9375rem] !font-medium !normal-case !tracking-normal !text-gray-700 dark:!text-gray-300 hover:!text-primary dark:hover:!text-secondary hover:!bg-primary/5 dark:hover:!bg-secondary/15"
                    />
                  </div>
                ) : hasTdlLevel ? (
                  <div key={to} className="relative min-w-[100px]">
                    <LevelItem
                      id="header-tdl-level-desktop"
                      label={label}
                      collapsed={isDesktopTdlCollapsed}
                      defaultOpen
                      items={tdlLevelItems}
                      className="w-full"
                      contentClassName="!left-0 !top-full !ml-0 !mt-1"
                      triggerClassName="!justify-between !gap-2 !px-3 !py-2.5 !text-[0.9375rem] !font-medium !normal-case !tracking-normal !text-gray-700 dark:!text-gray-300 hover:!text-primary dark:hover:!text-secondary hover:!bg-primary/5 dark:hover:!bg-secondary/15"
                    />
                  </div>
                ) : (
                  <NavLink key={to} to={to} end={end} onClick={closeMenu} className={getNavLinkClassName}>
                    {label}
                  </NavLink>
                )
              )}
            </div>
            <div className="flex items-center gap-2.5 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-primary dark:text-secondary cursor-pointer transition-all duration-200 hover:bg-primary/10 dark:hover:bg-secondary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <WeatherSunnyIcon className="text-[20px]" /> : <WeatherNightIcon className="text-[20px]" />}
              </button>
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <NavLink to="/admin" onClick={closeMenu} className={`${actionBtnBase} text-primary dark:text-gray-200 border border-primary/30 dark:border-secondary/40 hover:bg-primary/10 hover:border-primary dark:hover:bg-secondary/20 dark:hover:border-secondary`}>
                      <ShieldAccountIcon className="text-[18px] shrink-0" />
                      Admin
                    </NavLink>
                  )}
                  <div className="relative" ref={profileRef}>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-[0.9375rem] font-semibold text-gray-700 dark:text-gray-200 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 cursor-pointer transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 dark:hover:border-secondary/50 dark:hover:bg-secondary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      onClick={() => setProfileOpen((o) => !o)}
                      aria-expanded={profileOpen}
                      aria-haspopup="true"
                    >
                      <AccountCircleIcon className="text-[22px] shrink-0 text-primary dark:text-secondary" />
                      <span>Profile</span>
                      <ChevronDownIcon className={`text-lg shrink-0 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {profileOpen && (
                      <div className="absolute right-0 top-full mt-2 min-w-[200px] py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-xl shadow-gray-200/50 dark:shadow-black/20 z-110" role="menu">
                        {PROFILE_DROPDOWN_LINKS.map(({ to: profileTo, label, Icon: LinkIcon }) => (
                          <Link
                            key={label}
                            to={profileTo}
                            role="menuitem"
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-[0.9375rem] font-medium text-gray-700 dark:text-gray-200 no-underline transition-colors duration-200 hover:bg-primary/5 hover:text-primary dark:hover:bg-secondary/20 dark:hover:text-white"
                            onClick={() => { closeMenu(); setProfileOpen(false); }}
                          >
                            <LinkIcon className="text-[20px] shrink-0 opacity-80" />
                            {label}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 dark:border-gray-600 my-2" />
                        <button
                          type="button"
                          role="menuitem"
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-[0.9375rem] font-medium text-gray-700 dark:text-gray-200 text-left transition-colors duration-200 hover:bg-error-lighter hover:text-error dark:hover:bg-error-lighter/30 dark:hover:text-error-light"
                          onClick={() => { logout(); closeMenu(); setProfileOpen(false); }}
                        >
                          <LogoutIcon className="text-[20px] shrink-0 opacity-80" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className={`${actionBtnBase} bg-transparent text-primary dark:text-gray-200 border-2 border-primary/40 dark:border-gray-500 hover:bg-primary hover:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:hover:border-gray-600`} onClick={closeMenu}>
                    <LoginIcon className="text-[18px] shrink-0" />
                    Login
                  </Link>
                  <Link to="/licenses" className={`${actionBtnBase} bg-secondary text-white border-0 shadow-md shadow-secondary/25 hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/30 focus-visible:ring-secondary`} onClick={closeMenu}>
                    <CartOutlineIcon className="text-[18px] shrink-0" />
                    Buy
                  </Link>
                  <Link to="/contact" className={`${actionBtnBase} bg-primary text-white border-0 shadow-md shadow-primary/20 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25 focus-visible:ring-primary`} onClick={closeMenu}>
                    Talk To Expert
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile: overlay + slide-out sidebar (like AdminSidebar) */}
          <div
            role="presentation"
            className="fixed inset-0 z-50 max-[900px]:block hidden"
            style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
          >
            <div
              className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
              onClick={closeMenu}
              aria-hidden
            />
            <aside
              className={`absolute left-0 top-0 h-full w-[280px] max-w-[85vw] flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl transition-[transform] duration-200 ease-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
              {/* Sidebar header: logo, theme, close */}
              <div className="flex shrink-0 items-center justify-between gap-2 py-4 px-4 border-b border-gray-200 dark:border-gray-700">
                <Link to="/" className="flex items-center gap-2 min-w-0 font-bold text-gray-900 dark:text-white no-underline hover:opacity-80" onClick={closeMenu}>
                  <img src="/logo.png" alt="Axatech" className="h-9 w-auto object-contain" />
                </Link>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-primary dark:text-secondary cursor-pointer transition-colors hover:bg-primary/10 dark:hover:bg-secondary/20"
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {theme === 'dark' ? <WeatherSunnyIcon className="text-[20px]" /> : <WeatherNightIcon className="text-[20px]" />}
                  </button>
                  <button type="button" onClick={closeMenu} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" aria-label="Close menu">
                    <CloseIcon className="text-xl cursor-pointer" />
                  </button>
                </div>
              </div>
              {/* Scrollable menu only – action buttons stay at bottom */}
              <div className="min-h-0 flex-1 overflow-y-auto">
                <nav className="py-4">
                  <p className="mb-2 px-4 text-[0.7rem] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Menu</p>
                  <div className="space-y-1 px-3">
                    {NAV_LINKS.map(({ to, label, end, hasDropdown, hasTallyLevel, hasTdlLevel }) =>
                      hasDropdown ? (
                        <div key={to} className="flex flex-col">
                          {technologies.length > 0 && (
                            <TechnologiesDropdown
                              technologies={technologies}
                              onClose={closeMenu}
                              inline
                            />
                          )}
                        </div>
                      ) : hasTallyLevel ? (
                        <div key={to} className="flex flex-col">
                          <LevelItem
                            id="header-tally-level-mobile"
                            label={label}
                            defaultOpen={false}
                            items={tallyLevelItems}
                            className="w-full"
                          />
                        </div>
                      ) : hasTdlLevel ? (
                        <div key={to} className="flex flex-col">
                          <LevelItem
                            id="header-tdl-level-mobile"
                            label={label}
                            defaultOpen={false}
                            items={tdlLevelItems}
                            className="w-full"
                          />
                        </div>
                      ) : (
                        <NavLink
                          key={to}
                          to={to}
                          end={end}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `flex items-center rounded-lg py-2.5 px-3 text-[0.925rem] font-medium no-underline transition-all duration-200 ${isActive
                              ? 'bg-secondary/20 text-secondary dark:bg-secondary/20 dark:text-secondary'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                            }`
                          }
                        >
                          {label}
                        </NavLink>
                      )
                    )}
                  </div>
                </nav>
              </div>
              {/* Action buttons – always at bottom of sidebar */}
              <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 space-y-2 bg-white dark:bg-gray-900">
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <NavLink to="/admin" onClick={closeMenu} className={`${actionBtnBase} justify-center text-primary dark:text-gray-200 border border-primary/30 dark:border-secondary/40 hover:bg-primary/10 dark:hover:bg-secondary/20`}>
                        <ShieldAccountIcon className="text-[18px] shrink-0" />
                        Admin
                      </NavLink>
                    )}
                    <Link to="/profile" onClick={closeMenu} className={`${actionBtnBase} justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600`}>
                      <AccountCircleIcon className="text-[22px] shrink-0" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={() => { logout(); closeMenu(); }}
                      className={`${actionBtnBase} justify-center w-full bg-transparent text-error border-2 border-error/40 hover:bg-error/10`}
                    >
                      <LogoutIcon className="text-[18px] shrink-0" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className='flex items-center gap-2 w-full'>
                      <Button
                        to="/login"
                        variant="outline"
                        size="sm"
                        icon={<LoginIcon className="text-[18px] shrink-0" />}
                        onClick={closeMenu}
                      className='w-full'
                      >
                        Login
                      </Button>
                      <Button
                        to="/licenses"
                        variant="secondary"
                        size="sm"
                        icon={<CartOutlineIcon className="text-[18px] shrink-0" />}
                        onClick={closeMenu}
                      className='w-full'
                      >
                        Buy
                      </Button>
                    </div>
                    <Button
                      to="/contact"
                      variant="primary"
                      size="sm"
                      onClick={closeMenu}
                      className='w-full'
                    >
                      Talk To Expert
                    </Button>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </header>
  );
}
