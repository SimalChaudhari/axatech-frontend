import { PageMeta, SectionHeader } from '../../components/common';
import {
  CodeSquareIcon,
  CogLoopIcon,
  RocketIcon,
  CloudIbmIcon,
  ShieldAltIcon,
  HtmlIcon,
  DataConfigurationIcon,
  JavascriptIcon,
  WhatsappIcon,
} from '../../components/icons';

const HIGHLIGHTS = [
  {
    title: 'End-to-End Delivery',
    description: 'From strategy and UI to deployment, monitoring, and support under one team.',
    Icon: CodeSquareIcon,
  },
  {
    title: 'Built for Scale',
    description: 'Architecture-first approach to keep your product fast, stable, and future-ready.',
    Icon: CogLoopIcon,
  },
  {
    title: 'Business-First Outcomes',
    description: 'Every feature is aligned with growth, operations, and measurable business impact.',
    Icon: RocketIcon,
  },
];

const OFFERINGS = [
  {
    label: '1. Frontend Development',
    title: "Your users' first impression — made to last.",
    icon: HtmlIcon,
    points: [
      'Pixel-perfect, responsive UI/UX design',
      'Cross-browser and cross-device compatibility',
      'Performance-optimized for fast load times',
      'Accessibility and SEO-friendly markup',
    ],
  },
  {
    label: '2. Backend Development',
    title: 'Robust, secure, and scalable server-side systems.',
    icon: DataConfigurationIcon,
    points: [
      'RESTful API design and development',
      'Authentication, authorization and session management',
      'Database architecture and query optimization',
      'Microservices and monolith architectures',
    ],
  },
  {
    label: '3. JavaScript Technologies',
    title: 'Full-stack JavaScript expertise — one language, end to end.',
    icon: JavascriptIcon,
    points: [
      'Unified codebase across frontend and backend',
      'Real-time features with WebSockets and event-driven architecture',
      'Faster development cycles with shared libraries and tooling',
    ],
  },
  {
    label: '4. API Development',
    title: 'Connect everything — internal systems, third parties, and mobile apps.',
    icon: ShieldAltIcon,
    points: [
      'REST and GraphQL API design',
      'API documentation with Swagger/Postman',
      'Rate limiting, versioning and security best practices',
      'Webhook integrations and event-driven APIs',
    ],
  },
  {
    label: '5. Mobile App Development',
    title: 'Native-quality apps on Android and iOS — built once, deployed everywhere.',
    icon: RocketIcon,
    points: [
      'Cross-platform apps with React Native',
      'Tally-connected mobile apps (your business data on phone)',
      'Push notifications, offline support and device integrations',
      'Play Store and App Store deployment support',
    ],
  },
  {
    label: '6. Cloud Solutions',
    title: 'Deploy, scale, and manage your apps without infrastructure headaches.',
    icon: CloudIbmIcon,
    points: [
      'Cloud hosting on AWS, Azure, or DigitalOcean',
      'CI/CD pipelines for automated deployments',
      'Docker/container-based architecture',
      'Monitoring, logging and auto-scaling setup',
    ],
  },
  {
    label: '7. ERP / Business Software Development',
    title: 'Custom ERP tailored for Indian SMEs.',
    icon: CogLoopIcon,
    points: [
      'Inventory, billing, HR, and payroll modules',
      'Naturally connects to your Tally expertise',
    ],
  },
  {
    label: '8. SaaS Product Development',
    title: 'Help clients build and launch their own SaaS.',
    icon: RocketIcon,
    points: [
      'Subscription billing via Razorpay',
      'Multi-tenant architecture',
      'Strong upsell from regular web development',
    ],
  },
  {
    label: '9. Tally-Connected Web Apps',
    title: 'Your biggest differentiator — Tally + web/app in one solution.',
    icon: CodeSquareIcon,
    points: [
      'Web dashboards pulling live data from Tally',
      'Customer portals showing outstanding and invoices',
      'Salesperson apps connected to Tally stock and pricing',
    ],
  },
  {
    label: '10. WhatsApp Business Automation',
    title: 'Automate sales follow-ups and customer communication.',
    icon: WhatsappIcon,
    points: [
      'Chatbot for order status and invoice sharing',
      'Automated follow-ups and payment reminders',
      'Works as a standalone offering too',
    ],
  },
  {
    label: '11. Digital Marketing / SEO',
    title: 'Natural add-on service for every website project.',
    icon: RocketIcon,
    points: [
      'Website SEO for small businesses',
      'Google My Business setup',
    ],
  },
];

export default function WebAppDevelopment() {
  return (
    <>
      <PageMeta
        title="Web & App Development | Axatech"
        description="End-to-end web and app development services by Axatech including frontend, backend, APIs, cloud, ERP, SaaS, and Tally-connected solutions."
      />

      <section className="bg-linear-to-b from-slate-50 to-white py-20 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeader
            label="Web & App Development"
            title="Build Digital. Build Smart. Build with Axatech."
            subtitle="From dynamic websites to enterprise-grade mobile apps, Axatech delivers end-to-end digital solutions that are fast, scalable, and built for Indian businesses."
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
          />

          <div className="mb-10 grid gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary">
                  <Icon className="text-xl" />
                </div>
                <h2 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {OFFERINGS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <article
                  key={item.label}
                  className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary dark:text-secondary">
                        {item.label}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">
                        {item.title}
                      </h3>
                    </div>
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-primary dark:bg-gray-700 dark:text-secondary">
                      <ItemIcon className="text-xl" />
                    </div>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
