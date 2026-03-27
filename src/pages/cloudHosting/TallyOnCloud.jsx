import { Button, PageMeta, SectionHeader } from '../../components/common';
import { CheckCircleOutlineIcon, CogLoopIcon, RocketIcon } from '../../components/icons';

const BENEFITS = [
  'Access Tally from any Windows, Mac, or mobile device',
  'No data loss with automatic cloud backups',
  'Fast, low-latency remote desktop experience',
  'Managed and monitored by Axatech',
];

const CLOUD_HIGHLIGHTS = [
  {
    title: 'Secure Anywhere Access',
    description: 'Work on Tally from office, home, or travel locations with controlled and reliable access.',
    icon: CheckCircleOutlineIcon,
  },
  {
    title: 'Business Continuity Built-In',
    description: 'Keep operations running smoothly with managed backups, monitoring, and cloud uptime support.',
    icon: CogLoopIcon,
  },
  {
    title: 'Performance for Daily Teams',
    description: 'Get responsive cloud usage designed for accounting teams, branches, and multi-location workflows.',
    icon: RocketIcon,
  },
];

export default function TallyOnCloud() {
  return (
    <>
      <PageMeta
        title="Tally on Cloud | Axatech"
        description="Run your existing Tally license securely on cloud and access it from anywhere."
      />

      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="3.1 Tally on Cloud"
            title="Access Tally Anytime, Anywhere - Securely"
            subtitle="Run your existing Tally license on a managed cloud environment with uninterrupted access from any location."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Best suited for organizations that need secure remote access, reliable uptime, and smooth multi-branch Tally operations.
            </p>
          </div>

          <div data-aos="fade-up" className="grid gap-4 md:grid-cols-3">
            {CLOUD_HIGHLIGHTS.map((highlight) => {
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
            <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">What You Get</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {BENEFITS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Ideal for:</span> Businesses with remote teams or multiple branches.
            </p>
          </div>

          <div className="mt-8">
            <Button
              to="/contact"
              fullWidth={false}
              state={{ enquiryType: 'cloud', cloudMode: 'tally-on-cloud' }}
              className="px-6"
            >
              Start Tally on Cloud
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
