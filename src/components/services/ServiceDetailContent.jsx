import { Button } from '../common';

export default function ServiceDetailContent({ service }) {
  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-3xl mx-auto px-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-secondary dark:text-accent mb-4 animate-[home-fadeInUp_0.5s_ease-out_0.2s_both]">
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
          Service
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4 animate-[home-fadeInUp_0.5s_ease-out_0.28s_both]">
          {service.title}
        </h1>
        {service.shortDescription && (
          <p className="text-text-muted dark:text-gray-400 text-lg leading-relaxed mb-6 animate-[home-fadeInUp_0.5s_ease-out_0.35s_both]">
            {service.shortDescription}
          </p>
        )}
        {service.description && (
          <div
            className="mb-8 leading-relaxed text-text-muted dark:text-gray-400 [&_a]:text-primary dark:[&_a]:text-secondary [&_a]:underline [&_p]:mb-4 last:[&_p]:mb-0 animate-[home-fadeInUp_0.5s_ease-out_0.4s_both]"
            dangerouslySetInnerHTML={{
              __html: service.description.replace(/\n/g, '<br/>'),
            }}
          />
        )}
        <div className="animate-[home-fadeInUp_0.5s_ease-out_0.45s_both]">
          <Button
            to="/contact"
            state={{ enquiryType: 'service', service: service._id, serviceName: service.title }}
            variant="primary"
            fullWidth={false}
            className="inline-flex items-center justify-center gap-2"
          >
            <span className="icon-[mdi--email-edit-outline] text-xl shrink-0" aria-hidden />
            Enquire now
          </Button>
        </div>
      </div>
    </section>
  );
}
