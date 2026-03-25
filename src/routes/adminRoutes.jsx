import { Route } from 'react-router-dom';
import { AdminLayout } from '../components/layout';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import AdminHome from '../pages/admin/home/AdminHome';
import AdminLicenses from '../pages/admin/licenses/AdminLicenses';
import AdminCategories from '../pages/admin/categories/AdminCategories';
import AdminProducts from '../pages/admin/products/AdminProducts';
import AdminProjects from '../pages/admin/projects/AdminProjects';
import AdminTechnologies from '../pages/admin/technologies/AdminTechnologies';
import AdminServices from '../pages/admin/services/AdminServices';
import AdminCloud from '../pages/admin/cloud/AdminCloud';
import AdminEnquiries from '../pages/admin/enquiries/AdminEnquiries';
import AdminBlogs from '../pages/admin/blogs/AdminBlogs';
import PrivateRoute from './PrivateRoute';

export function getAdminRoutes() {
  return (
    <Route path="/admin" element={<PrivateRoute adminOnly><AdminLayout /></PrivateRoute>}>
      <Route index element={<AdminDashboard />} />
      <Route path="home" element={<AdminHome />} />
      <Route path="licenses" element={<AdminLicenses />} />
      <Route path="categories" element={<AdminCategories />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="projects" element={<AdminProjects />} />
      <Route path="technologies" element={<AdminTechnologies />} />
      <Route path="services" element={<AdminServices />} />
      <Route path="cloud" element={<AdminCloud />} />
      <Route path="enquiries" element={<AdminEnquiries />} />
      <Route path="blogs" element={<AdminBlogs />} />
    </Route>
  );
}
