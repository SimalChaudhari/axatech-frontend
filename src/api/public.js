import { formRequest, toCleanParams, request } from './core';
import authApi from './auth';
import { home } from './home/public';
import { categories } from './categories/public';
import { licenses } from './licenses/public';
import { tss } from './tss/public';
import { tssContent } from './tssContent/public';
import { products, product } from './products/public';
import { services, service } from './service/public';
import { cloud } from './cloud/public';
import { enquiry } from './enquiry/public';
import { technologies, technology } from './technologies/public';
import { projects, project } from './projects/public';
import { blogs, blog } from './blogs/public';
import { upload, uploadProjectImage, uploadTechnologyImage } from './upload/public';

export function createPublicApi() {
  return {
    auth: authApi,
    home,
    categories,
    product,
    service,
    cloud,
    enquiry,
    licenses,
    tss,
    tssContent,
    products,
    services,
    technologies,
    technology,
    projects,
    project,
    blogs,
    blog,
    upload,
    uploadProjectImage,
    uploadTechnologyImage,
  };
}

