import { useEffect, useState } from 'react';
import api from '../../../api';
import {
  LicensesLoading,
  LicensesHeader,
  LicensesEmpty,
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

export default function AdminLicenses() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    api.admin.licenses.list().then(setPlans).catch(console.error).finally(() => setLoading(false));
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
      features: form.features ? form.features.split('\n').map((f) => f.trim()).filter(Boolean) : [],
      isActive: form.isActive,
    };
    try {
      if (editing === 'new') await api.admin.licenses.create(payload);
      else await api.admin.licenses.update(editing, payload);
      setEditing(null);
      api.admin.licenses.list().then(setPlans);
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (id) => {
    try {
      await api.admin.licenses.delete(id);
      api.admin.licenses.list().then(setPlans);
      setEditing(null);
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) {
    return <LicensesLoading />;
  }

  return (
    <div className="mx-auto max-w-[1280px]">
      <LicensesHeader onAddPlan={openCreate} />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {plans.length > 0 ? (
          <LicensesTable plans={plans} onOpenEdit={openEdit} onRemove={remove} />
        ) : (
          <LicensesEmpty />
        )}
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
