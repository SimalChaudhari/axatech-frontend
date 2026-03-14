import { useState } from 'react';
import { Input, Dropdown, Checkbox } from '../../common';

const textareaClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-800 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-secondary dark:focus:ring-secondary/20 min-h-[80px] resize-y';

export default function ProductForm({
  form,
  setForm,
  imageFile,
  setImageFile,
  categories = [],
  errors = {},
  onValidateField,
  onClearError,
}) {
  const categoryOptions = categories.map((c) => ({ value: c._id, label: c.name }));

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Name"
          required
          type="text"
          value={form.name}
          onChange={(e) => {
            setForm((f) => ({ ...f, name: e.target.value }));
            onClearError?.('name');
          }}
          onBlur={() => onValidateField?.('name')}
          error={errors.name}
          placeholder="Name"
          className="mb-0"
        />
        <Input
          label="Slug"
          required
          type="text"
          value={form.slug}
          onChange={(e) => {
            setForm((f) => ({ ...f, slug: e.target.value }));
            onClearError?.('slug');
          }}
          onBlur={() => onValidateField?.('slug')}
          error={errors.slug}
          placeholder="Slug (e.g. my-product)"
          className="mb-0"
        />
      </div>

      <Input
        label="Short description"
        type="text"
        value={form.shortDescription}
        onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
        placeholder="Short description"
        className="mb-0"
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-gray-400">
          Description
        </label>
        <textarea
          className={textareaClass}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Dropdown
          label="Category"
          placeholder="No category"
          value={form.category}
          onChange={(v) => setForm((f) => ({ ...f, category: v }))}
          options={categoryOptions}
          showPlaceholderOption={true}
          className="mb-0"
        />
        <Input
          label="Demo video URL"
          type="url"
          value={form.demoVideoLink}
          onChange={(e) => setForm((f) => ({ ...f, demoVideoLink: e.target.value }))}
          placeholder="https://..."
          className="mb-0"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col justify-end pb-0.5">
          <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-gray-400">Featured</span>
          <Checkbox
            size="md"
            label="Featured"
            checked={form.featured}
            onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
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

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-gray-400">
          Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-slate-600 file:mr-2 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:font-medium file:text-white dark:text-gray-400"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );
}
