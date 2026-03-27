import { Button, PageMeta, SectionHeader } from '../../components/common';
import { RocketIcon, CogLoopIcon, CheckCircleOutlineIcon } from '../../components/icons';

const POINTS = [
  'Auto-fill and smart defaults for faster entry',
  'Batch voucher processing',
  'Custom shortcuts and workflow automation',
  'Reduce data entry time by up to 60%',
];

const PRODUCTIVITY_PILLARS = [
  {
    title: 'Faster Data Entry',
    description: 'Smart defaults and assisted workflows reduce repetitive effort for day-to-day accounting.',
    icon: RocketIcon,
  },
  {
    title: 'Workflow Automation',
    description: 'Automated steps and custom shortcuts ensure teams complete tasks consistently and quickly.',
    icon: CogLoopIcon,
  },
  {
    title: 'Operational Accuracy',
    description: 'Standardized processes lower manual mistakes and improve reliability of business records.',
    icon: CheckCircleOutlineIcon,
  },
];

export default function TdlProductivity() {
  return (
    <>
      <PageMeta
        title="Productivity TDL | Axatech"
        description="Speed up daily Tally operations with productivity-focused TDL customizations."
      />

      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="5.2 Productivity TDL"
            title="Speed Up Your Daily Tally Operations"
            subtitle="Automation and process acceleration to help your team complete more work in less time."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Ideal for businesses handling high daily voucher volumes and teams that need speed without sacrificing control.
            </p>
          </div>

          <div data-aos="fade-up" className="grid gap-4 md:grid-cols-3">
            {PRODUCTIVITY_PILLARS.map((pillar) => {
              const PillarIcon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary">
                    <PillarIcon className="text-xl" />
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">{pillar.title}</h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{pillar.description}</p>
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

          <div data-aos="fade-up" className="mt-8">
            <Button
              to="/contact"
              fullWidth={false}
              state={{ enquiryType: 'tdl', tdlType: 'productivity' }}
              className="px-6"
            >
              Request Productivity TDL
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
