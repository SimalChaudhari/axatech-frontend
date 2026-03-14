import { useEffect, useState } from 'react';
import api from '../../../api';
import {
  ProductsHeader,
  ProductsTable,
  ProductsModal,
  ProductsLoading,
  ProductsEmpty,
} from '../../../components/admin/products';

const initialForm = {
  name: '',
  slug: '',
  description: '',
  shortDescription: '',
  category: '',
  demoVideoLink: '',
  featured: false,
  isActive: true,
};

export default function AdminProducts() {
  const [data, setData] = useState({ products: [], total: 0 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);

  const load = () =>
    api.admin.products.list({ limit: 100 }).then((r) => setData({ products: r.products || [], total: r.total || 0 }));

  useEffect(() => {
    load();
    api.admin.categories.list().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (data.products.length && loading) setLoading(false);
  }, [data.products.length, loading]);

  const openCreate = () => {
    setEditing('new');
    setForm(initialForm);
    setImageFile(null);
  };

  const openEdit = (p) => {
    setEditing(p._id);
    setForm({
      name: p.name,
      slug: p.slug || '',
      description: p.description || '',
      shortDescription: p.shortDescription || '',
      category: p.category?._id || p.category || '',
      demoVideoLink: p.demoVideoLink || '',
      featured: !!p.featured,
      isActive: p.isActive !== false,
      image: p.image ? p.image.split('/').pop() : '',
    });
    setImageFile(null);
  };

  const save = async () => {
    let imageFilename = form.image;
    if (imageFile) {
      try {
        imageFilename = await api.upload(imageFile);
      } catch (e) {
        alert('Image upload failed: ' + e.message);
        return;
      }
    }
    const payload = {
      name: form.name,
      slug: form.slug || undefined,
      description: form.description || undefined,
      shortDescription: form.shortDescription || undefined,
      category: form.category || undefined,
      demoVideoLink: form.demoVideoLink || undefined,
      featured: form.featured,
      isActive: form.isActive,
    };
    if (imageFilename) payload.image = imageFilename;
    try {
      if (editing === 'new') await api.admin.products.create(payload);
      else await api.admin.products.update(editing, payload);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (id) => {
    try {
      await api.admin.products.delete(id);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading && !data.products.length) {
    return <ProductsLoading />;
  }

  const modalOpen = editing === 'new' || (editing && editing !== 'new');
  const modalTitle = editing === 'new' ? 'Add Product' : 'Edit Product';
  const modalMode = editing === 'new' ? 'create' : 'edit';

  return (
    <div className="mx-auto max-w-[1280px]">
      <ProductsHeader onAddProduct={openCreate} />

      <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {data.products.length > 0 ? (
          <ProductsTable
            products={data.products}
            onOpenEdit={openEdit}
            onRemove={remove}
          />
        ) : (
          <ProductsEmpty />
        )}
      </div>

      {modalOpen && (
        <ProductsModal
          open
          mode={modalMode}
          title={modalTitle}
          form={form}
          setForm={setForm}
          imageFile={imageFile}
          setImageFile={setImageFile}
          categories={categories}
          onSave={save}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
