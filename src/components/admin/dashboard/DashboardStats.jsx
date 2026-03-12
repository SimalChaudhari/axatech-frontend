import { Link } from 'react-router-dom';

export default function DashboardStats({ counts }) {
  return (
    <section className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/admin/enquiries"
            className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 p-5 no-underline text-inherit transition-all duration-200 hover:border-primary hover:shadow-md hover:shadow-primary/10 dark:border-gray-600 dark:bg-gray-700/50 dark:hover:border-primary dark:hover:shadow-primary/15"
          >
            <span className="text-[1.75rem] font-bold leading-tight text-primary dark:text-secondary">
              {counts.enquiries}
            </span>
            <span className="mt-1 text-sm text-slate-500 dark:text-gray-400">
              Total Enquiries
            </span>
          </Link>
          <Link
            to="/admin/enquiries?status=New"
            className="flex flex-col rounded-lg border border-emerald-300/50 bg-emerald-500/5 p-5 no-underline text-inherit transition-all duration-200 hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-500/15 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:hover:border-emerald-400 dark:hover:shadow-emerald-500/20"
          >
            <span className="text-[1.75rem] font-bold leading-tight text-emerald-600 dark:text-emerald-400">
              {counts.newEnquiries}
            </span>
            <span className="mt-1 text-sm text-slate-500 dark:text-gray-400">
              New Enquiries
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
