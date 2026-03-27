import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LevelItem } from '../common';
import { CodeIcon } from '../icons';

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

const SIDEBAR_BG_IMAGE =
  'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCkiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzOCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNDQ2NF81NTMzNykiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNDQ2NF81NTMzNyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)';

  const sidebarBgStyle = {
    backgroundImage: SIDEBAR_BG_IMAGE,
    backgroundSize: '50%, 50%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right top, left bottom',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '40px 40px 80px -8px rgba(0,0,0,0.24)',
  };


export default function TechnologiesDropdown({ technologies, onClose, inline = false }) {
  const { pathname } = useLocation();
  const sections = groupByCategory(technologies);
  const wrapperClassName = 'min-w-[200px] w-full';
  const triggerClassName = '!capitalize !text-[0.925rem]';
  const levelItemId = 'tech-sidebar-toggle-tree';

  /** LevelItem tree: first row + one branch per CATEGORY_ORDER section with real tech titles. */
  const levelToggleItems = useMemo(
    () => [
      {
        label: 'View all Technologies',
        to: '/technologies',
        navEnd: true,
        onClick: onClose,
      },
      ...sections.map(({ label, items: techs }) => ({
        label,
        children: techs.map((tech) => ({
          label: tech.title,
          to: `/technologies/${tech.slug || tech._id}`,
          onClick: onClose,
          image: tech.image || undefined,
        })),
      })),
    ],
    [sections, onClose]
  );

  const technologiesTree = (
    <LevelItem
      id={levelItemId}
      label="Technologies"
      defaultOpen
      className={wrapperClassName}
      items={levelToggleItems}
      triggerClassName={triggerClassName}
    />
  );

  if (inline) {
    return <div className="min-w-0" role="menu" aria-label="Technologies menu">{technologiesTree}</div>;
  }

  const content = (
    <div className="min-w-[280px] w-[min(92vw,720px)] sm:w-[min(92vw,680px)] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-xl shadow-gray-200/50 dark:shadow-black/30 overflow-hidden">
      <div className="grid grid-cols-3 gap-0" style={sidebarBgStyle}>
        {sections.map(({ category, label, items }) => (
          <div
            key={category}
            className="min-w-0 border-r border-gray-100 dark:border-gray-600 last:border-r-0 first:rounded-tl-xl last:rounded-tr-xl"
          >
            <div className="p-4">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 truncate">
                {label}
              </h3>
              <ul className="space-y-0.5">
                {items.map((tech) => {
                  const to = `/technologies/${tech.slug || tech._id}`;
                  const isActive = pathname === to;
                  const linkClass = `flex items-center gap-2.5 py-2 px-2 -mx-2 rounded-md text-[0.875rem] font-medium no-underline transition-colors duration-150 ${isActive ? 'bg-primary/5 text-primary dark:bg-secondary/10 dark:text-secondary' : 'text-gray-700 dark:text-gray-200 dark:bg-gray-700/50 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600/50 hover:text-primary dark:hover:text-secondary'}`;
                  return (
                    <li key={tech._id}>
                      <Link to={to} onClick={onClose} role="menuitem" className={linkClass}>
                        {tech.image ? (
                          <img src={tech.image} alt="" className="h-7 w-7 shrink-0 object-contain rounded" />
                        ) : (
                          <span className="h-7 w-7 shrink-0 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                            <CodeIcon className="text-base" />
                          </span>
                        )}
                        <span className="truncate min-w-0">{tech.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
