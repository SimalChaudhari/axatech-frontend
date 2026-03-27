import { Button, PageMeta, SectionHeader } from '../../components/common';
import { CheckCircleOutlineIcon, CogLoopIcon, RocketIcon } from '../../components/icons';

const POINTS = [
  'Invoice delivery and payment confirmation SMS',
  'Overdue payment reminders',
  'Custom SMS templates with dynamic Tally data',
  'Works with major Indian SMS gateways',
];

const HIGHLIGHTS = [
  {
    title: 'Instant Notification Delivery',
    description: 'Trigger time-sensitive invoice and payment alerts with high message delivery reliability.',
    icon: RocketIcon,
  },
  {
    title: 'Template-Driven Messaging',
    description: 'Use standardized, personalized SMS formats with dynamic values from Tally data.',
    icon: CheckCircleOutlineIcon,
  },
  {
    title: 'Automated Reminder Flows',
    description: 'Reduce manual follow-ups by scheduling reminder patterns that match your business cycle.',
    icon: CogLoopIcon,
  },
];

export default function IntegrationSmsApi() {
  return (
    <>
      <PageMeta
        title="SMS API Integration | Axatech"
        description="Automate customer notifications from Tally with SMS API integrations."
      />
      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="6.4 SMS API Integration"
            title="Automated SMS Notifications from Tally"
            subtitle="Keep customers informed with reliable SMS alerts and reminders."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Great for businesses that depend on timely billing, collections, and customer confirmation updates.
            </p>
          </div>

          <div data-aos="fade-up" className="grid gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map((item) => {
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
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {POINTS.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div className="mt-8">
            <Button
              to="/contact"
              fullWidth={false}
              state={{ enquiryType: 'integration', integrationType: 'sms-api' }}
              className="px-6"
            >
              Setup SMS API Integration
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
