import { Button, PageMeta, SectionHeader } from '../../components/common';
import { ShieldAltIcon, CheckCircleOutlineIcon, CogLoopIcon } from '../../components/icons';

const POINTS = [
  'User-wise feature restriction (voucher entry, reports, masters)',
  'Password-based screen locks and data protection',
  'Activity logs and audit trails',
];

const SECURITY_PILLARS = [
  {
    title: 'Access Governance',
    description: 'Role-based controls to ensure only authorized users can access sensitive Tally operations.',
    icon: ShieldAltIcon,
  },
  {
    title: 'Process Control',
    description: 'Controlled workflows and permission layers to reduce operational risk and accidental changes.',
    icon: CogLoopIcon,
  },
  {
    title: 'Audit Visibility',
    description: 'Track key user actions with clear logs for internal compliance and accountability.',
    icon: CheckCircleOutlineIcon,
  },
];

export default function TdlSecurityControl() {
  return (
    <>
      <PageMeta
        title="Security Control TDL | Axatech"
        description="Protect sensitive business data in Tally with security control TDL customizations."
      />
      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label="5.1 Security Control TDL"
            title="Protect Your Sensitive Business Data"
            subtitle="Granular access control, secure workflows, and audit-ready visibility built directly inside Tally."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Built for companies that need stronger process control, reduced misuse risk, and better compliance confidence.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3" data-aos="fade-up">
            {SECURITY_PILLARS.map((pillar) => {
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
              state={{ enquiryType: 'tdl', tdlType: 'security-control' }}
              className="px-6"
            >
              Request Security TDL
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
