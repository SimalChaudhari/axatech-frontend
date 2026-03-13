export default function CategoriesLoading() {
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="py-12 px-4 text-center text-base text-slate-500 dark:text-gray-400">
        <div
          className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-primary dark:border-gray-600 dark:border-t-secondary"
          aria-hidden
        />
        <p>Loading categories…</p>
      </div>
    </div>
  );
}
