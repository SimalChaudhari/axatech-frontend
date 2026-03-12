import { Button } from '../common';

export default function HomeCta({ contactTitle }) {
  return (
    <section className="py-20 md:py-24 text-center bg-gray-50/80 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-2xl mx-auto px-5">
        <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-secondary dark:text-accent mb-4 animate-[home-fadeInUp_0.5s_ease-out_0.2s_both]">
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
          Contact
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3 animate-[home-fadeInUp_0.5s_ease-out_0.28s_both]">
          {contactTitle || 'Get in Touch'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed animate-[home-fadeInUp_0.5s_ease-out_0.35s_both]">
          Have questions? We're here to help with licenses, add-ons, and cloud hosting.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center animate-[home-fadeInUp_0.6s_ease-out_0.4s_both]">
          <Button to="/contact" variant="primary" fullWidth={false} className="w-full sm:w-auto">
            Contact Us
          </Button>
          <Button to="/licenses" variant="outline" fullWidth={false} className="w-full sm:w-auto">
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
