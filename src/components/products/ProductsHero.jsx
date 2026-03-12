export default function ProductsHero() {
  return (
    <section className="py-20 md:py-24 bg-gray-50/80 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-[1200px] mx-auto px-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-secondary dark:text-accent mb-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
          Add-ons
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3 animate-fadeInUp" style={{ animationDelay: '0.18s' }}>
          Tally Add-ons
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
          Products and automation add-ons. Use Buy Now to send an enquiry.
        </p>
      </div>
    </section>
  );
}
