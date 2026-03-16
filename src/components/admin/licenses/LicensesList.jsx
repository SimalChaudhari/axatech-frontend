import { useEffect, useState } from 'react';
import api from '../../../api';
import { toast } from '../../../utils/toast';
import {
  LicensesHeader,
  LicensesTable,
  LicensesModal,
} from '../../../components/admin/licenses';

const initialForm = {
  planName: '',
  type: '', // empty so user must select Single or Multi; validation shows error if none selected
  price: '',
  description: '',
  features: '',
  isActive: true,
};

export default function LicensesList() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);

  const load = () => {
    setLoading(true);
    return api.admin.licenses
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
      planName: plan.planName,
      type: plan.type || 'single',
      price: plan.price ?? '',
      description: plan.description || '',
      features: (plan.features || []).join('\n'),
      isActive: plan.isActive !== false,
    });
  };

  const save = async () => {
    const payload = {
      planName: form.planName,
      type: form.type,
      price: Number(form.price),
      description: form.description || undefined,
      features: form.features
        ? form.features.split('\n').map((f) => f.trim()).filter(Boolean)
        : [],
      isActive: form.isActive,
    };
    try {
      if (editing === 'new') {
        await api.admin.licenses.create(payload);
        toast.success('License plan created');
      } else {
        await api.admin.licenses.update(editing, payload);
        toast.success('License plan updated');
      }
      setEditing(null);
      api.admin.licenses.list().then(setPlans);
    } catch (e) {
      toast.error(e.message || 'Failed to save license plan');
    }
  };

  const remove = async (id) => {
    try {
      await api.admin.licenses.delete(id);
      toast.success('License plan deleted');
      api.admin.licenses.list().then(setPlans);
      setEditing(null);
    } catch (e) {
      toast.error(e.message || 'Failed to delete license plan');
    }
  };

  return (
    <div className="mx-auto max-w-[1280px]">
      <LicensesHeader onAddPlan={openCreate} />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <LicensesTable plans={plans} onOpenEdit={openEdit} onRemove={remove} loading={loading} />
      </div>

      {editing && (
        <LicensesModal
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

