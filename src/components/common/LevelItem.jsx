import { ChevronDownIcon } from '../icons';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

/** Vertical spine per <ul>: only between direct sibling rows (not nested subtrees). */
function measureLevelTreeGuides(rootEl) {
  if (!rootEl) return;
  const uls = rootEl.querySelectorAll('ul.level-tree-ul');
  uls.forEach((ul) => {
    const heads = [];
    for (const li of ul.children) {
      if (li.tagName !== 'LI') continue;
      const head = li.querySelector(':scope > .level-tree-node-head');
      if (head) heads.push(head);
    }
    if (heads.length === 0) {
      ul.style.setProperty('--tree-guide-top', '0px');
      ul.style.setProperty('--tree-guide-height', '0px');
      return;
    }
    if (heads.length === 1) {
      ul.style.setProperty('--tree-guide-top', '0px');
      ul.style.setProperty('--tree-guide-height', '22px');
      return;
    }
    const ulRect = ul.getBoundingClientRect();
    const first = heads[0].getBoundingClientRect();
    const last = heads[heads.length - 1].getBoundingClientRect();
    const topPx = first.top - ulRect.top + first.height * 0.5;
    const bottomPx = last.top - ulRect.top + last.height * 0.5;
    const minusPx = -10;
    const heightPx = Math.max(0, bottomPx + minusPx);
    ul.style.setProperty('--tree-guide-top', `${topPx}px`);
    ul.style.setProperty('--tree-guide-height', `${heightPx}px`);
  });
}

const LEVEL_TREE_STYLES = `
  .level-tree-wrapper {
    position: relative;
    align-self: flex-start;
    width: 100%;
    max-width: 100%;
  }

  .level-tree-wrapper ul.level-tree-ul {
    position: relative;
    padding-left: 2rem;
    width: 100%;
    box-sizing: border-box;
    height: fit-content;
    min-height: 0;
  }

  .level-tree-wrapper ul.level-tree-ul::before {
    content: "";
    position: absolute;
    left: 14px;
    width: 2px;
    // top: var(--tree-guide-top, 0px);
    top: 0px;
    height: var(--tree-guide-height, 0px);
    bottom: auto;
    // background-color: #E5E7EB;
    background-color: #CBCBCB;
  }

  .dark .level-tree-wrapper ul.level-tree-ul::before,
  [data-theme="dark"] .level-tree-wrapper ul.level-tree-ul::before {
    background-color: #282F37;
  }

  .level-tree-wrapper li {
    position: relative;
    
  }

  .level-tree-wrapper li::before {
    content: "";
    position: absolute;
    top: 0;
    left: -2px;
    width: 15px;
    height: 15px;
    background-color: #CBCBCB;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") 50% 50% / 100% no-repeat;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") 50% 50% / 100% no-repeat;
    transform: translate(calc(16px * -1), 8px);
  }

  .dark .level-tree-wrapper li::before,
  [data-theme="dark"] .level-tree-wrapper li::before {
    background-color: #282F37;
  }
`;

export default function LevelItem({
  id,
  label,
  isOpen,
  defaultOpen = false,
  onToggle,
  children,
  items,
  className = '',
  triggerClassName = '',
  contentClassName = '',
  floating = false,
}) {
  const { pathname } = useLocation();

  const normalizePath = (path) => {
    if (!path || typeof path !== 'string') return '';
    const noQuery = path.split('?')[0].split('#')[0];
    return noQuery.replace(/\/+$/, '') || '/';
  };

  const isPathActive = (to, end = false) => {
    const target = normalizePath(to);
    const current = normalizePath(pathname);
    if (!target) return false;
    if (end) return current === target;
    return current === target || current.startsWith(`${target}/`);
  };

  const hasActiveDescendant = (list = []) => {
    for (const item of list) {
      if (item?.to && isPathActive(item.to, item.navEnd === true)) return true;
      if (Array.isArray(item?.children) && hasActiveDescendant(item.children)) return true;
    }
    return false;
  };

  const topHasActiveDescendant = useMemo(
    () => hasActiveDescendant(items || []),
    [items, pathname]
  );

  const getInitialOpenNodes = (list = [], path = 'root', shouldOpen = false) => {
    const map = {};
    list.forEach((item, index) => {
      const nodePath = `${path}-${index}`;
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;
      if (!hasChildren) return;
      map[nodePath] = shouldOpen;
      Object.assign(map, getInitialOpenNodes(item.children, nodePath, shouldOpen));
    });
    return map;
  };

  const initialNodes = useMemo(
    () => getInitialOpenNodes(items || [], 'root', !!defaultOpen),
    [items, defaultOpen]
  );

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [openNodes, setOpenNodes] = useState(initialNodes);
  const isControlled = typeof isOpen === 'boolean';
  const open = isControlled ? isOpen : internalOpen;

  useEffect(() => {
    setOpenNodes(initialNodes);
  }, [initialNodes]);

  const handleToggle = () => {
    if (!isControlled) {
      setInternalOpen((prev) => !prev);
    }
    onToggle?.();
  };

  const toggleNode = (path) => {
    setOpenNodes((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const treeWrapperRef = useRef(null);

  const updateTreeGuides = useCallback(() => {
    requestAnimationFrame(() => measureLevelTreeGuides(treeWrapperRef.current));
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updateTreeGuides();
    const el = treeWrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => updateTreeGuides());
    ro.observe(el);
    window.addEventListener('resize', updateTreeGuides);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateTreeGuides);
    };
  }, [open, openNodes, items, updateTreeGuides]);

  const rowClass =
    'cursor-pointer mt-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-gray-300  dark:text-gray-200 dark:hover:bg-gray-600/50';

  /** Match mobile sidebar NavLink in Header.jsx (active when URL matches). */
  const navLeafClassName = ({ isActive }, item) =>
    [
      'mt-1 flex w-full items-center rounded-lg py-2.5 px-3 text-[0.925rem] font-medium no-underline transition-all duration-200',
      item.image ? 'gap-2.5' : '',
      isActive
        ? 'bg-gray-200 text-secondary dark:bg-secondary/10 dark:text-secondary'
        : 'text-gray-700  dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600/50 hover:text-primary dark:hover:text-secondary',
    ]
      .filter(Boolean)
      .join(' ');

  const leafRowClass = (item) =>
    `${rowClass} no-underline ${item.image ? 'justify-start gap-2.5' : ''}`.trim();

  const renderLeafInner = (item) =>
    item.image ? (
      <>
        <img src={item.image} alt="" className="h-7 w-7 shrink-0 object-contain rounded" />
        <span className="min-w-0 flex-1 truncate">{item.label}</span>
      </>
    ) : (
      item.label
    );

  const renderItems = (list = [], path = 'root') => (
    <ul className="level-tree-ul">
      {list.map((item, index) => {
        const nodePath = `${path}-${index}`;
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const nodeOpen = !!openNodes[nodePath];
        const nodeHasActiveDescendant = hasChildren ? hasActiveDescendant(item.children) : false;

        return (
          <li key={nodePath} >
            {hasChildren ? (
              <>
                <div className="level-tree-node-head">
                  <button
                    type="button"
                    onClick={() => toggleNode(nodePath)}
                    aria-expanded={nodeOpen}
                    aria-controls={`${id}-${nodePath}-content`}
                    id={`${id}-${nodePath}-trigger`}
                    className={`${rowClass} ${
                      // nodeHasActiveDescendant
                      //   ? 'bg-info-lighter text-info-dark dark:bg-info/20 dark:text-info-light'
                      //   : 
                        nodeOpen
                          ? 'bg-gray-200 dark:bg-gray-700/50'
                          : ''
                    }`.trim()}
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`shrink-0 text-base transition-transform duration-200 ${nodeOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>
                </div>
                {nodeOpen && (
                  <div
                    id={`${id}-${nodePath}-content`}
                    role="region"
                    aria-labelledby={`${id}-${nodePath}-trigger`}
                  >
                    {renderItems(item.children, nodePath)}
                  </div>
                )}
              </>
            ) : (
              <div className="level-tree-node-head w-full min-w-0">
                {item.content != null ? (
                  item.content
                ) : item.to != null && item.to !== '' ? (
                  <NavLink
                    to={item.to}
                    end={item.navEnd === true}
                    onClick={item.onClick}
                    className={(state) => navLeafClassName(state, item)}
                  >
                    {renderLeafInner(item)}
                  </NavLink>
                ) : item.href != null && item.href !== '' ? (
                  <a
                    href={item.href}
                    className={`block ${leafRowClass(item)}`}
                    onClick={item.onClick}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    {renderLeafInner(item)}
                  </a>
                ) : (
                  <span className={`block ${leafRowClass(item)}`}>{renderLeafInner(item)}</span>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls={`${id}-content`}
        id={`${id}-trigger`}
        className={`cursor-pointer flex w-full items-center justify-between gap-2 rounded-lg py-2.5 px-3 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-gray-500 transition-colors duration-200 dark:text-gray-200 hover:bg-gray-200 hover:dark:bg-gray-700/50 ${
          topHasActiveDescendant
            ? 'bg-info-lighter text-info-dark dark:bg-info/20 dark:text-info-light'
            : open
              ? 'bg-gray-200 dark:bg-gray-700/50'
              : ''
        } ${triggerClassName}`.trim()}
      >
        {label}
        <ChevronDownIcon
          className={`shrink-0 text-base transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      <div
        id={`${id}-content`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={`${floating ? 'overflow-visible' : 'overflow-hidden'} transition-[height] duration-200 ease-out [&_ul]:space-y-1 [&_ul]:pl-4 [&_ul]:pt-2 [&_ul]:text-sm [&_ul]:text-slate-700 dark:[&_ul]:text-gray-200 [&_li]:leading-6 ${open ? 'visible' : 'invisible h-0'} ${contentClassName}`.trim()}
      >
        {open && (
          <>
            <style>{LEVEL_TREE_STYLES}</style>
            <div
              ref={treeWrapperRef}
              className="level-tree-wrapper h-fit min-h-0 w-full max-w-full self-start"
            >
              {items ? renderItems(items) : children}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
