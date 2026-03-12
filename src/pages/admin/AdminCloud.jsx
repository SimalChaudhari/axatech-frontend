import { useEffect, useState } from 'react';
import api from '../../api';
import { Button } from '../../components/common';
import './AdminCloud.css';

export default function AdminCloud() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ planName: '', type: 'shared', price: '', period: 'month', description: '', features: '', isActive: true });

  const load = () => api.admin.cloud.list().then(setPlans).catch(console.error);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditing('new');
    setForm({ planName: '', type: 'shared', price: '', period: 'month', description: '', features: '', isActive: true });
  };

  const openEdit = (p) => {
    setEditing(p._id);
    setForm({
      planName: p.planName,
      type: p.type || 'shared',
      price: p.price ?? '',
      period: p.period || 'month',
      description: p.description || '',
      features: (p.features || []).join('\n'),
      isActive: p.isActive !== false,
    });
  };

  const save = async () => {
    const payload = {
      planName: form.planName,
      type: form.type,
      price: Number(form.price),
      period: form.period,
      description: form.description || undefined,
      features: form.features ? form.features.split('\n').map((f) => f.trim()).filter(Boolean) : [],
      isActive: form.isActive,
    };
    try {
      if (editing === 'new') await api.admin.cloud.create(payload);
      else await api.admin.cloud.update(editing, payload);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this plan?')) return;
    try {
      await api.admin.cloud.delete(id);
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
          <p>Loading cloud plans…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page admin-cloud">
      <header className="admin-page-header">
        <h1>Cloud Plans</h1>
        <div className="admin-actions">
          <Button type="button" variant="primary" fullWidth={false} onClick={openCreate}>Add Plan</Button>
        </div>
      </header>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Type</th>
                <th>Price</th>
                <th>Active</th>
                <th className="td-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p._id}>
                  {editing === p._id ? (
                    <td colSpan={5}>
                      <div className="admin-form-inline">
                        <input className="input" placeholder="Plan name" value={form.planName} onChange={(e) => setForm((f) => ({ ...f, planName: e.target.value }))} />
                        <select className="select" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                          <option value="shared">Shared</option>
                          <option value="vps">VPS</option>
                        </select>
                        <input type="number" className="input" placeholder="Price" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
                        <input className="input" placeholder="Period" value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))} />
                        <textarea className="textarea" placeholder="Features (one per line)" value={form.features} onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))} rows={2} />
                        <label><input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} /> Active</label>
                        <div className="admin-form-actions">
                          <Button type="button" variant="primary" fullWidth={false} onClick={save}>Save</Button>
                          <Button type="button" variant="outline" fullWidth={false} onClick={() => setEditing(null)}>Cancel</Button>
                          <Button type="button" variant="danger" fullWidth={false} onClick={() => remove(p._id)}>Delete</Button>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td>{p.planName}</td>
                      <td>{p.type}</td>
                      <td>₹{p.price?.toLocaleString()}/{p.period || 'month'}</td>
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
        {plans.length === 0 && (
          <div className="admin-empty">No cloud plans yet. Add one to get started.</div>
        )}
      </div>

      {editing === 'new' && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">Add Cloud Plan</div>
            <div className="admin-modal-body">
              <div className="admin-form">
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Plan name</label>
                    <input className="input" value={form.planName} onChange={(e) => setForm((f) => ({ ...f, planName: e.target.value }))} />
                  </div>
                  <div className="admin-form-group">
                    <label>Type</label>
                    <select className="select" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                      <option value="shared">Shared</option>
                      <option value="vps">VPS</option>
                    </select>
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Price (₹)</label>
                    <input type="number" className="input" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
                  </div>
                  <div className="admin-form-group">
                    <label>Period</label>
                    <input className="input" placeholder="e.g. month" value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))} />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Features (one per line)</label>
                  <textarea className="textarea" value={form.features} onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))} rows={3} />
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
