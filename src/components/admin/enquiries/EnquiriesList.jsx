import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../../api';
import { toast } from '../../../utils/toast';
import EnquiriesHeader from './EnquiriesHeader';
import EnquiriesTable from './EnquiriesTable';
import EnquiryDetailModal from './EnquiryDetailModal';

export default function EnquiriesList() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      toast.success('Enquiry updated');
    } catch (e) {
      toast.error(e.message || 'Failed to update enquiry');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1280px]">
      <EnquiriesHeader statusFilter={statusFilter} />

      <EnquiriesTable
        enquiries={data.enquiries}
        loading={loading}
        onView={(id) => setDetailId(id)}
      />

      <EnquiryDetailModal
        open={!!detail}
        detail={detail}
        status={status}
        adminNotes={adminNotes}
        saving={saving}
        onClose={() => setDetailId(null)}
        onStatusChange={setStatus}
        onAdminNotesChange={setAdminNotes}
        onUpdate={updateStatus}
      />
    </div>
  );
}

