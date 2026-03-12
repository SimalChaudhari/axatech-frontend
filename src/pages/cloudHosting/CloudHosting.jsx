import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../../api';
import { CloudHostingHero, CloudHostingPlans } from '../../components/cloudHosting';

export default function CloudHosting() {
  const [shared, setShared] = useState([]);
  const [vps, setVps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.cloud('shared'), api.cloud('vps')])
      .then(([s, v]) => { setShared(s); setVps(v); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Cloud Hosting - Shared & VPS Plans | Axatech</title>
        <meta name="description" content="Tally cloud hosting: Shared and VPS server plans. Enquiry for pricing." />
      </Helmet>

      <CloudHostingHero
        title="Cloud Hosting"
        subtitle="Shared and VPS server plans for Tally. Benefits and performance highlights."
      />

      <section className="py-20 md:py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-5">
          <CloudHostingPlans shared={shared} vps={vps} loading={loading} />
        </div>
      </section>
    </>
  );
}
