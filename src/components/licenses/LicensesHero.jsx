import { Button } from '../common';

export default function LicensesHero({ type, onTypeChange }) {
  return (
    <section className="py-20 md:py-24 bg-gray-50/80 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-5 text-center">
        <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-secondary dark:text-accent mb-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
          Pricing
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3 animate-fadeInUp" style={{ animationDelay: '0.18s' }}>
          Tally License Pricing
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto mb-8 animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
          Choose Single User or Multi User plans. Buy Now redirects to enquiry form.
        </p>
        <div
          className="inline-flex bg-white dark:bg-gray-800 rounded-xl p-1.5 gap-5 border border-gray-200 dark:border-gray-600 shadow-sm animate-fadeInUp"
          style={{ animationDelay: '0.32s' }}
        >
          <Button
            type="button"
            variant={type === 'single' ? 'primary' : 'ghost'}
            fullWidth={false}
            onClick={() => onTypeChange('single')}
            className="min-w-[120px] px-6 py-3 rounded-lg text-sm shadow-md"
          >
            Single User
          </Button>
          <Button
            type="button"
            variant={type === 'multi' ? 'primary' : 'ghost'}
            fullWidth={false}
            onClick={() => onTypeChange('multi')}
            className="min-w-[120px] px-6 py-3 rounded-lg text-sm shadow-md"
          >
            Multi User
          </Button>
        </div>
      </div>
    </section>
  );
}
