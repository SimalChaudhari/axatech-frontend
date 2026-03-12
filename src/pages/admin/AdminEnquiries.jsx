import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../api';
import { Button } from '../../components/common';
import './AdminEnquiries.css';

export default function AdminEnquiries() {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || '';
  const [data, setData] = useState({ enquiries: [], total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [detailId, setDetailId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [status, setStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const load = () => {
    const params = { limit: 20 };
    if (statusFilter) params.status = statusFilter;
    return api.admin.enquiries.list(params).then(setData).catch(console.error);
  };

  useEffect(() => {
    setLoading(true);
    load().finally(() => setLoading(false));
  }, [statusFilter]);

  useEffect(() => {
    if (!detailId) {
      setDetail(null);
      return;
    }
    api.admin.enquiries
      .get(detailId)
      .then((e) => {
        setDetail(e);
        setStatus(e.status);
        setAdminNotes(e.adminNotes || '');
      })
      .catch(console.error);
  }, [detailId]);

  const updateStatus = async () => {
    setSaving(true);
    try {
      await api.admin.enquiries.updateStatus(detailId, { status, adminNotes });
      setDetail((d) => (d ? { ...d, status, adminNotes } : d));
      load();
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const badgeClass = (s) => {
    if (s === 'New') return 'admin-badge admin-badge--new';
    if (s === 'Contacted') return 'admin-badge admin-badge--contacted';
    if (s === 'Closed') return 'admin-badge admin-badge--closed';
    return 'admin-badge';
  };

  return (
    <div className="admin-page admin-enquiries">
      <header className="admin-page-header">
        <h1>Enquiries / Leads</h1>
      </header>

      <p className="admin-enquiries-desc">Update status (New → Contacted → Closed) and add notes.</p>

      <div className="admin-card">
        <div className="admin-card-body">
          <div className="enquiry-filters">
            <Link to="/admin/enquiries" className={!statusFilter ? 'active' : ''}>All</Link>
            <Link to="/admin/enquiries?status=New" className={statusFilter === 'New' ? 'active' : ''}>New</Link>
            <Link to="/admin/enquiries?status=Contacted" className={statusFilter === 'Contacted' ? 'active' : ''}>Contacted</Link>
            <Link to="/admin/enquiries?status=Closed" className={statusFilter === 'Closed' ? 'active' : ''}>Closed</Link>
          </div>

          {loading ? (
            <div className="admin-loading">
              <div className="admin-loading-spinner" />
              <p>Loading enquiries…</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th className="td-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.enquiries || []).map((e) => (
                    <tr key={e._id}>
                      <td>{new Date(e.createdAt).toLocaleString()}</td>
                      <td>{e.type}</td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td><span className={badgeClass(e.status)}>{e.status}</span></td>
                      <td className="td-actions">
                        <Button type="button" variant="outline" fullWidth={false} onClick={() => setDetailId(e._id)}>View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(!data.enquiries || data.enquiries.length === 0) && !loading && (
                <div className="admin-empty">No enquiries found.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {detail && (
        <div className="admin-modal-overlay" onClick={() => setDetailId(null)}>
          <div className="admin-modal enquiry-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">Enquiry details</div>
            <div className="admin-modal-body">
              <dl className="enquiry-detail-list">
                <dt>Type</dt><dd>{detail.type}</dd>
                <dt>Name</dt><dd>{detail.name}</dd>
                <dt>Email</dt><dd>{detail.email}</dd>
                {detail.phone && (<><dt>Phone</dt><dd>{detail.phone}</dd></>)}
                {detail.company && (<><dt>Company</dt><dd>{detail.company}</dd></>)}
                {detail.message && (<><dt>Message</dt><dd>{detail.message}</dd></>)}
                {detail.product && (<><dt>Product</dt><dd>{detail.product.name}</dd></>)}
                {detail.service && (<><dt>Service</dt><dd>{detail.service.title}</dd></>)}
                {detail.licensePlan && (<><dt>License</dt><dd>{detail.licensePlan.planName}</dd></>)}
                {detail.cloudPlan && (<><dt>Cloud plan</dt><dd>{detail.cloudPlan.planName}</dd></>)}
                <dt>Created</dt><dd>{new Date(detail.createdAt).toLocaleString()}</dd>
              </dl>
              <hr className="enquiry-detail-hr" />
              <div className="admin-form">
                <div className="admin-form-group">
                  <label className="label">Status</label>
                  <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="label">Admin notes</label>
                  <textarea className="textarea" value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} rows={3} />
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <Button type="button" variant="outline" fullWidth={false} onClick={() => setDetailId(null)}>Close</Button>
              <Button type="button" variant="primary" fullWidth={false} onClick={updateStatus} disabled={saving} loading={saving} loadingLabel="Saving…">
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
