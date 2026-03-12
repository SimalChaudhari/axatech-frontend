import { Link } from 'react-router-dom';

export default function DashboardWelcome() {
  return (
    <section className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800/80">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary">
            <span className="icon-[mdi--view-dashboard-outline] text-3xl" aria-hidden />
          </div>
          <div>
            <h2 className="m-0 text-lg font-semibold text-slate-800 dark:text-white">
              Welcome to Admin
            </h2>
            <p className="m-0 mt-1 text-sm text-slate-500 dark:text-gray-400">
              Manage your content, enquiries, products and more from here.
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 no-underline transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:border-secondary dark:hover:bg-secondary/20 dark:hover:text-secondary"
        >
          <span className="icon-[mdi--open-in-new] text-lg dark:text-secondary" aria-hidden />
          View site
        </Link>
      </div>
    </section>
  );
}
