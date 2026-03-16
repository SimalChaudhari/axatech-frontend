import { useEffect, useState } from 'react';
import api from '../../../api';
import { toast } from '../../../utils/toast';
import {
  ProjectsHeader,
  ProjectsTable,
  ProjectsModal,
} from '../../../components/admin/projects';

const initialForm = {
  title: '',
  description: '',
  keyFeatures: [],
  category: '',
  image: '',
  webLink: '',
  isActive: true,
  sortOrder: 0,
};

function getImageUrl(imageValue) {
  if (!imageValue || typeof imageValue !== 'string') return null;
  if (imageValue.startsWith('http') || imageValue.startsWith('//')) return imageValue;
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';
  return base ? `${base}/uploads/${imageValue.replace(/^\/+/, '')}` : `/uploads/${imageValue.replace(/^\/+/, '')}`;
}

export default function ProjectList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);

  const load = () => {
    setLoading(true);
    return api.admin.projects
      .list()
      .then(setList)
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing('new');
    setForm(initialForm);
    setImageFile(null);
  };

  const openEdit = (p) => {
    setEditing(p._id);
    setForm({
      title: p.title || '',
      description: p.description || '',
      keyFeatures: Array.isArray(p.keyFeatures) ? [...p.keyFeatures] : [],
      category: p.category || '',
      image: p.image || '',
      webLink: p.webLink || '',
      isActive: p.isActive !== false,
      sortOrder: p.sortOrder ?? 0,
    });
    setImageFile(null);
  };

  const save = async () => {
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      keyFeatures: form.keyFeatures || [],
      category: form.category.trim(),
      webLink: form.webLink.trim(),
      isActive: form.isActive,
      sortOrder: Number(form.sortOrder) || 0,
    };
    let imagePath = form.image;
    if (imageFile) {
      try {
        imagePath = await api.uploadProjectImage(imageFile);
      } catch (e) {
        toast.error('Image upload failed: ' + e.message);
        return;
      }
    }
    if (imagePath) payload.image = imagePath;

    try {
      if (editing === 'new') {
        await api.admin.projects.create(payload);
        toast.success('Project created');
      } else {
        await api.admin.projects.update(editing, payload);
        toast.success('Project updated');
      }
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to save project');
    }
  };

  const remove = async (idOrIds) => {
    const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
    if (ids.length === 0) return;
    try {
      if (ids.length === 1) {
        await api.admin.projects.delete(ids[0]);
        toast.success('Project deleted');
      } else {
        await api.admin.projects.deleteBulk(ids);
        toast.success(`${ids.length} projects deleted`);
      }
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || 'Failed to delete project(s)');
    }
  };



  const modalOpen = editing === 'new' || (editing != null && editing !== 'new');
  const isEdit = editing != null && editing !== 'new';
  const existingImageUrl = isEdit && form.image ? getImageUrl(form.image) : null;

  return (
    <div className="mx-auto max-w-[1280px]">
      <ProjectsHeader onAddProject={openCreate} />

      <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <ProjectsTable projects={list} onOpenEdit={openEdit} onRemove={remove} loading={loading} />
      </div>

      {modalOpen && (
        <ProjectsModal
          open
          mode={editing === 'new' ? 'create' : 'edit'}
          title={editing === 'new' ? 'Add Project' : 'Edit Project'}
          form={form}
          setForm={setForm}
          imageFile={imageFile}
          onFileChange={setImageFile}
          existingImageUrl={existingImageUrl}
          onSave={save}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

