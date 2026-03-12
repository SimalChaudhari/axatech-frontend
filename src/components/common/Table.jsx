import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TrashIcon, PenIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons';
import Dropdown from './Dropdown';

const tableClass = 'w-full border-collapse text-sm';
const thBaseClass =
  'border-b border-slate-200 border-dashed bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-400';
const tdBaseClass =
  'border-b border-slate-200 border-dashed px-4 py-3 text-slate-700 dark:border-gray-600 dark:text-gray-300';
const rowHoverClass = 'transition-colors hover:bg-slate-50 dark:hover:bg-gray-700/30';

const actionMenuClass =
  'fixed z-11 min-w-[140px] rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-gray-600 dark:bg-gray-800';
// they are mostly same classes, only color classes differ
const baseActionMenuItemClass =
  'flex w-full items-center gap-4 px-1 py-2.5 rounded-md text-left text-sm font-medium';
const actionMenuItemClass = `${baseActionMenuItemClass} text-slate-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-gray-700`;
const actionMenuDeleteClass = `${baseActionMenuItemClass} text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20`;


function Table({ children, className = '' }) {
  return (
    <div className="overflow-x-auto">
      <table className={tableClass + (className ? ` ${className}` : '')}>
        {children}
      </table>
    </div>
  );
}

function Head({ children, columns, selectAll }) {
  return (
    <thead>
      <tr>
        {selectAll && (
          <th className={`${thBaseClass} w-10 px-2 text-center`}>
            <input
              type="checkbox"
              checked={selectAll.checked}
              ref={selectAll.indeterminateRef}
              onChange={selectAll.onChange}
              aria-label="Select all rows"
              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20 dark:border-gray-500 dark:text-secondary"
            />
          </th>
        )}
        {columns
          ? columns.map((col, i) => (
              <Th key={col.key ?? i} align={col.align} className={col.className}>
                {col.label}
              </Th>
            ))
          : children}
      </tr>
    </thead>
  );
}

function Body({ children }) {
  return <tbody>{children}</tbody>;
}

function Row({ children, className = '', hover = true }) {
  return (
    <tr className={(hover ? rowHoverClass : '') + (className ? ` ${className}` : '')}>
      {children}
    </tr>
  );
}

function Th({ children, align = 'left', className = '' }) {
  const alignClass = align === 'right' ? 'text-right' : 'text-left';
  return (
    <th className={`${thBaseClass} ${alignClass}${className ? ` ${className}` : ''}`}>
      {children}
    </th>
  );
}

function Td({ children, align, colSpan, className = '' }) {
  const alignClass = align === 'right' ? 'text-right' : '';
  return (
    <td
      colSpan={colSpan}
      className={`${tdBaseClass} ${alignClass}${className ? ` ${className}` : ''}`}
    >
      {children}
    </td>
  );
}

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.Th = Th;
Table.Td = Td;

/**
 * Bulk selection bar shown above table body when rows are selected.
 * @param {number} selectedCount - Number of selected rows (bar hidden when 0)
 * @param {number} [totalCount] - Total rows; when provided, checkbox is indeterminate when 0 < selectedCount < totalCount
 * @param {function(): void} onClearSelection - Called when user clears selection (checkbox or label click)
 * @param {function(): void} [onBulkDelete] - Optional; if provided, shows delete button
 * @param {string} [label='selected'] - Text after count, e.g. "5 selected"
 * @param {string} [className] - Extra classes for the bar wrapper
 */
function SelectionBar({
  selectedCount,
  totalCount,
  onClearSelection,
  onBulkDelete,
  label = 'selected',
  className = '',
}) {
  const checkboxRef = useRef(null);
  const allSelected = totalCount != null && totalCount > 0 && selectedCount === totalCount;
  const indeterminate = totalCount != null && selectedCount > 0 && selectedCount < totalCount;
  const showChecked = totalCount == null ? true : allSelected;

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  if (selectedCount === 0) return null;

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label={`${selectedCount} ${label}`}
      className={`flex items-center justify-between gap-3 border-b border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-200 ${className}`.trim()}
    >
      <button
        type="button"
        onClick={onClearSelection}
        className="flex items-center gap-2 rounded-md hover:bg-green-100 dark:hover:bg-green-800/50"
        aria-label="Clear selection"
      >
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={showChecked}
          readOnly
          className="h-4 w-4 rounded border-green-600 bg-green-600 text-white focus:ring-green-500 dark:border-green-500 dark:bg-green-500"
          aria-hidden
        />
        <span>{selectedCount} {label}</span>
      </button>
      {onBulkDelete && (
        <button
          type="button"
          onClick={onBulkDelete}
          aria-label="Delete selected"
          className="inline-flex items-center justify-center rounded-lg p-2 text-green-700 hover:bg-red-100 hover:text-red-700 dark:text-green-300 dark:hover:bg-red-900/30 dark:hover:text-red-300"
        >
          <TrashIcon className="text-xl" />
        </button>
      )}
    </div>
  );
}

Table.SelectionBar = SelectionBar;

/**
 * Table footer pagination: rows per page dropdown, "start-end of total", prev/next buttons.
 * @param {number} page - Current page (1-based)
 * @param {number} rowsPerPage - Rows per page
 * @param {number} totalRows - Total number of rows
 * @param {function(number): void} onPageChange - Called with new page (1-based)
 * @param {function(number): void} onRowsPerPageChange - Called with new rows per page
 * @param {number[]} [rowsPerPageOptions=[5, 10, 20, 50]] - Options for rows per page dropdown
 * @param {string} [className] - Extra classes for the footer wrapper
 */
function TablePagination({
  page,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 20, 50],
  className = '',
}) {
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const start = totalRows === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, totalRows);

  const rowsPerPageOptionsList = rowsPerPageOptions.map((n) => ({
    value: String(n),
    label: String(n),
  }));

  return (
    <div
      className={`flex flex-wrap items-center justify-end gap-4 border-t border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-600 dark:border-gray-600 dark:bg-gray-700/20 dark:text-gray-400 ${className}`.trim()}
      role="navigation"
      aria-label="Table pagination"
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">Rows per page:</span>
        <Dropdown
          // placeholder="Rows per page"
          value={String(rowsPerPage)}
          onChange={(v) => onRowsPerPageChange(Number(v))}
          options={rowsPerPageOptionsList}
          className="w-16 [&_button]:h-9 [&_button]:py-1.5 [&_button]:rounded-lg [&_button]:text-sm [&_button]:pl-3 [&_button]:pr-8 [&_button]:border [&_button]:border-slate-200 [&_button]:dark:border-gray-600 [&_button]:bg-white [&_button]:dark:bg-gray-700 [&_button]:text-slate-800 [&_button]:dark:text-gray-100"
        />
      </div>
      <span className="font-medium" aria-live="polite">
        {totalRows === 0 ? '0-0 of 0' : `${start}-${end} of ${totalRows}`}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-600 dark:disabled:hover:bg-transparent"
        >
          <ChevronLeftIcon className="text-xl" />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-600 dark:disabled:hover:bg-transparent"
        >
          <ChevronRightIcon className="text-xl" />
        </button>
      </div>
    </div>
  );
}

Table.Pagination = TablePagination;

function ActionMenu({ open, position, onEdit, onDelete, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (menuRef.current?.contains(e.target)) return;
      onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  if (!open || !position) return null;

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      className={actionMenuClass}
      style={{ top: position.top, left: position.left }}
    >
      <button
        type="button"
        role="menuitem"
        className={actionMenuItemClass}
        onClick={() => {
          onEdit?.();
          onClose?.();
        }}
      >
        <PenIcon className="text-lg text-slate-500 dark:text-gray-400" />
        Edit
      </button>
      <button
        type="button"
        role="menuitem"
        className={actionMenuDeleteClass}
        onClick={() => {
          onDelete?.();
          onClose?.();
        }}
      >
        <TrashIcon className="text-lg" />
        Delete
      </button>
    </div>,
    document.body
  );
}

Table.ActionMenu = ActionMenu;

export default Table;
