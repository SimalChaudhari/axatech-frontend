import { useEffect, useState } from 'react';
import api from '../../../api';
import { toast } from '../../../utils/toast';
import {
  ProductsHeader,
  ProductsTable,
  ProductsModal,
} from '../../../components/admin/products';

const initialForm = {
  name: '',
  slug: '',
  description: '',
  shortDescription: '',
  category: '',
  demoVideoLink: '',
  images: [],
  featured: false,
  isActive: true,
};

export default function ProductsList() {
  const [data, setData] = useState({ products: [], total: 0 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  const load = () => {
    setLoading(true);
    return api.admin.products
      .list({ limit: 100 })
      .then((r) => setData({ products: r.products || [], total: r.total || 0 }))
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
    api.admin.categories.list().then(setCategories).catch(console.error);
  }, []);

  const openCreate = () => {
    setEditing('new');
    setForm(initialForm);
    setImageFiles([]);
    setVideoFile(null);
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
      images: Array.isArray(p.images) ? p.images : [],
      featured: !!p.featured,
      isActive: p.isActive !== false,
    });
    setImageFiles([]);
    setVideoFile(null);
  };

  const save = async () => {
    const existingFilenames = (form.images || [])
      .map((url) =>
        typeof url === 'string' && url.includes('/uploads/') ? url.replace(/^.*\/uploads\//, '') : url
      )
      .filter(Boolean);
    let newFilenames = [];
    if (imageFiles.length > 0) {
      try {
        newFilenames = await Promise.all(imageFiles.map((f) => api.upload(f)));
      } catch (e) {
        toast.error('Image upload failed: ' + e.message);
        return;
      }
    }
    const allImages = [...existingFilenames, ...newFilenames];

    let demoVideoPath = form.demoVideoLink;
    if (videoFile) {
      try {
        demoVideoPath = await api.upload(videoFile);
      } catch (e) {
        toast.error('Video upload failed: ' + e.message);
        return;
      }
    }
    const payload = {
      name: form.name,
      slug: form.slug || undefined,
      description: form.description || undefined,
      shortDescription: form.shortDescription || undefined,
      category: form.category || undefined,
      demoVideoLink: demoVideoPath || undefined,
      featured: form.featured,
      isActive: form.isActive,
    };
    if (allImages.length > 0) payload.images = allImages;
    try {
      if (editing === 'new') {
        await api.admin.products.create(payload);
        toast.success('Product created');
      } else {
        await api.admin.products.update(editing, payload);
        toast.success('Product updated');
      }
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to save product');
    }
  };

  const remove = async (idOrIds) => {
    try {
      const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
      if (ids.length === 0) return;
      if (ids.length === 1) {
        await api.admin.products.delete(ids[0]);
        toast.success('Product deleted');
      } else {
        await api.admin.products.deleteBulk(ids);
        toast.success(`${ids.length} products deleted`);
      }
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to delete product(s)');
    }
  };

  const modalOpen = editing === 'new' || (editing && editing !== 'new');
  const modalTitle = editing === 'new' ? 'Add Product' : 'Edit Product';
  const modalMode = editing === 'new' ? 'create' : 'edit';

  return (
    <div className="mx-auto max-w-[1280px]">
      <ProductsHeader onAddProduct={openCreate} />

      <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <ProductsTable
          products={data.products}
          onOpenEdit={openEdit}
          onRemove={remove}
          loading={loading}
        />
      </div>

      {modalOpen && (
        <ProductsModal
          open
          mode={modalMode}
          title={modalTitle}
          form={form}
          setForm={setForm}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          videoFile={videoFile}
          setVideoFile={setVideoFile}
          categories={categories}
          onSave={save}
          onClose={() => setEditing(null)}
          existingImageUrls={editing && editing !== 'new' ? (form.images || []) : []}
        />
      )}
    </div>
  );
}

