import { Button, PageMeta, SectionHeader } from '../../components/common';
import { CheckCircleOutlineIcon, CogLoopIcon, RocketIcon } from '../../components/icons';

const POINTS = [
  'Manufacturing: BOM, job work, production tracking',
  'Real estate: project-wise accounting, installment tracking',
  'Retail: POS integration, loyalty points, barcode',
  'Education, healthcare, hospitality and more',
];

const INDUSTRY_HIGHLIGHTS = [
  {
    title: 'Industry-Aligned Workflows',
    description: 'Create process-specific logic that aligns Tally with how your business actually operates.',
    icon: CogLoopIcon,
  },
  {
    title: 'Practical Operational Control',
    description: 'Capture the right data, enforce the right checks, and improve daily execution quality.',
    icon: CheckCircleOutlineIcon,
  },
  {
    title: 'Scalable Custom Foundation',
    description: 'Start with your current needs and extend smoothly as your teams, branches, and operations grow.',
    icon: RocketIcon,
  },
];

export default function TdlBusinessSpecific() {
  return (
    <>
      <PageMeta
        title="Business-Specific TDL | Axatech"
        description="Industry-specific TDL solutions built for your unique business workflow in Tally."
      />
      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="5.5 Business-Specific TDL"
            title="Customizations for Your Industry"
            subtitle="Purpose-built TDL enhancements designed around industry workflows."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Tailored for businesses that need domain-focused customization, stronger process discipline, and better reporting reliability.
            </p>
          </div>

          <div data-aos="fade-up" className="grid gap-4 md:grid-cols-3">
            {INDUSTRY_HIGHLIGHTS.map((highlight) => {
              const HighlightIcon = highlight.icon;
              return (
                <article
                  key={highlight.title}
                  className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary">
                    <HighlightIcon className="text-xl" />
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">{highlight.title}</h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{highlight.description}</p>
                </article>
              );
            })}
          </div>

          <div data-aos="fade-up" className="mt-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {POINTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Button
              to="/contact"
              fullWidth={false}
              state={{ enquiryType: 'tdl', tdlType: 'business-specific' }}
              className="px-6"
            >
              Request Business-Specific TDL
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
