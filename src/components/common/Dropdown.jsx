import { useId, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDownIcon } from '../icons';

/**
 * Professional custom dropdown with styled trigger and options panel.
 * @param {string} [label] - Optional label above the dropdown
 * @param {string} [placeholder] - Placeholder when value is empty (e.g. "All categories")
 * @param {string} value - Current value (controlled)
 * @param {function(string): void} onChange - Called with the selected value
 * @param {Array<{ value: string, label: string }> | Array<{ _id: string, name: string }>} options - List of options
 * @param {string} [className] - Extra classes for the wrapper
 * @param {string} [id] - Optional id for the trigger (for label htmlFor)
 * @param {boolean} [disabled] - Disable the dropdown
 * @param {function()} [onBlur] - Called when the trigger loses focus (e.g. for on-touch validation)
 * @param {string} [error] - Error message to show below the trigger (same as Input; applies error border styling)
 * @param {boolean} [showPlaceholderOption=true] - When false, the "Select" / clear option at the top of the list is hidden
 */
export default function Dropdown({
  label,
  placeholder,
  value,
  onChange,
  options = [],
  className = '',
  id: idProp,
  disabled = false,
  onBlur,
  error,
  showPlaceholderOption = true,
}) {
  const generatedId = useId();
  const id = idProp || (label ? `dropdown-${generatedId.replace(/:/g, '')}` : undefined);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const [panelRect, setPanelRect] = useState(null);

  const normalizedOptions = options.map((opt) =>
    opt.value !== undefined && opt.label !== undefined
      ? { value: opt.value, label: opt.label }
      : { value: opt._id, label: opt.name }
  );

  const selectedOption = normalizedOptions.find(
    (o) => String(o.value) === String(value)
  );
  const displayLabel = selectedOption ? selectedOption.label : (placeholder || 'Select');

  useLayoutEffect(() => {
    if (!open) {
      setPanelRect(null);
      return;
    }
    const trigger = triggerRef.current;
    if (trigger) {
      const rect = trigger.getBoundingClientRect();
      setPanelRect({ top: rect.bottom + 6, left: rect.left, width: rect.width });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (containerRef.current?.contains(e.target)) return;
      if (panelRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleSelect = (optValue) => {
    onChange(optValue);
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    const idx = normalizedOptions.findIndex(
      (o) => String(o.value) === String(value)
    );
    if (e.key === 'ArrowDown' && idx < normalizedOptions.length - 1) {
      e.preventDefault();
      onChange(normalizedOptions[idx + 1].value);
    }
    if (e.key === 'ArrowUp' && idx > 0) {
      e.preventDefault();
      onChange(normalizedOptions[idx - 1].value);
    }
    if (e.key === 'Enter' && selectedOption) {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className={className || 'w-full'} ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <button
          ref={triggerRef}
          id={id}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((o) => !o)}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-label={label || placeholder || 'Select option'}
          className={`relative w-full flex items-center justify-between gap-3 pl-5 pr-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-800 text-left text-gray-900 dark:text-white shadow-sm transition-[border-color,box-shadow] duration-75 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20 focus:outline-none'
              : open
                ? 'border-primary dark:border-secondary ring-2 ring-primary/20 dark:ring-secondary/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:focus:ring-secondary dark:focus:border-secondary'
          } ${!selectedOption ? 'text-gray-500 dark:text-gray-400' : ''}`}
        >
        <div className="w-full flex items-center justify-between gap-3">

          <span className="min-w-0 ">{displayLabel}</span>
          <span
            className={`flex shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-75 ${open ? 'rotate-180' : ''}`}
            aria-hidden
          >
            <ChevronDownIcon className="text-2xl" />
          </span>
        </div>
        </button>

        {open && panelRect && createPortal(
          <div
            ref={panelRef}
            role="listbox"
            className="fixed py-1.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-xl max-h-60 overflow-y-auto z-10"
            style={{ top: panelRect.top, left: panelRect.left, width: panelRect.width, minWidth: 'auto' }}
            aria-activedescendant={value ? `${id}-opt-${value}` : undefined}
          >
            {showPlaceholderOption && (
              <button
                type="button"
                role="option"
                aria-selected={!value}
                id={value ? undefined : `${id}-placeholder`}
                onClick={() => handleSelect('')}
                className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors ${
                  !value
                    ? 'bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {placeholder || 'Select'}
              </button>
            )}
            {normalizedOptions.map((opt) => {
              const isSelected = String(value) === String(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  id={`${id}-opt-${opt.value}`}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>,
          document.body
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
