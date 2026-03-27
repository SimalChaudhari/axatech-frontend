import { Button, SectionHeader } from '../common';

export default function CloudHostingHero({
  title = 'Cloud Hosting',
  subtitle,
  type = 'shared',
  onTypeChange = () => {},
}) {
  return (
    <section className="py-20 md:py-24 bg-gray-50/80 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-5 text-center animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        <SectionHeader
          label="Hosting"
          title={title}
          subtitle={subtitle}
          centered
          as="h1"
          subtitleClassName="mb-8"
        />
        <div
          className="inline-flex bg-white dark:bg-gray-800 rounded-xl p-1.5 gap-5 border border-gray-200 dark:border-gray-600 shadow-sm animate-fadeInUp"
          style={{ animationDelay: '0.32s' }}
        >
          <Button
            type="button"
            variant={type === 'shared' ? 'primary' : 'ghost'}
            fullWidth={false}
            onClick={() => onTypeChange('shared')}
            className="min-w-[140px] px-6 py-3 rounded-lg text-sm shadow-md"
          >
            Shared Server
          </Button>
          <Button
            type="button"
            variant={type === 'vps' ? 'primary' : 'ghost'}
            fullWidth={false}
            onClick={() => onTypeChange('vps')}
            className="min-w-[140px] px-6 py-3 rounded-lg text-sm shadow-md"
          >
            VPS Server
          </Button>
        </div>
      </div>
    </section>
  );
}
