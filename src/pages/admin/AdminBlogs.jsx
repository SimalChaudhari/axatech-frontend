import { useEffect, useState } from 'react';
import api from '../../api';
import { Button } from '../../components/common';
import './AdminBlogs.css';

export default function AdminBlogs() {
  const [data, setData] = useState({ blogs: [], total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', author: '', published: false, metaTitle: '', metaDescription: '' });
  const [imageFile, setImageFile] = useState(null);

  const load = () => api.admin.blogs.list({ limit: 50 }).then(setData).catch(console.error);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditing('new');
    setForm({ title: '', slug: '', excerpt: '', content: '', author: '', published: false, metaTitle: '', metaDescription: '' });
    setImageFile(null);
  };

  const openEdit = (b) => {
    setEditing(b._id);
    setForm({
      title: b.title,
      slug: b.slug || '',
      excerpt: b.excerpt || '',
      content: b.content || '',
      author: b.author || '',
      published: !!b.published,
      metaTitle: b.metaTitle || '',
      metaDescription: b.metaDescription || '',
      image: b.image ? b.image.split('/').pop() : '',
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
      title: form.title,
      slug: form.slug || undefined,
      excerpt: form.excerpt || undefined,
      content: form.content,
      author: form.author || undefined,
      published: form.published,
      metaTitle: form.metaTitle || undefined,
      metaDescription: form.metaDescription || undefined,
    };
    if (imageFilename) payload.image = imageFilename;
    try {
      if (editing === 'new') await api.admin.blogs.create(payload);
      else await api.admin.blogs.update(editing, payload);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      await api.admin.blogs.delete(id);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const BlogForm = ({ isInline }) => (
    <div className="admin-form admin-blog-form">
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label>Title</label>
          <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
        </div>
        <div className="admin-form-group">
          <label>Slug</label>
          <input className="input" placeholder="Slug" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
        </div>
      </div>
      <div className="admin-form-group">
        <label>Excerpt</label>
        <input className="input" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} />
      </div>
      <div className="admin-form-group">
        <label>Content</label>
        <textarea className="textarea" placeholder="Content" value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={6} />
      </div>
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label>Author</label>
          <input className="input" placeholder="Author" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} />
        </div>
        <div className="admin-form-group admin-form-group--row">
          <label className="admin-checkbox">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
            <span>Published</span>
          </label>
        </div>
      </div>
      <div className="admin-form-group">
        <label>Meta title</label>
        <input className="input" placeholder="Meta title" value={form.metaTitle} onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))} />
      </div>
      <div className="admin-form-group">
        <label>Meta description</label>
        <textarea className="textarea" placeholder="Meta description" value={form.metaDescription} onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))} rows={2} />
      </div>
      <div className="admin-form-group">
        <label>Featured image</label>
        <input type="file" accept="image/*" className="admin-file-input" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
      </div>
      <div className="admin-form-actions">
        <Button type="button" variant="primary" fullWidth={false} onClick={save}>{editing === 'new' ? 'Create' : 'Save'}</Button>
        <Button type="button" variant="outline" fullWidth={false} onClick={() => setEditing(null)}>Cancel</Button>
        {!isInline && editing !== 'new' && (
          <Button type="button" variant="danger" fullWidth={false} onClick={() => remove(editing)}>Delete</Button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <p>Loading blogs…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page admin-blogs">
      <header className="admin-page-header">
        <h1>Blogs</h1>
        <div className="admin-actions">
          <Button type="button" variant="primary" fullWidth={false} onClick={openCreate}>Add Post</Button>
        </div>
      </header>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Published</th>
                <th>Date</th>
                <th className="td-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(data.blogs || []).map((b) => (
                <tr key={b._id}>
                  {editing === b._id ? (
                    <td colSpan={4}>
                      <div className="admin-form-inline-wrap">
                        <BlogForm isInline />
                      </div>
                    </td>
                  ) : (
                    <>
                      <td>{b.title}</td>
                      <td><span className={b.published ? 'admin-badge admin-badge--active' : 'admin-badge admin-badge--inactive'}>{b.published ? 'Yes' : 'No'}</span></td>
                      <td>{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : '—'}</td>
                      <td className="td-actions">
                        <Button type="button" variant="outline" fullWidth={false} onClick={() => openEdit(b)}>Edit</Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(!data.blogs || data.blogs.length === 0) && (
          <div className="admin-empty">No blog posts yet. Add one to get started.</div>
        )}
      </div>

      {editing === 'new' && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal admin-modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">Add Blog Post</div>
            <div className="admin-modal-body">
              <BlogForm isInline={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
