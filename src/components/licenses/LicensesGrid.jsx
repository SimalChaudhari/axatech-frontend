import LicenseCard from './LicenseCard';

export default function LicensesGrid({ plans, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fadeInUp">
        <div className="w-10 h-10 border-2 border-primary/30 dark:border-secondary/40 border-t-primary dark:border-t-secondary rounded-full animate-spin mb-4" aria-hidden />
        <p className="text-gray-600 dark:text-gray-400 font-medium">Loading plans...</p>
      </div>
    );
  }
  if (!plans?.length) {
    return (
      <div className="text-center py-16 px-5 animate-fadeInUp">
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto">
          No plans available for this type. Check back later.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
      {plans.map((plan, index) => (
        <LicenseCard key={plan._id} plan={plan} index={index} />
      ))}
    </div>
  );
}
