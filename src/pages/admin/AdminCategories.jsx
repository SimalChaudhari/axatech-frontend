import { useEffect, useState } from 'react';
import api from '../../api';
import { Button } from '../../components/common';
import './AdminCategories.css';

export default function AdminCategories() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', isActive: true });

  const load = () => api.admin.categories.list().then(setList).catch(console.error);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditing('new');
    setForm({ name: '', slug: '', description: '', isActive: true });
  };

  const openEdit = (cat) => {
    setEditing(cat._id);
    setForm({ name: cat.name, slug: cat.slug || '', description: cat.description || '', isActive: cat.isActive !== false });
  };

  const save = async () => {
    const payload = { ...form };
    if (!payload.slug) payload.slug = payload.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    try {
      if (editing === 'new') await api.admin.categories.create(payload);
      else await api.admin.categories.update(editing, payload);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await api.admin.categories.delete(id);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <p>Loading categories…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page admin-categories">
      <header className="admin-page-header">
        <h1>Categories</h1>
        <div className="admin-actions">
          <Button type="button" variant="primary" fullWidth={false} onClick={openCreate}>Add Category</Button>
        </div>
      </header>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Active</th>
                <th className="td-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c._id}>
                  {editing === c._id ? (
                    <td colSpan={4}>
                      <div className="admin-form-inline">
                        <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                        <input className="input" placeholder="Slug" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
                        <label><input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} /> Active</label>
                        <div className="admin-form-actions">
                          <Button type="button" variant="primary" fullWidth={false} onClick={save}>Save</Button>
                          <Button type="button" variant="outline" fullWidth={false} onClick={() => setEditing(null)}>Cancel</Button>
                          <Button type="button" variant="danger" fullWidth={false} onClick={() => remove(c._id)}>Delete</Button>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td>{c.name}</td>
                      <td><code className="admin-code">{c.slug}</code></td>
                      <td><span className={c.isActive !== false ? 'admin-badge admin-badge--active' : 'admin-badge admin-badge--inactive'}>{c.isActive !== false ? 'Yes' : 'No'}</span></td>
                      <td className="td-actions">
                        <Button type="button" variant="outline" fullWidth={false} onClick={() => openEdit(c)}>Edit</Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && (
          <div className="admin-empty">No categories yet. Add one to get started.</div>
        )}
      </div>

      {editing === 'new' && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">Add Category</div>
            <div className="admin-modal-body">
              <div className="admin-form">
                <div className="admin-form-group">
                  <label>Name</label>
                  <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="admin-form-group">
                  <label>Slug</label>
                  <input className="input" placeholder="Slug (optional)" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea className="textarea" placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} />
                </div>
                <div className="admin-form-group admin-form-group--row">
                  <label className="admin-checkbox">
                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} />
                    <span>Active</span>
                  </label>
                </div>
                <div className="admin-form-actions">
                  <Button type="button" variant="primary" fullWidth={false} onClick={save}>Create</Button>
                  <Button type="button" variant="outline" fullWidth={false} onClick={() => setEditing(null)}>Cancel</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
