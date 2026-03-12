import { Button } from '../common';

export default function HomeCloudOverview({ content }) {
  return (
    <section className="py-20 md:py-24 bg-gray-50/80 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-3xl mx-auto text-center px-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-secondary dark:text-accent mb-4 animate-[home-fadeInUp_0.55s_ease-out_0.15s_both]">
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
          Hosting
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-5 animate-[home-fadeInUp_0.55s_ease-out_0.22s_both]">
          {content.cloudOverviewTitle || 'Cloud Hosting'}
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed animate-[home-fadeInUp_0.55s_ease-out_0.3s_both]">
          {content.cloudOverviewText}
        </p>
        <div className="animate-[home-fadeInUp_0.55s_ease-out_0.4s_both]">
          <Button to="/cloud-hosting" variant="primary" fullWidth={false} className="inline-flex items-center justify-center gap-2">
            <span className="icon-[mdi--cloud-outline] text-[20px] shrink-0" aria-hidden />
            View Cloud Plans
          </Button>
        </div>
      </div>
    </section>
  );
}
