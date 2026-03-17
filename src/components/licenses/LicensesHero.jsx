import { Button, SectionHeader } from '../common';

export default function LicensesHero({ type, onTypeChange }) {
  return (
    <section className="py-20 md:py-24 bg-gray-50/80 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-5 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        <SectionHeader
          label="Pricing"
          title="Tally License Pricing"
          subtitle="Choose Single User or Multi User plans. Buy Now redirects to enquiry form."
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
            variant={type === 'single' ? 'primary' : 'ghost'}
            fullWidth={false}
            onClick={() => onTypeChange('single')}
            className="min-w-[120px] px-6 py-3 rounded-lg text-sm shadow-md"
          >
            Single User
          </Button>
          <Button
            type="button"
            variant={type === 'multi' ? 'primary' : 'ghost'}
            fullWidth={false}
            onClick={() => onTypeChange('multi')}
            className="min-w-[120px] px-6 py-3 rounded-lg text-sm shadow-md"
          >
            Multi User
          </Button>
        </div>
      </div>
    </section>
  );
}
