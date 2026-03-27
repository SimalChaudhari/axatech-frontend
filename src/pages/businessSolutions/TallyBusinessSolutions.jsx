import { Button, PageMeta, SectionHeader } from '../../components/common';
import { CheckCircleOutlineIcon, CogLoopIcon, RocketIcon } from '../../components/icons';

const SOLUTIONS = [
  {
    label: '8. Tally Data Synchronization',
    title: 'One Tally. Multiple Locations. Always in Sync.',
    points: [
      'Manage data across branches, godowns, and offices in one master Tally company.',
      'Branch-to-HO synchronization',
      'Configurable sync rules (voucher types, periods, and filters)',
      'Works over internet or LAN',
      'Conflict resolution and sync logs',
      'Ideal for retail chains, distributors, and multi-branch businesses',
    ],
  },
  {
    label: '9. E-Invoice & E-Way Bill Solutions',
    title: 'Faster Compliance with Fewer Errors',
    points: [
      'E-Invoice generation directly from Tally',
      'Bulk E-Way Bill creation and cancellation',
      'IRN generation with QR code printing',
      'GST reconciliation (GSTR-2A/2B vs Books)',
      'High-demand solution for Indian businesses',
    ],
  },
  {
    label: '10. Tally Training & Onboarding',
    title: 'Train Teams from Basics to Advanced Tally Prime',
    points: [
      'Basic to advanced Tally Prime training',
      'GST filing process using Tally',
      'Group and corporate training for accounting teams',
      'Useful as a recurring service stream',
    ],
  },
  {
    label: '11. Tally Data Migration',
    title: 'Smooth Migration Without Data Chaos',
    points: [
      'Migration from Tally ERP 9 to Tally Prime',
      'Migration from Busy, Marg, and Miracle to Tally',
      'Data cleaning and restructuring before migration',
      'Best for businesses switching accounting platforms',
    ],
  },
  {
    label: '12. Tally Health Check / Audit',
    title: 'Find Issues Early. Keep Books Clean.',
    points: [
      'Data integrity audit',
      'Duplicate entry detection',
      'Mismatch reports (stock, ledger, GST)',
      'One-time paid audit service with actionable fixes',
    ],
  },
];

const HIGHLIGHTS = [
  {
    title: 'Compliance and Control',
    description: 'Implement practical Tally solutions that improve governance, reporting quality, and process discipline.',
    icon: CheckCircleOutlineIcon,
  },
  {
    title: 'Integrated Operations',
    description: 'Connect branches, teams, and workflows with synchronized data and dependable business continuity.',
    icon: CogLoopIcon,
  },
  {
    title: 'Scalable Growth Enablement',
    description: 'Adopt future-ready Tally capabilities that support expansion without operational complexity.',
    icon: RocketIcon,
  },
];

export default function TallyBusinessSolutions() {
  return (
    <>
      <PageMeta
        title="Tally Business Solutions | Axatech"
        description="Tally business solutions including data synchronization, e-invoice, e-way bill, migration, training, and health audits."
      />

      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="Tally Services"
            title="Advanced Tally Solutions for Growing Businesses"
            subtitle="Explore specialized Tally services that improve control, compliance, and operational efficiency."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              End-to-end Tally business services tailored to simplify operations, strengthen compliance, and support sustainable growth.
            </p>
          </div>

          <div data-aos="fade-up" className="mb-6 grid gap-4 md:grid-cols-3">
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

          <div data-aos="fade-up" className="space-y-5">
            {SOLUTIONS.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8"
              >
                <p data-aos="fade-up" className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-primary dark:text-secondary mb-2">
                  {item.label}
                </p>
                <h2 data-aos="fade-up" className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {item.title}
                </h2>
                <ul data-aos="fade-up" className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <Button
              to="/contact"
              fullWidth={false}
              state={{ enquiryType: 'tally-business-solutions' }}
              className="px-6"
            >
              Request Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
