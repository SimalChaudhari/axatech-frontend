const API_BASE = '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.statusText);
  return data;
}

function formRequest(path, method, formData) {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(`${API_BASE}${path}`, { method, headers, body: formData }).then((res) => res.json().then((data) => { if (!res.ok) throw new Error(data.message || res.statusText); return data; }).catch(() => { if (!res.ok) throw new Error(res.statusText); return {}; }));
}

export const api = {
  auth: {
    login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    me: () => request('/auth/me'),
    updateProfile: (body) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(body) }),
    forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
    resetPassword: (token, newPassword) => request('/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword }) }),
  },
  home: () => request('/home'),
  licenses: (type) => request(`/licenses${type ? `?type=${type}` : ''}`),
  categories: () => request('/categories'),
  products: (params) => {
    const clean = params && Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
    ) || {};
    const q = new URLSearchParams(clean).toString();
    return request(`/products${q ? `?${q}` : ''}`);
  },
  product: (slug) => request(`/products/${slug}`),
  services: () => request('/services'),
  service: (slug) => request(`/services/${slug}`),
  cloud: (type) => request(`/cloud${type ? `?type=${type}` : ''}`),
  enquiry: (body) => request('/enquiries', { method: 'POST', body: JSON.stringify(body) }),
  upload: (file) => {
    const fd = new FormData();
    fd.append('file', file);
    return formRequest('/upload', 'POST', fd).then((r) => r.filename || r.url);
  },
  blogs: (params) => {
    const clean = params && Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
    ) || {};
    const q = new URLSearchParams(clean).toString();
    return request(`/blogs${q ? `?${q}` : ''}`);
  },
  blog: (slug) => request(`/blogs/${slug}`),

  // Admin APIs (require auth)
  admin: {
    home: {
      get: () => request('/home'),
      update: (body) => request('/home', { method: 'PUT', body: JSON.stringify(body) }),
    },
    licenses: {
      list: () => request('/licenses?all=1'),
      create: (body) => request('/licenses', { method: 'POST', body: JSON.stringify(body) }),
      update: (id, body) => request(`/licenses/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
      delete: (id) => request(`/licenses/${id}`, { method: 'DELETE' }),
    },
    categories: {
      list: () => request('/categories?all=1'),
      create: (body) => request('/categories', { method: 'POST', body: JSON.stringify(body) }),
      update: (id, body) => request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
      delete: (id) => request(`/categories/${id}`, { method: 'DELETE' }),
    },
    products: {
      list: (params) => request(`/products?all=1${params ? `&${new URLSearchParams(params)}` : ''}`),
      create: (body) => request('/products', { method: 'POST', body: JSON.stringify(body) }),
      update: (id, body) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
      delete: (id) => request(`/products/${id}`, { method: 'DELETE' }),
    },
    services: {
      list: () => request('/services?all=1'),
      create: (body) => request('/services', { method: 'POST', body: JSON.stringify(body) }),
      update: (id, body) => request(`/services/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
      delete: (id) => request(`/services/${id}`, { method: 'DELETE' }),
    },
    cloud: {
      list: () => request('/cloud?all=1'),
      create: (body) => request('/cloud', { method: 'POST', body: JSON.stringify(body) }),
      update: (id, body) => request(`/cloud/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
      delete: (id) => request(`/cloud/${id}`, { method: 'DELETE' }),
    },
    enquiries: {
      list: (params) => request(`/enquiries${params ? `?${new URLSearchParams(params)}` : ''}`),
      get: (id) => request(`/enquiries/${id}`),
      updateStatus: (id, body) => request(`/enquiries/${id}/status`, { method: 'PUT', body: JSON.stringify(body) }),
    },
    blogs: {
      list: (params) => request(`/blogs?all=1${params ? `&${new URLSearchParams(params)}` : ''}`),
      get: (slug) => request(`/blogs/${slug}`),
      create: (body) => request('/blogs', { method: 'POST', body: JSON.stringify(body) }),
      update: (id, body) => request(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
      delete: (id) => request(`/blogs/${id}`, { method: 'DELETE' }),
    },
  },
};

export default api;
