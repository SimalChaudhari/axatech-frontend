import { Button, PageMeta, SectionHeader } from '../../components/common';
import { CheckCircleOutlineIcon, CogLoopIcon, RocketIcon } from '../../components/icons';

const POINTS = [
  'Auto-send invoices to customers on voucher save',
  'Outstanding payment reminders with one click',
  'Supports WhatsApp Business API',
  'No manual copy-paste, straight from Tally',
];

const HIGHLIGHTS = [
  {
    title: 'Faster Customer Reach',
    description: 'Deliver invoices and reminders on WhatsApp instantly from your accounting workflows.',
    icon: RocketIcon,
  },
  {
    title: 'Reliable Communication',
    description: 'Send consistent, template-based messages to reduce misses and improve follow-up quality.',
    icon: CheckCircleOutlineIcon,
  },
  {
    title: 'Automation-First Process',
    description: 'Eliminate manual sharing steps with rule-driven message triggers from Tally events.',
    icon: CogLoopIcon,
  },
];

export default function IntegrationWhatsapp() {
  return (
    <>
      <PageMeta
        title="Tally to WhatsApp Integration | Axatech"
        description="Send invoices and payment reminders from Tally directly to WhatsApp."
      />
      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="6.3 Tally to WhatsApp"
            title="Send Tally Documents via WhatsApp"
            subtitle="Automate customer communication directly from Tally using WhatsApp workflows."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Perfect for businesses that need quicker collections, timely customer updates, and less communication overhead.
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
              state={{ enquiryType: 'integration', integrationType: 'whatsapp' }}
              className="px-6"
            >
              Setup WhatsApp Integration
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
