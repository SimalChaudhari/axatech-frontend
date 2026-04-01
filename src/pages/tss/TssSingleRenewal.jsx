import { useEffect, useState } from 'react';
import api from '../../api';
import { Button, PageMeta, SectionHeader, Loader } from '../../components/common';
import { CheckCircleOutlineIcon, CogLoopIcon, RocketIcon } from '../../components/icons';

export default function TssSingleRenewal() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.tssContent()
      .then(setContent)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !content) {
    return <Loader className="min-h-screen" />;
  }

  const benefits = Array.isArray(content.singleBenefits) ? content.singleBenefits : [];
  const highlights = Array.isArray(content.singleHighlights) ? content.singleHighlights : [];

  return (
    <>
      <PageMeta
        title={content.singleMetaTitle}
        description={content.singleMetaDescription}
      />

      <section className="bg-linear-to-b from-slate-50 to-white py-20 md:py-24 dark:from-gray-900 dark:to-gray-900/90">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeader
            label={content.singleLabel}
            title={content.singleTitle}
            subtitle={content.singleSubtitle}
            centered={false}
            as="h1"
            subtitleClassName="mb-8"
            dataAos="fade-up"
          />

          <div data-aos="fade-up" className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 dark:border-secondary/30 dark:bg-secondary/10">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {content.singleIntroText}
            </p>
          </div>

          <div data-aos="fade-up" className="grid gap-4 md:grid-cols-3">
            {highlights.map((highlight) => {
              const HighlightIcon =
                highlight.icon === 'CogLoopIcon'
                  ? CogLoopIcon
                  : highlight.icon === 'RocketIcon'
                    ? RocketIcon
                    : CheckCircleOutlineIcon;

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
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              {content.singleBenefitsTitle}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Button
              to="/tss-renew"
              fullWidth={false}
              state={{ enquiryType: 'tss-renewal', tssType: 'single-user' }}
              className="px-6"
            >
              Renew TSS
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
