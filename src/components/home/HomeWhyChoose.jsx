export default function HomeWhyChoose({ whyChooseItems, whyChooseTitle }) {
  if (!whyChooseItems?.length) return null;

  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-5">
        <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-secondary dark:text-accent mb-4 animate-[home-fadeInUp_0.5s_ease-out_0.2s_both]">
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
          Why Us
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3 text-center animate-[home-fadeInUp_0.5s_ease-out_0.28s_both]">
          {whyChooseTitle || 'Why Choose Axatech'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto mb-10 text-center animate-[home-fadeInUp_0.5s_ease-out_0.35s_both]">
          Trusted by businesses across India for Tally licenses, add-ons, and cloud solutions.
        </p>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseItems.map((item, i) => (
            <div
              key={i}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-7 shadow-sm dark:shadow-none transition-all duration-300 hover:border-primary/30 dark:hover:border-secondary/40 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-none hover:-translate-y-1 animate-[home-fadeInUp_0.6s_ease-out_both]"
              style={{ animationDelay: `${0.4 + i * 0.1}s` }}
            >
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary text-xl font-bold mb-4 transition-all duration-200 group-hover:bg-primary/15 dark:group-hover:bg-secondary/30 group-hover:scale-105"
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed m-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
