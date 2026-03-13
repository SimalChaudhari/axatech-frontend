import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  DashboardIcon,
  HomeContentIcon,
  LicensesIcon,
  CategoriesIcon,
  ProductsIcon,
  ServicesIcon,
  CloudPlansIcon,
  EnquiriesIcon,
  BlogsIcon,
} from '../icons';

const NAV_LINKS = [
  { to: '/admin', end: true, label: 'Dashboard', Icon: DashboardIcon },
  { to: '/admin/home', label: 'Home Content', Icon: HomeContentIcon },
  // { to: '/admin/licenses', label: 'Licenses', Icon: LicensesIcon },
  { to: '/admin/licenses', label: 'Tally', Icon: LicensesIcon },
  { to: '/admin/categories', label: 'Categories', Icon: CategoriesIcon },
  { to: '/admin/products', label: 'Products', Icon: ProductsIcon },
  { to: '/admin/services', label: 'Services', Icon: ServicesIcon },
  { to: '/admin/cloud', label: 'Cloud Plans', Icon: CloudPlansIcon },
  { to: '/admin/enquiries', label: 'Enquiries', Icon: EnquiriesIcon },
  { to: '/admin/blogs', label: 'Blogs', Icon: BlogsIcon },
];

function getNavLinkClass(isActive, collapsed) {
  const base = `flex items-center rounded-lg py-2.5 font-medium no-underline transition-all duration-200 ${collapsed ? 'flex-col gap-1 px-1 text-[10px]' : 'flex-row gap-2 px-3 text-[0.925rem]'}`;
  const active = isActive
    ? 'bg-info-lighter text-info-dark dark:bg-info/20 dark:text-info-light [&_.nav-icon]:!text-info-dark dark:[&_.nav-icon]:!text-info-light'
    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 [&_.nav-icon]:text-gray-500 dark:[&_.nav-icon]:text-gray-400';
  return `${base} ${active}`;
}

export default function AdminSidebar({ open, onClose, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleNavClick = () => {
    onNavigate?.();
  };

  const sidebarContent = (effectiveCollapsed) => (
    <>
      {/* Logo + collapse toggle + close (mobile) */}
      <div className="relative flex shrink-0 items-center justify-between gap-2 py-4 px-5 dark:border-gray-700">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="hidden md:flex absolute -right-3 top-4 h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
          aria-label={effectiveCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {effectiveCollapsed ? <ChevronRightIcon className="text-xl" /> : <ChevronLeftIcon className="text-xl" />}
        </button>
        <Link
          to="/admin"
          onClick={handleNavClick}
          className={`flex flex-1 items-center font-bold text-gray-900 no-underline transition-opacity duration-200 hover:opacity-80 dark:text-white min-w-0 ${effectiveCollapsed ? 'justify-center' : 'gap-2.5'}`}
        >
          <img src="/logo.png" alt="Axatech" className= 'h-9 w-auto'/>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex md:hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          aria-label="Close menu"
        >
          <CloseIcon className="text-xl" />
        </button>
      </div>

      {/* Section label + Nav */}
      <nav className="min-h-0 flex-1 overflow-y-auto py-4">
        {!effectiveCollapsed && (
          <p className="mb-2 px-4 text-[0.7rem] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Menu
          </p>
        )}
        <div className={`space-y-1 ${effectiveCollapsed ? 'px-1' : 'px-3'}`}>
          {NAV_LINKS.map(({ to, end, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={effectiveCollapsed ? label : undefined}
              className={({ isActive }) => getNavLinkClass(isActive, effectiveCollapsed)}
              onClick={handleNavClick}
            >
              <Icon className="nav-icon text-[1.35rem] shrink-0" />
              <span className={effectiveCollapsed ? 'whitespace-nowrap' : ''}>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

    </>
  );

  const asideBaseClass =
    'flex h-full flex-col bg-white dark:bg-gray-800 rounded-l-xl shadow-[4px_0_24px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)]';

  return (
    <>
      {/* Mobile: overlay + drawer */}
      <div
        role="presentation"
        className="fixed inset-0 z-50 md:hidden"
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
          aria-hidden
        />
        <aside
          className={`absolute left-0 top-0 ${asideBaseClass} w-[260px] max-w-[85vw] transition-[transform] duration-200 ease-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {sidebarContent(false)}
        </aside>
      </div>

      {/* Desktop: in flow, full height; width depends on collapsed */}
      <aside
        className={`hidden ${asideBaseClass} md:flex md:h-screen transition-[width] duration-200 ease-out ${collapsed ? 'md:w-[88px] md:min-w-[88px]' : 'md:w-[300px] md:min-w-[300px]'}`}
      >
        {sidebarContent(collapsed)}
      </aside>
    </>
  );
}
