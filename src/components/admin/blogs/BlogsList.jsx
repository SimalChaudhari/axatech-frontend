import { useEffect, useState } from 'react';
import api from '../../../api';
import { toast } from '../../../utils/toast';
import { BlogsHeader, BlogsTable, BlogsModal } from './index';

const initialForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: '',
  published: false,
  metaTitle: '',
  metaDescription: '',
  image: '',
};

export default function BlogsList() {
  const [data, setData] = useState({ blogs: [], total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);

  const load = () => {
    setLoading(true);
    return api.admin.blogs
      .list({ limit: 50 })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing('new');
    setForm(initialForm);
    setImageFile(null);
  };

  const openEdit = (blog) => {
    setEditing(blog._id);
    setForm({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      author: blog.author || '',
      published: !!blog.published,
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      image: blog.image ? blog.image.split('/').pop() : '',
    });
    setImageFile(null);
  };

  const save = async () => {
    let imageFilename = form.image;
    if (imageFile) {
      try {
        imageFilename = await api.upload(imageFile);
      } catch (e) {
        toast.error(`Image upload failed: ${e.message}`);
        return;
      }
    }

    const payload = {
      title: form.title?.trim(),
      slug: form.slug?.trim() || undefined,
      excerpt: form.excerpt?.trim() || undefined,
      content: form.content?.trim(),
      author: form.author?.trim() || undefined,
      published: !!form.published,
      metaTitle: form.metaTitle?.trim() || undefined,
      metaDescription: form.metaDescription?.trim() || undefined,
    };
    if (imageFilename) payload.image = imageFilename;

    try {
      if (editing === 'new') {
        await api.admin.blogs.create(payload);
        toast.success('Blog post created');
      } else {
        await api.admin.blogs.update(editing, payload);
        toast.success('Blog post updated');
      }
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to save blog post');
    }
  };

  const remove = async (id) => {
    try {
      await api.admin.blogs.delete(id);
      toast.success('Blog post deleted');
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to delete blog post');
    }
  };

  return (
    <div className="mx-auto max-w-[1280px]">
      <BlogsHeader onAdd={openCreate} />

      <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <BlogsTable
          blogs={data.blogs || []}
          onOpenEdit={openEdit}
          onRemove={remove}
          loading={loading}
        />
      </div>

      {editing && (
        <BlogsModal
          mode={editing === 'new' ? 'create' : 'edit'}
          form={form}
          setForm={setForm}
          onSave={save}
          onClose={() => setEditing(null)}
          imageFile={imageFile}
          setImageFile={setImageFile}
        />
      )}
    </div>
  );
}
