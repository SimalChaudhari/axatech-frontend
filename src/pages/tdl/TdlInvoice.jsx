import { Button, PageMeta, SectionHeader } from '../../components/common';
import { CheckCircleOutlineIcon, CogLoopIcon, RocketIcon } from '../../components/icons';

const POINTS = [
  'Custom invoice formats with logo, terms and branding',
  'Multi-format support (A4, A5, thermal/POS)',
  'Auto-fill bank details, QR codes, and digital signatures',
  'Industry-specific formats (retail, pharma, manufacturing)',
];

const INVOICE_HIGHLIGHTS = [
  {
    title: 'Brand-Perfect Output',
    description: 'Design invoice templates that reflect your identity with clean branding, terms, and formatting.',
    icon: CheckCircleOutlineIcon,
  },
  {
    title: 'Business-Specific Formats',
    description: 'Build layouts suited for your workflow across product lines, billing models, and industries.',
    icon: CogLoopIcon,
  },
  {
    title: 'Faster Billing Operations',
    description: 'Reduce manual effort with smart data placement and reliable print/export-ready invoice templates.',
    icon: RocketIcon,
  },
];

export default function TdlInvoice() {
  return (
    <>
      <PageMeta
        title="Invoice TDL | Axatech"
        description="Build branded, professional invoice formats in Tally with custom invoice TDL."
      />
      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="5.4 Invoice TDL"
            title="Professional Invoices, Your Brand Identity"
            subtitle="Create industry-ready invoice formats that match your business standards."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Built for businesses that need accurate, compliant, and professionally branded invoices directly from Tally.
            </p>
          </div>

          <div data-aos="fade-up" className="grid gap-4 md:grid-cols-3">
            {INVOICE_HIGHLIGHTS.map((highlight) => {
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
              state={{ enquiryType: 'tdl', tdlType: 'invoice' }}
              className="px-6"
            >
              Request Invoice TDL
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
