import { useState } from 'react';
import { Button, Input, Checkbox } from '../../common';

const textareaClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-800 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-secondary dark:focus:ring-secondary/20 min-h-[80px] resize-y';

export default function CategoriesModal({ mode = 'create', form, setForm, onSave, onClose }) {
  const [errors, setErrors] = useState({ name: '' });

  const validate = () => {
    const next = { name: '' };
    // name: required (matches Category schema)
    const name = (form.name ?? '').trim();
    if (!name) next.name = 'Name is required';
    setErrors(next);
    return !next.name;
  };

  const validateField = (field, nextValue) => {
    if (field === 'name') {
      const name = (nextValue !== undefined ? nextValue : form.name ?? '').trim();
      setErrors((prev) => ({ ...prev, name: name ? '' : 'Name is required' }));
    }
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave?.();
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div
      className="fixed inset-0 z-9 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="categories-modal-title"
    >
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800 dark:shadow-none dark:ring-1 dark:ring-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="shrink-0 border-b border-slate-200 bg-slate-50/80 px-6 py-4 dark:border-gray-700 dark:bg-gray-800/95">
          <h2 id="categories-modal-title" className="text-lg font-semibold text-slate-800 dark:text-white">
            {mode === 'create' ? 'Add Category' : 'Edit Category'}
          </h2>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-5">
            <Input
              label="Name"
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm((f) => ({ ...f, name: e.target.value }));
                clearError('name');
              }}
              onBlur={() => validateField('name')}
              error={errors.name}
              placeholder="Name"
              className="mb-0"
            />
            <Input
              label="Slug"
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="Slug (optional – auto-generated from name if blank)"
              className="mb-0"
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-gray-400">
                Description
              </label>
              <textarea
                className={textareaClass}
                placeholder="Optional description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={2}
              />
            </div>
            <div className="flex flex-col justify-end pb-0.5">
              <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-gray-400">Status</span>
              <Checkbox
                size="md"
                label="Active"
                checked={form.isActive}
                onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
              />
            </div>
          </div>
        </div>
        <footer className="shrink-0 flex flex-wrap justify-end gap-3 border-t border-slate-200 bg-slate-50/80 px-6 py-4 dark:border-gray-700 dark:bg-gray-800/95">
          <Button type="button" variant="outline" fullWidth={false} onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="primary" fullWidth={false} onClick={handleSave}>
            {mode === 'create' ? 'Create category' : 'Update category'}
          </Button>
        </footer>
      </div>
    </div>
  );
}
