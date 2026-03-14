import { useState } from 'react';
import { Modal } from '../../common';
import ProductForm from './ProductForm';

export default function ProductsModal({
  open,
  mode = 'create',
  title,
  form,
  setForm,
  imageFile,
  setImageFile,
  categories = [],
  onSave,
  onClose,
  onDelete,
}) {
  const [errors, setErrors] = useState({ name: '', slug: '' });

  const validate = () => {
    const name = (form.name ?? '').trim();
    const slug = (form.slug ?? '').trim();
    const next = {
      name: name ? '' : 'Name is required',
      slug: slug ? '' : 'Slug is required',
    };
    setErrors(next);
    return !next.name && !next.slug;
  };

  const validateField = (field, nextValue) => {
    if (field === 'name') {
      const name = (nextValue !== undefined ? nextValue : form.name ?? '').trim();
      setErrors((prev) => ({ ...prev, name: name ? '' : 'Name is required' }));
    } else if (field === 'slug') {
      const slug = (nextValue !== undefined ? nextValue : form.slug ?? '').trim();
      setErrors((prev) => ({ ...prev, slug: slug ? '' : 'Slug is required' }));
    }
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave?.();
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Modal
      open={open}
      title={title}
      titleId="products-modal-title"
      onClose={onClose}
      primaryLabel={mode === 'create' ? 'Create product' : 'Update product'}
      onPrimary={handleSave}
      showDelete={mode === 'edit' && !!onDelete}
      onDelete={onDelete}
    >
      <ProductForm
        form={form}
        setForm={setForm}
        imageFile={imageFile}
        setImageFile={setImageFile}
        categories={categories}
        errors={errors}
        onValidateField={validateField}
        onClearError={clearError}
      />
    </Modal>
  );
}
