import { SectionHeader } from '../common';

export default function ProductsHero() {
  return (
    <section className="py-20 md:py-24 bg-gray-50/80 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-[1200px] mx-auto px-5 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        <SectionHeader
          label="Add-ons"
          title="Tally Add-ons"
          subtitle="Products and automation add-ons. Use Buy Now to send an enquiry."
          centered={false}
          as="h1"
        />
      </div>
    </section>
  );
}
