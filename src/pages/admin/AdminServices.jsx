import { useEffect, useState } from 'react';
import api from '../../api';
import { Button } from '../../components/common';
import './AdminServices.css';

export default function AdminServices() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', description: '', shortDescription: '', isActive: true });

  const load = () => api.admin.services.list().then(setList).catch(console.error);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditing('new');
    setForm({ title: '', slug: '', description: '', shortDescription: '', isActive: true });
  };

  const openEdit = (s) => {
    setEditing(s._id);
    setForm({
      title: s.title,
      slug: s.slug || '',
      description: s.description || '',
      shortDescription: s.shortDescription || '',
      isActive: s.isActive !== false,
    });
  };

  const save = async () => {
    const payload = { ...form };
    if (!payload.slug) payload.slug = payload.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    try {
      if (editing === 'new') await api.admin.services.create(payload);
      else await api.admin.services.update(editing, payload);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await api.admin.services.delete(id);
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
          <p>Loading services…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page admin-services">
      <header className="admin-page-header">
        <h1>Services</h1>
        <div className="admin-actions">
          <Button type="button" variant="primary" fullWidth={false} onClick={openCreate}>Add Service</Button>
        </div>
      </header>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Active</th>
                <th className="td-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((s) => (
                <tr key={s._id}>
                  {editing === s._id ? (
                    <td colSpan={4}>
                      <div className="admin-form-inline">
                        <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
                        <input className="input" placeholder="Slug" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
                        <textarea className="textarea" placeholder="Short description" value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} rows={2} />
                        <textarea className="textarea" placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
                        <label><input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} /> Active</label>
                        <div className="admin-form-actions">
                          <Button type="button" variant="primary" fullWidth={false} onClick={save}>Save</Button>
                          <Button type="button" variant="outline" fullWidth={false} onClick={() => setEditing(null)}>Cancel</Button>
                          <Button type="button" variant="danger" fullWidth={false} onClick={() => remove(s._id)}>Delete</Button>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td>{s.title}</td>
                      <td><code className="admin-code">{s.slug}</code></td>
                      <td><span className={s.isActive !== false ? 'admin-badge admin-badge--active' : 'admin-badge admin-badge--inactive'}>{s.isActive !== false ? 'Yes' : 'No'}</span></td>
                      <td className="td-actions">
                        <Button type="button" variant="outline" fullWidth={false} onClick={() => openEdit(s)}>Edit</Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && (
          <div className="admin-empty">No services yet. Add one to get started.</div>
        )}
      </div>

      {editing === 'new' && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal admin-modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">Add Service</div>
            <div className="admin-modal-body">
              <div className="admin-form">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Title</label>
                    <input className="input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
                  </div>
                  <div className="admin-form-group">
                    <label>Slug</label>
                    <input className="input" placeholder="Optional" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Short description</label>
                  <textarea className="textarea" value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} rows={2} />
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea className="textarea" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4} />
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
