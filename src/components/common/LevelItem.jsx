import { ChevronDownIcon } from '../icons';
import { useEffect, useMemo, useState } from 'react';

const LEVEL_TREE_STYLES = `
  .level-tree-wrapper {
    position: relative;
  }

  .level-tree-wrapper ul {
    position: relative;
    padding-left: 2rem;
  }

  .level-tree-wrapper ul::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 14px;
    width: 2px;
    height: 135%;
    bottom: 10px;
    background-color: #EDEFF2;
  }

  .dark .level-tree-wrapper ul::before,
  [data-theme="dark"] .level-tree-wrapper ul::before {
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
    background-color: #EDEFF2;
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
}) {
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

  const renderItems = (list = [], path = 'root') => (
    <ul>
      {list.map((item, index) => {
        const nodePath = `${path}-${index}`;
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const nodeOpen = !!openNodes[nodePath];

        return (
          <li key={nodePath}>
            {hasChildren ? (
              <>
                <button
                  type="button"
                  onClick={() => toggleNode(nodePath)}
                  aria-expanded={nodeOpen}
                  aria-controls={`${id}-${nodePath}-content`}
                  id={`${id}-${nodePath}-trigger`}
                  className="mt-1 flex w-full items-center justify-between rounded-lg bg-gray-100 px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700/50 dark:text-gray-200 dark:hover:bg-gray-600/50"
                >
                  {item.label}
                  <ChevronDownIcon
                    className={`shrink-0 text-base transition-transform duration-200 ${nodeOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
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
              <span className="blocked mt-1 flex w-full items-center justify-between rounded-lg bg-gray-100 px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700/50 dark:text-gray-200 dark:hover:bg-gray-600/50">{item.label}</span>
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
        className={`mt-2 flex w-full items-center justify-between gap-2 rounded-lg py-2.5 px-3 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-gray-500 transition-colors duration-200 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 ${triggerClassName}`.trim()}
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
        className={`overflow-hidden transition-[height] duration-200 ease-out [&_ul]:space-y-1 [&_ul]:pl-4 [&_ul]:pt-2 [&_ul]:text-sm [&_ul]:text-slate-700 dark:[&_ul]:text-gray-200 [&_li]:leading-6 ${open ? 'visible' : 'invisible h-0'} ${contentClassName}`.trim()}
      >
        {open && (
          <>
            <style>{LEVEL_TREE_STYLES}</style>
            <div className="level-tree-wrapper">{items ? renderItems(items) : children}</div>
          </>
        )}
      </div>
    </div>
  );
}
