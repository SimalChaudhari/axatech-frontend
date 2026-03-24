import { useEffect, useState } from 'react';
import api from '../../../api';
import { toast } from '../../../utils/toast';
import { ServicesHeader, ServicesTable, ServicesModal } from './index';

const initialForm = {
  title: '',
  slug: '',
  description: '',
  shortDescription: '',
  isActive: true,
};

export default function ServicesList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);

  const load = () => {
    setLoading(true);
    return api.admin.services
      .list()
      .then(setList)
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

  const openEdit = (service) => {
    setEditing(service._id);
    setForm({
      title: service.title || '',
      slug: service.slug || '',
      description: service.description || '',
      shortDescription: service.shortDescription || '',
      isActive: service.isActive !== false,
    });
  };

  const save = async () => {
    const payload = {
      ...form,
      title: form.title?.trim(),
      slug: form.slug?.trim(),
      shortDescription: form.shortDescription?.trim(),
      description: form.description?.trim(),
    };
    if (!payload.slug) {
      payload.slug = payload.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    }
    try {
      if (editing === 'new') {
        await api.admin.services.create(payload);
        toast.success('Service created');
      } else {
        await api.admin.services.update(editing, payload);
        toast.success('Service updated');
      }
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to save service');
    }
  };

  const remove = async (id) => {
    try {
      await api.admin.services.delete(id);
      toast.success('Service deleted');
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to delete service');
    }
  };

  return (
    <div className="mx-auto max-w-[1280px]">
      <ServicesHeader onAdd={openCreate} />

      <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <ServicesTable
          services={list}
          onOpenEdit={openEdit}
          onRemove={remove}
          loading={loading}
        />
      </div>

      {editing && (
        <ServicesModal
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
