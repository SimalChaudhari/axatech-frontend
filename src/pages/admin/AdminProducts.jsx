import { useEffect, useState } from 'react';
import api from '../../api';
import { Button } from '../../components/common';
import './AdminProducts.css';

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
    <div className="admin-form admin-product-form">
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label>Name</label>
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="admin-form-group">
          <label>Slug</label>
          <input className="input" placeholder="Slug" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
        </div>
      </div>
      <div className="admin-form-group">
        <label>Short description</label>
        <input className="input" placeholder="Short description" value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} />
      </div>
      <div className="admin-form-group">
        <label>Description</label>
        <textarea className="textarea" placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
      </div>
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label>Category</label>
          <select className="select" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
            <option value="">No category</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div className="admin-form-group">
          <label>Demo video URL</label>
          <input className="input" placeholder="Demo video URL" value={form.demoVideoLink} onChange={(e) => setForm((f) => ({ ...f, demoVideoLink: e.target.value }))} />
        </div>
      </div>
      <div className="admin-form-group admin-form-group--row">
        <label className="admin-checkbox">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} />
          <span>Featured</span>
        </label>
        <label className="admin-checkbox">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} />
          <span>Active</span>
        </label>
      </div>
      <div className="admin-form-group">
        <label>Image</label>
        <input type="file" accept="image/*" className="admin-file-input" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
      </div>
      <div className="admin-form-actions">
        <Button type="button" variant="primary" fullWidth={false} onClick={save}>{editing === 'new' ? 'Create' : 'Save'}</Button>
        <Button type="button" variant="outline" fullWidth={false} onClick={() => setEditing(null)}>Cancel</Button>
        {editing !== 'new' && (
          <Button type="button" variant="danger" fullWidth={false} onClick={() => remove(editing)}>Delete</Button>
        )}
      </div>
    </div>
  );

  if (loading && !data.products.length) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <p>Loading products…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page admin-products">
      <header className="admin-page-header">
        <h1>Products (Add-ons)</h1>
        <div className="admin-actions">
          <Button type="button" variant="primary" fullWidth={false} onClick={openCreate}>Add Product</Button>
        </div>
      </header>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Active</th>
                <th className="td-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((p) => (
                <tr key={p._id}>
                  {editing === p._id ? (
                    <td colSpan={5}>
                      <div className="admin-form-inline-wrap">
                        <ProductForm />
                      </div>
                    </td>
                  ) : (
                    <>
                      <td>{p.name}</td>
                      <td>{p.category?.name || '—'}</td>
                      <td><span className={p.featured ? 'admin-badge admin-badge--active' : 'admin-badge admin-badge--inactive'}>{p.featured ? 'Yes' : 'No'}</span></td>
                      <td><span className={p.isActive !== false ? 'admin-badge admin-badge--active' : 'admin-badge admin-badge--inactive'}>{p.isActive !== false ? 'Yes' : 'No'}</span></td>
                      <td className="td-actions">
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
          <div className="admin-empty">No products yet. Add one to get started.</div>
        )}
      </div>

      {editing === 'new' && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">Add Product</div>
            <div className="admin-modal-body">
              <ProductForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
