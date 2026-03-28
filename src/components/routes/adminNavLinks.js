/**
 * Admin sidebar nav — single export `ADMIN_NAV` (paths + order + built `items` + sidebar UI).
 * Same shape as `PUBLIC_NAV` in publicNavLinks.js: edit `paths` and `order`; optional `children` for nested LevelItem rows.
 * Paths align with src/routes/adminRoutes.jsx.
 */
import {
  DashboardIcon,
  HomeContentIcon,
  LicensesIcon,
  CategoriesIcon,
  ProductsIcon,
  ProjectsIcon,
  AppsIcon,
  ServicesIcon,
  CloudPlansIcon,
  EnquiriesIcon,
  BlogsIcon,
} from '../icons';

function childrenObjectToLevelItems(children) {
  if (!children || typeof children !== 'object') return [];
  return Object.values(children).map((node) => {
    const nested =
      node.children &&
      typeof node.children === 'object' &&
      Object.keys(node.children).length > 0;
    if (nested) {
      return {
        label: node.label,
        children: childrenObjectToLevelItems(node.children),
      };
    }
    const item = { label: node.label, to: node.path };
    if (node.navEnd) item.navEnd = true;
    if (node.Icon) item.Icon = node.Icon;
    return item;
  });
}

function buildAdminNavItems(paths, order, sidebar) {
  return order
    .map((key) => {
      const node = paths[key];
      if (!node) return null;

      const childKeys =
        node.children && typeof node.children === 'object' ? Object.keys(node.children) : [];
      if (childKeys.length > 0) {
        return {
          type: 'level',
          key,
          to: node.path,
          label: node.label,
          end: node.end,
          labelIcon: node.Icon,
          levelItems: childrenObjectToLevelItems(node.children),
          desktopMinWidth: node.levelUi?.desktopMinWidth ?? 'min-w-0',
          triggerClassName: node.levelUi?.triggerClassName ?? sidebar.levelTriggerClass,
        };
      }

      return {
        type: 'link',
        key,
        to: node.path,
        label: node.label,
        end: node.end,
        Icon: node.Icon,
      };
    })
    .filter(Boolean);
}

const sidebar = {
  levelContentClass: '!left-0 !top-full !ml-0 !mt-1',
  /** Horizontal align is set in AdminSidebar from `effectiveCollapsed` (`!justify-center` vs `!justify-start`). */
  levelTriggerClass:
    '!gap-2 !rounded-lg !py-2.5 !px-1 !text-[0.925rem] !font-medium !normal-case !tracking-normal !text-gray-700 dark:!text-gray-300 hover:!bg-gray-100 dark:hover:!bg-gray-700/50 !w-full',
};

const order = [
  'dashboard',
  'home',
  'licenses',
  'categories',
  'products',
  'projects',
  'technologies',
  'services',
  'cloud',
  'enquiries',
  'blogs',
];

const paths = {
  dashboard: { path: '/admin', label: 'Dashboard', end: true, Icon: DashboardIcon },
  home: { path: '/admin/home', label: 'Home Content', Icon: HomeContentIcon },
  licenses: { path: '/admin/licenses', label: 'Tally', Icon: LicensesIcon },
  categories: { path: '/admin/categories', label: 'Categories', Icon: CategoriesIcon },
  products: { path: '/admin/products', label: 'Products', Icon: ProductsIcon },
  projects: { path: '/admin/projects', label: 'Projects', Icon: ProjectsIcon },
  technologies: { path: '/admin/technologies', label: 'Technologies', Icon: AppsIcon },
  services: { path: '/admin/services', label: 'Services', Icon: ServicesIcon },
  cloud: { path: '/admin/cloud', label: 'Cloud Plans', Icon: CloudPlansIcon },
  enquiries: { path: '/admin/enquiries', label: 'Enquiries', Icon: EnquiriesIcon },
  blogs: { path: '/admin/blogs', label: 'Blogs', Icon: BlogsIcon },
};

/**
 * All admin sidebar data: `ADMIN_NAV.items`, `ADMIN_NAV.sidebar.levelContentClass`, `ADMIN_NAV.paths` to read/edit tree.
 */
export const ADMIN_NAV = Object.freeze({
  paths: Object.freeze(paths),
  order: Object.freeze([...order]),
  sidebar: Object.freeze(sidebar),
  items: Object.freeze(buildAdminNavItems(paths, order, sidebar)),
});

/** @deprecated Use `ADMIN_NAV.items` */
export const ADMIN_NAV_LINKS = ADMIN_NAV.items;
