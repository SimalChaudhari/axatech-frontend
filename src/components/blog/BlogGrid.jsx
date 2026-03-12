import BlogCard from './BlogCard';
import { Pagination } from '../common';

export default function BlogGrid({ blogs = [], loading = false, page = 1, totalPages = 1, onPageChange }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fadeInUp">
        <div className="w-12 h-12 border-2 border-primary/30 dark:border-secondary/40 border-t-primary dark:border-t-secondary rounded-full animate-spin mb-4" aria-hidden />
        <p className="text-gray-600 dark:text-gray-400 font-medium">Loading posts...</p>
      </div>
    );
  }
  if (!blogs?.length) {
    return (
      <div className="text-center py-16 px-5">
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto">
          No posts yet. Check back later for updates and insights.
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((b, i) => (
          <BlogCard key={b._id} post={b} index={i} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="mt-10"
        />
      )}
    </>
  );
}
