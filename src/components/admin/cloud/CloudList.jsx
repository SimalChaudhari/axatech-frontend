import { useEffect, useState } from 'react';
import api from '../../../api';
import { toast } from '../../../utils/toast';
import { CloudHeader, CloudTable, CloudModal } from './index';

const initialForm = {
  planName: '',
  type: 'shared',
  price: '',
  period: 'month',
  description: '',
  features: '',
  isActive: true,
};

export default function CloudList() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);

  const load = () => {
    setLoading(true);
    return api.admin.cloud
      .list()
      .then(setPlans)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing('new');
    setForm(initialForm);
  };

  const openEdit = (plan) => {
    setEditing(plan._id);
    setForm({
      planName: plan.planName || '',
      type: plan.type || 'shared',
      price: plan.price ?? '',
      period: plan.period || 'month',
      description: plan.description || '',
      features: (plan.features || []).join('\n'),
      isActive: plan.isActive !== false,
    });
  };

  const save = async () => {
    const payload = {
      planName: form.planName?.trim(),
      type: form.type || 'shared',
      price: Number(form.price),
      period: (form.period || 'month').trim(),
      description: form.description?.trim() || undefined,
      features: form.features
        ? form.features
            .split('\n')
            .map((f) => f.trim())
            .filter(Boolean)
        : [],
      isActive: form.isActive,
    };
    try {
      if (editing === 'new') {
        await api.admin.cloud.create(payload);
        toast.success('Cloud plan created');
      } else {
        await api.admin.cloud.update(editing, payload);
        toast.success('Cloud plan updated');
      }
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to save cloud plan');
    }
  };

  const remove = async (id) => {
    try {
      await api.admin.cloud.delete(id);
      toast.success('Cloud plan deleted');
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to delete cloud plan');
    }
  };

  return (
    <div className="mx-auto max-w-[1280px]">
      <CloudHeader onAdd={openCreate} />

      <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <CloudTable plans={plans} onOpenEdit={openEdit} onRemove={remove} loading={loading} />
      </div>

      {editing && (
        <CloudModal
          mode={editing === 'new' ? 'create' : 'edit'}
          form={form}
          setForm={setForm}
          onSave={save}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
