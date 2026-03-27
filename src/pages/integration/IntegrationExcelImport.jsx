import { Button, PageMeta, SectionHeader } from '../../components/common';
import { CheckCircleOutlineIcon, CogLoopIcon, RocketIcon } from '../../components/icons';

const POINTS = [
  'Sales, purchase, journal and payment vouchers from Excel',
  'Master data import: ledgers, stock items, parties',
  'Configurable templates for your existing Excel formats',
  'One-click recurring imports',
];

const HIGHLIGHTS = [
  {
    title: 'Bulk Import Efficiency',
    description: 'Move large volumes of voucher and master data into Tally in minutes instead of manual hours.',
    icon: RocketIcon,
  },
  {
    title: 'Template-Based Accuracy',
    description: 'Use structured mapping templates to reduce errors and keep imports consistent across teams.',
    icon: CheckCircleOutlineIcon,
  },
  {
    title: 'Repeatable Workflows',
    description: 'Standardize recurring import operations for faster monthly processes and better control.',
    icon: CogLoopIcon,
  },
];

export default function IntegrationExcelImport() {
  return (
    <>
      <PageMeta
        title="Excel Import Integration | Axatech"
        description="Import bulk vouchers and master data into Tally directly from Excel."
      />
      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="6.1 Excel Import"
            title="Bulk Data Import from Excel to Tally"
            subtitle="Eliminate manual entry and move your Excel data into Tally in a structured, repeatable way."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Best for teams handling frequent Excel-based accounting data who want faster throughput and cleaner books.
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
              state={{ enquiryType: 'integration', integrationType: 'excel-import' }}
              className="px-6"
            >
              Request Excel Import Setup
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
