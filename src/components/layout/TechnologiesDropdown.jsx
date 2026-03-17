import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDownIcon } from '../icons';
import './TechnologiesDropdown.css';

const CATEGORY_ORDER = [
  'Frontend Technologies',
  'Backend Technologies',
  'Database Technologies',
];

const CATEGORY_LABELS = {
  'Frontend Technologies': 'Frontend',
  'Backend Technologies': 'Backend',
  'Database Technologies': 'Database',
};

function groupByCategory(technologies) {
  const map = {};
  for (const cat of CATEGORY_ORDER) map[cat] = [];
  for (const tech of technologies || []) {
    const cat = tech.category || 'Other';
    if (!map[cat]) map[cat] = [];
    map[cat].push(tech);
  }
  return CATEGORY_ORDER.map((cat) => ({ category: cat, label: CATEGORY_LABELS[cat] || cat, items: map[cat] || [] }));
}

function TechLink({ tech, onClose, inline = false }) {
  const { pathname } = useLocation();
  const to = `/technologies/${tech.slug || tech._id}`;
  const isActive = pathname === to;
  const baseClass = inline
    ? 'flex items-center gap-2.5 rounded-lg py-2 px-3 text-[0.925rem] font-medium no-underline transition-all duration-200'
    : 'flex items-center gap-2.5 py-2 px-2 -mx-2 rounded-md text-[0.875rem] font-medium no-underline transition-colors duration-150';
  const linkClass = inline
    ? `${baseClass} ${isActive ? 'bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary' : 'text-gray-700 dark:text-gray-200 dark:bg-gray-700/50 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600/50 hover:text-primary dark:hover:text-secondary'}`
    : `${baseClass} ${isActive ? 'bg-primary/5 text-primary dark:bg-secondary/10 dark:text-secondary' : 'text-gray-700 dark:text-gray-200 dark:bg-gray-700/50 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600/50 hover:text-primary dark:hover:text-secondary'}`;
  return (
    <li className={inline ? 'tech-submenu-item my-2' : ''}>
      <Link
        to={to}
        onClick={onClose}
        role="menuitem"
        className={linkClass}
      >
        {tech.image ? (
          <img src={tech.image} alt="" className="h-7 w-7 shrink-0 object-contain rounded" />
        ) : (
          <span className="h-7 w-7 shrink-0 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
            <span className="icon-[mdi--code-tags] text-base" aria-hidden />
          </span>
        )}
        <span className="truncate min-w-0">{tech.title}</span>
      </Link>
    </li>
  );
}

export default function TechnologiesDropdown({ technologies, onClose, inline = false }) {
  const { pathname } = useLocation();
  const sections = groupByCategory(technologies);
  const [openCategories, setOpenCategories] = useState(() => new Set());
  useEffect(() => {
    if (!inline || !pathname.startsWith('/technologies/')) return;
    const sectionsData = groupByCategory(technologies);
    for (const { label, items } of sectionsData) {
      const hasActive = items.some((t) => `/technologies/${t.slug || t._id}` === pathname);
      if (hasActive) {
        setOpenCategories((prev) => new Set([...prev, label]));
        break;
      }
    }
  }, [inline, pathname, technologies]);
  const toggleCategory = (label) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const content = (
    <div
      className={
        inline
          ? 'bg-gray-50/80 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden'
          : 'min-w-[280px] w-[min(92vw,720px)] sm:w-[min(92vw,680px)] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-xl shadow-gray-200/50 dark:shadow-black/30 overflow-hidden'
      }
    >
      <div className={inline ? 'divide-y divide-gray-200 dark:divide-gray-600' : 'grid grid-cols-3 gap-0'}>
        {sections.map(({ category, label, items }) => (
          <div
            key={category}
            className={
              inline
                ? 'p-3 first:pt-3 last:pb-3'
                : 'min-w-0 border-r border-gray-100 dark:border-gray-600 last:border-r-0 first:rounded-tl-xl last:rounded-tr-xl'
            }
          >
            <div className={inline ? '' : 'p-4'}>
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 truncate">
                {label}
              </h3>
              <ul className={inline ? 'space-y-0.5' : 'space-y-0.5'}>
                {items.map((tech) => (
                  <TechLink key={tech._id} tech={tech} onClose={onClose} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (inline) {
    return (
      <div className="mt-2 min-w-0 px-3" role="menu" aria-label="Technologies menu">
        <NavLink
          to="/technologies"
          end
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center rounded-lg py-2.5 px-3 text-[0.925rem] font-medium no-underline transition-all duration-200 mb-1 ${isActive ? 'bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary' : 'text-primary dark:text-secondary hover:bg-primary/5 dark:hover:bg-secondary/15'}`
          }
        >
          View all Technologies
        </NavLink>
        <div className="overflow-x-hidden">
          {sections.map(({ category, label, items }) => {
            const isOpen = openCategories.has(label);
            return (
              <div key={category} className="">
                <button
                  type="button"
                  onClick={() => toggleCategory(label)}
                  aria-expanded={isOpen}
                  aria-controls={`tech-submenu-${category}`}
                  id={`tech-trigger-${category}`}
                  className="mt-2 flex items-center justify-between gap-2 w-full rounded-lg py-2.5 px-3 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 transition-colors duration-200"
                >
                  {label}
                  <ChevronDownIcon
                    className={`shrink-0 text-base transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
                <div
                  id={`tech-submenu-${category}`}
                  role="region"
                  aria-labelledby={`tech-trigger-${category}`}
                  className={`overflow-hidden transition-[height] duration-200 ease-out ${isOpen ? 'visible' : 'invisible h-0'}`}
                >
                  {isOpen && (
                    <div className="tech-submenu-wrapper">
                      <ul className="space-y-0.5 pt-0.5 pb-2 pl-0">
                        {items.map((tech) => (
                          <TechLink key={tech._id} tech={tech} onClose={onClose} inline />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute left-1/2 top-full mt-1 z-50 -translate-x-1/2"
      role="menu"
      aria-label="Technologies menu"
    >
      {content}
    </div>
  );
}
