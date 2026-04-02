import { Button, SectionHeader } from '../common';

export default function LicensesHero({ type, onTypeChange }) {
  return (
    <section className="hero-gradient-section py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-5 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        <SectionHeader
          label="Pricing"
          title="Tally License Pricing"
          subtitle="Choose Single User or Multi User plans. Buy Now redirects to enquiry form."
          centered
          as="h1"
          labelClassName="text-white/90 dark:text-white"
          titleClassName="text-white dark:text-white"
          subtitleClassName="mb-8 text-white/90 dark:text-white/90"
        />
        <div className="flex justify-center">
          <div
            className="hero-glass-panel inline-flex p-1.5 gap-5 animate-fadeInUp"
            style={{ animationDelay: '0.32s' }}
          >
            <Button
              type="button"
              variant="ghost"
              fullWidth={false}
              onClick={() => onTypeChange('single')}
              className={`min-w-[120px] px-6 py-3 rounded-lg text-sm shadow-md border transition-colors ${
                type === 'single'
                  ? 'bg-white/25! text-white! border-white/50!'
                  : 'bg-transparent! text-white/90! border-transparent! hover:bg-white/15! hover:text-white!'
              }`}
            >
              Single User
            </Button>
            <Button
              type="button"
              variant="ghost"
              fullWidth={false}
              onClick={() => onTypeChange('multi')}
              className={`min-w-[120px] px-6 py-3 rounded-lg text-sm shadow-md border transition-colors ${
                type === 'multi'
                  ? 'bg-white/25! text-white! border-white/50!'
                  : 'bg-transparent! text-white/90! border-transparent! hover:bg-white/15! hover:text-white!'
              }`}
            >
              Multi User
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
