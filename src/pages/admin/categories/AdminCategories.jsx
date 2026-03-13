import { useEffect, useState } from 'react';
import api from '../../../api';
import {
  CategoriesHeader,
  CategoriesTable,
  CategoriesModal,
  CategoriesLoading,
  CategoriesEmpty,
} from '../../../components/admin/categories';

const initialForm = {
  name: '',
  slug: '',
  description: '',
  isActive: true,
};

export default function AdminCategories() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | categoryId
  const [form, setForm] = useState(initialForm);

  const load = () =>
    api.admin.categories.list().then(setList).catch(console.error);

  useEffect(() => {
    load().finally(() => setLoading(false));
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
      if (editing === 'new') await api.admin.categories.create(payload);
      else await api.admin.categories.update(editing, payload);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (id) => {
    try {
      await api.admin.categories.delete(id);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) {
    return <CategoriesLoading />;
  }

  return (
    <div className="mx-auto max-w-[1280px]">
      <CategoriesHeader onAddCategory={openCreate} />

      <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {list.length > 0 ? (
          <CategoriesTable
            categories={list}
            onOpenEdit={openEdit}
            onRemove={remove}
          />
        ) : (
          <CategoriesEmpty />
        )}
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
