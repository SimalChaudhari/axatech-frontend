import { useEffect, useState } from 'react';
import api from '../../../api';
import { toast } from '../../../utils/toast';
import {
  TechnologiesHeader,
  TechnologiesTable,
  TechnologiesModal,
} from './index';

const initialForm = {
  title: '',
  description: '',
  category: '',
  image: '',
  isActive: true,
};

export default function TechnologiesList() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);

  const load = () => {
    setLoading(true);
    return api.admin.technologies
      .list()
      .then(setTechnologies)
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

  const openEdit = (tech) => {
    setEditing(tech._id);
    setForm({
      title: tech.title || '',
      description: tech.description || '',
      category: tech.category || '',
      image: tech.image || '',
      isActive: tech.isActive !== false,
    });
  };

  const save = async () => {
    const payload = {
      title: form.title?.trim(),
      description: form.description?.trim(),
      category: form.category,
      image: form.image,
      isActive: form.isActive,
    };
    try {
      if (editing === 'new') {
        await api.admin.technologies.create(payload);
        toast.success('Technology created');
      } else {
        await api.admin.technologies.update(editing, payload);
        toast.success('Technology updated');
      }
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to save technology');
    }
  };

  const remove = async (id) => {
    try {
      await api.admin.technologies.delete(id);
      toast.success('Technology deleted');
      load();
      setEditing(null);
    } catch (e) {
      toast.error(e.message || 'Failed to delete technology');
    }
  };

  return (
    <div className="mx-auto max-w-[1280px]">
      <TechnologiesHeader onAdd={openCreate} />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <TechnologiesTable
          technologies={technologies}
          onOpenEdit={openEdit}
          onRemove={remove}
          loading={loading}
        />
      </div>

      {editing && (
        <TechnologiesModal
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
