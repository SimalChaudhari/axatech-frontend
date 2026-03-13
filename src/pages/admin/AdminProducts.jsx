import { useEffect, useState } from 'react';
import api from '../../api';
import { Button } from '../../components/common';

const inputClass = 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-secondary dark:focus:ring-secondary/20';
const selectClass = inputClass;
const textareaClass = 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-secondary dark:focus:ring-secondary/20 min-h-[80px]';

export default function AdminProducts() {
  const [data, setData] = useState({ products: [], total: 0 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', shortDescription: '', category: '', demoVideoLink: '', featured: false, isActive: true });
  const [imageFile, setImageFile] = useState(null);

  const load = () => api.admin.products.list({ limit: 100 }).then((r) => setData({ products: r.products || [], total: r.total || 0 }));

  useEffect(() => {
    load();
    api.admin.categories.list().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (data.products.length && loading) setLoading(false);
  }, [data.products.length, loading]);

  const openCreate = () => {
    setEditing('new');
    setForm({ name: '', slug: '', description: '', shortDescription: '', category: '', demoVideoLink: '', featured: false, isActive: true });
    setImageFile(null);
  };

  const openEdit = (p) => {
    setEditing(p._id);
    setForm({
      name: p.name,
      slug: p.slug || '',
      description: p.description || '',
      shortDescription: p.shortDescription || '',
      category: p.category?._id || p.category || '',
      demoVideoLink: p.demoVideoLink || '',
      featured: !!p.featured,
      isActive: p.isActive !== false,
      image: p.image ? p.image.split('/').pop() : '',
    });
    setImageFile(null);
  };

  const save = async () => {
    let imageFilename = form.image;
    if (imageFile) {
      try {
        imageFilename = await api.upload(imageFile);
      } catch (e) {
        alert('Image upload failed: ' + e.message);
        return;
      }
    }
    const payload = {
      name: form.name,
      slug: form.slug || undefined,
      description: form.description || undefined,
      shortDescription: form.shortDescription || undefined,
      category: form.category || undefined,
      demoVideoLink: form.demoVideoLink || undefined,
      featured: form.featured,
      isActive: form.isActive,
    };
    if (imageFilename) payload.image = imageFilename;
    try {
      if (editing === 'new') await api.admin.products.create(payload);
      else await api.admin.products.update(editing, payload);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.admin.products.delete(id);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const ProductForm = () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Name</label>
          <input className={inputClass} placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Slug</label>
          <input className={inputClass} placeholder="Slug" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Short description</label>
        <input className={inputClass} placeholder="Short description" value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Description</label>
        <textarea className={textareaClass} placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
      </div>
      <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Category</label>
          <select className={selectClass} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
            <option value="">No category</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Demo video URL</label>
          <input className={inputClass} placeholder="Demo video URL" value={form.demoVideoLink} onChange={(e) => setForm((f) => ({ ...f, demoVideoLink: e.target.value }))} />
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-4">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600 dark:text-gray-400">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="rounded border-gray-300 text-primary focus:ring-primary/20 dark:border-gray-500 dark:text-secondary" />
          <span>Featured</span>
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600 dark:text-gray-400">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} className="rounded border-gray-300 text-primary focus:ring-primary/20 dark:border-gray-500 dark:text-secondary" />
          <span>Active</span>
        </label>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Image</label>
        <input type="file" accept="image/*" className="block w-full text-sm text-slate-600 file:mr-2 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:font-medium file:text-white dark:text-gray-400" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2 border-t border-gray-200 pt-2 dark:border-gray-600">
        <Button type="button" variant="primary" fullWidth={false} onClick={save}>{editing === 'new' ? 'Create' : 'Save'}</Button>
        <Button type="button" variant="outline" fullWidth={false} onClick={() => setEditing(null)}>Cancel</Button>
        {editing !== 'new' && (
          <Button type="button" variant="error" fullWidth={false} onClick={() => remove(editing)}>Delete</Button>
        )}
      </div>
    </div>
  );

  if (loading && !data.products.length) {
    return (
      <div className="mx-auto max-w-[1280px]">
        <div className="py-12 px-4 text-center text-base text-slate-500 dark:text-gray-400">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-primary dark:border-gray-600 dark:border-t-secondary" />
          <p>Loading products…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px]">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-2xl font-bold tracking-tight text-slate-800 dark:text-white">Products (Add-ons)</h1>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="primary" fullWidth={false} onClick={openCreate}>Add Product</Button>
        </div>
      </header>

      <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm [&_tbody_tr:last-child_td]:border-b-0">
            <thead>
              <tr>
                <th className="border-b border-gray-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-slate-400">Name</th>
                <th className="border-b border-gray-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-slate-400">Category</th>
                <th className="border-b border-gray-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-slate-400">Featured</th>
                <th className="border-b border-gray-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-slate-400">Active</th>
                <th className="whitespace-nowrap border-b border-gray-200 bg-slate-50 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((p) => (
                <tr key={p._id} className="transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-gray-700/30">
                  {editing === p._id ? (
                    <td colSpan={5} className="border-b border-slate-100 px-4 py-3 align-middle dark:border-gray-600">
                      <div className="py-2">
                        <ProductForm />
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="border-b border-slate-100 px-4 py-3.5 align-middle text-slate-700 dark:border-gray-600 dark:text-gray-300">{p.name}</td>
                      <td className="border-b border-slate-100 px-4 py-3.5 align-middle text-slate-700 dark:border-gray-600 dark:text-gray-300">{p.category?.name || '—'}</td>
                      <td className="border-b border-slate-100 px-4 py-3.5 align-middle dark:border-gray-600">
                        <span className={p.featured ? 'inline-block rounded-md bg-success/15 px-2.5 py-1 text-[0.78rem] font-semibold uppercase tracking-wide text-success-dark dark:bg-success/20 dark:text-success-light' : 'inline-block rounded-md bg-slate-100 px-2.5 py-1 text-[0.78rem] font-semibold uppercase tracking-wide text-slate-500 dark:bg-gray-600 dark:text-gray-400'}>{p.featured ? 'Yes' : 'No'}</span>
                      </td>
                      <td className="border-b border-slate-100 px-4 py-3.5 align-middle dark:border-gray-600">
                        <span className={p.isActive !== false ? 'inline-block rounded-md bg-success/15 px-2.5 py-1 text-[0.78rem] font-semibold uppercase tracking-wide text-success-dark dark:bg-success/20 dark:text-success-light' : 'inline-block rounded-md bg-slate-100 px-2.5 py-1 text-[0.78rem] font-semibold uppercase tracking-wide text-slate-500 dark:bg-gray-600 dark:text-gray-400'}>{p.isActive !== false ? 'Yes' : 'No'}</span>
                      </td>
                      <td className="whitespace-nowrap border-b border-slate-100 px-4 py-3.5 text-right align-middle dark:border-gray-600">
                        <Button type="button" variant="outline" fullWidth={false} onClick={() => openEdit(p)}>Edit</Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!data.products || data.products.length === 0) && (
          <div className="mx-4 mb-4 py-10 text-center text-base text-slate-500 dark:text-gray-400">No products yet. Add one to get started.</div>
        )}
      </div>

      {editing === 'new' && (
        <div className="fixed inset-0 z-1000 flex animate-admin-fadeIn items-center justify-center bg-slate-900/50 p-6" onClick={() => setEditing(null)}>
          <div className="flex max-h-[90vh] w-full max-w-[560px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-admin-slideUp dark:bg-gray-800" onClick={(e) => e.stopPropagation()}>
            <div className="shrink-0 border-b border-gray-200 px-6 py-5 text-lg font-bold text-slate-800 dark:border-gray-600 dark:text-white">Add Product</div>
            <div className="flex-1 overflow-y-auto p-6">
              <ProductForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
