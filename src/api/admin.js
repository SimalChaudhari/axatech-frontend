import { request } from './core';
import adminHomeApi from './home/admin';
import adminLicensesApi from './licenses/admin';
import adminCategoriesApi from './categories/admin';
import adminProductsApi from './products/admin';
import adminServicesApi from './service/admin';
import adminCloudApi from './cloud/admin';
import adminEnquiryApi from './enquiry/admin';
import adminBlogsApi from './blogs/admin';
import adminProjectsApi from './projects/admin';
import adminTechnologiesApi from './technologies/admin';
// Note: other admin modules (upload, etc.) can be added similarly later.

export function createAdminApi() {
  return {
    home: adminHomeApi,
    licenses: adminLicensesApi,
    categories: adminCategoriesApi,
    products: adminProductsApi,
    services: adminServicesApi,
    cloud: adminCloudApi,
    enquiries: adminEnquiryApi,
    blogs: adminBlogsApi,
    projects: adminProjectsApi,
    technologies: adminTechnologiesApi,
  };
}

