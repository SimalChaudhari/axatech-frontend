import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../../api';
import { LicensesHero, LicensesGrid } from '../../components/licenses';

export default function Licenses() {
  const [plans, setPlans] = useState([]);
  const [type, setType] = useState('single');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.licenses(type)
      .then(setPlans)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <>
      <Helmet>
        <title>Tally License Pricing - Axatech</title>
        <meta name="description" content="Tally Single User and Multi User license pricing. Buy now via enquiry." />
      </Helmet>

      <LicensesHero type={type} onTypeChange={setType} />

      <section className="py-20 md:py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-5">
          <LicensesGrid plans={plans} loading={loading} />
        </div>
      </section>
    </>
  );
}
