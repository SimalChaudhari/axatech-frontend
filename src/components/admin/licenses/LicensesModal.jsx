import { Button, Input, Dropdown } from '../../common';

const selectClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-secondary dark:focus:ring-secondary/20';
const textareaClass = `${selectClass} min-h-[60px] resize-y`;

export default function LicensesModal({ mode = 'create', form, setForm, onSave, onClose }) {
  return (
    <div
      className="fixed inset-0 z-9 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 border-b border-slate-200 px-5 py-4 font-semibold text-slate-800 dark:border-gray-600 dark:text-white">
          {mode === 'create' ? 'Add License Plan' : 'Edit License Plan'}
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Plan name"
                type="text"
                value={form.planName}
                onChange={(e) => setForm((f) => ({ ...f, planName: e.target.value }))}
                className="mb-0"
              />
              <Dropdown
                label="Type"
                value={form.type}
                onChange={(val) => setForm((f) => ({ ...f, type: val }))}
                options={[
                  { value: 'single', label: 'Single' },
                  { value: 'multi', label: 'Multi' },
                ]}
                className="mb-0"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Price (₹)"
                type="number"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="mb-0"
              />
              <div className="mb-0 flex items-end pb-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                    className="rounded border-slate-300 text-primary focus:ring-primary/20 dark:border-gray-500 dark:text-secondary"
                  />
                  Active
                </label>
              </div>
            </div>
            <div className="mb-0">
              <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-gray-400">Description</label>
              <textarea
                className={textareaClass}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={2}
              />
            </div>
            <div className="mb-0">
              <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-gray-400">
                Features (one per line)
              </label>
              <textarea
                className={textareaClass}
                value={form.features}
                onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                rows={3}
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button type="button" variant="primary" fullWidth={false} onClick={onSave}>
                {mode === 'create' ? 'Create' : 'Update'}
              </Button>
              <Button type="button" variant="outline" fullWidth={false} onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
