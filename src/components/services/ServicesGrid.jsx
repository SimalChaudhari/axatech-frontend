import ServiceCard from './ServiceCard';

export default function ServicesGrid({ services, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fadeInUp">
        <div className="w-12 h-12 border-2 border-primary/30 dark:border-secondary/40 border-t-primary dark:border-t-secondary rounded-full animate-spin mb-4" aria-hidden />
        <p className="text-gray-600 dark:text-gray-400 font-medium">Loading services...</p>
      </div>
    );
  }
  if (!services?.length) {
    return (
      <div className="text-center py-16 px-5">
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto">
          No services available at the moment. Check back later.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <ServiceCard key={s._id} service={s} index={i} />
      ))}
    </div>
  );
}
