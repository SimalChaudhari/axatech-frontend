import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../../api';
import { ServicesHero, ServicesGrid } from '../../components/services';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.services().then(setServices).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Services - Tally Customization, Cloud, Integration | Axatech</title>
        <meta name="description" content="Tally Customization, Cloud Hosting, WhatsApp, Zoho & Zakya Integration, API & Automation services." />
      </Helmet>

      <ServicesHero
        title="Our Services"
        subtitle="Tally Customization, Cloud Hosting, WhatsApp Integration, Zoho & Zakya, API & Automation."
      />

      <section className="py-20 md:py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-5">
          <ServicesGrid services={services} loading={loading} />
        </div>
      </section>
    </>
  );
}
