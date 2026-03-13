import { Button } from '../common';

export default function HomeLicenseHighlights({ licenses }) {
  if (!licenses?.length) return null;

  return (
    <section className="py-20 md:py-24 bg-gray-50/80 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-secondary dark:text-accent mb-4 animate-[home-fadeInUp_0.5s_ease-out_0.2s_both]">
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
          Pricing
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3 animate-[home-fadeInUp_0.5s_ease-out_0.28s_both]">
          License Pricing Highlights
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mb-10 animate-[home-fadeInUp_0.5s_ease-out_0.35s_both]">
          Choose the right Tally license for your business. Transparent pricing, no hidden fees.
        </p>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {licenses.slice(0, 3).map((plan, i) => (
            <div
              key={plan._id}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-7 shadow-sm dark:shadow-none transition-all duration-300 hover:border-primary/30 dark:hover:border-secondary/40 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-none hover:-translate-y-1 animate-[home-fadeInUp_0.6s_ease-out_both]"
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                {plan.planName}
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-primary dark:text-secondary mb-3">
                ₹{plan.price?.toLocaleString()}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">/ license</span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 min-h-10 line-clamp-2">
                {plan.description}
              </p>
              <Button to="/licenses" variant="primary" fullWidth>
                View Plan
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center animate-[home-fadeInUp_0.5s_ease-out_0.6s_both]">
          <Button to="/licenses" variant="outline" fullWidth={false} className="inline-flex items-center justify-center gap-2">
            <span className="icon-[mdi--format-list-bulleted] text-[20px] shrink-0" aria-hidden />
            All Tally Plans
          </Button>
        </div>
      </div>
    </section>
  );
}
