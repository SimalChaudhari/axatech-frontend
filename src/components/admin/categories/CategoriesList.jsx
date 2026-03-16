import { useEffect, useState } from 'react';
import api from '../../../api';
import { toast } from '../../../utils/toast';
import {
  CategoriesHeader,
  CategoriesTable,
  CategoriesModal,
} from '../../../components/admin/categories';

const initialForm = {
  name: '',
  slug: '',
  description: '',
  isActive: true,
};

export default function CategoriesList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | categoryId
  const [form, setForm] = useState(initialForm);

  const load = () => {
    setLoading(true);
    return api.admin.categories
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

  const openEdit = (cat) => {
    setEditing(cat._id);
    setForm({
      name: cat.name,
      slug: cat.slug || '',
      description: cat.description || '',
      isActive: cat.isActive !== false,
    });
  };

  const save = async () => {
    const payload = { ...form };
    if (!payload.slug)
      payload.slug = payload.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    try {
      if (editing === 'new') {
        await api.admin.categories.create(payload);
        toast.success('Category created');
      } else {
        await api.admin.categories.update(editing, payload);
        toast.success('Category updated');
      }
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to save category');
    }
  };

  const remove = async (id) => {
    try {
      await api.admin.categories.delete(id);
      toast.success('Category deleted');
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to delete category');
    }
  };

  return (
    <div className="mx-auto max-w-[1280px]">
      <CategoriesHeader onAddCategory={openCreate} />

      <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <CategoriesTable
          categories={list}
          onOpenEdit={openEdit}
          onRemove={remove}
          loading={loading}
        />
      </div>

      {editing && (
        <CategoriesModal
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

