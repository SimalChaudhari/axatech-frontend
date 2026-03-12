import { Route } from 'react-router-dom';
import { Layout } from '../components/layout';
import Home from '../pages/home/Home';
import Licenses from '../pages/licenses/Licenses';
import Products from '../pages/products/Products';
import ProductDetail from '../pages/products/ProductDetail';
import Services from '../pages/services/Services';
import ServiceDetail from '../pages/services/ServiceDetail';
import CloudHosting from '../pages/cloudHosting/CloudHosting';
import Contact from '../pages/contact/Contact';
import Blog from '../pages/blog/Blog';
import BlogPost from '../pages/blog/BlogPost';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';

export function getUserRoutes() {
  return (
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="licenses" element={<Licenses />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:slug" element={<ProductDetail />} />
      <Route path="services" element={<Services />} />
      <Route path="services/:slug" element={<ServiceDetail />} />
      <Route path="cloud-hosting" element={<CloudHosting />} />
      <Route path="contact" element={<Contact />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog/:slug" element={<BlogPost />} />
      <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Route>
  );
}
