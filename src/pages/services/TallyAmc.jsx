import { Button, PageMeta, SectionHeader } from '../../components/common';
import { CheckCircleOutlineIcon, CogLoopIcon, RocketIcon } from '../../components/icons';

const BENEFITS = [
  'Unlimited remote support sessions',
  'Data recovery and corruption fixes',
  'Version upgrades and patch installations',
  'Year-end closing and audit support',
  'Priority response within 4 business hours',
];

const AMC_HIGHLIGHTS = [
  {
    title: 'Continuous Operational Support',
    description: 'Get dependable expert assistance to keep daily accounting operations uninterrupted.',
    icon: RocketIcon,
  },
  {
    title: 'Preventive Maintenance Approach',
    description: 'Reduce downtime risk through proactive updates, issue checks, and platform housekeeping.',
    icon: CheckCircleOutlineIcon,
  },
  {
    title: 'Faster Resolution Turnaround',
    description: 'Resolve critical Tally issues quickly with prioritized support workflows and escalation.',
    icon: CogLoopIcon,
  },
];

export default function TallyAmc() {
  return (
    <>
      <PageMeta
        title="Tally AMC | Axatech"
        description="Annual Maintenance Contract for Tally with priority support, upgrades, and issue resolution."
      />
      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="7. Tally AMC"
            title="Annual Maintenance - So You Never Face Downtime"
            subtitle="Year-round Tally support for businesses that rely on Tally daily and cannot afford disruptions."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Designed for businesses that need stable Tally performance, quick troubleshooting, and predictable annual support.
            </p>
          </div>

          <div data-aos="fade-up" className="grid gap-4 md:grid-cols-3">
            {AMC_HIGHLIGHTS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary">
                    <ItemIcon className="text-xl" />
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">{item.title}</h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div data-aos="fade-up" className="mt-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Benefits Included</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {BENEFITS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Button
              to="/contact"
              fullWidth={false}
              state={{ enquiryType: 'tally-amc' }}
              className="px-6"
            >
              Request Tally AMC
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
