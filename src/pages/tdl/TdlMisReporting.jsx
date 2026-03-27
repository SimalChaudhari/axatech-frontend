import { Button, PageMeta, SectionHeader } from '../../components/common';
import { ChartLineIcon, CheckCircleOutlineIcon, RocketIcon } from '../../components/icons';

const POINTS = [
  'Custom dashboards with key business metrics',
  'Profitability reports by product, branch, or salesperson',
  'Aging analysis, trend reports, and executive summaries',
  'Export to Excel or PDF with one click',
];

const REPORTING_PILLARS = [
  {
    title: 'Executive Visibility',
    description: 'See key financial and operational KPIs in one place for faster leadership decisions.',
    icon: ChartLineIcon,
  },
  {
    title: 'Decision-Ready Insights',
    description: 'Actionable profitability, aging, and trend reports designed for practical business planning.',
    icon: CheckCircleOutlineIcon,
  },
  {
    title: 'Faster Review Cycles',
    description: 'Generate, review, and export MIS outputs quickly for monthly and quarterly reporting needs.',
    icon: RocketIcon,
  },
];

export default function TdlMisReporting() {
  return (
    <>
      <PageMeta
        title="MIS Reporting TDL | Axatech"
        description="Get custom MIS dashboards and reports directly inside Tally with TDL."
      />
      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="5.3 MIS Reporting TDL"
            title="Business Intelligence Inside Tally"
            subtitle="Custom MIS dashboards and reports for faster decisions without leaving Tally."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Designed for business owners and finance teams who need clear reporting, strong analysis, and faster action.
            </p>
          </div>

          <div data-aos="fade-up" className="grid gap-4 md:grid-cols-3">
            {REPORTING_PILLARS.map((pillar) => {
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

          <div className="mt-8">
            <Button
              to="/contact"
              fullWidth={false}
              state={{ enquiryType: 'tdl', tdlType: 'mis-reporting' }}
              className="px-6"
            >
              Request MIS TDL
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
