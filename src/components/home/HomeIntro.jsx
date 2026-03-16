export default function HomeIntro({ content }) {
  return (
    <section className="relative py-20 md:py-24 bg-gray-50/80 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-3xl mx-auto text-center px-5">
        <p
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-secondary dark:text-accent mb-4" data-aos="zoom-out-up"
        >
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
          About Us
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
        </p>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 text-gray-900 dark:text-white tracking-tight leading-tight" data-aos="zoom-out-up"
        >
          {content.introTitle}
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-[720px] mx-auto leading-relaxed" data-aos="zoom-out-up" >
          {content.introText}
        </p>
      </div>
    </section>
  );
}
