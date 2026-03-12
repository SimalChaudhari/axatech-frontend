import { Route } from 'react-router-dom';
import { AdminLayout } from '../components/layout';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import AdminHome from '../pages/admin/home/AdminHome';
import AdminLicenses from '../pages/admin/licenses/AdminLicenses';
import AdminCategories from '../pages/admin/AdminCategories';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminServices from '../pages/admin/AdminServices';
import AdminCloud from '../pages/admin/AdminCloud';
import AdminEnquiries from '../pages/admin/AdminEnquiries';
import AdminBlogs from '../pages/admin/AdminBlogs';
import PrivateRoute from './PrivateRoute';

export function getAdminRoutes() {
  return (
    <Route path="/admin" element={<PrivateRoute adminOnly><AdminLayout /></PrivateRoute>}>
      <Route index element={<AdminDashboard />} />
      <Route path="home" element={<AdminHome />} />
      <Route path="licenses" element={<AdminLicenses />} />
      <Route path="categories" element={<AdminCategories />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="services" element={<AdminServices />} />
      <Route path="cloud" element={<AdminCloud />} />
      <Route path="enquiries" element={<AdminEnquiries />} />
      <Route path="blogs" element={<AdminBlogs />} />
    </Route>
  );
}
