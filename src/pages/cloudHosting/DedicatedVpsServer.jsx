import { Button, PageMeta, SectionHeader } from '../../components/common';
import { CheckCircleOutlineIcon, CogLoopIcon, RocketIcon } from '../../components/icons';

const FEATURES = [
  'Dedicated virtual server with no shared resources',
  'Custom RAM, storage, and bandwidth configuration',
  'Root access with full server control',
  '99.9% uptime SLA with 24/7 monitoring',
];

const PLANS = [
  'Basic VPS - For small businesses (2 vCPU, 4GB RAM)',
  'Standard VPS - For growing teams (4 vCPU, 8GB RAM)',
  'Premium VPS - For enterprises (8 vCPU, 16GB RAM+)',
];

const VPS_HIGHLIGHTS = [
  {
    title: 'Dedicated Resource Isolation',
    description: 'Run mission-critical workloads on isolated compute resources without shared-server bottlenecks.',
    icon: CheckCircleOutlineIcon,
  },
  {
    title: 'Configurable Infrastructure',
    description: 'Scale RAM, CPU, storage, and network resources based on your operational and growth needs.',
    icon: CogLoopIcon,
  },
  {
    title: 'Enterprise-Grade Reliability',
    description: 'Maintain stable uptime and performance for finance teams and multi-branch business operations.',
    icon: RocketIcon,
  },
];

export default function DedicatedVpsServer() {
  return (
    <>
      <PageMeta
        title="Dedicated VPS Server | Axatech"
        description="Dedicated VPS server plans for Tally with full control, custom resources and enterprise-grade uptime."
      />

      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="3.2 Dedicated VPS Server"
            title="Dedicated Performance for Growing Businesses"
            subtitle="For businesses needing full control and dedicated resources for cloud-hosted Tally."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Ideal for businesses that require dedicated resources, stronger control, and predictable cloud performance for critical workloads.
            </p>
          </div>

          <div data-aos="fade-up" className="grid gap-4 md:grid-cols-3">
            {VPS_HIGHLIGHTS.map((highlight) => {
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
            <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Core Features</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {FEATURES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 mb-3 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">VPS Options</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {PLANS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Button
              to="/contact"
              fullWidth={false}
              state={{ enquiryType: 'cloud', cloudMode: 'dedicated-vps' }}
              className="px-6"
            >
              Request Dedicated VPS
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
