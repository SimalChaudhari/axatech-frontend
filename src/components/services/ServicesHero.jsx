import { SectionHeader } from '../common';

export default function ServicesHero({ title = 'Our Services', subtitle }) {
  return (
    <section className="py-20 md:py-24 bg-gray-50/80 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-5 animate-[home-fadeInUp_0.5s_ease-out_0.2s_both]">
        <SectionHeader
          label="Services"
          title={title}
          subtitle={subtitle}
          centered
          as="h1"
        />
      </div>
    </section>
  );
}
