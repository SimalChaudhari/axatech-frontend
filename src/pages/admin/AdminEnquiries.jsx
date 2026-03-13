import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../api';
import { Button } from '../../components/common';

const selectClass = 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-secondary dark:focus:ring-secondary/20';
const textareaClass = 'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-secondary dark:focus:ring-secondary/20 min-h-[80px]';

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
    const base = 'inline-block rounded-md px-2.5 py-1 text-[0.78rem] font-semibold uppercase tracking-wide';
    if (s === 'New') return `${base} bg-info/15 text-info-dark dark:bg-info/20 dark:text-info-light`;
    if (s === 'Contacted') return `${base} bg-primary/10 text-primary dark:text-primary`;
    if (s === 'Closed') return `${base} bg-success/15 text-success-dark dark:bg-success/20 dark:text-success-light`;
    return `${base} bg-slate-100 text-slate-500 dark:bg-gray-600 dark:text-gray-400`;
  };

  return (
    <div className="mx-auto max-w-[1280px]">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-2xl font-bold tracking-tight text-slate-800 dark:text-white">Enquiries / Leads</h1>
      </header>

      <p className="-mt-2 mb-4 text-sm text-slate-500 dark:text-gray-400">Update status (New → Contacted → Closed) and add notes.</p>

      <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            <Link to="/admin/enquiries" className={`rounded-lg border px-4 py-2 text-sm font-medium no-underline transition-colors ${!statusFilter ? 'border-primary bg-primary text-white dark:border-primary dark:bg-primary dark:text-white' : 'border-gray-200 bg-slate-100 text-slate-500 hover:bg-gray-200 hover:text-slate-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200'}`}>All</Link>
            <Link to="/admin/enquiries?status=New" className={`rounded-lg border px-4 py-2 text-sm font-medium no-underline transition-colors ${statusFilter === 'New' ? 'border-primary bg-primary text-white dark:border-primary dark:bg-primary dark:text-white' : 'border-gray-200 bg-slate-100 text-slate-500 hover:bg-gray-200 hover:text-slate-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200'}`}>New</Link>
            <Link to="/admin/enquiries?status=Contacted" className={`rounded-lg border px-4 py-2 text-sm font-medium no-underline transition-colors ${statusFilter === 'Contacted' ? 'border-primary bg-primary text-white dark:border-primary dark:bg-primary dark:text-white' : 'border-gray-200 bg-slate-100 text-slate-500 hover:bg-gray-200 hover:text-slate-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200'}`}>Contacted</Link>
            <Link to="/admin/enquiries?status=Closed" className={`rounded-lg border px-4 py-2 text-sm font-medium no-underline transition-colors ${statusFilter === 'Closed' ? 'border-primary bg-primary text-white dark:border-primary dark:bg-primary dark:text-white' : 'border-gray-200 bg-slate-100 text-slate-500 hover:bg-gray-200 hover:text-slate-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200'}`}>Closed</Link>
          </div>

          {loading ? (
            <div className="py-12 px-4 text-center text-base text-slate-500 dark:text-gray-400">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-primary dark:border-gray-600 dark:border-t-secondary" />
              <p>Loading enquiries…</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm [&_tbody_tr:last-child_td]:border-b-0">
                <thead>
                  <tr>
                    <th className="border-b border-gray-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-slate-400">Date</th>
                    <th className="border-b border-gray-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-slate-400">Type</th>
                    <th className="border-b border-gray-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-slate-400">Name</th>
                    <th className="border-b border-gray-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-slate-400">Email</th>
                    <th className="border-b border-gray-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-slate-400">Status</th>
                    <th className="whitespace-nowrap border-b border-gray-200 bg-slate-50 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-gray-600 dark:bg-gray-700/50 dark:text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.enquiries || []).map((e) => (
                    <tr key={e._id} className="transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-gray-700/30">
                      <td className="border-b border-slate-100 px-4 py-3.5 align-middle text-slate-700 dark:border-gray-600 dark:text-gray-300">{new Date(e.createdAt).toLocaleString()}</td>
                      <td className="border-b border-slate-100 px-4 py-3.5 align-middle text-slate-700 dark:border-gray-600 dark:text-gray-300">{e.type}</td>
                      <td className="border-b border-slate-100 px-4 py-3.5 align-middle text-slate-700 dark:border-gray-600 dark:text-gray-300">{e.name}</td>
                      <td className="border-b border-slate-100 px-4 py-3.5 align-middle text-slate-700 dark:border-gray-600 dark:text-gray-300">{e.email}</td>
                      <td className="border-b border-slate-100 px-4 py-3.5 align-middle dark:border-gray-600"><span className={badgeClass(e.status)}>{e.status}</span></td>
                      <td className="whitespace-nowrap border-b border-slate-100 px-4 py-3.5 text-right align-middle dark:border-gray-600">
                        <Button type="button" variant="outline" fullWidth={false} onClick={() => setDetailId(e._id)}>View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(!data.enquiries || data.enquiries.length === 0) && !loading && (
                <div className="mx-4 mb-4 py-10 text-center text-base text-slate-500 dark:text-gray-400">No enquiries found.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {detail && (
        <div className="fixed inset-0 z-1000 flex animate-admin-fadeIn items-center justify-center bg-slate-900/50 p-6" onClick={() => setDetailId(null)}>
          <div className="flex max-h-[90vh] w-full max-w-[480px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-admin-slideUp dark:bg-gray-800" onClick={(e) => e.stopPropagation()}>
            <div className="shrink-0 border-b border-gray-200 px-6 py-5 text-lg font-bold text-slate-800 dark:border-gray-600 dark:text-white">Enquiry details</div>
            <div className="flex-1 overflow-y-auto p-6">
              <dl className="mb-4 grid grid-cols-[100px_1fr] gap-x-4 gap-y-1.5 text-sm">
                <dt className="font-medium text-slate-500 dark:text-gray-400">Type</dt><dd className="m-0 text-slate-700 dark:text-gray-300">{detail.type}</dd>
                <dt className="font-medium text-slate-500 dark:text-gray-400">Name</dt><dd className="m-0 text-slate-700 dark:text-gray-300">{detail.name}</dd>
                <dt className="font-medium text-slate-500 dark:text-gray-400">Email</dt><dd className="m-0 text-slate-700 dark:text-gray-300">{detail.email}</dd>
                {detail.phone && (<><dt className="font-medium text-slate-500 dark:text-gray-400">Phone</dt><dd className="m-0 text-slate-700 dark:text-gray-300">{detail.phone}</dd></>)}
                {detail.company && (<><dt className="font-medium text-slate-500 dark:text-gray-400">Company</dt><dd className="m-0 text-slate-700 dark:text-gray-300">{detail.company}</dd></>)}
                {detail.message && (<><dt className="font-medium text-slate-500 dark:text-gray-400">Message</dt><dd className="m-0 text-slate-700 dark:text-gray-300">{detail.message}</dd></>)}
                {detail.product && (<><dt className="font-medium text-slate-500 dark:text-gray-400">Product</dt><dd className="m-0 text-slate-700 dark:text-gray-300">{detail.product.name}</dd></>)}
                {detail.service && (<><dt className="font-medium text-slate-500 dark:text-gray-400">Service</dt><dd className="m-0 text-slate-700 dark:text-gray-300">{detail.service.title}</dd></>)}
                {detail.licensePlan && (<><dt className="font-medium text-slate-500 dark:text-gray-400">License</dt><dd className="m-0 text-slate-700 dark:text-gray-300">{detail.licensePlan.planName}</dd></>)}
                {detail.cloudPlan && (<><dt className="font-medium text-slate-500 dark:text-gray-400">Cloud plan</dt><dd className="m-0 text-slate-700 dark:text-gray-300">{detail.cloudPlan.planName}</dd></>)}
                <dt className="font-medium text-slate-500 dark:text-gray-400">Created</dt><dd className="m-0 text-slate-700 dark:text-gray-300">{new Date(detail.createdAt).toLocaleString()}</dd>
              </dl>
              <hr className="my-4 border-0 border-t border-gray-200 dark:border-gray-600" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Status</label>
                  <select className={selectClass} value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Admin notes</label>
                  <textarea className={textareaClass} value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} rows={3} />
                </div>
              </div>
            </div>
            <div className="shrink-0 border-t border-gray-200 bg-slate-50 px-6 py-4 dark:border-gray-600 dark:bg-gray-800">
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" fullWidth={false} onClick={() => setDetailId(null)}>Close</Button>
                <Button type="button" variant="primary" fullWidth={false} onClick={updateStatus} disabled={saving} loading={saving} loadingLabel="Saving…">
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
