import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common';
import {
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
  { to: '/admin/licenses', label: 'Licenses', Icon: LicensesIcon },
  { to: '/admin/categories', label: 'Categories', Icon: CategoriesIcon },
  { to: '/admin/products', label: 'Products', Icon: ProductsIcon },
  { to: '/admin/services', label: 'Services', Icon: ServicesIcon },
  { to: '/admin/cloud', label: 'Cloud Plans', Icon: CloudPlansIcon },
  { to: '/admin/enquiries', label: 'Enquiries', Icon: EnquiriesIcon },
  { to: '/admin/blogs', label: 'Blogs', Icon: BlogsIcon },
];

function getNavLinkClass(isActive) {
  const base = 'flex items-center gap-3 rounded-lg px-4 py-2.5 text-[0.925rem] font-medium no-underline transition-all duration-200';
  const active = isActive
    ? 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 [&_.nav-icon]:!text-emerald-600 dark:[&_.nav-icon]:!text-emerald-400'
    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 [&_.nav-icon]:text-gray-500 dark:[&_.nav-icon]:text-gray-400';
  return `${base} ${active}`;
}

export default function AdminSidebar({ open, onClose, onNavigate }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

  const sidebarContent = (
    <>
      {/* Logo + Admin + close (mobile) */}
      <div className="flex shrink-0 items-center justify-between py-4 px-5 dark:border-gray-700">
        <Link
          to="/admin"
          onClick={handleNavClick}
          className="flex items-center gap-2.5 font-bold text-gray-900 no-underline transition-opacity duration-200 hover:opacity-80 dark:text-white"
        >
          <img src="/logo.png" alt="Axatech" className="h-9 w-auto object-contain" />
          {/* <span className="text-base font-bold tracking-wide text-gray-900 dark:text-white">Admin</span> */}
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex md:hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          aria-label="Close menu"
        >
          <span className="icon-[mdi--close] text-xl" aria-hidden />
        </button>
      </div>

      {/* Section label + Nav */}
      <nav className="min-h-0 flex-1 overflow-y-auto py-4">
        <p className="mb-2 px-4 text-[0.7rem] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Menu
        </p>
        <div className="space-y-0.5 px-3">
          {NAV_LINKS.map(({ to, end, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => getNavLinkClass(isActive)}
              onClick={handleNavClick}
            >
              <Icon className="nav-icon text-[1.35rem] shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom: View site, email, Logout */}
      <div className="shrink-0 border-t border-gray-200 px-4 py-4 text-[0.85rem] dark:border-gray-700">
        <div className="flex flex-col gap-2.5">
          <Link
            to="/"
            className="font-medium text-emerald-600 no-underline hover:underline dark:text-emerald-400"
            onClick={handleNavClick}
          >
            View site
          </Link>
          <span className="truncate text-gray-500 dark:text-gray-400" title={user?.email}>
            {user?.email}
          </span>
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Logout
          </Button>
        </div>
      </div>
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
          className={`absolute left-0 top-0 ${asideBaseClass} w-[260px] max-w-[85vw] transition-transform duration-200 ease-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {sidebarContent}
        </aside>
      </div>

      {/* Desktop: in flow, full height */}
      <aside
        className={`hidden ${asideBaseClass} md:flex md:h-screen md:w-[260px] md:min-w-[260px]`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
